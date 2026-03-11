"""Shared repository for workflow job persistence and lookup."""

from __future__ import annotations

from datetime import datetime, timezone
from functools import lru_cache
import logging
from typing import Any

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.orm import selectinload

from app.config import settings
from app.database import async_session_factory
from app.models.workflow import (
    CardApproval,
    CardAsset,
    CardAuditLog,
    CardContentCandidate,
    CardJob,
    CardJudgeResult,
)
from app.store.job_store import InMemoryJobStore, get_job_store

logger = logging.getLogger(__name__)


class WorkflowJobRepository:
    """Repository providing one persistence interface for all workflow endpoints."""

    def __init__(
        self,
        *,
        memory_store: InMemoryJobStore | None = None,
        allow_memory_fallback: bool = False,
    ) -> None:
        self._memory = memory_store or get_job_store()
        self._allow_memory_fallback = allow_memory_fallback
        self._memory_mode = False

    async def create_job(self, job: dict[str, Any]) -> str:
        """Persist one workflow job and return backend used."""

        if self._use_memory_backend():
            await self._memory.save_new_job(job=job, candidates=[], audit_events=[])
            return "memory_fallback"

        try:
            async with async_session_factory() as session:
                session.add(
                    CardJob(
                        job_id=job["job_id"],
                        trace_id=job["trace_id"],
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
                        image_approval_status=job["image_approval_status"],
                        final_approval_status=job["final_approval_status"],
                        image_prompt=job["image_prompt"],
                        image_preview_url=job["image_preview_url"],
                        final_preview_url=job["final_preview_url"],
                        final_asset_urls=job["final_asset_urls"],
                        created_at=job["created_at"],
                        updated_at=job["updated_at"],
                    )
                )
                await session.commit()
            return "postgres"
        except (SQLAlchemyError, OSError) as exc:
            return await self._handle_db_failure_and_maybe_fallback(
                op_name="create_job",
                error=exc,
                memory_action=lambda: self._memory.save_new_job(job=job, candidates=[], audit_events=[]),
            )

    async def get_job(self, job_id: str) -> tuple[dict[str, Any] | None, str]:
        """Load one job snapshot and return `(job, backend)`."""

        if self._use_memory_backend():
            job = await self._memory.get_job(job_id)
            return job, "memory_fallback"

        try:
            async with async_session_factory() as session:
                statement = (
                    select(CardJob)
                    .where(CardJob.job_id == job_id)
                    .options(
                        selectinload(CardJob.candidates),
                        selectinload(CardJob.judge_results),
                        selectinload(CardJob.approvals),
                        selectinload(CardJob.assets),
                        selectinload(CardJob.audit_events),
                    )
                )
                result = await session.execute(statement)
                job = result.scalar_one_or_none()
                if job is None:
                    return None, "postgres"
                snapshot = self._serialize_job(job)
                await self._memory.merge_snapshot(snapshot)
                return snapshot, "postgres"
        except (SQLAlchemyError, OSError) as exc:
            job = await self._handle_db_failure_and_maybe_fallback(
                op_name="get_job",
                error=exc,
                memory_action=lambda: self._memory.get_job(job_id),
            )
            return job, "memory_fallback"

    async def list_jobs(self, *, limit: int = 100) -> tuple[list[dict[str, Any]], str]:
        """Return newest-first jobs for admin console listings."""

        safe_limit = max(1, min(limit, 500))
        if self._use_memory_backend():
            rows = await self._memory.list_jobs()
            return rows[:safe_limit], "memory_fallback"

        try:
            async with async_session_factory() as session:
                statement = select(CardJob).order_by(CardJob.created_at.desc(), CardJob.job_id.desc()).limit(safe_limit)
                result = await session.execute(statement)
                rows = list(result.scalars().all())
        except (SQLAlchemyError, OSError) as exc:
            rows = await self._handle_db_failure_and_maybe_fallback(
                op_name="list_jobs",
                error=exc,
                memory_action=lambda: self._memory.list_jobs(),
            )
            return list(rows[:safe_limit]), "memory_fallback"

        return [
            {
                "job_id": item.job_id,
                "theme_name": item.theme_name,
                "status": item.status,
                "content_approval_status": item.content_approval_status,
                "image_approval_status": item.image_approval_status,
                "final_approval_status": item.final_approval_status,
                "created_at": item.created_at,
                "updated_at": item.updated_at,
            }
            for item in rows
        ], "postgres"

    async def update_job_status(
        self,
        job_id: str,
        *,
        updates: dict[str, Any],
        stage: str | None = None,
        decision: str | None = None,
        notes: str = "",
    ) -> dict[str, Any] | None:
        """Update job status and optional approval row through one repository path."""

        if self._use_memory_backend():
            if stage and decision:
                return await self._memory.apply_stage_update(
                    job_id=job_id,
                    stage=stage,
                    decision=decision,
                    notes=notes,
                    updates=updates,
                    audit_events=[],
                )
            job = await self._memory.get_job(job_id)
            if job is None:
                return None
            merged = {**job, **updates, "updated_at": datetime.now(timezone.utc)}
            await self._memory.merge_snapshot(merged)
            return merged

        try:
            async with async_session_factory() as session:
                db_job = await session.get(CardJob, job_id)
                if db_job is None:
                    return None

                for key, value in updates.items():
                    setattr(db_job, key, value)
                db_job.updated_at = datetime.now(timezone.utc)

                if stage and decision:
                    session.add(
                        CardApproval(
                            job_id=job_id,
                            stage=stage,
                            decision=decision,
                            notes=notes or None,
                        )
                    )

                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            return await self._handle_db_failure_and_maybe_fallback(
                op_name="update_job_status",
                error=exc,
                memory_action=lambda: self.update_job_status(
                    job_id,
                    updates=updates,
                    stage=stage,
                    decision=decision,
                    notes=notes,
                ),
            )

        job, _ = await self.get_job(job_id)
        return job

    async def delete_job(self, job_id: str) -> tuple[dict[str, Any] | None, str]:
        """Delete one job and return removed snapshot when available."""

        if self._use_memory_backend():
            record = await self._memory.delete_job(job_id)
            return record, "memory_fallback"

        try:
            async with async_session_factory() as session:
                statement = (
                    select(CardJob)
                    .where(CardJob.job_id == job_id)
                    .options(
                        selectinload(CardJob.candidates),
                        selectinload(CardJob.judge_results),
                        selectinload(CardJob.approvals),
                        selectinload(CardJob.assets),
                        selectinload(CardJob.audit_events),
                    )
                )
                result = await session.execute(statement)
                db_job = result.scalar_one_or_none()
                if db_job is None:
                    return None, "postgres"

                snapshot = self._serialize_job(db_job)
                await session.delete(db_job)
                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            record = await self._handle_db_failure_and_maybe_fallback(
                op_name="delete_job",
                error=exc,
                memory_action=lambda: self._memory.delete_job(job_id),
            )
            return record, "memory_fallback"

        await self._memory.delete_job(job_id)
        return snapshot, "postgres"

    async def save_content_candidates(self, job_id: str, candidates: list[dict[str, Any]]) -> None:
        """Persist generated content candidates."""

        if self._use_memory_backend():
            job = await self._memory.get_job(job_id)
            if job is None:
                return
            job["candidates"] = candidates
            await self._memory.merge_snapshot(job)
            return

        try:
            async with async_session_factory() as session:
                for candidate in candidates:
                    session.add(
                        CardContentCandidate(
                            job_id=job_id,
                            model=candidate["model"],
                            backend=candidate["backend"],
                            content_text=candidate["content_text"],
                            raw_score=float(candidate["raw_score"]),
                            judge_score=float(candidate["judge_score"]),
                            is_winner=bool(candidate["is_winner"]),
                        )
                    )
                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            await self._handle_db_failure_and_maybe_fallback(
                op_name="save_content_candidates",
                error=exc,
                memory_action=lambda: self.save_content_candidates(job_id, candidates),
            )

    async def save_judge_results(self, job_id: str, result: dict[str, Any]) -> None:
        """Persist judge output for traceability."""

        if self._use_memory_backend():
            job = await self._memory.get_job(job_id)
            if job is None:
                return
            job["judge_results"] = [result]
            await self._memory.merge_snapshot(job)
            return

        try:
            async with async_session_factory() as session:
                session.add(
                    CardJudgeResult(
                        job_id=job_id,
                        judge_provider=str(result.get("judge_provider", "contentforge_stub")),
                        judge_model=str(result.get("judge_model", "stub-judge")),
                        winner_model=str(result.get("winner_model", "")),
                        leaderboard_json=result.get("leaderboard_json", {}),
                        pairwise_json=result.get("pairwise_json", {}),
                        reason_summary=result.get("reason_summary"),
                    )
                )
                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            await self._handle_db_failure_and_maybe_fallback(
                op_name="save_judge_results",
                error=exc,
                memory_action=lambda: self.save_judge_results(job_id, result),
            )

    async def save_asset(
        self,
        job_id: str,
        *,
        asset_type: str,
        asset_url: str = "",
        relative_path: str | None = None,
        public_url: str | None = None,
        absolute_path: str | None = None,
        version: str = "v1",
        approved: bool = False,
    ) -> None:
        """Persist asset metadata."""

        if self._use_memory_backend():
            job = await self._memory.get_job(job_id)
            if job is None:
                return
            assets = list(job.get("assets") or [])
            assets.append(
                {
                    "asset_type": asset_type,
                    "asset_url": public_url or asset_url,
                    "relative_path": relative_path,
                    "public_url": public_url,
                    "absolute_path": absolute_path,
                    "version": version,
                    "approved": approved,
                    "created_at": datetime.now(timezone.utc),
                }
            )
            job["assets"] = assets
            await self._memory.merge_snapshot(job)
            return

        try:
            async with async_session_factory() as session:
                session.add(
                    CardAsset(
                        job_id=job_id,
                        asset_type=asset_type,
                        asset_url=public_url or asset_url,
                        relative_path=relative_path,
                        public_url=public_url,
                        absolute_path=absolute_path,
                        version=version,
                        approved=approved,
                    )
                )
                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            await self._handle_db_failure_and_maybe_fallback(
                op_name="save_asset",
                error=exc,
                memory_action=lambda: self.save_asset(
                    job_id,
                    asset_type=asset_type,
                    asset_url=asset_url,
                    relative_path=relative_path,
                    public_url=public_url,
                    absolute_path=absolute_path,
                    version=version,
                    approved=approved,
                ),
            )

    async def append_audit_event(
        self,
        job_id: str,
        *,
        event_type: str,
        payload: dict[str, Any],
        created_at: datetime | None = None,
    ) -> None:
        """Persist one audit event."""

        event_time = created_at or datetime.now(timezone.utc)
        if self._use_memory_backend():
            job = await self._memory.get_job(job_id)
            if job is None:
                return
            audit = list(job.get("audit_log") or [])
            audit.append(
                {
                    "event_type": event_type,
                    "event_payload_json": payload,
                    "created_at": event_time,
                }
            )
            job["audit_log"] = audit
            await self._memory.merge_snapshot(job)
            return

        try:
            async with async_session_factory() as session:
                session.add(
                    CardAuditLog(
                        job_id=job_id,
                        event_type=event_type,
                        event_payload_json=payload,
                        created_at=event_time,
                    )
                )
                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            await self._handle_db_failure_and_maybe_fallback(
                op_name="append_audit_event",
                error=exc,
                memory_action=lambda: self.append_audit_event(
                    job_id,
                    event_type=event_type,
                    payload=payload,
                    created_at=event_time,
                ),
            )

    async def append_audit_events(self, job_id: str, events: list[dict[str, Any]]) -> None:
        """Persist a list of audit events."""

        for event in events:
            await self.append_audit_event(
                job_id,
                event_type=str(event["event_type"]),
                payload=dict(event["event_payload_json"]),
                created_at=event["created_at"],
            )

    async def _handle_db_failure_and_maybe_fallback(
        self,
        *,
        op_name: str,
        error: BaseException,
        memory_action,
    ):
        """Switch to fallback if allowed; otherwise fail fast."""

        if not self._allow_memory_fallback:
            logger.exception("workflow repository db error op=%s fallback=disabled", op_name)
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Workflow persistence backend unavailable",
            ) from error

        self._memory_mode = True
        logger.warning(
            "workflow repository switched to memory fallback op=%s reason=%s",
            op_name,
            error,
        )
        return await memory_action()

    def _use_memory_backend(self) -> bool:
        """Return True when repository should use the memory fallback backend."""

        return self._allow_memory_fallback and self._memory_mode

    @staticmethod
    def _serialize_job(job: CardJob) -> dict[str, Any]:
        """Serialize full workflow job snapshot."""

        candidates = sorted(job.candidates, key=lambda item: item.id)
        approvals = sorted(job.approvals, key=lambda item: item.id)
        assets = sorted(job.assets, key=lambda item: item.id)
        judge_results = sorted(job.judge_results, key=lambda item: item.id)
        audit_events = sorted(job.audit_events, key=lambda item: item.id)

        final_assets = job.final_asset_urls or {}
        for asset in assets:
            if asset.asset_type == "final_png":
                final_assets.setdefault("png", asset.public_url or asset.asset_url)
            if asset.asset_type == "final_pdf":
                final_assets.setdefault("pdf", asset.public_url or asset.asset_url)

        return {
            "job_id": job.job_id,
            "trace_id": job.trace_id,
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
            "image_approval_status": job.image_approval_status,
            "final_approval_status": job.final_approval_status,
            "image_prompt": job.image_prompt,
            "image_preview_url": job.image_preview_url,
            "final_preview_url": job.final_preview_url,
            "final_asset_urls": final_assets or None,
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
            "judge_results": [
                {
                    "judge_provider": item.judge_provider,
                    "judge_model": item.judge_model,
                    "winner_model": item.winner_model,
                    "leaderboard_json": item.leaderboard_json,
                    "pairwise_json": item.pairwise_json,
                    "reason_summary": item.reason_summary,
                }
                for item in judge_results
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
            "assets": [
                {
                    "asset_type": item.asset_type,
                    "asset_url": item.public_url or item.asset_url,
                    "relative_path": item.relative_path,
                    "public_url": item.public_url,
                    "absolute_path": item.absolute_path,
                    "version": item.version,
                    "approved": item.approved,
                    "created_at": item.created_at,
                }
                for item in assets
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


@lru_cache(maxsize=1)
def get_workflow_job_repository() -> WorkflowJobRepository:
    """Return singleton workflow repository."""

    return WorkflowJobRepository(
        memory_store=get_job_store(),
        allow_memory_fallback=bool(settings.workflow_memory_fallback_enabled),
    )
