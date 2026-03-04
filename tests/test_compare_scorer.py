"""Unit tests for deterministic compare-run validation and scoring."""

from __future__ import annotations

import pytest

from app.routers.generation import CompareModelsRequest, CompareModelsResult, _select_winner
from src.validation.scorer import score_result


def _base_payload() -> dict[str, object]:
    """Return a baseline payload used by scorer tests."""

    return {
        "theme_name": "Morning Focus",
        "prompt_keywords": ["morning", "focus", "calm"],
        "tone_funny_pct": 20,
        "tone_emotion_pct": 80,
        "tone_style": "minimal",
        "audience": "general",
        "visual_style": "warm photography",
        "max_words": 12,
        "emoji_policy": "none",
        "avoid_cliches": True,
        "avoid_phrases": ["rise and shine"],
        "count": 3,
    }


def test_score_result_flags_emoji_violations_when_policy_is_none() -> None:
    """Emoji policy `none` should report at least one emoji violation for emoji content."""

    payload = _base_payload()
    phrases = [
        "Morning calm helps me focus ☀️",
        "Coffee fuels my quiet mornings",
        "Soft light brings gentle productivity",
    ]

    result = score_result(payload, phrases)

    assert result["emoji_violations"] > 0
    assert result["constraint_issues"] is True


def test_score_result_detects_max_words_violations() -> None:
    """Phrases above max_words must be counted as max-word violations."""

    payload = _base_payload()
    payload["max_words"] = 4
    phrases = [
        "Morning focus calm",
        "Brew coffee and start with clear focus",
        "Quiet breath steady mind and purposeful energy",
    ]

    result = score_result(payload, phrases)

    assert result["max_words_violations"] == 2
    assert result["constraint_issues"] is True


def test_score_result_applies_json_leak_penalty() -> None:
    """JSON-looking output should trigger leak detection and a heavy score penalty."""

    payload = _base_payload()
    phrases = [
        '{"items": ["Morning focus leads the way"]}',
        "Coffee and calm keep momentum",
        "Soft light supports mindful work",
    ]

    result = score_result(payload, phrases)

    assert result["json_leak"] is True
    assert result["penalties"]["json_leak"] == 40.0
    assert result["score"] < 60


@pytest.mark.asyncio
async def test_winner_is_selected_deterministically_from_scores() -> None:
    """Winner selection should return the highest score without external tie-break when not close."""

    payload = CompareModelsRequest(
        theme_name="Morning Focus",
        tone_funny_pct=20,
        tone_emotion_pct=80,
        prompt_keywords=["morning", "focus"],
        visual_style="minimal editorial",
        count=3,
    )
    results = [
        CompareModelsResult(
            backend="groq",
            model="llama-3.3-70b-versatile",
            success=True,
            latency_ms=500,
            phrases=["A", "B", "C"],
            score=91.2,
        ),
        CompareModelsResult(
            backend="ollama",
            model="qwen2.5:7b-instruct",
            success=True,
            latency_ms=800,
            phrases=["D", "E", "F"],
            score=72.4,
        ),
    ]

    winner = await _select_winner(payload, results)

    assert winner is not None
    assert winner.model == "llama-3.3-70b-versatile"
    assert winner.backend == "groq"
    assert winner.score == pytest.approx(91.2)

