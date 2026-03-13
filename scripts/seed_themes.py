#!/usr/bin/env python3
"""Seed the Theme Factory catalog, schedule, and override tables."""

from __future__ import annotations

import asyncio
from datetime import datetime
from pathlib import Path
import sys

from sqlalchemy import select
from sqlalchemy.exc import ProgrammingError, SQLAlchemyError

REPO_ROOT = Path(__file__).resolve().parents[1]
if str(REPO_ROOT) not in sys.path:
    sys.path.insert(0, str(REPO_ROOT))

from app.database import async_session_factory, close_database
from app.models.theme import CardThemeOverride, ThemeCatalog, ThemeSchedule
from app.schemas.theme_factory import ThemeOverrideCreate, ThemeScheduleCreate
from app.theme_factory_seed import KOLKATA_TZ, THEME_SEED_OVERRIDES, THEME_SEED_SCHEDULES, THEME_SEED_THEMES


def _schedule_signature(
    *,
    theme_id: int,
    schedule_type: str,
    start_date,
    end_date,
    weekday_mask: list[str],
    month_mask: list[int],
    region: str | None,
    country: str | None,
) -> tuple[object, ...]:
    return (
        theme_id,
        schedule_type,
        start_date,
        end_date,
        tuple(weekday_mask),
        tuple(month_mask),
        region or "",
        country or "",
    )


def _override_signature(
    *,
    theme_id: int,
    override_scope: str,
    start_at: datetime,
    end_at: datetime,
) -> tuple[object, ...]:
    return (
        theme_id,
        override_scope,
        start_at,
        end_at,
    )


async def _seed_themes() -> int:
    async with async_session_factory() as session:
        try:
            existing_catalog_rows = await session.execute(select(ThemeCatalog))
        except ProgrammingError:
            await session.rollback()
            print("Theme Factory tables are missing. Run ./venv/bin/alembic upgrade head first.", file=sys.stderr)
            return 1
        except SQLAlchemyError as exc:
            await session.rollback()
            print(f"Unable to read theme catalog: {exc}", file=sys.stderr)
            return 1

        existing_catalog = {
            row.theme_key: row
            for row in existing_catalog_rows.scalars().all()
        }
        catalog_created = 0
        catalog_updated = 0

        for payload in THEME_SEED_THEMES:
            row = existing_catalog.get(payload["theme_key"])
            if row is None:
                row = ThemeCatalog(**payload)
                session.add(row)
                existing_catalog[payload["theme_key"]] = row
                catalog_created += 1
                continue
            for key, value in payload.items():
                setattr(row, key, value)
            row.updated_at = datetime.now(tz=KOLKATA_TZ)
            catalog_updated += 1

        try:
            await session.flush()
        except SQLAlchemyError as exc:
            await session.rollback()
            print(f"Unable to write theme catalog rows: {exc}", file=sys.stderr)
            return 1

        theme_by_key = {
            row.theme_key: row
            for row in existing_catalog.values()
        }

        theme_ids = [row.id for row in theme_by_key.values() if row.id is not None]
        existing_schedule_rows = await session.execute(
            select(ThemeSchedule).where(ThemeSchedule.theme_id.in_(theme_ids))
        )
        existing_schedules = {
            _schedule_signature(
                theme_id=row.theme_id,
                schedule_type=row.schedule_type,
                start_date=row.start_date,
                end_date=row.end_date,
                weekday_mask=list(row.weekday_mask or []),
                month_mask=list(row.month_mask or []),
                region=row.region,
                country=row.country,
            ): row
            for row in existing_schedule_rows.scalars().all()
        }
        schedule_created = 0
        schedule_updated = 0

        for schedule_seed in THEME_SEED_SCHEDULES:
            theme = theme_by_key[schedule_seed["theme_key"]]
            validated = ThemeScheduleCreate.model_validate(
                {
                    **schedule_seed,
                    "theme_id": theme.id,
                }
            )
            payload = validated.model_dump()
            signature = _schedule_signature(
                theme_id=payload["theme_id"],
                schedule_type=payload["schedule_type"],
                start_date=payload["start_date"],
                end_date=payload["end_date"],
                weekday_mask=payload["weekday_mask"],
                month_mask=payload["month_mask"],
                region=payload["region"],
                country=payload["country"],
            )
            row = existing_schedules.get(signature)
            if row is None:
                row = ThemeSchedule(**payload)
                session.add(row)
                existing_schedules[signature] = row
                schedule_created += 1
                continue
            for key, value in payload.items():
                setattr(row, key, value)
            row.updated_at = datetime.now(tz=KOLKATA_TZ)
            schedule_updated += 1

        existing_override_rows = await session.execute(
            select(CardThemeOverride).where(CardThemeOverride.theme_id.in_(theme_ids))
        )
        existing_overrides = {
            _override_signature(
                theme_id=row.theme_id,
                override_scope=row.override_scope,
                start_at=row.start_at,
                end_at=row.end_at,
            ): row
            for row in existing_override_rows.scalars().all()
        }
        override_created = 0
        override_updated = 0

        for override_seed in THEME_SEED_OVERRIDES:
            theme = theme_by_key[override_seed["theme_key"]]
            validated = ThemeOverrideCreate.model_validate(
                {
                    **override_seed,
                    "theme_id": theme.id,
                }
            )
            payload = validated.model_dump()
            signature = _override_signature(
                theme_id=payload["theme_id"],
                override_scope=payload["override_scope"],
                start_at=payload["start_at"],
                end_at=payload["end_at"],
            )
            row = existing_overrides.get(signature)
            if row is None:
                row = CardThemeOverride(**payload)
                session.add(row)
                existing_overrides[signature] = row
                override_created += 1
                continue
            for key, value in payload.items():
                setattr(row, key, value)
            override_updated += 1

        try:
            await session.commit()
        except SQLAlchemyError as exc:
            await session.rollback()
            print(f"Unable to commit theme seed data: {exc}", file=sys.stderr)
            return 1

    print(
        "Seeded Theme Factory data:",
        f"catalog created={catalog_created} updated={catalog_updated};",
        f"schedules created={schedule_created} updated={schedule_updated};",
        f"overrides created={override_created} updated={override_updated}",
    )
    return 0


async def main() -> int:
    try:
        return await _seed_themes()
    finally:
        await close_database()


if __name__ == "__main__":
    raise SystemExit(asyncio.run(main()))
