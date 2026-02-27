"""create listings

Revision ID: 005
Revises: 004
Create Date: 2026-02-27 00:00:05
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "005"
down_revision = "004"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the listings table."""

    op.create_table(
        "listings",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("card_id", sa.Integer(), nullable=False),
        sa.Column("bundle_id", sa.Integer(), nullable=True),
        sa.Column("platform", sa.String(length=50), nullable=False),
        sa.Column("listing_url", sa.Text(), nullable=True),
        sa.Column("price", sa.Numeric(precision=6, scale=2), nullable=False),
        sa.Column("listed_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["card_id"], [f"{SCHEMA}.cards.id"]),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_listings_card_id"), "listings", ["card_id"], unique=False, schema=SCHEMA)


def downgrade() -> None:
    """Drop the listings table."""

    op.drop_index(op.f("ix_listings_card_id"), table_name="listings", schema=SCHEMA)
    op.drop_table("listings", schema=SCHEMA)
