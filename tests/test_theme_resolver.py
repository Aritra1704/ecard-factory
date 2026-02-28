"""Async unit tests for the theme resolver service."""

from __future__ import annotations

from datetime import date, datetime
from types import SimpleNamespace
from unittest.mock import AsyncMock
import importlib
import sys
from zoneinfo import ZoneInfo

import pytest
from sqlalchemy.ext.asyncio import AsyncSession


class ScalarOneOrNoneResult:
    """Minimal async-result stub that provides scalar_one_or_none()."""

    def __init__(self, value):
        self.value = value

    def scalar_one_or_none(self):
        return self.value


def reload_theme_service_module():
    """Reload the resolver module so each test sees fresh app state."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database"}
            or module_name.startswith("app.models")
            or module_name.startswith("app.services")
        ):
            sys.modules.pop(module_name, None)

    return importlib.import_module("app.services.theme_resolver")


@pytest.mark.asyncio
async def test_resolve_today_uses_weekly_source_when_no_override(
    configured_env: dict[str, str],
) -> None:
    """Weekly themes should be used when no override applies for the day."""

    service_module = reload_theme_service_module()
    resolver = service_module.ThemeResolver(
        now_provider=lambda: datetime(2026, 1, 5, 8, 0, tzinfo=ZoneInfo("Asia/Kolkata"))
    )
    session = AsyncMock(spec=AsyncSession)
    weekly_theme = SimpleNamespace(
        id=11,
        theme_name="Motivation Monday",
        tone_funny_pct=30,
        tone_emotion_pct=70,
        prompt_keywords=["fresh start", "uplift"],
        color_palette=["#2F6BFF", "#F1FAEE"],
        visual_style="clean editorial illustration",
        instagram_hashtags=["#MotivationMonday"],
    )
    session.execute = AsyncMock(
        side_effect=[
            ScalarOneOrNoneResult(None),
            ScalarOneOrNoneResult(weekly_theme),
            object(),
        ]
    )
    session.commit = AsyncMock()

    resolved = await resolver.resolve_today(session)

    assert resolved["source"] == "weekly"
    assert resolved == {
        "theme_name": "Motivation Monday",
        "source": "weekly",
        "tone_funny_pct": 30,
        "tone_emotion_pct": 70,
        "prompt_keywords": ["fresh start", "uplift"],
        "color_palette": ["#2F6BFF", "#F1FAEE"],
        "visual_style": "clean editorial illustration",
        "instagram_hashtags": ["#MotivationMonday"],
        "plan_date": "2026-01-05",
    }


@pytest.mark.asyncio
async def test_resolve_today_uses_override_source_when_override_exists(
    configured_env: dict[str, str],
) -> None:
    """Overrides should win before any weekly theme lookup occurs."""

    service_module = reload_theme_service_module()
    resolver = service_module.ThemeResolver(
        now_provider=lambda: datetime(2026, 1, 5, 8, 0, tzinfo=ZoneInfo("Asia/Kolkata"))
    )
    session = AsyncMock(spec=AsyncSession)
    override = SimpleNamespace(
        id=22,
        theme_name="Festival Override",
        tone_funny_pct=25,
        tone_emotion_pct=75,
        prompt_keywords=["festival", "warmth"],
        color_palette=["#FFD166"],
        visual_style="festive lettering",
        instagram_hashtags=["#FestivalMode"],
    )
    session.execute = AsyncMock(
        side_effect=[
            ScalarOneOrNoneResult(override),
            object(),
        ]
    )
    session.commit = AsyncMock()

    resolved = await resolver.resolve_today(session)

    assert resolved["source"] == "override"
    assert resolved["theme_name"] == "Festival Override"
    assert session.execute.await_count == 2


@pytest.mark.asyncio
async def test_resolve_today_uses_fallback_when_no_theme_data(
    configured_env: dict[str, str],
) -> None:
    """Fallback data should be returned when neither source produces a theme."""

    service_module = reload_theme_service_module()
    resolver = service_module.ThemeResolver(
        now_provider=lambda: datetime(2026, 2, 3, 8, 0, tzinfo=ZoneInfo("Asia/Kolkata"))
    )
    session = AsyncMock(spec=AsyncSession)
    session.execute = AsyncMock(
        side_effect=[
            ScalarOneOrNoneResult(None),
            ScalarOneOrNoneResult(None),
            object(),
        ]
    )
    session.commit = AsyncMock()

    resolved = await resolver.resolve_today(session)

    assert resolved == {
        "theme_name": "Relatable / Everyday",
        "source": "fallback",
        "tone_funny_pct": 70,
        "tone_emotion_pct": 30,
        "prompt_keywords": [],
        "color_palette": [],
        "visual_style": "",
        "instagram_hashtags": [],
        "plan_date": "2026-02-03",
    }


def test_rotation_month_matches_explicit_formula(
    configured_env: dict[str, str],
) -> None:
    """Rotation month should follow the explicit ((month - 1) % 9) + 1 formula."""

    service_module = reload_theme_service_module()
    resolver = service_module.ThemeResolver()

    assert resolver.get_rotation_month(1) == 1
    assert resolver.get_rotation_month(4) == 4
    assert resolver.get_rotation_month(10) == 1


@pytest.mark.asyncio
async def test_resolve_today_is_idempotent_for_same_day(
    configured_env: dict[str, str],
) -> None:
    """Running the resolver twice on the same day should not create duplicates."""

    service_module = reload_theme_service_module()
    resolver = service_module.ThemeResolver(
        now_provider=lambda: datetime(2026, 1, 5, 8, 0, tzinfo=ZoneInfo("Asia/Kolkata"))
    )
    session = AsyncMock(spec=AsyncSession)
    stored_rows: dict[date, dict[str, object]] = {}
    weekly_theme = SimpleNamespace(
        id=11,
        theme_name="Motivation Monday",
        tone_funny_pct=30,
        tone_emotion_pct=70,
        prompt_keywords=["fresh start"],
        color_palette=["#2F6BFF"],
        visual_style="clean editorial illustration",
        instagram_hashtags=["#MotivationMonday"],
    )

    async def execute_side_effect(statement):
        entity = None
        if hasattr(statement, "column_descriptions") and statement.column_descriptions:
            entity = statement.column_descriptions[0].get("entity")

        if entity is not None and entity.__name__ == "ThemeOverride":
            return ScalarOneOrNoneResult(None)

        if entity is not None and entity.__name__ == "WeeklyTheme":
            return ScalarOneOrNoneResult(weekly_theme)

        if getattr(statement, "table", None) is not None and statement.table.name == "daily_content_plan":
            values = {
                getattr(key, "name", str(key)): getattr(value, "value", value)
                for key, value in statement._values.items()
            }
            stored_rows[values["plan_date"]] = values
            return object()

        return object()

    session.execute = AsyncMock(side_effect=execute_side_effect)
    session.commit = AsyncMock()

    first = await resolver.resolve_today(session)
    second = await resolver.resolve_today(session)

    assert first == second
    assert len(stored_rows) == 1
    assert date(2026, 1, 5) in stored_rows
