"""Fixtures and collection controls for real integration tests."""

from __future__ import annotations

import os

import pytest
import pytest_asyncio
from sqlalchemy.ext.asyncio import AsyncSession, async_sessionmaker, create_async_engine


def _env_flag(name: str, default: str = "false") -> bool:
    """Parse a boolean environment toggle from common truthy string values."""

    return os.getenv(name, default).strip().lower() in {"1", "true", "yes", "on"}


def pytest_collection_modifyitems(config: pytest.Config, items: list[pytest.Item]) -> None:
    """Mark integration tests and skip them unless explicitly enabled."""

    enabled = _env_flag("INTEGRATION_TESTS", "false")
    skip_marker = pytest.mark.skip(reason="Integration tests disabled. Set INTEGRATION_TESTS=true to run.")

    for item in items:
        item.add_marker(pytest.mark.integration)
        if not enabled:
            item.add_marker(skip_marker)


@pytest_asyncio.fixture
async def real_db_session() -> AsyncSession:
    """Yield a real async database session using the configured Railway URL."""

    from app.config import settings

    database_url = settings.railway_database_url or settings.database_url
    async_url = database_url
    if async_url.startswith("postgresql://"):
        async_url = async_url.replace("postgresql://", "postgresql+asyncpg://", 1)
    elif async_url.startswith("postgres://"):
        async_url = async_url.replace("postgres://", "postgresql+asyncpg://", 1)

    engine = create_async_engine(
        async_url,
        connect_args={"server_settings": {"search_path": settings.db_schema}},
        pool_pre_ping=True,
    )
    session_factory = async_sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)

    async with session_factory() as session:
        yield session

    await engine.dispose()
