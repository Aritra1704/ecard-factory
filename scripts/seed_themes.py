#!/usr/bin/env python3
"""Reset and reseed Theme Factory catalog, schedule, and override tables."""

from __future__ import annotations

import asyncio
from pathlib import Path
import sys

from sqlalchemy import delete
from sqlalchemy.exc import ProgrammingError, SQLAlchemyError

REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from app.database import async_session_factory, close_database
from app.models.theme import CardThemeOverride, ThemeCatalog, ThemeSchedule
from app.schemas.theme_factory import ThemeOverrideCreate, ThemeScheduleCreate
from app.theme_factory_seed import THEME_SEED_OVERRIDES, THEME_SEED_SCHEDULES, THEME_SEED_THEMES


async def _seed_themes() -> int:
    async with async_session_factory() as session:
        try:
            await session.execute(delete(CardThemeOverride))
            await session.execute(delete(ThemeSchedule))
            await session.execute(delete(ThemeCatalog))
            await session.flush()
        except ProgrammingError:
            await session.rollback()
            print("Theme Factory tables are missing. Run ./venv/bin/alembic upgrade head first.", file=sys.stderr)
            return 1
        except SQLAlchemyError as exc:
            await session.rollback()
            print(f"Unable to reset theme data: {exc}", file=sys.stderr)
            return 1

        catalog_rows: dict[str, ThemeCatalog] = {}
        for payload in THEME_SEED_THEMES:
            row = ThemeCatalog(**payload)
            session.add(row)
            catalog_rows[payload["theme_key"]] = row

        try:
            await session.flush()
        except SQLAlchemyError as exc:
            await session.rollback()
            print(f"Unable to write theme catalog rows: {exc}", file=sys.stderr)
            return 1

        for schedule_seed in THEME_SEED_SCHEDULES:
            theme = catalog_rows[schedule_seed["theme_key"]]
            validated = ThemeScheduleCreate.model_validate({**schedule_seed, "theme_id": theme.id})
            session.add(ThemeSchedule(**validated.model_dump()))

        for override_seed in THEME_SEED_OVERRIDES:
            theme = catalog_rows[override_seed["theme_key"]]
            validated = ThemeOverrideCreate.model_validate({**override_seed, "theme_id": theme.id})
            session.add(CardThemeOverride(**validated.model_dump()))

        try:
            await session.commit()
        except SQLAlchemyError as exc:
            await session.rollback()
            print(f"Unable to commit theme seed data: {exc}", file=sys.stderr)
            return 1

    print(
        "Reset Theme Factory seed data:",
        f"catalog={len(THEME_SEED_THEMES)};",
        f"schedules={len(THEME_SEED_SCHEDULES)};",
        f"overrides={len(THEME_SEED_OVERRIDES)}",
    )
    return 0


async def main() -> int:
    try:
        return await _seed_themes()
    finally:
        await close_database()


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
