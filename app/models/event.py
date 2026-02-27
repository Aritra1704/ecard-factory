"""Event ORM model for recurring calendar-driven content generation."""

from __future__ import annotations

from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Date, Integer, String, Text, text
from sqlalchemy.dialects.postgresql import ARRAY
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.card import Card
    from app.models.theme import ThemeOverride


class Event(Base):
    """A calendar event or festival that can drive card generation campaigns."""

    __tablename__ = "events"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False, unique=True)
    event_date: Mapped[date] = mapped_column(Date, nullable=False, index=True)
    region: Mapped[str] = mapped_column(String(50), nullable=False, index=True)
    lead_days: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=21,
        server_default=text("21"),
    )
    theme_keywords: Mapped[list[str]] = mapped_column(
        ARRAY(Text),
        nullable=False,
        default=list,
        server_default=text("'{}'::text[]"),
    )
    recurrence: Mapped[str] = mapped_column(String(50), nullable=False, default="annual")

    cards: Mapped[list["Card"]] = relationship(back_populates="event")
    theme_overrides: Mapped[list["ThemeOverride"]] = relationship(back_populates="event")

    def __repr__(self) -> str:
        """Return a concise debug representation of the event."""

        return f"Event(id={self.id!r}, name={self.name!r}, event_date={self.event_date!r})"
