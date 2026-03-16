"""add ImageForge metadata to workflow jobs and image candidates

Revision ID: 029
Revises: 028
Create Date: 2026-03-16 17:15:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "029"
down_revision = "028"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    op.add_column(
        "card_jobs",
        sa.Column("imageforge_request_id", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("imageforge_trace_id", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("image_generation_status", sa.String(length=32), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("image_generation_stage", sa.String(length=32), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("selected_image_candidate_id", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("selected_image_public_url", sa.Text(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("selected_image_relative_path", sa.Text(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("selected_image_provider", sa.String(length=64), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("selected_image_model", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_jobs",
        sa.Column("image_generated_at", sa.DateTime(timezone=True), nullable=True),
        schema=SCHEMA,
    )
    op.create_index(
        "ix_card_jobs_imageforge_request_id",
        "card_jobs",
        ["imageforge_request_id"],
        unique=False,
        schema=SCHEMA,
    )

    op.add_column(
        "card_image_candidates",
        sa.Column("imageforge_request_id", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column("candidate_id", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column("provider_run_id", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column("model", sa.String(length=120), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column("prompt_used", sa.Text(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column("negative_prompt_used", sa.Text(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column("width", sa.Integer(), nullable=True),
        schema=SCHEMA,
    )
    op.add_column(
        "card_image_candidates",
        sa.Column("height", sa.Integer(), nullable=True),
        schema=SCHEMA,
    )
    op.create_index(
        "ix_card_image_candidates_imageforge_request_id",
        "card_image_candidates",
        ["imageforge_request_id"],
        unique=False,
        schema=SCHEMA,
    )
    op.create_index(
        "ix_card_image_candidates_candidate_id",
        "card_image_candidates",
        ["candidate_id"],
        unique=False,
        schema=SCHEMA,
    )


def downgrade() -> None:
    op.drop_index("ix_card_image_candidates_candidate_id", table_name="card_image_candidates", schema=SCHEMA)
    op.drop_index(
        "ix_card_image_candidates_imageforge_request_id",
        table_name="card_image_candidates",
        schema=SCHEMA,
    )
    op.drop_column("card_image_candidates", "height", schema=SCHEMA)
    op.drop_column("card_image_candidates", "width", schema=SCHEMA)
    op.drop_column("card_image_candidates", "negative_prompt_used", schema=SCHEMA)
    op.drop_column("card_image_candidates", "prompt_used", schema=SCHEMA)
    op.drop_column("card_image_candidates", "model", schema=SCHEMA)
    op.drop_column("card_image_candidates", "provider_run_id", schema=SCHEMA)
    op.drop_column("card_image_candidates", "candidate_id", schema=SCHEMA)
    op.drop_column("card_image_candidates", "imageforge_request_id", schema=SCHEMA)

    op.drop_index("ix_card_jobs_imageforge_request_id", table_name="card_jobs", schema=SCHEMA)
    op.drop_column("card_jobs", "image_generated_at", schema=SCHEMA)
    op.drop_column("card_jobs", "selected_image_model", schema=SCHEMA)
    op.drop_column("card_jobs", "selected_image_provider", schema=SCHEMA)
    op.drop_column("card_jobs", "selected_image_relative_path", schema=SCHEMA)
    op.drop_column("card_jobs", "selected_image_public_url", schema=SCHEMA)
    op.drop_column("card_jobs", "selected_image_candidate_id", schema=SCHEMA)
    op.drop_column("card_jobs", "image_generation_stage", schema=SCHEMA)
    op.drop_column("card_jobs", "image_generation_status", schema=SCHEMA)
    op.drop_column("card_jobs", "imageforge_trace_id", schema=SCHEMA)
    op.drop_column("card_jobs", "imageforge_request_id", schema=SCHEMA)
