"""YAML-backed weekly theme schedule service."""

from __future__ import annotations

from dataclasses import dataclass, field
from datetime import datetime
from functools import lru_cache
from pathlib import Path
from typing import Any
from zoneinfo import ZoneInfo

from app.schemas.theme_schedule import TodayThemeResponse, WeeklyThemeDay, WeeklyThemeScheduleResponse

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


@dataclass(slots=True)
class ThemeService:
    """Load weekly theme schedule from config and resolve today's theme."""

    schedule_path: Path | None = None
    _schedule_path: Path = field(init=False, repr=False)
    _cached_mtime_ns: int | None = field(init=False, default=None, repr=False)
    _cached_schedule: dict[str, WeeklyThemeDay] = field(init=False, default_factory=dict, repr=False)

    def __post_init__(self) -> None:
        base_dir = Path(__file__).resolve().parents[2]
        self._schedule_path = (self.schedule_path or (base_dir / "config" / "theme_schedule.yaml")).resolve()

    def get_schedule(self) -> WeeklyThemeScheduleResponse:
        """Return the full weekly schedule in weekday order."""

        schedule = self._load_schedule()
        now = datetime.now(tz=KOLKATA_TZ)
        today_weekday = WEEKDAY_ORDER[now.weekday()]
        rows = [schedule[weekday] for weekday in WEEKDAY_ORDER if weekday in schedule]
        return WeeklyThemeScheduleResponse(
            timezone="Asia/Kolkata",
            today_weekday=today_weekday,
            schedule=rows,
        )

    def get_today_theme(self) -> TodayThemeResponse:
        """Return the theme config for the current weekday."""

        schedule = self._load_schedule()
        now = datetime.now(tz=KOLKATA_TZ)
        weekday = WEEKDAY_ORDER[now.weekday()]
        today_theme = schedule.get(weekday)
        if today_theme is None:
            raise RuntimeError(f"Theme schedule missing weekday entry: {weekday}")

        return TodayThemeResponse(
            timezone="Asia/Kolkata",
            plan_date=now.date(),
            source="theme_schedule",
            theme=today_theme,
        )

    def _load_schedule(self) -> dict[str, WeeklyThemeDay]:
        """Load and cache schedule file; reload only when file timestamp changes."""

        if not self._schedule_path.exists():
            raise RuntimeError(f"Theme schedule file not found: {self._schedule_path}")

        stat = self._schedule_path.stat()
        if self._cached_mtime_ns == stat.st_mtime_ns and self._cached_schedule:
            return self._cached_schedule

        raw_text = self._schedule_path.read_text(encoding="utf-8")
        parsed = self._parse_simple_yaml(raw_text)
        normalized: dict[str, WeeklyThemeDay] = {}

        for weekday in WEEKDAY_ORDER:
            source = parsed.get(weekday)
            if not isinstance(source, dict):
                raise RuntimeError(f"Theme schedule missing block for '{weekday}'")
            normalized[weekday] = self._normalize_day(weekday=weekday, raw=source)

        self._cached_schedule = normalized
        self._cached_mtime_ns = stat.st_mtime_ns
        return normalized

    @staticmethod
    def _parse_simple_yaml(raw_text: str) -> dict[str, dict[str, Any]]:
        """Parse a constrained YAML subset used by config/theme_schedule.yaml."""

        result: dict[str, dict[str, Any]] = {}
        current_weekday: str | None = None

        for line_no, line in enumerate(raw_text.splitlines(), start=1):
            stripped_line = line.split("#", 1)[0].rstrip()
            if not stripped_line.strip():
                continue

            indent = len(stripped_line) - len(stripped_line.lstrip(" "))
            content = stripped_line.strip()

            if indent == 0:
                if not content.endswith(":"):
                    raise RuntimeError(f"Invalid weekday line at {line_no}: {line}")
                weekday = content[:-1].strip().lower()
                if weekday not in WEEKDAY_ORDER:
                    raise RuntimeError(f"Unsupported weekday '{weekday}' at line {line_no}")
                result[weekday] = {}
                current_weekday = weekday
                continue

            if current_weekday is None:
                raise RuntimeError(f"Found field before weekday header at line {line_no}")
            if ":" not in content:
                raise RuntimeError(f"Invalid key/value at line {line_no}: {line}")

            key, value = content.split(":", 1)
            result[current_weekday][key.strip()] = ThemeService._parse_value(value.strip())

        return result

    @staticmethod
    def _parse_value(raw_value: str) -> Any:
        """Parse scalar and simple bracket-list values from schedule YAML."""

        if raw_value == "":
            return ""

        if raw_value.startswith("[") and raw_value.endswith("]"):
            inner = raw_value[1:-1].strip()
            if not inner:
                return []
            return [str(ThemeService._parse_value(item.strip())).strip() for item in inner.split(",")]

        if (raw_value.startswith('"') and raw_value.endswith('"')) or (
            raw_value.startswith("'") and raw_value.endswith("'")
        ):
            return raw_value[1:-1]

        lowered = raw_value.lower()
        if lowered in {"true", "false"}:
            return lowered == "true"

        try:
            return int(raw_value)
        except ValueError:
            return raw_value

    @staticmethod
    def _normalize_day(*, weekday: str, raw: dict[str, Any]) -> WeeklyThemeDay:
        """Validate and normalize one weekday config block."""

        tone_funny_pct = ThemeService._coerce_pct(raw.get("tone_funny_pct"), default=20)
        tone_emotion_pct = ThemeService._coerce_pct(raw.get("tone_emotion_pct"), default=80)
        keywords = raw.get("prompt_keywords")
        if isinstance(keywords, list):
            prompt_keywords = [str(item).strip() for item in keywords if str(item).strip()]
        else:
            prompt_keywords = []

        return WeeklyThemeDay(
            weekday=weekday,
            theme_name=str(raw.get("theme_name") or f"{weekday.title()} Theme"),
            audience=str(raw.get("audience") or "general audience"),
            cultural_context=str(raw.get("cultural_context") or "global"),
            tone_style=str(raw.get("tone_style") or "conversational"),
            tone_funny_pct=tone_funny_pct,
            tone_emotion_pct=tone_emotion_pct,
            visual_style=str(raw.get("visual_style") or "minimal"),
            prompt_keywords=prompt_keywords,
            avoid_cliches=bool(raw.get("avoid_cliches", True)),
        )

    @staticmethod
    def _coerce_pct(value: Any, *, default: int) -> int:
        """Normalize percentage values to integer range [0, 100]."""

        try:
            numeric = int(value)
        except (TypeError, ValueError):
            numeric = default
        return max(0, min(100, numeric))


@lru_cache(maxsize=1)
def get_theme_service() -> ThemeService:
    """Return singleton weekly theme schedule service."""

    return ThemeService()
