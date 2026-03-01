"""FastAPI application entrypoint for the eCard Factory service."""

from __future__ import annotations

from contextlib import asynccontextmanager
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from sqlalchemy import text

from app.config import settings
from app.database import close_database, engine
from app.routers.admin import router as admin_router
from app.routers.assembly import router as assembly_router
from app.routers.cards import router as cards_router
from app.routers.events import router as events_router
from app.routers.generation import router as generation_router
from app.routers.planning import router as planning_router
from app.routers.telegram import router as telegram_router
from app.routers.theme import router as theme_router

logger = logging.getLogger(__name__)
STATIC_DIR = Path(__file__).resolve().parent / "static"


@asynccontextmanager
async def lifespan(app: FastAPI):
    """Handle application startup and shutdown without touching the DB on boot."""

    logger.info("eCard Factory starting up")
    yield
    from app.database import close_database

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

app.include_router(admin_router)
app.include_router(assembly_router)
app.include_router(cards_router)
app.include_router(events_router)
app.include_router(generation_router)
app.include_router(planning_router)
app.include_router(telegram_router)
app.include_router(theme_router)

app.include_router(health.router)
app.include_router(theme.router, prefix="/theme")
app.include_router(assembly.router, prefix="/assembly")
app.include_router(cards.router, prefix="/cards")
app.include_router(generation.router, prefix="/generation")
app.include_router(telegram.router, prefix="/telegram")
app.include_router(admin.router, prefix="/admin")
