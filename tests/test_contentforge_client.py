"""Tests for ContentForge workflow client ranking consumption."""

from __future__ import annotations

import pytest


class _FakeResponse:
    def __init__(self, payload: dict[str, object]) -> None:
        self._payload = payload

    def raise_for_status(self) -> None:
        return None

    def json(self) -> dict[str, object]:
        return self._payload


class _FakeAsyncClient:
    response_payload: dict[str, object] = {}

    def __init__(self, *args, **kwargs) -> None:
        return None

    async def __aenter__(self) -> "_FakeAsyncClient":
        return self

    async def __aexit__(self, exc_type, exc, tb) -> bool:
        return False

    async def post(self, path: str, json: dict[str, object]):
        assert path == "/generate/compare-models"
        assert json["count"] == 10
        return _FakeResponse(self.response_payload)


class _FallbackClient:
    def __init__(self) -> None:
        self.called = False

    async def generate_and_judge(self, payload):
        self.called = True
        return {"source": "fallback"}

    async def generate_more_candidates(self, payload, *, count: int, start_index: int):
        self.called = True
        return []


@pytest.mark.asyncio
async def test_contentforge_client_uses_remote_ranked_candidates_without_local_rescoring(monkeypatch) -> None:
    """Remote ranked candidates and shortlist reasons should flow through unchanged."""

    from app.integrations.contentforge.client import ContentForgeWorkflowClient
    from app.schemas.workflow import StartJobRequest
    import app.integrations.contentforge.client as client_module

    _FakeAsyncClient.response_payload = {
        "results": [
            {
                "ok": True,
                "backend": "ollama",
                "model": "qwen2.5:7b-instruct",
                "items": ["unused"],
                "quality": {"total": 88},
            }
        ],
        "winner": {"backend": "ollama", "model": "qwen2.5:7b-instruct", "total_score": 88},
        "winner_source": "baseline",
        "ranked_candidates": [
            {
                "backend": "ollama",
                "model": "qwen2.5:7b-instruct",
                "text": "May your day glow with calm, color, and easy laughter.",
                "rank": 1,
                "score": 91.5,
                "model_score": 88,
                "reason": "This candidate comes from a top-ranked model run and reads as complete and ready to use.",
                "reason_codes": ["top_model_run", "complete_output"],
            },
            {
                "backend": "ollama",
                "model": "qwen2.5:7b-instruct",
                "text": "Let Holi land softly with color, warmth, and togetherness.",
                "rank": 2,
                "score": 89.0,
                "model_score": 88,
                "reason": "This candidate uses distinct phrasing.",
                "reason_codes": ["distinct_phrasing"],
            },
        ],
        "shortlist": [
            {
                "backend": "ollama",
                "model": "qwen2.5:7b-instruct",
                "text": "May your day glow with calm, color, and easy laughter.",
                "rank": 1,
                "score": 91.5,
                "model_score": 88,
                "reason": "This candidate comes from a top-ranked model run and reads as complete and ready to use.",
                "reason_codes": ["top_model_run", "complete_output"],
            }
        ],
        "ranking_summary": {
            "total_candidates_seen": 4,
            "ranked_candidate_count": 2,
            "shortlisted_count": 1,
            "rejected_duplicate_count": 1,
            "rejected_incomplete_count": 1,
            "rejected_invalid_count": 0,
        },
        "why_winner": "Highest ranked candidate stayed complete and distinct.",
    }
    monkeypatch.setattr(client_module.httpx, "AsyncClient", _FakeAsyncClient)

    fallback = _FallbackClient()
    client = ContentForgeWorkflowClient(
        enabled=True,
        base_url="http://contentforge.test",
        timeout_seconds=30,
        model_names=["qwen2.5:7b-instruct"],
        fallback_client=fallback,
    )
    payload = StartJobRequest.model_validate(
        {
            "theme_name": "Holi",
            "tone_funny_pct": 20,
            "tone_emotion_pct": 80,
            "tone_style": "conversational",
            "audience": "friends",
            "cultural_context": "indian",
            "output_spec": {"format": "paragraph", "length": {"target_words": 80}},
            "avoid_cliches": True,
            "rendering": {"theme_style": "festive"},
        }
    )

    result = await client.generate_and_judge(payload)

    assert fallback.called is False
    assert result["source"] == "contentforge"
    assert result["candidates"][0]["judge_score"] == pytest.approx(91.5)
    assert result["candidates"][0]["contentforge_rank"] == 1
    assert result["candidates"][0]["reason_codes"] == ["top_model_run", "complete_output"]
    assert result["shortlist"][0]["reason_codes"] == ["top_model_run", "complete_output"]
    assert result["shortlist"][0]["reason"].startswith("This candidate comes from a top-ranked model run")
    assert result["leaderboard_json"]["ranking_summary"]["rejected_duplicate_count"] == 1
