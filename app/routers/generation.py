"""Groq-backed generation endpoints for phrases and DALL-E prompts."""

from __future__ import annotations

import asyncio
import json
from collections import defaultdict
from time import perf_counter
from typing import Any, Literal
from uuid import uuid4

import httpx
from fastapi import APIRouter, Depends, HTTPException, Request, status
from pydantic import BaseModel, Field
from sqlalchemy import func, select
from sqlalchemy.exc import SQLAlchemyError
from sqlalchemy.ext.asyncio import AsyncSession

from app.config import settings
from app.database import get_db
from app.models.llm_comparison_run import LLMComparisonRun
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
    slowest_model: str | None
    fastest_model: str | None
    total_time_ms: int


class CompareResultsSummaryItem(BaseModel):
    """One persisted model result as returned in compare history summaries."""

    model_name: str
    success: bool
    latency_ms: int
    phrases: list[str]


class CompareResultsSummaryResponse(BaseModel):
    """One grouped comparison run returned in the history list."""

    run_id: str
    theme_name: str
    created_at: str
    results: list[CompareResultsSummaryItem]


class CompareResultsDetailItem(BaseModel):
    """Full stored detail for one model result within a comparison run."""

    backend: str
    model_name: str
    success: bool
    latency_ms: int
    phrases: list[str]
    error_message: str | None = None


class CompareResultsDetailResponse(BaseModel):
    """Full persisted detail for one comparison run."""

    run_id: str
    theme_name: str
    created_at: str
    results: list[CompareResultsDetailItem]


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


def _build_tie_break_prompt(
    payload: CompareModelsRequest,
    candidate_a: CompareModelsResult,
    candidate_b: CompareModelsResult,
) -> str:
    """Build a compact, deterministic tie-break prompt for the local judge model."""

    request_snapshot = {
        "theme_name": payload.theme_name,
        "prompt_keywords": payload.prompt_keywords,
        "tone_funny_pct": payload.tone_funny_pct,
        "tone_emotion_pct": payload.tone_emotion_pct,
        "tone_style": payload.tone_style,
        "audience": payload.audience,
        "visual_style": payload.visual_style,
        "max_words": payload.max_words,
        "emoji_policy": payload.emoji_policy,
        "avoid_cliches": payload.avoid_cliches,
        "avoid_phrases": payload.avoid_phrases,
        "count": payload.count,
    }
    return (
        "Evaluate two candidate phrase sets for the same prompt constraints.\n"
        "Return strict JSON only: {\"winner\":\"A|B\",\"reason\":\"<short reason>\"}\n\n"
        f"Request:\n{json.dumps(request_snapshot, ensure_ascii=True)}\n\n"
        f"Candidate A ({candidate_a.backend}/{candidate_a.model}):\n"
        f"{json.dumps(candidate_a.phrases, ensure_ascii=True)}\n\n"
        f"Candidate B ({candidate_b.backend}/{candidate_b.model}):\n"
        f"{json.dumps(candidate_b.phrases, ensure_ascii=True)}\n"
    )


def _parse_json_from_judge_content(content: str) -> dict[str, Any] | None:
    """Parse judge output JSON robustly even if wrapped with extra text."""

    candidate = content.strip()
    if not candidate:
        return None

    try:
        parsed = json.loads(candidate)
        return parsed if isinstance(parsed, dict) else None
    except json.JSONDecodeError:
        pass

    start = candidate.find("{")
    end = candidate.rfind("}")
    if start == -1 or end == -1 or end <= start:
        return None

    try:
        parsed = json.loads(candidate[start : end + 1])
    except json.JSONDecodeError:
        return None
    return parsed if isinstance(parsed, dict) else None


async def _run_tie_break_judge(
    payload: CompareModelsRequest,
    candidate_a: CompareModelsResult,
    candidate_b: CompareModelsResult,
) -> tuple[str | None, str | None]:
    """Use a local judge model only when top deterministic scores are too close."""

    if settings.judge_backend.strip().lower() != "ollama":
        return None, None

    prompt = _build_tie_break_prompt(payload, candidate_a, candidate_b)
    judge_url = "http://localhost:11434/api/chat"
    body = {
        "model": settings.judge_model,
        "messages": [
            {
                "role": "system",
                "content": (
                    "You are an evaluation judge for greeting-card phrases. "
                    "Respond with valid JSON only."
                ),
            },
            {"role": "user", "content": prompt},
        ],
        "stream": False,
        "format": "json",
        "options": {"temperature": 0},
    }
    try:
        async with httpx.AsyncClient(timeout=settings.judge_timeout_seconds) as client:
            response = await client.post(judge_url, json=body)
            response.raise_for_status()
            payload_json = response.json()
    except (httpx.HTTPError, ValueError):
        return None, None

    if not isinstance(payload_json, dict):
        return None, None

    message = payload_json.get("message")
    content = message.get("content") if isinstance(message, dict) else None
    if not isinstance(content, str):
        return None, None

    parsed = _parse_json_from_judge_content(content)
    if not isinstance(parsed, dict):
        return None, None

    winner = str(parsed.get("winner", "")).strip().upper()
    if winner not in {"A", "B"}:
        return None, None

    reason = str(parsed.get("reason", "")).strip() or None
    return winner, reason


async def _select_winner(
    payload: CompareModelsRequest,
    results: list[CompareModelsResult],
) -> CompareModelsWinner | None:
    """Pick the best scored result, with optional judge tie-break when very close."""

    successful_results = [result for result in results if result.success]
    if not successful_results:
        return None

    ranked = sorted(successful_results, key=lambda result: result.score, reverse=True)
    selected = ranked[0]
    reason: str | None = None
    if len(ranked) >= 2 and abs(ranked[0].score - ranked[1].score) <= 5.0:
        judge_winner, judge_reason = await _run_tie_break_judge(payload, ranked[0], ranked[1])
        if judge_winner == "B":
            selected = ranked[1]
        if judge_winner in {"A", "B"}:
            reason = judge_reason or f"Tie-break judge selected candidate {judge_winner}."

    return CompareModelsWinner(
        backend=selected.backend,
        model=selected.model,
        score=round(float(selected.score), 2),
        reason=reason,
    )


def _comparison_backend_key(result: CompareModelsResult) -> str:
    """Build the persisted backend key for one compare-model result row."""

    return f"{result.backend}_{result.model.replace(':', '').replace('.', '')}"


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


def _sort_comparison_rows(rows: list[LLMComparisonRun]) -> list[LLMComparisonRun]:
    """Return stored comparison rows in the configured model display order."""

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
) -> None:
    """Persist one comparison run as four separate rows."""

    db.add_all(
        [
            LLMComparisonRun(
                run_id=run_id,
                theme_name=payload.theme_name,
                tone_funny_pct=payload.tone_funny_pct,
                tone_emotion_pct=payload.tone_emotion_pct,
                prompt_keywords=json.dumps(payload.prompt_keywords),
                visual_style=payload.visual_style,
                phrase_count=payload.count,
                backend=_comparison_backend_key(result),
                model_name=result.model,
                success=result.success,
                phrases=json.dumps(result.phrases) if result.success else None,
                latency_ms=result.latency_ms if result.success else None,
                error_message=result.error,
            )
            for result in results
        ]
    )

    try:
        await db.commit()
    except SQLAlchemyError as exc:
        await db.rollback()
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Failed to save comparison results.",
        ) from exc


def _build_history_summary(
    *,
    run_id: str,
    theme_name: str,
    created_at: str,
    rows: list[LLMComparisonRun],
) -> CompareResultsSummaryResponse:
    """Build one grouped history response from persisted rows."""

    return CompareResultsSummaryResponse(
        run_id=run_id,
        theme_name=theme_name,
        created_at=created_at,
        results=[
            CompareResultsSummaryItem(
                model_name=row.model_name,
                success=row.success,
                latency_ms=row.latency_ms or 0,
                phrases=_parse_json_list(row.phrases),
            )
            for row in _sort_comparison_rows(rows)
        ],
    )


def _build_detail_response(rows: list[LLMComparisonRun]) -> CompareResultsDetailResponse:
    """Build the detail payload for a single persisted comparison run."""

    ordered_rows = _sort_comparison_rows(rows)
    created_at = max(
        (row.created_at for row in ordered_rows if row.created_at is not None),
        default=None,
    )

    return CompareResultsDetailResponse(
        run_id=ordered_rows[0].run_id,
        theme_name=ordered_rows[0].theme_name,
        created_at=created_at.isoformat() if created_at is not None else "",
        results=[
            CompareResultsDetailItem(
                backend=row.backend,
                model_name=row.model_name,
                success=row.success,
                latency_ms=row.latency_ms or 0,
                phrases=_parse_json_list(row.phrases),
                error_message=row.error_message,
            )
            for row in ordered_rows
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
    started_at = perf_counter()
    results: list[CompareModelsResult] = []
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
            score = float(scoring.get("score", 0.0))
            constraint_issues = bool(scoring.get("constraint_issues", False)) or _has_constraint_issues(result)
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
    total_time_ms = int((perf_counter() - started_at) * 1000)
    winner = await _select_winner(payload, results)
    await _persist_compare_results(
        db,
        run_id=run_id,
        payload=payload,
        results=results,
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
        slowest_model=slowest_model,
        fastest_model=fastest_model,
        total_time_ms=total_time_ms,
    )


@router.get("/compare-results", response_model=list[CompareResultsSummaryResponse])
async def get_compare_results(
    db: AsyncSession = Depends(get_db),
) -> list[CompareResultsSummaryResponse]:
    """Return the most recent grouped comparison runs."""

    summary_statement = (
        select(
            LLMComparisonRun.run_id.label("run_id"),
            func.max(LLMComparisonRun.theme_name).label("theme_name"),
            func.max(LLMComparisonRun.created_at).label("created_at"),
        )
        .group_by(LLMComparisonRun.run_id)
        .order_by(func.max(LLMComparisonRun.created_at).desc())
        .limit(20)
    )
    summary_rows = (await db.execute(summary_statement)).all()
    run_ids = [str(row.run_id) for row in summary_rows]
    if not run_ids:
        return []

    detail_statement = (
        select(LLMComparisonRun)
        .where(LLMComparisonRun.run_id.in_(run_ids))
        .order_by(LLMComparisonRun.created_at.desc(), LLMComparisonRun.id.desc())
    )
    persisted_rows = (await db.execute(detail_statement)).scalars().all()
    grouped_rows: dict[str, list[LLMComparisonRun]] = defaultdict(list)
    for row in persisted_rows:
        grouped_rows[row.run_id].append(row)

    return [
        _build_history_summary(
            run_id=str(row.run_id),
            theme_name=str(row.theme_name),
            created_at=row.created_at.isoformat() if row.created_at is not None else "",
            rows=grouped_rows.get(str(row.run_id), []),
        )
        for row in summary_rows
    ]


@router.get("/compare-results/{run_id}", response_model=CompareResultsDetailResponse)
async def get_compare_result_detail(
    run_id: str,
    db: AsyncSession = Depends(get_db),
) -> CompareResultsDetailResponse:
    """Return the full persisted detail for one comparison run."""

    statement = (
        select(LLMComparisonRun)
        .where(LLMComparisonRun.run_id == run_id)
        .order_by(LLMComparisonRun.created_at.desc(), LLMComparisonRun.id.desc())
    )
    rows = (await db.execute(statement)).scalars().all()
    if not rows:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Comparison run not found.")

    return _build_detail_response(rows)
