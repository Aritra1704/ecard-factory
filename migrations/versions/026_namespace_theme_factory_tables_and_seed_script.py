"""namespace Theme Factory tables and normalize seed data

Revision ID: 026
Revises: 025
Create Date: 2026-03-13 14:30:00
"""

from __future__ import annotations

from datetime import date

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "026"
down_revision = "025"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"
LEGACY_SAMPLE_THEME_KEYS = [
    "iran-war",
    "lpg-issue-india",
    "gold-price",
]

CATALOG_ROWS = [
    {
        "theme_key": "motivation-monday",
        "theme_name": "Motivation Monday",
        "description": "Everyday Monday theme focused on momentum, encouragement, and a strong week start.",
        "theme_bucket": "everyday",
        "theme_type": "evergreen",
        "cultural_context": "global",
        "tone_style": "uplifting",
        "default_funny_pct": 18,
        "default_emotion_pct": 82,
        "default_audience": "working professionals",
        "default_visual_style": "minimal",
        "is_active": True,
        "priority": 90,
    },
    {
        "theme_key": "gratitude-tuesday",
        "theme_name": "Gratitude Tuesday",
        "description": "Everyday Tuesday theme for thank-you notes, appreciation, and grounded warmth.",
        "theme_bucket": "everyday",
        "theme_type": "evergreen",
        "cultural_context": "global",
        "tone_style": "warm",
        "default_funny_pct": 12,
        "default_emotion_pct": 88,
        "default_audience": "friends and colleagues",
        "default_visual_style": "minimal",
        "is_active": True,
        "priority": 88,
    },
    {
        "theme_key": "love-wednesday",
        "theme_name": "Love Wednesday",
        "description": "Everyday Wednesday theme centered on affection, care, and relationship warmth.",
        "theme_bucket": "everyday",
        "theme_type": "evergreen",
        "cultural_context": "global",
        "tone_style": "romantic",
        "default_funny_pct": 8,
        "default_emotion_pct": 92,
        "default_audience": "partners and loved ones",
        "default_visual_style": "elegant",
        "is_active": True,
        "priority": 86,
    },
    {
        "theme_key": "friendship-thursday",
        "theme_name": "Friendship Thursday",
        "description": "Everyday Thursday theme for friendship-led greetings and lighthearted connection.",
        "theme_bucket": "everyday",
        "theme_type": "evergreen",
        "cultural_context": "global",
        "tone_style": "warm",
        "default_funny_pct": 30,
        "default_emotion_pct": 70,
        "default_audience": "friends",
        "default_visual_style": "playful",
        "is_active": True,
        "priority": 84,
    },
    {
        "theme_key": "humor-friday",
        "theme_name": "Humor Friday",
        "description": "Everyday Friday theme tuned for wit, release, and end-of-week levity.",
        "theme_bucket": "everyday",
        "theme_type": "evergreen",
        "cultural_context": "global",
        "tone_style": "witty",
        "default_funny_pct": 60,
        "default_emotion_pct": 40,
        "default_audience": "friends and teams",
        "default_visual_style": "playful",
        "is_active": True,
        "priority": 82,
    },
    {
        "theme_key": "family-saturday",
        "theme_name": "Family Saturday",
        "description": "Weekend family-centered greetings with togetherness and affection.",
        "theme_bucket": "everyday",
        "theme_type": "evergreen",
        "cultural_context": "global",
        "tone_style": "heartfelt",
        "default_funny_pct": 14,
        "default_emotion_pct": 86,
        "default_audience": "family",
        "default_visual_style": "elegant",
        "is_active": True,
        "priority": 80,
    },
    {
        "theme_key": "reflection-sunday",
        "theme_name": "Reflection Sunday",
        "description": "Sunday theme for introspection, calm encouragement, and a gentle reset.",
        "theme_bucket": "everyday",
        "theme_type": "evergreen",
        "cultural_context": "global",
        "tone_style": "reflective",
        "default_funny_pct": 6,
        "default_emotion_pct": 94,
        "default_audience": "general audience",
        "default_visual_style": "minimal",
        "is_active": True,
        "priority": 78,
    },
    {
        "theme_key": "ramadan-month",
        "theme_name": "Ramadan Month",
        "description": "Occasion theme for Ramadan greetings, family connection, and community warmth.",
        "theme_bucket": "special",
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
        "theme_key": "holi-week",
        "theme_name": "Holi Week",
        "description": "Occasion theme for color, celebration, and playful spring greetings.",
        "theme_bucket": "special",
        "theme_type": "campaign",
        "cultural_context": "india",
        "tone_style": "festive",
        "default_funny_pct": 24,
        "default_emotion_pct": 76,
        "default_audience": "friends and family",
        "default_visual_style": "festive",
        "is_active": True,
        "priority": 94,
    },
    {
        "theme_key": "valentines-week",
        "theme_name": "Valentine's Week",
        "description": "Occasion theme for relationship, love, and affection-led campaigns.",
        "theme_bucket": "special",
        "theme_type": "campaign",
        "cultural_context": "global",
        "tone_style": "romantic",
        "default_funny_pct": 18,
        "default_emotion_pct": 82,
        "default_audience": "partners",
        "default_visual_style": "elegant",
        "is_active": True,
        "priority": 92,
    },
    {
        "theme_key": "india-trend-override",
        "theme_name": "India Trend Override",
        "description": "Current-event override theme for urgent India-led editorial trends.",
        "theme_bucket": "current_event",
        "theme_type": "news",
        "cultural_context": "india",
        "tone_style": "urgent",
        "default_funny_pct": 4,
        "default_emotion_pct": 96,
        "default_audience": "india audience",
        "default_visual_style": "editorial",
        "is_active": True,
        "priority": 100,
    },
]

SCHEDULE_ROWS = [
    ("motivation-monday", "weekly_recurring", None, None, ["monday"], [], None, None, True, 90, "Default Monday recurring slot."),
    ("gratitude-tuesday", "weekly_recurring", None, None, ["tuesday"], [], None, None, True, 88, "Default Tuesday recurring slot."),
    ("love-wednesday", "weekly_recurring", None, None, ["wednesday"], [], None, None, True, 86, "Default Wednesday recurring slot."),
    ("friendship-thursday", "weekly_recurring", None, None, ["thursday"], [], None, None, True, 84, "Default Thursday recurring slot."),
    ("humor-friday", "weekly_recurring", None, None, ["friday"], [], None, None, True, 82, "Default Friday recurring slot."),
    ("family-saturday", "weekly_recurring", None, None, ["saturday"], [], None, None, True, 80, "Default Saturday recurring slot."),
    ("reflection-sunday", "weekly_recurring", None, None, ["sunday"], [], None, None, True, 78, "Default Sunday recurring slot."),
    ("ramadan-month", "date_range", date(2026, 2, 18), date(2026, 3, 19), [], [], None, None, True, 96, "Example Ramadan campaign date range."),
    ("holi-week", "date_range", date(2026, 3, 1), date(2026, 3, 8), [], [], "asia", "india", True, 94, "Example Holi campaign window."),
    ("valentines-week", "date_range", date(2026, 2, 7), date(2026, 2, 14), [], [], None, None, True, 92, "Example Valentine's week campaign window."),
]


def _catalog_table() -> sa.Table:
    return sa.Table(
        "card_theme_catalog",
        sa.MetaData(),
        sa.Column("theme_key", sa.String(length=120)),
        sa.Column("theme_name", sa.String(length=255)),
        sa.Column("description", sa.Text()),
        sa.Column("theme_bucket", sa.String(length=32)),
        sa.Column("theme_type", sa.String(length=32)),
        sa.Column("cultural_context", sa.String(length=120)),
        sa.Column("tone_style", sa.String(length=64)),
        sa.Column("default_funny_pct", sa.Integer()),
        sa.Column("default_emotion_pct", sa.Integer()),
        sa.Column("default_audience", sa.String(length=120)),
        sa.Column("default_visual_style", sa.String(length=64)),
        sa.Column("is_active", sa.Boolean()),
        sa.Column("priority", sa.Integer()),
        sa.Column("updated_at", sa.DateTime(timezone=True)),
        schema=SCHEMA,
    )


def upgrade() -> None:
    bind = op.get_bind()

    op.rename_table("theme_catalog", "card_theme_catalog", schema=SCHEMA)
    op.rename_table("theme_schedule", "card_theme_schedule", schema=SCHEMA)

    op.execute(f'ALTER TABLE "{SCHEMA}".card_theme_catalog RENAME CONSTRAINT pk_theme_catalog TO pk_card_theme_catalog')
    op.execute(
        f'ALTER TABLE "{SCHEMA}".card_theme_catalog RENAME CONSTRAINT uq_theme_catalog_theme_key TO uq_card_theme_catalog_theme_key'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_theme_catalog_theme_key RENAME TO ix_card_theme_catalog_theme_key'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_theme_catalog_is_active RENAME TO ix_card_theme_catalog_is_active'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_theme_catalog_priority RENAME TO ix_card_theme_catalog_priority'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_theme_catalog_theme_bucket RENAME TO ix_card_theme_catalog_theme_bucket'
    )

    op.execute(f'ALTER TABLE "{SCHEMA}".card_theme_schedule RENAME CONSTRAINT pk_theme_schedule TO pk_card_theme_schedule')
    op.execute(
        f'ALTER TABLE "{SCHEMA}".card_theme_schedule RENAME CONSTRAINT fk_theme_schedule_theme_id_theme_catalog TO fk_card_theme_schedule_theme_id_card_theme_catalog'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_theme_schedule_theme_id RENAME TO ix_card_theme_schedule_theme_id'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_theme_schedule_schedule_type RENAME TO ix_card_theme_schedule_schedule_type'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_theme_schedule_is_active RENAME TO ix_card_theme_schedule_is_active'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_theme_schedule_priority RENAME TO ix_card_theme_schedule_priority'
    )

    op.create_table(
        "card_theme_overrides",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("theme_id", sa.Integer(), nullable=False),
        sa.Column("override_scope", sa.String(length=120), nullable=False),
        sa.Column("start_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("end_at", sa.DateTime(timezone=True), nullable=False),
        sa.Column("reason", sa.Text(), nullable=True),
        sa.Column("force_top_priority", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_by", sa.String(length=100), nullable=False, server_default=sa.text("'system'")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["theme_id"], [f"{SCHEMA}.card_theme_catalog.id"], ondelete="CASCADE"),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_card_theme_overrides_theme_id"), "card_theme_overrides", ["theme_id"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_card_theme_overrides_start_at"), "card_theme_overrides", ["start_at"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_card_theme_overrides_end_at"), "card_theme_overrides", ["end_at"], unique=False, schema=SCHEMA)

    bind.execute(
        sa.text(
            f"""
            INSERT INTO {SCHEMA}.card_theme_overrides (
                theme_id,
                override_scope,
                start_at,
                end_at,
                reason,
                force_top_priority,
                created_by,
                created_at
            )
            SELECT
                theme_id,
                COALESCE(override_scope, override_type),
                COALESCE(start_at, timezone('UTC', start_date::timestamp)),
                COALESCE(end_at, timezone('UTC', (end_date::timestamp + interval '23 hours 59 minutes 59 seconds'))),
                reason,
                COALESCE(force_top_priority, false),
                COALESCE(created_by, 'system'),
                COALESCE(created_at, now())
            FROM {SCHEMA}.theme_overrides
            WHERE theme_id IS NOT NULL
            """
        )
    )

    op.execute(f'ALTER TABLE "{SCHEMA}".theme_overrides DROP CONSTRAINT IF EXISTS fk_theme_overrides_theme_id_theme_catalog')
    op.execute(f'DROP INDEX IF EXISTS "{SCHEMA}".ix_theme_overrides_theme_id')
    op.execute(f'DROP INDEX IF EXISTS "{SCHEMA}".ix_theme_overrides_start_at')
    op.execute(f'DROP INDEX IF EXISTS "{SCHEMA}".ix_theme_overrides_end_at')
    op.drop_column("theme_overrides", "theme_id", schema=SCHEMA)
    op.drop_column("theme_overrides", "override_scope", schema=SCHEMA)
    op.drop_column("theme_overrides", "start_at", schema=SCHEMA)
    op.drop_column("theme_overrides", "end_at", schema=SCHEMA)
    op.drop_column("theme_overrides", "reason", schema=SCHEMA)
    op.drop_column("theme_overrides", "force_top_priority", schema=SCHEMA)
    op.drop_column("theme_overrides", "created_at", schema=SCHEMA)

    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.card_theme_overrides
            WHERE theme_id IN (
                SELECT id FROM {SCHEMA}.card_theme_catalog
                WHERE theme_key IN ({", ".join(repr(item) for item in LEGACY_SAMPLE_THEME_KEYS)})
            )
            """
        )
    )
    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.card_theme_schedule
            WHERE theme_id IN (
                SELECT id FROM {SCHEMA}.card_theme_catalog
                WHERE theme_key IN ({", ".join(repr(item) for item in LEGACY_SAMPLE_THEME_KEYS)})
            )
            """
        )
    )
    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.card_theme_catalog
            WHERE theme_key IN ({", ".join(repr(item) for item in LEGACY_SAMPLE_THEME_KEYS)})
            """
        )
    )

    card_theme_catalog = _catalog_table()
    insert_stmt = postgresql.insert(card_theme_catalog).values(CATALOG_ROWS)
    bind.execute(
        insert_stmt.on_conflict_do_update(
            index_elements=[card_theme_catalog.c.theme_key],
            set_={
                "theme_name": insert_stmt.excluded.theme_name,
                "description": insert_stmt.excluded.description,
                "theme_bucket": insert_stmt.excluded.theme_bucket,
                "theme_type": insert_stmt.excluded.theme_type,
                "cultural_context": insert_stmt.excluded.cultural_context,
                "tone_style": insert_stmt.excluded.tone_style,
                "default_funny_pct": insert_stmt.excluded.default_funny_pct,
                "default_emotion_pct": insert_stmt.excluded.default_emotion_pct,
                "default_audience": insert_stmt.excluded.default_audience,
                "default_visual_style": insert_stmt.excluded.default_visual_style,
                "is_active": insert_stmt.excluded.is_active,
                "priority": insert_stmt.excluded.priority,
                "updated_at": sa.func.now(),
            },
        )
    )

    theme_rows = bind.execute(
        sa.text(
            f"""
            SELECT id, theme_key
            FROM {SCHEMA}.card_theme_catalog
            WHERE theme_key IN ({", ".join(repr(row["theme_key"]) for row in CATALOG_ROWS)})
            """
        )
    ).fetchall()
    theme_lookup = {row.theme_key: row.id for row in theme_rows}

    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.card_theme_schedule
            WHERE theme_id IN ({", ".join(str(theme_id) for theme_id in theme_lookup.values())})
            """
        )
    )

    for (
        theme_key,
        schedule_type,
        start_date,
        end_date,
        weekday_mask,
        month_mask,
        region,
        country,
        is_active,
        priority,
        notes,
    ) in SCHEDULE_ROWS:
        bind.execute(
            sa.text(
                f"""
                INSERT INTO {SCHEMA}.card_theme_schedule (
                    theme_id,
                    schedule_type,
                    start_date,
                    end_date,
                    weekday_mask,
                    month_mask,
                    region,
                    country,
                    is_active,
                    priority,
                    notes
                ) VALUES (
                    :theme_id,
                    :schedule_type,
                    :start_date,
                    :end_date,
                    :weekday_mask,
                    :month_mask,
                    :region,
                    :country,
                    :is_active,
                    :priority,
                    :notes
                )
                """
            ),
            {
                "theme_id": theme_lookup[theme_key],
                "schedule_type": schedule_type,
                "start_date": start_date,
                "end_date": end_date,
                "weekday_mask": weekday_mask,
                "month_mask": month_mask,
                "region": region,
                "country": country,
                "is_active": is_active,
                "priority": priority,
                "notes": notes,
            },
        )

    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.card_theme_overrides
            WHERE theme_id = (
                SELECT id
                FROM {SCHEMA}.card_theme_catalog
                WHERE theme_key = 'india-trend-override'
            )
            AND created_by = 'seed'
            """
        )
    )
    bind.execute(
        sa.text(
            f"""
            INSERT INTO {SCHEMA}.card_theme_overrides (
                theme_id,
                override_scope,
                start_at,
                end_at,
                reason,
                force_top_priority,
                created_by
            )
            VALUES (
                (SELECT id FROM {SCHEMA}.card_theme_catalog WHERE theme_key = 'india-trend-override'),
                'editorial',
                '2026-08-14T00:00:00+05:30',
                '2026-08-16T23:59:59+05:30',
                'Sample India editorial override window for trend-led card operations.',
                true,
                'seed'
            )
            """
        )
    )


def downgrade() -> None:
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
        "card_theme_catalog",
        ["theme_id"],
        ["id"],
        source_schema=SCHEMA,
        referent_schema=SCHEMA,
    )

    op.drop_index(op.f("ix_card_theme_overrides_end_at"), table_name="card_theme_overrides", schema=SCHEMA)
    op.drop_index(op.f("ix_card_theme_overrides_start_at"), table_name="card_theme_overrides", schema=SCHEMA)
    op.drop_index(op.f("ix_card_theme_overrides_theme_id"), table_name="card_theme_overrides", schema=SCHEMA)
    op.drop_table("card_theme_overrides", schema=SCHEMA)

    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_card_theme_schedule_theme_id RENAME TO ix_theme_schedule_theme_id'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_card_theme_schedule_schedule_type RENAME TO ix_theme_schedule_schedule_type'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_card_theme_schedule_is_active RENAME TO ix_theme_schedule_is_active'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_card_theme_schedule_priority RENAME TO ix_theme_schedule_priority'
    )
    op.execute(
        f'ALTER TABLE "{SCHEMA}".card_theme_schedule RENAME CONSTRAINT fk_card_theme_schedule_theme_id_card_theme_catalog TO fk_theme_schedule_theme_id_theme_catalog'
    )
    op.execute(
        f'ALTER TABLE "{SCHEMA}".card_theme_schedule RENAME CONSTRAINT pk_card_theme_schedule TO pk_theme_schedule'
    )

    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_card_theme_catalog_theme_key RENAME TO ix_theme_catalog_theme_key'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_card_theme_catalog_is_active RENAME TO ix_theme_catalog_is_active'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_card_theme_catalog_priority RENAME TO ix_theme_catalog_priority'
    )
    op.execute(
        f'ALTER INDEX "{SCHEMA}".ix_card_theme_catalog_theme_bucket RENAME TO ix_theme_catalog_theme_bucket'
    )
    op.execute(
        f'ALTER TABLE "{SCHEMA}".card_theme_catalog RENAME CONSTRAINT uq_card_theme_catalog_theme_key TO uq_theme_catalog_theme_key'
    )
    op.execute(
        f'ALTER TABLE "{SCHEMA}".card_theme_catalog RENAME CONSTRAINT pk_card_theme_catalog TO pk_theme_catalog'
    )

    op.rename_table("card_theme_schedule", "theme_schedule", schema=SCHEMA)
    op.rename_table("card_theme_catalog", "theme_catalog", schema=SCHEMA)
