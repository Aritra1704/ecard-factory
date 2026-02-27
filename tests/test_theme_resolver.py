"""Async unit tests for the theme resolver service and theme endpoints."""

from __future__ import annotations

from datetime import date, datetime
from types import SimpleNamespace
from unittest.mock import AsyncMock
import importlib
import sys
from zoneinfo import ZoneInfo

import pytest
from fastapi.testclient import TestClient
from sqlalchemy.ext.asyncio import AsyncSession


class ScalarOneOrNoneResult:
    """Minimal async-result stub that mimics SQLAlchemy scalar_one_or_none()."""

    def __init__(self, value):
        self.value = value

    def scalar_one_or_none(self):
        return self.value


class ScalarsListResult:
    """Minimal async-result stub that mimics SQLAlchemy scalars().all()."""

    def __init__(self, values):
        self.values = values

    def scalars(self):
        return self

    def all(self):
        return self.values


def reload_theme_modules():
    """Reload app modules so tests pick up fresh environment and patches."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database", "app.main"}
            or module_name.startswith("app.models")
            or module_name.startswith("app.routers")
            or module_name.startswith("app.schemas")
            or module_name.startswith("app.services")
        ):
            sys.modules.pop(module_name, None)

    service_module = importlib.import_module("app.services.theme_resolver")
    main_module = importlib.import_module("app.main")
    models_module = importlib.import_module("app.models")
    return service_module, main_module, models_module


@pytest.mark.asyncio
async def test_resolve_today_returns_correct_keys_and_uses_weekly_source(
    configured_env: dict[str, str],
) -> None:
    """The resolver should return the exact response contract when weekly data is used."""

    service_module, _, _ = reload_theme_modules()
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
async def test_resolve_today_prefers_override_when_active(
    configured_env: dict[str, str],
) -> None:
    """An active override should win before the weekly rotation is consulted."""

    service_module, _, _ = reload_theme_modules()
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
    """The resolver should fall back to a hardcoded default when no data exists."""

    service_module, _, _ = reload_theme_modules()
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

    assert resolved["source"] == "fallback"
    assert resolved["theme_name"] == "Relatable / Everyday"
    assert resolved["prompt_keywords"] == []
    assert resolved["color_palette"] == []


def test_rotation_month_calculation_is_correct_for_all_12_months(
    configured_env: dict[str, str],
) -> None:
    """Rotation buckets should repeat in three seeded quarters across the year."""

    service_module, _, _ = reload_theme_modules()
    resolver = service_module.ThemeResolver()

    expected = {
        1: 1,
        2: 1,
        3: 1,
        4: 2,
        5: 2,
        6: 2,
        7: 3,
        8: 3,
        9: 3,
        10: 1,
        11: 1,
        12: 1,
    }

    for month, rotation in expected.items():
        assert resolver.get_rotation_month(month) == rotation


def test_day_of_week_mapping_matches_python_weekday_numbers(
    configured_env: dict[str, str],
) -> None:
    """Weekday names should map Monday=0 through Sunday=6 exactly once."""

    service_module, _, _ = reload_theme_modules()
    resolver = service_module.ThemeResolver()
    dates_and_names = {
        date(2026, 1, 5): "monday",
        date(2026, 1, 6): "tuesday",
        date(2026, 1, 7): "wednesday",
        date(2026, 1, 8): "thursday",
        date(2026, 1, 9): "friday",
        date(2026, 1, 10): "saturday",
        date(2026, 1, 11): "sunday",
    }

    for target_date, name in dates_and_names.items():
        assert resolver.get_weekday_name(target_date) == name


@pytest.mark.asyncio
async def test_resolve_today_is_idempotent_for_same_day(
    configured_env: dict[str, str],
) -> None:
    """Repeated calls on the same day should upsert one logical daily plan row."""

    service_module, _, _ = reload_theme_modules()
    resolver = service_module.ThemeResolver(
        now_provider=lambda: datetime(2026, 1, 5, 8, 0, tzinfo=ZoneInfo("Asia/Kolkata"))
    )
    session = AsyncMock(spec=AsyncSession)
    stored_plans: dict[date, dict[str, object]] = {}
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
            stored_plans[values["plan_date"]] = values
            return object()

        return object()

    session.execute = AsyncMock(side_effect=execute_side_effect)
    session.commit = AsyncMock()

    first = await resolver.resolve_today(session)
    second = await resolver.resolve_today(session)

    assert first == second
    assert len(stored_plans) == 1
    assert date(2026, 1, 5) in stored_plans


def test_theme_today_endpoint_returns_200_with_correct_schema(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """The theme endpoint should validate and return the resolved theme schema."""

    _, main_module, _ = reload_theme_modules()
    theme_router_module = importlib.import_module("app.routers.theme")
    fake_session = AsyncMock(spec=AsyncSession)

    async def fake_init_database() -> None:
        return None

    async def fake_close_database() -> None:
        return None

    async def fake_get_db():
        yield fake_session

    async def fake_resolve_today(_self, _: AsyncSession):
        return {
            "theme_name": "Motivation Monday",
            "source": "weekly",
            "tone_funny_pct": 30,
            "tone_emotion_pct": 70,
            "prompt_keywords": ["fresh start"],
            "color_palette": ["#2F6BFF"],
            "visual_style": "clean editorial illustration",
            "instagram_hashtags": ["#MotivationMonday"],
            "plan_date": "2026-01-05",
        }

    monkeypatch.setattr(main_module, "init_database", fake_init_database)
    monkeypatch.setattr(main_module, "close_database", fake_close_database)
    monkeypatch.setattr(theme_router_module.ThemeResolver, "resolve_today", fake_resolve_today)
    main_module.app.dependency_overrides[theme_router_module.get_db] = fake_get_db

    with TestClient(main_module.app) as client:
        response = client.get("/theme/today")

    main_module.app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json() == {
        "theme_name": "Motivation Monday",
        "source": "weekly",
        "tone_funny_pct": 30,
        "tone_emotion_pct": 70,
        "prompt_keywords": ["fresh start"],
        "color_palette": ["#2F6BFF"],
        "visual_style": "clean editorial illustration",
        "instagram_hashtags": ["#MotivationMonday"],
        "plan_date": "2026-01-05",
    }


def test_theme_history_endpoint_returns_list(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """The history endpoint should return the most recent daily plan items."""

    _, main_module, models_module = reload_theme_modules()
    theme_router_module = importlib.import_module("app.routers.theme")
    fake_session = AsyncMock(spec=AsyncSession)

    async def fake_init_database() -> None:
        return None

    async def fake_close_database() -> None:
        return None

    async def fake_get_db():
        yield fake_session

    fake_session.execute = AsyncMock(
        return_value=ScalarsListResult(
            [
                models_module.DailyContentPlan(
                    plan_date=date(2026, 1, 5),
                    theme_name="Motivation Monday",
                    source="weekly",
                    tone_funny_pct=30,
                    tone_emotion_pct=70,
                    prompt_keywords=["fresh start"],
                    color_palette=["#2F6BFF"],
                    cards_generated=0,
                    status="resolved",
                )
            ]
        )
    )

    monkeypatch.setattr(main_module, "init_database", fake_init_database)
    monkeypatch.setattr(main_module, "close_database", fake_close_database)
    main_module.app.dependency_overrides[theme_router_module.get_db] = fake_get_db

    with TestClient(main_module.app) as client:
        response = client.get("/theme/history?limit=1")

    main_module.app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json() == [
        {
            "plan_date": "2026-01-05",
            "theme_name": "Motivation Monday",
            "source": "weekly",
            "tone_funny_pct": 30,
            "tone_emotion_pct": 70,
            "prompt_keywords": ["fresh start"],
            "color_palette": ["#2F6BFF"],
            "cards_generated": 0,
            "status": "resolved",
        }
    ]
