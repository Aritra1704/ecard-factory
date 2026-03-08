"""add trace id and workflow asset/judge tables

Revision ID: 021
Revises: 020
Create Date: 2026-03-09 00:00:21
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "021"
down_revision = "020"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Add traceability and workflow asset/judge persistence tables."""

    op.add_column(
        "card_jobs",
        sa.Column(
            "trace_id",
            sa.String(length=80),
            nullable=False,
            server_default=sa.text("'trace_bootstrap'"),
        ),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_card_jobs_trace_id"), "card_jobs", ["trace_id"], unique=False, schema=SCHEMA)

    op.create_table(
        "card_assets",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("job_id", sa.String(length=64), nullable=False),
        sa.Column("asset_type", sa.String(length=50), nullable=False),
        sa.Column("asset_url", sa.Text(), nullable=False),
        sa.Column("version", sa.String(length=32), nullable=False, server_default=sa.text("'v1'")),
        sa.Column("approved", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["job_id"], [f"{SCHEMA}.card_jobs.job_id"], ondelete="CASCADE"),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_card_assets_job_id"), "card_assets", ["job_id"], unique=False, schema=SCHEMA)

    op.create_table(
        "card_judge_results",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("job_id", sa.String(length=64), nullable=False),
        sa.Column("judge_provider", sa.String(length=64), nullable=False),
        sa.Column("judge_model", sa.String(length=120), nullable=False),
        sa.Column("winner_model", sa.String(length=120), nullable=False),
        sa.Column(
            "leaderboard_json",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::jsonb"),
        ),
        sa.Column(
            "pairwise_json",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::jsonb"),
        ),
        sa.Column("reason_summary", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["job_id"], [f"{SCHEMA}.card_jobs.job_id"], ondelete="CASCADE"),
        schema=SCHEMA,
    )
    op.create_index(
        op.f("ix_card_judge_results_job_id"),
        "card_judge_results",
        ["job_id"],
        unique=False,
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Remove workflow asset/judge tables and trace_id from card_jobs."""

    op.drop_index(op.f("ix_card_judge_results_job_id"), table_name="card_judge_results", schema=SCHEMA)
    op.drop_table("card_judge_results", schema=SCHEMA)

    op.drop_index(op.f("ix_card_assets_job_id"), table_name="card_assets", schema=SCHEMA)
    op.drop_table("card_assets", schema=SCHEMA)

    op.drop_index(op.f("ix_card_jobs_trace_id"), table_name="card_jobs", schema=SCHEMA)
    op.drop_column("card_jobs", "trace_id", schema=SCHEMA)

