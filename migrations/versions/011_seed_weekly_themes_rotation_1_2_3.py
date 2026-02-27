"""seed weekly theme rotations

Revision ID: 011
Revises: 010
Create Date: 2026-02-27 00:00:11
"""

from __future__ import annotations

from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "011"
down_revision = "010"
branch_labels = None
depends_on = None

SCHEMA = "ecard_factory"


weekly_themes = sa.table(
    "weekly_themes",
    sa.column("rotation_month", sa.Integer()),
    sa.column("day_of_week", sa.String(length=20)),
    sa.column("theme_name", sa.String(length=100)),
    sa.column("tone_funny_pct", sa.Integer()),
    sa.column("tone_emotion_pct", sa.Integer()),
    sa.column("prompt_keywords", postgresql.ARRAY(sa.Text())),
    sa.column("color_palette", postgresql.ARRAY(sa.Text())),
    sa.column("visual_style", sa.String(length=100)),
    sa.column("instagram_hashtags", postgresql.ARRAY(sa.Text())),
    sa.column("active", sa.Boolean()),
)


def upgrade() -> None:
    """Seed three monthly theme rotations across all seven weekdays."""

    op.bulk_insert(
        weekly_themes,
        [
            {
                "rotation_month": 1,
                "day_of_week": "monday",
                "theme_name": "Motivation Monday",
                "tone_funny_pct": 30,
                "tone_emotion_pct": 70,
                "prompt_keywords": ["fresh start", "hopeful", "uplift", "optimism"],
                "color_palette": ["#2F6BFF", "#A8DADC", "#F1FAEE"],
                "visual_style": "clean editorial illustration",
                "instagram_hashtags": ["#MotivationMonday", "#NewWeek", "#ecardfactory"],
                "active": True,
            },
            {
                "rotation_month": 1,
                "day_of_week": "tuesday",
                "theme_name": "Gratitude Tuesday",
                "tone_funny_pct": 20,
                "tone_emotion_pct": 80,
                "prompt_keywords": ["thankful", "warm", "kindness", "support"],
                "color_palette": ["#FFB703", "#FB8500", "#FFE8A3"],
                "visual_style": "paper-cut collage",
                "instagram_hashtags": ["#GratitudeTuesday", "#SendThanks", "#digitalcards"],
                "active": True,
            },
            {
                "rotation_month": 1,
                "day_of_week": "wednesday",
                "theme_name": "Midweek Smile",
                "tone_funny_pct": 60,
                "tone_emotion_pct": 40,
                "prompt_keywords": ["playful", "cheerful", "coffee break", "giggles"],
                "color_palette": ["#FF6B6B", "#FFD166", "#F7FFF7"],
                "visual_style": "flat playful vector",
                "instagram_hashtags": ["#MidweekSmile", "#WednesdayMood", "#funnyecards"],
                "active": True,
            },
            {
                "rotation_month": 1,
                "day_of_week": "thursday",
                "theme_name": "Throwback Thursday",
                "tone_funny_pct": 55,
                "tone_emotion_pct": 45,
                "prompt_keywords": ["nostalgia", "retro", "memories", "shared moments"],
                "color_palette": ["#6D597A", "#B56576", "#E56B6F"],
                "visual_style": "retro print poster",
                "instagram_hashtags": ["#ThrowbackThursday", "#RetroVibes", "#ecardstudio"],
                "active": True,
            },
            {
                "rotation_month": 1,
                "day_of_week": "friday",
                "theme_name": "Feel Good Friday",
                "tone_funny_pct": 50,
                "tone_emotion_pct": 50,
                "prompt_keywords": ["celebration", "weekend", "joy", "friends"],
                "color_palette": ["#00B4D8", "#90E0EF", "#CAF0F8"],
                "visual_style": "vibrant digital pop art",
                "instagram_hashtags": ["#FeelGoodFriday", "#WeekendReady", "#greetingcards"],
                "active": True,
            },
            {
                "rotation_month": 1,
                "day_of_week": "saturday",
                "theme_name": "Family Saturday",
                "tone_funny_pct": 25,
                "tone_emotion_pct": 75,
                "prompt_keywords": ["family", "togetherness", "home", "comfort"],
                "color_palette": ["#8E9AAF", "#CBC0D3", "#EFD3D7"],
                "visual_style": "hand-painted gouache",
                "instagram_hashtags": ["#FamilySaturday", "#WeekendWarmth", "#heartfeltcards"],
                "active": True,
            },
            {
                "rotation_month": 1,
                "day_of_week": "sunday",
                "theme_name": "Self Care Sunday",
                "tone_funny_pct": 15,
                "tone_emotion_pct": 85,
                "prompt_keywords": ["rest", "calm", "reset", "mindfulness"],
                "color_palette": ["#84A98C", "#CAD2C5", "#F6FFF8"],
                "visual_style": "soft watercolor minimalism",
                "instagram_hashtags": ["#SelfCareSunday", "#MindfulMoments", "#ecardfactory"],
                "active": True,
            },
            {
                "rotation_month": 2,
                "day_of_week": "monday",
                "theme_name": "Bold Monday",
                "tone_funny_pct": 35,
                "tone_emotion_pct": 65,
                "prompt_keywords": ["confidence", "ambition", "energy", "momentum"],
                "color_palette": ["#1D3557", "#457B9D", "#A8DADC"],
                "visual_style": "modern geometric poster",
                "instagram_hashtags": ["#BoldMonday", "#StartStrong", "#digitaldesign"],
                "active": True,
            },
            {
                "rotation_month": 2,
                "day_of_week": "tuesday",
                "theme_name": "Kindness Tuesday",
                "tone_funny_pct": 20,
                "tone_emotion_pct": 80,
                "prompt_keywords": ["compassion", "gentle", "support", "encouragement"],
                "color_palette": ["#E5989B", "#FFCAD4", "#FFF1E6"],
                "visual_style": "soft pastel illustration",
                "instagram_hashtags": ["#KindnessTuesday", "#GentleWords", "#ecards"],
                "active": True,
            },
            {
                "rotation_month": 2,
                "day_of_week": "wednesday",
                "theme_name": "Witty Wednesday",
                "tone_funny_pct": 70,
                "tone_emotion_pct": 30,
                "prompt_keywords": ["snarky", "banter", "office humor", "lighthearted"],
                "color_palette": ["#F72585", "#B5179E", "#7209B7"],
                "visual_style": "comic strip collage",
                "instagram_hashtags": ["#WittyWednesday", "#WorkHumor", "#ecardmaker"],
                "active": True,
            },
            {
                "rotation_month": 2,
                "day_of_week": "thursday",
                "theme_name": "Culture Thursday",
                "tone_funny_pct": 25,
                "tone_emotion_pct": 75,
                "prompt_keywords": ["heritage", "craft", "storytelling", "community"],
                "color_palette": ["#9C6644", "#DDB892", "#E6CCB2"],
                "visual_style": "textured artisan print",
                "instagram_hashtags": ["#CultureThursday", "#StoryDrivenDesign", "#ecards"],
                "active": True,
            },
            {
                "rotation_month": 2,
                "day_of_week": "friday",
                "theme_name": "Party Friday",
                "tone_funny_pct": 65,
                "tone_emotion_pct": 35,
                "prompt_keywords": ["party", "sparkle", "weekend", "dance"],
                "color_palette": ["#F4D35E", "#EE964B", "#F95738"],
                "visual_style": "neon confetti illustration",
                "instagram_hashtags": ["#PartyFriday", "#WeekendSpark", "#funecards"],
                "active": True,
            },
            {
                "rotation_month": 2,
                "day_of_week": "saturday",
                "theme_name": "Adventure Saturday",
                "tone_funny_pct": 40,
                "tone_emotion_pct": 60,
                "prompt_keywords": ["travel", "explore", "sunrise", "escape"],
                "color_palette": ["#355070", "#6D597A", "#B56576"],
                "visual_style": "cinematic travel poster",
                "instagram_hashtags": ["#AdventureSaturday", "#WeekendEscape", "#travelcards"],
                "active": True,
            },
            {
                "rotation_month": 2,
                "day_of_week": "sunday",
                "theme_name": "Soulful Sunday",
                "tone_funny_pct": 10,
                "tone_emotion_pct": 90,
                "prompt_keywords": ["reflection", "peace", "gratitude", "slow living"],
                "color_palette": ["#52796F", "#84A98C", "#CAD2C5"],
                "visual_style": "serene botanical illustration",
                "instagram_hashtags": ["#SoulfulSunday", "#SlowSunday", "#heartfeltdesign"],
                "active": True,
            },
            {
                "rotation_month": 3,
                "day_of_week": "monday",
                "theme_name": "Momentum Monday",
                "tone_funny_pct": 45,
                "tone_emotion_pct": 55,
                "prompt_keywords": ["progress", "focus", "clarity", "drive"],
                "color_palette": ["#003049", "#669BBC", "#FDF0D5"],
                "visual_style": "sleek minimal poster",
                "instagram_hashtags": ["#MomentumMonday", "#FreshEnergy", "#carddesign"],
                "active": True,
            },
            {
                "rotation_month": 3,
                "day_of_week": "tuesday",
                "theme_name": "Community Tuesday",
                "tone_funny_pct": 20,
                "tone_emotion_pct": 80,
                "prompt_keywords": ["belonging", "support", "teamwork", "connection"],
                "color_palette": ["#2A9D8F", "#8AB17D", "#E9C46A"],
                "visual_style": "friendly editorial illustration",
                "instagram_hashtags": ["#CommunityTuesday", "#BetterTogether", "#ecards"],
                "active": True,
            },
            {
                "rotation_month": 3,
                "day_of_week": "wednesday",
                "theme_name": "Wildcard Wednesday",
                "tone_funny_pct": 75,
                "tone_emotion_pct": 25,
                "prompt_keywords": ["surprise", "quirky", "unexpected", "fun"],
                "color_palette": ["#8338EC", "#3A86FF", "#FFBE0B"],
                "visual_style": "maximalist mixed media",
                "instagram_hashtags": ["#WildcardWednesday", "#QuirkyCards", "#digitalcreative"],
                "active": True,
            },
            {
                "rotation_month": 3,
                "day_of_week": "thursday",
                "theme_name": "Thoughtful Thursday",
                "tone_funny_pct": 20,
                "tone_emotion_pct": 80,
                "prompt_keywords": ["reflection", "deep feeling", "care", "personal note"],
                "color_palette": ["#6C757D", "#ADB5BD", "#F8F9FA"],
                "visual_style": "monochrome letterpress",
                "instagram_hashtags": ["#ThoughtfulThursday", "#MeaningfulMessages", "#cards"],
                "active": True,
            },
            {
                "rotation_month": 3,
                "day_of_week": "friday",
                "theme_name": "Flashback Friday",
                "tone_funny_pct": 55,
                "tone_emotion_pct": 45,
                "prompt_keywords": ["retro fun", "memory lane", "nostalgia", "inside jokes"],
                "color_palette": ["#E76F51", "#F4A261", "#E9C46A"],
                "visual_style": "vintage polaroid montage",
                "instagram_hashtags": ["#FlashbackFriday", "#NostalgiaCards", "#creativecards"],
                "active": True,
            },
            {
                "rotation_month": 3,
                "day_of_week": "saturday",
                "theme_name": "Celebration Saturday",
                "tone_funny_pct": 50,
                "tone_emotion_pct": 50,
                "prompt_keywords": ["celebrate", "cake", "confetti", "milestone"],
                "color_palette": ["#FF477E", "#FF85A1", "#FBB1BD"],
                "visual_style": "festive hand-lettering",
                "instagram_hashtags": ["#CelebrationSaturday", "#PartyCards", "#ecardfactory"],
                "active": True,
            },
            {
                "rotation_month": 3,
                "day_of_week": "sunday",
                "theme_name": "Reset Sunday",
                "tone_funny_pct": 20,
                "tone_emotion_pct": 80,
                "prompt_keywords": ["reset", "renewal", "slow morning", "clarity"],
                "color_palette": ["#CDB4DB", "#FFC8DD", "#BDE0FE"],
                "visual_style": "airy pastel editorial",
                "instagram_hashtags": ["#ResetSunday", "#GentleWeekend", "#digitalcards"],
                "active": True,
            },
        ],
    )


def downgrade() -> None:
    """Remove the seeded weekly theme rotations."""

    op.execute(
        sa.text(
            f"""
            DELETE FROM {SCHEMA}.weekly_themes
            WHERE rotation_month IN (1, 2, 3)
            """
        )
    )
