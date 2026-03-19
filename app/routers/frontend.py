"""Static frontend shell routes for internal React console."""

from __future__ import annotations

import os
from pathlib import Path

from fastapi import APIRouter, status
from fastapi.responses import FileResponse, PlainTextResponse, Response

router = APIRouter(tags=["frontend"])

BASE_DIR = Path(__file__).resolve().parents[2]
CONSOLE_INDEX = BASE_DIR / "app" / "static" / "console" / "index.html"
CONSOLE_BUNDLE = BASE_DIR / "app" / "static" / "console" / "app.js"
CONSOLE_STYLESHEET = BASE_DIR / "app" / "static" / "console" / "console.css"


def _legacy_frontend_enabled() -> bool:
    """Return whether legacy embedded frontend routes should stay active."""

    value = os.getenv("ECARD_ENABLE_LEGACY_FRONTEND", "true").strip().lower()
    return value not in {"0", "false", "no", "off"}


def _serve_console_index() -> Response:
    """Return the React console entrypoint file when the fallback is enabled and complete."""

    if not _legacy_frontend_enabled():
        return PlainTextResponse(
            "Legacy console fallback is disabled. Start the standalone content_engine_ui app instead.",
            status_code=status.HTTP_404_NOT_FOUND,
        )

    missing_paths = [
        str(path.relative_to(BASE_DIR))
        for path in (CONSOLE_INDEX, CONSOLE_BUNDLE, CONSOLE_STYLESHEET)
        if not path.exists()
    ]
    if missing_paths:
        return PlainTextResponse(
            "Legacy console fallback assets are unavailable. "
            f"Missing: {', '.join(missing_paths)}. "
            "Start the standalone content_engine_ui app or rebuild the fallback bundle.",
            status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
        )
    return FileResponse(CONSOLE_INDEX)


@router.get("/", include_in_schema=False)
async def workflow_console_home() -> Response:
    """Serve the workflow console SPA root."""

    return _serve_console_index()


@router.get("/compare", include_in_schema=False)
async def compare_lab_home() -> Response:
    """Serve the React compare lab route shell."""

    return _serve_console_index()


@router.get("/themes", include_in_schema=False)
async def theme_factory_home() -> Response:
    """Serve the React Theme Factory route shell."""

    return _serve_console_index()


@router.get("/studio", include_in_schema=False)
async def workflow_studio_home() -> Response:
    """Serve the React Studio route shell."""

    return _serve_console_index()


@router.get("/studio/{job_id}", include_in_schema=False)
async def workflow_studio_job(job_id: str) -> Response:
    """Serve Studio for a specific job shell route."""

    _ = job_id
    return _serve_console_index()


@router.get("/jobs", include_in_schema=False)
async def workflow_jobs_home() -> Response:
    """Serve the React jobs list shell route."""

    return _serve_console_index()


@router.get("/jobs/{job_id}", include_in_schema=False)
async def workflow_job_detail(job_id: str) -> Response:
    """Serve job detail shell route."""

    _ = job_id
    return _serve_console_index()
