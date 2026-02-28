"""Theme resolution service for selecting and storing the daily content theme."""

from __future__ import annotations

from collections.abc import Callable
from dataclasses import dataclass
from datetime import date, datetime
import logging
from typing import Any
from zoneinfo import ZoneInfo

from sqlalchemy import or_, select
from sqlalchemy.dialects.postgresql import insert
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.daily_plan import DailyContentPlan
from app.models.theme import ThemeOverride, WeeklyTheme

logger = logging.getLogger(__name__)

KOLKATA_TZ = ZoneInfo("Asia/Kolkata")
WEEKDAY_NAMES = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]

FALLBACK_THEME = {
    "theme_name": "Relatable / Everyday",
    "source": "fallback",
    "tone_funny_pct": 70,
    "tone_emotion_pct": 30,
    "prompt_keywords": [],
    "color_palette": [],
    "visual_style": "",
    "instagram_hashtags": [],
}


@dataclass(slots=True)
class ThemeResolver:
    """Resolve today's theme using overrides, weekly rotation, or a fallback."""

    now_provider: Callable[[], datetime] | None = None

    def _get_now(self) -> datetime:
        """Return the current timezone-aware datetime in Asia/Kolkata."""

        if self.now_provider is not None:
            return self.now_provider()

        return datetime.now(tz=KOLKATA_TZ)

    @staticmethod
    def get_weekday_index(target_date: date) -> int:
        """Return the weekday index where Monday is 0 and Sunday is 6."""

        return target_date.weekday()

    @staticmethod
    def get_weekday_name(target_date: date) -> str:
        """Return the lowercase weekday name for compatibility with seeded data."""

        return WEEKDAY_NAMES[target_date.weekday()]

    @staticmethod
    def get_rotation_month(current_month: int) -> int:
        """Return the rotation value using the explicit month formula provided."""

        return ((current_month - 1) % 9) + 1

    async def resolve_today(self, session: AsyncSession) -> dict[str, Any]:
        """Resolve today's theme and upsert it into the daily content plan table."""

        today = self._get_now().astimezone(KOLKATA_TZ).date()

        override = await self._get_override(session=session, today=today)
        if override is not None:
            resolved = self._build_resolved_theme(
                source="override",
                plan_date=today,
                theme_name=override.theme_name,
                tone_funny_pct=override.tone_funny_pct,
                tone_emotion_pct=override.tone_emotion_pct,
                prompt_keywords=override.prompt_keywords,
                color_palette=override.color_palette,
                visual_style=override.visual_style,
                instagram_hashtags=override.instagram_hashtags,
                override_id=override.id,
                weekly_theme_id=None,
            )
            logger.info("Theme resolver selected override source")
            await self._upsert_daily_plan(session=session, resolved=resolved)
            return self._to_response(resolved=resolved)

        weekly_theme = await self._get_weekly_theme(session=session, today=today)
        if weekly_theme is not None:
            resolved = self._build_resolved_theme(
                source="weekly",
                plan_date=today,
                theme_name=weekly_theme.theme_name,
                tone_funny_pct=weekly_theme.tone_funny_pct,
                tone_emotion_pct=weekly_theme.tone_emotion_pct,
                prompt_keywords=weekly_theme.prompt_keywords,
                color_palette=weekly_theme.color_palette,
                visual_style=weekly_theme.visual_style,
                instagram_hashtags=weekly_theme.instagram_hashtags,
                override_id=None,
                weekly_theme_id=weekly_theme.id,
            )
            logger.info("Theme resolver selected weekly source")
            await self._upsert_daily_plan(session=session, resolved=resolved)
            return self._to_response(resolved=resolved)

        resolved = {
            **FALLBACK_THEME,
            "plan_date": today,
            "override_id": None,
            "weekly_theme_id": None,
        }
        logger.info("Theme resolver selected fallback source")
        await self._upsert_daily_plan(session=session, resolved=resolved)
        return self._to_response(resolved=resolved)

    async def _get_override(
        self,
        *,
        session: AsyncSession,
        today: date,
    ) -> ThemeOverride | None:
        """Return the highest-priority active override for the current day."""

        statement = (
            select(ThemeOverride)
            .where(
                ThemeOverride.active.is_(True),
                ThemeOverride.start_date <= today,
                ThemeOverride.end_date >= today,
            )
            .order_by(ThemeOverride.priority.desc())
            .limit(1)
        )
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    async def _get_weekly_theme(
        self,
        *,
        session: AsyncSession,
        today: date,
    ) -> WeeklyTheme | None:
        """Return the active weekly theme for the current weekday and rotation."""

        weekday_index = self.get_weekday_index(today)
        weekday_name = self.get_weekday_name(today)
        rotation_month = self.get_rotation_month(today.month)

        # The prompt specifies Monday=0 weekday matching. The current seeded data
        # stores weekday names, so the query accepts both numeric-string and name
        # values to remain compatible with existing rows.
        statement = (
            select(WeeklyTheme)
            .where(
                WeeklyTheme.active.is_(True),
                WeeklyTheme.rotation_month == rotation_month,
                or_(
                    WeeklyTheme.day_of_week == str(weekday_index),
                    WeeklyTheme.day_of_week == weekday_name,
                ),
            )
            .limit(1)
        )
        result = await session.execute(statement)
        return result.scalar_one_or_none()

    def _build_resolved_theme(
        self,
        *,
        source: str,
        plan_date: date,
        theme_name: str,
        tone_funny_pct: int,
        tone_emotion_pct: int,
        prompt_keywords: list[str] | None,
        color_palette: list[str] | None,
        visual_style: str | None,
        instagram_hashtags: list[str] | None,
        override_id: int | None,
        weekly_theme_id: int | None,
    ) -> dict[str, Any]:
        """Normalize a selected source into a single internal payload."""

        return {
            "theme_name": theme_name,
            "source": source,
            "tone_funny_pct": tone_funny_pct,
            "tone_emotion_pct": tone_emotion_pct,
            "prompt_keywords": list(prompt_keywords or []),
            "color_palette": list(color_palette or []),
            "visual_style": visual_style or "",
            "instagram_hashtags": list(instagram_hashtags or []),
            "plan_date": plan_date,
            "override_id": override_id,
            "weekly_theme_id": weekly_theme_id,
        }

    async def _upsert_daily_plan(
        self,
        *,
        session: AsyncSession,
        resolved: dict[str, Any],
    ) -> None:
        """Insert or update the daily plan row so repeated runs stay idempotent."""

        statement = insert(DailyContentPlan).values(
            plan_date=resolved["plan_date"],
            theme_name=resolved["theme_name"],
            source=resolved["source"],
            override_id=resolved["override_id"],
            weekly_theme_id=resolved["weekly_theme_id"],
            tone_funny_pct=resolved["tone_funny_pct"],
            tone_emotion_pct=resolved["tone_emotion_pct"],
            prompt_keywords=resolved["prompt_keywords"],
            color_palette=resolved["color_palette"],
            status="resolved",
        )
        statement = statement.on_conflict_do_update(
            index_elements=[DailyContentPlan.plan_date],
            set_={
                "theme_name": resolved["theme_name"],
                "source": resolved["source"],
                "override_id": resolved["override_id"],
                "weekly_theme_id": resolved["weekly_theme_id"],
                "tone_funny_pct": resolved["tone_funny_pct"],
                "tone_emotion_pct": resolved["tone_emotion_pct"],
                "prompt_keywords": resolved["prompt_keywords"],
                "color_palette": resolved["color_palette"],
                "status": "resolved",
            },
        )
        await session.execute(statement)
        await session.commit()

    def _to_response(self, *, resolved: dict[str, Any]) -> dict[str, Any]:
        """Return the exact public response contract required by callers."""

        return {
            "theme_name": resolved["theme_name"],
            "source": resolved["source"],
            "tone_funny_pct": resolved["tone_funny_pct"],
            "tone_emotion_pct": resolved["tone_emotion_pct"],
            "prompt_keywords": list(resolved["prompt_keywords"]),
            "color_palette": list(resolved["color_palette"]),
            "visual_style": resolved["visual_style"],
            "instagram_hashtags": list(resolved["instagram_hashtags"]),
            "plan_date": resolved["plan_date"].isoformat(),
        }
