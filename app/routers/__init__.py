"""Top-level API router aggregation."""

from fastapi import APIRouter

from app.routers.assembly import router as assembly_router
from app.routers.cards import router as cards_router
from app.routers.events import router as events_router
from app.routers.planning import router as planning_router
from app.routers.theme import router as theme_router

api_router = APIRouter()
api_router.include_router(assembly_router)
api_router.include_router(events_router)
api_router.include_router(cards_router)
api_router.include_router(planning_router)
api_router.include_router(theme_router)

__all__ = ["api_router"]
