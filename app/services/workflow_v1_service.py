"""Business logic for v1 n8n workflow endpoints with DB-first persistence and memory fallback."""

from __future__ import annotations

from datetime import datetime, timezone
from functools import lru_cache
import logging
from pathlib import Path
from typing import Any
from urllib.parse import unquote, urlparse
from uuid import uuid4

from fastapi import HTTPException, status

from app.repositories.workflow_repository import WorkflowJobRepository, get_workflow_job_repository
from app.schemas.workflow import (
    ApprovalRequest,
    ContentApprovalRequest,
    ContentApprovalResponse,
    FinalApprovalResponse,
    FinalAssetUrls,
    ImageApprovalRequest,
    ImageApprovalResponse,
    JobArchiveResponse,
    JobAssetResponse,
    JobDebugResponse,
    JobDeleteResponse,
    JobEventResponse,
    JobListItemResponse,
    StartJobRequest,
    StartJobResponse,
)
from app.services.workflow_card_renderer import (
    FinalCardRenderInput,
    PreviewCardRenderInput,
    WorkflowCardRenderer,
)
from app.storage import AssetStorage, get_asset_storage

logger = logging.getLogger(__name__)


class StubContentForgeClient:
    """Stub ContentForge adapter used until real integration is wired in.

    TODO(v2): replace this class with a real ContentForge client while keeping
    the same `generate_and_judge` output contract.
    """

    async def generate_and_judge(self, payload: StartJobRequest) -> dict[str, Any]:
        """Generate deterministic candidates and a judged winner for local testing."""

        theme = payload.theme_name.strip()
        audience = payload.audience.strip()
        context = payload.cultural_context.strip()

        candidates = [
            {
                "model": "qwen2.5:7b-instruct",
                "backend": "ollama",
                "content_text": (
                    f"Happy birthday! You make every day brighter, {audience}. "
                    f"Wishing you warmth, laughter, and lots of cake."
                ),
                "raw_score": 0.84,
                "judge_score": 0.90,
            },
            {
                "model": "llama3.1:8b",
                "backend": "ollama",
                "content_text": (
                    f"{theme}: today is your day to smile big and dream bigger. "
                    f"Sending heartfelt wishes from your people."
                ),
                "raw_score": 0.80,
                "judge_score": 0.83,
            },
            {
                "model": "mistral:7b",
                "backend": "ollama",
                "content_text": (
                    f"Shubho jonmodin! May this year bring joy, health, and love. "
                    f"Celebrating you with full heart and happy memories."
                ),
                "raw_score": 0.78,
                "judge_score": 0.81,
            },
        ]

        winner_index = max(range(len(candidates)), key=lambda idx: candidates[idx]["judge_score"])
        for index, candidate in enumerate(candidates):
            candidate["is_winner"] = index == winner_index

        winner = candidates[winner_index]
        judge_summary = (
            f"Winner selected for '{theme}' with {context} context based on tone balance and clarity."
        )

        return {
            "candidates": candidates,
            "winner": winner,
            "judge_summary": judge_summary,
        }


class WorkflowV1Service:
    """Orchestrates v1 workflow state transitions expected by imported n8n flow."""

    def __init__(
        self,
        *,
        repository: WorkflowJobRepository | None = None,
        asset_storage: AssetStorage | None = None,
    ) -> None:
        self._contentforge = StubContentForgeClient()
        self._repository = repository or get_workflow_job_repository()
        self._asset_storage = asset_storage or get_asset_storage()
        self._card_renderer = WorkflowCardRenderer()

    async def start_job(self, payload: StartJobRequest) -> StartJobResponse:
        """Create a job, run stub generation/judging, persist state, and return approval payload."""

        job_id = f"job_{uuid4().hex[:10]}"
        trace_id = f"trace_{uuid4().hex[:12]}"
        now = datetime.now(timezone.utc)

        generation = await self._contentforge.generate_and_judge(payload)
        winner = generation["winner"]
        content_preview = str(winner["content_text"])
        winner_model = str(winner["model"])
        approval_message = (
            f"Content approval required for {job_id}. Winner model: {winner_model}. "
            "Review preview text and approve/reject."
        )
        output_spec = payload.output_spec.model_dump()
        output_spec["rendering"] = payload.rendering.model_dump()

        job_record: dict[str, Any] = {
            "job_id": job_id,
            "trace_id": trace_id,
            "status": "content_pending_approval",
            "theme_name": payload.theme_name,
            "tone_funny_pct": payload.tone_funny_pct,
            "tone_emotion_pct": payload.tone_emotion_pct,
            "tone_style": payload.tone_style,
            "visual_style": payload.tone_style,
            "audience": payload.audience,
            "cultural_context": payload.cultural_context,
            "output_spec": output_spec,
            "avoid_cliches": payload.avoid_cliches,
            "content_preview": content_preview,
            "winner_model": winner_model,
            "content_approval_status": "pending",
            "image_approval_status": "pending",
            "final_approval_status": "pending",
            "image_prompt": None,
            "image_preview_url": None,
            "final_preview_url": None,
            "final_asset_urls": None,
            "created_at": now,
            "updated_at": now,
        }

        candidate_records = [
            {
                "model": str(candidate["model"]),
                "backend": str(candidate["backend"]),
                "content_text": str(candidate["content_text"]),
                "raw_score": float(candidate["raw_score"]),
                "judge_score": float(candidate["judge_score"]),
                "is_winner": bool(candidate["is_winner"]),
            }
            for candidate in generation["candidates"]
        ]

        audit_events = self._build_audit_events(
            job_id=job_id,
            events=[
                ("api_start_called", {"endpoint": "/api/jobs/start"}),
                ("job_created", {"status": "content_pending_approval"}),
                ("contentforge_request_sent", {"stub": True}),
                ("contentforge_response_received", {"candidate_count": len(candidate_records)}),
                ("winner_selected", {"winner_model": winner_model}),
                ("content_approval_requested", {"approval_message": approval_message}),
            ],
        )

        creation_backend = await self._repository.create_job(job_record)
        await self._repository.save_content_candidates(job_id, candidate_records)
        await self._repository.save_judge_results(
            job_id,
            {
                "judge_provider": "contentforge_stub",
                "judge_model": "stub-judge",
                "winner_model": winner_model,
                "leaderboard_json": {"models": [item["model"] for item in candidate_records]},
                "pairwise_json": {},
                "reason_summary": generation["judge_summary"],
            },
        )
        await self._repository.append_audit_events(job_id, audit_events)
        logger.info("workflow job created job_id=%s backend=%s", job_id, creation_backend)

        return StartJobResponse(
            job_id=job_id,
            status="content_pending_approval",
            content_preview=content_preview,
            winner_model=winner_model,
            approval_message=approval_message,
        )

    async def submit_content_approval(
        self,
        job_id: str,
        payload: ContentApprovalRequest,
    ) -> ContentApprovalResponse:
        """Persist content approval and prepare the image approval stage."""

        return await self.apply_content_approval(job_id, payload.decision, payload.notes)

    async def apply_content_approval(
        self,
        job_id: str,
        decision: str,
        notes: str,
    ) -> ContentApprovalResponse:
        """Apply content approval decision and transition job state accordingly."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        old_status = str(job["status"])
        self._assert_expected_status(job, expected="content_pending_approval")

        if decision == "approved":
            image_prompt = self.build_image_prompt(job)
            image_preview_relative_path = self._build_image_preview_relative_path(job_id)
            approved_content = self._resolve_winning_content(job)
            self._save_internal_preview_asset(
                relative_path=image_preview_relative_path,
                payload=PreviewCardRenderInput(
                    title="Content Approved - Image Review",
                    message=image_prompt,
                    signoff="Internal Preview",
                    theme_style=self._resolve_theme_style(job),
                    background_image_url=self._resolve_background_image_url(job),
                    text_alignment="left",
                    export_size=self._resolve_export_size(job),
                    theme_name=str(job.get("theme_name") or ""),
                    job_id=job_id,
                    status="image_pending_approval",
                    metadata_lines=[
                        f"Audience: {job.get('audience', 'N/A')}",
                        f"Context: {job.get('cultural_context', 'N/A')}",
                        f"Approved content: {self._shorten(approved_content, max_len=120)}",
                    ],
                ),
            )
            image_preview_url = self._asset_storage.get_public_url(image_preview_relative_path)
            updates = {
                "status": "image_pending_approval",
                "content_approval_status": "approved",
                "image_approval_status": "pending",
                "image_prompt": image_prompt,
                "image_preview_url": image_preview_url,
            }
            events = [
                ("api_content_approval_called", {"endpoint": f"/api/jobs/{job_id}/content-approval"}),
                ("content_approved", {"decision": decision, "notes": notes}),
                ("image_prompt_created", {"stub": True, "approved_content": approved_content}),
                ("image_generated", {"stub": False, "image_preview_url": image_preview_url}),
                ("image_approval_requested", {"image_preview_url": image_preview_url}),
            ]
        elif decision == "rejected":
            updates = {
                "status": "content_rejected",
                "content_approval_status": "rejected",
            }
            events = [
                ("api_content_approval_called", {"endpoint": f"/api/jobs/{job_id}/content-approval"}),
                ("content_rejected", {"decision": decision, "notes": notes}),
            ]
        else:
            updates = {
                "status": "content_timeout",
                "content_approval_status": "timeout",
            }
            events = [
                ("api_content_approval_called", {"endpoint": f"/api/jobs/{job_id}/content-approval"}),
                ("content_timeout", {"decision": decision, "notes": notes}),
            ]

        audit_events = self._build_audit_events(job_id=job_id, events=events)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates=updates,
            stage="content",
            decision=decision,
            notes=notes,
        )
        assert updated is not None
        await self._repository.append_audit_events(job_id, audit_events)

        if decision == "approved":
            image_preview_relative_path = self._build_image_preview_relative_path(job_id)
            await self._repository.save_asset(
                job_id,
                asset_type="image_preview",
                asset_url=str(updated.get("image_preview_url") or ""),
                storage_backend=self._asset_storage.backend,
                storage_root=self._asset_storage.get_absolute_path(""),
                relative_path=image_preview_relative_path,
                public_url=str(updated.get("image_preview_url") or ""),
                absolute_path=self._asset_storage.get_absolute_path(image_preview_relative_path),
                file_size_bytes=self._read_file_size_bytes(image_preview_relative_path),
                version="v1",
                approved=False,
            )
        logger.info(
            "workflow transition job_id=%s stage=content %s -> %s",
            job_id,
            old_status,
            updated["status"],
        )

        return ContentApprovalResponse(
            job_id=job_id,
            status=str(updated["status"]),
            image_prompt=updated.get("image_prompt"),
            image_preview_url=updated.get("image_preview_url"),
        )

    async def submit_image_approval(
        self,
        job_id: str,
        payload: ImageApprovalRequest,
    ) -> ImageApprovalResponse:
        """Persist image approval and prepare final approval preview."""

        return await self.apply_image_approval(job_id, payload.decision, payload.notes or "")

    async def apply_image_approval(
        self,
        job_id: str,
        decision: str,
        notes: str,
    ) -> ImageApprovalResponse:
        """Apply image approval decision and transition job state accordingly."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        old_status = str(job["status"])
        if str(job.get("status")) != "image_pending_approval":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Job not in image_pending_approval state",
            )

        normalized_decision = decision.strip().lower()
        if normalized_decision not in {"approved", "rejected", "timeout"}:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="Invalid decision. Allowed values: approved, rejected, timeout",
            )

        if normalized_decision == "approved":
            final_preview_relative_path = self._build_final_preview_relative_path(job_id)
            self._save_internal_preview_asset(
                relative_path=final_preview_relative_path,
                payload=PreviewCardRenderInput(
                    title="Image Approved - Final Review",
                    message=self._resolve_winning_content(job),
                    signoff="Internal Preview",
                    theme_style=self._resolve_theme_style(job),
                    background_image_url=self._resolve_background_image_url(job),
                    text_alignment="left",
                    export_size=self._resolve_export_size(job),
                    theme_name=str(job.get("theme_name") or ""),
                    job_id=job_id,
                    status="final_pending_approval",
                    metadata_lines=[
                        f"Audience: {job.get('audience', 'N/A')}",
                        f"Tone: {job.get('tone_style', 'N/A')}",
                        "Final card render queued",
                    ],
                ),
            )
            final_preview_url = self._asset_storage.get_public_url(final_preview_relative_path)
            updates = {
                "status": "final_pending_approval",
                "image_approval_status": "approved",
                "final_preview_url": final_preview_url,
            }
            events = [
                ("api_image_approval_called", {"endpoint": f"/api/jobs/{job_id}/image-approval"}),
                (
                    "image_approved",
                    {
                        "job_id": job_id,
                        "decision": normalized_decision,
                        "notes": notes,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    },
                ),
                ("preview_assembled", {"stub": False, "final_preview_url": final_preview_url}),
                ("final_approval_requested", {"final_preview_url": final_preview_url}),
            ]
        elif normalized_decision == "rejected":
            updates = {
                "status": "image_rejected",
                "image_approval_status": "rejected",
            }
            events = [
                ("api_image_approval_called", {"endpoint": f"/api/jobs/{job_id}/image-approval"}),
                (
                    "image_rejected",
                    {
                        "job_id": job_id,
                        "decision": normalized_decision,
                        "notes": notes,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    },
                ),
            ]
        else:
            updates = {
                "status": "image_timeout",
                "image_approval_status": "timeout",
            }
            events = [
                ("api_image_approval_called", {"endpoint": f"/api/jobs/{job_id}/image-approval"}),
                (
                    "image_timeout",
                    {
                        "job_id": job_id,
                        "decision": normalized_decision,
                        "notes": notes,
                        "timestamp": datetime.now(timezone.utc).isoformat(),
                    },
                ),
            ]

        audit_events = self._build_audit_events(job_id=job_id, events=events)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates=updates,
            stage="image",
            decision=normalized_decision,
            notes=notes,
        )
        assert updated is not None
        await self._repository.append_audit_events(job_id, audit_events)

        if normalized_decision == "approved":
            final_preview_relative_path = self._build_final_preview_relative_path(job_id)
            await self._repository.save_asset(
                job_id,
                asset_type="final_preview",
                asset_url=str(updated.get("final_preview_url") or ""),
                storage_backend=self._asset_storage.backend,
                storage_root=self._asset_storage.get_absolute_path(""),
                relative_path=final_preview_relative_path,
                public_url=str(updated.get("final_preview_url") or ""),
                absolute_path=self._asset_storage.get_absolute_path(final_preview_relative_path),
                file_size_bytes=self._read_file_size_bytes(final_preview_relative_path),
                version="v1",
                approved=False,
            )
        logger.info(
            "workflow transition job_id=%s stage=image %s -> %s",
            job_id,
            old_status,
            updated["status"],
        )

        return ImageApprovalResponse(
            job_id=job_id,
            status=str(updated["status"]),
            final_preview_url=updated.get("final_preview_url"),
        )

    async def submit_final_approval(self, job_id: str, payload: ApprovalRequest) -> FinalApprovalResponse:
        """Persist final approval and mark job completion when approved."""

        return await self.apply_final_approval(job_id, payload.decision, payload.notes)

    async def apply_final_approval(
        self,
        job_id: str,
        decision: str,
        notes: str,
    ) -> FinalApprovalResponse:
        """Apply final approval decision and transition job state accordingly."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found")
        old_status = str(job["status"])
        if str(job.get("status")) != "final_pending_approval":
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail="Job not in final_pending_approval state",
            )

        normalized_decision = decision.strip().lower()
        if normalized_decision not in {"approved", "rejected", "timeout"}:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Invalid decision. Allowed values: approved, rejected, timeout",
            )

        event_payload = {
            "job_id": job_id,
            "decision": normalized_decision,
            "notes": notes,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        }
        if normalized_decision == "approved":
            generated_assets = self._generate_final_assets(job_id=job_id, job=job)
            final_asset_urls = {
                "png": generated_assets["png"]["public_url"],
                "pdf": generated_assets["pdf"]["public_url"],
            }
            updates = {
                "status": "completed",
                "final_approval_status": "approved",
                "final_asset_urls": final_asset_urls,
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_approved", event_payload),
                (
                    "final_png_exported",
                    {"stub": False, "png": final_asset_urls["png"], "pdf": final_asset_urls["pdf"]},
                ),
                ("job_completed", {"status": "completed"}),
            ]
        elif normalized_decision == "rejected":
            updates = {
                "status": "final_rejected",
                "final_approval_status": "rejected",
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_rejected", event_payload),
            ]
        else:
            updates = {
                "status": "final_timeout",
                "final_approval_status": "timeout",
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_timeout", event_payload),
            ]

        audit_events = self._build_audit_events(job_id=job_id, events=events)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates=updates,
            stage="final",
            decision=normalized_decision,
            notes=notes,
        )
        assert updated is not None
        await self._repository.append_audit_events(job_id, audit_events)

        if normalized_decision == "approved":
            png_meta = generated_assets["png"]
            pdf_meta = generated_assets["pdf"]
            if png_meta["public_url"]:
                await self._repository.save_asset(
                    job_id,
                    asset_type="final_png",
                    asset_url=png_meta["public_url"],
                    storage_backend=png_meta["storage_backend"],
                    storage_root=png_meta["storage_root"],
                    relative_path=png_meta["relative_path"],
                    public_url=png_meta["public_url"],
                    absolute_path=png_meta["absolute_path"],
                    file_size_bytes=png_meta["file_size_bytes"],
                    version="v1",
                    approved=True,
                )
            if pdf_meta["public_url"]:
                await self._repository.save_asset(
                    job_id,
                    asset_type="final_pdf",
                    asset_url=pdf_meta["public_url"],
                    storage_backend=pdf_meta["storage_backend"],
                    storage_root=pdf_meta["storage_root"],
                    relative_path=pdf_meta["relative_path"],
                    public_url=pdf_meta["public_url"],
                    absolute_path=pdf_meta["absolute_path"],
                    file_size_bytes=pdf_meta["file_size_bytes"],
                    version="v1",
                    approved=True,
                )
        logger.info(
            "workflow transition job_id=%s stage=final %s -> %s",
            job_id,
            old_status,
            updated["status"],
        )
        logger.info("workflow final approval committed job_id=%s status=%s", job_id, updated["status"])

        asset_urls = updated.get("final_asset_urls")
        return FinalApprovalResponse(
            job_id=job_id,
            status=str(updated["status"]),
            final_asset_urls=FinalAssetUrls.model_validate(asset_urls) if asset_urls else None,
        )

    async def get_job_debug(self, job_id: str) -> JobDebugResponse:
        """Return a full job snapshot including approvals, candidates, and audit events."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        return JobDebugResponse.model_validate(job)

    async def list_jobs(self, *, limit: int = 100) -> list[JobListItemResponse]:
        """Return newest-first jobs with a compact status payload for admin console."""

        rows, backend = await self._repository.list_jobs(limit=limit)
        logger.info("workflow jobs listed count=%s backend=%s", len(rows), backend)
        items: list[JobListItemResponse] = []
        for row in rows:
            created_at = self._coerce_datetime(row.get("created_at"))
            updated_at = self._coerce_datetime(row.get("updated_at"), fallback=created_at)
            status_value = str(row.get("status") or "unknown")
            items.append(
                JobListItemResponse(
                    job_id=str(row.get("job_id")),
                    theme_name=str(row.get("theme_name") or "Untitled"),
                    current_stage=self._resolve_current_stage(status_value),
                    status=status_value,
                    content_approval_status=str(row.get("content_approval_status") or "pending"),
                    image_approval_status=str(row.get("image_approval_status") or "pending"),
                    final_approval_status=str(row.get("final_approval_status") or "pending"),
                    created_at=created_at,
                    updated_at=updated_at,
                )
            )
        return items

    async def get_job_assets(self, job_id: str) -> list[JobAssetResponse]:
        """Return persisted asset metadata for a job."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        assets = sorted(
            list(job.get("assets") or []),
            key=lambda item: self._coerce_datetime(item.get("created_at"), fallback=datetime.min.replace(tzinfo=timezone.utc)),
            reverse=True,
        )
        return [JobAssetResponse.model_validate(item) for item in assets]

    async def get_job_events(self, job_id: str) -> list[JobEventResponse]:
        """Return lifecycle audit events for a job."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        events = sorted(
            list(job.get("audit_log") or []),
            key=lambda item: self._coerce_datetime(item.get("created_at"), fallback=datetime.min.replace(tzinfo=timezone.utc)),
        )
        return [JobEventResponse.model_validate(item) for item in events]

    async def archive_job(self, job_id: str) -> JobArchiveResponse:
        """Archive a job without deleting any assets."""

        current = await self._load_job(job_id)
        if current is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        previous_status = str(current.get("status") or "unknown")
        if previous_status == "archived":
            return JobArchiveResponse(
                job_id=job_id,
                status=previous_status,
                updated_at=self._coerce_datetime(current.get("updated_at")),
            )

        updated = await self._repository.update_job_status(job_id=job_id, updates={"status": "archived"})
        if updated is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        await self._repository.append_audit_events(
            job_id,
            self._build_audit_events(
                job_id=job_id,
                events=[
                    ("api_archive_called", {"endpoint": f"/api/jobs/{job_id}/archive"}),
                    ("job_archived", {"previous_status": previous_status}),
                ],
            ),
        )
        return JobArchiveResponse(
            job_id=job_id,
            status=str(updated["status"]),
            updated_at=self._coerce_datetime(updated.get("updated_at")),
        )

    async def delete_job(self, job_id: str) -> JobDeleteResponse:
        """Delete a job and remove known asset files from storage."""

        deleted_snapshot, backend = await self._repository.delete_job(job_id)
        if deleted_snapshot is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")

        deleted_files = 0
        delete_targets = sorted(self._collect_asset_delete_targets(deleted_snapshot), key=lambda item: str(item))
        for path in delete_targets:
            if self._delete_asset_path(path):
                deleted_files += 1

        logger.info(
            "workflow job deleted job_id=%s backend=%s deleted_files=%s",
            job_id,
            backend,
            deleted_files,
        )
        return JobDeleteResponse(job_id=job_id, deleted=True, deleted_files=deleted_files)

    async def _load_job(self, job_id: str) -> dict[str, Any] | None:
        """Load job from Postgres when possible, otherwise from in-memory fallback."""

        job, backend = await self._repository.get_job(job_id)
        logger.info(
            "workflow lookup job_id=%s found=%s backend=%s",
            job_id,
            "true" if job is not None else "false",
            backend,
        )
        return job

    @staticmethod
    def _assert_expected_status(job: dict[str, Any], *, expected: str) -> None:
        """Guard endpoints against invalid workflow state transitions."""

        current = str(job["status"])
        if current != expected:
            raise HTTPException(
                status_code=status.HTTP_409_CONFLICT,
                detail=f"Invalid state transition. Expected '{expected}' but current status is '{current}'.",
            )

    @staticmethod
    def _build_audit_events(
        *,
        job_id: str,
        events: list[tuple[str, dict[str, Any]]],
    ) -> list[dict[str, Any]]:
        """Create normalized audit payloads with timestamps."""

        now = datetime.now(timezone.utc)
        return [
            {
                "job_id": job_id,
                "event_type": event_type,
                "event_payload_json": payload,
                "created_at": now,
            }
            for event_type, payload in events
        ]

    @staticmethod
    def _coerce_datetime(value: Any, *, fallback: datetime | None = None) -> datetime:
        """Normalize unknown datetime values to an aware UTC datetime."""

        if isinstance(value, datetime):
            if value.tzinfo is None:
                return value.replace(tzinfo=timezone.utc)
            return value
        if isinstance(value, str):
            try:
                parsed = datetime.fromisoformat(value.replace("Z", "+00:00"))
                if parsed.tzinfo is None:
                    return parsed.replace(tzinfo=timezone.utc)
                return parsed
            except ValueError:
                pass
        if fallback is not None:
            return fallback
        return datetime.now(timezone.utc)

    @staticmethod
    def _resolve_current_stage(status_value: str) -> str:
        """Map persisted workflow status to one coarse-grained current stage."""

        normalized = status_value.strip().lower()
        if normalized.startswith("content"):
            return "content_generation"
        if normalized.startswith("image"):
            return "image_generation"
        if normalized.startswith("final"):
            return "final_render"
        if normalized in {"completed", "archived"}:
            return normalized
        return "queued"

    def _collect_asset_delete_targets(self, job: dict[str, Any]) -> set[Path]:
        """Collect absolute file paths that should be removed for a deleted job."""

        targets: set[Path] = set()
        default_root = self._asset_storage.get_absolute_path("")

        for asset in list(job.get("assets") or []):
            relative_path = self._normalize_relative_path(asset.get("relative_path"))
            storage_root = str(asset.get("storage_root") or "").strip() or default_root
            if relative_path:
                resolved = self._resolve_storage_target(storage_root, relative_path)
                if resolved is not None:
                    targets.add(resolved)

            absolute_path = str(asset.get("absolute_path") or "").strip()
            if absolute_path:
                resolved_absolute = self._resolve_known_absolute_target(
                    absolute_path=absolute_path,
                    allowed_storage_root=storage_root,
                )
                if resolved_absolute is not None:
                    targets.add(resolved_absolute)

            for key in ("asset_url", "public_url"):
                maybe_relative = self._relative_path_from_asset_url(str(asset.get(key) or ""))
                if maybe_relative:
                    resolved = self._resolve_storage_target(default_root, maybe_relative)
                    if resolved is not None:
                        targets.add(resolved)

        for key in ("image_preview_url", "final_preview_url"):
            maybe_relative = self._relative_path_from_asset_url(str(job.get(key) or ""))
            if maybe_relative:
                resolved = self._resolve_storage_target(default_root, maybe_relative)
                if resolved is not None:
                    targets.add(resolved)

        final_asset_urls = job.get("final_asset_urls")
        if isinstance(final_asset_urls, dict):
            for url in final_asset_urls.values():
                maybe_relative = self._relative_path_from_asset_url(str(url or ""))
                if maybe_relative:
                    resolved = self._resolve_storage_target(default_root, maybe_relative)
                    if resolved is not None:
                        targets.add(resolved)

        return targets

    @staticmethod
    def _normalize_relative_path(value: Any) -> str | None:
        """Normalize one storage-relative path and block traversal attempts."""

        candidate = str(value or "").strip().replace("\\", "/").lstrip("/")
        if not candidate:
            return None
        if any(part == ".." for part in candidate.split("/")):
            return None
        return candidate

    @staticmethod
    def _resolve_storage_target(storage_root: str, relative_path: str) -> Path | None:
        """Resolve one absolute storage path safely from `storage_root` + `relative_path`."""

        try:
            root = Path(storage_root).expanduser().resolve()
            target = (root / relative_path).resolve()
        except OSError:
            return None
        if root not in target.parents and target != root:
            return None
        return target

    @staticmethod
    def _resolve_known_absolute_target(*, absolute_path: str, allowed_storage_root: str) -> Path | None:
        """Allow absolute-path deletes only for files under one known storage root."""

        try:
            configured_root = Path(allowed_storage_root).expanduser().resolve()
            target = Path(absolute_path).expanduser().resolve()
        except OSError:
            return None
        if configured_root not in target.parents and target != configured_root:
            return None
        return target

    @staticmethod
    def _relative_path_from_asset_url(value: str) -> str | None:
        """Extract storage-relative path from asset URL-like values."""

        candidate = (value or "").strip()
        if not candidate:
            return None

        parsed = urlparse(candidate)
        path_candidate = parsed.path or candidate
        if "/assets/" in path_candidate:
            path_candidate = path_candidate.split("/assets/", 1)[1]
        elif parsed.scheme:
            return None

        normalized = unquote(path_candidate).replace("\\", "/").strip().lstrip("/")
        if not normalized:
            return None
        if any(part == ".." for part in normalized.split("/")):
            return None
        return normalized

    def _delete_asset_path(self, absolute: Path) -> bool:
        """Delete one absolute asset file if present."""

        try:
            if not absolute.exists() or not absolute.is_file():
                return False
            absolute.unlink(missing_ok=True)
            return True
        except (OSError, ValueError):
            logger.exception("failed deleting asset path=%s", absolute)
            return False

    def build_image_prompt(self, job: dict[str, Any]) -> str:
        """Build image prompt from theme + approved winner text + audience context."""

        winning_content = self._resolve_winning_content(job)
        visual_style = str(job.get("visual_style") or job.get("tone_style") or "conversational")
        return (
            f"Create a {visual_style} greeting-card visual for theme '{job['theme_name']}'. "
            f"Audience: {job['audience']}. Cultural context: {job['cultural_context']}. "
            f"Approved message text: {winning_content}"
        )

    @staticmethod
    def _build_image_preview_relative_path(job_id: str) -> str:
        """Return relative storage path for image approval preview."""

        return f"image/{job_id}_image_preview.png"

    @staticmethod
    def _build_final_preview_relative_path(job_id: str) -> str:
        """Return relative storage path for final approval preview."""

        return f"preview/{job_id}_content_preview.png"

    @staticmethod
    def _build_final_asset_relative_paths(job_id: str) -> dict[str, str]:
        """Return relative storage paths for final exported assets."""

        return {
            "png": f"final/{job_id}_final.png",
            "pdf": f"pdf/{job_id}_final.pdf",
        }

    def _generate_final_assets(self, *, job_id: str, job: dict[str, Any]) -> dict[str, dict[str, Any]]:
        """Render polished final card assets and ensure files exist."""

        relative_paths = self._build_final_asset_relative_paths(job_id)
        final_payload = FinalCardRenderInput(
            title=self._resolve_final_title(job),
            message=self._resolve_final_message(job),
            signoff=self._resolve_final_signoff(job),
            theme_style=self._resolve_theme_style(job),
            background_image_url=self._resolve_background_image_url(job),
            text_alignment=self._resolve_text_alignment(job),
            export_size=self._resolve_export_size(job),
        )
        png_bytes = self._card_renderer.render_final_png(final_payload)
        pdf_bytes = self._card_renderer.render_pdf_from_png(png_bytes)

        self._asset_storage.save_bytes(relative_paths["png"], png_bytes)
        self._asset_storage.save_bytes(relative_paths["pdf"], pdf_bytes)

        if not self._asset_storage.file_exists(relative_paths["png"]):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to generate final PNG asset",
            )
        if not self._asset_storage.file_exists(relative_paths["pdf"]):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Failed to generate final PDF asset",
            )
        storage_root = self._asset_storage.get_absolute_path("")
        return {
            "png": {
                "storage_backend": self._asset_storage.backend,
                "storage_root": storage_root,
                "relative_path": relative_paths["png"],
                "public_url": self._asset_storage.get_public_url(relative_paths["png"]),
                "absolute_path": self._asset_storage.get_absolute_path(relative_paths["png"]),
                "file_size_bytes": self._read_file_size_bytes(relative_paths["png"]),
            },
            "pdf": {
                "storage_backend": self._asset_storage.backend,
                "storage_root": storage_root,
                "relative_path": relative_paths["pdf"],
                "public_url": self._asset_storage.get_public_url(relative_paths["pdf"]),
                "absolute_path": self._asset_storage.get_absolute_path(relative_paths["pdf"]),
                "file_size_bytes": self._read_file_size_bytes(relative_paths["pdf"]),
            },
        }

    def _save_internal_preview_asset(
        self,
        *,
        relative_path: str,
        payload: PreviewCardRenderInput,
    ) -> None:
        """Render and save one internal preview card image."""

        image_bytes = self._card_renderer.render_preview_png(payload)
        self._asset_storage.save_bytes(relative_path, image_bytes)
        if not self._asset_storage.file_exists(relative_path):
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail=f"Failed to generate preview asset: {relative_path}",
            )

    def _read_file_size_bytes(self, relative_path: str) -> int | None:
        """Return file size in bytes for one stored relative path."""

        try:
            absolute = Path(self._asset_storage.get_absolute_path(relative_path))
            if not absolute.exists() or not absolute.is_file():
                return None
            return absolute.stat().st_size
        except OSError:
            return None

    @staticmethod
    def _resolve_rendering_options(job: dict[str, Any]) -> dict[str, Any]:
        """Return optional rendering config stored inside output_spec.rendering."""

        output_spec = job.get("output_spec")
        if not isinstance(output_spec, dict):
            return {}
        rendering = output_spec.get("rendering")
        return rendering if isinstance(rendering, dict) else {}

    def _resolve_theme_style(self, job: dict[str, Any]) -> str:
        """Map theme/visual hints to one supported final card template."""

        options = self._resolve_rendering_options(job)
        explicit = str(options.get("theme_style") or "").strip().lower()
        if explicit in {"minimal", "festive", "elegant", "playful"}:
            return explicit

        source = str(job.get("visual_style") or job.get("tone_style") or "").strip().lower()
        if any(token in source for token in ("festive", "celebr", "party")):
            return "festive"
        if any(token in source for token in ("elegant", "classic", "formal")):
            return "elegant"
        if any(token in source for token in ("playful", "fun", "casual")):
            return "playful"
        return "minimal"

    def _resolve_export_size(self, job: dict[str, Any]) -> str:
        """Resolve export size with default portrait 1080x1350."""

        options = self._resolve_rendering_options(job)
        export_size = str(options.get("export_size") or "1080x1350").strip()
        return export_size or "1080x1350"

    def _resolve_text_alignment(self, job: dict[str, Any]) -> str:
        """Resolve final card text alignment from rendering options."""

        options = self._resolve_rendering_options(job)
        alignment = str(options.get("text_alignment") or "center").strip().lower()
        return alignment if alignment in {"left", "center", "right"} else "center"

    def _resolve_background_image_url(self, job: dict[str, Any]) -> str | None:
        """Resolve optional background image URL from rendering options."""

        options = self._resolve_rendering_options(job)
        background_url = str(options.get("background_image_url") or "").strip()
        return background_url or None

    def _resolve_final_title(self, job: dict[str, Any]) -> str | None:
        """Resolve optional user-facing title for final card mode."""

        options = self._resolve_rendering_options(job)
        title = str(options.get("title") or "").strip()
        if title:
            return title
        fallback = str(job.get("theme_name") or "").strip()
        return fallback or None

    def _resolve_final_signoff(self, job: dict[str, Any]) -> str | None:
        """Resolve optional user-facing signoff for final card mode."""

        options = self._resolve_rendering_options(job)
        signoff = str(options.get("signoff") or "").strip()
        return signoff or None

    def _resolve_final_message(self, job: dict[str, Any]) -> str:
        """Resolve final card message with optional explicit override."""

        options = self._resolve_rendering_options(job)
        message = str(options.get("message") or "").strip()
        if message:
            return message
        return self._resolve_winning_content(job)

    @staticmethod
    def _shorten(text: str, *, max_len: int) -> str:
        """Return text truncated to a safe single-line preview length."""

        content = (text or "").strip()
        if len(content) <= max_len:
            return content
        return f"{content[: max_len - 3].rstrip()}..."

    @staticmethod
    def _resolve_winning_content(job: dict[str, Any]) -> str:
        """Return the stored winner content for prompt building and approvals."""

        candidates = job.get("candidates") or []
        winner = next((item for item in candidates if item.get("is_winner")), None)
        if winner and winner.get("content_text"):
            return str(winner["content_text"])
        return str(job.get("content_preview") or "")


@lru_cache(maxsize=1)
def get_workflow_v1_service() -> WorkflowV1Service:
    """Return singleton workflow service instance for all workflow endpoints."""

    return WorkflowV1Service(
        repository=get_workflow_job_repository(),
        asset_storage=get_asset_storage(),
    )
