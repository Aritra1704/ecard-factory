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
