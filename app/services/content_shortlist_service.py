"""Quality filtering for Studio-facing text shortlist candidates."""

from __future__ import annotations

from difflib import SequenceMatcher
import re
from typing import Any

ABRUPT_ENDINGS = {
    "a",
    "an",
    "and",
    "as",
    "at",
    "for",
    "from",
    "if",
    "in",
    "into",
    "of",
    "on",
    "or",
    "our",
    "the",
    "their",
    "this",
    "to",
    "with",
    "your",
}

TOKEN_RE = re.compile(r"[A-Za-z0-9']+")
MAX_SHORTLIST_CANDIDATES = 5
MIN_SHORTLIST_CANDIDATES = 3


def shortlist_content_candidates(
    candidates: list[dict[str, Any]],
    *,
    target_words: int,
    min_keep: int = MIN_SHORTLIST_CANDIDATES,
    max_keep: int = MAX_SHORTLIST_CANDIDATES,
) -> list[dict[str, Any]]:
    """Return a strict, de-duplicated shortlist for Studio text selection."""

    safe_max_keep = max(1, min(max_keep, MAX_SHORTLIST_CANDIDATES))
    safe_min_keep = max(1, min(min_keep, safe_max_keep))
    analyzed = [_analyze_candidate(candidate, target_words=target_words) for candidate in candidates]

    primary_pool = sorted(
        [item for item in analyzed if not item["hard_reject"]],
        key=lambda item: item["quality_score"],
        reverse=True,
    )
    fallback_pool = sorted(
        analyzed,
        key=lambda item: item["quality_score"],
        reverse=True,
    )

    selected: list[dict[str, Any]] = []
    seen_openings: set[str] = set()
    seen_texts: list[str] = []

    def can_keep(item: dict[str, Any]) -> bool:
        opening = str(item["opening_signature"])
        if opening and opening in seen_openings:
            return False
        if any(_is_near_duplicate(item["normalized_text"], existing) for existing in seen_texts):
            return False
        return True

    def remember(item: dict[str, Any]) -> None:
        opening = str(item["opening_signature"])
        if opening:
            seen_openings.add(opening)
        seen_texts.append(str(item["normalized_text"]))
        selected.append(dict(item["candidate"]))

    for item in primary_pool:
        if can_keep(item):
            remember(item)
        if len(selected) >= safe_max_keep:
            return selected

    if len(selected) >= safe_min_keep:
        return selected

    for item in fallback_pool:
        if dict(item["candidate"]) in selected:
            continue
        if item["word_count"] < 4:
            continue
        if can_keep(item):
            remember(item)
        if len(selected) >= safe_min_keep:
            break

    return selected[:safe_max_keep]


def build_shortlist_seed(
    candidates: list[dict[str, Any]],
    *,
    target_words: int,
    max_keep: int = MAX_SHORTLIST_CANDIDATES,
) -> list[dict[str, Any]]:
    """Return shortlist rows ready to be mapped into persisted shortlist entries."""

    shortlisted = shortlist_content_candidates(
        candidates,
        target_words=target_words,
        max_keep=max_keep,
    )
    rows: list[dict[str, Any]] = []
    for rank, candidate in enumerate(shortlisted, start=1):
        rows.append(
            {
                "rank": rank,
                "score": float(candidate.get("judged_score") or candidate.get("judge_score") or candidate.get("raw_score") or 0.0),
                "model": str(candidate.get("model") or ""),
                "backend": str(candidate.get("backend") or ""),
                "content_text": str(candidate.get("content_text") or candidate.get("text") or ""),
            }
        )
    return rows


def _analyze_candidate(candidate: dict[str, Any], *, target_words: int) -> dict[str, Any]:
    text = str(candidate.get("content_text") or candidate.get("text") or "").strip()
    normalized_text = _normalize_text(text)
    tokens = _tokenize(text)
    word_count = len(tokens)
    min_words = max(6, min(10, max(4, target_words // 2)))

    incomplete = _is_incomplete_text(text=text, tokens=tokens, min_words=min_words)
    readability_penalty = _readability_penalty(tokens=tokens, text=text)
    quality_score = float(candidate.get("judged_score") or candidate.get("judge_score") or candidate.get("raw_score") or 0.0)
    quality_score -= readability_penalty
    if word_count < min_words:
        quality_score -= 1.5
    if incomplete:
        quality_score -= 3.0

    return {
        "candidate": dict(candidate),
        "normalized_text": normalized_text,
        "opening_signature": " ".join(tokens[:3]),
        "word_count": word_count,
        "hard_reject": not normalized_text or word_count < min_words or incomplete,
        "quality_score": quality_score,
    }


def _normalize_text(text: str) -> str:
    return " ".join(TOKEN_RE.findall(text.lower()))


def _tokenize(text: str) -> list[str]:
    return TOKEN_RE.findall(text.lower())


def _is_incomplete_text(*, text: str, tokens: list[str], min_words: int) -> bool:
    if len(tokens) < min_words:
        return True
    stripped = text.strip()
    if not stripped:
        return True
    if stripped.endswith("...") or stripped.endswith(".."):
        return True
    if stripped[-1] not in ".!?":
        return True
    if tokens and tokens[-1] in ABRUPT_ENDINGS:
        return True
    return False


def _readability_penalty(*, tokens: list[str], text: str) -> float:
    if not tokens:
        return 5.0
    unique_ratio = len(set(tokens)) / max(len(tokens), 1)
    repeated_word_penalty = 0.8 if unique_ratio < 0.55 else 0.0
    punctuation_penalty = 0.35 if text.count("!") > 2 or text.count("?") > 1 else 0.0
    repetition_penalty = 0.45 if _has_repeated_bigram(tokens) else 0.0
    return repeated_word_penalty + punctuation_penalty + repetition_penalty


def _has_repeated_bigram(tokens: list[str]) -> bool:
    if len(tokens) < 4:
        return False
    seen: set[tuple[str, str]] = set()
    for index in range(len(tokens) - 1):
        bigram = (tokens[index], tokens[index + 1])
        if bigram in seen:
            return True
        seen.add(bigram)
    return False


def _is_near_duplicate(left: str, right: str) -> bool:
    if not left or not right:
        return False
    ratio = SequenceMatcher(a=left, b=right).ratio()
    if ratio >= 0.9:
        return True

    left_tokens = set(left.split())
    right_tokens = set(right.split())
    overlap = len(left_tokens & right_tokens) / max(len(left_tokens | right_tokens), 1)
    return overlap >= 0.82
