"""Daily content planning ORM model."""

from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Date, ForeignKey, Integer, String, Text, text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.theme import ThemeOverride, WeeklyTheme


class DailyContentPlan(Base):
    """A resolved theme plan for a specific calendar day."""

    __tablename__ = "daily_content_plan"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    plan_date: Mapped[date] = mapped_column(Date, nullable=False, unique=True, index=True)
    theme_name: Mapped[str] = mapped_column(String(100), nullable=False)
    source: Mapped[str] = mapped_column(String(50), nullable=False)
    override_id: Mapped[int | None] = mapped_column(
        ForeignKey(f"{settings.db_schema}.theme_overrides.id"),
        nullable=True,
        index=True,
    )
    weekly_theme_id: Mapped[int | None] = mapped_column(
        ForeignKey(f"{settings.db_schema}.weekly_themes.id"),
        nullable=True,
        index=True,
    )
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
    cards_generated: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
        server_default=text("0"),
    )
    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="pending",
        server_default=text("'pending'"),
    )

    override: Mapped["ThemeOverride | None"] = relationship(back_populates="daily_plans")
    weekly_theme: Mapped["WeeklyTheme | None"] = relationship(back_populates="daily_plans")

    def __repr__(self) -> str:
        """Return a concise debug representation of the daily plan."""

        return (
            "DailyContentPlan("
            f"id={self.id!r}, plan_date={self.plan_date!r}, "
            f"theme_name={self.theme_name!r}, source={self.source!r})"
        )
