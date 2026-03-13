"""YAML-backed weekly theme schedule API routes."""

from __future__ import annotations

from fastapi import APIRouter, Depends

from app.schemas.theme_schedule import TodayThemeResponse, WeeklyThemeScheduleResponse
from app.services.theme_service import ThemeService, get_theme_service

router = APIRouter(prefix="/api/themes", tags=["themes"])


@router.get("", response_model=WeeklyThemeScheduleResponse)
async def get_weekly_theme_schedule(
    service: ThemeService = Depends(get_theme_service),
) -> WeeklyThemeScheduleResponse:
    """Return full weekday theme schedule loaded from YAML config."""

    return service.get_schedule()


@router.get("/today", response_model=TodayThemeResponse)
async def get_today_theme(
    service: ThemeService = Depends(get_theme_service),
) -> TodayThemeResponse:
    """Return today's theme entry from weekly schedule config."""

    return service.get_today_theme()
