"""add content approval status and visual style to card jobs

Revision ID: 018
Revises: 017
Create Date: 2026-03-09 00:00:18
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "018"
down_revision = "017"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Add fields required by the content approval stage transition."""

    op.add_column(
        "card_jobs",
        sa.Column(
            "content_approval_status",
            sa.String(length=32),
            nullable=False,
            server_default=sa.text("'pending'"),
        ),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column(
            "visual_style",
            sa.String(length=64),
            nullable=False,
            server_default=sa.text("'conversational'"),
        ),
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Remove content approval and visual-style fields from card jobs."""

    op.drop_column("card_jobs", "visual_style", schema=SCHEMA)
    op.drop_column("card_jobs", "content_approval_status", schema=SCHEMA)

