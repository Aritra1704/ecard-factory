"""FastAPI application entrypoint for the eCard Factory service."""

from __future__ import annotations

import logging
from collections.abc import AsyncIterator
from contextlib import asynccontextmanager

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import text

from app.config import settings
from app.database import close_database, engine, init_database
from app.routers import api_router

logger = logging.getLogger(__name__)


async def get_database_version() -> str:
    """Fetch the PostgreSQL server version for health reporting."""

    async with engine.connect() as connection:
        result = await connection.execute(text("SELECT current_setting('server_version')"))
        return str(result.scalar_one())


@asynccontextmanager
async def lifespan(_: FastAPI) -> AsyncIterator[None]:
    """Run startup and shutdown hooks for the FastAPI application."""

    await init_database()

    try:
        yield
    finally:
        await close_database()


app = FastAPI(
    title="eCard Factory API",
    version="0.1.0",
    lifespan=lifespan,
)

# The API is expected to power web clients and automation workflows, so broad
# development-friendly CORS defaults keep local integration simple.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(api_router)


@app.get("/health", tags=["system"])
async def healthcheck() -> dict[str, str]:
    """Return a lightweight service health payload for operators and CI."""

    try:
        db_version = await get_database_version()
        status = "ok"
    except Exception as exc:  # pragma: no cover - exercised indirectly in tests.
        logger.warning("Database version check failed: %s", exc)
        db_version = "unavailable"
        status = "degraded"

    return {
        "status": status,
        "env": settings.app_env,
        "schema": settings.db_schema,
        "db_version": db_version,
    }
