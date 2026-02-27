"""create social_posts

Revision ID: 007
Revises: 006
Create Date: 2026-02-27 00:00:07
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "007"
down_revision = "006"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Create the social_posts table."""

    op.create_table(
        "social_posts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("card_id", sa.Integer(), nullable=False),
        sa.Column("platform", sa.String(length=50), nullable=False),
        sa.Column("post_url", sa.Text(), nullable=True),
        sa.Column("reach", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("engagement", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("link_clicks", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("posted_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["card_id"], [f"{SCHEMA}.cards.id"]),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_social_posts_card_id"), "social_posts", ["card_id"], unique=False, schema=SCHEMA)


def downgrade() -> None:
    """Drop the social_posts table."""

    op.drop_index(op.f("ix_social_posts_card_id"), table_name="social_posts", schema=SCHEMA)
    op.drop_table("social_posts", schema=SCHEMA)
