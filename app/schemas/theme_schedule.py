"""Schemas for YAML-based weekly theme schedule APIs."""

from __future__ import annotations

from datetime import date

from pydantic import BaseModel, Field


class WeeklyThemeDay(BaseModel):
    """One weekday theme config loaded from theme_schedule.yaml."""

    weekday: str
    theme_name: str
    audience: str
    cultural_context: str
    tone_style: str
    tone_funny_pct: int = Field(ge=0, le=100)
    tone_emotion_pct: int = Field(ge=0, le=100)
    visual_style: str
    prompt_keywords: list[str] = Field(default_factory=list)
    avoid_cliches: bool = True


class WeeklyThemeScheduleResponse(BaseModel):
    """Response payload for GET /api/themes."""

    timezone: str
    today_weekday: str
    schedule: list[WeeklyThemeDay] = Field(default_factory=list)


class TodayThemeResponse(BaseModel):
    """Response payload for GET /api/themes/today."""

    timezone: str
    plan_date: date
    source: str = "theme_schedule"
    theme: WeeklyThemeDay
