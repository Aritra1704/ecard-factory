"""Alert ORM model for infringement and monitoring workflows."""

from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.card import Card


class Alert(Base):
    """A moderation or infringement alert related to a card or external listing."""

    __tablename__ = "alerts"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    alert_type: Mapped[str] = mapped_column(String(20), nullable=False)
    card_id: Mapped[int | None] = mapped_column(
        ForeignKey(f"{settings.db_schema}.cards.id"),
        nullable=True,
        index=True,
    )
    infringing_url: Mapped[str] = mapped_column(Text, nullable=False)
    similarity_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[str] = mapped_column(
        String(30),
        nullable=False,
        default="pending",
        server_default=text("'pending'"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    card: Mapped["Card | None"] = relationship(back_populates="alerts")

    def __repr__(self) -> str:
        """Return a concise debug representation of the alert."""

        return f"Alert(id={self.id!r}, alert_type={self.alert_type!r}, status={self.status!r})"
