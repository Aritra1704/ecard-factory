"""add storage path/url columns to card_assets

Revision ID: 022
Revises: 021
Create Date: 2026-03-10 00:00:22
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "022"
down_revision = "021"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Add relative/public/absolute path fields for storage-backed assets."""

    op.add_column("card_assets", sa.Column("relative_path", sa.Text(), nullable=True), schema=SCHEMA)
    op.add_column("card_assets", sa.Column("public_url", sa.Text(), nullable=True), schema=SCHEMA)
    op.add_column("card_assets", sa.Column("absolute_path", sa.Text(), nullable=True), schema=SCHEMA)

    op.execute(
        sa.text(
            f"""
            UPDATE {SCHEMA}.card_assets
            SET public_url = asset_url
            WHERE public_url IS NULL
            """
        )
    )


def downgrade() -> None:
    """Remove storage path/url fields from card_assets."""

    op.drop_column("card_assets", "absolute_path", schema=SCHEMA)
    op.drop_column("card_assets", "public_url", schema=SCHEMA)
    op.drop_column("card_assets", "relative_path", schema=SCHEMA)
