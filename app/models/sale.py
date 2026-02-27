"""Sale ORM model for completed marketplace transactions."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Numeric, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.listing import Listing


class Sale(Base):
    """A completed sale derived from a marketplace listing."""

    __tablename__ = "sales"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    listing_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.db_schema}.listings.id"),
        nullable=False,
        index=True,
    )
    platform: Mapped[str] = mapped_column(String(50), nullable=False)
    gross_amount: Mapped[Decimal] = mapped_column(Numeric(8, 2), nullable=False)
    platform_fee: Mapped[Decimal] = mapped_column(Numeric(8, 2), nullable=False)
    net_amount: Mapped[Decimal] = mapped_column(Numeric(8, 2), nullable=False)
    sale_date: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    listing: Mapped["Listing"] = relationship(back_populates="sales")

    def __repr__(self) -> str:
        """Return a concise debug representation of the sale."""

        return f"Sale(id={self.id!r}, platform={self.platform!r}, net_amount={self.net_amount!r})"
