"""FastAPI application entrypoint for the eCard Factory service."""

from __future__ import annotations

import logging
from contextlib import asynccontextmanager
from pathlib import Path

from alembic import command
from alembic.config import Config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import settings
from app.routers.admin import router as admin_router
from app.routers.assembly import router as assembly_router
from app.routers.cards import router as cards_router
from app.routers.events import router as events_router
from app.routers.generation import router as generation_router
from app.routers.health import router as health_router
from app.routers.planning import router as planning_router
from app.routers.telegram import router as telegram_router
from app.routers.theme import router as theme_router
from app.routers.workflow_v1 import router as workflow_v1_router

logger = logging.getLogger(__name__)
STATIC_DIR = Path(__file__).resolve().parent / "static"


def run_migrations() -> None:
    """Apply the latest Alembic migrations on startup."""

    if not settings.auto_init_db_on_startup:
        logger.info("Skipping startup migrations because AUTO_INIT_DB_ON_STARTUP is disabled.")
        return

    alembic_cfg = Config("alembic.ini")
    command.upgrade(alembic_cfg, "head")


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle application startup and shutdown, including optional DB bootstrap."""

    logger.info("eCard Factory starting up")
    from app.database import close_database, ensure_database_ready

    try:
        run_migrations()
    except Exception:  # noqa: BLE001
        logger.exception("Startup migration failed. Continuing app startup.")

    try:
        await ensure_database_ready()
    except Exception:  # noqa: BLE001
        logger.exception(
            "Database readiness check failed. Continuing startup; workflow endpoints can use in-memory fallback."
        )
    yield

    await close_database()
    logger.info("eCard Factory shut down")


app = FastAPI(
    title="eCard Factory API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/static", StaticFiles(directory=str(STATIC_DIR)), name="static")

app.include_router(health_router)
app.include_router(workflow_v1_router)
app.include_router(theme_router, prefix="/theme")
app.include_router(assembly_router, prefix="/assembly")
app.include_router(cards_router, prefix="/cards")
app.include_router(generation_router, prefix="/generation")
app.include_router(telegram_router, prefix="/telegram")
app.include_router(admin_router)
app.include_router(events_router)
app.include_router(planning_router)
