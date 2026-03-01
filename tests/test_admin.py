"""Smoke tests for the server-rendered admin UI."""

from __future__ import annotations

import importlib
import sys

from fastapi.testclient import TestClient


def reload_admin_app_modules():
    """Reload the main app and admin router so monkeypatches apply cleanly."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database", "app.main"}
            or module_name.startswith("app.models")
            or module_name.startswith("app.routers")
            or module_name.startswith("app.schemas")
            or module_name.startswith("app.services")
        ):
            sys.modules.pop(module_name, None)

    main_module = importlib.import_module("app.main")
    admin_module = importlib.import_module("app.routers.admin")
    return main_module, admin_module


def test_admin_dashboard_returns_200(configured_env: dict[str, str], monkeypatch) -> None:
    """The admin dashboard page should render successfully."""

    main_module, admin_module = reload_admin_app_modules()

    async def override_get_db():
        yield object()

    async def fake_dashboard_context(db):
        return {
            "nav_items": [],
            "page_title": "Dashboard",
            "today_theme": {"theme_name": "Festival Glow", "source": "weekly", "plan_date": "2026-03-01", "prompt_keywords": []},
            "cards_generated_today": 2,
            "cards_pending_approval": 1,
            "total_cost_month": 1.23,
            "recent_cards": [],
            "n8n_trigger_url": "http://n8n:5678/webhook/daily-card-generation",
        }

    main_module.app.dependency_overrides[admin_module.get_db] = override_get_db
    monkeypatch.setattr(admin_module, "build_dashboard_context", fake_dashboard_context)

    try:
        with TestClient(main_module.app) as client:
            response = client.get("/admin/")
    finally:
        main_module.app.dependency_overrides.clear()

    assert response.status_code == 200


def test_admin_cards_returns_200(configured_env: dict[str, str], monkeypatch) -> None:
    """The admin cards listing page should render successfully."""

    main_module, admin_module = reload_admin_app_modules()

    async def override_get_db():
        yield object()

    async def fake_cards_context(db, status_filter):
        return {
            "nav_items": [],
            "page_title": "Cards",
            "cards": [],
            "status_filter": status_filter or "",
            "status_options": ["pending_phrase_approval", "published"],
        }

    main_module.app.dependency_overrides[admin_module.get_db] = override_get_db
    monkeypatch.setattr(admin_module, "build_cards_context", fake_cards_context)

    try:
        with TestClient(main_module.app) as client:
            response = client.get("/admin/cards")
    finally:
        main_module.app.dependency_overrides.clear()

    assert response.status_code == 200


def test_admin_themes_returns_200(configured_env: dict[str, str], monkeypatch) -> None:
    """The admin themes page should render successfully."""

    main_module, admin_module = reload_admin_app_modules()

    async def override_get_db():
        yield object()

    async def fake_themes_context(db):
        return {
            "nav_items": [],
            "page_title": "Themes",
            "weekly_themes": [],
            "today_theme": {"theme_name": "Festival Glow", "source": "weekly", "tone_funny_pct": 40, "tone_emotion_pct": 60},
            "upcoming_days": [],
            "overrides": [],
        }

    main_module.app.dependency_overrides[admin_module.get_db] = override_get_db
    monkeypatch.setattr(admin_module, "build_themes_context", fake_themes_context)

    try:
        with TestClient(main_module.app) as client:
            response = client.get("/admin/themes")
    finally:
        main_module.app.dependency_overrides.clear()

    assert response.status_code == 200
