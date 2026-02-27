"""Alembic environment configuration for async SQLAlchemy migrations."""

from __future__ import annotations

import asyncio
import os
from logging.config import fileConfig

from alembic import context
from sqlalchemy import pool, text
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

config.set_main_option("sqlalchemy.url", get_async_database_url())

target_metadata = Base.metadata


def do_run_migrations(connection) -> None:
    """Configure Alembic with the current connection and run migrations."""

    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        include_schemas=True,
        version_table_schema=settings.db_schema,
        compare_type=True,
        compare_server_default=True,
    )

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_offline() -> None:
    """Run migrations in offline mode using the configured URL."""

    context.configure(
        url=get_async_database_url(),
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
        include_schemas=True,
        version_table_schema=settings.db_schema,
        compare_type=True,
        compare_server_default=True,
    )

    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Run migrations in online mode using SQLAlchemy's async engine."""

    configuration = config.get_section(config.config_ini_section, {})
    configuration["sqlalchemy.url"] = get_async_database_url()

    connect_args: dict[str, dict[str, str]] = {}
    if get_async_database_url().startswith("postgresql+asyncpg://"):
        connect_args = {"server_settings": {"search_path": settings.db_schema}}

    connectable = async_engine_from_config(
        configuration,
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
