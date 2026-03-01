"""make cards.event_id nullable

Revision ID: 013
Revises: 012
Create Date: 2026-02-28 00:00:13
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "013"
down_revision = "012"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Allow cards without a linked event to be created through the API."""

    op.alter_column(
        "cards",
        "event_id",
        existing_type=sa.Integer(),
        nullable=True,
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Restore the original non-null event requirement for cards."""

    op.alter_column(
        "cards",
        "event_id",
        existing_type=sa.Integer(),
        nullable=False,
        schema=SCHEMA,
    )
