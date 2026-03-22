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
        now = datetime.now(timezone.utc)
        updates: dict[str, Any] = {
            "imageforge_request_id": response.request_id,
            "imageforge_trace_id": response.trace_id or str(job.get("trace_id") or "") or None,
            "image_generation_status": response.status,
            "image_generation_stage": response.stage,
            "image_generated_at": response.finished_at or now,
            "recommended_image_candidate_id": str(response.recommended_candidate_id or "") or None,
            "last_stage_started_at": response.started_at or now,
            "last_stage_finished_at": response.finished_at or now,
            "last_error_message": None,
        }
        if request_payload is not None:
            updates["output_spec"] = self._with_imageforge_request(job, request_payload)

        event_type = "imageforge_regenerate_completed"
        audit_payload: dict[str, Any] = {
            "request_id": response.request_id,
            "status": response.status,
            "stage": response.stage,
            "providers_succeeded": sum(1 for result in response.results if result.ok),
            "candidate_count": sum(len(result.candidates) for result in response.results),
            "recommended_candidate_id": str(response.recommended_candidate_id or "") or None,
        }

        if replace_existing:
            updates.update(self._build_generate_reset_updates(job))
            event_type = "imageforge_generate_completed"
            if request_payload is not None:
                audit_payload["request"] = request_payload.model_dump(mode="json", exclude_none=True)

        await self._repository.update_job_status(job_id=job_id, updates=updates)
        await self._sync_request_detail(
            job_id=job_id,
            request_id=response.request_id,
            replace_existing=True,
        )
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
            selected_candidate_id=selected.candidate_id,
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
                "candidate_index": self._normalize_candidate_index(
                    candidate.candidate_index,
                    fallback_index=index,
                ),
                "public_url": candidate.public_url,
                "relative_path": candidate.relative_path,
                "width": candidate.width,
                "height": candidate.height,
                "imageforge_rank": candidate.rank,
                "quality_score": candidate.quality_score,
                "relevance_score": candidate.relevance_score,
                "reason_codes": list(candidate.reason_codes or []),
                "is_recommended": (
                    str(candidate.candidate_id or "").strip()
                    == str(detail.request.recommended_candidate_id or "").strip()
                )
                or int(candidate.rank or 0) == 1,
                "is_selected": candidate.is_selected,
                "created_at": candidate.created_at,
            }
            for index, candidate in enumerate(detail.candidates, start=1)
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
            "recommended_image_candidate_id": str(detail.request.recommended_candidate_id or "") or None,
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
            await self._repository.update_image_candidate_selection(
                job_id,
                selected_candidate_id=selected.candidate_id,
                selected_relative_path=relative_path,
            )
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
        if not self._job_has_selected_text(job):
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
    def _local_imageforge_candidates(job: dict[str, Any]) -> list[dict[str, Any]]:
        return [
            item
            for item in list(job.get("image_candidates") or [])
            if str(item.get("candidate_id") or "").strip()
        ]

    @staticmethod
    def _normalize_candidate_index(value: Any, *, fallback_index: int) -> int:
        try:
            candidate_index = int(value)
        except (TypeError, ValueError):
            candidate_index = 0
        if candidate_index >= 1:
            return candidate_index
        return max(1, int(fallback_index))

    @classmethod
    def _ordered_local_imageforge_candidates(cls, job: dict[str, Any]) -> list[dict[str, Any]]:
        candidates = list(cls._local_imageforge_candidates(job))
        indexed_candidates = list(enumerate(candidates, start=1))
        indexed_candidates.sort(
            key=lambda pair: (
                cls._normalize_optional_rank(pair[1].get("imageforge_rank")) is None,
                cls._normalize_optional_rank(pair[1].get("imageforge_rank")) or 10**9,
                0 if int(pair[1].get("id") or 0) > 0 else 1,
                int(pair[1].get("id") or 0) if int(pair[1].get("id") or 0) > 0 else pair[0],
            )
        )
        return [item for _position, item in indexed_candidates]

    def _build_image_assets_response(self, job: dict[str, Any]) -> JobImageAssetsResponse:
        can_generate = self._job_has_selected_text(job)
        selected_text = None
        if can_generate:
            selected_text = str(job.get("content_preview") or "").strip() or None
        asset_role = self._resolve_image_asset_role(job)
        selected_candidate_id = str(job.get("selected_image_candidate_id") or "").strip()
        selected_relative_path = str(job.get("selected_image_relative_path") or "").strip()
        recommended_candidate_id = str(job.get("recommended_image_candidate_id") or "").strip()

        candidates: list[ImageAssetCandidateResponse] = []
        for fallback_rank, item in enumerate(self._ordered_local_imageforge_candidates(job), start=1):
            candidate_id = str(item.get("candidate_id") or "").strip()
            relative_path = str(item.get("relative_path") or "")
            is_selected = bool(item.get("is_selected"))
            if selected_candidate_id and candidate_id == selected_candidate_id:
                is_selected = True
            elif selected_relative_path and relative_path == selected_relative_path:
                is_selected = True
            imageforge_rank = self._normalize_optional_rank(item.get("imageforge_rank")) or fallback_rank
            is_recommended = bool(item.get("is_recommended"))
            if recommended_candidate_id and candidate_id == recommended_candidate_id:
                is_recommended = True

            candidates.append(
                ImageAssetCandidateResponse(
                    rank=imageforge_rank,
                    candidate_id=candidate_id,
                    imageforge_request_id=str(item.get("imageforge_request_id") or "") or None,
                    provider_run_id=str(item.get("provider_run_id") or "") or None,
                    provider=str(item.get("provider") or ""),
                    model=str(item.get("model") or "") or None,
                    asset_role=asset_role,
                    candidate_index=self._normalize_candidate_index(item.get("candidate_index"), fallback_index=fallback_rank),
                    public_url=str(item.get("public_url") or ""),
                    relative_path=relative_path,
                    prompt_used=str(item.get("prompt_used") or item.get("prompt") or "") or None,
                    negative_prompt_used=str(item.get("negative_prompt_used") or "") or None,
                    width=int(item["width"]) if item.get("width") is not None else None,
                    height=int(item["height"]) if item.get("height") is not None else None,
                    quality_score=float(item["quality_score"]) if item.get("quality_score") is not None else None,
                    relevance_score=float(item["relevance_score"]) if item.get("relevance_score") is not None else None,
                    reason_codes=[
                        str(code).strip()
                        for code in list(item.get("reason_codes") or [])
                        if str(code).strip()
                    ],
                    is_recommended=is_recommended,
                    is_selected=is_selected,
                    created_at=self._coerce_datetime(item.get("created_at")),
                )
            )

        selected_candidate = next((candidate for candidate in candidates if candidate.is_selected), None)
        return JobImageAssetsResponse(
            job_id=str(job.get("job_id") or ""),
            generation_path="imageforge",
            imageforge_enabled=bool(settings.imageforge_enabled),
            imageforge_request_id=str(job.get("imageforge_request_id") or "") or None,
            imageforge_trace_id=str(job.get("imageforge_trace_id") or "") or None,
            image_generation_status=str(job.get("image_generation_status") or "") or None,
            image_generation_stage=str(job.get("image_generation_stage") or "") or None,
            can_generate=can_generate,
            blocking_reason=None if can_generate else "text_selected is required before image generation",
            asset_role=asset_role,
            selected_text=selected_text,
            recommended_candidate_id=recommended_candidate_id or None,
            selected_image_candidate_id=str(job.get("selected_image_candidate_id") or "") or None,
            selected_image_public_url=str(job.get("selected_image_public_url") or "") or None,
            selected_image_relative_path=str(job.get("selected_image_relative_path") or "") or None,
            selected_image_provider=str(job.get("selected_image_provider") or "") or None,
            selected_image_model=str(job.get("selected_image_model") or "") or None,
            image_generated_at=self._coerce_datetime(job.get("image_generated_at")),
            candidate_count=len(candidates),
            selected_candidate=selected_candidate,
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
        rendering["illustration_image_url"] = selected_url
        output_spec["rendering"] = rendering
        return output_spec

    def _with_imageforge_request(self, job: dict[str, Any], request_payload: GenerateImageRequest) -> dict[str, Any]:
        """Persist the resolved ImageForge contract into output metadata for Studio/debug consumers."""

        output_spec = self._resolve_output_spec(job)
        metadata = dict(output_spec.get("metadata") or {})
        imageforge_meta = dict(metadata.get("imageforge") or {})
        imageforge_meta.update(
            request_payload.model_dump(
                mode="json",
                exclude_none=True,
                include={
                    "workflow_type",
                    "asset_role",
                    "asset_type",
                    "style_profile",
                    "render_spec",
                    "scene_spec",
                    "creative_direction",
                    "visual_style",
                },
            )
        )
        metadata["imageforge"] = imageforge_meta
        output_spec["metadata"] = metadata
        return output_spec

    def _resolve_image_asset_role(self, job: dict[str, Any]) -> str | None:
        """Resolve the current ImageForge asset role from stored output metadata."""

        output_spec = self._resolve_output_spec(job)
        metadata = output_spec.get("metadata") if isinstance(output_spec.get("metadata"), dict) else {}
        imageforge_meta = metadata.get("imageforge") if isinstance(metadata.get("imageforge"), dict) else {}
        asset_role = str(imageforge_meta.get("asset_role") or "").strip()
        if asset_role:
            return asset_role

        workflow_type = str(imageforge_meta.get("workflow_type") or "").strip()
        if workflow_type == "ecard_soft_background_v1":
            return "background"
        if workflow_type == "festival_motif_pack":
            return "motif"
        if workflow_type:
            return "spot_illustration"

        asset_type = str(imageforge_meta.get("asset_type") or "").strip()
        if asset_type == "background_full":
            return "background"
        if asset_type == "festival_motif":
            return "motif"
        if asset_type:
            return "spot_illustration"

        if job.get("imageforge_request_id") or list(job.get("image_candidates") or []):
            return "spot_illustration"
        return None

    def _build_generate_reset_updates(self, job: dict[str, Any]) -> dict[str, Any]:
        output_spec = self._with_studio_state(
            job,
            selected_image_relative_path=None,
            selected_image_url=None,
        )
        rendering = dict(output_spec.get("rendering") or {})
        rendering.pop("background_image_url", None)
        rendering.pop("illustration_image_url", None)
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

    @staticmethod
    def _normalize_optional_rank(value: Any) -> int | None:
        try:
            rank = int(value)
        except (TypeError, ValueError):
            return None
        return rank if rank >= 1 else None

    def _require_enabled(self) -> None:
        if not settings.imageforge_enabled:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="ImageForge integration is disabled",
            )

    @staticmethod
    def _job_has_selected_text(job: dict[str, Any]) -> bool:
        output_spec = job.get("output_spec") if isinstance(job.get("output_spec"), dict) else {}
        studio = output_spec.get("studio") if isinstance(output_spec.get("studio"), dict) else {}
        selected_candidate_id = int(studio.get("selected_text_candidate_id") or 0)
        if selected_candidate_id > 0:
            return True
        if str(job.get("content_approval_status") or "").strip().lower() == "approved":
            return True
        candidates = job.get("candidates")
        if isinstance(candidates, list):
            return any(bool(item.get("is_selected")) for item in candidates)
        return False


@lru_cache(maxsize=1)
def get_image_generation_service() -> ImageGenerationService:
    """Return the shared ImageForge orchestration service."""

    return ImageGenerationService(
        repository=get_workflow_job_repository(),
        imageforge_client=get_imageforge_client(),
    )
