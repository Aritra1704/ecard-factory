"""add async content-processing fields to workflow jobs

Revision ID: 032
Revises: 031
Create Date: 2026-03-21 17:00:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "032"
down_revision = "031"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    op.add_column(
        "card_jobs",
        sa.Column("processing_state", sa.String(length=32), nullable=False, server_default=sa.text("'idle'")),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("processing_task", sa.String(length=32), nullable=False, server_default=sa.text("'none'")),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("processing_message", sa.Text(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("processing_owner_token", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("processing_lease_expires_at", sa.DateTime(timezone=True), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("processing_started_at", sa.DateTime(timezone=True), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("processing_finished_at", sa.DateTime(timezone=True), nullable=True),
        schema=SCHEMA,
    )

    op.create_index(
        "ix_card_jobs_processing_state_task",
        "card_jobs",
        ["processing_state", "processing_task", "created_at"],
        unique=False,
        schema=SCHEMA,
    )
    op.create_index(
        "ix_card_jobs_processing_owner_token",
        "card_jobs",
        ["processing_owner_token"],
        unique=False,
        schema=SCHEMA,
    )


def downgrade() -> None:
    op.drop_index("ix_card_jobs_processing_owner_token", table_name="card_jobs", schema=SCHEMA)
    op.drop_index("ix_card_jobs_processing_state_task", table_name="card_jobs", schema=SCHEMA)
    op.drop_column("card_jobs", "processing_finished_at", schema=SCHEMA)
    op.drop_column("card_jobs", "processing_started_at", schema=SCHEMA)
    op.drop_column("card_jobs", "processing_lease_expires_at", schema=SCHEMA)
    op.drop_column("card_jobs", "processing_owner_token", schema=SCHEMA)
    op.drop_column("card_jobs", "processing_message", schema=SCHEMA)
    op.drop_column("card_jobs", "processing_task", schema=SCHEMA)
    op.drop_column("card_jobs", "processing_state", schema=SCHEMA)
