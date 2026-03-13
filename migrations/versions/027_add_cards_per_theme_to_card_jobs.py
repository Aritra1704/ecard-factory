"""add cards_per_theme and operator_notes to card jobs

Revision ID: 027
Revises: 026
Create Date: 2026-03-13 19:30:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "027"
down_revision = "026"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    op.add_column(
        "card_jobs",
        sa.Column("cards_per_theme", sa.Integer(), nullable=False, server_default=sa.text("10")),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("operator_notes", sa.Text(), nullable=True),
        schema=SCHEMA,
    )
    op.alter_column("card_jobs", "cards_per_theme", server_default=None, schema=SCHEMA)


def downgrade() -> None:
    op.drop_column("card_jobs", "operator_notes", schema=SCHEMA)
    op.drop_column("card_jobs", "cards_per_theme", schema=SCHEMA)
