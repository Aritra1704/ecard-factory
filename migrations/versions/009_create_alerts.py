"""create alerts

Revision ID: 009
Revises: 008
Create Date: 2026-02-27 00:00:09
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "009"
down_revision = "008"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the alerts table."""

    op.create_table(
        "alerts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("alert_type", sa.String(length=20), nullable=False),
        sa.Column("card_id", sa.Integer(), nullable=True),
        sa.Column("infringing_url", sa.Text(), nullable=False),
        sa.Column("similarity_pct", sa.Integer(), nullable=False),
        sa.Column("status", sa.String(length=30), nullable=False, server_default=sa.text("'pending'")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["card_id"], [f"{SCHEMA}.cards.id"]),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_alerts_card_id"), "alerts", ["card_id"], unique=False, schema=SCHEMA)


def downgrade() -> None:
    """Drop the alerts table."""

    op.drop_index(op.f("ix_alerts_card_id"), table_name="alerts", schema=SCHEMA)
    op.drop_table("alerts", schema=SCHEMA)
