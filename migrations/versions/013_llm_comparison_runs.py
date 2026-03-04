"""create llm comparison runs

Revision ID: 015
Revises: 014
Create Date: 2026-03-04 00:00:15
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "015"
down_revision = "014"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the persisted LLM comparison results table."""

    op.create_table(
        "llm_comparison_runs",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("run_id", sa.String(length=36), nullable=False),
        sa.Column("theme_name", sa.String(length=255), nullable=False),
        sa.Column("tone_funny_pct", sa.Integer(), nullable=False),
        sa.Column("tone_emotion_pct", sa.Integer(), nullable=False),
        sa.Column("prompt_keywords", sa.Text(), nullable=True),
        sa.Column("visual_style", sa.String(length=255), nullable=True),
        sa.Column("phrase_count", sa.Integer(), nullable=True),
        sa.Column("backend", sa.String(length=50), nullable=False),
        sa.Column("model_name", sa.String(length=100), nullable=False),
        sa.Column(
            "success",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
        sa.Column("phrases", sa.Text(), nullable=True),
        sa.Column("latency_ms", sa.Integer(), nullable=True),
        sa.Column("error_message", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        schema=SCHEMA,
    )
    op.create_index(
        op.f("ix_llm_comparison_runs_run_id"),
        "llm_comparison_runs",
        ["run_id"],
        unique=False,
        schema=SCHEMA,
    )
    op.create_index(
        "ix_llm_comparison_runs_run_id_backend",
        "llm_comparison_runs",
        ["run_id", "backend"],
        unique=False,
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Drop the persisted LLM comparison results table."""

    op.drop_index("ix_llm_comparison_runs_run_id_backend", table_name="llm_comparison_runs", schema=SCHEMA)
    op.drop_index(op.f("ix_llm_comparison_runs_run_id"), table_name="llm_comparison_runs", schema=SCHEMA)
    op.drop_table("llm_comparison_runs", schema=SCHEMA)
