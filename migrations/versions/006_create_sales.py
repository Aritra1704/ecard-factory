"""create sales

Revision ID: 006
Revises: 005
Create Date: 2026-02-27 00:00:06
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "006"
down_revision = "005"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the sales table."""

    op.create_table(
        "sales",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("listing_id", sa.Integer(), nullable=False),
        sa.Column("platform", sa.String(length=50), nullable=False),
        sa.Column("gross_amount", sa.Numeric(precision=8, scale=2), nullable=False),
        sa.Column("platform_fee", sa.Numeric(precision=8, scale=2), nullable=False),
        sa.Column("net_amount", sa.Numeric(precision=8, scale=2), nullable=False),
        sa.Column("sale_date", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["listing_id"], [f"{SCHEMA}.listings.id"]),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_sales_listing_id"), "sales", ["listing_id"], unique=False, schema=SCHEMA)


def downgrade() -> None:
    """Drop the sales table."""

    op.drop_index(op.f("ix_sales_listing_id"), table_name="sales", schema=SCHEMA)
    op.drop_table("sales", schema=SCHEMA)
