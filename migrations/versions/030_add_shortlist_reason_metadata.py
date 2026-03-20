"""add shortlist reason metadata

Revision ID: 030
Revises: 029
Create Date: 2026-03-20 16:40:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "030"
down_revision = "029"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    op.add_column(
        "card_content_candidates",
        sa.Column("contentforge_rank", sa.Integer(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_content_candidates",
        sa.Column("ranking_reason", sa.Text(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_content_candidates",
        sa.Column(
            "reason_codes",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'[]'::jsonb"),
        ),
        schema=SCHEMA,
    )
    op.add_column(
        "card_shortlists",
        sa.Column("reason_summary", sa.Text(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_shortlists",
        sa.Column(
            "reason_codes",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'[]'::jsonb"),
        ),
        schema=SCHEMA,
    )


def downgrade() -> None:
    op.drop_column("card_shortlists", "reason_codes", schema=SCHEMA)
    op.drop_column("card_shortlists", "reason_summary", schema=SCHEMA)
    op.drop_column("card_content_candidates", "reason_codes", schema=SCHEMA)
    op.drop_column("card_content_candidates", "ranking_reason", schema=SCHEMA)
    op.drop_column("card_content_candidates", "contentforge_rank", schema=SCHEMA)
