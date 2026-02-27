"""Listing ORM model for marketplace placement of cards."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Numeric, String, Text, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.card import Card
    from app.models.sale import Sale


class Listing(Base):
    """A marketplace listing that exposes a card for sale on a platform."""

    __tablename__ = "listings"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    card_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.db_schema}.cards.id"),
        nullable=False,
        index=True,
    )
    bundle_id: Mapped[int | None] = mapped_column(nullable=True)
    platform: Mapped[str] = mapped_column(String(50), nullable=False)
    listing_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    price: Mapped[Decimal] = mapped_column(Numeric(6, 2), nullable=False)
    listed_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    card: Mapped["Card"] = relationship(back_populates="listings")
    sales: Mapped[list["Sale"]] = relationship(back_populates="listing")

    def __repr__(self) -> str:
        """Return a concise debug representation of the listing."""

        return f"Listing(id={self.id!r}, platform={self.platform!r}, price={self.price!r})"
