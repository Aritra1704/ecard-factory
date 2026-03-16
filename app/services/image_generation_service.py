"""Service layer for ImageForge-backed image asset generation."""

from __future__ import annotations

from datetime import datetime, timezone
from functools import lru_cache
from typing import Any

from fastapi import HTTPException, status

from app.config import settings
from app.integrations.imageforge import build_imageforge_generate_request, get_imageforge_client
from app.integrations.imageforge.schemas import (
    GenerateImageRequest,
    GenerationResponse,
    ProviderTarget,
    RegenerateImageRequest,
    RequestDetailResponse,
    SelectCandidateResponse,
)
from app.repositories.workflow_repository import WorkflowJobRepository, get_workflow_job_repository
from app.schemas.workflow import ImageAssetCandidateResponse, JobImageAssetsResponse


class ImageGenerationService:
    """Own ImageForge orchestration without moving theme or composition out of eCardFactory."""

    def __init__(
        self,
        *,
        repository: WorkflowJobRepository | None = None,
        imageforge_client=None,
    ) -> None:
        self._repository = repository or get_workflow_job_repository()
        self._client = imageforge_client or get_imageforge_client()

    async def generate_image_assets_for_job(self, job_id: str) -> JobImageAssetsResponse:
        """Start a fresh ImageForge request for the current job and replace local candidate state."""

        self._require_enabled()
        job = await self._load_job(job_id)
        self._validate_job_ready_for_generation(job)

        payload = build_imageforge_generate_request(job)
        response = await self._client.generate(payload)
        self._validate_generation_response(response)
        await self._persist_generation(
            job_id=job_id,
            job=job,
            request_payload=payload,
            response=response,
            replace_existing=True,
        )
        updated = await self._load_job(job_id)
        return self._build_image_assets_response(updated)

    async def regenerate_image_assets_for_job(
        self,
        job_id: str,
        candidate_count: int | None = None,
    ) -> JobImageAssetsResponse:
        """Request another candidate batch for an existing ImageForge request."""

        self._require_enabled()
        job = await self._load_job(job_id)
        self._validate_job_ready_for_generation(job)

        request_id = str(job.get("imageforge_request_id") or "").strip()
        if not request_id:
            return await self.generate_image_assets_for_job(job_id)

        response = await self._client.regenerate(
            RegenerateImageRequest(
                request_id=request_id,
                provider_targets=[
                    ProviderTarget(
                        provider=str(settings.imageforge_default_provider),
                        model=str(settings.imageforge_default_model),
                    )
                ],
                candidate_count=candidate_count,
                trace_id=str(job.get("trace_id") or "").strip() or None,
            )
        )
        self._validate_generation_response(response)
        await self._persist_generation(
            job_id=job_id,
            job=job,
            request_payload=None,
            response=response,
            replace_existing=False,
        )
        updated = await self._load_job(job_id)
        return self._build_image_assets_response(updated)

    async def select_image_candidate_for_job(
        self,
        job_id: str,
        candidate_id: str,
    ) -> JobImageAssetsResponse:
        """Select one persisted ImageForge candidate and mirror the choice locally."""

        self._require_enabled()
        job = await self._load_job(job_id)
        request_id = str(job.get("imageforge_request_id") or "").strip()
        if not request_id:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="No ImageForge request is stored for this job",
            )

        if candidate_id not in {str(item.get("candidate_id") or "") for item in list(job.get("image_candidates") or [])}:
            await self._sync_request_detail(job_id=job_id, request_id=request_id, replace_existing=True)
            job = await self._load_job(job_id)

        selection = await self._client.select_candidate(candidate_id)
        if str(selection.candidate.request_id or "") != request_id:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail="Image candidate does not belong to this job",
            )

        await self._persist_selection(job_id=job_id, job=job, selection=selection)
        updated = await self._load_job(job_id)
        return self._build_image_assets_response(updated)

    async def get_image_assets_for_job(self, job_id: str) -> JobImageAssetsResponse:
        """Return UI-ready image asset state for one job."""

        job = await self._load_job(job_id)
        request_id = str(job.get("imageforge_request_id") or "").strip()
        local_candidates = self._local_imageforge_candidates(job)
        if request_id and not local_candidates and self._client.enabled:
            await self._sync_request_detail(job_id=job_id, request_id=request_id, replace_existing=True)
            job = await self._load_job(job_id)
        return self._build_image_assets_response(job)

    async def _persist_generation(
        self,
        *,
        job_id: str,
        job: dict[str, Any],
        request_payload: GenerateImageRequest | None,
        response: GenerationResponse,
        replace_existing: bool,
    ) -> None:
        candidate_rows = self._build_candidate_rows(response)
        now = datetime.now(timezone.utc)
        updates: dict[str, Any] = {
            "imageforge_request_id": response.request_id,
            "imageforge_trace_id": response.trace_id or str(job.get("trace_id") or "") or None,
            "image_generation_status": response.status,
            "image_generation_stage": response.stage,
            "image_generated_at": response.finished_at or now,
            "last_stage_started_at": response.started_at or now,
            "last_stage_finished_at": response.finished_at or now,
            "last_error_message": None,
        }

        event_type = "imageforge_regenerate_completed"
        audit_payload: dict[str, Any] = {
            "request_id": response.request_id,
            "status": response.status,
            "stage": response.stage,
            "providers_succeeded": sum(1 for result in response.results if result.ok),
            "candidate_count": len(candidate_rows),
        }

        if replace_existing:
            updates.update(self._build_generate_reset_updates(job))
            event_type = "imageforge_generate_completed"
            if request_payload is not None:
                audit_payload["request"] = request_payload.model_dump(mode="json", exclude_none=True)

        await self._repository.save_image_candidates(
            job_id,
            candidate_rows,
            replace_existing=replace_existing,
            stage="image_generation",
        )
        await self._repository.update_job_status(job_id=job_id, updates=updates)
        await self._repository.append_audit_event(
            job_id,
            event_type=event_type,
            payload=audit_payload,
        )

    async def _persist_selection(
        self,
        *,
        job_id: str,
        job: dict[str, Any],
        selection: SelectCandidateResponse,
    ) -> None:
        selected = selection.candidate
        selected_url = selected.selected_asset_public_url or selected.public_url
        relative_path = selected.selected_asset_relative_path or selected.relative_path
        selection_time = datetime.now(timezone.utc)
        updated_output_spec = self._with_selected_image(job, selected_url=selected_url, relative_path=relative_path)

        await self._repository.update_image_candidate_selection(
            job_id,
            selected_relative_path=relative_path,
        )
        await self._repository.update_job_status(
            job_id=job_id,
            updates={
                "status": "image_approved",
                "image_preview_url": selected_url,
                "image_approval_status": "approved",
                "final_approval_status": "pending",
                "final_preview_url": None,
                "final_asset_urls": None,
                "output_spec": updated_output_spec,
                "selected_image_candidate_id": selected.candidate_id,
                "selected_image_public_url": selected_url,
                "selected_image_relative_path": relative_path,
                "selected_image_provider": selected.provider,
                "selected_image_model": selected.model,
                "last_stage_started_at": selection_time,
                "last_stage_finished_at": selection_time,
                "last_error_message": None,
            },
        )
        await self._repository.append_audit_event(
            job_id,
            event_type="imageforge_candidate_selected",
            payload={
                "candidate_id": selected.candidate_id,
                "provider": selected.provider,
                "model": selected.model,
                "public_url": selected_url,
            },
        )

    async def _sync_request_detail(
        self,
        *,
        job_id: str,
        request_id: str,
        replace_existing: bool,
    ) -> None:
        detail = await self._client.get_request_detail(request_id)
        await self._persist_request_detail(job_id=job_id, detail=detail, replace_existing=replace_existing)

    async def _persist_request_detail(
        self,
        *,
        job_id: str,
        detail: RequestDetailResponse,
        replace_existing: bool,
    ) -> None:
        candidate_rows = [
            {
                "stage": "image_generation",
                "imageforge_request_id": detail.request.request_id,
                "candidate_id": candidate.candidate_id,
                "provider_run_id": candidate.provider_run_id,
                "provider": candidate.provider,
                "model": candidate.model,
                "prompt": candidate.prompt_used,
                "prompt_used": candidate.prompt_used,
                "negative_prompt_used": candidate.negative_prompt_used,
                "candidate_index": candidate.candidate_index,
                "public_url": candidate.public_url,
                "relative_path": candidate.relative_path,
                "width": candidate.width,
                "height": candidate.height,
                "is_selected": candidate.is_selected,
                "created_at": candidate.created_at,
            }
            for candidate in detail.candidates
        ]
        await self._repository.save_image_candidates(
            job_id,
            candidate_rows,
            replace_existing=replace_existing,
            stage="image_generation",
        )
        selected = detail.selected_candidate
        updates: dict[str, Any] = {
            "imageforge_request_id": detail.request.request_id,
            "imageforge_trace_id": detail.request.trace_id,
            "image_generation_status": detail.request.status,
            "image_generation_stage": detail.request.stage,
            "image_generated_at": detail.request.finished_at or detail.request.created_at,
        }
        if selected is not None:
            selected_url = selected.selected_asset_public_url or selected.public_url
            relative_path = selected.selected_asset_relative_path or selected.relative_path
            updates.update(
                {
                    "selected_image_candidate_id": selected.candidate_id,
                    "selected_image_public_url": selected_url,
                    "selected_image_relative_path": relative_path,
                    "selected_image_provider": selected.provider,
                    "selected_image_model": selected.model,
                    "image_preview_url": selected_url,
                    "image_approval_status": "approved",
                }
            )
            job = await self._load_job(job_id)
            await self._repository.update_image_candidate_selection(job_id, selected_relative_path=relative_path)
            updates["output_spec"] = self._with_selected_image(
                job,
                selected_url=selected_url,
                relative_path=relative_path,
            )
        await self._repository.update_job_status(job_id=job_id, updates=updates)

    async def _load_job(self, job_id: str) -> dict[str, Any]:
        job, _backend = await self._repository.get_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        return job

    def _validate_job_ready_for_generation(self, job: dict[str, Any]) -> None:
        if not str(job.get("content_preview") or "").strip():
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Selected text is required before generating image assets",
            )

    @staticmethod
    def _validate_generation_response(response: GenerationResponse) -> None:
        provider_results = list(response.results or [])
        candidate_count = sum(len(result.candidates) for result in provider_results)
        if not response.ok:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="ImageForge returned ok=false",
            )
        if not provider_results:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="ImageForge returned no provider results",
            )
        if not any(result.ok for result in provider_results):
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="ImageForge returned no successful provider runs",
            )
        if candidate_count < 1:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="ImageForge returned no image candidates",
            )

    @staticmethod
    def _build_candidate_rows(response: GenerationResponse) -> list[dict[str, Any]]:
        rows: list[dict[str, Any]] = []
        for result in response.results:
            for candidate in result.candidates:
                rows.append(
                    {
                        "stage": "image_generation",
                        "imageforge_request_id": response.request_id,
                        "candidate_id": candidate.candidate_id,
                        "provider_run_id": candidate.provider_run_id,
                        "provider": candidate.provider,
                        "model": candidate.model or result.model,
                        "prompt": result.prompt_used,
                        "prompt_used": result.prompt_used,
                        "negative_prompt_used": result.negative_prompt_used,
                        "candidate_index": candidate.candidate_index,
                        "public_url": candidate.public_url,
                        "relative_path": candidate.relative_path,
                        "width": candidate.width,
                        "height": candidate.height,
                        "is_selected": candidate.is_selected,
                        "created_at": candidate.created_at,
                    }
                )
        return rows

    @staticmethod
    def _local_imageforge_candidates(job: dict[str, Any]) -> list[dict[str, Any]]:
        return [
            item
            for item in list(job.get("image_candidates") or [])
            if str(item.get("candidate_id") or "").strip()
        ]

    def _build_image_assets_response(self, job: dict[str, Any]) -> JobImageAssetsResponse:
        candidates = [
            ImageAssetCandidateResponse(
                candidate_id=str(item.get("candidate_id") or ""),
                provider=str(item.get("provider") or ""),
                model=str(item.get("model") or "") or None,
                candidate_index=int(item.get("candidate_index") or 0),
                public_url=str(item.get("public_url") or ""),
                relative_path=str(item.get("relative_path") or ""),
                width=int(item["width"]) if item.get("width") is not None else None,
                height=int(item["height"]) if item.get("height") is not None else None,
                is_selected=bool(item.get("is_selected")),
                created_at=self._coerce_datetime(item.get("created_at")),
            )
            for item in self._local_imageforge_candidates(job)
        ]
        return JobImageAssetsResponse(
            job_id=str(job.get("job_id") or ""),
            imageforge_enabled=bool(settings.imageforge_enabled),
            imageforge_request_id=str(job.get("imageforge_request_id") or "") or None,
            imageforge_trace_id=str(job.get("imageforge_trace_id") or "") or None,
            image_generation_status=str(job.get("image_generation_status") or "") or None,
            image_generation_stage=str(job.get("image_generation_stage") or "") or None,
            selected_text=str(job.get("content_preview") or "") or None,
            selected_image_candidate_id=str(job.get("selected_image_candidate_id") or "") or None,
            selected_image_public_url=str(job.get("selected_image_public_url") or "") or None,
            selected_image_relative_path=str(job.get("selected_image_relative_path") or "") or None,
            selected_image_provider=str(job.get("selected_image_provider") or "") or None,
            selected_image_model=str(job.get("selected_image_model") or "") or None,
            image_generated_at=self._coerce_datetime(job.get("image_generated_at")),
            candidates=candidates,
        )

    @staticmethod
    def _resolve_output_spec(job: dict[str, Any]) -> dict[str, Any]:
        output_spec = job.get("output_spec")
        return dict(output_spec) if isinstance(output_spec, dict) else {}

    @staticmethod
    def _studio_state(job: dict[str, Any]) -> dict[str, Any]:
        output_spec = ImageGenerationService._resolve_output_spec(job)
        studio = output_spec.get("studio")
        return dict(studio) if isinstance(studio, dict) else {}

    @staticmethod
    def _with_studio_state(job: dict[str, Any], **updates: Any) -> dict[str, Any]:
        output_spec = ImageGenerationService._resolve_output_spec(job)
        studio = ImageGenerationService._studio_state(job)
        for key, value in updates.items():
            if value is None:
                studio.pop(key, None)
            else:
                studio[key] = value
        output_spec["studio"] = studio
        return output_spec

    def _with_selected_image(self, job: dict[str, Any], *, selected_url: str, relative_path: str) -> dict[str, Any]:
        output_spec = self._with_studio_state(
            job,
            selected_image_relative_path=relative_path,
            selected_image_url=selected_url,
        )
        rendering = dict(output_spec.get("rendering") or {})
        rendering["background_image_url"] = selected_url
        output_spec["rendering"] = rendering
        return output_spec

    def _build_generate_reset_updates(self, job: dict[str, Any]) -> dict[str, Any]:
        output_spec = self._with_studio_state(
            job,
            selected_image_relative_path=None,
            selected_image_url=None,
        )
        rendering = dict(output_spec.get("rendering") or {})
        rendering.pop("background_image_url", None)
        output_spec["rendering"] = rendering
        return {
            "status": "content_approved",
            "image_preview_url": None,
            "image_approval_status": "pending",
            "final_approval_status": "pending",
            "final_preview_url": None,
            "final_asset_urls": None,
            "output_spec": output_spec,
            "selected_image_candidate_id": None,
            "selected_image_public_url": None,
            "selected_image_relative_path": None,
            "selected_image_provider": None,
            "selected_image_model": None,
        }

    @staticmethod
    def _coerce_datetime(value: Any) -> datetime | None:
        if isinstance(value, datetime):
            return value
        if isinstance(value, str):
            try:
                return datetime.fromisoformat(value.replace("Z", "+00:00"))
            except ValueError:
                return None
        return None

    def _require_enabled(self) -> None:
        if not settings.imageforge_enabled:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="ImageForge integration is disabled",
            )


@lru_cache(maxsize=1)
def get_image_generation_service() -> ImageGenerationService:
    """Return the shared ImageForge orchestration service."""

    return ImageGenerationService(
        repository=get_workflow_job_repository(),
        imageforge_client=get_imageforge_client(),
    )
