"""HTTP client that maps workflow_v1 job state into ContentForge requests."""

from __future__ import annotations

import logging
import math
from typing import Any

import httpx

from app.services.content_shortlist_service import build_shortlist_seed, score_content_candidate

logger = logging.getLogger(__name__)

_SUPPORTED_TONE_STYLES = {"minimal", "poetic", "conversational", "witty", "inspirational"}
_SUPPORTED_CULTURAL_CONTEXTS = {
    "global",
    "indian",
    "bengali",
    "punjabi",
    "south_indian",
    "western",
    "american",
    "asian",
}
_SUPPORTED_OUTPUT_FORMATS = {"one_liner", "paragraph", "one_page", "pros_cons", "verse", "story"}


class ContentForgeWorkflowClient:
    """Prefer the real ContentForge service and fall back to the local stub when needed."""

    def __init__(
        self,
        *,
        enabled: bool,
        base_url: str,
        timeout_seconds: float,
        model_names: list[str],
        fallback_client: Any,
    ) -> None:
        self._enabled = enabled
        self._base_url = base_url.rstrip("/")
        self._timeout_seconds = timeout_seconds
        self._model_names = [item.strip() for item in model_names if item.strip()]
        self._fallback = fallback_client

    async def generate_and_judge(self, payload) -> dict[str, Any]:
        """Return a ranked candidate pool plus shortlist for the initial content stage."""

        remote = await self._generate_remote(payload, count_per_model=10, seed=None)
        if remote is not None:
            return remote
        return await self._fallback.generate_and_judge(payload)

    async def generate_more_candidates(
        self,
        payload,
        *,
        count: int,
        start_index: int,
    ) -> list[dict[str, Any]]:
        """Return more candidates for the same prompt while preserving graceful fallback."""

        safe_count = max(1, min(int(count), 30))
        per_model_count = max(1, min(10, math.ceil(safe_count / max(len(self._model_names), 1))))
        remote = await self._generate_remote(payload, count_per_model=per_model_count, seed=max(start_index, 0))
        if remote is not None:
            ranked = sorted(
                list(remote.get("candidates") or []),
                key=lambda item: (
                    float(item.get("judged_score") or item.get("judge_score") or 0.0),
                    float(item.get("raw_score") or 0.0),
                    str(item.get("model") or ""),
                ),
                reverse=True,
            )
            return ranked[:safe_count]
        return await self._fallback.generate_more_candidates(
            payload,
            count=safe_count,
            start_index=max(start_index, 0),
        )

    async def _generate_remote(
        self,
        payload,
        *,
        count_per_model: int,
        seed: int | None,
    ) -> dict[str, Any] | None:
        """Call the real ContentForge service and normalize its response for workflow_v1."""

        if not self._enabled or not self._model_names:
            return None

        target_words = self._resolve_target_words(payload)
        request_body = {
            "theme_name": str(payload.theme_name or "Untitled Theme").strip() or "Untitled Theme",
            "tone_funny_pct": int(payload.tone_funny_pct),
            "tone_emotion_pct": int(payload.tone_emotion_pct),
            "prompt_keywords": self._build_prompt_keywords(payload),
            "visual_style": self._resolve_visual_style(payload),
            "targets": [{"backend": "ollama", "model": model} for model in self._model_names],
            "count": max(1, min(int(count_per_model), 10)),
            "max_tokens": 300,
            "temperature": 0.8,
            "max_words": target_words,
            "emoji_policy": "none",
            "tone_style": self._map_tone_style(str(payload.tone_style or "")),
            "audience": str(payload.audience or "general").strip() or "general",
            "cultural_context": self._map_cultural_context(str(payload.cultural_context or "")),
            "avoid_cliches": bool(payload.avoid_cliches),
            "output_format": "numbered",
            "output_spec": self._build_output_spec(payload, target_words=target_words, count_per_model=count_per_model),
        }
        trace_id = getattr(payload, "trace_id", None)
        if trace_id:
            request_body["trace_id"] = str(trace_id).strip()
        if seed is not None:
            request_body["seed"] = int(seed)

        try:
            async with httpx.AsyncClient(
                base_url=self._base_url,
                timeout=self._timeout_seconds,
                follow_redirects=True,
            ) as client:
                response = await client.post("/generate/compare-models", json=request_body)
                response.raise_for_status()
                body = response.json()
        except (httpx.HTTPError, ValueError) as exc:
            logger.warning("contentforge compare-models failed, falling back to stub: %s", exc)
            return None

        if not isinstance(body, dict):
            logger.warning("contentforge compare-models returned unexpected payload type: %s", type(body).__name__)
            return None

        candidates = self._build_candidate_rows(
            body=body,
            target_words=target_words,
        )
        if not candidates:
            logger.warning("contentforge compare-models returned no usable ranked candidates")
            return None

        shortlist = self._build_shortlist_rows(
            body=body,
            candidates=candidates,
            target_words=target_words,
        )
        shortlist_signatures = {
            (str(item.get("model") or ""), str(item.get("content_text") or ""))
            for item in shortlist
        }

        ranked_candidates = sorted(
            candidates,
            key=lambda item: (
                float(item.get("judged_score") or item.get("judge_score") or 0.0),
                float(item.get("raw_score") or 0.0),
                str(item.get("model") or ""),
            ),
            reverse=True,
        )
        for candidate in ranked_candidates:
            signature = (str(candidate.get("model") or ""), str(candidate.get("content_text") or ""))
            candidate["is_shortlisted"] = signature in shortlist_signatures
            candidate["is_selected"] = False
            candidate["is_winner"] = False

        winner = next(
            (
                candidate
                for candidate in ranked_candidates
                if (str(candidate.get("model") or ""), str(candidate.get("content_text") or "")) in shortlist_signatures
            ),
            ranked_candidates[0],
        )
        winner["is_winner"] = True

        winner_meta = body.get("winner") if isinstance(body.get("winner"), dict) else {}
        successful_results = [
            result
            for result in list(body.get("results") or [])
            if isinstance(result, dict) and bool(result.get("ok"))
        ]
        why_winner = str(body.get("why_winner") or body.get("judge_reason") or "").strip()
        judge_summary = (
            f"ContentForge returned {len(candidates)} ranked candidates across {len(successful_results)} successful model runs. "
            f"Shortlisted top {len(shortlist)} from the service-owned ranking."
        )
        if why_winner:
            judge_summary = f"{judge_summary} {why_winner}"

        ranking_summary = body.get("ranking_summary") if isinstance(body.get("ranking_summary"), dict) else {}

        return {
            "source": "contentforge",
            "used_stub": False,
            "candidates": candidates,
            "shortlist": shortlist,
            "winner": winner,
            "judge_summary": judge_summary,
            "judge_provider": f"contentforge_{str(body.get('winner_source') or 'baseline')}",
            "judge_model": str(winner_meta.get("model") or winner.get("model") or ""),
            "leaderboard_json": {
                "winner_source": str(body.get("winner_source") or "baseline"),
                "winner": winner_meta,
                "models": [
                    {
                        "backend": str(result.get("backend") or ""),
                        "model": str(result.get("model") or ""),
                        "quality_total": int(
                            ((result.get("quality") or {}) if isinstance(result.get("quality"), dict) else {}).get("total") or 0
                        ),
                        "item_count": len(list(result.get("items") or [])),
                    }
                    for result in successful_results
                ],
                "ranked_candidates": list(body.get("ranked_candidates") or []),
                "shortlist": shortlist,
                "ranking_summary": ranking_summary,
            },
            "pairwise_json": {},
            "reason_summary": why_winner or judge_summary,
        }

    @staticmethod
    def _build_prompt_keywords(payload) -> list[str]:
        keywords = [str(payload.theme_name or "").strip(), str(payload.audience or "").strip()]
        return [item for item in keywords if item]

    @staticmethod
    def _resolve_visual_style(payload) -> str:
        rendering = getattr(payload, "rendering", None)
        explicit = str(getattr(rendering, "theme_style", "") or "").strip().lower()
        if explicit:
            return explicit
        metadata = getattr(getattr(payload, "output_spec", None), "metadata", None)
        if isinstance(metadata, dict):
            fallback = str(metadata.get("default_visual_style") or "").strip().lower()
            if fallback:
                return fallback
        return "minimal"

    @staticmethod
    def _resolve_target_words(payload) -> int:
        output_spec = getattr(payload, "output_spec", None)
        length = getattr(output_spec, "length", None)
        target = int(getattr(length, "target_words", 16) or 16)
        return min(max(target, 4), 120)

    @staticmethod
    def _map_tone_style(value: str) -> str:
        normalized = value.strip().lower()
        if normalized in _SUPPORTED_TONE_STYLES:
            return normalized
        if normalized in {"heartfelt", "warm_note", "warm", "romantic"}:
            return "poetic"
        if normalized in {"playful", "festive", "funny", "humorous"}:
            return "witty"
        if normalized in {"short_crisp", "crisp"}:
            return "minimal"
        return "conversational"

    @staticmethod
    def _map_cultural_context(value: str) -> str:
        normalized = value.strip().lower().replace("-", "_").replace(" ", "_")
        if normalized == "southindian":
            normalized = "south_indian"
        return normalized if normalized in _SUPPORTED_CULTURAL_CONTEXTS else "global"

    @staticmethod
    def _build_output_spec(payload, *, target_words: int, count_per_model: int) -> dict[str, Any]:
        requested = str(getattr(getattr(payload, "output_spec", None), "format", "") or "").strip().lower()
        if requested not in _SUPPORTED_OUTPUT_FORMATS:
            requested = "paragraph" if target_words > 24 else "one_liner"

        spec: dict[str, Any] = {
            "format": requested,
            "length": {"target_words": target_words},
            "structure": {"no_lists": True, "no_numbering": True},
        }
        if requested == "one_liner":
            spec["structure"]["items"] = max(1, min(int(count_per_model), 10))
        return spec

    @staticmethod
    def _build_candidate_rows(
        *,
        body: dict[str, Any],
        target_words: int,
    ) -> list[dict[str, Any]]:
        ranked_candidates = [
            item
            for item in list(body.get("ranked_candidates") or [])
            if isinstance(item, dict) and str(item.get("text") or "").strip()
        ]
        if ranked_candidates:
            candidates: list[dict[str, Any]] = []
            for item in ranked_candidates:
                text = " ".join(str(item.get("text") or "").strip().split())
                if not text:
                    continue
                score = round(float(item.get("score") or 0.0), 4)
                model_score = max(0.0, min(1.0, float(item.get("model_score") or 0.0) / 100.0))
                candidates.append(
                    {
                        "model": str(item.get("model") or "unknown"),
                        "backend": str(item.get("backend") or "ollama"),
                        "content_text": text,
                        "text": text,
                        "raw_score": round(model_score, 4),
                        "judge_score": score,
                        "judged_score": score,
                        "contentforge_rank": int(item.get("rank") or 0) or None,
                        "reason": str(item.get("reason") or "").strip(),
                        "reason_codes": [str(code).strip() for code in list(item.get("reason_codes") or []) if str(code).strip()],
                        "is_winner": False,
                        "is_shortlisted": False,
                        "is_selected": False,
                    }
                )
            if candidates:
                return candidates

        results = list(body.get("results") or [])
        candidates: list[dict[str, Any]] = []
        for result in results:
            if not isinstance(result, dict) or not bool(result.get("ok")):
                continue
            backend = str(result.get("backend") or "ollama")
            model = str(result.get("model") or "unknown")
            quality = result.get("quality") if isinstance(result.get("quality"), dict) else {}
            model_total = int(quality.get("total") or 0)
            raw_score = round(max(0.35, min(1.1, model_total / 100.0)), 4)
            for index, raw_text in enumerate(list(result.get("items") or [])):
                text = " ".join(str(raw_text or "").strip().split())
                if not text:
                    continue
                candidate = {
                    "model": model,
                    "backend": backend,
                    "content_text": text,
                    "text": text,
                    "raw_score": round(max(0.1, raw_score - (index * 0.004)), 4),
                    "judge_score": 0.0,
                    "judged_score": 0.0,
                    "is_winner": False,
                    "is_shortlisted": False,
                    "is_selected": False,
                }
                judged_score = round(
                    score_content_candidate(candidate, target_words=target_words),
                    4,
                )
                candidate["judge_score"] = judged_score
                candidate["judged_score"] = judged_score
                candidates.append(candidate)
        return candidates

    @staticmethod
    def _build_shortlist_rows(
        *,
        body: dict[str, Any],
        candidates: list[dict[str, Any]],
        target_words: int,
    ) -> list[dict[str, Any]]:
        remote_shortlist = [
            item
            for item in list(body.get("shortlist") or [])
            if isinstance(item, dict) and str(item.get("text") or "").strip()
        ]
        if remote_shortlist:
            rows: list[dict[str, Any]] = []
            for index, item in enumerate(remote_shortlist, start=1):
                text = " ".join(str(item.get("text") or "").strip().split())
                if not text:
                    continue
                rows.append(
                    {
                        "rank": int(item.get("rank") or index),
                        "score": float(item.get("score") or 0.0),
                        "model": str(item.get("model") or ""),
                        "backend": str(item.get("backend") or ""),
                        "content_text": text,
                        "reason": str(item.get("reason") or "").strip(),
                        "reason_codes": [str(code).strip() for code in list(item.get("reason_codes") or []) if str(code).strip()],
                    }
                )
            if rows:
                rows.sort(key=lambda item: int(item.get("rank") or 9999))
                return rows

        return build_shortlist_seed(candidates, target_words=target_words)
