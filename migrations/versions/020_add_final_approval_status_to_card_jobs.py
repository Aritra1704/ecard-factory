"""add final approval status to card jobs

Revision ID: 020
Revises: 019
Create Date: 2026-03-09 00:00:20
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "020"
down_revision = "019"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Add final approval status field for debug and transition consistency."""

    op.add_column(
        "card_jobs",
        sa.Column(
            "final_approval_status",
            sa.String(length=32),
            nullable=False,
            server_default=sa.text("'pending'"),
        ),
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Remove final approval status field from card_jobs."""

    op.drop_column("card_jobs", "final_approval_status", schema=SCHEMA)

