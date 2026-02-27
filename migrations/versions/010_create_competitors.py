"""create competitors

Revision ID: 010
Revises: 009
Create Date: 2026-02-27 00:00:10
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "010"
down_revision = "009"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the competitors table."""

    op.create_table(
        "competitors",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=100), nullable=False),
        sa.Column("platform", sa.String(length=20), nullable=False),
        sa.Column("url", sa.Text(), nullable=False),
        sa.Column("last_checked", sa.DateTime(timezone=True), nullable=True),
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Drop the competitors table."""

    op.drop_table("competitors", schema=SCHEMA)
