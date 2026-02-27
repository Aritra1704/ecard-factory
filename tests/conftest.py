"""Shared pytest fixtures for configuration-heavy application tests."""

from __future__ import annotations

import pytest

TEST_ENV_VARS = {
    "DATABASE_URL": "postgresql://local_user:local_pass@localhost:5432/ecard_factory",
    "RAILWAY_DATABASE_URL": "postgresql://railway_user:railway_pass@railway.internal:5432/ecard_factory",
    "OPENAI_API_KEY": "test-openai-key",
    "GROQ_API_KEY": "test-groq-key",
    "TELEGRAM_BOT_TOKEN": "test-telegram-token",
    "TELEGRAM_CHAT_ID": "123456789",
    "CANVA_CLIENT_ID": "test-canva-client-id",
    "CANVA_CLIENT_SECRET": "test-canva-client-secret",
    "APP_ENV": "development",
    "APP_PORT": "8000",
    "LOG_LEVEL": "info",
    "DB_SCHEMA": "ecard_factory",
}


@pytest.fixture
def configured_env(monkeypatch: pytest.MonkeyPatch) -> dict[str, str]:
    """Populate a complete environment for each test and return the values."""

    for key in TEST_ENV_VARS:
        monkeypatch.delenv(key, raising=False)

    for key, value in TEST_ENV_VARS.items():
        monkeypatch.setenv(key, value)

    return TEST_ENV_VARS.copy()
