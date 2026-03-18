"""Static frontend shell routes for internal React console."""

from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter, HTTPException, status
from fastapi.responses import FileResponse

router = APIRouter(tags=["frontend"])

BASE_DIR = Path(__file__).resolve().parents[2]
CONSOLE_INDEX = BASE_DIR / "app" / "static" / "console" / "index.html"


def _serve_console_index() -> FileResponse:
    """Return the React console entrypoint file for SPA routes."""

    if not CONSOLE_INDEX.exists():
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Console frontend entrypoint not found.",
        )
    return FileResponse(CONSOLE_INDEX)


@router.get("/", include_in_schema=False)
async def workflow_console_home() -> FileResponse:
    """Serve the workflow console SPA root."""

    return _serve_console_index()


@router.get("/compare", include_in_schema=False)
async def compare_lab_home() -> FileResponse:
    """Serve the React compare lab route shell."""

    return _serve_console_index()


@router.get("/themes", include_in_schema=False)
async def theme_factory_home() -> FileResponse:
    """Serve the React Theme Factory route shell."""

    return _serve_console_index()


@router.get("/studio", include_in_schema=False)
async def workflow_studio_home() -> FileResponse:
    """Serve the React Studio route shell."""

    return _serve_console_index()


@router.get("/studio/{job_id}", include_in_schema=False)
async def workflow_studio_job(job_id: str) -> FileResponse:
    """Serve Studio for a specific job shell route."""

    _ = job_id
    return _serve_console_index()


@router.get("/jobs", include_in_schema=False)
async def workflow_jobs_home() -> FileResponse:
    """Serve the React jobs list shell route."""

    return _serve_console_index()


@router.get("/jobs/{job_id}", include_in_schema=False)
async def workflow_job_detail(job_id: str) -> FileResponse:
    """Serve job detail shell route."""

    _ = job_id
    return _serve_console_index()
