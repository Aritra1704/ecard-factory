"""Competitor ORM model for external seller monitoring."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import DateTime, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from app.config import settings
from app.database import Base


class Competitor(Base):
    """A marketplace competitor tracked for monitoring and benchmark analysis."""

    __tablename__ = "competitors"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(100), nullable=False)
    platform: Mapped[str] = mapped_column(String(20), nullable=False)
    url: Mapped[str] = mapped_column(Text, nullable=False)
    last_checked: Mapped[datetime | None] = mapped_column(DateTime(timezone=True), nullable=True)

    def __repr__(self) -> str:
        """Return a concise debug representation of the competitor."""

        return f"Competitor(id={self.id!r}, name={self.name!r}, platform={self.platform!r})"
