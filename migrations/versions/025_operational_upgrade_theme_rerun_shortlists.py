"""operational upgrade for theme buckets, rerun metadata, and shortlist support

Revision ID: 025
Revises: 024
Create Date: 2026-03-13 00:30:00
"""

from __future__ import annotations

from datetime import date, datetime, timezone

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "025"
down_revision = "024"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"
UTC = timezone.utc

THEME_KEYS = [
    "motivation-monday",
    "gratitude-tuesday",
    "love-wednesday",
    "friendship-thursday",
    "humor-friday",
    "family-saturday",
    "reflection-sunday",
    "ramadan-month",
    "holi-week",
    "valentines-week",
    "iran-war",
    "lpg-issue-india",
    "gold-price",
]


def _quoted_csv(values: list[str]) -> str:
    return ", ".join(f"'{value}'" for value in values)


def _int_csv(values: list[int]) -> str:
    return ", ".join(str(value) for value in values)


def _theme_catalog_table() -> sa.Table:
    return sa.table(
        "theme_catalog",
        sa.column("theme_key", sa.String(length=120)),
        sa.column("theme_name", sa.String(length=255)),
        sa.column("description", sa.Text()),
        sa.column("theme_bucket", sa.String(length=32)),
        sa.column("theme_type", sa.String(length=32)),
        sa.column("cultural_context", sa.String(length=120)),
        sa.column("tone_style", sa.String(length=64)),
        sa.column("default_funny_pct", sa.Integer()),
        sa.column("default_emotion_pct", sa.Integer()),
        sa.column("default_audience", sa.String(length=120)),
        sa.column("default_visual_style", sa.String(length=64)),
        sa.column("is_active", sa.Boolean()),
        sa.column("priority", sa.Integer()),
        sa.column("updated_at", sa.DateTime(timezone=True)),
    )


def upgrade() -> None:
    op.add_column(
        "theme_catalog",
        sa.Column("theme_bucket", sa.String(length=32), nullable=False, server_default=sa.text("'everyday'")),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_theme_catalog_theme_bucket"), "theme_catalog", ["theme_bucket"], unique=False, schema=SCHEMA)

    op.add_column(
        "card_jobs",
        sa.Column("retry_count", sa.Integer(), nullable=False, server_default=sa.text("0")),
        schema=SCHEMA,
    )
    op.add_column("card_jobs", sa.Column("last_stage_started_at", sa.DateTime(timezone=True), nullable=True), schema=SCHEMA)
    op.add_column("card_jobs", sa.Column("last_stage_finished_at", sa.DateTime(timezone=True), nullable=True), schema=SCHEMA)
    op.add_column("card_jobs", sa.Column("last_error_message", sa.Text(), nullable=True), schema=SCHEMA)

    op.add_column(
        "card_content_candidates",
        sa.Column("is_shortlisted", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        schema=SCHEMA,
    )
    op.add_column(
        "card_content_candidates",
        sa.Column("is_selected", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        schema=SCHEMA,
    )

    op.create_table(
        "card_shortlists",
        sa.Column("id", sa.Integer(), primary_key=True, autoincrement=True),
        sa.Column("job_id", sa.String(length=64), nullable=False),
        sa.Column("candidate_id", sa.Integer(), nullable=False),
        sa.Column("rank", sa.Integer(), nullable=False),
        sa.Column("score", sa.Float(), nullable=False, server_default=sa.text("0")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.ForeignKeyConstraint(["job_id"], [f"{SCHEMA}.card_jobs.job_id"], ondelete="CASCADE"),
        sa.ForeignKeyConstraint(["candidate_id"], [f"{SCHEMA}.card_content_candidates.id"], ondelete="CASCADE"),
        sa.UniqueConstraint("job_id", "candidate_id", name="uq_card_shortlists_job_candidate"),
        sa.UniqueConstraint("job_id", "rank", name="uq_card_shortlists_job_rank"),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_card_shortlists_job_id"), "card_shortlists", ["job_id"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_card_shortlists_candidate_id"), "card_shortlists", ["candidate_id"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_card_shortlists_rank"), "card_shortlists", ["rank"], unique=False, schema=SCHEMA)

    bind = op.get_bind()
    theme_catalog = _theme_catalog_table()
    catalog_rows = [
        {
            "theme_key": "motivation-monday",
            "theme_name": "Motivation Monday",
            "description": "Everyday Monday theme focused on momentum and optimism.",
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
            "description": "Everyday Tuesday theme centered on thanks and quiet appreciation.",
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
            "description": "Everyday Wednesday theme for affection, care, and romantic warmth.",
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
            "description": "Everyday Thursday theme for friendship-driven greetings.",
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
            "description": "Everyday Friday theme tuned for light humor and release.",
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
            "description": "Weekend family-focused greetings and togetherness.",
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
            "description": "Sunday theme for introspection, reset, and calm encouragement.",
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
            "description": "Special month-long Ramadan greeting campaign.",
            "theme_bucket": "special",
            "theme_type": "calendar",
            "cultural_context": "ramadan",
            "tone_style": "heartfelt",
            "default_funny_pct": 4,
            "default_emotion_pct": 96,
            "default_audience": "family and community",
            "default_visual_style": "elegant",
            "is_active": True,
            "priority": 97,
        },
        {
            "theme_key": "holi-week",
            "theme_name": "Holi Week",
            "description": "Special Holi date-range campaign for celebration and color.",
            "theme_bucket": "special",
            "theme_type": "calendar",
            "cultural_context": "india",
            "tone_style": "festive",
            "default_funny_pct": 32,
            "default_emotion_pct": 68,
            "default_audience": "friends and families",
            "default_visual_style": "festive",
            "is_active": True,
            "priority": 95,
        },
        {
            "theme_key": "valentines-week",
            "theme_name": "Valentine's Week",
            "description": "Special date-range campaign for affection-focused cards.",
            "theme_bucket": "special",
            "theme_type": "campaign",
            "cultural_context": "global",
            "tone_style": "romantic",
            "default_funny_pct": 16,
            "default_emotion_pct": 84,
            "default_audience": "partners",
            "default_visual_style": "elegant",
            "is_active": True,
            "priority": 94,
        },
        {
            "theme_key": "iran-war",
            "theme_name": "Iran War",
            "description": "Current-event editorial theme for conflict-sensitive public messaging.",
            "theme_bucket": "current_event",
            "theme_type": "news",
            "cultural_context": "middle east",
            "tone_style": "measured",
            "default_funny_pct": 0,
            "default_emotion_pct": 100,
            "default_audience": "regional audience",
            "default_visual_style": "minimal",
            "is_active": True,
            "priority": 110,
        },
        {
            "theme_key": "lpg-issue-india",
            "theme_name": "LPG Issue in India",
            "description": "Current-event editorial theme for utility and household cost messaging.",
            "theme_bucket": "current_event",
            "theme_type": "news",
            "cultural_context": "india",
            "tone_style": "clear",
            "default_funny_pct": 0,
            "default_emotion_pct": 100,
            "default_audience": "india households",
            "default_visual_style": "minimal",
            "is_active": True,
            "priority": 108,
        },
        {
            "theme_key": "gold-price",
            "theme_name": "Gold Price",
            "description": "Current-event editorial theme for price spike and market attention moments.",
            "theme_bucket": "current_event",
            "theme_type": "news",
            "cultural_context": "global markets",
            "tone_style": "urgent",
            "default_funny_pct": 0,
            "default_emotion_pct": 100,
            "default_audience": "market watchers",
            "default_visual_style": "elegant",
            "is_active": True,
            "priority": 107,
        },
    ]

    insert_stmt = postgresql.insert(theme_catalog).values(catalog_rows)
    bind.execute(
        insert_stmt.on_conflict_do_update(
            index_elements=[theme_catalog.c.theme_key],
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
            FROM {SCHEMA}.theme_catalog
            WHERE theme_key IN ({_quoted_csv(THEME_KEYS)})
            """
        )
    ).mappings()
    theme_lookup = {row["theme_key"]: row["id"] for row in theme_rows}

    bind.execute(sa.text(f"DELETE FROM {SCHEMA}.theme_schedule WHERE theme_id IN ({_int_csv(list(theme_lookup.values()))})"))

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
            {"theme_id": theme_lookup["motivation-monday"], "schedule_type": "weekly_recurring", "start_date": None, "end_date": None, "weekday_mask": ["monday"], "month_mask": [], "region": None, "country": None, "is_active": True, "priority": 90, "notes": "Everyday Monday recurring slot."},
            {"theme_id": theme_lookup["gratitude-tuesday"], "schedule_type": "weekly_recurring", "start_date": None, "end_date": None, "weekday_mask": ["tuesday"], "month_mask": [], "region": None, "country": None, "is_active": True, "priority": 88, "notes": "Everyday Tuesday recurring slot."},
            {"theme_id": theme_lookup["love-wednesday"], "schedule_type": "weekly_recurring", "start_date": None, "end_date": None, "weekday_mask": ["wednesday"], "month_mask": [], "region": None, "country": None, "is_active": True, "priority": 86, "notes": "Everyday Wednesday recurring slot."},
            {"theme_id": theme_lookup["friendship-thursday"], "schedule_type": "weekly_recurring", "start_date": None, "end_date": None, "weekday_mask": ["thursday"], "month_mask": [], "region": None, "country": None, "is_active": True, "priority": 84, "notes": "Everyday Thursday recurring slot."},
            {"theme_id": theme_lookup["humor-friday"], "schedule_type": "weekly_recurring", "start_date": None, "end_date": None, "weekday_mask": ["friday"], "month_mask": [], "region": None, "country": None, "is_active": True, "priority": 82, "notes": "Everyday Friday recurring slot."},
            {"theme_id": theme_lookup["family-saturday"], "schedule_type": "weekly_recurring", "start_date": None, "end_date": None, "weekday_mask": ["saturday"], "month_mask": [], "region": None, "country": None, "is_active": True, "priority": 80, "notes": "Everyday Saturday recurring slot."},
            {"theme_id": theme_lookup["reflection-sunday"], "schedule_type": "weekly_recurring", "start_date": None, "end_date": None, "weekday_mask": ["sunday"], "month_mask": [], "region": None, "country": None, "is_active": True, "priority": 78, "notes": "Everyday Sunday recurring slot."},
            {"theme_id": theme_lookup["ramadan-month"], "schedule_type": "date_range", "start_date": date(2026, 3, 1), "end_date": date(2026, 3, 31), "weekday_mask": [], "month_mask": [], "region": None, "country": None, "is_active": True, "priority": 97, "notes": "Special Ramadan month date-range campaign."},
            {"theme_id": theme_lookup["holi-week"], "schedule_type": "date_range", "start_date": date(2026, 3, 9), "end_date": date(2026, 3, 15), "weekday_mask": [], "month_mask": [], "region": None, "country": "india", "is_active": True, "priority": 95, "notes": "Special Holi week campaign."},
            {"theme_id": theme_lookup["valentines-week"], "schedule_type": "date_range", "start_date": date(2026, 2, 7), "end_date": date(2026, 2, 14), "weekday_mask": [], "month_mask": [], "region": None, "country": None, "is_active": True, "priority": 94, "notes": "Special Valentine's week campaign."},
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
        sa.column("created_at", sa.DateTime(timezone=True)),
    )

    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.theme_overrides
            WHERE theme_id IN (
                {theme_lookup["iran-war"]},
                {theme_lookup["lpg-issue-india"]},
                {theme_lookup["gold-price"]}
            )
            """
        )
    )

    op.bulk_insert(
        override_table,
        [
            {
                "override_type": "editorial",
                "event_id": None,
                "theme_name": "Iran War",
                "tone_funny_pct": 0,
                "tone_emotion_pct": 100,
                "prompt_keywords": ["sensitivity", "peace", "public response"],
                "color_palette": ["#1f2937", "#94a3b8"],
                "visual_style": "minimal",
                "instagram_hashtags": [],
                "start_date": date(2026, 4, 2),
                "end_date": date(2026, 4, 4),
                "priority": 1100,
                "created_by": "migration_025",
                "active": True,
                "theme_id": theme_lookup["iran-war"],
                "override_scope": "editorial",
                "start_at": datetime(2026, 4, 2, 0, 0, tzinfo=UTC),
                "end_at": datetime(2026, 4, 4, 23, 59, 59, tzinfo=UTC),
                "reason": "Sample urgent override for conflict coverage.",
                "force_top_priority": True,
                "created_at": datetime(2026, 3, 13, 0, 0, tzinfo=UTC),
            },
            {
                "override_type": "editorial",
                "event_id": None,
                "theme_name": "LPG Issue in India",
                "tone_funny_pct": 0,
                "tone_emotion_pct": 100,
                "prompt_keywords": ["household impact", "india", "utility costs"],
                "color_palette": ["#0f172a", "#f59e0b"],
                "visual_style": "minimal",
                "instagram_hashtags": [],
                "start_date": date(2026, 4, 10),
                "end_date": date(2026, 4, 12),
                "priority": 1080,
                "created_by": "migration_025",
                "active": True,
                "theme_id": theme_lookup["lpg-issue-india"],
                "override_scope": "editorial",
                "start_at": datetime(2026, 4, 10, 0, 0, tzinfo=UTC),
                "end_at": datetime(2026, 4, 12, 23, 59, 59, tzinfo=UTC),
                "reason": "Sample override for India household utility spike coverage.",
                "force_top_priority": True,
                "created_at": datetime(2026, 3, 13, 0, 0, tzinfo=UTC),
            },
            {
                "override_type": "editorial",
                "event_id": None,
                "theme_name": "Gold Price",
                "tone_funny_pct": 0,
                "tone_emotion_pct": 100,
                "prompt_keywords": ["market spike", "gold", "pricing"],
                "color_palette": ["#422006", "#facc15"],
                "visual_style": "elegant",
                "instagram_hashtags": [],
                "start_date": date(2026, 4, 16),
                "end_date": date(2026, 4, 18),
                "priority": 1070,
                "created_by": "migration_025",
                "active": True,
                "theme_id": theme_lookup["gold-price"],
                "override_scope": "editorial",
                "start_at": datetime(2026, 4, 16, 0, 0, tzinfo=UTC),
                "end_at": datetime(2026, 4, 18, 23, 59, 59, tzinfo=UTC),
                "reason": "Sample override for a gold-price editorial spike.",
                "force_top_priority": True,
                "created_at": datetime(2026, 3, 13, 0, 0, tzinfo=UTC),
            },
        ],
    )

    op.alter_column("theme_catalog", "theme_bucket", server_default=None, schema=SCHEMA)
    op.alter_column("card_jobs", "retry_count", server_default=None, schema=SCHEMA)
    op.alter_column("card_content_candidates", "is_shortlisted", server_default=None, schema=SCHEMA)
    op.alter_column("card_content_candidates", "is_selected", server_default=None, schema=SCHEMA)


def downgrade() -> None:
    bind = op.get_bind()
    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.theme_overrides
            WHERE theme_id IN (
                SELECT id FROM {SCHEMA}.theme_catalog WHERE theme_key IN ('iran-war', 'lpg-issue-india', 'gold-price')
            )
            """
        )
    )
    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.theme_schedule
            WHERE theme_id IN (
                SELECT id FROM {SCHEMA}.theme_catalog WHERE theme_key IN ({_quoted_csv(THEME_KEYS)})
            )
            """
        )
    )
    bind.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.theme_catalog
            WHERE theme_key IN ({_quoted_csv(THEME_KEYS)})
            AND theme_key IN (
                'gratitude-tuesday',
                'love-wednesday',
                'humor-friday',
                'family-saturday',
                'reflection-sunday',
                'holi-week',
                'iran-war',
                'lpg-issue-india',
                'gold-price'
            )
            """
        )
    )

    op.drop_index(op.f("ix_card_shortlists_rank"), table_name="card_shortlists", schema=SCHEMA)
    op.drop_index(op.f("ix_card_shortlists_candidate_id"), table_name="card_shortlists", schema=SCHEMA)
    op.drop_index(op.f("ix_card_shortlists_job_id"), table_name="card_shortlists", schema=SCHEMA)
    op.drop_table("card_shortlists", schema=SCHEMA)

    op.drop_column("card_content_candidates", "is_selected", schema=SCHEMA)
    op.drop_column("card_content_candidates", "is_shortlisted", schema=SCHEMA)

    op.drop_column("card_jobs", "last_error_message", schema=SCHEMA)
    op.drop_column("card_jobs", "last_stage_finished_at", schema=SCHEMA)
    op.drop_column("card_jobs", "last_stage_started_at", schema=SCHEMA)
    op.drop_column("card_jobs", "retry_count", schema=SCHEMA)

    op.drop_index(op.f("ix_theme_catalog_theme_bucket"), table_name="theme_catalog", schema=SCHEMA)
    op.drop_column("theme_catalog", "theme_bucket", schema=SCHEMA)
