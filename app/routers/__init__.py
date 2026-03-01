"""Router module exports and a compatibility aggregate router."""

from fastapi import APIRouter

from app.routers.assembly import router as assembly_router
from app.routers.admin import router as admin_router
from app.routers.cards import router as cards_router
from app.routers.events import router as events_router
from app.routers.generation import router as generation_router
from app.routers.planning import router as planning_router
from app.routers.telegram import router as telegram_router
from app.routers.theme import router as theme_router

api_router = APIRouter()
api_router.include_router(admin_router)
api_router.include_router(assembly_router)
api_router.include_router(events_router)
api_router.include_router(cards_router)
api_router.include_router(generation_router)
api_router.include_router(planning_router)
api_router.include_router(telegram_router)
api_router.include_router(theme_router)

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
