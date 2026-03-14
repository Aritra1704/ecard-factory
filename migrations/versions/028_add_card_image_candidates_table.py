"""add card image candidates table

Revision ID: 028
Revises: 027
Create Date: 2026-03-14 18:20:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "028"
down_revision = "027"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    op.create_table(
        "card_image_candidates",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("job_id", sa.String(length=64), nullable=False),
        sa.Column("stage", sa.String(length=32), nullable=False),
        sa.Column("provider", sa.String(length=32), nullable=False),
        sa.Column("prompt", sa.Text(), nullable=False),
        sa.Column("candidate_index", sa.Integer(), nullable=False),
        sa.Column("public_url", sa.Text(), nullable=False),
        sa.Column("relative_path", sa.Text(), nullable=False),
        sa.Column("is_selected", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(
            ["job_id"],
            [f"{SCHEMA}.card_jobs.job_id"],
            ondelete="CASCADE",
        ),
        schema=SCHEMA,
    )
    op.create_index(
        "ix_card_image_candidates_job_id",
        "card_image_candidates",
        ["job_id"],
        unique=False,
        schema=SCHEMA,
    )


def downgrade() -> None:
    op.drop_index("ix_card_image_candidates_job_id", table_name="card_image_candidates", schema=SCHEMA)
    op.drop_table("card_image_candidates", schema=SCHEMA)
