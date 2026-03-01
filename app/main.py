"""FastAPI application entrypoint for the eCard Factory service."""

from __future__ import annotations

from contextlib import asynccontextmanager
import logging

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

logger = logging.getLogger(__name__)


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

from app.routers import admin, assembly, cards, generation, health, telegram, theme

app.include_router(health.router)
app.include_router(theme.router, prefix="/theme")
app.include_router(assembly.router, prefix="/assembly")
app.include_router(cards.router, prefix="/cards")
app.include_router(generation.router, prefix="/generation")
app.include_router(telegram.router, prefix="/telegram")
app.include_router(admin.router, prefix="/admin")
