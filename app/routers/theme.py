"""Theme management endpoints for resolving and inspecting daily themes."""

from __future__ import annotations

from fastapi import APIRouter, Depends, Query, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.daily_plan import DailyContentPlan
from app.models.theme import ThemeOverride
from app.schemas.theme import (
    ThemeHistoryItem,
    ThemeOverrideCreate,
    ThemeOverrideResponse,
    ThemeResolved,
)
from app.services.theme_resolver import ThemeResolver

router = APIRouter(prefix="/theme", tags=["theme"])
resolver = ThemeResolver()


@router.get("/today", response_model=ThemeResolved)
async def get_today_theme(db: AsyncSession = Depends(get_db)) -> ThemeResolved:
    """Resolve today's theme, persist it, and return the API response payload."""

    resolved_theme = await resolver.resolve_today(db)
    return ThemeResolved.model_validate(resolved_theme)


@router.get("/history", response_model=list[ThemeHistoryItem])
async def get_theme_history(
    limit: int = Query(default=7, ge=1, le=30),
    db: AsyncSession = Depends(get_db),
) -> list[ThemeHistoryItem]:
    """Return the most recent resolved daily themes, newest first."""

    statement = (
        select(DailyContentPlan)
        .order_by(DailyContentPlan.plan_date.desc())
        .limit(limit)
    )
    result = await db.execute(statement)
    items = result.scalars().all()
    return [ThemeHistoryItem.model_validate(item) for item in items]


@router.post(
    "/override",
    response_model=ThemeOverrideResponse,
    status_code=status.HTTP_201_CREATED,
)
async def create_theme_override(
    payload: ThemeOverrideCreate,
    db: AsyncSession = Depends(get_db),
) -> ThemeOverrideResponse:
    """Create a manual theme override that can supersede the weekly rotation."""

    override = ThemeOverride(**payload.model_dump())
    db.add(override)
    await db.commit()
    await db.refresh(override)
    return ThemeOverrideResponse.model_validate(override)
