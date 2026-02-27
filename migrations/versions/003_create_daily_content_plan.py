"""create daily_content_plan

Revision ID: 003
Revises: 002
Create Date: 2026-02-27 00:00:03
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "003"
down_revision = "002"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the table that stores resolved daily content decisions."""

    op.create_table(
        "daily_content_plan",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("plan_date", sa.Date(), nullable=False),
        sa.Column("theme_name", sa.String(length=100), nullable=False),
        sa.Column("source", sa.String(length=50), nullable=False),
        sa.Column("override_id", sa.Integer(), nullable=True),
        sa.Column("weekly_theme_id", sa.Integer(), nullable=True),
        sa.Column("tone_funny_pct", sa.Integer(), nullable=False),
        sa.Column("tone_emotion_pct", sa.Integer(), nullable=False),
        sa.Column(
            "prompt_keywords",
            postgresql.ARRAY(sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::text[]"),
        ),
        sa.Column(
            "color_palette",
            postgresql.ARRAY(sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::text[]"),
        ),
        sa.Column("cards_generated", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("status", sa.String(length=30), nullable=False, server_default=sa.text("'pending'")),
        sa.ForeignKeyConstraint(["override_id"], [f"{SCHEMA}.theme_overrides.id"]),
        sa.ForeignKeyConstraint(["weekly_theme_id"], [f"{SCHEMA}.weekly_themes.id"]),
        sa.UniqueConstraint("plan_date", name=op.f("uq_daily_content_plan_plan_date")),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_daily_content_plan_override_id"), "daily_content_plan", ["override_id"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_daily_content_plan_plan_date"), "daily_content_plan", ["plan_date"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_daily_content_plan_weekly_theme_id"), "daily_content_plan", ["weekly_theme_id"], unique=False, schema=SCHEMA)


def downgrade() -> None:
    """Drop the daily content plan table."""

    op.drop_index(op.f("ix_daily_content_plan_weekly_theme_id"), table_name="daily_content_plan", schema=SCHEMA)
    op.drop_index(op.f("ix_daily_content_plan_plan_date"), table_name="daily_content_plan", schema=SCHEMA)
    op.drop_index(op.f("ix_daily_content_plan_override_id"), table_name="daily_content_plan", schema=SCHEMA)
    op.drop_table("daily_content_plan", schema=SCHEMA)
