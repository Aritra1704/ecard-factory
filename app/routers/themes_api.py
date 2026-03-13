"""Theme Factory admin APIs."""

from __future__ import annotations

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.schemas.theme_factory import (
    ThemeCatalogCreate,
    ThemeCatalogResponse,
    ThemeCatalogUpdate,
    ThemeDeleteResponse,
    ThemeOverrideCreate,
    ThemeOverrideResponse,
    ThemeScheduleCreate,
    ThemeScheduleDashboardResponse,
    ThemeScheduleResponse,
    ThemeScheduleUpdate,
    ThemeTodayResponse,
)
from app.services.theme_service import ThemeService, get_theme_service

router = APIRouter(prefix="/api/themes", tags=["themes"])


@router.get("", response_model=list[ThemeCatalogResponse])
async def list_theme_catalog(
    db: AsyncSession = Depends(get_db),
    service: ThemeService = Depends(get_theme_service),
) -> list[ThemeCatalogResponse]:
    """Return the Theme Factory catalog entries."""

    return await service.get_catalog(db)


@router.get("/today", response_model=ThemeTodayResponse)
async def get_today_theme(
    db: AsyncSession = Depends(get_db),
    service: ThemeService = Depends(get_theme_service),
) -> ThemeTodayResponse:
    """Resolve today's theme using overrides, schedules, and evergreen fallback."""

    return await service.get_today_theme(db)


@router.get("/schedule", response_model=ThemeScheduleDashboardResponse | list[ThemeScheduleResponse])
async def get_theme_schedule_dashboard(
    db: AsyncSession = Depends(get_db),
    service: ThemeService = Depends(get_theme_service),
) -> ThemeScheduleDashboardResponse | list[ThemeScheduleResponse]:
    """Return the current week schedule, current month schedule, and active overrides."""

    dashboard = await service.get_schedule_dashboard(db)
    if not dashboard.week_schedule and not dashboard.month_schedule and not dashboard.active_overrides:
        return []
    return dashboard


@router.post("", response_model=ThemeCatalogResponse, status_code=status.HTTP_201_CREATED)
async def create_theme(
    payload: ThemeCatalogCreate,
    db: AsyncSession = Depends(get_db),
    service: ThemeService = Depends(get_theme_service),
) -> ThemeCatalogResponse:
    """Create one new catalog theme."""

    return await service.create_theme(db, payload)


@router.put("/{theme_id}", response_model=ThemeCatalogResponse)
async def update_theme(
    theme_id: int,
    payload: ThemeCatalogUpdate,
    db: AsyncSession = Depends(get_db),
    service: ThemeService = Depends(get_theme_service),
) -> ThemeCatalogResponse:
    """Update one existing catalog theme."""

    return await service.update_theme(db, theme_id, payload)


@router.delete("/{theme_id}", response_model=ThemeDeleteResponse)
async def delete_theme(
    theme_id: int,
    db: AsyncSession = Depends(get_db),
    service: ThemeService = Depends(get_theme_service),
) -> ThemeDeleteResponse:
    """Soft delete one theme by marking it inactive."""

    return await service.delete_theme(db, theme_id)


@router.post("/schedule", response_model=ThemeScheduleResponse, status_code=status.HTTP_201_CREATED)
async def create_theme_schedule(
    payload: ThemeScheduleCreate,
    db: AsyncSession = Depends(get_db),
    service: ThemeService = Depends(get_theme_service),
) -> ThemeScheduleResponse:
    """Create one new schedule row."""

    return await service.create_schedule(db, payload)


@router.put("/schedule/{schedule_id}", response_model=ThemeScheduleResponse)
async def update_theme_schedule(
    schedule_id: int,
    payload: ThemeScheduleUpdate,
    db: AsyncSession = Depends(get_db),
    service: ThemeService = Depends(get_theme_service),
) -> ThemeScheduleResponse:
    """Update one existing theme schedule row."""

    return await service.update_schedule(db, schedule_id, payload)


@router.post("/overrides", response_model=ThemeOverrideResponse, status_code=status.HTTP_201_CREATED)
async def create_theme_override(
    payload: ThemeOverrideCreate,
    db: AsyncSession = Depends(get_db),
    service: ThemeService = Depends(get_theme_service),
) -> ThemeOverrideResponse:
    """Create one urgent editorial or manual override."""

    return await service.create_override(db, payload)
