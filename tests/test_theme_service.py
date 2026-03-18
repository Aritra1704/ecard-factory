"""Unit tests for Theme Factory resolution precedence."""

from __future__ import annotations

from datetime import date
import importlib
import sys


def reload_theme_factory_modules():
    """Reload Theme Factory modules so each test sees a fresh import graph."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database"}
            or module_name.startswith("app.schemas")
            or module_name.startswith("app.services")
        ):
            sys.modules.pop(module_name, None)

    service_module = importlib.import_module("app.services.theme_service")
    schemas_module = importlib.import_module("app.schemas.theme_factory")
    return service_module, schemas_module


def _build_theme(schemas_module, *, theme_id: int, theme_key: str, theme_name: str, priority: int, theme_type: str = "evergreen"):
    return schemas_module.ThemeCatalogResponse(
        id=theme_id,
        theme_key=theme_key,
        theme_name=theme_name,
        description=None,
        theme_bucket="occasion" if theme_type != "evergreen" else "everyday",
        theme_type=theme_type,
        cultural_context="global",
        tone_style="conversational",
        default_funny_pct=20,
        default_emotion_pct=80,
        default_audience="general audience",
        default_visual_style="minimal",
        is_active=True,
        priority=priority,
    )


def _build_schedule(
    schemas_module,
    *,
    schedule_id: int,
    theme_id: int,
    theme_key: str,
    theme_name: str,
    schedule_type: str,
    priority: int,
    start_date: date | None = None,
    end_date: date | None = None,
    weekday_mask: list[str] | None = None,
):
    return schemas_module.ThemeScheduleResponse(
        id=schedule_id,
        theme_id=theme_id,
        theme_key=theme_key,
        theme_name=theme_name,
        schedule_type=schedule_type,
        start_date=start_date,
        end_date=end_date,
        weekday_mask=list(weekday_mask or []),
        month_mask=[],
        region=None,
        country=None,
        is_active=True,
        priority=priority,
        notes=None,
    )


def test_today_theme_prefers_weekly_theme_over_long_date_range_campaign(configured_env: dict[str, str]) -> None:
    """Month-long campaigns should not override the everyday weekday theme."""

    service_module, schemas_module = reload_theme_factory_modules()
    service = service_module.ThemeService()
    state = service_module._ThemeFactoryState(
        catalog=[
            _build_theme(
                schemas_module,
                theme_id=1,
                theme_key="motivation-monday",
                theme_name="Motivation Monday",
                priority=90,
            ),
            _build_theme(
                schemas_module,
                theme_id=2,
                theme_key="ramadan-month",
                theme_name="Ramadan Month",
                priority=96,
                theme_type="calendar",
            ),
        ],
        schedules=[
            _build_schedule(
                schemas_module,
                schedule_id=11,
                theme_id=1,
                theme_key="motivation-monday",
                theme_name="Motivation Monday",
                schedule_type="weekly_recurring",
                weekday_mask=["monday"],
                priority=90,
            ),
            _build_schedule(
                schemas_module,
                schedule_id=22,
                theme_id=2,
                theme_key="ramadan-month",
                theme_name="Ramadan Month",
                schedule_type="date_range",
                start_date=date(2026, 2, 18),
                end_date=date(2026, 3, 19),
                priority=96,
            ),
        ],
        overrides=[],
        source="test",
    )

    resolved = service._resolve_for_date(
        plan_date=date(2026, 3, 16),
        state=state,
        region=None,
        country=None,
    )

    assert resolved.theme is not None
    assert resolved.theme.theme_name == "Motivation Monday"
    assert resolved.schedule_type == "weekly_recurring"


def test_today_theme_keeps_short_campaign_week_ahead_of_weekly_theme(configured_env: dict[str, str]) -> None:
    """Week-long campaigns should still override the regular weekday theme."""

    service_module, schemas_module = reload_theme_factory_modules()
    service = service_module.ThemeService()
    state = service_module._ThemeFactoryState(
        catalog=[
            _build_theme(
                schemas_module,
                theme_id=1,
                theme_key="gratitude-tuesday",
                theme_name="Gratitude Tuesday",
                priority=88,
            ),
            _build_theme(
                schemas_module,
                theme_id=2,
                theme_key="holi-week",
                theme_name="Holi Week",
                priority=94,
                theme_type="campaign",
            ),
        ],
        schedules=[
            _build_schedule(
                schemas_module,
                schedule_id=33,
                theme_id=1,
                theme_key="gratitude-tuesday",
                theme_name="Gratitude Tuesday",
                schedule_type="weekly_recurring",
                weekday_mask=["tuesday"],
                priority=88,
            ),
            _build_schedule(
                schemas_module,
                schedule_id=44,
                theme_id=2,
                theme_key="holi-week",
                theme_name="Holi Week",
                schedule_type="date_range",
                start_date=date(2026, 3, 9),
                end_date=date(2026, 3, 15),
                priority=94,
            ),
        ],
        overrides=[],
        source="test",
    )

    resolved = service._resolve_for_date(
        plan_date=date(2026, 3, 10),
        state=state,
        region=None,
        country=None,
    )

    assert resolved.theme is not None
    assert resolved.theme.theme_name == "Holi Week"
    assert resolved.schedule_type == "date_range"
