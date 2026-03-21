"""Shared in-memory job store used as local fallback when DB is unavailable."""

from __future__ import annotations

import asyncio
from copy import deepcopy
from datetime import datetime, timezone
from typing import Any


class InMemoryJobStore:
    """Process-local store for workflow jobs.

    This is intentionally a singleton in app process scope. It is used only as
    a fallback when Postgres is unavailable.
    """

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
            record["shortlist"] = []
            record["judge_results"] = []
            record["approvals"] = []
            record["assets"] = []
            record["image_candidates"] = []
            record["audit_log"] = deepcopy(audit_events)
            self._jobs[record["job_id"]] = record

    async def merge_snapshot(self, snapshot: dict[str, Any]) -> None:
        """Upsert a DB snapshot into memory cache for fallback reads."""

        async with self._lock:
            self._jobs[snapshot["job_id"]] = deepcopy(snapshot)

    async def get_job(self, job_id: str) -> dict[str, Any] | None:
        """Return one job snapshot or None if missing."""

        async with self._lock:
            record = self._jobs.get(job_id)
            return deepcopy(record) if record else None

    async def list_jobs(self) -> list[dict[str, Any]]:
        """Return all jobs sorted by created_at descending."""

        async with self._lock:
            rows = [deepcopy(record) for record in self._jobs.values()]
        rows.sort(key=lambda item: item.get("created_at") or datetime.min.replace(tzinfo=timezone.utc), reverse=True)
        return rows

    async def delete_job(self, job_id: str) -> dict[str, Any] | None:
        """Delete a job snapshot and return removed record."""

        async with self._lock:
            record = self._jobs.pop(job_id, None)
            return deepcopy(record) if record else None

    async def enqueue_content_generation(
        self,
        *,
        job_id: str,
        message: str | None,
        queued_at: datetime,
    ) -> dict[str, Any] | None:
        """Mark one existing job as queued for background content generation."""

        async with self._lock:
            record = self._jobs.get(job_id)
            if record is None:
                return None
            record["status"] = "content_generation_queued"
            record["processing_state"] = "queued"
            record["processing_task"] = "content_generation"
            record["processing_message"] = message
            record["processing_owner_token"] = None
            record["processing_lease_expires_at"] = None
            record["processing_started_at"] = None
            record["processing_finished_at"] = queued_at
            record["updated_at"] = queued_at
            return deepcopy(record)

    async def claim_next_content_generation_job(
        self,
        *,
        owner_token: str,
        lease_expires_at: datetime,
        started_at: datetime,
    ) -> dict[str, Any] | None:
        """Claim the oldest queued content-generation job and mark it running."""

        async with self._lock:
            queued_jobs = [
                record
                for record in self._jobs.values()
                if str(record.get("status") or "").strip().lower() == "content_generation_queued"
                and str(record.get("processing_state") or "").strip().lower() == "queued"
                and str(record.get("processing_task") or "").strip().lower() == "content_generation"
            ]
            queued_jobs.sort(
                key=lambda item: (
                    item.get("created_at") or datetime.min.replace(tzinfo=timezone.utc),
                    str(item.get("job_id") or ""),
                )
            )
            if not queued_jobs:
                return None
            record = queued_jobs[0]
            record["status"] = "content_generation_in_progress"
            record["processing_state"] = "running"
            record["processing_task"] = "content_generation"
            record["processing_message"] = "Content creation in progress"
            record["processing_owner_token"] = owner_token
            record["processing_lease_expires_at"] = lease_expires_at
            record["processing_started_at"] = started_at
            record["processing_finished_at"] = None
            record["last_stage_started_at"] = started_at
            record["last_stage_finished_at"] = None
            record["last_error_message"] = None
            record["updated_at"] = started_at
            return deepcopy(record)

    async def reset_stale_content_generation_jobs(self, *, now: datetime) -> int:
        """Move expired running content-generation jobs back to queued state."""

        async with self._lock:
            reset_count = 0
            for record in self._jobs.values():
                if str(record.get("processing_state") or "").strip().lower() != "running":
                    continue
                if str(record.get("processing_task") or "").strip().lower() != "content_generation":
                    continue
                lease_expires_at = record.get("processing_lease_expires_at")
                if not isinstance(lease_expires_at, datetime):
                    continue
                if lease_expires_at.tzinfo is None:
                    lease_expires_at = lease_expires_at.replace(tzinfo=timezone.utc)
                if lease_expires_at > now:
                    continue
                record["status"] = "content_generation_queued"
                record["processing_state"] = "queued"
                record["processing_task"] = "content_generation"
                record["processing_message"] = "Content creation queued"
                record["processing_owner_token"] = None
                record["processing_lease_expires_at"] = None
                record["processing_started_at"] = None
                record["processing_finished_at"] = now
                record["updated_at"] = now
                reset_count += 1
            return reset_count

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


_JOB_STORE_SINGLETON = InMemoryJobStore()


def get_job_store() -> InMemoryJobStore:
    """Return the shared singleton in-memory job store."""

    return _JOB_STORE_SINGLETON
