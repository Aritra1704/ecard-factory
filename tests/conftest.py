"""Shared pytest fixtures for configuration-heavy application tests."""

from __future__ import annotations

from pathlib import Path
import tempfile

import pytest

TEST_ASSET_ROOT = str((Path(tempfile.gettempdir()) / "ecardfactory-test-assets").resolve())

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
    "AUTO_INIT_DB_ON_STARTUP": "false",
    "WORKFLOW_MEMORY_FALLBACK_ENABLED": "true",
    "ASSET_STORAGE_BACKEND": "filesystem",
    "ASSET_STORAGE_ROOT": TEST_ASSET_ROOT,
    "ASSET_PUBLIC_BASE_URL": "http://localhost:8080/assets",
}


@pytest.fixture
def configured_env(monkeypatch: pytest.MonkeyPatch) -> dict[str, str]:
    """Populate a complete environment for each test and return the values."""

    for key in TEST_ENV_VARS:
        monkeypatch.delenv(key, raising=False)

    for key, value in TEST_ENV_VARS.items():
        monkeypatch.setenv(key, value)

    return TEST_ENV_VARS.copy()
