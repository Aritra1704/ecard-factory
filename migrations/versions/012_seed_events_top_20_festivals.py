"""seed top 20 festivals

Revision ID: 012
Revises: 011
Create Date: 2026-02-27 00:00:12
"""

from __future__ import annotations

from datetime import date

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "012"
down_revision = "011"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


events = sa.table(
    "events",
    sa.column("name", sa.String(length=150)),
    sa.column("event_date", sa.Date()),
    sa.column("region", sa.String(length=50)),
    sa.column("lead_days", sa.Integer()),
    sa.column("theme_keywords", postgresql.ARRAY(sa.Text())),
    sa.column("recurrence", sa.String(length=50)),
)


def upgrade() -> None:
    """Seed core Indian and global festivals used by the content factory."""

    op.bulk_insert(
        events,
        [
            {
                "name": "New Year's Day",
                "event_date": date(2026, 1, 1),
                "region": "global",
                "lead_days": 21,
                "theme_keywords": ["new beginnings", "midnight", "celebration", "resolution"],
                "recurrence": "annual_fixed",
            },
            {
                "name": "Pongal",
                "event_date": date(2026, 1, 14),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["harvest", "gratitude", "kolam", "sugarcane"],
                "recurrence": "annual_solar",
            },
            {
                "name": "Makar Sankranti",
                "event_date": date(2026, 1, 14),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["kites", "sun transition", "sesame sweets", "harvest"],
                "recurrence": "annual_solar",
            },
            {
                "name": "Vasant Panchami",
                "event_date": date(2026, 1, 23),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["spring", "yellow", "wisdom", "saraswati"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Valentine's Day",
                "event_date": date(2026, 2, 14),
                "region": "global",
                "lead_days": 21,
                "theme_keywords": ["romance", "love notes", "hearts", "roses"],
                "recurrence": "annual_fixed",
            },
            {
                "name": "Maha Shivaratri",
                "event_date": date(2026, 2, 15),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["devotion", "night vigil", "meditation", "shiva"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Holi",
                "event_date": date(2026, 3, 4),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["colors", "spring joy", "community", "playful"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Gudi Padwa",
                "event_date": date(2026, 3, 19),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["new year", "festive home", "rangoli", "auspicious"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Bakrid",
                "event_date": date(2026, 5, 27),
                "region": "global",
                "lead_days": 21,
                "theme_keywords": ["generosity", "faith", "family meal", "sharing"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Father's Day",
                "event_date": date(2026, 6, 21),
                "region": "global",
                "lead_days": 21,
                "theme_keywords": ["dad jokes", "gratitude", "family", "tribute"],
                "recurrence": "annual_nth_weekday",
            },
            {
                "name": "Rath Yatra",
                "event_date": date(2026, 7, 16),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["chariots", "devotion", "procession", "jagannath"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Friendship Day",
                "event_date": date(2026, 8, 2),
                "region": "global",
                "lead_days": 21,
                "theme_keywords": ["friends", "inside jokes", "memories", "bonds"],
                "recurrence": "annual_nth_weekday",
            },
            {
                "name": "Onam",
                "event_date": date(2026, 8, 26),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["pookalam", "harvest feast", "boat race", "kerala"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Raksha Bandhan",
                "event_date": date(2026, 8, 28),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["siblings", "rakhi", "family love", "celebration"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Janmashtami",
                "event_date": date(2026, 9, 4),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["krishna", "devotion", "midnight prayers", "playful"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Ganesh Chaturthi",
                "event_date": date(2026, 9, 14),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["ganesha", "modak", "welcome home", "festive decor"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Dussehra",
                "event_date": date(2026, 10, 20),
                "region": "india",
                "lead_days": 21,
                "theme_keywords": ["victory of good", "effigies", "tradition", "celebration"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Halloween",
                "event_date": date(2026, 10, 31),
                "region": "global",
                "lead_days": 21,
                "theme_keywords": ["spooky", "costumes", "pumpkins", "party"],
                "recurrence": "annual_fixed",
            },
            {
                "name": "Diwali",
                "event_date": date(2026, 11, 8),
                "region": "india",
                "lead_days": 30,
                "theme_keywords": ["lights", "prosperity", "rangoli", "family"],
                "recurrence": "annual_lunar",
            },
            {
                "name": "Christmas",
                "event_date": date(2026, 12, 25),
                "region": "global",
                "lead_days": 30,
                "theme_keywords": ["joy", "gifts", "winter", "celebration"],
                "recurrence": "annual_fixed",
            },
        ],
    )


def downgrade() -> None:
    """Remove the seeded festival rows."""

    op.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.events
            WHERE name IN (
                'New Year''s Day',
                'Pongal',
                'Makar Sankranti',
                'Vasant Panchami',
                'Valentine''s Day',
                'Maha Shivaratri',
                'Holi',
                'Gudi Padwa',
                'Bakrid',
                'Father''s Day',
                'Rath Yatra',
                'Friendship Day',
                'Onam',
                'Raksha Bandhan',
                'Janmashtami',
                'Ganesh Chaturthi',
                'Dussehra',
                'Halloween',
                'Diwali',
                'Christmas'
            )
            """
        )
    )
