"""create weekly_themes and theme_overrides

Revision ID: 002
Revises: 001
Create Date: 2026-02-27 00:00:02
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "002"
down_revision = "001"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the weekly theme rotation and override tables."""

    op.create_table(
        "weekly_themes",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("rotation_month", sa.Integer(), nullable=False),
        sa.Column("day_of_week", sa.String(length=20), nullable=False),
        sa.Column("theme_name", sa.String(length=100), nullable=False),
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
        sa.Column("visual_style", sa.String(length=100), nullable=False),
        sa.Column(
            "instagram_hashtags",
            postgresql.ARRAY(sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::text[]"),
        ),
        sa.Column("active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.UniqueConstraint(
            "rotation_month",
            "day_of_week",
            name="uq_weekly_themes_rotation_month_day_of_week",
        ),
        schema=SCHEMA,
    )

    op.create_table(
        "theme_overrides",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("override_type", sa.String(length=50), nullable=False),
        sa.Column("event_id", sa.Integer(), nullable=True),
        sa.Column("theme_name", sa.String(length=100), nullable=False),
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
        sa.Column("visual_style", sa.String(length=100), nullable=False),
        sa.Column(
            "instagram_hashtags",
            postgresql.ARRAY(sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::text[]"),
        ),
        sa.Column("start_date", sa.Date(), nullable=False),
        sa.Column("end_date", sa.Date(), nullable=False),
        sa.Column("priority", sa.Integer(), nullable=False, server_default=sa.text("10")),
        sa.Column("created_by", sa.String(length=100), nullable=False, server_default=sa.text("'system'")),
        sa.Column("active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.ForeignKeyConstraint(["event_id"], [f"{SCHEMA}.events.id"]),
        schema=SCHEMA,
    )

    op.create_index(op.f("ix_theme_overrides_active"), "theme_overrides", ["active"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_theme_overrides_end_date"), "theme_overrides", ["end_date"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_theme_overrides_event_id"), "theme_overrides", ["event_id"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_theme_overrides_start_date"), "theme_overrides", ["start_date"], unique=False, schema=SCHEMA)


def downgrade() -> None:
    """Drop the weekly theme and override tables."""

    op.drop_index(op.f("ix_theme_overrides_start_date"), table_name="theme_overrides", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_overrides_event_id"), table_name="theme_overrides", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_overrides_end_date"), table_name="theme_overrides", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_overrides_active"), table_name="theme_overrides", schema=SCHEMA)
    op.drop_table("theme_overrides", schema=SCHEMA)
    op.drop_table("weekly_themes", schema=SCHEMA)
