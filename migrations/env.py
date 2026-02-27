"""Alembic environment configuration for async SQLAlchemy migrations."""

from __future__ import annotations

import asyncio
import os
from logging.config import fileConfig
from typing import Any

from alembic import context
from sqlalchemy import Connection, pool, text
from sqlalchemy.ext.asyncio import async_engine_from_config

# Alembic only needs database configuration, but the shared settings object
# requires all application secrets. Placeholder values let migrations run in
# isolated environments without forcing unrelated credentials to be present.
ENV_DEFAULTS = {
    "DATABASE_URL": "postgresql+asyncpg://postgres:postgres@localhost:5432/ecard_factory",
    "OPENAI_API_KEY": "alembic-placeholder-openai",
    "GROQ_API_KEY": "alembic-placeholder-groq",
    "TELEGRAM_BOT_TOKEN": "alembic-placeholder-telegram",
    "TELEGRAM_CHAT_ID": "alembic-placeholder-chat",
    "CANVA_CLIENT_ID": "alembic-placeholder-canva-id",
    "CANVA_CLIENT_SECRET": "alembic-placeholder-canva-secret",
}

for key, value in ENV_DEFAULTS.items():
    os.environ.setdefault(key, value)

from app.config import settings
from app.database import Base, get_async_database_url
import app.models  # noqa: F401

config = context.config

if config.config_file_name is not None:
    fileConfig(config.config_file_name)

ASYNC_DATABASE_URL = get_async_database_url()
config.set_main_option("sqlalchemy.url", ASYNC_DATABASE_URL)

target_metadata = Base.metadata


def get_context_options() -> dict[str, Any]:
    """Return the shared Alembic configuration used in both execution modes."""

    return {
        "target_metadata": target_metadata,
        "include_schemas": True,
        "version_table_schema": settings.db_schema,
        "compare_type": True,
        "compare_server_default": True,
    }


def do_run_migrations(connection: Connection) -> None:
    """Configure Alembic with the active connection and run migrations once."""

    context.configure(connection=connection, **get_context_options())

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_offline() -> None:
    """Run migrations in offline mode using the configured database URL."""

    context.configure(
        url=ASYNC_DATABASE_URL,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        **get_context_options(),
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Run migrations in online mode using SQLAlchemy's async engine."""

    section = config.get_section(config.config_ini_section, {})
    section["sqlalchemy.url"] = ASYNC_DATABASE_URL

    connect_args: dict[str, dict[str, str]] = {}
    if ASYNC_DATABASE_URL.startswith("postgresql+asyncpg://"):
        connect_args = {"server_settings": {"search_path": settings.db_schema}}

    connectable = async_engine_from_config(
        section,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        connect_args=connect_args,
    )

    safe_schema_name = settings.db_schema.replace('"', '""')

    async with connectable.connect() as connection:
        await connection.execute(text(f'CREATE SCHEMA IF NOT EXISTS "{safe_schema_name}"'))
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
