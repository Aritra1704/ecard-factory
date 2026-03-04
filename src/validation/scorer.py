"""Deterministic validation and scoring utilities for compare-model outputs."""

from __future__ import annotations

from collections.abc import Mapping, Sequence
import math
import re
from typing import Any

EMOJI_PATTERN = re.compile(
    r"[\U0001F300-\U0001FAFF\U00002700-\U000027BF\u2600-\u26FF\U0001F1E6-\U0001F1FF]"
)
WORD_PATTERN = re.compile(r"[A-Za-z0-9']+")
JSON_LEAK_PATTERNS = (
    re.compile(r'\{"items"\s*:', re.IGNORECASE),
    re.compile(r'"items"\s*:', re.IGNORECASE),
    re.compile(r"\[[\s\n]*\{", re.IGNORECASE),
    re.compile(r"^\s*\{.*\}\s*$", re.DOTALL),
)

DEFAULT_CLICHE_PHRASES = (
    "new beginnings",
    "embrace the day",
    "rise and shine",
    "seize the day",
    "you got this",
    "unlock your potential",
    "journey ahead",
)

POETIC_IMAGERY_WORDS = (
    "dawn",
    "sunlight",
    "horizon",
    "breeze",
    "glow",
    "bloom",
    "river",
    "starlight",
    "whisper",
    "lantern",
)
WITTY_MARKERS = ("wink", "haha", "playful", "pun", "cheeky", "smirk", "giggle")
SARCASM_MARKERS = ("yeah right", "as if", "totally not", "/s", "sure jan")
INSPIRATIONAL_MARKERS = (
    "you can",
    "believe",
    "rise",
    "strength",
    "potential",
    "keep going",
    "courage",
    "purpose",
)
CONVERSATIONAL_MARKERS = ("you", "we", "let's", "you're", "we're", "it's", "don't", "can't", "won't")


def _clamp(value: float, minimum: float = 0.0, maximum: float = 1.0) -> float:
    """Clamp one numeric value into an inclusive range."""

    return max(minimum, min(maximum, value))


def _tokenize_words(text: str) -> list[str]:
    """Tokenize a phrase into alphanumeric words."""

    return WORD_PATTERN.findall(text.lower())


def _normalize_token(token: str) -> str:
    """Apply simple stemming-like normalization for rough keyword matching."""

    normalized = token.lower().strip()
    if len(normalized) > 5 and normalized.endswith("ing"):
        return normalized[:-3]
    if len(normalized) > 4 and normalized.endswith("ed"):
        return normalized[:-2]
    if len(normalized) > 4 and normalized.endswith("es"):
        return normalized[:-2]
    if len(normalized) > 3 and normalized.endswith("s"):
        return normalized[:-1]
    return normalized


def _normalized_token_set(text: str) -> set[str]:
    """Return a set of normalized tokens for one phrase."""

    return {_normalize_token(token) for token in _tokenize_words(text)}


def _looks_like_json(text: str) -> bool:
    """Return True when a phrase appears to leak raw JSON-like content."""

    candidate = text.strip()
    if not candidate:
        return False
    return any(pattern.search(candidate) for pattern in JSON_LEAK_PATTERNS)


def _compute_keyword_coverage(keywords: Sequence[str], phrases: Sequence[str]) -> float:
    """Compute coverage as the fraction of keywords referenced by at least one phrase."""

    cleaned_keywords = [keyword.strip().lower() for keyword in keywords if str(keyword).strip()]
    if not cleaned_keywords:
        return 1.0

    phrase_tokens = [_normalized_token_set(phrase) for phrase in phrases]
    phrase_texts = [phrase.lower() for phrase in phrases]
    matched = 0
    for keyword in cleaned_keywords:
        keyword_tokens = [_normalize_token(token) for token in _tokenize_words(keyword)]
        if not keyword_tokens:
            continue
        if any(set(keyword_tokens).issubset(tokens) for tokens in phrase_tokens):
            matched += 1
            continue
        if any(keyword in text for text in phrase_texts):
            matched += 1

    return _clamp(matched / len(cleaned_keywords))


def _jaccard_similarity(left: set[str], right: set[str]) -> float:
    """Compute Jaccard similarity between two token sets."""

    if not left and not right:
        return 1.0
    union = left | right
    if not union:
        return 0.0
    return len(left & right) / len(union)


def _compute_uniqueness_score(phrases: Sequence[str]) -> float:
    """Score phrase uniqueness by repeated openings and pairwise token overlap."""

    if not phrases:
        return 0.0
    if len(phrases) == 1:
        return 1.0

    opening_tokens: list[tuple[str, ...]] = []
    token_sets: list[set[str]] = []
    for phrase in phrases:
        tokens = [_normalize_token(token) for token in _tokenize_words(phrase)]
        token_sets.append(set(tokens))
        opening_tokens.append(tuple(tokens[:3]))

    opening_groups: dict[tuple[str, ...], int] = {}
    for opening in opening_tokens:
        opening_groups[opening] = opening_groups.get(opening, 0) + 1
    duplicate_openings = sum(count - 1 for count in opening_groups.values() if count > 1)
    opening_penalty = duplicate_openings / max(1, len(phrases) - 1)

    near_duplicates = 0
    pair_count = 0
    for left_index in range(len(token_sets)):
        for right_index in range(left_index + 1, len(token_sets)):
            pair_count += 1
            if _jaccard_similarity(token_sets[left_index], token_sets[right_index]) >= 0.7:
                near_duplicates += 1
    similarity_penalty = near_duplicates / pair_count if pair_count else 0.0

    uniqueness = 1.0 - (0.55 * opening_penalty + 0.45 * similarity_penalty)
    return _clamp(uniqueness)


def _compute_tone_style_hint(
    tone_style: str,
    *,
    phrases: Sequence[str],
    max_words: int,
    average_words: float,
) -> float:
    """Estimate how well outputs match requested tone style using lightweight heuristics."""

    if not phrases:
        return 0.0

    tone = tone_style.strip().lower()
    phrase_text = " ".join(phrases).lower()

    if tone == "minimal":
        threshold = max_words * 0.7
        if average_words <= threshold:
            return 1.0
        overflow = average_words - threshold
        return _clamp(1.0 - (overflow / max(1.0, threshold)))

    if tone == "poetic":
        hits = sum(1 for word in POETIC_IMAGERY_WORDS if word in phrase_text)
        return _clamp(hits / 4.0)

    if tone == "witty":
        humor_hits = sum(1 for marker in WITTY_MARKERS if marker in phrase_text)
        sarcasm_hits = sum(1 for marker in SARCASM_MARKERS if marker in phrase_text)
        return _clamp((humor_hits / 3.0) - (sarcasm_hits * 0.35))

    if tone == "inspirational":
        inspiration_hits = sum(1 for marker in INSPIRATIONAL_MARKERS if marker in phrase_text)
        return _clamp(inspiration_hits / 4.0)

    # conversational fallback
    conversational_hits = sum(1 for marker in CONVERSATIONAL_MARKERS if marker in phrase_text)
    avg_words_score = 1.0 if 5 <= average_words <= max(8, max_words) else 0.6
    return _clamp(0.6 * avg_words_score + 0.4 * _clamp(conversational_hits / 4.0))


def _compute_emoji_violations(emoji_policy: str, emoji_counts: Sequence[int]) -> int:
    """Count phrase-level emoji policy violations."""

    policy = emoji_policy.strip().lower()
    if policy == "expressive":
        return 0
    if policy == "light":
        return sum(1 for count in emoji_counts if count > 1)
    return sum(1 for count in emoji_counts if count > 0)


def _compute_cliche_hits(*, phrases: Sequence[str], avoid_phrases: Sequence[str], enabled: bool) -> int:
    """Count occurrences of blocked cliche fragments across all generated phrases."""

    if not enabled:
        return 0

    candidates = [phrase.strip().lower() for phrase in avoid_phrases if str(phrase).strip()]
    blocked_phrases = candidates or list(DEFAULT_CLICHE_PHRASES)
    combined = "\n".join(phrase.lower() for phrase in phrases)

    hits = 0
    for blocked in blocked_phrases:
        hits += combined.count(blocked)
    return hits


def score_result(payload: Mapping[str, Any], phrases: Sequence[str]) -> dict[str, Any]:
    """Score one model result using deterministic heuristics and constraints.

    Returns a flat dictionary containing all computed metrics plus a final
    `score` in the inclusive range `0..100`.
    """

    cleaned_phrases = [str(phrase).strip() for phrase in phrases if str(phrase).strip()]
    expected_count = max(1, int(payload.get("count", len(cleaned_phrases) or 1)))
    max_words = max(1, int(payload.get("max_words", 16)))
    emoji_policy = str(payload.get("emoji_policy", "none"))
    keywords = list(payload.get("prompt_keywords") or [])
    tone_style = str(payload.get("tone_style", "conversational"))
    avoid_cliches = bool(payload.get("avoid_cliches", True))
    avoid_phrases = list(payload.get("avoid_phrases") or [])

    count_ok = len(cleaned_phrases) == expected_count
    word_counts = [len(_tokenize_words(phrase)) for phrase in cleaned_phrases]
    max_words_violations = sum(1 for count in word_counts if count > max_words)
    emoji_counts = [len(EMOJI_PATTERN.findall(phrase)) for phrase in cleaned_phrases]
    emoji_violations = _compute_emoji_violations(emoji_policy, emoji_counts)
    json_leak = any(_looks_like_json(phrase) for phrase in cleaned_phrases)
    keyword_coverage = _compute_keyword_coverage([str(keyword) for keyword in keywords], cleaned_phrases)
    uniqueness_score = _compute_uniqueness_score(cleaned_phrases)
    cliche_hits = _compute_cliche_hits(
        phrases=cleaned_phrases,
        avoid_phrases=[str(item) for item in avoid_phrases],
        enabled=avoid_cliches,
    )
    average_words = float(sum(word_counts) / len(word_counts)) if word_counts else 0.0
    tone_style_hint = _compute_tone_style_hint(
        tone_style=tone_style,
        phrases=cleaned_phrases,
        max_words=max_words,
        average_words=average_words,
    )

    count_component = 1.0 if count_ok else 0.0
    words_component = _clamp(1.0 - (max_words_violations / max(1, len(cleaned_phrases))))
    emoji_component = _clamp(1.0 - (emoji_violations / max(1, len(cleaned_phrases))))
    leak_component = 0.0 if json_leak else 1.0
    cliche_component = _clamp(1.0 - (min(cliche_hits, 5) / 5.0)) if avoid_cliches else 1.0

    constraints_quality = (
        0.28 * count_component
        + 0.24 * words_component
        + 0.18 * emoji_component
        + 0.2 * leak_component
        + 0.1 * cliche_component
    )
    alignment_quality = 0.6 * keyword_coverage + 0.4 * tone_style_hint
    base_score = 45.0 * constraints_quality + 25.0 * uniqueness_score + 30.0 * alignment_quality

    penalties: dict[str, float] = {}
    if json_leak:
        penalties["json_leak"] = 40.0
    if emoji_policy.strip().lower() == "none" and any(count > 0 for count in emoji_counts):
        penalties["emoji_policy_none"] = 25.0
    if not count_ok:
        penalties["count_mismatch"] = 30.0
    if avoid_cliches and cliche_hits > 0:
        penalties["cliches"] = min(cliche_hits * 10.0, 40.0)

    final_score = _clamp(base_score - sum(penalties.values()), 0.0, 100.0)
    constraint_issues = (
        not count_ok
        or max_words_violations > 0
        or emoji_violations > 0
        or json_leak
        or (avoid_cliches and cliche_hits > 0)
    )

    return {
        "count_ok": count_ok,
        "max_words_violations": max_words_violations,
        "emoji_violations": emoji_violations,
        "json_leak": json_leak,
        "keyword_coverage": round(keyword_coverage, 4),
        "uniqueness_score": round(uniqueness_score, 4),
        "cliche_hits": cliche_hits,
        "tone_style_hint": round(tone_style_hint, 4),
        "score": round(final_score, 2),
        "normalized_score": round(final_score / 100.0, 4),
        "constraint_issues": constraint_issues,
        "penalties": {name: round(value, 2) for name, value in penalties.items()},
        "word_count_avg": round(average_words, 2),
        "word_counts": word_counts,
        "emoji_count_total": int(math.fsum(emoji_counts)),
    }
