"""ORM models for persisted LLM comparison runs (master-child)."""

from __future__ import annotations

from datetime import datetime
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Index, Integer, String, Text, func, text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base


class ComparisonRun(Base):
    """Master row for one compare-models execution."""

    __tablename__ = "comparison_runs"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    run_id: Mapped[str] = mapped_column(String(36), nullable=False, unique=True, index=True)
    theme_name: Mapped[str] = mapped_column(String(255), nullable=False)
    tone_funny_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    tone_emotion_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    prompt_keywords: Mapped[str | None] = mapped_column(Text, nullable=True)
    visual_style: Mapped[str | None] = mapped_column(String(255), nullable=True)
    audience: Mapped[str | None] = mapped_column(String(100), nullable=True)
    phrase_count: Mapped[int | None] = mapped_column(Integer, nullable=True)
    max_words: Mapped[int | None] = mapped_column(Integer, nullable=True)
    emoji_policy: Mapped[str | None] = mapped_column(String(20), nullable=True)
    tone_style: Mapped[str | None] = mapped_column(String(50), nullable=True)
    avoid_cliches: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=text("true"),
    )
    total_time_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    backends_succeeded: Mapped[int | None] = mapped_column(Integer, nullable=True)
    winner_model: Mapped[str | None] = mapped_column(String(100), nullable=True)
    winner_backend: Mapped[str | None] = mapped_column(String(50), nullable=True)
    winner_score: Mapped[float | None] = mapped_column(Float, nullable=True)
    winner_phrases: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    results: Mapped[list["ComparisonRunResult"]] = relationship(
        "ComparisonRunResult",
        back_populates="run",
        cascade="all, delete-orphan",
    )


class ComparisonRunResult(Base):
    """Child row for one backend/model response in a comparison run."""

    __tablename__ = "comparison_run_results"
    __table_args__ = (
        Index("ix_comparison_run_results_run_id_model_name", "run_id", "model_name"),
        {"schema": settings.db_schema},
    )

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    run_id: Mapped[str] = mapped_column(
        String(36),
        ForeignKey(f"{settings.db_schema}.comparison_runs.run_id"),
        nullable=False,
        index=True,
    )
    model_name: Mapped[str] = mapped_column(String(100), nullable=False)
    backend: Mapped[str] = mapped_column(String(50), nullable=False)
    success: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=text("false"),
    )
    score: Mapped[float | None] = mapped_column(Float, nullable=True)
    phrases: Mapped[str | None] = mapped_column(Text, nullable=True)
    latency_ms: Mapped[int | None] = mapped_column(Integer, nullable=True)
    error_message: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    run: Mapped[ComparisonRun] = relationship(
        "ComparisonRun",
        back_populates="results",
    )
