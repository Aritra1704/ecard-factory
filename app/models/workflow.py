"""ORM models for the v1 n8n-facing eCardFactory workflow."""

from __future__ import annotations

from datetime import datetime
from typing import Any

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, Text, func, text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.config import settings
from app.database import Base


class CardJob(Base):
    """One workflow job orchestrated by n8n through eCardFactory."""

    __tablename__ = "card_jobs"
    __table_args__ = {"schema": settings.db_schema}

    job_id: Mapped[str] = mapped_column(String(64), primary_key=True)
    trace_id: Mapped[str] = mapped_column(String(80), nullable=False, index=True)
    status: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    theme_name: Mapped[str] = mapped_column(String(255), nullable=False)
    tone_funny_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    tone_emotion_pct: Mapped[int] = mapped_column(Integer, nullable=False)
    tone_style: Mapped[str] = mapped_column(String(64), nullable=False)
    visual_style: Mapped[str] = mapped_column(String(64), nullable=False)
    audience: Mapped[str] = mapped_column(String(120), nullable=False)
    cultural_context: Mapped[str] = mapped_column(String(120), nullable=False)
    output_spec: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
        server_default=text("'{}'::jsonb"),
    )
    avoid_cliches: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=True,
        server_default=text("true"),
    )
    content_preview: Mapped[str | None] = mapped_column(Text, nullable=True)
    winner_model: Mapped[str | None] = mapped_column(String(120), nullable=True)
    content_approval_status: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default="pending",
        server_default=text("'pending'"),
    )
    image_approval_status: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default="pending",
        server_default=text("'pending'"),
    )
    final_approval_status: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default="pending",
        server_default=text("'pending'"),
    )
    image_prompt: Mapped[str | None] = mapped_column(Text, nullable=True)
    image_preview_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    final_preview_url: Mapped[str | None] = mapped_column(Text, nullable=True)
    final_asset_urls: Mapped[dict[str, str] | None] = mapped_column(JSONB, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )
    updated_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
        onupdate=func.now(),
    )

    candidates: Mapped[list["CardContentCandidate"]] = relationship(
        back_populates="job",
        cascade="all, delete-orphan",
    )
    judge_results: Mapped[list["CardJudgeResult"]] = relationship(
        back_populates="job",
        cascade="all, delete-orphan",
    )
    approvals: Mapped[list["CardApproval"]] = relationship(
        back_populates="job",
        cascade="all, delete-orphan",
    )
    assets: Mapped[list["CardAsset"]] = relationship(
        back_populates="job",
        cascade="all, delete-orphan",
    )
    audit_events: Mapped[list["CardAuditLog"]] = relationship(
        back_populates="job",
        cascade="all, delete-orphan",
    )


class CardContentCandidate(Base):
    """One generated content candidate and its lightweight ranking metadata."""

    __tablename__ = "card_content_candidates"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_id: Mapped[str] = mapped_column(
        ForeignKey(f"{settings.db_schema}.card_jobs.job_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    model: Mapped[str] = mapped_column(String(120), nullable=False)
    backend: Mapped[str] = mapped_column(String(80), nullable=False)
    content_text: Mapped[str] = mapped_column(Text, nullable=False)
    raw_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0, server_default=text("0"))
    judge_score: Mapped[float] = mapped_column(Float, nullable=False, default=0.0, server_default=text("0"))
    is_winner: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=text("false"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    job: Mapped[CardJob] = relationship(back_populates="candidates")


class CardApproval(Base):
    """One approval decision for content, image, or final stage."""

    __tablename__ = "card_approvals"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_id: Mapped[str] = mapped_column(
        ForeignKey(f"{settings.db_schema}.card_jobs.job_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    stage: Mapped[str] = mapped_column(String(32), nullable=False)
    decision: Mapped[str] = mapped_column(String(16), nullable=False)
    notes: Mapped[str | None] = mapped_column(Text, nullable=True)
    decided_by: Mapped[str] = mapped_column(
        String(64),
        nullable=False,
        default="n8n_v1",
        server_default=text("'n8n_v1'"),
    )
    decided_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    job: Mapped[CardJob] = relationship(back_populates="approvals")


class CardAsset(Base):
    """Stored workflow asset metadata for preview/final outputs."""

    __tablename__ = "card_assets"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_id: Mapped[str] = mapped_column(
        ForeignKey(f"{settings.db_schema}.card_jobs.job_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    asset_type: Mapped[str] = mapped_column(String(50), nullable=False)
    asset_url: Mapped[str] = mapped_column(Text, nullable=False)
    version: Mapped[str] = mapped_column(
        String(32),
        nullable=False,
        default="v1",
        server_default=text("'v1'"),
    )
    approved: Mapped[bool] = mapped_column(
        Boolean,
        nullable=False,
        default=False,
        server_default=text("false"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    job: Mapped[CardJob] = relationship(back_populates="assets")


class CardJudgeResult(Base):
    """Stored judging output associated with a workflow job."""

    __tablename__ = "card_judge_results"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_id: Mapped[str] = mapped_column(
        ForeignKey(f"{settings.db_schema}.card_jobs.job_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    judge_provider: Mapped[str] = mapped_column(String(64), nullable=False)
    judge_model: Mapped[str] = mapped_column(String(120), nullable=False)
    winner_model: Mapped[str] = mapped_column(String(120), nullable=False)
    leaderboard_json: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
        server_default=text("'{}'::jsonb"),
    )
    pairwise_json: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
        server_default=text("'{}'::jsonb"),
    )
    reason_summary: Mapped[str | None] = mapped_column(Text, nullable=True)
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    job: Mapped[CardJob] = relationship(back_populates="judge_results")


class CardAuditLog(Base):
    """Immutable audit stream for workflow events."""

    __tablename__ = "card_audit_log"
    __table_args__ = {"schema": settings.db_schema}

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    job_id: Mapped[str] = mapped_column(
        ForeignKey(f"{settings.db_schema}.card_jobs.job_id", ondelete="CASCADE"),
        nullable=False,
        index=True,
    )
    event_type: Mapped[str] = mapped_column(String(80), nullable=False)
    event_payload_json: Mapped[dict[str, Any]] = mapped_column(
        JSONB,
        nullable=False,
        default=dict,
        server_default=text("'{}'::jsonb"),
    )
    created_at: Mapped[datetime] = mapped_column(
        DateTime(timezone=True),
        nullable=False,
        server_default=func.now(),
    )

    job: Mapped[CardJob] = relationship(back_populates="audit_events")
