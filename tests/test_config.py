"""Tests for environment-driven settings and database bootstrap objects."""

from __future__ import annotations

import importlib
import sys

from sqlalchemy.ext.asyncio import AsyncEngine


def reload_config_and_database() -> tuple[object, object]:
    """Reload config and database modules so each test sees fresh environment state."""

    for module_name in list(sys.modules):
        if module_name in {"app.config", "app.database"} or module_name.startswith("app.models"):
            sys.modules.pop(module_name, None)

    config_module = importlib.import_module("app.config")
    database_module = importlib.import_module("app.database")
    return config_module, database_module


def test_settings_loads_from_environment(configured_env: dict[str, str]) -> None:
    """The settings singleton should read values directly from the environment."""

    config_module, _ = reload_config_and_database()
    settings = config_module.settings

    assert settings.database_url == configured_env["DATABASE_URL"]
    assert settings.railway_database_url == configured_env["RAILWAY_DATABASE_URL"]
    assert settings.openai_api_key == configured_env["OPENAI_API_KEY"]
    assert settings.groq_api_key == configured_env["GROQ_API_KEY"]
    assert settings.telegram_bot_token == configured_env["TELEGRAM_BOT_TOKEN"]
    assert settings.telegram_chat_id == configured_env["TELEGRAM_CHAT_ID"]
    assert settings.canva_client_id == configured_env["CANVA_CLIENT_ID"]
    assert settings.canva_client_secret == configured_env["CANVA_CLIENT_SECRET"]
    assert settings.app_env == configured_env["APP_ENV"]
    assert settings.app_port == 8000
    assert settings.log_level == configured_env["LOG_LEVEL"]
    assert settings.db_schema == configured_env["DB_SCHEMA"]


def test_active_db_url_uses_database_url_outside_production(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Non-production environments should always use DATABASE_URL."""

    monkeypatch.setenv("APP_ENV", "development")
    config_module, _ = reload_config_and_database()

    assert config_module.settings.active_db_url == configured_env["DATABASE_URL"]


def test_active_db_url_uses_railway_url_in_production(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Production should prefer Railway's injected database URL when available."""

    monkeypatch.setenv("APP_ENV", "production")
    config_module, _ = reload_config_and_database()

    assert config_module.settings.active_db_url == configured_env["RAILWAY_DATABASE_URL"]


def test_active_db_url_falls_back_to_database_url_when_railway_is_missing(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Production should fall back cleanly when Railway does not inject a URL."""

    monkeypatch.setenv("APP_ENV", "production")
    monkeypatch.delenv("RAILWAY_DATABASE_URL", raising=False)
    config_module, _ = reload_config_and_database()

    assert config_module.settings.active_db_url == configured_env["DATABASE_URL"]


def test_database_engine_is_created_successfully(configured_env: dict[str, str]) -> None:
    """Importing the database module should create an async engine without connecting."""

    config_module, database_module = reload_config_and_database()
    expected_async_url = configured_env["DATABASE_URL"].replace(
        "postgresql://",
        "postgresql+asyncpg://",
        1,
    )

    assert isinstance(database_module.engine, AsyncEngine)
    assert config_module.settings.active_db_url == configured_env["DATABASE_URL"]
    assert database_module.get_async_database_url() == expected_async_url
    assert database_module.engine.sync_engine.url.render_as_string(hide_password=False) == expected_async_url
    assert database_module.Base.metadata.schema == configured_env["DB_SCHEMA"]
