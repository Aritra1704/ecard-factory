"""Editable operator-option catalog service with seed fallback."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import datetime, timezone
from functools import lru_cache
import logging

from fastapi import HTTPException, status
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.operator_option import OperatorOptionCatalog
from app.schemas.operator_config import (
    OperatorOptionCatalogResponse,
    OperatorOptionCreate,
    OperatorOptionDeleteResponse,
    OperatorOptionResponse,
    OperatorOptionUpdate,
)

logger = logging.getLogger(__name__)

SEED_OPERATOR_OPTIONS: tuple[dict[str, object], ...] = (
    {"category": "audience", "option_key": "general_audience", "option_value": "general audience", "label": "General Audience", "description": "Broad public-facing greetings.", "sort_order": 10, "is_default": True},
    {"category": "audience", "option_key": "working_professionals", "option_value": "working professionals", "label": "Working Professionals", "description": "Office-safe and workplace-appropriate tone.", "sort_order": 20, "is_default": False},
    {"category": "audience", "option_key": "friends_and_family", "option_value": "friends and family", "label": "Friends and Family", "description": "Warm greetings for personal circles.", "sort_order": 30, "is_default": False},
    {"category": "audience", "option_key": "teammates", "option_value": "teammates", "label": "Teammates", "description": "Internal appreciation and team morale messages.", "sort_order": 40, "is_default": False},
    {"category": "audience", "option_key": "community", "option_value": "community", "label": "Community", "description": "Local or cause-led public community messaging.", "sort_order": 50, "is_default": False},
    {"category": "audience", "option_key": "friends", "option_value": "friends", "label": "Friends", "description": "Casual and playful personal greetings.", "sort_order": 60, "is_default": False},
    {"category": "audience", "option_key": "family", "option_value": "family", "label": "Family", "description": "Family-centric greeting tone.", "sort_order": 70, "is_default": False},
    {"category": "audience", "option_key": "partners_and_loved_ones", "option_value": "partners and loved ones", "label": "Partners and Loved Ones", "description": "Romantic or intimate greetings.", "sort_order": 80, "is_default": False},
    {"category": "cultural_context", "option_key": "global", "option_value": "global", "label": "Global", "description": "Broad audience with no specific regional framing.", "sort_order": 10, "is_default": True},
    {"category": "cultural_context", "option_key": "indian", "option_value": "indian", "label": "Indian", "description": "General India-facing cultural cues.", "sort_order": 20, "is_default": False},
    {"category": "cultural_context", "option_key": "bengali", "option_value": "bengali", "label": "Bengali", "description": "Bengali language/cultural nuance.", "sort_order": 30, "is_default": False},
    {"category": "cultural_context", "option_key": "corporate", "option_value": "corporate", "label": "Corporate", "description": "Professional workplace framing.", "sort_order": 40, "is_default": False},
    {"category": "cultural_context", "option_key": "family_centric", "option_value": "family-centric", "label": "Family-Centric", "description": "Home and family-first framing.", "sort_order": 50, "is_default": False},
    {"category": "tone_style", "option_key": "conversational", "option_value": "conversational", "label": "Conversational", "description": "Natural spoken-language greeting tone.", "sort_order": 10, "is_default": True},
    {"category": "tone_style", "option_key": "minimal", "option_value": "minimal", "label": "Minimal", "description": "Short and crisp wording.", "sort_order": 20, "is_default": False},
    {"category": "tone_style", "option_key": "poetic", "option_value": "poetic", "label": "Poetic", "description": "Softer, lyrical phrasing.", "sort_order": 30, "is_default": False},
    {"category": "tone_style", "option_key": "witty", "option_value": "witty", "label": "Witty", "description": "Humorous and smart card copy.", "sort_order": 40, "is_default": False},
    {"category": "tone_style", "option_key": "heartfelt", "option_value": "heartfelt", "label": "Heartfelt", "description": "Emotion-led warm greetings.", "sort_order": 50, "is_default": False},
    {"category": "tone_style", "option_key": "uplifting", "option_value": "uplifting", "label": "Uplifting", "description": "Encouraging and positive mood.", "sort_order": 60, "is_default": False},
    {"category": "tone_style", "option_key": "festive", "option_value": "festive", "label": "Festive", "description": "Celebratory and occasion-led wording.", "sort_order": 70, "is_default": False},
    {"category": "copy_style", "option_key": "minimal", "option_value": "minimal", "label": "Minimal", "description": "Short crisp one-line greeting copy.", "sort_order": 10, "is_default": True},
    {"category": "copy_style", "option_key": "witty", "option_value": "witty", "label": "Witty", "description": "Humor-forward short copy.", "sort_order": 20, "is_default": False},
    {"category": "copy_style", "option_key": "playful", "option_value": "playful", "label": "Playful", "description": "Light and cheerful short copy.", "sort_order": 30, "is_default": False},
    {"category": "copy_style", "option_key": "heartfelt", "option_value": "heartfelt", "label": "Heartfelt", "description": "Emotion-forward short copy.", "sort_order": 40, "is_default": False},
    {"category": "visual_style", "option_key": "minimal", "option_value": "minimal", "label": "Minimal", "description": "Clean restrained art direction.", "sort_order": 10, "is_default": True},
    {"category": "visual_style", "option_key": "elegant", "option_value": "elegant", "label": "Elegant", "description": "Classic editorial card styling.", "sort_order": 20, "is_default": False},
    {"category": "visual_style", "option_key": "festive", "option_value": "festive", "label": "Festive", "description": "Colorful celebration-forward visuals.", "sort_order": 30, "is_default": False},
    {"category": "visual_style", "option_key": "playful", "option_value": "playful", "label": "Playful", "description": "Light, fun illustration direction.", "sort_order": 40, "is_default": False},
    {"category": "theme_bucket", "option_key": "everyday", "option_value": "everyday", "label": "Everyday", "description": "Recurring evergreen daily themes.", "sort_order": 10, "is_default": True},
    {"category": "theme_bucket", "option_key": "occasion", "option_value": "occasion", "label": "Occasion", "description": "Calendar and campaign themes.", "sort_order": 20, "is_default": False},
    {"category": "theme_bucket", "option_key": "current_event", "option_value": "current_event", "label": "Current Event", "description": "Editorial trend and news-linked themes.", "sort_order": 30, "is_default": False},
    {"category": "theme_type", "option_key": "evergreen", "option_value": "evergreen", "label": "Evergreen", "description": "Always-available reusable theme.", "sort_order": 10, "is_default": True},
    {"category": "theme_type", "option_key": "calendar", "option_value": "calendar", "label": "Calendar", "description": "Date-based annual theme.", "sort_order": 20, "is_default": False},
    {"category": "theme_type", "option_key": "campaign", "option_value": "campaign", "label": "Campaign", "description": "Bounded marketing or seasonal run.", "sort_order": 30, "is_default": False},
    {"category": "theme_type", "option_key": "news", "option_value": "news", "label": "News", "description": "Editorial or current-event driven theme.", "sort_order": 40, "is_default": False},
    {"category": "schedule_type", "option_key": "weekly_recurring", "option_value": "weekly_recurring", "label": "Weekly Recurring", "description": "Repeats on chosen weekdays.", "sort_order": 10, "is_default": True},
    {"category": "schedule_type", "option_key": "single_day", "option_value": "single_day", "label": "Single Day", "description": "Runs on one specific date.", "sort_order": 20, "is_default": False},
    {"category": "schedule_type", "option_key": "date_range", "option_value": "date_range", "label": "Date Range", "description": "Runs across a bounded campaign window.", "sort_order": 30, "is_default": False},
    {"category": "schedule_type", "option_key": "monthly_recurring", "option_value": "monthly_recurring", "label": "Monthly Recurring", "description": "Repeats across selected months.", "sort_order": 40, "is_default": False},
    {"category": "override_scope", "option_key": "editorial", "option_value": "editorial", "label": "Editorial", "description": "Used for editorial priority overrides.", "sort_order": 10, "is_default": True},
    {"category": "override_scope", "option_key": "operator", "option_value": "operator", "label": "Operator", "description": "Manual operational override.", "sort_order": 20, "is_default": False},
    {"category": "override_scope", "option_key": "campaign", "option_value": "campaign", "label": "Campaign", "description": "Override linked to a campaign push.", "sort_order": 30, "is_default": False},
)


@dataclass(slots=True)
class OperatorOptionService:
    """CRUD service for operator-form option catalogs."""

    async def list_options(
        self,
        session: AsyncSession | None,
        *,
        include_inactive: bool = False,
    ) -> OperatorOptionCatalogResponse:
        rows = await self._load_rows(session)
        if rows:
            return self._catalog_response(rows, source="database", include_inactive=include_inactive)
        return self._catalog_response(self._seed_rows(), source="seed", include_inactive=include_inactive)

    async def create_option(
        self,
        session: AsyncSession | None,
        payload: OperatorOptionCreate,
    ) -> OperatorOptionResponse:
        if session is None:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Config database unavailable")
        record = OperatorOptionCatalog(**payload.model_dump())
        session.add(record)
        try:
            if record.is_default:
                await self._clear_other_defaults(session, category=record.category)
            await session.commit()
            await session.refresh(record)
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("failed creating operator option")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to create config option") from exc
        return OperatorOptionResponse.model_validate(record)

    async def update_option(
        self,
        session: AsyncSession | None,
        option_id: int,
        payload: OperatorOptionUpdate,
    ) -> OperatorOptionResponse:
        record = await self._get_option_record_or_404(session, option_id)
        updates = payload.model_dump(exclude_unset=True)
        next_category = str(updates.get("category") or record.category)
        for key, value in updates.items():
            setattr(record, key, value)
        record.updated_at = datetime.now(timezone.utc)
        try:
            if bool(record.is_default):
                await self._clear_other_defaults(session, category=next_category, except_id=record.id)
            await session.commit()
            await session.refresh(record)
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("failed updating operator option")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to update config option") from exc
        return OperatorOptionResponse.model_validate(record)

    async def delete_option(self, session: AsyncSession | None, option_id: int) -> OperatorOptionDeleteResponse:
        record = await self._get_option_record_or_404(session, option_id)
        record.is_active = False
        record.is_default = False
        record.updated_at = datetime.now(timezone.utc)
        try:
            await session.commit()
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("failed deleting operator option")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to delete config option") from exc
        return OperatorOptionDeleteResponse(option_id=option_id, deleted=True)

    async def _load_rows(self, session: AsyncSession | None) -> list[OperatorOptionCatalog]:
        if session is None:
            return []
        statement = select(OperatorOptionCatalog).order_by(
            OperatorOptionCatalog.category.asc(),
            OperatorOptionCatalog.sort_order.asc(),
            OperatorOptionCatalog.label.asc(),
        )
        try:
            result = await session.execute(statement)
        except SQLAlchemyError:
            logger.exception("operator option catalog database read failed; returning seed defaults")
            return []
        return list(result.scalars().all())

    async def _get_option_record_or_404(
        self,
        session: AsyncSession | None,
        option_id: int,
    ) -> OperatorOptionCatalog:
        if session is None:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Config database unavailable")
        record = await session.get(OperatorOptionCatalog, option_id)
        if record is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Config option not found")
        return record

    async def _clear_other_defaults(
        self,
        session: AsyncSession,
        *,
        category: str,
        except_id: int | None = None,
    ) -> None:
        statement = select(OperatorOptionCatalog).where(OperatorOptionCatalog.category == category)
        result = await session.execute(statement)
        for row in result.scalars().all():
            if except_id is not None and row.id == except_id:
                continue
            if row.is_default:
                row.is_default = False

    @staticmethod
    def _seed_rows() -> list[OperatorOptionResponse]:
        rows: list[OperatorOptionResponse] = []
        for index, item in enumerate(SEED_OPERATOR_OPTIONS, start=1):
            rows.append(
                OperatorOptionResponse(
                    id=index,
                    category=str(item["category"]),
                    option_key=str(item["option_key"]),
                    option_value=str(item["option_value"]),
                    label=str(item["label"]),
                    description=str(item.get("description") or "") or None,
                    sort_order=int(item.get("sort_order") or 0),
                    is_active=True,
                    is_default=bool(item.get("is_default")),
                    created_at=None,
                    updated_at=None,
                )
            )
        return rows

    @staticmethod
    def _catalog_response(
        rows: list[OperatorOptionCatalog | OperatorOptionResponse],
        *,
        source: str,
        include_inactive: bool,
    ) -> OperatorOptionCatalogResponse:
        categories: dict[str, list[OperatorOptionResponse]] = {}
        for row in rows:
            normalized = row if isinstance(row, OperatorOptionResponse) else OperatorOptionResponse.model_validate(row)
            if not include_inactive and not normalized.is_active:
                continue
            categories.setdefault(normalized.category, []).append(normalized)

        for items in categories.values():
            items.sort(key=lambda entry: (entry.sort_order, entry.label.lower(), entry.id))

        return OperatorOptionCatalogResponse(
            source="database" if source == "database" else "seed",
            categories=categories,  # type: ignore[arg-type]
        )


@lru_cache(maxsize=1)
def get_operator_option_service() -> OperatorOptionService:
    """Return singleton operator option service."""

    return OperatorOptionService()
