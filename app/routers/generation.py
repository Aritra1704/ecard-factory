"""Groq-backed generation endpoints for phrases and DALL-E prompts."""

from __future__ import annotations

import asyncio
import json
import logging
import math
from typing import Any, Literal
from uuid import uuid4

import httpx
from fastapi import APIRouter, Depends, HTTPException, Query, Request, status
from pydantic import BaseModel, Field
from sqlalchemy import select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models.comparison import ComparisonRun, ComparisonRunResult
from app.schemas.cards import CardContentUpdate, CardStatusUpdate
from app.schemas.generation import (
    DallePromptRequest,
    DallePromptResponse,
    ImageGenerationRequest,
    ImageGenerationResponse,
    ImageValidationRequest,
    ImageValidationResponse,
    PhraseGenerationRequest,
    PhraseGenerationResponse,
)
from app.services.dalle_service import DalleService
from app.services.groq_service import GroqService
from src.validation.scorer import score_result

router = APIRouter(tags=["generation"])
logger = logging.getLogger(__name__)
groq_service = GroqService()
dalle_service = DalleService()

LLM_COMPARATOR_URL = "http://localhost:8001/generate/single"
LLM_COMPARATOR_TIMEOUT_SECONDS = 90.0
LLM_COMPARATOR_BUSY_RETRY_DELAY_SECONDS = 2.0
LLM_COMPARATOR_BACKENDS = (
    {"backend": "groq", "model": "llama-3.3-70b-versatile", "trace_suffix": "groq"},
    {"backend": "ollama", "model": "qwen2.5:7b-instruct", "trace_suffix": "qwen"},
    {"backend": "ollama", "model": "llama3.1:8b", "trace_suffix": "llama"},
    {"backend": "ollama", "model": "mistral:7b", "trace_suffix": "mistral"},
)
LLM_COMPARATOR_MODEL_ORDER = {
    str(spec["model"]): index for index, spec in enumerate(LLM_COMPARATOR_BACKENDS)
}


class CompareOutputSpec(BaseModel):
    """Structured output configuration passed to the comparator."""

    format: Literal["one_liner", "paragraph", "one_page", "pros_cons", "verse", "story"] = "one_liner"
    items: int | None = Field(default=None, ge=1)
    target_words: int | None = Field(default=None, ge=1)
    items_per_section: int | None = Field(default=None, ge=1)
    line_count: int | None = Field(default=None, ge=1)
    max_words_per_line: int | None = Field(default=None, ge=1)


class CompareModelsRequest(BaseModel):
    """Request body for comparing phrase generation across configured LLM backends."""

    theme_name: str
    tone_funny_pct: int = Field(ge=0, le=100)
    tone_emotion_pct: int = Field(ge=0, le=100)
    prompt_keywords: list[str] = Field(default_factory=list)
    visual_style: str
    count: int = Field(default=3, ge=1)
    max_words: int = Field(default=16, ge=1)
    emoji_policy: Literal["none", "light", "expressive"] = "none"
    tone_style: Literal["minimal", "poetic", "conversational", "witty", "inspirational"] = "conversational"
    audience: str = "general"
    avoid_cliches: bool = True
    avoid_phrases: list[str] = Field(default_factory=list)
    style_anchor_enabled: bool = True
    output_spec: CompareOutputSpec | None = None
    judge_enabled: bool = False
    judge_mode: Literal["tie_break", "always"] = "tie_break"
    judge_provider: Literal["openai"] = "openai"


def _resolve_output_spec(payload: CompareModelsRequest) -> dict[str, Any]:
    """Resolve output spec defaults and normalize to one comparator payload shape."""

    raw_spec = payload.output_spec.model_dump(exclude_none=True) if payload.output_spec else {}
    output_format = str(raw_spec.get("format") or "one_liner")
    if output_format not in {"one_liner", "paragraph", "one_page", "pros_cons", "verse", "story"}:
        output_format = "one_liner"

    output_spec: dict[str, Any] = {"format": output_format}
    if output_format == "one_liner":
        output_spec["items"] = int(raw_spec.get("items") or payload.count or 3)
    elif output_format == "paragraph":
        output_spec["target_words"] = int(raw_spec.get("target_words") or 80)
    elif output_format == "one_page":
        output_spec["target_words"] = int(raw_spec.get("target_words") or 250)
    elif output_format == "pros_cons":
        output_spec["items_per_section"] = int(raw_spec.get("items_per_section") or 4)
    elif output_format == "verse":
        output_spec["line_count"] = int(raw_spec.get("line_count") or 10)
        output_spec["max_words_per_line"] = int(raw_spec.get("max_words_per_line") or 8)
    elif output_format == "story":
        output_spec["target_words"] = int(raw_spec.get("target_words") or 450)

    return output_spec


class CompareModelsResult(BaseModel):
    """Per-backend comparison result returned to the caller."""

    backend: str
    model: str
    success: bool
    latency_ms: int
    phrases: list[str]
    metrics: dict[str, Any] = Field(default_factory=dict)
    score: float = 0.0
    constraint_issues: bool = False
    judge_total: float | None = None
    judge_reason: str | None = None
    error: str | None = None


class CompareModelsWinner(BaseModel):
    """The selected winner across scored model outputs."""

    backend: str
    model: str
    score: float
    reason: str | None = None


class CompareModelsResponse(BaseModel):
    """Aggregate response for one model-comparison run."""

    run_id: str
    theme_name: str
    max_words: int
    emoji_policy: str
    tone_style: str
    audience: str
    avoid_cliches: bool
    total_backends: int
    succeeded: int
    results: list[CompareModelsResult]
    winner: CompareModelsWinner | None
    winner_source: Literal["baseline", "openai_judge"] = "baseline"
    judge_result: dict[str, Any] | None = None
    judge_fallback: bool = False
    slowest_model: str | None
    fastest_model: str | None
    total_time_ms: int


class CompareResultsItem(BaseModel):
    """One child backend result row for a persisted comparison run."""

    model_name: str
    backend: str
    success: bool
    score: float | None
    phrases: list[str]
    latency_ms: int | None
    error: str | None


class CompareResultsRunResponse(BaseModel):
    """One master comparison run with all child backend results."""

    run_id: str
    theme_name: str
    created_at: str
    tone_funny_pct: int
    tone_emotion_pct: int
    prompt_keywords: list[str]
    visual_style: str | None
    total_time_ms: int | None
    backends_succeeded: int | None
    winner_model: str | None
    winner_backend: str | None
    winner_score: float | None
    winner_phrases: list[str]
    results: list[CompareResultsItem]


async def _patch_cards_api(
    request: Request,
    path: str,
    payload: dict[str, object],
    *,
    failure_message: str,
) -> None:
    """Patch the cards API through the local ASGI app for consistent workflow updates."""

    transport = httpx.ASGITransport(app=request.app)
    async with httpx.AsyncClient(transport=transport, base_url=str(request.base_url)) as client:
        try:
            response = await client.patch(path, json=payload)
            response.raise_for_status()
        except httpx.HTTPError as exc:
            raise HTTPException(status_code=502, detail=failure_message) from exc


async def _call_llm_comparator(
    client: httpx.AsyncClient,
    *,
    backend: str,
    model: str,
    trace_suffix: str,
    run_id: str,
    payload: CompareModelsRequest,
    include_extended_prompt_options: bool = True,
) -> httpx.Response:
    """Submit one backend request to the local llm-comparator service."""

    request_payload: dict[str, Any] = {
        "backend": backend,
        "model": model,
        "theme_name": payload.theme_name,
        "tone_funny_pct": payload.tone_funny_pct,
        "tone_emotion_pct": payload.tone_emotion_pct,
        "prompt_keywords": payload.prompt_keywords,
        "visual_style": payload.visual_style,
        "count": payload.count,
        "temperature": 0.8,
        "trace_id": f"ecard-{run_id}-{trace_suffix}",
    }
    if include_extended_prompt_options:
        request_payload.update(
            {
                "max_words": payload.max_words,
                "emoji_policy": payload.emoji_policy,
                "tone_style": payload.tone_style,
                "audience": payload.audience,
                "avoid_cliches": payload.avoid_cliches,
                "avoid_phrases": payload.avoid_phrases,
                "style_anchor_enabled": payload.style_anchor_enabled,
                "output_spec": _resolve_output_spec(payload),
                "judge_enabled": payload.judge_enabled,
                "judge_mode": payload.judge_mode,
                "judge_provider": payload.judge_provider,
            }
        )

    response = await client.post(
        LLM_COMPARATOR_URL,
        json=request_payload,
    )
    return response


async def _call_llm_comparator_with_busy_retry(
    client: httpx.AsyncClient,
    *,
    backend: str,
    model: str,
    trace_suffix: str,
    run_id: str,
    payload: CompareModelsRequest,
    include_extended_prompt_options: bool = True,
) -> httpx.Response:
    """Call comparator once and retry exactly once after a busy (429) response."""

    response = await _call_llm_comparator(
        client,
        backend=backend,
        model=model,
        trace_suffix=trace_suffix,
        run_id=run_id,
        payload=payload,
        include_extended_prompt_options=include_extended_prompt_options,
    )
    if response.status_code != 429:
        return response

    await asyncio.sleep(LLM_COMPARATOR_BUSY_RETRY_DELAY_SECONDS)
    return await _call_llm_comparator(
        client,
        backend=backend,
        model=model,
        trace_suffix=trace_suffix,
        run_id=run_id,
        payload=payload,
        include_extended_prompt_options=include_extended_prompt_options,
    )


def _is_comparator_unreachable(error: BaseException) -> bool:
    """Return True when the local comparator service cannot be reached on port 8001."""

    return isinstance(error, (httpx.ConnectError, httpx.ConnectTimeout))


def _extract_result_error(result: dict[str, Any]) -> str:
    """Pull the most useful error string from a comparator response payload."""

    for key in ("error", "detail", "message"):
        value = result.get(key)
        if value:
            return str(value)
    return "Comparator request failed."


def _failure_result(*, backend: str, model: str, error: str) -> CompareModelsResult:
    """Create a normalized failure payload for one comparator backend."""

    return CompareModelsResult(
        backend=backend,
        model=model,
        success=False,
        latency_ms=0,
        phrases=[],
        metrics={},
        score=0.0,
        constraint_issues=False,
        error=error,
    )


def _extract_http_error(response: httpx.Response) -> str:
    """Extract a readable error message from a non-2xx comparator response."""

    try:
        payload = response.json()
    except ValueError:
        payload = None

    if isinstance(payload, dict):
        return _extract_result_error(payload)

    text = response.text.strip()
    return text or f"HTTP {response.status_code}"


def _has_constraint_issues(result: dict[str, Any]) -> bool:
    """Infer whether the comparator response reports prompt-constraint violations."""

    def _has_signal(value: Any) -> bool:
        if isinstance(value, bool):
            return value
        if isinstance(value, (int, float)):
            return value > 0
        if isinstance(value, str):
            return bool(value.strip())
        if isinstance(value, (list, tuple, set, dict)):
            return len(value) > 0
        return False

    meta = result.get("meta")
    metrics = result.get("metrics")
    meta_metrics = meta.get("metrics") if isinstance(meta, dict) else None
    containers = [result]
    if isinstance(meta, dict):
        containers.append(meta)
    if isinstance(metrics, dict):
        containers.append(metrics)
    if isinstance(meta_metrics, dict):
        containers.append(meta_metrics)

    issue_keys = (
        "constraint_issues",
        "constraints_issues",
        "violations",
        "constraint_violations",
        "issues",
        "constraint_failures",
    )
    for container in containers:
        for key in issue_keys:
            if key in container and _has_signal(container.get(key)):
                return True

    for container in containers:
        if container.get("constraints_ok") is False or container.get("constraints_passed") is False:
            return True

    return False


def _extract_model_score(meta: Any, latency_ms: int) -> float:
    """Resolve comparison score from comparator metadata with latency fallback."""

    if isinstance(meta, dict) and "score" in meta:
        try:
            return float(meta["score"])
        except (TypeError, ValueError):
            pass

    return 100.0 - (float(latency_ms) / 1000.0)


def _coerce_float(value: Any) -> float | None:
    """Convert score-like values into finite floats."""

    try:
        parsed = float(value)
    except (TypeError, ValueError):
        return None

    if not math.isfinite(parsed):
        return None
    return parsed


def _coerce_reason(value: Any) -> str | None:
    """Normalize judge reason content into a non-empty string."""

    if value is None:
        return None
    text = str(value).strip()
    return text or None


def _nested_get(mapping: Any, *keys: str) -> Any:
    """Safely traverse a nested dictionary path."""

    current = mapping
    for key in keys:
        if not isinstance(current, dict):
            return None
        current = current.get(key)
    return current


def _extract_model_entry_from_bucket(
    bucket: Any,
    *,
    model: str,
    backend: str,
) -> tuple[float | None, str | None]:
    """Extract one model's judge total/reason from list or dict shaped metadata."""

    if isinstance(bucket, list):
        for item in bucket:
            if not isinstance(item, dict):
                continue
            item_model = str(item.get("model") or item.get("model_name") or "").strip()
            item_backend = str(item.get("backend") or "").strip()
            if item_model != model:
                continue
            if item_backend and item_backend != backend:
                continue
            total = _coerce_float(item.get("total"))
            if total is None:
                total = _coerce_float(item.get("score"))
            if total is None:
                total = _coerce_float(item.get("judge_total"))
            reason = _coerce_reason(item.get("reason"))
            return total, reason
        return None, None

    if isinstance(bucket, dict):
        direct = bucket.get(model)
        if isinstance(direct, dict):
            total = _coerce_float(direct.get("total"))
            if total is None:
                total = _coerce_float(direct.get("score"))
            if total is None:
                total = _coerce_float(direct.get("judge_total"))
            reason = _coerce_reason(direct.get("reason"))
            return total, reason
        direct_total = _coerce_float(direct)
        if direct_total is not None:
            return direct_total, None

        for key, value in bucket.items():
            if not isinstance(value, dict):
                continue
            item_model = str(value.get("model") or value.get("model_name") or key).strip()
            item_backend = str(value.get("backend") or "").strip()
            if item_model != model:
                continue
            if item_backend and item_backend != backend:
                continue
            total = _coerce_float(value.get("total"))
            if total is None:
                total = _coerce_float(value.get("score"))
            if total is None:
                total = _coerce_float(value.get("judge_total"))
            reason = _coerce_reason(value.get("reason"))
            return total, reason

    return None, None


def _extract_judge_metadata(
    result: dict[str, Any],
    *,
    model: str,
    backend: str,
) -> tuple[float | None, str | None]:
    """Extract per-model judge total and reason from comparator payload shapes."""

    meta = result.get("meta") if isinstance(result.get("meta"), dict) else {}
    score_candidates = [
        result.get("judge_total"),
        result.get("judge_score"),
        _nested_get(result, "judge", "total"),
        _nested_get(result, "judge", "score"),
        _nested_get(result, "judge_result", "total"),
        _nested_get(result, "judge_result", "score"),
        meta.get("judge_total"),
        meta.get("judge_score"),
        _nested_get(meta, "judge", "total"),
        _nested_get(meta, "judge", "score"),
        _nested_get(meta, "judge_result", "total"),
        _nested_get(meta, "judge_result", "score"),
    ]
    reason_candidates = [
        result.get("judge_reason"),
        _nested_get(result, "judge", "reason"),
        _nested_get(result, "judge_result", "reason"),
        meta.get("judge_reason"),
        _nested_get(meta, "judge", "reason"),
        _nested_get(meta, "judge_result", "reason"),
    ]
    judge_total = next((value for value in (_coerce_float(candidate) for candidate in score_candidates) if value is not None), None)
    judge_reason = next((value for value in (_coerce_reason(candidate) for candidate in reason_candidates) if value is not None), None)

    bucket_candidates: list[Any] = [
        result.get("judge_result"),
        meta.get("judge_result"),
        result.get("judge"),
        meta.get("judge"),
        _nested_get(result, "judge_result", "ranking"),
        _nested_get(result, "judge_result", "models"),
        _nested_get(result, "judge_result", "model_totals"),
        _nested_get(result, "judge_result", "scores"),
        _nested_get(meta, "judge_result", "ranking"),
        _nested_get(meta, "judge_result", "models"),
        _nested_get(meta, "judge_result", "model_totals"),
        _nested_get(meta, "judge_result", "scores"),
    ]
    for bucket in bucket_candidates:
        extracted_total, extracted_reason = _extract_model_entry_from_bucket(
            bucket,
            model=model,
            backend=backend,
        )
        if judge_total is None and extracted_total is not None:
            judge_total = extracted_total
        if judge_reason is None and extracted_reason is not None:
            judge_reason = extracted_reason

    return judge_total, judge_reason


def _extract_judge_result_payload(result: dict[str, Any]) -> dict[str, Any] | None:
    """Return top-level judge result metadata when present."""

    meta = result.get("meta") if isinstance(result.get("meta"), dict) else {}
    for candidate in (result.get("judge_result"), meta.get("judge_result")):
        if isinstance(candidate, dict) and candidate:
            return candidate
    return None


def _judge_failure_signaled(result: dict[str, Any]) -> bool:
    """Infer whether comparator reported judge failure/fallback for a response."""

    meta = result.get("meta") if isinstance(result.get("meta"), dict) else {}
    containers: list[dict[str, Any]] = [result, meta]
    if isinstance(result.get("judge_result"), dict):
        containers.append(result["judge_result"])
    if isinstance(meta.get("judge_result"), dict):
        containers.append(meta["judge_result"])

    truthy_keys = (
        "judge_fallback",
        "judge_failed",
        "judge_unavailable",
        "fallback_to_baseline",
        "baseline_fallback",
        "used_baseline",
    )
    text_keys = ("judge_error", "judge_failure", "judge_message")

    for container in containers:
        for key in truthy_keys:
            if bool(container.get(key)):
                return True
        for key in text_keys:
            if _coerce_reason(container.get(key)):
                return True

    return False


def _parse_judge_entries(bucket: Any) -> list[dict[str, Any]]:
    """Normalize judge model entries from flexible payload structures."""

    entries: list[dict[str, Any]] = []

    if isinstance(bucket, list):
        for item in bucket:
            if not isinstance(item, dict):
                continue
            model = str(item.get("model") or item.get("model_name") or "").strip()
            if not model:
                continue
            total = _coerce_float(item.get("total"))
            if total is None:
                total = _coerce_float(item.get("score"))
            if total is None:
                total = _coerce_float(item.get("judge_total"))
            entries.append(
                {
                    "model": model,
                    "backend": _coerce_reason(item.get("backend")),
                    "total": total,
                    "reason": _coerce_reason(item.get("reason")),
                }
            )
        return entries

    if isinstance(bucket, dict):
        for key, value in bucket.items():
            if isinstance(value, dict):
                model = str(value.get("model") or value.get("model_name") or key).strip()
                if not model:
                    continue
                total = _coerce_float(value.get("total"))
                if total is None:
                    total = _coerce_float(value.get("score"))
                if total is None:
                    total = _coerce_float(value.get("judge_total"))
                entries.append(
                    {
                        "model": model,
                        "backend": _coerce_reason(value.get("backend")),
                        "total": total,
                        "reason": _coerce_reason(value.get("reason")),
                    }
                )
                continue

            total = _coerce_float(value)
            if total is None:
                continue
            entries.append({"model": str(key), "backend": None, "total": total, "reason": None})
        return entries

    return entries


def _build_judge_result(
    *,
    payload: CompareModelsRequest,
    results: list[CompareModelsResult],
    raw_judge_result: dict[str, Any] | None,
) -> dict[str, Any] | None:
    """Build one normalized judge payload for the frontend from model results + raw metadata."""

    per_model_map: dict[tuple[str, str], dict[str, Any]] = {}

    def upsert_entry(model: str, backend: str | None, total: float | None, reason: str | None) -> None:
        model_name = str(model).strip()
        if not model_name:
            return
        backend_name = str(backend or "").strip()
        key = (model_name, backend_name)
        if key not in per_model_map:
            per_model_map[key] = {"model": model_name, "backend": backend_name or None, "total": total, "reason": reason}
            return

        entry = per_model_map[key]
        if entry.get("total") is None and total is not None:
            entry["total"] = total
        if not entry.get("reason") and reason:
            entry["reason"] = reason
        if not entry.get("backend") and backend_name:
            entry["backend"] = backend_name

    for result in results:
        if not result.success:
            continue
        if result.judge_total is None and not result.judge_reason:
            continue
        upsert_entry(result.model, result.backend, result.judge_total, result.judge_reason)

    if isinstance(raw_judge_result, dict):
        for key in ("ranking", "models", "model_totals", "scores"):
            for entry in _parse_judge_entries(raw_judge_result.get(key)):
                upsert_entry(entry["model"], entry.get("backend"), entry.get("total"), entry.get("reason"))
        for entry in _parse_judge_entries(raw_judge_result):
            upsert_entry(entry["model"], entry.get("backend"), entry.get("total"), entry.get("reason"))

    if not per_model_map and not raw_judge_result:
        return None

    per_model_entries = sorted(
        per_model_map.values(),
        key=lambda entry: entry["total"] if isinstance(entry.get("total"), (int, float)) else float("-inf"),
        reverse=True,
    )
    ranking = [
        {
            "rank": index + 1,
            "model": entry["model"],
            "backend": entry.get("backend"),
            "total": round(float(entry["total"]), 2),
            "reason": entry.get("reason"),
        }
        for index, entry in enumerate(per_model_entries)
        if isinstance(entry.get("total"), (int, float))
    ]

    winner_model: str | None = None
    winner_backend: str | None = None
    winner_reason: str | None = None
    if isinstance(raw_judge_result, dict):
        winner_candidate = raw_judge_result.get("winner")
        if isinstance(winner_candidate, dict):
            winner_model = _coerce_reason(winner_candidate.get("model") or winner_candidate.get("model_name"))
            winner_backend = _coerce_reason(winner_candidate.get("backend"))
            winner_reason = _coerce_reason(winner_candidate.get("reason"))
        else:
            winner_model = _coerce_reason(
                raw_judge_result.get("winner_model")
                or raw_judge_result.get("winner")
                or raw_judge_result.get("top_model")
            )
            winner_backend = _coerce_reason(raw_judge_result.get("winner_backend"))
            winner_reason = _coerce_reason(raw_judge_result.get("winner_reason") or raw_judge_result.get("reason"))

    if winner_model is None and ranking:
        winner_model = str(ranking[0]["model"])
        winner_backend = _coerce_reason(ranking[0].get("backend"))
        winner_reason = _coerce_reason(ranking[0].get("reason"))

    return {
        "provider": payload.judge_provider,
        "mode": payload.judge_mode,
        "winner_model": winner_model,
        "winner_backend": winner_backend,
        "winner_reason": winner_reason,
        "ranking": ranking,
        "per_model": [
            {
                "model": entry["model"],
                "backend": entry.get("backend"),
                "total": round(float(entry["total"]), 2)
                if isinstance(entry.get("total"), (int, float))
                else None,
                "reason": entry.get("reason"),
            }
            for entry in per_model_entries
        ],
    }


def _select_judge_winner(
    *,
    results: list[CompareModelsResult],
    judge_result: dict[str, Any] | None,
) -> CompareModelsWinner | None:
    """Select winner according to judge metadata, if available."""

    successful_results = [result for result in results if result.success]
    if not successful_results:
        return None

    winner_model = _coerce_reason(judge_result.get("winner_model")) if isinstance(judge_result, dict) else None
    winner_backend = _coerce_reason(judge_result.get("winner_backend")) if isinstance(judge_result, dict) else None
    winner_reason = _coerce_reason(judge_result.get("winner_reason")) if isinstance(judge_result, dict) else None

    if winner_model:
        candidate = next(
            (
                result
                for result in successful_results
                if result.model == winner_model and (winner_backend is None or result.backend == winner_backend)
            ),
            None,
        )
        if candidate is not None:
            winner_score = candidate.judge_total if candidate.judge_total is not None else candidate.score
            return CompareModelsWinner(
                backend=candidate.backend,
                model=candidate.model,
                score=round(float(winner_score), 2),
                reason=candidate.judge_reason or winner_reason,
            )

    judged_results = [result for result in successful_results if result.judge_total is not None]
    if not judged_results:
        return None

    candidate = max(judged_results, key=lambda result: float(result.judge_total or float("-inf")))
    return CompareModelsWinner(
        backend=candidate.backend,
        model=candidate.model,
        score=round(float(candidate.judge_total or 0.0), 2),
        reason=candidate.judge_reason or winner_reason,
    )


def _has_baseline_tie(results: list[CompareModelsResult]) -> bool:
    """Return True when top two successful baseline scores are effectively tied."""

    successful = sorted((result for result in results if result.success), key=lambda result: result.score, reverse=True)
    if len(successful) < 2:
        return False
    return abs(float(successful[0].score) - float(successful[1].score)) <= 0.01


async def _select_winner(
    payload: CompareModelsRequest,
    results: list[CompareModelsResult],
) -> CompareModelsWinner | None:
    """Pick the best scored successful result."""

    _ = payload
    successful_results = [result for result in results if result.success]
    if not successful_results:
        return None

    selected = max(successful_results, key=lambda result: result.score)

    return CompareModelsWinner(
        backend=selected.backend,
        model=selected.model,
        score=round(float(selected.score), 2),
        reason=None,
    )


def _parse_json_list(value: str | None) -> list[str]:
    """Parse a JSON-encoded text column into a list of strings safely."""

    if not value:
        return []

    try:
        parsed = json.loads(value)
    except json.JSONDecodeError:
        return []

    if not isinstance(parsed, list):
        return []

    return [str(item) for item in parsed]


def _sort_comparison_results(rows: list[ComparisonRunResult]) -> list[ComparisonRunResult]:
    """Return stored comparison child rows in configured model display order."""

    return sorted(
        rows,
        key=lambda row: (LLM_COMPARATOR_MODEL_ORDER.get(row.model_name, len(LLM_COMPARATOR_MODEL_ORDER)), row.id),
    )


async def _persist_compare_results(
    db: AsyncSession,
    *,
    run_id: str,
    payload: CompareModelsRequest,
    results: list[CompareModelsResult],
    total_time_ms: int,
    winner: CompareModelsWinner | None,
) -> None:
    """Persist one comparison run (master + children) in a single transaction."""

    successful_results = [result for result in results if result.success]
    winner_result = None
    if winner is not None:
        winner_result = next(
            (
                result
                for result in successful_results
                if result.model == winner.model and result.backend == winner.backend
            ),
            None,
        )

    run = ComparisonRun(
        run_id=run_id,
        theme_name=payload.theme_name,
        tone_funny_pct=payload.tone_funny_pct,
        tone_emotion_pct=payload.tone_emotion_pct,
        prompt_keywords=json.dumps(payload.prompt_keywords),
        visual_style=payload.visual_style,
        audience=payload.audience,
        phrase_count=payload.count,
        max_words=payload.max_words,
        emoji_policy=payload.emoji_policy,
        tone_style=payload.tone_style,
        avoid_cliches=payload.avoid_cliches,
        total_time_ms=total_time_ms,
        backends_succeeded=len(successful_results),
        winner_model=winner.model if winner else None,
        winner_backend=winner.backend if winner else None,
        winner_score=winner.score if winner else None,
        winner_phrases=json.dumps(winner_result.phrases) if winner_result else None,
    )
    run.results = [
        ComparisonRunResult(
            run_id=run_id,
            model_name=result.model,
            backend=result.backend,
            success=result.success,
            score=result.score if result.success else None,
            phrases=json.dumps(result.phrases) if result.success else None,
            latency_ms=result.latency_ms,
            error_message=result.error,
        )
        for result in results
    ]

    try:
        async with db.begin():
            db.add(run)
    except SQLAlchemyError:
        await db.rollback()
        logger.exception("Failed to persist comparison run '%s'. Returning live response anyway.", run_id)


def _build_compare_run_response(row: ComparisonRun) -> CompareResultsRunResponse:
    """Build one comparison-run response from master + child ORM rows."""

    return CompareResultsRunResponse(
        run_id=row.run_id,
        theme_name=row.theme_name,
        created_at=row.created_at.isoformat() if row.created_at is not None else "",
        tone_funny_pct=row.tone_funny_pct,
        tone_emotion_pct=row.tone_emotion_pct,
        prompt_keywords=_parse_json_list(row.prompt_keywords),
        visual_style=row.visual_style,
        total_time_ms=row.total_time_ms,
        backends_succeeded=row.backends_succeeded,
        winner_model=row.winner_model,
        winner_backend=row.winner_backend,
        winner_score=row.winner_score,
        winner_phrases=_parse_json_list(row.winner_phrases),
        results=[
            CompareResultsItem(
                model_name=result.model_name,
                backend=result.backend,
                success=result.success,
                score=result.score,
                phrases=_parse_json_list(result.phrases),
                latency_ms=result.latency_ms,
                error=result.error_message,
            )
            for result in _sort_comparison_results(row.results)
        ],
    )


@router.post("/phrases", response_model=PhraseGenerationResponse)
async def generate_phrases(payload: PhraseGenerationRequest, request: Request) -> PhraseGenerationResponse:
    """Generate multiple phrase options and return the highest-scoring candidate."""

    phrases = await groq_service.generate_phrases(
        theme_name=payload.theme_name,
        tone_funny_pct=payload.tone_funny_pct,
        tone_emotion_pct=payload.tone_emotion_pct,
        prompt_keywords=payload.prompt_keywords,
        visual_style=payload.visual_style,
        event_name=payload.event_name,
        count=payload.count,
        tone_style=payload.tone_style,
        emoji_policy=payload.emoji_policy,
        style_anchor_enabled=payload.style_anchor_enabled,
    )
    best_phrase = await groq_service.select_best_phrase(
        phrases=phrases,
        theme_name=payload.theme_name,
        tone_funny_pct=payload.tone_funny_pct,
        tone_emotion_pct=payload.tone_emotion_pct,
    )

    if payload.card_id is not None:
        await _patch_cards_api(
            request,
            f"/cards/{payload.card_id}/content",
            CardContentUpdate(
                phrase=str(best_phrase["text"]),
                candidate_phrases=phrases,
            ).model_dump(exclude_none=True),
            failure_message=f"Failed to update phrase for card {payload.card_id}.",
        )
        await _patch_cards_api(
            request,
            f"/cards/{payload.card_id}/status",
            CardStatusUpdate(status="pending_phrase_approval").model_dump(),
            failure_message=f"Failed to update status for card {payload.card_id}.",
        )

    return PhraseGenerationResponse(
        phrases=phrases,
        best_phrase=best_phrase,
        card_id=payload.card_id,
    )


@router.post("/dalle-prompt", response_model=DallePromptResponse)
async def generate_dalle_prompt(
    payload: DallePromptRequest,
    request: Request,
) -> DallePromptResponse:
    """Generate a DALL-E-ready prompt and optionally store it on the card record."""

    dalle_prompt = await groq_service.generate_dalle_prompt(
        phrase=payload.phrase,
        theme_name=payload.theme_name,
        color_palette=payload.color_palette,
        visual_style=payload.visual_style,
        prompt_keywords=payload.prompt_keywords,
    )

    if payload.card_id is not None:
        await _patch_cards_api(
            request,
            f"/cards/{payload.card_id}/content",
            CardContentUpdate(dalle_prompt=dalle_prompt).model_dump(exclude_none=True),
            failure_message=f"Failed to update DALL-E prompt for card {payload.card_id}.",
        )

    return DallePromptResponse(dalle_prompt=dalle_prompt, card_id=payload.card_id)


@router.post("/image", response_model=ImageGenerationResponse)
async def generate_image(payload: ImageGenerationRequest) -> ImageGenerationResponse:
    """Generate a DALL-E image, then validate it before returning the result."""

    generation_result = await dalle_service.generate_image(
        dalle_prompt=payload.dalle_prompt,
        card_id=payload.card_id,
        size=payload.size,
        quality=payload.quality,
    )
    validation = await dalle_service.validate_image(generation_result["image_url"])
    if not validation["valid"]:
        raise HTTPException(status_code=422, detail=validation)

    return ImageGenerationResponse(**generation_result)


@router.post("/image/validate", response_model=ImageValidationResponse)
async def validate_generated_image(payload: ImageValidationRequest) -> ImageValidationResponse:
    """Validate an image URL against the production rules used for generated assets."""

    validation = await dalle_service.validate_image(payload.image_url)
    return ImageValidationResponse(**validation)


@router.post("/compare-models", response_model=CompareModelsResponse)
async def compare_models(
    payload: CompareModelsRequest,
    db: AsyncSession = Depends(get_db),
) -> CompareModelsResponse:
    """Compare phrase generation responses across the configured LLM backends."""

    run_id = str(uuid4())
    results: list[CompareModelsResult] = []
    raw_judge_result: dict[str, Any] | None = None
    judge_failure_detected = False
    send_extended_prompt_options = True
    async with httpx.AsyncClient(timeout=LLM_COMPARATOR_TIMEOUT_SECONDS) as client:
        for index, spec in enumerate(LLM_COMPARATOR_BACKENDS):
            backend = str(spec["backend"])
            model = str(spec["model"])
            trace_suffix = str(spec["trace_suffix"])

            response: httpx.Response | None = None
            try:
                response = await _call_llm_comparator_with_busy_retry(
                    client,
                    backend=backend,
                    model=model,
                    trace_suffix=trace_suffix,
                    run_id=run_id,
                    payload=payload,
                    include_extended_prompt_options=send_extended_prompt_options,
                )
            except httpx.ConnectTimeout as exc:
                if index == 0:
                    raise HTTPException(status_code=503, detail="LLM comparator not running on port 8001") from exc
                results.append(_failure_result(backend=backend, model=model, error="timeout after 90s"))
                continue
            except httpx.TimeoutException:
                results.append(_failure_result(backend=backend, model=model, error="timeout after 90s"))
                continue
            except httpx.HTTPError as exc:
                if index == 0 and _is_comparator_unreachable(exc):
                    raise HTTPException(status_code=503, detail="LLM comparator not running on port 8001") from exc
                results.append(_failure_result(backend=backend, model=model, error=str(exc)))
                continue

            if response.status_code in {400, 422} and send_extended_prompt_options:
                try:
                    # Graceful fallback for older llm-comparator versions that reject new prompt fields.
                    response = await _call_llm_comparator_with_busy_retry(
                        client,
                        backend=backend,
                        model=model,
                        trace_suffix=trace_suffix,
                        run_id=run_id,
                        payload=payload,
                        include_extended_prompt_options=False,
                    )
                except httpx.ConnectTimeout as exc:
                    if index == 0:
                        raise HTTPException(status_code=503, detail="LLM comparator not running on port 8001") from exc
                    results.append(_failure_result(backend=backend, model=model, error="timeout after 90s"))
                    continue
                except httpx.TimeoutException:
                    results.append(_failure_result(backend=backend, model=model, error="timeout after 90s"))
                    continue
                except httpx.HTTPError as exc:
                    if index == 0 and _is_comparator_unreachable(exc):
                        raise HTTPException(status_code=503, detail="LLM comparator not running on port 8001") from exc
                    results.append(_failure_result(backend=backend, model=model, error=str(exc)))
                    continue
                send_extended_prompt_options = False

            if response.status_code == 429:
                results.append(_failure_result(backend=backend, model=model, error="busy"))
                continue

            if response.is_error:
                results.append(
                    _failure_result(
                        backend=backend,
                        model=model,
                        error=_extract_http_error(response),
                    )
                )
                continue

            try:
                result = response.json()
            except ValueError:
                results.append(
                    _failure_result(
                        backend=backend,
                        model=model,
                        error="Invalid JSON response from comparator.",
                    )
                )
                continue

            if not bool(result.get("ok")):
                results.append(
                    _failure_result(
                        backend=backend,
                        model=model,
                        error=_extract_result_error(result),
                    )
                )
                continue

            items = result.get("items")
            meta = result.get("meta")
            latency_ms = int(meta.get("latency_ms", 0)) if isinstance(meta, dict) else 0
            phrases = [str(item) for item in items] if isinstance(items, list) else []
            scoring = score_result(payload.model_dump(), phrases)
            score = _extract_model_score(meta, latency_ms)
            constraint_issues = bool(scoring.get("constraint_issues", False)) or _has_constraint_issues(result)
            judge_total, judge_reason = _extract_judge_metadata(result, model=model, backend=backend)
            judge_payload = _extract_judge_result_payload(result)
            if isinstance(judge_payload, dict):
                raw_judge_result = judge_payload
            if _judge_failure_signaled(result):
                judge_failure_detected = True
            results.append(
                CompareModelsResult(
                    backend=backend,
                    model=model,
                    success=True,
                    latency_ms=latency_ms,
                    phrases=phrases,
                    metrics=scoring,
                    score=score,
                    constraint_issues=constraint_issues,
                    judge_total=judge_total,
                    judge_reason=judge_reason,
                    error=None,
                )
            )

    succeeded = sum(1 for result in results if result.success)
    successful_results = [result for result in results if result.success]
    fastest_model = (
        min(successful_results, key=lambda result: result.latency_ms).model if successful_results else None
    )
    slowest_model = (
        max(successful_results, key=lambda result: result.latency_ms).model if successful_results else None
    )
    total_time_ms = sum(max(0, int(result.latency_ms or 0)) for result in results)
    baseline_winner = await _select_winner(payload, results)
    judge_result = _build_judge_result(payload=payload, results=results, raw_judge_result=raw_judge_result)
    judge_winner = _select_judge_winner(results=results, judge_result=judge_result) if payload.judge_enabled else None
    tie_break_required = _has_baseline_tie(results)
    winner = baseline_winner
    winner_source: Literal["baseline", "openai_judge"] = "baseline"
    if payload.judge_enabled and judge_winner is not None:
        if payload.judge_mode == "always" or tie_break_required or baseline_winner is None:
            winner = judge_winner
            winner_source = "openai_judge"

    judge_needed = payload.judge_enabled and (payload.judge_mode == "always" or tie_break_required or baseline_winner is None)
    judge_fallback = bool(payload.judge_enabled and (judge_failure_detected or (judge_needed and judge_winner is None)))
    await _persist_compare_results(
        db,
        run_id=run_id,
        payload=payload,
        results=results,
        total_time_ms=total_time_ms,
        winner=winner,
    )

    return CompareModelsResponse(
        run_id=run_id,
        theme_name=payload.theme_name,
        max_words=payload.max_words,
        emoji_policy=payload.emoji_policy,
        tone_style=payload.tone_style,
        audience=payload.audience,
        avoid_cliches=payload.avoid_cliches,
        total_backends=len(LLM_COMPARATOR_BACKENDS),
        succeeded=succeeded,
        results=results,
        winner=winner,
        winner_source=winner_source,
        judge_result=judge_result,
        judge_fallback=judge_fallback,
        slowest_model=slowest_model,
        fastest_model=fastest_model,
        total_time_ms=total_time_ms,
    )


@router.get("/compare-results", response_model=list[CompareResultsRunResponse])
async def get_compare_results(
    offset: int = Query(default=0, ge=0),
    limit: int = Query(default=20, ge=1, le=50),
    db: AsyncSession = Depends(get_db),
) -> list[CompareResultsRunResponse]:
    """Return persisted comparison runs (master + children), newest first."""

    statement = (
        select(ComparisonRun)
        .options(selectinload(ComparisonRun.results))
        .order_by(ComparisonRun.created_at.desc(), ComparisonRun.id.desc())
        .offset(offset)
        .limit(limit)
    )
    rows = (await db.execute(statement)).scalars().all()
    return [_build_compare_run_response(row) for row in rows]


@router.get("/compare-results/{run_id}", response_model=CompareResultsRunResponse)
async def get_compare_result_detail(
    run_id: str,
    db: AsyncSession = Depends(get_db),
) -> CompareResultsRunResponse:
    """Return one persisted comparison run (master + children)."""

    statement = (
        select(ComparisonRun)
        .options(selectinload(ComparisonRun.results))
        .where(ComparisonRun.run_id == run_id)
    )
    row = (await db.execute(statement)).scalars().first()
    if row is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comparison run not found.")

    return _build_compare_run_response(row)
