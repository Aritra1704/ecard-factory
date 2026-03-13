"""Schemas for the database-backed Theme Factory APIs."""

from __future__ import annotations

from datetime import date, datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, model_validator

ThemeType = Literal["evergreen", "calendar", "campaign", "news"]
ThemeBucket = Literal["everyday", "occasion", "current_event"]
ScheduleType = Literal["single_day", "date_range", "weekly_recurring", "monthly_recurring"]


class ThemeCatalogBase(BaseModel):
    """Common fields for one theme catalog record."""

    theme_key: str
    theme_name: str
    description: str | None = None
    theme_bucket: ThemeBucket = "everyday"
    theme_type: ThemeType
    cultural_context: str | None = None
    tone_style: str = "conversational"
    default_funny_pct: int = Field(default=20, ge=0, le=100)
    default_emotion_pct: int = Field(default=80, ge=0, le=100)
    default_audience: str = "general audience"
    default_visual_style: str = "minimal"
    is_active: bool = True
    priority: int = 0


class ThemeCatalogCreate(ThemeCatalogBase):
    """Request payload for creating a catalog theme."""


class ThemeCatalogUpdate(BaseModel):
    """Request payload for updating a catalog theme."""

    theme_key: str | None = None
    theme_name: str | None = None
    description: str | None = None
    theme_bucket: ThemeBucket | None = None
    theme_type: ThemeType | None = None
    cultural_context: str | None = None
    tone_style: str | None = None
    default_funny_pct: int | None = Field(default=None, ge=0, le=100)
    default_emotion_pct: int | None = Field(default=None, ge=0, le=100)
    default_audience: str | None = None
    default_visual_style: str | None = None
    is_active: bool | None = None
    priority: int | None = None


class ThemeCatalogResponse(ThemeCatalogBase):
    """Response payload for one theme catalog record."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime | None = None
    updated_at: datetime | None = None


class ThemeScheduleBase(BaseModel):
    """Common fields for one theme schedule row."""

    theme_id: int
    schedule_type: ScheduleType
    start_date: date | None = None
    end_date: date | None = None
    weekday_mask: list[str] = Field(default_factory=list)
    month_mask: list[int] = Field(default_factory=list)
    region: str | None = None
    country: str | None = None
    is_active: bool = True
    priority: int = 0
    notes: str | None = None

    @model_validator(mode="after")
    def validate_schedule_fields(self) -> "ThemeScheduleBase":
        if self.schedule_type == "single_day":
            if self.start_date is None:
                raise ValueError("single_day schedules require start_date")
            if self.end_date is None:
                self.end_date = self.start_date
        elif self.schedule_type == "date_range":
            if self.start_date is None or self.end_date is None:
                raise ValueError("date_range schedules require start_date and end_date")
        elif self.schedule_type == "weekly_recurring":
            if not self.weekday_mask:
                raise ValueError("weekly_recurring schedules require weekday_mask")
        elif self.schedule_type == "monthly_recurring":
            if not self.month_mask:
                raise ValueError("monthly_recurring schedules require month_mask")

        if self.start_date and self.end_date and self.end_date < self.start_date:
            raise ValueError("end_date cannot be earlier than start_date")

        normalized_weekdays: list[str] = []
        for weekday in self.weekday_mask:
            value = weekday.strip().lower()
            if value:
                normalized_weekdays.append(value)
        self.weekday_mask = normalized_weekdays
        self.month_mask = sorted({int(month) for month in self.month_mask if 1 <= int(month) <= 12})
        return self


class ThemeScheduleCreate(ThemeScheduleBase):
    """Request payload for creating one schedule row."""


class ThemeScheduleUpdate(BaseModel):
    """Request payload for updating one schedule row."""

    theme_id: int | None = None
    schedule_type: ScheduleType | None = None
    start_date: date | None = None
    end_date: date | None = None
    weekday_mask: list[str] | None = None
    month_mask: list[int] | None = None
    region: str | None = None
    country: str | None = None
    is_active: bool | None = None
    priority: int | None = None
    notes: str | None = None


class ThemeScheduleResponse(BaseModel):
    """Response payload for one schedule row with theme labels."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    theme_id: int
    theme_key: str | None = None
    theme_name: str | None = None
    schedule_type: ScheduleType
    start_date: date | None = None
    end_date: date | None = None
    weekday_mask: list[str] = Field(default_factory=list)
    month_mask: list[int] = Field(default_factory=list)
    region: str | None = None
    country: str | None = None
    is_active: bool = True
    priority: int = 0
    notes: str | None = None
    created_at: datetime | None = None
    updated_at: datetime | None = None


class ThemeOverrideCreate(BaseModel):
    """Request payload for creating an editorial or urgent theme override."""

    theme_id: int
    override_scope: str
    start_at: datetime
    end_at: datetime
    reason: str | None = None
    force_top_priority: bool = False
    created_by: str = "system"

    @model_validator(mode="after")
    def validate_override_dates(self) -> "ThemeOverrideCreate":
        if self.end_at < self.start_at:
            raise ValueError("end_at cannot be earlier than start_at")
        return self


class ThemeOverrideResponse(BaseModel):
    """Response payload for one active or persisted override."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    theme_id: int | None = None
    theme_key: str | None = None
    theme_name: str | None = None
    override_scope: str | None = None
    start_at: datetime | None = None
    end_at: datetime | None = None
    reason: str | None = None
    force_top_priority: bool = False
    created_by: str = "system"
    created_at: datetime | None = None
    is_active: bool = True


class ThemeResolvedPayload(BaseModel):
    """Resolved theme fields ready for job creation or UI use."""

    theme_id: int | None = None
    theme_key: str
    theme_name: str
    description: str | None = None
    theme_bucket: ThemeBucket = "everyday"
    theme_type: str
    cultural_context: str | None = None
    tone_style: str = "conversational"
    tone_funny_pct: int = Field(ge=0, le=100)
    tone_emotion_pct: int = Field(ge=0, le=100)
    audience: str
    visual_style: str = "minimal"
    priority: int = 0


class ThemeTodayResponse(BaseModel):
    """Response payload for GET /api/themes/today."""

    resolved: bool = True
    message: str | None = None
    timezone: str
    plan_date: date | None = None
    weekday: str | None = None
    source: str | None = None
    schedule_type: str | None = None
    schedule_id: int | None = None
    override_id: int | None = None
    resolution_note: str | None = None
    theme: ThemeResolvedPayload | None = None


class ThemeWeekDayResponse(BaseModel):
    """Resolved theme entry for one day in the week schedule."""

    plan_date: date
    weekday: str
    source: str
    schedule_type: str | None = None
    schedule_id: int | None = None
    override_id: int | None = None
    theme: ThemeResolvedPayload


class ThemeScheduleDashboardResponse(BaseModel):
    """Aggregated schedule payload used by the Theme Factory UI."""

    timezone: str
    week_schedule: list[ThemeWeekDayResponse] = Field(default_factory=list)
    month_schedule: list[ThemeScheduleResponse] = Field(default_factory=list)
    active_overrides: list[ThemeOverrideResponse] = Field(default_factory=list)


class ThemeDeleteResponse(BaseModel):
    """Response payload for DELETE /api/themes/{id}."""

    theme_id: int
    deleted: bool = True
