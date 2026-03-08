"""create v1 workflow tables for n8n orchestration

Revision ID: 017
Revises: 016
Create Date: 2026-03-08 00:00:17
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "017"
down_revision = "016"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create job state, candidate, approval, and audit tables for v1 workflow endpoints."""

    op.create_table(
        "card_jobs",
        sa.Column("job_id", sa.String(length=64), primary_key=True),
        sa.Column("status", sa.String(length=64), nullable=False),
        sa.Column("theme_name", sa.String(length=255), nullable=False),
        sa.Column("tone_funny_pct", sa.Integer(), nullable=False),
        sa.Column("tone_emotion_pct", sa.Integer(), nullable=False),
        sa.Column("tone_style", sa.String(length=64), nullable=False),
        sa.Column("audience", sa.String(length=120), nullable=False),
        sa.Column("cultural_context", sa.String(length=120), nullable=False),
        sa.Column(
            "output_spec",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::jsonb"),
        ),
        sa.Column("avoid_cliches", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("content_preview", sa.Text(), nullable=True),
        sa.Column("winner_model", sa.String(length=120), nullable=True),
        sa.Column("image_prompt", sa.Text(), nullable=True),
        sa.Column("image_preview_url", sa.Text(), nullable=True),
        sa.Column("final_preview_url", sa.Text(), nullable=True),
        sa.Column(
            "final_asset_urls",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=True,
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_card_jobs_status"), "card_jobs", ["status"], unique=False, schema=SCHEMA)

    op.create_table(
        "card_content_candidates",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("job_id", sa.String(length=64), nullable=False),
        sa.Column("model", sa.String(length=120), nullable=False),
        sa.Column("backend", sa.String(length=80), nullable=False),
        sa.Column("content_text", sa.Text(), nullable=False),
        sa.Column("raw_score", sa.Float(), nullable=False, server_default=sa.text("0")),
        sa.Column("judge_score", sa.Float(), nullable=False, server_default=sa.text("0")),
        sa.Column("is_winner", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["job_id"], [f"{SCHEMA}.card_jobs.job_id"], ondelete="CASCADE"),
        schema=SCHEMA,
    )
    op.create_index(
        op.f("ix_card_content_candidates_job_id"),
        "card_content_candidates",
        ["job_id"],
        unique=False,
        schema=SCHEMA,
    )

    op.create_table(
        "card_approvals",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("job_id", sa.String(length=64), nullable=False),
        sa.Column("stage", sa.String(length=32), nullable=False),
        sa.Column("decision", sa.String(length=16), nullable=False),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column(
            "decided_by",
            sa.String(length=64),
            nullable=False,
            server_default=sa.text("'n8n_v1'"),
        ),
        sa.Column("decided_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["job_id"], [f"{SCHEMA}.card_jobs.job_id"], ondelete="CASCADE"),
        schema=SCHEMA,
    )
    op.create_index(
        op.f("ix_card_approvals_job_id"),
        "card_approvals",
        ["job_id"],
        unique=False,
        schema=SCHEMA,
    )

    op.create_table(
        "card_audit_log",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("job_id", sa.String(length=64), nullable=False),
        sa.Column("event_type", sa.String(length=80), nullable=False),
        sa.Column(
            "event_payload_json",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::jsonb"),
        ),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["job_id"], [f"{SCHEMA}.card_jobs.job_id"], ondelete="CASCADE"),
        schema=SCHEMA,
    )
    op.create_index(
        op.f("ix_card_audit_log_job_id"),
        "card_audit_log",
        ["job_id"],
        unique=False,
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Drop workflow tables in reverse dependency order."""

    op.drop_index(op.f("ix_card_audit_log_job_id"), table_name="card_audit_log", schema=SCHEMA)
    op.drop_table("card_audit_log", schema=SCHEMA)

    op.drop_index(op.f("ix_card_approvals_job_id"), table_name="card_approvals", schema=SCHEMA)
    op.drop_table("card_approvals", schema=SCHEMA)

    op.drop_index(
        op.f("ix_card_content_candidates_job_id"),
        table_name="card_content_candidates",
        schema=SCHEMA,
    )
    op.drop_table("card_content_candidates", schema=SCHEMA)

    op.drop_index(op.f("ix_card_jobs_status"), table_name="card_jobs", schema=SCHEMA)
    op.drop_table("card_jobs", schema=SCHEMA)

