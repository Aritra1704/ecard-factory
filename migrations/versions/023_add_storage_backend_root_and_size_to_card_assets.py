"""add storage backend/root/size columns to card_assets

Revision ID: 023
Revises: 022
Create Date: 2026-03-12 00:00:23
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "023"
down_revision = "022"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def _infer_storage_root(absolute_path: str | None, relative_path: str | None) -> str:
    """Infer storage root by removing relative suffix from absolute path when possible."""

    if not absolute_path:
        return ""

    absolute = absolute_path.strip().replace("\\", "/")
    relative = (relative_path or "").strip().replace("\\", "/").lstrip("/")
    if relative:
        suffix = f"/{relative}"
        if absolute.endswith(suffix):
            root = absolute[: -len(suffix)].rstrip("/")
            return root or "/"

    if "/" in absolute:
        return absolute.rsplit("/", 1)[0]
    return absolute


def upgrade() -> None:
    """Add backend/root/size metadata columns used by filesystem-backed assets."""

    op.add_column(
        "card_assets",
        sa.Column("storage_backend", sa.String(length=32), nullable=False, server_default=sa.text("'filesystem'")),
        schema=SCHEMA,
    )
    op.add_column(
        "card_assets",
        sa.Column("storage_root", sa.Text(), nullable=False, server_default=sa.text("''")),
        schema=SCHEMA,
    )
    op.add_column("card_assets", sa.Column("file_size_bytes", sa.BigInteger(), nullable=True), schema=SCHEMA)

    bind = op.get_bind()
    rows = bind.execute(
        sa.text(
            f"""
            SELECT id, absolute_path, relative_path
            FROM {SCHEMA}.card_assets
            """
        )
    ).mappings()
    for row in rows:
        bind.execute(
            sa.text(
                f"""
                UPDATE {SCHEMA}.card_assets
                SET storage_root = :storage_root
                WHERE id = :asset_id
                """
            ),
            {
                "storage_root": _infer_storage_root(
                    absolute_path=row.get("absolute_path"),
                    relative_path=row.get("relative_path"),
                ),
                "asset_id": row["id"],
            },
        )

    op.alter_column("card_assets", "storage_backend", server_default=None, schema=SCHEMA)
    op.alter_column("card_assets", "storage_root", server_default=None, schema=SCHEMA)


def downgrade() -> None:
    """Drop backend/root/size metadata columns."""

    op.drop_column("card_assets", "file_size_bytes", schema=SCHEMA)
    op.drop_column("card_assets", "storage_root", schema=SCHEMA)
    op.drop_column("card_assets", "storage_backend", schema=SCHEMA)
