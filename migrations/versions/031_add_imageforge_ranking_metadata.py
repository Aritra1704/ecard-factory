"""add ImageForge ranking metadata to workflow jobs and image candidates

Revision ID: 031
Revises: 030
Create Date: 2026-03-21 14:10:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "031"
down_revision = "030"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    op.add_column(
        "card_jobs",
        sa.Column("recommended_image_candidate_id", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )

    op.add_column(
        "card_image_candidates",
        sa.Column("imageforge_rank", sa.Integer(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column("quality_score", sa.Float(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column("relevance_score", sa.Float(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column(
            "reason_codes",
            postgresql.JSONB(astext_type=sa.Text()),
            nullable=False,
            server_default=sa.text("'[]'::jsonb"),
        ),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column(
            "is_recommended",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
        schema=SCHEMA,
    )

    op.create_index(
        "ix_card_image_candidates_imageforge_rank",
        "card_image_candidates",
        ["job_id", "imageforge_rank"],
        unique=False,
        schema=SCHEMA,
    )


def downgrade() -> None:
    op.drop_index(
        "ix_card_image_candidates_imageforge_rank",
        table_name="card_image_candidates",
        schema=SCHEMA,
    )
    op.drop_column("card_image_candidates", "is_recommended", schema=SCHEMA)
    op.drop_column("card_image_candidates", "reason_codes", schema=SCHEMA)
    op.drop_column("card_image_candidates", "relevance_score", schema=SCHEMA)
    op.drop_column("card_image_candidates", "quality_score", schema=SCHEMA)
    op.drop_column("card_image_candidates", "imageforge_rank", schema=SCHEMA)
    op.drop_column("card_jobs", "recommended_image_candidate_id", schema=SCHEMA)
