"""migrate llm comparisons to master-child schema

Revision ID: 016
Revises: 015
Create Date: 2026-03-05 00:00:16
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "016"
down_revision = "015"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


def upgrade() -> None:
    """Replace flat comparison rows with master-child run tables."""

    op.execute(sa.text(f'DROP TABLE IF EXISTS "{SCHEMA}"."llm_comparison_runs" CASCADE'))

    op.create_table(
        "comparison_runs",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("run_id", sa.String(length=36), nullable=False),
        sa.Column("theme_name", sa.String(length=255), nullable=False),
        sa.Column("tone_funny_pct", sa.Integer(), nullable=False),
        sa.Column("tone_emotion_pct", sa.Integer(), nullable=False),
        sa.Column("prompt_keywords", sa.Text(), nullable=True),
        sa.Column("visual_style", sa.String(length=255), nullable=True),
        sa.Column("audience", sa.String(length=100), nullable=True),
        sa.Column("phrase_count", sa.Integer(), nullable=True),
        sa.Column("max_words", sa.Integer(), nullable=True),
        sa.Column("emoji_policy", sa.String(length=20), nullable=True),
        sa.Column("tone_style", sa.String(length=50), nullable=True),
        sa.Column(
            "avoid_cliches",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("true"),
        ),
        sa.Column("total_time_ms", sa.Integer(), nullable=True),
        sa.Column("backends_succeeded", sa.Integer(), nullable=True),
        sa.Column("winner_model", sa.String(length=100), nullable=True),
        sa.Column("winner_backend", sa.String(length=50), nullable=True),
        sa.Column("winner_score", sa.Float(), nullable=True),
        sa.Column("winner_phrases", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        schema=SCHEMA,
    )
    op.create_index(
        op.f("ix_comparison_runs_run_id"),
        "comparison_runs",
        ["run_id"],
        unique=True,
        schema=SCHEMA,
    )

    op.create_table(
        "comparison_run_results",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("run_id", sa.String(length=36), nullable=False),
        sa.Column("model_name", sa.String(length=100), nullable=False),
        sa.Column("backend", sa.String(length=50), nullable=False),
        sa.Column(
            "success",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
        sa.Column("score", sa.Float(), nullable=True),
        sa.Column("phrases", sa.Text(), nullable=True),
        sa.Column("latency_ms", sa.Integer(), nullable=True),
        sa.Column("error_message", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["run_id"], [f"{SCHEMA}.comparison_runs.run_id"]),
        schema=SCHEMA,
    )
    op.create_index(
        op.f("ix_comparison_run_results_run_id"),
        "comparison_run_results",
        ["run_id"],
        unique=False,
        schema=SCHEMA,
    )
    op.create_index(
        "ix_comparison_run_results_run_id_model_name",
        "comparison_run_results",
        ["run_id", "model_name"],
        unique=False,
        schema=SCHEMA,
    )


def downgrade() -> None:
    """Restore the previous flat comparison storage table."""

    op.drop_index(
        "ix_comparison_run_results_run_id_model_name",
        table_name="comparison_run_results",
        schema=SCHEMA,
    )
    op.drop_index(
        op.f("ix_comparison_run_results_run_id"),
        table_name="comparison_run_results",
        schema=SCHEMA,
    )
    op.drop_table("comparison_run_results", schema=SCHEMA)

    op.drop_index(
        op.f("ix_comparison_runs_run_id"),
        table_name="comparison_runs",
        schema=SCHEMA,
    )
    op.drop_table("comparison_runs", schema=SCHEMA)

    op.create_table(
        "llm_comparison_runs",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("run_id", sa.String(length=36), nullable=False),
        sa.Column("theme_name", sa.String(length=255), nullable=False),
        sa.Column("tone_funny_pct", sa.Integer(), nullable=False),
        sa.Column("tone_emotion_pct", sa.Integer(), nullable=False),
        sa.Column("prompt_keywords", sa.Text(), nullable=True),
        sa.Column("visual_style", sa.String(length=255), nullable=True),
        sa.Column("phrase_count", sa.Integer(), nullable=True),
        sa.Column("backend", sa.String(length=50), nullable=False),
        sa.Column("model_name", sa.String(length=100), nullable=False),
        sa.Column(
            "success",
            sa.Boolean(),
            nullable=False,
            server_default=sa.text("false"),
        ),
        sa.Column("phrases", sa.Text(), nullable=True),
        sa.Column("latency_ms", sa.Integer(), nullable=True),
        sa.Column("error_message", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        schema=SCHEMA,
    )
    op.create_index(
        op.f("ix_llm_comparison_runs_run_id"),
        "llm_comparison_runs",
        ["run_id"],
        unique=False,
        schema=SCHEMA,
    )
    op.create_index(
        "ix_llm_comparison_runs_run_id_backend",
        "llm_comparison_runs",
        ["run_id", "backend"],
        unique=False,
        schema=SCHEMA,
    )
