"""Async SQLAlchemy database setup for the eCard Factory application.

The project uses a dedicated PostgreSQL schema so multiple applications can
share a single database instance without table-name collisions.
"""

import asyncio
from collections.abc import AsyncGenerator
import logging
from pathlib import Path

from sqlalchemy import MetaData, text
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

logger = logging.getLogger(__name__)
BASE_DIR = Path(__file__).resolve().parent.parent

# A naming convention keeps Alembic autogeneration stable and produces readable
# constraint names across development, CI, and production environments.
NAMING_CONVENTION = {
    "ix": "ix_%(column_0_label)s",
    "uq": "uq_%(table_name)s_%(column_0_name)s",
    "ck": "ck_%(table_name)s_%(constraint_name)s",
    "fk": "fk_%(table_name)s_%(column_0_name)s_%(referred_table_name)s",
    "pk": "pk_%(table_name)s",
}


# The shared metadata declares the default PostgreSQL schema so every model
# automatically lives inside `ecard_factory` unless explicitly overridden.
base_metadata = MetaData(schema=settings.db_schema, naming_convention=NAMING_CONVENTION)


class Base(DeclarativeBase):
    """Base declarative model that all ORM models should inherit from."""

    metadata = base_metadata


def get_async_database_url() -> str:
    """Return the configured database URL using the asyncpg SQLAlchemy driver."""

    url = settings.active_db_url

    if url.startswith("postgresql://"):
        return url.replace("postgresql://", "postgresql+asyncpg://", 1)

    if url.startswith("postgres://"):
        return url.replace("postgres://", "postgresql+asyncpg://", 1)

    return url


def _build_connect_args() -> dict[str, dict[str, str]]:
    """Return connection options needed to set PostgreSQL search_path.

    The asyncpg driver supports `server_settings`, which makes each connection
    default to the application schema without manual per-session SQL.
    """

    if get_async_database_url().startswith("postgresql+asyncpg://"):
        return {"server_settings": {"search_path": settings.db_schema}}

    return {}


# The engine is created once and shared across the process, but it does not
# establish a network connection until the application actually uses it.
engine: AsyncEngine = create_async_engine(
    get_async_database_url(),
    connect_args=_build_connect_args(),
    echo=settings.app_env.lower() == "development",
    pool_pre_ping=True,
)


# A dedicated async session factory gives each FastAPI request an isolated unit
# of work without leaking state across concurrent requests.
async_session_factory = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
    autoflush=False,
)


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """Yield one database session per request for use as a FastAPI dependency."""

    async with async_session_factory() as session:
        yield session


async def init_database() -> None:
    """Create the application schema if it doesn't exist.

    Table creation is handled exclusively by Alembic migrations.
    This function only ensures the schema namespace exists.
    """

    safe_schema_name = settings.db_schema.replace('"', '""')

    async with engine.begin() as connection:
        await connection.execute(
            text(f'CREATE SCHEMA IF NOT EXISTS "{safe_schema_name}"')
        )


async def _application_tables_exist() -> bool:
    """Return True when the core application tables already exist in the target schema."""

    required_tables = (
        "alembic_version",
        "events",
        "weekly_themes",
        "theme_overrides",
        "daily_content_plan",
        "cards",
        "llm_comparison_runs",
    )
    placeholders = ", ".join(f":table_{index}" for index, _ in enumerate(required_tables))
    params = {"schema_name": settings.db_schema}
    params.update({f"table_{index}": table_name for index, table_name in enumerate(required_tables)})

    async with engine.connect() as connection:
        result = await connection.execute(
            text(
                f"""
                SELECT COUNT(*)
                FROM information_schema.tables
                WHERE table_schema = :schema_name
                  AND table_name IN ({placeholders})
                """
            ),
            params,
        )
        existing_count = int(result.scalar_one())

    return existing_count == len(required_tables)


def _run_alembic_upgrade_head() -> None:
    """Run Alembic upgrades using the application's current environment configuration."""

    from alembic import command
    from alembic.config import Config

    alembic_config = Config(str(BASE_DIR / "alembic.ini"))
    command.upgrade(alembic_config, "head")


async def ensure_database_ready() -> None:
    """Create the schema and apply migrations automatically when the schema is still empty."""

    if not settings.auto_init_db_on_startup:
        logger.info("Automatic database initialization on startup is disabled.")
        return

    await init_database()

    if await _application_tables_exist():
        logger.info("Database schema '%s' already contains the required application tables.", settings.db_schema)
        return

    logger.info("Application tables missing in schema '%s'; running Alembic upgrade head.", settings.db_schema)
    await asyncio.to_thread(_run_alembic_upgrade_head)


async def close_database() -> None:
    """Dispose of pooled connections during application shutdown."""

    await engine.dispose()
