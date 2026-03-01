"""Card ORM model for generated eCard assets."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Numeric, String, Text, func, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.alert import Alert
    from app.models.event import Event
    from app.models.listing import Listing
    from app.models.social_post import SocialPost
    from app.models.watermark import Watermark


class Card(Base):
    """A generated greeting card asset and its production metadata."""

    __tablename__ = "cards"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    event_id: Mapped[int | None] = mapped_column(
        ForeignKey(f"{settings.db_schema}.events.id"),
        nullable=True,
        index=True,
    )
    theme_name: Mapped[str] = mapped_column(String(100), nullable=False)
    theme_source: Mapped[str] = mapped_column(String(50), nullable=False)
    phrase: Mapped[str] = mapped_column(Text, nullable=False)
    candidate_phrases: Mapped[list[dict[str, object]]] = mapped_column(
        JSONB,
        nullable=False,
        default=list,
        server_default=text("'[]'::jsonb"),
    )
    dalle_prompt: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    canva_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    final_png_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    status: Mapped[str] = mapped_column(
        String(50),
        nullable=False,
        default="pending_phrase_approval",
        server_default=text("'pending_phrase_approval'"),
    )
    cost_llm: Mapped[Decimal] = mapped_column(
        Numeric(6, 4),
        nullable=False,
        default=Decimal("0.0000"),
        server_default=text("0.0000"),
    )
    cost_image: Mapped[Decimal] = mapped_column(
        Numeric(6, 4),
        nullable=False,
        default=Decimal("0.0400"),
        server_default=text("0.0400"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    alerts: Mapped[list["Alert"]] = relationship(back_populates="card")
    event: Mapped["Event"] = relationship(back_populates="cards")
    listings: Mapped[list["Listing"]] = relationship(back_populates="card")
    social_posts: Mapped[list["SocialPost"]] = relationship(back_populates="card")
    watermark: Mapped["Watermark | None"] = relationship(back_populates="card", uselist=False)

    def __repr__(self) -> str:
        """Return a concise debug representation of the card."""

        return f"Card(id={self.id!r}, theme_name={self.theme_name!r}, status={self.status!r})"
