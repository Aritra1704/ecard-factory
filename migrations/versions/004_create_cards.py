"""create cards

Revision ID: 004
Revises: 003
Create Date: 2026-02-27 00:00:04
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "004"
down_revision = "003"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the generated card table."""

    op.create_table(
        "cards",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("event_id", sa.Integer(), nullable=False),
        sa.Column("theme_name", sa.String(length=100), nullable=False),
        sa.Column("theme_source", sa.String(length=50), nullable=False),
        sa.Column("phrase", sa.Text(), nullable=False),
        sa.Column("dalle_prompt", sa.Text(), nullable=True),
        sa.Column("image_url", sa.Text(), nullable=True),
        sa.Column("canva_url", sa.Text(), nullable=True),
        sa.Column("final_png_url", sa.Text(), nullable=True),
        sa.Column(
            "status",
            sa.String(length=50),
            nullable=False,
            server_default=sa.text("'pending_phrase_approval'"),
        ),
        sa.Column("cost_llm", sa.Numeric(precision=6, scale=4), nullable=False, server_default=sa.text("0.0000")),
        sa.Column("cost_image", sa.Numeric(precision=6, scale=4), nullable=False, server_default=sa.text("0.0400")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["event_id"], [f"{SCHEMA}.events.id"]),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_cards_event_id"), "cards", ["event_id"], unique=False, schema=SCHEMA)


def downgrade() -> None:
    """Drop the cards table."""

    op.drop_index(op.f("ix_cards_event_id"), table_name="cards", schema=SCHEMA)
    op.drop_table("cards", schema=SCHEMA)
