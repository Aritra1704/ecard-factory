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
    CardShortlist,
)
from app.storage import get_asset_storage
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
                        cards_per_theme=int(job.get("cards_per_theme") or 10),
                        operator_notes=str(job.get("operator_notes") or "") or None,
                        retry_count=int(job.get("retry_count") or 0),
                        last_stage_started_at=job.get("last_stage_started_at"),
                        last_stage_finished_at=job.get("last_stage_finished_at"),
                        last_error_message=job.get("last_error_message"),
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
                        selectinload(CardJob.shortlists).selectinload(CardShortlist.candidate),
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
                statement = (
                    select(CardJob)
                    .options(selectinload(CardJob.assets))
                    .order_by(CardJob.created_at.desc(), CardJob.job_id.desc())
                    .limit(safe_limit)
                )
                result = await session.execute(statement)
                rows = list(result.scalars().all())
        except (SQLAlchemyError, OSError) as exc:
            rows = await self._handle_db_failure_and_maybe_fallback(
                op_name="list_jobs",
                error=exc,
                memory_action=lambda: self._memory.list_jobs(),
            )
            return list(rows[:safe_limit]), "memory_fallback"

        response_rows: list[dict[str, Any]] = []
        for item in rows:
            image_preview_url, final_preview_url, final_asset_urls = self._resolve_job_asset_fields(item)
            response_rows.append(
                {
                    "job_id": item.job_id,
                    "theme_name": item.theme_name,
                    "status": item.status,
                    "content_preview": item.content_preview,
                    "image_preview_url": image_preview_url,
                    "final_preview_url": final_preview_url,
                    "final_asset_urls": final_asset_urls,
                    "cards_per_theme": item.cards_per_theme,
                    "content_approval_status": item.content_approval_status,
                    "image_approval_status": item.image_approval_status,
                    "final_approval_status": item.final_approval_status,
                    "retry_count": item.retry_count,
                    "last_error_message": item.last_error_message,
                    "created_at": item.created_at,
                    "updated_at": item.updated_at,
                }
            )

        return response_rows, "postgres"

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
                        selectinload(CardJob.shortlists).selectinload(CardShortlist.candidate),
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

    async def save_content_candidates(
        self,
        job_id: str,
        candidates: list[dict[str, Any]],
        *,
        replace_existing: bool = False,
    ) -> None:
        """Persist generated content candidates."""

        if self._use_memory_backend():
            job = await self._memory.get_job(job_id)
            if job is None:
                return
            normalized_candidates: list[dict[str, Any]] = []
            for index, candidate in enumerate(candidates, start=1):
                normalized_candidates.append(
                    {
                        "id": int(candidate.get("id") or index),
                        "model": str(candidate["model"]),
                        "backend": str(candidate["backend"]),
                        "content_text": str(candidate.get("content_text") or candidate.get("text") or ""),
                        "text": str(candidate.get("text") or candidate.get("content_text") or ""),
                        "raw_score": float(candidate.get("raw_score") or 0.0),
                        "judge_score": float(candidate.get("judge_score") or candidate.get("judged_score") or 0.0),
                        "judged_score": float(candidate.get("judged_score") or candidate.get("judge_score") or 0.0),
                        "is_winner": bool(candidate.get("is_winner")),
                        "is_shortlisted": bool(candidate.get("is_shortlisted")),
                        "is_selected": bool(candidate.get("is_selected")),
                        "created_at": candidate.get("created_at") or datetime.now(timezone.utc),
                    }
                )
            job["candidates"] = normalized_candidates
            if replace_existing:
                job["shortlist"] = []
            await self._memory.merge_snapshot(job)
            return

        try:
            async with async_session_factory() as session:
                if replace_existing:
                    existing_result = await session.execute(
                        select(CardContentCandidate).where(CardContentCandidate.job_id == job_id)
                    )
                    for record in existing_result.scalars().all():
                        await session.delete(record)
                    shortlist_result = await session.execute(
                        select(CardShortlist).where(CardShortlist.job_id == job_id)
                    )
                    for record in shortlist_result.scalars().all():
                        await session.delete(record)
                    await session.flush()
                for candidate in candidates:
                    session.add(
                        CardContentCandidate(
                            job_id=job_id,
                            model=candidate["model"],
                            backend=candidate["backend"],
                            content_text=str(candidate.get("content_text") or candidate.get("text") or ""),
                            raw_score=float(candidate["raw_score"]),
                            judge_score=float(candidate.get("judge_score") or candidate.get("judged_score") or 0.0),
                            is_winner=bool(candidate["is_winner"]),
                            is_shortlisted=bool(candidate.get("is_shortlisted")),
                            is_selected=bool(candidate.get("is_selected")),
                        )
                    )
                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            await self._handle_db_failure_and_maybe_fallback(
                op_name="save_content_candidates",
                error=exc,
                memory_action=lambda: self.save_content_candidates(
                    job_id,
                    candidates,
                    replace_existing=replace_existing,
                ),
            )

    async def save_shortlist(
        self,
        job_id: str,
        shortlist_rows: list[dict[str, Any]],
        *,
        replace_existing: bool = False,
    ) -> None:
        """Persist ranked shortlist rows and keep candidate shortlist flags in sync."""

        if self._use_memory_backend():
            job = await self._memory.get_job(job_id)
            if job is None:
                return
            shortlist = []
            candidate_lookup = {
                int(candidate.get("id") or 0): candidate
                for candidate in list(job.get("candidates") or [])
            }
            selected_ids = {int(row.get("candidate_id") or 0) for row in shortlist_rows if row.get("candidate_id")}
            rank_by_candidate = {
                int(row.get("candidate_id") or 0): int(row.get("rank") or 0)
                for row in shortlist_rows
                if row.get("candidate_id")
            }
            for index, row in enumerate(shortlist_rows, start=1):
                candidate_id = int(row["candidate_id"])
                candidate = candidate_lookup.get(candidate_id, {})
                shortlist.append(
                    {
                        "shortlist_id": int(row.get("id") or index),
                        "candidate_id": candidate_id,
                        "rank": int(row["rank"]),
                        "score": float(row["score"]),
                        "model": str(candidate.get("model") or ""),
                        "backend": str(candidate.get("backend") or ""),
                        "text": str(candidate.get("content_text") or candidate.get("text") or ""),
                        "is_selected": bool(candidate.get("is_selected")),
                        "created_at": row.get("created_at") or datetime.now(timezone.utc),
                    }
                )
            for candidate in list(job.get("candidates") or []):
                candidate_id = int(candidate.get("id") or 0)
                candidate["is_shortlisted"] = candidate_id in selected_ids
                candidate["shortlist_rank"] = rank_by_candidate.get(candidate_id)
            if replace_existing:
                job["shortlist"] = shortlist
            else:
                job["shortlist"] = list(job.get("shortlist") or []) + shortlist
            await self._memory.merge_snapshot(job)
            return

        try:
            async with async_session_factory() as session:
                if replace_existing:
                    result = await session.execute(select(CardShortlist).where(CardShortlist.job_id == job_id))
                    for record in result.scalars().all():
                        await session.delete(record)
                candidate_result = await session.execute(
                    select(CardContentCandidate).where(CardContentCandidate.job_id == job_id)
                )
                candidates_by_id = {candidate.id: candidate for candidate in candidate_result.scalars().all()}
                shortlisted_ids = {
                    int(row["candidate_id"])
                    for row in shortlist_rows
                    if int(row.get("candidate_id") or 0) in candidates_by_id
                }
                for candidate in candidates_by_id.values():
                    candidate.is_shortlisted = candidate.id in shortlisted_ids
                await session.flush()
                for row in shortlist_rows:
                    candidate_id = int(row["candidate_id"])
                    if candidate_id not in candidates_by_id:
                        continue
                    session.add(
                        CardShortlist(
                            job_id=job_id,
                            candidate_id=candidate_id,
                            rank=int(row["rank"]),
                            score=float(row["score"]),
                        )
                    )
                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            await self._handle_db_failure_and_maybe_fallback(
                op_name="save_shortlist",
                error=exc,
                memory_action=lambda: self.save_shortlist(
                    job_id,
                    shortlist_rows,
                    replace_existing=replace_existing,
                ),
            )

    async def update_candidate_selection(self, job_id: str, selected_candidate_ids: list[int]) -> None:
        """Persist shortlist candidate selection flags for rendering."""

        selected_ids = {int(candidate_id) for candidate_id in selected_candidate_ids}
        if self._use_memory_backend():
            job = await self._memory.get_job(job_id)
            if job is None:
                return
            for candidate in list(job.get("candidates") or []):
                candidate["is_selected"] = int(candidate.get("id") or 0) in selected_ids
            for shortlist in list(job.get("shortlist") or []):
                shortlist["is_selected"] = int(shortlist.get("candidate_id") or 0) in selected_ids
            await self._memory.merge_snapshot(job)
            return

        try:
            async with async_session_factory() as session:
                result = await session.execute(
                    select(CardContentCandidate).where(CardContentCandidate.job_id == job_id)
                )
                for candidate in result.scalars().all():
                    candidate.is_selected = candidate.id in selected_ids
                await session.commit()
        except (SQLAlchemyError, OSError) as exc:
            await self._handle_db_failure_and_maybe_fallback(
                op_name="update_candidate_selection",
                error=exc,
                memory_action=lambda: self.update_candidate_selection(job_id, list(selected_ids)),
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
        storage_backend: str,
        storage_root: str,
        relative_path: str | None = None,
        public_url: str | None = None,
        absolute_path: str | None = None,
        file_size_bytes: int | None = None,
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
                    "storage_backend": storage_backend,
                    "storage_root": storage_root,
                    "relative_path": relative_path,
                    "public_url": public_url,
                    "absolute_path": absolute_path,
                    "file_size_bytes": file_size_bytes,
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
                        storage_backend=storage_backend,
                        storage_root=storage_root,
                        relative_path=relative_path,
                        public_url=public_url,
                        absolute_path=absolute_path,
                        file_size_bytes=file_size_bytes,
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
                    storage_backend=storage_backend,
                    storage_root=storage_root,
                    relative_path=relative_path,
                    public_url=public_url,
                    absolute_path=absolute_path,
                    file_size_bytes=file_size_bytes,
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

        candidates = sorted(job.candidates, key=lambda item: item.id or 0)
        shortlists = sorted(job.shortlists, key=lambda item: (item.rank, item.id or 0))
        approvals = sorted(job.approvals, key=lambda item: item.id or 0)
        assets = sorted(job.assets, key=lambda item: item.id or 0)
        judge_results = sorted(job.judge_results, key=lambda item: item.id or 0)
        audit_events = sorted(job.audit_events, key=lambda item: item.id or 0)
        shortlist_rank_by_candidate = {
            item.candidate_id: item.rank
            for item in shortlists
            if item.candidate_id is not None
        }

        image_preview_url, final_preview_url, final_assets = WorkflowJobRepository._resolve_job_asset_fields(job)

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
            "image_preview_url": image_preview_url,
            "final_preview_url": final_preview_url,
            "final_asset_urls": final_assets or None,
            "cards_per_theme": job.cards_per_theme,
            "operator_notes": job.operator_notes,
            "retry_count": job.retry_count,
            "last_stage_started_at": job.last_stage_started_at,
            "last_stage_finished_at": job.last_stage_finished_at,
            "last_error_message": job.last_error_message,
            "created_at": job.created_at,
            "updated_at": job.updated_at,
            "candidates": [
                {
                    "id": item.id,
                    "model": item.model,
                    "backend": item.backend,
                    "text": item.content_text,
                    "content_text": item.content_text,
                    "raw_score": float(item.raw_score),
                    "judged_score": float(item.judge_score),
                    "judge_score": float(item.judge_score),
                    "is_winner": item.is_winner,
                    "is_shortlisted": item.is_shortlisted,
                    "is_selected": item.is_selected,
                    "shortlist_rank": shortlist_rank_by_candidate.get(item.id or 0),
                    "created_at": item.created_at,
                }
                for item in candidates
            ],
            "shortlist": [
                {
                    "shortlist_id": item.id,
                    "candidate_id": item.candidate_id,
                    "rank": item.rank,
                    "score": float(item.score),
                    "model": item.candidate.model if item.candidate is not None else "",
                    "backend": item.candidate.backend if item.candidate is not None else "",
                    "text": item.candidate.content_text if item.candidate is not None else "",
                    "is_selected": bool(item.candidate.is_selected) if item.candidate is not None else False,
                    "created_at": item.created_at,
                }
                for item in shortlists
                if item.candidate is not None
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
                    "storage_backend": item.storage_backend,
                    "storage_root": item.storage_root,
                    "relative_path": item.relative_path,
                    "public_url": item.public_url,
                    "absolute_path": item.absolute_path,
                    "file_size_bytes": item.file_size_bytes,
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

    @staticmethod
    def _resolve_job_asset_fields(job: CardJob) -> tuple[str | None, str | None, dict[str, str] | None]:
        """Derive preview/final URLs from asset rows when denormalized job columns are empty."""

        assets = sorted(job.assets, key=lambda item: item.id or 0)
        image_preview_url = job.image_preview_url
        final_preview_url = job.final_preview_url
        final_assets = dict(job.final_asset_urls or {})

        for asset in assets:
            asset_url = asset.public_url or asset.asset_url
            if not asset_url:
                continue
            if asset.asset_type == "image_preview" and not image_preview_url:
                image_preview_url = asset_url
            elif asset.asset_type == "final_preview" and not final_preview_url:
                final_preview_url = asset_url
            elif asset.asset_type == "final_png":
                final_assets.setdefault("png", asset_url)
            elif asset.asset_type == "final_pdf":
                final_assets.setdefault("pdf", asset_url)

        inferred = WorkflowJobRepository._infer_job_asset_urls(job.job_id)
        image_preview_url = image_preview_url or inferred.get("image_preview_url")
        final_preview_url = final_preview_url or inferred.get("final_preview_url")
        if inferred.get("png"):
            final_assets.setdefault("png", inferred["png"])
        if inferred.get("pdf"):
            final_assets.setdefault("pdf", inferred["pdf"])

        if inferred and (
            inferred.get("image_preview_url") == image_preview_url
            or inferred.get("final_preview_url") == final_preview_url
            or inferred.get("png") == final_assets.get("png")
        ):
            logger.info(
                "workflow preview debug source=infer_job_assets job_id=%s image_preview_url=%s final_preview_url=%s final_asset_png=%s",
                job.job_id,
                image_preview_url or "",
                final_preview_url or "",
                str(final_assets.get("png") or ""),
            )

        return image_preview_url, final_preview_url, final_assets or None

    @staticmethod
    def _infer_job_asset_urls(job_id: str) -> dict[str, str]:
        """Recover deterministic asset URLs from filesystem when DB metadata is incomplete."""

        storage = get_asset_storage()
        paths = {
            "image_preview_url": f"image/{job_id}_image_preview.png",
            "final_preview_url": f"preview/{job_id}_content_preview.png",
            "png": f"final/{job_id}_final.png",
            "pdf": f"pdf/{job_id}_final.pdf",
        }
        inferred: dict[str, str] = {}
        for key, relative_path in paths.items():
            try:
                if storage.file_exists(relative_path):
                    inferred[key] = storage.get_public_url(relative_path)
            except OSError:
                continue
        return inferred


@lru_cache(maxsize=1)
def get_workflow_job_repository() -> WorkflowJobRepository:
    """Return singleton workflow repository."""

    return WorkflowJobRepository(
        memory_store=get_job_store(),
        allow_memory_fallback=bool(settings.workflow_memory_fallback_enabled),
    )
