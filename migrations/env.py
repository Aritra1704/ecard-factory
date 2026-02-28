"""Alembic environment configuration for async SQLAlchemy migrations."""

from __future__ import annotations

import asyncio
import os
from logging.config import fileConfig
from typing import Any

from alembic import context
from sqlalchemy import Connection, pool, text
from sqlalchemy.ext.asyncio import async_engine_from_config

ENV_DEFAULTS = {
    "DATABASE_URL": "postgresql+asyncpg://postgres:postgres@localhost:5432/railway",
    "OPENAI_API_KEY": "placeholder",
    "GROQ_API_KEY": "placeholder",
    "TELEGRAM_BOT_TOKEN": "placeholder",
    "TELEGRAM_CHAT_ID": "placeholder",
    "CANVA_CLIENT_ID": "placeholder",
    "CANVA_CLIENT_SECRET": "placeholder",
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
SCHEMA = settings.db_schema


def do_run_migrations(connection: Connection) -> None:
    context.configure(
        connection=connection,
        target_metadata=target_metadata,
        include_schemas=True,
        version_table_schema=SCHEMA,
        compare_type=True,
    )
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    section = config.get_section(config.config_ini_section, {})
    section["sqlalchemy.url"] = ASYNC_DATABASE_URL

    connect_args: dict[str, Any] = {}
    if ASYNC_DATABASE_URL.startswith("postgresql+asyncpg://"):
        connect_args = {"server_settings": {"search_path": SCHEMA}}

    connectable = async_engine_from_config(
        section,
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
        connect_args=connect_args,
    )

    async with connectable.connect() as connection:
        # Always create schema first - idempotent, safe on every run
        await connection.execute(
            text(f'CREATE SCHEMA IF NOT EXISTS "{SCHEMA}"')
        )
        await connection.commit()
        # Run migrations exactly once
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


def run_migrations_offline() -> None:
    context.configure(
        url=ASYNC_DATABASE_URL,
        target_metadata=target_metadata,
        literal_binds=True,
        include_schemas=True,
        version_table_schema=SCHEMA,
    )
    with context.begin_transaction():
        context.run_migrations()


# Entry point - exactly one execution path
if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())
