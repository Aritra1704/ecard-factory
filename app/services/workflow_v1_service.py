"""Business logic for v1 n8n workflow endpoints with DB-first persistence and memory fallback."""

from __future__ import annotations

import asyncio
from copy import deepcopy
from datetime import datetime, timezone
import logging
from typing import Any
from uuid import uuid4

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import selectinload

from app.database import async_session_factory
from app.models.workflow import CardApproval, CardAuditLog, CardContentCandidate, CardJob
from app.schemas.workflow import (
    ApprovalRequest,
    ContentApprovalRequest,
    ContentApprovalResponse,
    FinalApprovalResponse,
    FinalAssetUrls,
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


class _InMemoryWorkflowStore:
    """Process-local fallback store used when Postgres is unavailable."""

    def __init__(self) -> None:
        self._jobs: dict[str, dict[str, Any]] = {}
        self._lock = asyncio.Lock()

    async def save_new_job(
        self,
        *,
        job: dict[str, Any],
        candidates: list[dict[str, Any]],
        audit_events: list[dict[str, Any]],
    ) -> None:
        """Insert a full job snapshot into memory."""

        async with self._lock:
            record = deepcopy(job)
            record["candidates"] = deepcopy(candidates)
            record["approvals"] = []
            record["audit_log"] = deepcopy(audit_events)
            self._jobs[record["job_id"]] = record

    async def merge_snapshot(self, snapshot: dict[str, Any]) -> None:
        """Upsert a DB snapshot into memory cache for fast fallback reads."""

        async with self._lock:
            self._jobs[snapshot["job_id"]] = deepcopy(snapshot)

    async def get_job(self, job_id: str) -> dict[str, Any] | None:
        """Return one job snapshot or None if missing."""

        async with self._lock:
            record = self._jobs.get(job_id)
            return deepcopy(record) if record else None

    async def apply_stage_update(
        self,
        *,
        job_id: str,
        stage: str,
        decision: str,
        notes: str,
        updates: dict[str, Any],
        audit_events: list[dict[str, Any]],
    ) -> dict[str, Any] | None:
        """Apply one stage decision and related audit events to a memory job."""

        async with self._lock:
            record = self._jobs.get(job_id)
            if record is None:
                return None

            now = datetime.now(timezone.utc)
            approval_entry = {
                "stage": stage,
                "decision": decision,
                "notes": notes,
                "decided_by": "n8n_v1",
                "decided_at": now,
            }
            record["approvals"].append(approval_entry)

            for key, value in updates.items():
                record[key] = value
            record["updated_at"] = now

            for event in audit_events:
                record["audit_log"].append(event)

            return deepcopy(record)


class WorkflowV1Service:
    """Orchestrates v1 workflow state transitions expected by imported n8n flow."""

    def __init__(self) -> None:
        self._contentforge = StubContentForgeClient()
        self._memory = _InMemoryWorkflowStore()
        self._prefer_memory = False

    async def start_job(self, payload: StartJobRequest) -> StartJobResponse:
        """Create a job, run stub generation/judging, persist state, and return approval payload."""

        job_id = f"job_{uuid4().hex[:10]}"
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

        await self._memory.save_new_job(job=job_record, candidates=candidate_records, audit_events=audit_events)
        await self._persist_start_to_db(job_record, candidate_records, audit_events)

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
        self._assert_expected_status(job, expected="content_pending_approval")

        if decision == "approved":
            image_prompt = self.build_image_prompt(job)
            image_preview_url = self._build_image_preview_url(job_id)
            approved_content = self._resolve_winning_content(job)
            updates = {
                "status": "image_pending_approval",
                "content_approval_status": "approved",
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
        updated = await self._memory.apply_stage_update(
            job_id=job_id,
            stage="content",
            decision=decision,
            notes=notes,
            updates=updates,
            audit_events=audit_events,
        )
        assert updated is not None

        await self._persist_stage_update_to_db(
            job_id=job_id,
            stage="content",
            decision=decision,
            notes=notes,
            updates=updates,
            audit_events=audit_events,
        )

        return ContentApprovalResponse(
            job_id=job_id,
            status=str(updated["status"]),
            image_prompt=updated.get("image_prompt"),
            image_preview_url=updated.get("image_preview_url"),
        )

    async def submit_image_approval(self, job_id: str, payload: ApprovalRequest) -> ImageApprovalResponse:
        """Persist image approval and prepare final approval preview."""

        job = await self._load_job(job_id)
        if job is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Job not found.")
        self._assert_expected_status(job, expected="image_pending_approval")

        if payload.decision == "approved":
            final_preview_url = self._build_final_preview_url(job_id)
            updates = {
                "status": "final_pending_approval",
                "final_preview_url": final_preview_url,
            }
            events = [
                ("api_image_approval_called", {"endpoint": f"/api/jobs/{job_id}/image-approval"}),
                ("image_approved", {"notes": payload.notes}),
                ("preview_assembled", {"stub": True, "final_preview_url": final_preview_url}),
                ("final_approval_requested", {"final_preview_url": final_preview_url}),
            ]
        else:
            updates = {"status": "image_rejected"}
            events = [
                ("api_image_approval_called", {"endpoint": f"/api/jobs/{job_id}/image-approval"}),
                ("image_rejected", {"notes": payload.notes}),
            ]

        audit_events = self._build_audit_events(job_id=job_id, events=events)
        updated = await self._memory.apply_stage_update(
            job_id=job_id,
            stage="image",
            decision=payload.decision,
            notes=payload.notes,
            updates=updates,
            audit_events=audit_events,
        )
        assert updated is not None

        await self._persist_stage_update_to_db(
            job_id=job_id,
            stage="image",
            decision=payload.decision,
            notes=payload.notes,
            updates=updates,
            audit_events=audit_events,
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
        self._assert_expected_status(job, expected="final_pending_approval")

        if payload.decision == "approved":
            final_asset_urls = self._build_final_asset_urls(job_id)
            updates = {
                "status": "completed",
                "final_asset_urls": final_asset_urls,
            }
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_approved", {"notes": payload.notes}),
                ("final_png_exported", {"stub": True, "png": final_asset_urls["png"]}),
                ("job_completed", {"status": "completed"}),
            ]
        else:
            updates = {"status": "final_rejected"}
            events = [
                ("api_final_approval_called", {"endpoint": f"/api/jobs/{job_id}/final-approval"}),
                ("final_rejected", {"notes": payload.notes}),
            ]

        audit_events = self._build_audit_events(job_id=job_id, events=events)
        updated = await self._memory.apply_stage_update(
            job_id=job_id,
            stage="final",
            decision=payload.decision,
            notes=payload.notes,
            updates=updates,
            audit_events=audit_events,
        )
        assert updated is not None

        await self._persist_stage_update_to_db(
            job_id=job_id,
            stage="final",
            decision=payload.decision,
            notes=payload.notes,
            updates=updates,
            audit_events=audit_events,
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

        db_job = await self._fetch_job_from_db(job_id)
        if db_job is not None:
            await self._memory.merge_snapshot(db_job)
            return db_job
        return await self._memory.get_job(job_id)

    async def _fetch_job_from_db(self, job_id: str) -> dict[str, Any] | None:
        """Read one job and related rows from Postgres unless DB fallback is active."""

        if self._prefer_memory:
            return None

        try:
            async with async_session_factory() as session:
                statement = (
                    select(CardJob)
                    .where(CardJob.job_id == job_id)
                    .options(
                        selectinload(CardJob.candidates),
                        selectinload(CardJob.approvals),
                        selectinload(CardJob.audit_events),
                    )
                )
                result = await session.execute(statement)
                job = result.scalar_one_or_none()
                if job is None:
                    return None

                candidates = sorted(job.candidates, key=lambda item: item.id)
                approvals = sorted(job.approvals, key=lambda item: item.id)
                audit_events = sorted(job.audit_events, key=lambda item: item.id)

                return {
                    "job_id": job.job_id,
                    "status": job.status,
                    "theme_name": job.theme_name,
                    "tone_funny_pct": job.tone_funny_pct,
                    "tone_emotion_pct": job.tone_emotion_pct,
                    "tone_style": job.tone_style,
                    "visual_style": job.visual_style,
                    "audience": job.audience,
                    "cultural_context": job.cultural_context,
                    "output_spec": job.output_spec,
                    "avoid_cliches": job.avoid_cliches,
                    "content_preview": job.content_preview,
                    "winner_model": job.winner_model,
                    "content_approval_status": job.content_approval_status,
                    "image_prompt": job.image_prompt,
                    "image_preview_url": job.image_preview_url,
                    "final_preview_url": job.final_preview_url,
                    "final_asset_urls": job.final_asset_urls,
                    "created_at": job.created_at,
                    "updated_at": job.updated_at,
                    "candidates": [
                        {
                            "model": item.model,
                            "backend": item.backend,
                            "content_text": item.content_text,
                            "raw_score": float(item.raw_score),
                            "judge_score": float(item.judge_score),
                            "is_winner": item.is_winner,
                        }
                        for item in candidates
                    ],
                    "approvals": [
                        {
                            "stage": item.stage,
                            "decision": item.decision,
                            "notes": item.notes,
                            "decided_by": item.decided_by,
                            "decided_at": item.decided_at,
                        }
                        for item in approvals
                    ],
                    "audit_log": [
                        {
                            "event_type": item.event_type,
                            "event_payload_json": item.event_payload_json,
                            "created_at": item.created_at,
                        }
                        for item in audit_events
                    ],
                }
        except (SQLAlchemyError, OSError) as exc:
            logger.warning(
                "Workflow DB read failed for job '%s'; using in-memory fallback. Error: %s",
                job_id,
                exc,
            )
            self._prefer_memory = True
            return None

    async def _persist_start_to_db(
        self,
        job: dict[str, Any],
        candidates: list[dict[str, Any]],
        audit_events: list[dict[str, Any]],
    ) -> None:
        """Best-effort DB persistence for initial job creation."""

        if self._prefer_memory:
            return

        try:
            async with async_session_factory() as session:
                db_job = CardJob(
                    job_id=job["job_id"],
                    status=job["status"],
                    theme_name=job["theme_name"],
                    tone_funny_pct=job["tone_funny_pct"],
                    tone_emotion_pct=job["tone_emotion_pct"],
                    tone_style=job["tone_style"],
                    visual_style=job["visual_style"],
                    audience=job["audience"],
                    cultural_context=job["cultural_context"],
                    output_spec=job["output_spec"],
                    avoid_cliches=job["avoid_cliches"],
                    content_preview=job["content_preview"],
                    winner_model=job["winner_model"],
                    content_approval_status=job["content_approval_status"],
                    created_at=job["created_at"],
                    updated_at=job["updated_at"],
                )
                session.add(db_job)

                for candidate in candidates:
                    session.add(
                        CardContentCandidate(
                            job_id=job["job_id"],
                            model=candidate["model"],
                            backend=candidate["backend"],
                            content_text=candidate["content_text"],
                            raw_score=candidate["raw_score"],
                            judge_score=candidate["judge_score"],
                            is_winner=candidate["is_winner"],
                        )
                    )

                for event in audit_events:
                    session.add(
                        CardAuditLog(
                            job_id=job["job_id"],
                            event_type=event["event_type"],
                            event_payload_json=event["event_payload_json"],
                            created_at=event["created_at"],
                        )
                    )

                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            logger.warning(
                "Workflow DB write failed on start-job for '%s'; using in-memory fallback. Error: %s",
                job["job_id"],
                exc,
            )
            self._prefer_memory = True

    async def _persist_stage_update_to_db(
        self,
        *,
        job_id: str,
        stage: str,
        decision: str,
        notes: str,
        updates: dict[str, Any],
        audit_events: list[dict[str, Any]],
    ) -> None:
        """Best-effort DB persistence for approval stage updates."""

        if self._prefer_memory:
            return

        try:
            async with async_session_factory() as session:
                db_job = await session.get(CardJob, job_id)
                if db_job is None:
                    return

                for key, value in updates.items():
                    setattr(db_job, key, value)
                db_job.updated_at = datetime.now(timezone.utc)

                session.add(
                    CardApproval(
                        job_id=job_id,
                        stage=stage,
                        decision=decision,
                        notes=notes or None,
                    )
                )

                for event in audit_events:
                    session.add(
                        CardAuditLog(
                            job_id=job_id,
                            event_type=event["event_type"],
                            event_payload_json=event["event_payload_json"],
                            created_at=event["created_at"],
                        )
                    )

                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            logger.warning(
                "Workflow DB write failed on '%s' update for '%s'; using in-memory fallback. Error: %s",
                stage,
                job_id,
                exc,
            )
            self._prefer_memory = True

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

        suffix = job_id.removeprefix("job_")
        return f"http://localhost:8080/assets/final_preview_{suffix}.png"

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
