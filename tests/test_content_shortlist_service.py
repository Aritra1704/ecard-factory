"""Tests for Studio text shortlist filtering."""

from __future__ import annotations

from app.services.content_shortlist_service import build_shortlist_seed, shortlist_content_candidates


def _candidate(text: str, score: float, *, model: str = "mistral:7b") -> dict[str, object]:
    return {
        "model": model,
        "backend": "ollama",
        "content_text": text,
        "text": text,
        "raw_score": score - 0.05,
        "judge_score": score,
        "judged_score": score,
    }


def test_shortlist_filters_incomplete_duplicates_and_repeated_openings() -> None:
    """Studio shortlist should keep only complete, distinct card lines."""

    candidates = [
        _candidate("Sending bright Holi joy your way today", 0.99),
        _candidate("Happy Holi!", 0.98),
        _candidate("May your day burst with color, laughter, and easy love.", 0.84),
        _candidate("May your day burst with color, laughter, and easy love.", 0.83, model="qwen2.5:7b-instruct"),
        _candidate("Sending bright Holi joy your way today.", 0.82, model="llama3.1:8b"),
        _candidate("Wishing you a gentle Holi filled with color and closeness.", 0.81),
        _candidate("Sending love and color for a day that feels full and bright.", 0.80),
        _candidate("Sending love and color into every room you walk into today.", 0.79),
        _candidate("Let this birthday glow with calm, laughter, and cake.", 0.78),
        _candidate("Warm Holi wishes and", 0.97),
        _candidate("May the day stay kind, bright, and easy on your heart.", 0.77),
    ]

    shortlist = shortlist_content_candidates(candidates, target_words=14)
    shortlist_texts = [str(item["content_text"]) for item in shortlist]

    assert 3 <= len(shortlist) <= 5
    assert "Warm Holi wishes and" not in shortlist_texts
    assert "Happy Holi!" not in shortlist_texts
    assert "Sending bright Holi joy your way today" not in shortlist_texts
    assert shortlist_texts.count("May your day burst with color, laughter, and easy love.") == 1
    assert sum(text.startswith("Sending love and color") for text in shortlist_texts) == 1
    assert sum(text.startswith("Sending bright Holi") for text in shortlist_texts) == 1
    assert all(text.endswith((".", "!", "?")) for text in shortlist_texts)


def test_build_shortlist_seed_preserves_reason_codes_for_ranked_candidates() -> None:
    """Structured ranking reasons should survive shortlist seed generation."""

    candidates = [
        {
            **_candidate("May your day glow with calm, color, and easy laughter.", 0.91),
            "contentforge_rank": 1,
            "reason": "This candidate comes from a top-ranked model run and reads as complete and ready to use.",
            "reason_codes": ["top_model_run", "complete_output"],
        },
        {
            **_candidate("Let Holi land softly with color, warmth, and togetherness.", 0.89),
            "contentforge_rank": 2,
            "reason": "This candidate uses distinct phrasing.",
            "reason_codes": ["distinct_phrasing"],
        },
    ]

    shortlist = build_shortlist_seed(candidates, target_words=14)

    assert shortlist[0]["rank"] == 1
    assert shortlist[0]["reason_codes"] == ["top_model_run", "complete_output"]
    assert shortlist[0]["reason"].startswith("This candidate comes from a top-ranked model run")
