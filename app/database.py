"""Async SQLAlchemy database setup for the eCard Factory application.

The project uses a dedicated PostgreSQL schema so multiple applications can
share a single database instance without table-name collisions.
"""

from collections.abc import AsyncGenerator

from sqlalchemy import MetaData, text
from sqlalchemy.ext.asyncio import (
    AsyncEngine,
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
)
from sqlalchemy.orm import DeclarativeBase

from app.config import settings

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


async def close_database() -> None:
    """Dispose of pooled connections during application shutdown."""

    await engine.dispose()
