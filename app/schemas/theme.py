"""Pydantic schemas for theme resolution and override APIs."""

from __future__ import annotations

from datetime import date

from pydantic import BaseModel, ConfigDict, Field


class ThemeResolved(BaseModel):
    """Resolved theme payload returned by the daily theme endpoint."""

    theme_name: str
    source: str
    tone_funny_pct: int
    tone_emotion_pct: int
    prompt_keywords: list[str]
    color_palette: list[str]
    visual_style: str
    instagram_hashtags: list[str]
    plan_date: date


class ThemeHistoryItem(BaseModel):
    """Historical daily theme item returned by the history endpoint."""

    model_config = ConfigDict(from_attributes=True)

    plan_date: date
    theme_name: str
    source: str
    tone_funny_pct: int
    tone_emotion_pct: int
    prompt_keywords: list[str]
    color_palette: list[str]
    cards_generated: int
    status: str


class ThemeOverrideCreate(BaseModel):
    """Request body for creating a manual theme override."""

    override_type: str
    event_id: int | None = None
    theme_name: str
    tone_funny_pct: int = Field(ge=0, le=100)
    tone_emotion_pct: int = Field(ge=0, le=100)
    prompt_keywords: list[str] = Field(default_factory=list)
    color_palette: list[str] = Field(default_factory=list)
    visual_style: str
    instagram_hashtags: list[str] = Field(default_factory=list)
    start_date: date
    end_date: date
    priority: int = 10
    created_by: str = "system"
    active: bool = True


class ThemeOverrideResponse(BaseModel):
    """Response payload for a created theme override."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    override_type: str
    event_id: int | None
    theme_name: str
    tone_funny_pct: int
    tone_emotion_pct: int
    prompt_keywords: list[str]
    color_palette: list[str]
    visual_style: str
    instagram_hashtags: list[str]
    start_date: date
    end_date: date
    priority: int
    created_by: str
    active: bool
