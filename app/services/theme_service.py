"""Database-backed Theme Factory service with read fallback seed data."""

from __future__ import annotations

from dataclasses import dataclass
from datetime import date, datetime, time, timedelta
from functools import lru_cache
import logging
from zoneinfo import ZoneInfo

from fastapi import HTTPException, status
from pydantic import ValidationError
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.models.theme import ThemeCatalog, ThemeOverride, ThemeSchedule
from app.schemas.theme_factory import (
    ThemeCatalogCreate,
    ThemeCatalogResponse,
    ThemeCatalogUpdate,
    ThemeDeleteResponse,
    ThemeOverrideCreate,
    ThemeOverrideResponse,
    ThemeResolvedPayload,
    ThemeScheduleCreate,
    ThemeScheduleDashboardResponse,
    ThemeScheduleResponse,
    ThemeScheduleUpdate,
    ThemeTodayResponse,
    ThemeWeekDayResponse,
)

logger = logging.getLogger(__name__)
KOLKATA_TZ = ZoneInfo("Asia/Kolkata")
WEEKDAY_ORDER = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday",
]

_FALLBACK_CATALOG = [
    ThemeCatalogResponse(
        id=1,
        theme_key="motivation-monday",
        theme_name="Motivation Monday",
        description="Weekly recurring motivation theme for Monday card runs.",
        theme_type="evergreen",
        cultural_context="global",
        tone_style="conversational",
        default_funny_pct=25,
        default_emotion_pct=75,
        default_audience="working professionals",
        default_visual_style="minimal",
        is_active=True,
        priority=90,
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        updated_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
    ),
    ThemeCatalogResponse(
        id=2,
        theme_key="friendship-thursday",
        theme_name="Friendship Thursday",
        description="Weekly recurring friendship-focused greetings for Thursday.",
        theme_type="evergreen",
        cultural_context="global",
        tone_style="warm",
        default_funny_pct=35,
        default_emotion_pct=65,
        default_audience="friends",
        default_visual_style="playful",
        is_active=True,
        priority=80,
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        updated_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
    ),
    ThemeCatalogResponse(
        id=3,
        theme_key="valentines-week",
        theme_name="Valentine's Week",
        description="Date-range campaign for February relationship and affection cards.",
        theme_type="campaign",
        cultural_context="global",
        tone_style="romantic",
        default_funny_pct=20,
        default_emotion_pct=80,
        default_audience="partners",
        default_visual_style="elegant",
        is_active=True,
        priority=95,
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        updated_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
    ),
    ThemeCatalogResponse(
        id=4,
        theme_key="ramadan-month",
        theme_name="Ramadan Month",
        description="Month-long cultural campaign theme for Ramadan greetings.",
        theme_type="calendar",
        cultural_context="ramadan",
        tone_style="heartfelt",
        default_funny_pct=5,
        default_emotion_pct=95,
        default_audience="family and community",
        default_visual_style="elegant",
        is_active=True,
        priority=96,
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        updated_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
    ),
    ThemeCatalogResponse(
        id=5,
        theme_key="india-trend-override",
        theme_name="India Trend Override",
        description="Urgent editorial override theme for an India-focused trend spike.",
        theme_type="news",
        cultural_context="india",
        tone_style="energetic",
        default_funny_pct=15,
        default_emotion_pct=85,
        default_audience="india audience",
        default_visual_style="festive",
        is_active=True,
        priority=100,
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        updated_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
    ),
]

_FALLBACK_SCHEDULES = [
    ThemeScheduleResponse(
        id=1,
        theme_id=1,
        theme_key="motivation-monday",
        theme_name="Motivation Monday",
        schedule_type="weekly_recurring",
        weekday_mask=["monday"],
        month_mask=[],
        region=None,
        country=None,
        is_active=True,
        priority=90,
        notes="Default Monday weekly recurring motivation slot.",
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        updated_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
    ),
    ThemeScheduleResponse(
        id=2,
        theme_id=2,
        theme_key="friendship-thursday",
        theme_name="Friendship Thursday",
        schedule_type="weekly_recurring",
        weekday_mask=["thursday"],
        month_mask=[],
        region=None,
        country=None,
        is_active=True,
        priority=80,
        notes="Friendship-focused weekly Thursday slot.",
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        updated_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
    ),
    ThemeScheduleResponse(
        id=3,
        theme_id=3,
        theme_key="valentines-week",
        theme_name="Valentine's Week",
        schedule_type="date_range",
        start_date=date(2026, 2, 7),
        end_date=date(2026, 2, 14),
        weekday_mask=[],
        month_mask=[],
        region=None,
        country=None,
        is_active=True,
        priority=95,
        notes="Week-long February affection campaign.",
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        updated_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
    ),
    ThemeScheduleResponse(
        id=4,
        theme_id=4,
        theme_key="ramadan-month",
        theme_name="Ramadan Month",
        schedule_type="monthly_recurring",
        weekday_mask=[],
        month_mask=[3],
        region=None,
        country=None,
        is_active=True,
        priority=96,
        notes="Month-long recurring Ramadan campaign example.",
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        updated_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
    ),
]

_FALLBACK_OVERRIDES = [
    ThemeOverrideResponse(
        id=1,
        theme_id=5,
        theme_key="india-trend-override",
        theme_name="India Trend Override",
        override_scope="editorial",
        start_at=datetime(2026, 8, 14, 0, 0, tzinfo=KOLKATA_TZ),
        end_at=datetime(2026, 8, 16, 23, 59, 59, tzinfo=KOLKATA_TZ),
        reason="Example urgent editorial trend override for India.",
        force_top_priority=True,
        created_by="seed",
        created_at=datetime(2026, 3, 13, 0, 0, tzinfo=KOLKATA_TZ),
        is_active=True,
    )
]


@dataclass(slots=True)
class _ThemeFactoryState:
    catalog: list[ThemeCatalogResponse]
    schedules: list[ThemeScheduleResponse]
    overrides: list[ThemeOverrideResponse]
    source: str


@dataclass(slots=True)
class ThemeService:
    """CRUD and resolution service for Theme Factory."""

    async def get_catalog(self, session: AsyncSession | None) -> list[ThemeCatalogResponse]:
        state = await self._load_state(session)
        return state.catalog

    async def get_today_theme(
        self,
        session: AsyncSession | None,
        *,
        target_date: date | None = None,
        region: str | None = None,
        country: str | None = None,
    ) -> ThemeTodayResponse:
        state = await self._load_state(session)
        plan_date = target_date or datetime.now(tz=KOLKATA_TZ).date()
        return self._resolve_for_date(plan_date=plan_date, state=state, region=region, country=country)

    async def get_schedule_dashboard(
        self,
        session: AsyncSession | None,
        *,
        region: str | None = None,
        country: str | None = None,
    ) -> ThemeScheduleDashboardResponse:
        state = await self._load_state(session)
        today = datetime.now(tz=KOLKATA_TZ).date()
        week_start = today - timedelta(days=today.weekday())
        week_schedule = [
            self._resolve_for_date(plan_date=week_start + timedelta(days=offset), state=state, region=region, country=country)
            for offset in range(7)
        ]
        month_schedule = [
            schedule
            for schedule in state.schedules
            if schedule.is_active
            and self._schedule_matches_location(schedule, region=region, country=country)
            and self._schedule_intersects_month(schedule, today.year, today.month)
        ]
        month_schedule.sort(key=lambda item: (item.priority, item.theme_name or ""), reverse=True)
        active_overrides = [
            override
            for override in state.overrides
            if override.is_active and self._override_active_on(override, datetime.combine(today, time(hour=12), tzinfo=KOLKATA_TZ))
        ]
        active_overrides.sort(key=lambda item: (item.force_top_priority, item.created_at or datetime.min.replace(tzinfo=KOLKATA_TZ)), reverse=True)
        return ThemeScheduleDashboardResponse(
            timezone="Asia/Kolkata",
            week_schedule=[
                ThemeWeekDayResponse(
                    plan_date=item.plan_date,
                    weekday=item.weekday,
                    source=item.source,
                    schedule_type=item.schedule_type,
                    schedule_id=item.schedule_id,
                    override_id=item.override_id,
                    theme=item.theme,
                )
                for item in week_schedule
            ],
            month_schedule=month_schedule,
            active_overrides=active_overrides,
        )

    async def create_theme(self, session: AsyncSession | None, payload: ThemeCatalogCreate) -> ThemeCatalogResponse:
        if session is None:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Theme database unavailable")
        record = ThemeCatalog(**payload.model_dump())
        session.add(record)
        try:
            await session.commit()
            await session.refresh(record)
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("failed creating theme catalog record")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to create theme") from exc
        return self._catalog_response(record)

    async def update_theme(self, session: AsyncSession | None, theme_id: int, payload: ThemeCatalogUpdate) -> ThemeCatalogResponse:
        record = await self._get_theme_record_or_404(session, theme_id)
        for key, value in payload.model_dump(exclude_unset=True).items():
            setattr(record, key, value)
        record.updated_at = datetime.now(tz=KOLKATA_TZ)
        try:
            await session.commit()
            await session.refresh(record)
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("failed updating theme catalog record")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to update theme") from exc
        return self._catalog_response(record)

    async def delete_theme(self, session: AsyncSession | None, theme_id: int) -> ThemeDeleteResponse:
        record = await self._get_theme_record_or_404(session, theme_id)
        record.is_active = False
        record.updated_at = datetime.now(tz=KOLKATA_TZ)
        for schedule in record.schedules:
            schedule.is_active = False
            schedule.updated_at = datetime.now(tz=KOLKATA_TZ)
        for override in record.overrides:
            override.active = False
        try:
            await session.commit()
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("failed deleting theme catalog record")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to delete theme") from exc
        return ThemeDeleteResponse(theme_id=theme_id, deleted=True)

    async def create_schedule(self, session: AsyncSession | None, payload: ThemeScheduleCreate) -> ThemeScheduleResponse:
        if session is None:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Theme database unavailable")
        theme = await self._get_theme_record_or_404(session, payload.theme_id)
        record = ThemeSchedule(**payload.model_dump())
        session.add(record)
        try:
            await session.commit()
            await session.refresh(record)
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("failed creating theme schedule")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to create schedule") from exc
        return self._schedule_response(record, theme=theme)

    async def update_schedule(self, session: AsyncSession | None, schedule_id: int, payload: ThemeScheduleUpdate) -> ThemeScheduleResponse:
        if session is None:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Theme database unavailable")
        statement = select(ThemeSchedule).options(selectinload(ThemeSchedule.theme)).where(ThemeSchedule.id == schedule_id)
        result = await session.execute(statement)
        record = result.scalar_one_or_none()
        if record is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Theme schedule not found")
        merged = {
            "theme_id": record.theme_id,
            "schedule_type": record.schedule_type,
            "start_date": record.start_date,
            "end_date": record.end_date,
            "weekday_mask": list(record.weekday_mask or []),
            "month_mask": list(record.month_mask or []),
            "region": record.region,
            "country": record.country,
            "is_active": record.is_active,
            "priority": record.priority,
            "notes": record.notes,
        }
        merged.update(payload.model_dump(exclude_unset=True))
        try:
            validated = ThemeScheduleCreate.model_validate(merged)
        except ValidationError as exc:
            raise HTTPException(status_code=status.HTTP_422_UNPROCESSABLE_ENTITY, detail=exc.errors()) from exc
        updates = validated.model_dump()
        for key, value in updates.items():
            setattr(record, key, value)
        record.updated_at = datetime.now(tz=KOLKATA_TZ)
        try:
            await session.commit()
            await session.refresh(record)
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("failed updating theme schedule")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to update schedule") from exc
        return self._schedule_response(record, theme=record.theme)

    async def create_override(self, session: AsyncSession | None, payload: ThemeOverrideCreate) -> ThemeOverrideResponse:
        if session is None:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Theme database unavailable")
        theme = await self._get_theme_record_or_404(session, payload.theme_id)
        override_priority = theme.priority + (1000 if payload.force_top_priority else 0)
        localized_start = payload.start_at.astimezone(KOLKATA_TZ)
        localized_end = payload.end_at.astimezone(KOLKATA_TZ)
        record = ThemeOverride(
            override_type=payload.override_scope,
            event_id=None,
            theme_name=theme.theme_name,
            tone_funny_pct=theme.default_funny_pct,
            tone_emotion_pct=theme.default_emotion_pct,
            prompt_keywords=[],
            color_palette=[],
            visual_style=theme.default_visual_style,
            instagram_hashtags=[],
            start_date=localized_start.date(),
            end_date=localized_end.date(),
            priority=override_priority,
            created_by=payload.created_by,
            active=True,
            theme_id=theme.id,
            override_scope=payload.override_scope,
            start_at=localized_start,
            end_at=localized_end,
            reason=payload.reason,
            force_top_priority=payload.force_top_priority,
        )
        session.add(record)
        try:
            await session.commit()
            await session.refresh(record)
        except SQLAlchemyError as exc:
            await session.rollback()
            logger.exception("failed creating theme override")
            raise HTTPException(status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail="Unable to create override") from exc
        return self._override_response(record, theme=theme)

    async def _get_theme_record_or_404(self, session: AsyncSession | None, theme_id: int) -> ThemeCatalog:
        if session is None:
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Theme database unavailable")
        statement = (
            select(ThemeCatalog)
            .options(selectinload(ThemeCatalog.schedules), selectinload(ThemeCatalog.overrides))
            .where(ThemeCatalog.id == theme_id)
        )
        try:
            result = await session.execute(statement)
        except SQLAlchemyError as exc:
            logger.exception("theme factory database lookup failed")
            raise HTTPException(status_code=status.HTTP_503_SERVICE_UNAVAILABLE, detail="Theme database unavailable") from exc
        record = result.scalar_one_or_none()
        if record is None:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Theme not found")
        return record

    async def _load_state(self, session: AsyncSession | None) -> _ThemeFactoryState:
        if session is None:
            return self._fallback_state()

        try:
            catalog_result = await session.execute(
                select(ThemeCatalog).order_by(ThemeCatalog.priority.desc(), ThemeCatalog.theme_name.asc())
            )
            schedule_result = await session.execute(
                select(ThemeSchedule)
                .options(selectinload(ThemeSchedule.theme))
                .order_by(ThemeSchedule.priority.desc(), ThemeSchedule.id.asc())
            )
            override_result = await session.execute(
                select(ThemeOverride)
                .options(selectinload(ThemeOverride.theme))
                .order_by(ThemeOverride.priority.desc(), ThemeOverride.id.desc())
            )
        except Exception:  # noqa: BLE001
            logger.exception("theme factory database read failed; falling back to built-in seed data")
            return self._fallback_state()

        catalog_rows = [self._catalog_response(row) for row in catalog_result.scalars().all()]
        schedule_rows = [
            self._schedule_response(row, theme=row.theme)
            for row in schedule_result.scalars().all()
            if row.theme is not None
        ]
        override_rows = [
            self._override_response(row, theme=row.theme)
            for row in override_result.scalars().all()
            if row.theme_id is not None and row.theme is not None
        ]

        if not catalog_rows:
            return self._fallback_state()

        return _ThemeFactoryState(catalog=catalog_rows, schedules=schedule_rows, overrides=override_rows, source="database")

    @staticmethod
    def _fallback_state() -> _ThemeFactoryState:
        return _ThemeFactoryState(
            catalog=[item.model_copy(deep=True) for item in _FALLBACK_CATALOG],
            schedules=[item.model_copy(deep=True) for item in _FALLBACK_SCHEDULES],
            overrides=[item.model_copy(deep=True) for item in _FALLBACK_OVERRIDES],
            source="seed_fallback",
        )

    @staticmethod
    def _catalog_response(row: ThemeCatalog) -> ThemeCatalogResponse:
        return ThemeCatalogResponse.model_validate(row)

    @staticmethod
    def _schedule_response(row: ThemeSchedule, *, theme: ThemeCatalog | None) -> ThemeScheduleResponse:
        return ThemeScheduleResponse(
            id=row.id,
            theme_id=row.theme_id,
            theme_key=theme.theme_key if theme is not None else None,
            theme_name=theme.theme_name if theme is not None else None,
            schedule_type=row.schedule_type,
            start_date=row.start_date,
            end_date=row.end_date,
            weekday_mask=list(row.weekday_mask or []),
            month_mask=list(row.month_mask or []),
            region=row.region,
            country=row.country,
            is_active=row.is_active,
            priority=row.priority,
            notes=row.notes,
            created_at=row.created_at,
            updated_at=row.updated_at,
        )

    @staticmethod
    def _override_response(row: ThemeOverride, *, theme: ThemeCatalog | None) -> ThemeOverrideResponse:
        return ThemeOverrideResponse(
            id=row.id,
            theme_id=row.theme_id,
            theme_key=theme.theme_key if theme is not None else None,
            theme_name=theme.theme_name if theme is not None else row.theme_name,
            override_scope=row.override_scope,
            start_at=row.start_at,
            end_at=row.end_at,
            reason=row.reason,
            force_top_priority=row.force_top_priority,
            created_by=row.created_by,
            created_at=row.created_at,
            is_active=bool(row.active),
        )

    def _resolve_for_date(
        self,
        *,
        plan_date: date,
        state: _ThemeFactoryState,
        region: str | None,
        country: str | None,
    ) -> ThemeTodayResponse:
        theme_lookup = {item.id: item for item in state.catalog if item.is_active}
        target_dt = datetime.combine(plan_date, time(hour=12), tzinfo=KOLKATA_TZ)
        weekday = WEEKDAY_ORDER[plan_date.weekday()]

        override_candidates = [
            item
            for item in state.overrides
            if item.is_active and item.theme_id in theme_lookup and self._override_active_on(item, target_dt)
        ]
        override_candidates.sort(
            key=lambda item: (
                1 if item.force_top_priority else 0,
                theme_lookup[item.theme_id].priority if item.theme_id in theme_lookup else 0,
                item.created_at or datetime.min.replace(tzinfo=KOLKATA_TZ),
            ),
            reverse=True,
        )
        if override_candidates:
            chosen = override_candidates[0]
            return ThemeTodayResponse(
                timezone="Asia/Kolkata",
                plan_date=plan_date,
                weekday=weekday,
                source="override",
                schedule_type=None,
                schedule_id=None,
                override_id=chosen.id,
                resolution_note=chosen.reason,
                theme=self._resolved_theme_payload(theme_lookup.get(chosen.theme_id)),
            )

        active_schedules = [
            item
            for item in state.schedules
            if item.is_active and item.theme_id in theme_lookup and self._schedule_matches_location(item, region=region, country=country)
        ]

        date_range_candidates = [
            item
            for item in active_schedules
            if item.schedule_type in {"single_day", "date_range"} and self._schedule_matches_date(item, plan_date)
        ]
        date_range_candidates.sort(key=lambda item: (item.priority, theme_lookup[item.theme_id].priority), reverse=True)
        if date_range_candidates:
            chosen = date_range_candidates[0]
            return ThemeTodayResponse(
                timezone="Asia/Kolkata",
                plan_date=plan_date,
                weekday=weekday,
                source="schedule",
                schedule_type=chosen.schedule_type,
                schedule_id=chosen.id,
                override_id=None,
                resolution_note=chosen.notes,
                theme=self._resolved_theme_payload(theme_lookup[chosen.theme_id]),
            )

        weekly_candidates = [
            item
            for item in active_schedules
            if item.schedule_type == "weekly_recurring"
            and weekday in set(item.weekday_mask)
            and (not item.month_mask or plan_date.month in set(item.month_mask))
        ]
        weekly_candidates.sort(key=lambda item: (item.priority, theme_lookup[item.theme_id].priority), reverse=True)
        if weekly_candidates:
            chosen = weekly_candidates[0]
            return ThemeTodayResponse(
                timezone="Asia/Kolkata",
                plan_date=plan_date,
                weekday=weekday,
                source="schedule",
                schedule_type=chosen.schedule_type,
                schedule_id=chosen.id,
                override_id=None,
                resolution_note=chosen.notes,
                theme=self._resolved_theme_payload(theme_lookup[chosen.theme_id]),
            )

        monthly_candidates = [
            item
            for item in active_schedules
            if item.schedule_type == "monthly_recurring" and plan_date.month in set(item.month_mask)
        ]
        monthly_candidates.sort(key=lambda item: (item.priority, theme_lookup[item.theme_id].priority), reverse=True)
        if monthly_candidates:
            chosen = monthly_candidates[0]
            return ThemeTodayResponse(
                timezone="Asia/Kolkata",
                plan_date=plan_date,
                weekday=weekday,
                source="schedule",
                schedule_type=chosen.schedule_type,
                schedule_id=chosen.id,
                override_id=None,
                resolution_note=chosen.notes,
                theme=self._resolved_theme_payload(theme_lookup[chosen.theme_id]),
            )

        evergreen_candidates = [item for item in state.catalog if item.is_active and item.theme_type == "evergreen"]
        evergreen_candidates.sort(key=lambda item: item.priority, reverse=True)
        if evergreen_candidates:
            chosen = evergreen_candidates[0]
            return ThemeTodayResponse(
                timezone="Asia/Kolkata",
                plan_date=plan_date,
                weekday=weekday,
                source="evergreen",
                schedule_type=None,
                schedule_id=None,
                override_id=None,
                resolution_note="Resolved from evergreen fallback.",
                theme=self._resolved_theme_payload(chosen),
            )

        chosen = state.catalog[0] if state.catalog else _FALLBACK_CATALOG[0]
        return ThemeTodayResponse(
            timezone="Asia/Kolkata",
            plan_date=plan_date,
            weekday=weekday,
            source=state.source,
            schedule_type=None,
            schedule_id=None,
            override_id=None,
            resolution_note="Resolved from built-in seed fallback.",
            theme=self._resolved_theme_payload(chosen),
        )

    @staticmethod
    def _resolved_theme_payload(theme: ThemeCatalogResponse | None) -> ThemeResolvedPayload:
        source_theme = theme or _FALLBACK_CATALOG[0]
        return ThemeResolvedPayload(
            theme_id=source_theme.id,
            theme_key=source_theme.theme_key,
            theme_name=source_theme.theme_name,
            description=source_theme.description,
            theme_type=source_theme.theme_type,
            cultural_context=source_theme.cultural_context,
            tone_style=source_theme.tone_style,
            tone_funny_pct=source_theme.default_funny_pct,
            tone_emotion_pct=source_theme.default_emotion_pct,
            audience=source_theme.default_audience,
            visual_style=source_theme.default_visual_style,
            priority=source_theme.priority,
        )

    @staticmethod
    def _schedule_matches_location(schedule: ThemeScheduleResponse, *, region: str | None, country: str | None) -> bool:
        region_filter = (region or "").strip().lower()
        country_filter = (country or "").strip().lower()
        schedule_region = (schedule.region or "").strip().lower()
        schedule_country = (schedule.country or "").strip().lower()

        if region_filter and schedule_region and schedule_region != region_filter:
            return False
        if country_filter and schedule_country and schedule_country != country_filter:
            return False
        if not region_filter and schedule_region:
            return False
        if not country_filter and schedule_country:
            return False
        return True

    @staticmethod
    def _schedule_matches_date(schedule: ThemeScheduleResponse, target_date: date) -> bool:
        if schedule.schedule_type == "single_day":
            return schedule.start_date == target_date or schedule.end_date == target_date
        if schedule.start_date and schedule.start_date > target_date:
            return False
        if schedule.end_date and schedule.end_date < target_date:
            return False
        return True

    @staticmethod
    def _schedule_intersects_month(schedule: ThemeScheduleResponse, year: int, month: int) -> bool:
        first_day = date(year, month, 1)
        last_day = (first_day.replace(day=28) + timedelta(days=4)).replace(day=1) - timedelta(days=1)
        if schedule.schedule_type in {"single_day", "date_range"}:
            start = schedule.start_date or first_day
            end = schedule.end_date or last_day
            return not (end < first_day or start > last_day)
        if schedule.schedule_type == "weekly_recurring":
            return not schedule.month_mask or month in set(schedule.month_mask)
        if schedule.schedule_type == "monthly_recurring":
            return month in set(schedule.month_mask)
        return False

    @staticmethod
    def _override_active_on(override: ThemeOverrideResponse, current_dt: datetime) -> bool:
        if override.start_at and override.start_at > current_dt:
            return False
        if override.end_at and override.end_at < current_dt:
            return False
        return True


@lru_cache(maxsize=1)
def get_theme_service() -> ThemeService:
    return ThemeService()
