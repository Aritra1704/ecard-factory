"""Social post ORM model for published card marketing assets."""

from __future__ import annotations

from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import DateTime, ForeignKey, Integer, String, Text, func, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base

if TYPE_CHECKING:
    from app.models.card import Card


class SocialPost(Base):
    """A social media post published for a card on a specific platform."""

    __tablename__ = "social_posts"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    card_id: Mapped[int] = mapped_column(
        ForeignKey(f"{settings.db_schema}.cards.id"),
        nullable=False,
        index=True,
    )
    platform: Mapped[str] = mapped_column(String(50), nullable=False)
    post_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    reach: Mapped[int] = mapped_column(Integer, nullable=False, default=0, server_default=text("0"))
    engagement: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
        server_default=text("0"),
    )
    link_clicks: Mapped[int] = mapped_column(
        Integer,
        nullable=False,
        default=0,
        server_default=text("0"),
    )
    posted_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    card: Mapped["Card"] = relationship(back_populates="social_posts")

    def __repr__(self) -> str:
        """Return a concise debug representation of the social post."""

        return f"SocialPost(id={self.id!r}, platform={self.platform!r}, reach={self.reach!r})"
