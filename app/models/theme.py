"""Theme ORM models for both legacy rotation data and the Theme Factory engine."""

from __future__ import annotations

from datetime import date, datetime
from typing import TYPE_CHECKING

from sqlalchemy import Boolean, Date, DateTime, ForeignKey, Integer, String, Text, UniqueConstraint, func, text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.daily_plan import DailyContentPlan
    from app.models.event import Event


class WeeklyTheme(Base):
    """Legacy weekly theme rotation retained for backward compatibility."""

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
        return (
            "WeeklyTheme("
            f"id={self.id!r}, rotation_month={self.rotation_month!r}, "
            f"day_of_week={self.day_of_week!r}, theme_name={self.theme_name!r})"
        )


class ThemeCatalog(Base):
    """Theme Factory catalog entry stored in a namespaced card theme table."""

    __tablename__ = "card_theme_catalog"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    theme_key: Mapped[str] = mapped_column(String(120), nullable=False, unique=True, index=True)
    theme_name: Mapped[str] = mapped_column(String(255), nullable=False)
    description: Mapped[str | None] = mapped_column(Text, nullable=True)
    theme_bucket: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default="everyday",
        server_default=text("'everyday'"),
        index=True,
    )
    theme_type: Mapped[str] = mapped_column(String(32), nullable=False)
    cultural_context: Mapped[str | None] = mapped_column(String(120), nullable=True)
    tone_style: Mapped[str] = mapped_column(String(64), nullable=False)
    default_funny_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    default_emotion_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    default_audience: Mapped[str] = mapped_column(String(120), nullable=False)
    default_visual_style: Mapped[str] = mapped_column(String(64), nullable=False)
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=text("true"),
        index=True,
    )
    priority: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
        server_default=text("0"),
        index=True,
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    schedules: Mapped[list["ThemeSchedule"]] = relationship(
        back_populates="theme",
        cascade="all, delete-orphan",
    )
    overrides: Mapped[list["CardThemeOverride"]] = relationship(
        back_populates="theme",
        cascade="all, delete-orphan",
    )


class ThemeSchedule(Base):
    """One recurring or date-bound activation rule for a catalog theme."""

    __tablename__ = "card_theme_schedule"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    theme_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.db_schema}.card_theme_catalog.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    schedule_type: Mapped[str] = mapped_column(String(32), nullable=False, index=True)
    start_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    end_date: Mapped[date | None] = mapped_column(Date, nullable=True)
    weekday_mask: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
        server_default=text("'{}'::text[]"),
    )
    month_mask: Mapped[list[int]] = mapped_column(
        ARRAY(Integer),
        nullable=False,
        default=list,
        server_default=text("'{}'::integer[]"),
    )
    region: Mapped[str | None] = mapped_column(String(120), nullable=True)
    country: Mapped[str | None] = mapped_column(String(120), nullable=True)
    is_active: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=text("true"),
        index=True,
    )
    priority: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
        server_default=text("0"),
        index=True,
    )
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    theme: Mapped[ThemeCatalog] = relationship(back_populates="schedules")


class ThemeOverride(Base):
    """Legacy override table used by the older daily planning workflow."""

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

    @property
    def is_active(self) -> bool:
        return bool(self.active)

    def __repr__(self) -> str:
        return (
            "ThemeOverride("
            f"id={self.id!r}, override_type={self.override_type!r}, "
            f"theme_name={self.theme_name!r}, priority={self.priority!r})"
        )


class CardThemeOverride(Base):
    """Theme Factory override table isolated from the legacy workflow tables."""

    __tablename__ = "card_theme_overrides"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    theme_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.db_schema}.card_theme_catalog.id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    override_scope: Mapped[str] = mapped_column(String(120), nullable=False)
    start_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, index=True)
    end_at: Mapped[datetime] = mapped_column(DateTime(timezone=True), nullable=False, index=True)
    reason: Mapped[str | None] = mapped_column(Text, nullable=True)
    force_top_priority: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=text("false"),
    )
    created_by: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
        default="system",
        server_default=text("'system'"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    theme: Mapped[ThemeCatalog] = relationship(back_populates="overrides")
