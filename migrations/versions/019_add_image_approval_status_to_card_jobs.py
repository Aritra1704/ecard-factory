"""add image approval status to card jobs

Revision ID: 019
Revises: 018
Create Date: 2026-03-09 00:00:19
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "019"
down_revision = "018"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Add image approval status tracking field for image approval stage transitions."""

    op.add_column(
        "card_jobs",
        sa.Column(
            "image_approval_status",
            sa.String(length=32),
            nullable=False,
            server_default=sa.text("'pending'"),
        ),
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Remove image approval status tracking field from card_jobs."""

    op.drop_column("card_jobs", "image_approval_status", schema=SCHEMA)

