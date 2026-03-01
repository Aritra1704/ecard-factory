"""Router module exports and a compatibility aggregate router."""

from fastapi import APIRouter

from app.routers import admin, assembly, cards, generation, health, telegram, theme

api_router = APIRouter()
api_router.include_router(health.router)
api_router.include_router(theme.router, prefix="/theme")
api_router.include_router(assembly.router, prefix="/assembly")
api_router.include_router(cards.router, prefix="/cards")
api_router.include_router(generation.router, prefix="/generation")
api_router.include_router(telegram.router, prefix="/telegram")
api_router.include_router(admin.router, prefix="/admin")

__all__ = [
    "admin",
    "api_router",
    "assembly",
    "cards",
    "generation",
    "health",
    "telegram",
    "theme",
]
