"""Server-rendered admin dashboard for internal operations."""

from __future__ import annotations

import asyncio
import calendar
from datetime import date, datetime, time, timedelta
from decimal import Decimal
import os
from pathlib import Path
from typing import Any

from fastapi import APIRouter, Depends, Form, HTTPException, Query, Request, status
from fastapi.responses import RedirectResponse
from fastapi.templating import Jinja2Templates
import httpx
from sqlalchemy import select, text
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.card import Card
from app.models.theme import ThemeOverride, WeeklyTheme
from app.schemas.cards import CardStatus
from app.services.theme_resolver import KOLKATA_TZ, ThemeResolver

router = APIRouter(prefix="/admin", tags=["admin"])

BASE_DIR = Path(__file__).resolve().parents[2]
TEMPLATES_DIR = BASE_DIR / "app" / "templates"
MIGRATIONS_DIR = BASE_DIR / "migrations" / "versions"
templates = Jinja2Templates(directory=str(TEMPLATES_DIR))
theme_resolver = ThemeResolver()

WEEKDAY_ORDER = {
    "monday": 0,
    "tuesday": 1,
    "wednesday": 2,
    "thursday": 3,
    "friday": 4,
    "saturday": 5,
    "sunday": 6,
}
STATUS_OPTIONS: list[str] = [
    "pending_phrase_approval",
    "phrase_approved",
    "pending_image",
    "pending_image_approval",
    "image_approved",
    "pending_assembly",
    "assembly_approved",
    "published",
    "rejected",
]


def status_badge_class(status_value: str) -> str:
    """Return Tailwind classes for a card status badge."""

    mapping = {
        "published": "bg-emerald-500/15 text-emerald-300 ring-emerald-500/30",
        "rejected": "bg-rose-500/15 text-rose-300 ring-rose-500/30",
        "phrase_approved": "bg-sky-500/15 text-sky-300 ring-sky-500/30",
        "image_approved": "bg-sky-500/15 text-sky-300 ring-sky-500/30",
        "assembly_approved": "bg-indigo-500/15 text-indigo-300 ring-indigo-500/30",
        "pending_phrase_approval": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
        "pending_image": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
        "pending_image_approval": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
        "pending_assembly": "bg-amber-500/15 text-amber-300 ring-amber-500/30",
    }
    return mapping.get(status_value, "bg-zinc-700/70 text-zinc-200 ring-white/10")


templates.env.globals["status_badge_class"] = status_badge_class


def _nav_items() -> list[dict[str, str]]:
    """Return the admin navigation structure used by the base template."""

    return [
        {"label": "Dashboard", "url": "/admin/"},
        {"label": "Cards", "url": "/admin/cards"},
        {"label": "Themes", "url": "/admin/themes"},
        {"label": "Costs", "url": "/admin/costs"},
        {"label": "Migrations", "url": "/admin/migrations"},
    ]


def _ist_day_bounds(target_date: date) -> tuple[datetime, datetime]:
    """Return the start and end datetimes for a Kolkata-local calendar day."""

    day_start = datetime.combine(target_date, time.min, tzinfo=KOLKATA_TZ)
    return day_start, day_start + timedelta(days=1)


def _ist_month_bounds(now_ist: datetime) -> tuple[datetime, datetime]:
    """Return the start and exclusive end datetimes for the current Kolkata month."""

    month_start = datetime(now_ist.year, now_ist.month, 1, tzinfo=KOLKATA_TZ)
    if now_ist.month == 12:
        next_month = datetime(now_ist.year + 1, 1, 1, tzinfo=KOLKATA_TZ)
    else:
        next_month = datetime(now_ist.year, now_ist.month + 1, 1, tzinfo=KOLKATA_TZ)
    return month_start, next_month


async def _fetch_all_cards(db: AsyncSession) -> list[Card]:
    """Load cards newest-first for admin views that need rollup metrics."""

    card_result = await db.execute(select(Card).order_by(Card.created_at.desc(), Card.id.desc()))
    return list(card_result.scalars().all())


def _coerce_decimal(value: Decimal | float | int | None) -> Decimal:
    """Normalize numeric values into Decimal for consistent display math."""

    if isinstance(value, Decimal):
        return value
    if value is None:
        return Decimal("0")
    return Decimal(str(value))


async def build_dashboard_context(db: AsyncSession) -> dict[str, Any]:
    """Build the template context for the main admin dashboard."""

    today_theme = await theme_resolver.resolve_today(db)
    now_ist = datetime.now(KOLKATA_TZ)
    today = now_ist.date()
    day_start, day_end = _ist_day_bounds(today)
    month_start, month_end = _ist_month_bounds(now_ist)
    cards = await _fetch_all_cards(db)

    today_cards = [card for card in cards if day_start <= card.created_at.astimezone(KOLKATA_TZ) < day_end]
    pending_cards = [card for card in cards if "pending" in card.status]
    month_cards = [card for card in cards if month_start <= card.created_at.astimezone(KOLKATA_TZ) < month_end]
    total_cost_month = sum(
        (_coerce_decimal(card.cost_llm) + _coerce_decimal(card.cost_image) for card in month_cards),
        start=Decimal("0"),
    )

    return {
        "nav_items": _nav_items(),
        "page_title": "Dashboard",
        "today_theme": today_theme,
        "cards_generated_today": len(today_cards),
        "cards_pending_approval": len(pending_cards),
        "total_cost_month": total_cost_month,
        "recent_cards": cards[:5],
        "n8n_trigger_url": os.getenv("N8N_DAILY_WEBHOOK_URL", "http://n8n:5678/webhook/daily-card-generation"),
    }


async def build_cards_context(db: AsyncSession, status_filter: str | None) -> dict[str, Any]:
    """Build the cards listing page context, optionally filtered by status."""

    cards = await _fetch_all_cards(db)
    filtered_cards = [card for card in cards if card.status == status_filter] if status_filter else cards
    return {
        "nav_items": _nav_items(),
        "page_title": "Cards",
        "cards": filtered_cards,
        "status_filter": status_filter or "",
        "status_options": STATUS_OPTIONS,
    }


async def build_card_detail_context(db: AsyncSession, card_id: int) -> dict[str, Any]:
    """Build the detail page context for a single card."""

    card = await db.get(Card, card_id)
    if card is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found.")

    total_cost = _coerce_decimal(card.cost_llm) + _coerce_decimal(card.cost_image)
    return {
        "nav_items": _nav_items(),
        "page_title": f"Card #{card.id}",
        "card": card,
        "total_cost": total_cost,
        "status_options": STATUS_OPTIONS,
    }


def _sort_weekly_themes(weekly_themes: list[WeeklyTheme]) -> list[WeeklyTheme]:
    """Return weekly themes in rotation-month then weekday order."""

    return sorted(
        weekly_themes,
        key=lambda theme: (theme.rotation_month, WEEKDAY_ORDER.get(theme.day_of_week.lower(), 99)),
    )


def _resolve_theme_for_date(
    target_date: date,
    weekly_themes: list[WeeklyTheme],
    overrides: list[ThemeOverride],
) -> dict[str, Any]:
    """Return the active theme preview for one future date."""

    applicable_overrides = [
        override
        for override in overrides
        if override.active and override.start_date <= target_date <= override.end_date
    ]
    applicable_overrides.sort(key=lambda override: override.priority, reverse=True)
    if applicable_overrides:
        chosen = applicable_overrides[0]
        return {"date": target_date, "source": "override", "theme_name": chosen.theme_name}

    rotation = theme_resolver.get_rotation_month(target_date.month)
    weekday_name = theme_resolver.get_weekday_name(target_date)
    for weekly_theme in weekly_themes:
        if (
            weekly_theme.active
            and weekly_theme.rotation_month == rotation
            and weekly_theme.day_of_week.lower() == weekday_name
        ):
            return {"date": target_date, "source": "weekly", "theme_name": weekly_theme.theme_name}

    return {"date": target_date, "source": "fallback", "theme_name": "Relatable / Everyday"}


async def build_themes_context(db: AsyncSession) -> dict[str, Any]:
    """Build the themes page context with current rotation and override tools."""

    weekly_result = await db.execute(select(WeeklyTheme).order_by(WeeklyTheme.rotation_month, WeeklyTheme.day_of_week))
    weekly_themes = list(weekly_result.scalars().all())
    override_result = await db.execute(select(ThemeOverride).order_by(ThemeOverride.start_date.desc(), ThemeOverride.priority.desc()))
    overrides = list(override_result.scalars().all())
    today_theme = await theme_resolver.resolve_today(db)
    today = datetime.now(KOLKATA_TZ).date()
    upcoming_days = [_resolve_theme_for_date(today + timedelta(days=offset), weekly_themes, overrides) for offset in range(7)]

    return {
        "nav_items": _nav_items(),
        "page_title": "Themes",
        "weekly_themes": _sort_weekly_themes(weekly_themes),
        "today_theme": today_theme,
        "upcoming_days": upcoming_days,
        "overrides": overrides[:10],
    }


async def build_costs_context(db: AsyncSession) -> dict[str, Any]:
    """Build the monthly cost analytics view."""

    now_ist = datetime.now(KOLKATA_TZ)
    month_start, month_end = _ist_month_bounds(now_ist)
    cards = await _fetch_all_cards(db)
    month_cards = [card for card in cards if month_start <= card.created_at.astimezone(KOLKATA_TZ) < month_end]
    total_llm = sum((_coerce_decimal(card.cost_llm) for card in month_cards), start=Decimal("0"))
    total_image = sum((_coerce_decimal(card.cost_image) for card in month_cards), start=Decimal("0"))
    total_cost = total_llm + total_image
    average_cost = total_cost / len(month_cards) if month_cards else Decimal("0")

    daily_rows: dict[str, dict[str, Decimal]] = {}
    for card in month_cards:
        key = card.created_at.astimezone(KOLKATA_TZ).date().isoformat()
        daily_rows.setdefault(key, {"llm": Decimal("0"), "image": Decimal("0"), "total": Decimal("0")})
        daily_rows[key]["llm"] += _coerce_decimal(card.cost_llm)
        daily_rows[key]["image"] += _coerce_decimal(card.cost_image)
        daily_rows[key]["total"] += _coerce_decimal(card.cost_llm) + _coerce_decimal(card.cost_image)

    daily_costs = [
        {"date": day, **values}
        for day, values in sorted(daily_rows.items(), key=lambda item: item[0], reverse=True)
    ]
    days_in_month = calendar.monthrange(now_ist.year, now_ist.month)[1]
    elapsed_days = max(now_ist.day, 1)
    projected_monthly_cost = (total_cost / elapsed_days) * days_in_month if month_cards else Decimal("0")

    return {
        "nav_items": _nav_items(),
        "page_title": "Costs",
        "total_spend_month": total_cost,
        "average_cost_per_card": average_cost,
        "llm_cost_month": total_llm,
        "image_cost_month": total_image,
        "daily_costs": daily_costs,
        "projected_monthly_cost": projected_monthly_cost,
        "card_count_month": len(month_cards),
    }


async def build_migrations_context(db: AsyncSession) -> dict[str, Any]:
    """Build the migrations page with local files and applied revision metadata."""

    current_version = "unavailable"
    safe_schema_name = settings.db_schema.replace('"', '""')
    try:
        result = await db.execute(text(f'SELECT version_num FROM "{safe_schema_name}".alembic_version'))
        current_version = str(result.scalar_one())
    except Exception:
        current_version = "unavailable"

    migration_files = sorted(
        path for path in MIGRATIONS_DIR.iterdir() if path.is_file() and path.suffix == ".py" and path.name != "__init__.py"
    )
    migrations = []
    for path in migration_files:
        revision = path.name.split("_", 1)[0]
        migrations.append(
            {
                "revision": revision,
                "filename": path.name,
                "applied": current_version != "unavailable" and revision <= current_version,
            }
        )

    return {
        "nav_items": _nav_items(),
        "page_title": "Migrations",
        "current_version": current_version,
        "migrations": migrations,
    }


@router.get("/")
async def admin_dashboard(request: Request, db: AsyncSession = Depends(get_db)):
    """Render the admin dashboard."""

    context = await build_dashboard_context(db)
    return templates.TemplateResponse(request=request, name="dashboard.html", context=context)


@router.get("/cards")
async def admin_cards(
    request: Request,
    status: str | None = Query(default=None),
    db: AsyncSession = Depends(get_db),
):
    """Render the card listing page."""

    context = await build_cards_context(db, status)
    return templates.TemplateResponse(request=request, name="cards.html", context=context)


@router.get("/cards/{card_id}")
async def admin_card_detail(request: Request, card_id: int, db: AsyncSession = Depends(get_db)):
    """Render one card detail page."""

    context = await build_card_detail_context(db, card_id)
    return templates.TemplateResponse(request=request, name="card_detail.html", context=context)


@router.get("/themes")
async def admin_themes(request: Request, db: AsyncSession = Depends(get_db)):
    """Render the themes admin page."""

    context = await build_themes_context(db)
    return templates.TemplateResponse(request=request, name="themes.html", context=context)


@router.get("/costs")
async def admin_costs(request: Request, db: AsyncSession = Depends(get_db)):
    """Render the cost analytics page."""

    context = await build_costs_context(db)
    return templates.TemplateResponse(request=request, name="costs.html", context=context)


@router.get("/migrations")
async def admin_migrations(request: Request, db: AsyncSession = Depends(get_db)):
    """Render the migrations status page."""

    context = await build_migrations_context(db)
    return templates.TemplateResponse(request=request, name="migrations.html", context=context)


@router.post("/cards/{card_id}/status")
async def admin_update_card_status(
    card_id: int,
    status_value: CardStatus = Form(..., alias="status"),
    db: AsyncSession = Depends(get_db),
):
    """Update a card status from the admin detail page and redirect back."""

    card = await db.get(Card, card_id)
    if card is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found.")

    card.status = status_value
    await db.commit()
    return RedirectResponse(url=f"/admin/cards/{card_id}", status_code=status.HTTP_303_SEE_OTHER)


@router.post("/theme/override")
async def admin_create_theme_override(
    override_type: str = Form(...),
    event_id: str = Form(default=""),
    theme_name: str = Form(...),
    tone_funny_pct: int = Form(...),
    tone_emotion_pct: int = Form(...),
    prompt_keywords: str = Form(default=""),
    color_palette: str = Form(default=""),
    visual_style: str = Form(...),
    instagram_hashtags: str = Form(default=""),
    start_date: date = Form(...),
    end_date: date = Form(...),
    priority: int = Form(default=10),
    created_by: str = Form(default="admin_ui"),
    db: AsyncSession = Depends(get_db),
):
    """Create a theme override from the admin themes page and redirect back."""

    override = ThemeOverride(
        override_type=override_type,
        event_id=int(event_id) if event_id.strip() else None,
        theme_name=theme_name,
        tone_funny_pct=tone_funny_pct,
        tone_emotion_pct=tone_emotion_pct,
        prompt_keywords=[item.strip() for item in prompt_keywords.split(",") if item.strip()],
        color_palette=[item.strip() for item in color_palette.split(",") if item.strip()],
        visual_style=visual_style,
        instagram_hashtags=[item.strip() for item in instagram_hashtags.split(",") if item.strip()],
        start_date=start_date,
        end_date=end_date,
        priority=priority,
        created_by=created_by,
        active=True,
    )
    db.add(override)
    await db.commit()
    return RedirectResponse(url="/admin/themes", status_code=status.HTTP_303_SEE_OTHER)


@router.post("/trigger-daily-workflow")
async def admin_trigger_daily_workflow():
    """Trigger the n8n daily workflow webhook from the dashboard."""

    trigger_url = os.getenv("N8N_DAILY_WEBHOOK_URL", "http://n8n:5678/webhook/daily-card-generation")
    async with httpx.AsyncClient(timeout=15.0) as client:
        await client.post(trigger_url)
    return RedirectResponse(url="/admin/", status_code=status.HTTP_303_SEE_OTHER)


@router.post("/migrations/run")
async def admin_run_migrations():
    """Run Alembic upgrades from the admin migrations page."""

    process = await asyncio.create_subprocess_exec(
        "alembic",
        "upgrade",
        "head",
        cwd=str(BASE_DIR),
    )
    await process.communicate()
    return RedirectResponse(url="/admin/migrations", status_code=status.HTTP_303_SEE_OTHER)
