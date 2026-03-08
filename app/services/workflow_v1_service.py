"""Business logic for v1 n8n workflow endpoints with DB-first persistence and memory fallback."""

from __future__ import annotations

from datetime import datetime, timezone
from functools import lru_cache
import logging
from typing import Any
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
    JobDebugResponse,
    StartJobRequest,
    StartJobResponse,
)

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

    def __init__(self, *, repository: WorkflowJobRepository | None = None) -> None:
        self._contentforge = StubContentForgeClient()
        self._repository = repository or get_workflow_job_repository()

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
            "output_spec": payload.output_spec.model_dump(),
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
            image_preview_url = self._build_image_preview_url(job_id)
            approved_content = self._resolve_winning_content(job)
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
                ("image_generated", {"stub": True, "image_preview_url": image_preview_url}),
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
            await self._repository.save_asset(
                job_id,
                asset_type="image_preview",
                asset_url=str(updated.get("image_preview_url") or ""),
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
            final_preview_url = self._build_final_preview_url(job_id)
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
                ("preview_assembled", {"stub": True, "final_preview_url": final_preview_url}),
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
            await self._repository.save_asset(
                job_id,
                asset_type="final_preview",
                asset_url=str(updated.get("final_preview_url") or ""),
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

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        old_status = str(job["status"])
        self._assert_expected_status(job, expected="final_pending_approval")

        if payload.decision == "approved":
            final_asset_urls = self._build_final_asset_urls(job_id)
            updates = {
                "status": "completed",
                "final_approval_status": "approved",
                "final_asset_urls": final_asset_urls,
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_approved", {"notes": payload.notes}),
                ("final_png_exported", {"stub": True, "png": final_asset_urls["png"]}),
                ("job_completed", {"status": "completed"}),
            ]
        else:
            updates = {
                "status": "final_rejected",
                "final_approval_status": "rejected",
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_rejected", {"notes": payload.notes}),
            ]

        audit_events = self._build_audit_events(job_id=job_id, events=events)
        updated = await self._repository.update_job_status(
            job_id=job_id,
            updates=updates,
            stage="final",
            decision=payload.decision,
            notes=payload.notes,
        )
        assert updated is not None
        await self._repository.append_audit_events(job_id, audit_events)

        if payload.decision == "approved":
            final_urls = updates.get("final_asset_urls") or {}
            png_url = str(final_urls.get("png", ""))
            pdf_url = str(final_urls.get("pdf", ""))
            if png_url:
                await self._repository.save_asset(
                    job_id,
                    asset_type="final_png",
                    asset_url=png_url,
                    version="v1",
                    approved=True,
                )
            if pdf_url:
                await self._repository.save_asset(
                    job_id,
                    asset_type="final_pdf",
                    asset_url=pdf_url,
                    version="v1",
                    approved=True,
                )
        logger.info(
            "workflow transition job_id=%s stage=final %s -> %s",
            job_id,
            old_status,
            updated["status"],
        )

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
    def _build_image_preview_url(job_id: str) -> str:
        """Return placeholder image URL until real image generation is integrated."""

        return f"http://localhost:8080/assets/{job_id}_image_preview.png"

    @staticmethod
    def _build_final_preview_url(job_id: str) -> str:
        """Return placeholder final-preview URL until real assembly is integrated."""

        return f"http://localhost:8080/assets/{job_id}_final_preview.png"

    @staticmethod
    def _build_final_asset_urls(job_id: str) -> dict[str, str]:
        """Return placeholder export URLs until real export logic is integrated."""

        suffix = job_id.removeprefix("job_")
        return {
            "png": f"http://localhost:8080/assets/final_{suffix}.png",
            "pdf": f"http://localhost:8080/assets/final_{suffix}.pdf",
        }

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

    return WorkflowV1Service(repository=get_workflow_job_repository())
