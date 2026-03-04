"""ORM model for persisted LLM model-comparison runs."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Index, Integer, String, Text, func, text
from sqlalchemy.orm import Mapped, mapped_column

from app.config import settings
from app.database import Base


class LLMComparisonRun(Base):
    """One persisted backend result from a compare-models execution."""

    __tablename__ = "llm_comparison_runs"
    __table_args__ = (
        Index("ix_llm_comparison_runs_run_id_backend", "run_id", "backend"),
        {"schema": settings.db_schema},
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    run_id: Mapped[str] = mapped_column(String(36), nullable=False, index=True)
    theme_name: Mapped[str] = mapped_column(String(255), nullable=False)
    tone_funny_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    tone_emotion_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    prompt_keywords: Mapped[str | None] = mapped_column(Text, nullable=True)
    visual_style: Mapped[str | None] = mapped_column(String(255), nullable=True)
    phrase_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    backend: Mapped[str] = mapped_column(String(50), nullable=False)
    model_name: Mapped[str] = mapped_column(String(100), nullable=False)
    success: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=text("false"),
    )
    phrases: Mapped[str | None] = mapped_column(Text, nullable=True)
    latency_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    def __repr__(self) -> str:
        """Return a concise debug representation of the persisted comparison result."""

        return (
            "LLMComparisonRun("
            f"id={self.id!r}, run_id={self.run_id!r}, backend={self.backend!r}, success={self.success!r}"
            ")"
        )
