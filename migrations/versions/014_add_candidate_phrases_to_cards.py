"""add candidate phrases to cards

Revision ID: 014
Revises: 013
Create Date: 2026-03-01 00:00:14
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "014"
down_revision = "013"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Persist generated phrase candidates on cards for Telegram approvals."""

    op.add_column(
        "cards",
        sa.Column(
            "candidate_phrases",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'[]'::jsonb"),
        ),
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Remove persisted phrase candidates from cards."""

    op.drop_column("cards", "candidate_phrases", schema=SCHEMA)
