"""add operator option catalog for editable UI dropdowns

Revision ID: 033
Revises: 032
Create Date: 2026-03-23 16:30:00
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa

revision = "033"
down_revision = "032"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"

SEED_ROWS = [
    ("audience", "general_audience", "general audience", "General Audience", "Broad public-facing greetings.", 10, True, True),
    ("audience", "working_professionals", "working professionals", "Working Professionals", "Office-safe and workplace-appropriate tone.", 20, True, False),
    ("audience", "friends_and_family", "friends and family", "Friends and Family", "Warm greetings for personal circles.", 30, True, False),
    ("audience", "teammates", "teammates", "Teammates", "Internal appreciation and team morale messages.", 40, True, False),
    ("audience", "community", "community", "Community", "Local or cause-led public community messaging.", 50, True, False),
    ("audience", "friends", "friends", "Friends", "Casual and playful personal greetings.", 60, True, False),
    ("audience", "family", "family", "Family", "Family-centric greeting tone.", 70, True, False),
    ("audience", "partners_and_loved_ones", "partners and loved ones", "Partners and Loved Ones", "Romantic or intimate greetings.", 80, True, False),
    ("cultural_context", "global", "global", "Global", "Broad audience with no specific regional framing.", 10, True, True),
    ("cultural_context", "indian", "indian", "Indian", "General India-facing cultural cues.", 20, True, False),
    ("cultural_context", "bengali", "bengali", "Bengali", "Bengali language/cultural nuance.", 30, True, False),
    ("cultural_context", "corporate", "corporate", "Corporate", "Professional workplace framing.", 40, True, False),
    ("cultural_context", "family_centric", "family-centric", "Family-Centric", "Home and family-first framing.", 50, True, False),
    ("tone_style", "conversational", "conversational", "Conversational", "Natural spoken-language greeting tone.", 10, True, True),
    ("tone_style", "minimal", "minimal", "Minimal", "Short and crisp wording.", 20, True, False),
    ("tone_style", "poetic", "poetic", "Poetic", "Softer, lyrical phrasing.", 30, True, False),
    ("tone_style", "witty", "witty", "Witty", "Humorous and smart card copy.", 40, True, False),
    ("tone_style", "heartfelt", "heartfelt", "Heartfelt", "Emotion-led warm greetings.", 50, True, False),
    ("tone_style", "uplifting", "uplifting", "Uplifting", "Encouraging and positive mood.", 60, True, False),
    ("tone_style", "festive", "festive", "Festive", "Celebratory and occasion-led wording.", 70, True, False),
    ("copy_style", "minimal", "minimal", "Minimal", "Short crisp one-line greeting copy.", 10, True, True),
    ("copy_style", "witty", "witty", "Witty", "Humor-forward short copy.", 20, True, False),
    ("copy_style", "playful", "playful", "Playful", "Light and cheerful short copy.", 30, True, False),
    ("copy_style", "heartfelt", "heartfelt", "Heartfelt", "Emotion-forward short copy.", 40, True, False),
    ("visual_style", "minimal", "minimal", "Minimal", "Clean restrained art direction.", 10, True, True),
    ("visual_style", "elegant", "elegant", "Elegant", "Classic editorial card styling.", 20, True, False),
    ("visual_style", "festive", "festive", "Festive", "Colorful celebration-forward visuals.", 30, True, False),
    ("visual_style", "playful", "playful", "Playful", "Light, fun illustration direction.", 40, True, False),
    ("theme_bucket", "everyday", "everyday", "Everyday", "Recurring evergreen daily themes.", 10, True, True),
    ("theme_bucket", "occasion", "occasion", "Occasion", "Calendar and campaign themes.", 20, True, False),
    ("theme_bucket", "current_event", "current_event", "Current Event", "Editorial trend and news-linked themes.", 30, True, False),
    ("theme_type", "evergreen", "evergreen", "Evergreen", "Always-available reusable theme.", 10, True, True),
    ("theme_type", "calendar", "calendar", "Calendar", "Date-based annual theme.", 20, True, False),
    ("theme_type", "campaign", "campaign", "Campaign", "Bounded marketing or seasonal run.", 30, True, False),
    ("theme_type", "news", "news", "News", "Editorial or current-event driven theme.", 40, True, False),
    ("schedule_type", "weekly_recurring", "weekly_recurring", "Weekly Recurring", "Repeats on chosen weekdays.", 10, True, True),
    ("schedule_type", "single_day", "single_day", "Single Day", "Runs on one specific date.", 20, True, False),
    ("schedule_type", "date_range", "date_range", "Date Range", "Runs across a bounded campaign window.", 30, True, False),
    ("schedule_type", "monthly_recurring", "monthly_recurring", "Monthly Recurring", "Repeats across selected months.", 40, True, False),
    ("override_scope", "editorial", "editorial", "Editorial", "Used for editorial priority overrides.", 10, True, True),
    ("override_scope", "operator", "operator", "Operator", "Manual operational override.", 20, True, False),
    ("override_scope", "campaign", "campaign", "Campaign", "Override linked to a campaign push.", 30, True, False),
]


def upgrade() -> None:
    op.create_table(
        "operator_option_catalog",
        sa.Column("id", sa.Integer(), autoincrement=True, nullable=False),
        sa.Column("category", sa.String(length=64), nullable=False),
        sa.Column("option_key", sa.String(length=120), nullable=False),
        sa.Column("option_value", sa.String(length=160), nullable=False),
        sa.Column("label", sa.String(length=160), nullable=False),
        sa.Column("description", sa.Text(), nullable=True),
        sa.Column("sort_order", sa.Integer(), nullable=False, server_default=sa.text("0")),
        sa.Column("is_active", sa.Boolean(), nullable=False, server_default=sa.text("true")),
        sa.Column("is_default", sa.Boolean(), nullable=False, server_default=sa.text("false")),
        sa.Column("created_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.Column("updated_at", sa.DateTime(timezone=True), nullable=False, server_default=sa.func.now()),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_operator_option_catalog")),
        sa.UniqueConstraint("category", "option_key", name="uq_operator_option_catalog_category_option_key"),
        schema=SCHEMA,
    )
    op.create_index(op.f("ix_operator_option_catalog_category"), "operator_option_catalog", ["category"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_operator_option_catalog_sort_order"), "operator_option_catalog", ["sort_order"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_operator_option_catalog_is_active"), "operator_option_catalog", ["is_active"], unique=False, schema=SCHEMA)
    op.create_index(op.f("ix_operator_option_catalog_is_default"), "operator_option_catalog", ["is_default"], unique=False, schema=SCHEMA)

    option_table = sa.Table(
        "operator_option_catalog",
        sa.MetaData(),
        sa.Column("category", sa.String(length=64)),
        sa.Column("option_key", sa.String(length=120)),
        sa.Column("option_value", sa.String(length=160)),
        sa.Column("label", sa.String(length=160)),
        sa.Column("description", sa.Text()),
        sa.Column("sort_order", sa.Integer()),
        sa.Column("is_active", sa.Boolean()),
        sa.Column("is_default", sa.Boolean()),
        schema=SCHEMA,
    )
    op.bulk_insert(
        option_table,
        [
            {
                "category": category,
                "option_key": option_key,
                "option_value": option_value,
                "label": label,
                "description": description,
                "sort_order": sort_order,
                "is_active": is_active,
                "is_default": is_default,
            }
            for category, option_key, option_value, label, description, sort_order, is_active, is_default in SEED_ROWS
        ],
        multiinsert=True,
    )


def downgrade() -> None:
    op.drop_index(op.f("ix_operator_option_catalog_is_default"), table_name="operator_option_catalog", schema=SCHEMA)
    op.drop_index(op.f("ix_operator_option_catalog_is_active"), table_name="operator_option_catalog", schema=SCHEMA)
    op.drop_index(op.f("ix_operator_option_catalog_sort_order"), table_name="operator_option_catalog", schema=SCHEMA)
    op.drop_index(op.f("ix_operator_option_catalog_category"), table_name="operator_option_catalog", schema=SCHEMA)
    op.drop_table("operator_option_catalog", schema=SCHEMA)
