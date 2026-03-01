"""Minimal admin router placeholder used by the Railway-safe app bootstrap."""

from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import HTMLResponse

router = APIRouter(tags=["admin"])


@router.get("/", response_class=HTMLResponse)
async def admin_home() -> str:
    """Return a minimal admin landing page placeholder."""

    return (
        "<html><body style='background:#09090b;color:#fafafa;font-family:sans-serif;'>"
        "<h1>eCard Factory Admin</h1><p>Admin UI placeholder.</p></body></html>"
    )
