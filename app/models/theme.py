"""Theme ORM models for weekly rotations and override campaigns."""

from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Date, ForeignKey, Integer, String, Text, UniqueConstraint, text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.daily_plan import DailyContentPlan
    from app.models.event import Event


class WeeklyTheme(Base):
    """A reusable weekly theme assigned by month rotation and weekday."""

    __tablename__ = "weekly_themes"
    __table_args__ = (
        UniqueConstraint(
            "rotation_month",
            "day_of_week",
            name="uq_weekly_themes_rotation_month_day_of_week",
        ),
        {"schema": settings.db_schema},
    )

    id: Mapped[int] = mapped_column(primary_key=True)
    rotation_month: Mapped[int] = mapped_column(Integer, nullable=False)
    day_of_week: Mapped[str] = mapped_column(String(20), nullable=False)
    theme_name: Mapped[str] = mapped_column(String(100), nullable=False)
    tone_funny_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    tone_emotion_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    prompt_keywords: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
        server_default=text("'{}'::text[]"),
    )
    color_palette: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
        server_default=text("'{}'::text[]"),
    )
    visual_style: Mapped[str] = mapped_column(String(100), nullable=False)
    instagram_hashtags: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
        server_default=text("'{}'::text[]"),
    )
    active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=text("true"),
    )

    daily_plans: Mapped[list["DailyContentPlan"]] = relationship(back_populates="weekly_theme")

    def __repr__(self) -> str:
        """Return a concise debug representation of the weekly theme."""

        return (
            "WeeklyTheme("
            f"id={self.id!r}, rotation_month={self.rotation_month!r}, "
            f"day_of_week={self.day_of_week!r}, theme_name={self.theme_name!r})"
        )


class ThemeOverride(Base):
    """A higher-priority theme configuration that overrides weekly rotation."""

    __tablename__ = "theme_overrides"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    override_type: Mapped[str] = mapped_column(String(50), nullable=False)
    event_id: Mapped[int | None] = mapped_column(
        ForeignKey(f"{settings.db_schema}.events.id"),
        nullable=True,
        index=True,
    )
    theme_name: Mapped[str] = mapped_column(String(100), nullable=False)
    tone_funny_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    tone_emotion_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    prompt_keywords: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
        server_default=text("'{}'::text[]"),
    )
    color_palette: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
        server_default=text("'{}'::text[]"),
    )
    visual_style: Mapped[str] = mapped_column(String(100), nullable=False)
    instagram_hashtags: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
        server_default=text("'{}'::text[]"),
    )
    start_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    end_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    priority: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=10,
        server_default=text("10"),
    )
    created_by: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="system",
        server_default=text("'system'"),
    )
    active: Mapped[bool] = mapped_column(
        Boolean,
        index=True,
        nullable=False,
        default=True,
        server_default=text("true"),
    )

    daily_plans: Mapped[list["DailyContentPlan"]] = relationship(back_populates="override")
    event: Mapped["Event | None"] = relationship(back_populates="theme_overrides")

    def __repr__(self) -> str:
        """Return a concise debug representation of the override."""

        return (
            "ThemeOverride("
            f"id={self.id!r}, override_type={self.override_type!r}, "
            f"theme_name={self.theme_name!r}, priority={self.priority!r})"
        )
