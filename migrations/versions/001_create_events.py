"""create events

Revision ID: 001
Revises:
Create Date: 2026-02-27 00:00:01
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "001"
down_revision = None
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the events table inside the application schema."""

    op.execute(sa.text(f'CREATE SCHEMA IF NOT EXISTS "{SCHEMA}"'))

    op.create_table(
        "events",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("name", sa.String(length=150), nullable=False),
        sa.Column("event_date", sa.Date(), nullable=False),
        sa.Column("region", sa.String(length=50), nullable=False),
        sa.Column("lead_days", sa.Integer(), nullable=False, server_default=sa.text("21")),
        sa.Column(
            "theme_keywords",
            postgresql.ARRAY(sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::text[]"),
        ),
        sa.Column("recurrence", sa.String(length=50), nullable=False, server_default=sa.text("'annual'")),
        sa.UniqueConstraint("name", name=op.f("uq_events_name")),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_events_event_date"), "events", ["event_date"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_events_region"), "events", ["region"], unique=False, schema=SCHEMA)


def downgrade() -> None:
    """Drop the events table."""

    op.drop_index(op.f("ix_events_region"), table_name="events", schema=SCHEMA)
    op.drop_index(op.f("ix_events_event_date"), table_name="events", schema=SCHEMA)
    op.drop_table("events", schema=SCHEMA)
