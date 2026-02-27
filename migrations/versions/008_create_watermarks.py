"""create watermarks

Revision ID: 008
Revises: 007
Create Date: 2026-02-27 00:00:08
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "008"
down_revision = "007"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the watermarks table."""

    op.create_table(
        "watermarks",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("card_id", sa.Integer(), nullable=False),
        sa.Column("phash", sa.String(length=64), nullable=False),
        sa.Column("invisible_wm_id", sa.String(length=64), nullable=True),
        sa.Column("registered_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["card_id"], [f"{SCHEMA}.cards.id"]),
        sa.UniqueConstraint("card_id", name=op.f("uq_watermarks_card_id")),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_watermarks_card_id"), "watermarks", ["card_id"], unique=True, schema=SCHEMA)


def downgrade() -> None:
    """Drop the watermarks table."""

    op.drop_index(op.f("ix_watermarks_card_id"), table_name="watermarks", schema=SCHEMA)
    op.drop_table("watermarks", schema=SCHEMA)
