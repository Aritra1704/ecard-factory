"""Watermark ORM model for card fingerprint registration."""

from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.card import Card


class Watermark(Base):
    """A perceptual and invisible watermark record associated with one card."""

    __tablename__ = "watermarks"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    card_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.db_schema}.cards.id"),
        nullable=False,
        unique=True,
        index=True,
    )
    phash: Mapped[str] = mapped_column(String(64), nullable=False)
    invisible_wm_id: Mapped[str | None] = mapped_column(String(64), nullable=True)
    registered_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    card: Mapped["Card"] = relationship(back_populates="watermark")

    def __repr__(self) -> str:
        """Return a concise debug representation of the watermark."""

        return f"Watermark(id={self.id!r}, card_id={self.card_id!r}, phash={self.phash!r})"
