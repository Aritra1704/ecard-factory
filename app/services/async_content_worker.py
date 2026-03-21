"""Background worker that processes queued content-generation jobs."""

from __future__ import annotations

import asyncio
from functools import lru_cache
import logging

from app.config import settings
from app.services.workflow_v1_service import WorkflowV1Service, get_workflow_v1_service

logger = logging.getLogger(__name__)


class AsyncContentWorker:
    """App-local polling worker for async content-generation kickoff."""

    def __init__(self, *, workflow_service: WorkflowV1Service | None = None) -> None:
        self._workflow_service = workflow_service or get_workflow_v1_service()
        self._shutdown_event = asyncio.Event()
        self._wake_event = asyncio.Event()
        self._task: asyncio.Task[None] | None = None

    async def start(self) -> None:
        """Recover stale jobs and start the background polling loop."""

        if not settings.workflow_async_content_worker_enabled:
            logger.info("async content worker disabled by configuration")
            return
        if self._task is not None and not self._task.done():
            return

        await self._workflow_service.recover_stale_content_generation_jobs()
        self._shutdown_event.clear()
        self._wake_event.clear()
        self._task = asyncio.create_task(self._run_loop(), name="ecard_async_content_worker")
        logger.info("async content worker started")

    async def stop(self) -> None:
        """Stop the polling loop and wait for the current iteration to finish."""

        self._shutdown_event.set()
        if self._task is None:
            return
        try:
            await self._task
        finally:
            self._task = None
            logger.info("async content worker stopped")

    def wake(self) -> None:
        """Wake the worker early when a new queued job is available."""

        self._wake_event.set()

    async def _run_loop(self) -> None:
        """Poll the repository for queued jobs and process them one at a time."""

        while not self._shutdown_event.is_set():
            processed = False
            try:
                processed = await self._workflow_service.claim_and_process_next_content_job()
            except asyncio.CancelledError:
                raise
            except Exception:  # noqa: BLE001
                logger.exception("async content worker iteration failed")

            timeout_seconds = (
                float(settings.workflow_async_content_busy_poll_seconds)
                if processed
                else float(settings.workflow_async_content_idle_poll_seconds)
            )
            try:
                await asyncio.wait_for(self._wait_for_signal(), timeout=max(timeout_seconds, 0.1))
            except asyncio.TimeoutError:
                continue

    async def _wait_for_signal(self) -> None:
        """Wait until shutdown or an explicit wake-up signal arrives."""

        shutdown_wait = asyncio.create_task(self._shutdown_event.wait())
        wake_wait = asyncio.create_task(self._wake_event.wait())
        done, pending = await asyncio.wait(
            {shutdown_wait, wake_wait},
            return_when=asyncio.FIRST_COMPLETED,
        )
        for task in pending:
            task.cancel()
        for task in done:
            try:
                await task
            except asyncio.CancelledError:
                pass
        self._wake_event.clear()


@lru_cache(maxsize=1)
def get_async_content_worker() -> AsyncContentWorker:
    """Return the singleton async content worker for the app process."""

    return AsyncContentWorker()
