"""Standalone health router that never touches the database."""

from __future__ import annotations

from fastapi import APIRouter

from app.config import settings

router = APIRouter(tags=["health"])


@router.get("/health")
async def healthcheck() -> dict[str, str]:
    """Return a lightweight health payload based only on static configuration."""

    return {
        "status": "ok",
        "env": settings.app_env,
        "schema": settings.db_schema,
        "version": "1.0.0",
    }
