"""add Theme Factory tables and seed data

Revision ID: 024
Revises: 023
Create Date: 2026-03-13 00:00:24
"""

from __future__ import annotations

from datetime import date, datetime, timedelta, timezone

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "024"
down_revision = "023"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"
IST = timezone(timedelta(hours=5, minutes=30))


theme_catalog = sa.table(
    "theme_catalog",
    sa.column("theme_key", sa.String(length=120)),
    sa.column("theme_name", sa.String(length=255)),
    sa.column("description", sa.Text()),
    sa.column("theme_type", sa.String(length=32)),
    sa.column("cultural_context", sa.String(length=120)),
    sa.column("tone_style", sa.String(length=64)),
    sa.column("default_funny_pct", sa.Integer()),
    sa.column("default_emotion_pct", sa.Integer()),
    sa.column("default_audience", sa.String(length=120)),
    sa.column("default_visual_style", sa.String(length=64)),
    sa.column("is_active", sa.Boolean()),
    sa.column("priority", sa.Integer()),
)


def upgrade() -> None:
    op.create_table(
        "theme_catalog",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("theme_key", sa.String(length=120), nullable=False),
        sa.Column("theme_name", sa.String(length=255), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("theme_type", sa.String(length=32), nullable=False),
        sa.Column("cultural_context", sa.String(length=120), nullable=True),
        sa.Column("tone_style", sa.String(length=64), nullable=False),
        sa.Column("default_funny_pct", sa.Integer(), nullable=False),
        sa.Column("default_emotion_pct", sa.Integer(), nullable=False),
        sa.Column("default_audience", sa.String(length=120), nullable=False),
        sa.Column("default_visual_style", sa.String(length=64), nullable=False),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("priority", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.UniqueConstraint("theme_key", name="uq_theme_catalog_theme_key"),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_theme_catalog_theme_key"), "theme_catalog", ["theme_key"], unique=True, schema=SCHEMA)
    op.create_index(op.f("ix_theme_catalog_is_active"), "theme_catalog", ["is_active"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_theme_catalog_priority"), "theme_catalog", ["priority"], unique=False, schema=SCHEMA)

    op.create_table(
        "theme_schedule",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("theme_id", sa.Integer(), nullable=False),
        sa.Column("schedule_type", sa.String(length=32), nullable=False),
        sa.Column("start_date", sa.Date(), nullable=True),
        sa.Column("end_date", sa.Date(), nullable=True),
        sa.Column(
            "weekday_mask",
            postgresql.ARRAY(sa.Text()),
            nullable=False,
            server_default=sa.text("'{}'::text[]"),
        ),
        sa.Column(
            "month_mask",
            postgresql.ARRAY(sa.Integer()),
            nullable=False,
            server_default=sa.text("'{}'::integer[]"),
        ),
        sa.Column("region", sa.String(length=120), nullable=True),
        sa.Column("country", sa.String(length=120), nullable=True),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("priority", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("notes", sa.Text(), nullable=True),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["theme_id"], [f"{SCHEMA}.theme_catalog.id"], ondelete="CASCADE"),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_theme_schedule_theme_id"), "theme_schedule", ["theme_id"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_theme_schedule_schedule_type"), "theme_schedule", ["schedule_type"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_theme_schedule_is_active"), "theme_schedule", ["is_active"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_theme_schedule_priority"), "theme_schedule", ["priority"], unique=False, schema=SCHEMA)

    op.add_column("theme_overrides", sa.Column("theme_id", sa.Integer(), nullable=True), schema=SCHEMA)
    op.add_column("theme_overrides", sa.Column("override_scope", sa.String(length=120), nullable=True), schema=SCHEMA)
    op.add_column("theme_overrides", sa.Column("start_at", sa.DateTime(timezone=True), nullable=True), schema=SCHEMA)
    op.add_column("theme_overrides", sa.Column("end_at", sa.DateTime(timezone=True), nullable=True), schema=SCHEMA)
    op.add_column("theme_overrides", sa.Column("reason", sa.Text(), nullable=True), schema=SCHEMA)
    op.add_column(
        "theme_overrides",
        sa.Column("force_top_priority", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        schema=SCHEMA,
    )
    op.add_column(
        "theme_overrides",
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_theme_overrides_theme_id"), "theme_overrides", ["theme_id"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_theme_overrides_start_at"), "theme_overrides", ["start_at"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_theme_overrides_end_at"), "theme_overrides", ["end_at"], unique=False, schema=SCHEMA)
    op.create_foreign_key(
        "fk_theme_overrides_theme_id_theme_catalog",
        "theme_overrides",
        "theme_catalog",
        ["theme_id"],
        ["id"],
        source_schema=SCHEMA,
        referent_schema=SCHEMA,
    )

    bind = op.get_bind()
    bind.execute(
        sa.text(
            f"""
            UPDATE {SCHEMA}.theme_overrides
            SET override_scope = COALESCE(override_scope, override_type),
                start_at = COALESCE(start_at, timezone('UTC', start_date::timestamp)),
                end_at = COALESCE(end_at, timezone('UTC', (end_date::timestamp + interval '23 hours 59 minutes 59 seconds')))
            WHERE start_at IS NULL OR end_at IS NULL OR override_scope IS NULL
            """
        )
    )

    op.bulk_insert(
        theme_catalog,
        [
            {
                "theme_key": "motivation-monday",
                "theme_name": "Motivation Monday",
                "description": "Weekly recurring motivation theme for Monday card runs.",
                "theme_type": "evergreen",
                "cultural_context": "global",
                "tone_style": "conversational",
                "default_funny_pct": 25,
                "default_emotion_pct": 75,
                "default_audience": "working professionals",
                "default_visual_style": "minimal",
                "is_active": True,
                "priority": 90,
            },
            {
                "theme_key": "friendship-thursday",
                "theme_name": "Friendship Thursday",
                "description": "Weekly recurring friendship-focused greetings for Thursday.",
                "theme_type": "evergreen",
                "cultural_context": "global",
                "tone_style": "warm",
                "default_funny_pct": 35,
                "default_emotion_pct": 65,
                "default_audience": "friends",
                "default_visual_style": "playful",
                "is_active": True,
                "priority": 80,
            },
            {
                "theme_key": "valentines-week",
                "theme_name": "Valentine's Week",
                "description": "Date-range campaign for February relationship and affection cards.",
                "theme_type": "campaign",
                "cultural_context": "global",
                "tone_style": "romantic",
                "default_funny_pct": 20,
                "default_emotion_pct": 80,
                "default_audience": "partners",
                "default_visual_style": "elegant",
                "is_active": True,
                "priority": 95,
            },
            {
                "theme_key": "ramadan-month",
                "theme_name": "Ramadan Month",
                "description": "Month-long cultural campaign theme for Ramadan greetings.",
                "theme_type": "calendar",
                "cultural_context": "ramadan",
                "tone_style": "heartfelt",
                "default_funny_pct": 5,
                "default_emotion_pct": 95,
                "default_audience": "family and community",
                "default_visual_style": "elegant",
                "is_active": True,
                "priority": 96,
            },
            {
                "theme_key": "india-trend-override",
                "theme_name": "India Trend Override",
                "description": "Urgent editorial override theme for an India-focused trend spike.",
                "theme_type": "news",
                "cultural_context": "india",
                "tone_style": "energetic",
                "default_funny_pct": 15,
                "default_emotion_pct": 85,
                "default_audience": "india audience",
                "default_visual_style": "festive",
                "is_active": True,
                "priority": 100,
            },
        ],
    )

    theme_rows = bind.execute(
        sa.text(
            f"""
            SELECT id, theme_key, theme_name, default_funny_pct, default_emotion_pct, default_visual_style, priority
            FROM {SCHEMA}.theme_catalog
            WHERE theme_key IN (
                'motivation-monday',
                'friendship-thursday',
                'valentines-week',
                'ramadan-month',
                'india-trend-override'
            )
            """
        )
    ).mappings()
    theme_lookup = {row["theme_key"]: row for row in theme_rows}

    schedule_table = sa.table(
        "theme_schedule",
        sa.column("theme_id", sa.Integer()),
        sa.column("schedule_type", sa.String(length=32)),
        sa.column("start_date", sa.Date()),
        sa.column("end_date", sa.Date()),
        sa.column("weekday_mask", postgresql.ARRAY(sa.Text())),
        sa.column("month_mask", postgresql.ARRAY(sa.Integer())),
        sa.column("region", sa.String(length=120)),
        sa.column("country", sa.String(length=120)),
        sa.column("is_active", sa.Boolean()),
        sa.column("priority", sa.Integer()),
        sa.column("notes", sa.Text()),
    )

    op.bulk_insert(
        schedule_table,
        [
            {
                "theme_id": theme_lookup["motivation-monday"]["id"],
                "schedule_type": "weekly_recurring",
                "start_date": None,
                "end_date": None,
                "weekday_mask": ["monday"],
                "month_mask": [],
                "region": None,
                "country": None,
                "is_active": True,
                "priority": 90,
                "notes": "Default Monday weekly recurring motivation slot.",
            },
            {
                "theme_id": theme_lookup["friendship-thursday"]["id"],
                "schedule_type": "weekly_recurring",
                "start_date": None,
                "end_date": None,
                "weekday_mask": ["thursday"],
                "month_mask": [],
                "region": None,
                "country": None,
                "is_active": True,
                "priority": 80,
                "notes": "Friendship-focused weekly Thursday slot.",
            },
            {
                "theme_id": theme_lookup["valentines-week"]["id"],
                "schedule_type": "date_range",
                "start_date": date(2026, 2, 7),
                "end_date": date(2026, 2, 14),
                "weekday_mask": [],
                "month_mask": [],
                "region": None,
                "country": None,
                "is_active": True,
                "priority": 95,
                "notes": "Week-long February affection campaign.",
            },
            {
                "theme_id": theme_lookup["ramadan-month"]["id"],
                "schedule_type": "monthly_recurring",
                "start_date": None,
                "end_date": None,
                "weekday_mask": [],
                "month_mask": [3],
                "region": None,
                "country": None,
                "is_active": True,
                "priority": 96,
                "notes": "Month-long recurring Ramadan campaign example.",
            },
        ],
    )

    override_table = sa.table(
        "theme_overrides",
        sa.column("override_type", sa.String(length=50)),
        sa.column("event_id", sa.Integer()),
        sa.column("theme_name", sa.String(length=100)),
        sa.column("tone_funny_pct", sa.Integer()),
        sa.column("tone_emotion_pct", sa.Integer()),
        sa.column("prompt_keywords", postgresql.ARRAY(sa.Text())),
        sa.column("color_palette", postgresql.ARRAY(sa.Text())),
        sa.column("visual_style", sa.String(length=100)),
        sa.column("instagram_hashtags", postgresql.ARRAY(sa.Text())),
        sa.column("start_date", sa.Date()),
        sa.column("end_date", sa.Date()),
        sa.column("priority", sa.Integer()),
        sa.column("created_by", sa.String(length=100)),
        sa.column("active", sa.Boolean()),
        sa.column("theme_id", sa.Integer()),
        sa.column("override_scope", sa.String(length=120)),
        sa.column("start_at", sa.DateTime(timezone=True)),
        sa.column("end_at", sa.DateTime(timezone=True)),
        sa.column("reason", sa.Text()),
        sa.column("force_top_priority", sa.Boolean()),
    )

    op.bulk_insert(
        override_table,
        [
            {
                "override_type": "editorial",
                "event_id": None,
                "theme_name": theme_lookup["india-trend-override"]["theme_name"],
                "tone_funny_pct": 15,
                "tone_emotion_pct": 85,
                "prompt_keywords": ["trend", "india", "editorial", "urgent"],
                "color_palette": ["#FF9933", "#FFFFFF", "#138808"],
                "visual_style": theme_lookup["india-trend-override"]["default_visual_style"],
                "instagram_hashtags": ["#IndiaTrend", "#EditorialOverride", "#ecardfactory"],
                "start_date": date(2026, 8, 14),
                "end_date": date(2026, 8, 16),
                "priority": 200,
                "created_by": "seed",
                "active": True,
                "theme_id": theme_lookup["india-trend-override"]["id"],
                "override_scope": "editorial",
                "start_at": datetime(2026, 8, 14, 0, 0, 0, tzinfo=IST),
                "end_at": datetime(2026, 8, 16, 23, 59, 59, tzinfo=IST),
                "reason": "Example urgent editorial trend override for India.",
                "force_top_priority": True,
            },
        ],
    )


def downgrade() -> None:
    bind = op.get_bind()
    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.theme_overrides
            WHERE theme_id IN (
                SELECT id
                FROM {SCHEMA}.theme_catalog
                WHERE theme_key IN (
                    'motivation-monday',
                    'friendship-thursday',
                    'valentines-week',
                    'ramadan-month',
                    'india-trend-override'
                )
            )
            """
        )
    )

    op.drop_constraint("fk_theme_overrides_theme_id_theme_catalog", "theme_overrides", schema=SCHEMA, type_="foreignkey")
    op.drop_index(op.f("ix_theme_overrides_end_at"), table_name="theme_overrides", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_overrides_start_at"), table_name="theme_overrides", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_overrides_theme_id"), table_name="theme_overrides", schema=SCHEMA)
    op.drop_column("theme_overrides", "created_at", schema=SCHEMA)
    op.drop_column("theme_overrides", "force_top_priority", schema=SCHEMA)
    op.drop_column("theme_overrides", "reason", schema=SCHEMA)
    op.drop_column("theme_overrides", "end_at", schema=SCHEMA)
    op.drop_column("theme_overrides", "start_at", schema=SCHEMA)
    op.drop_column("theme_overrides", "override_scope", schema=SCHEMA)
    op.drop_column("theme_overrides", "theme_id", schema=SCHEMA)

    op.drop_index(op.f("ix_theme_schedule_priority"), table_name="theme_schedule", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_schedule_is_active"), table_name="theme_schedule", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_schedule_schedule_type"), table_name="theme_schedule", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_schedule_theme_id"), table_name="theme_schedule", schema=SCHEMA)
    op.drop_table("theme_schedule", schema=SCHEMA)

    op.drop_index(op.f("ix_theme_catalog_priority"), table_name="theme_catalog", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_catalog_is_active"), table_name="theme_catalog", schema=SCHEMA)
    op.drop_index(op.f("ix_theme_catalog_theme_key"), table_name="theme_catalog", schema=SCHEMA)
    op.drop_table("theme_catalog", schema=SCHEMA)
