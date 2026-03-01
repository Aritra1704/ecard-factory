"""Unit tests for the Groq-backed phrase and prompt generation service."""

from __future__ import annotations

from unittest.mock import AsyncMock
import importlib
import sys

import pytest


def reload_groq_service_module():
    """Reload the Groq service module so HTTP client monkeypatches do not leak."""

    for module_name in list(sys.modules):
        if module_name in {"app.config"} or module_name.startswith("app.services.groq_service"):
            sys.modules.pop(module_name, None)

    return importlib.import_module("app.services.groq_service")


class FakeResponse:
    """Minimal httpx response stub for Groq API tests."""

    def __init__(self, payload):
        self.payload = payload

    def raise_for_status(self) -> None:
        return None

    def json(self):
        return self.payload


class FakeAsyncClient:
    """Async client stub that returns queued Groq API payloads."""

    responses: list[dict] = []
    posted_payloads: list[dict] = []

    def __init__(self, *args, **kwargs):
        self.post = AsyncMock(side_effect=self._post)

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    async def _post(self, url, *, headers=None, json=None):
        self.__class__.posted_payloads.append({"url": url, "headers": headers, "json": json})
        return FakeResponse(self.__class__.responses.pop(0))


def make_choice_payload(content: str) -> dict:
    """Wrap content in the Groq-compatible choices/message structure."""

    return {"choices": [{"message": {"content": content}}]}


@pytest.mark.asyncio
async def test_generate_phrases_returns_correct_count(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """The service should return exactly the requested number of phrase dicts."""

    service_module = reload_groq_service_module()
    FakeAsyncClient.responses = [
        make_choice_payload(
            """
            {"phrases": [
              {"text": "May your day bloom with laughter, light, and little miracles ahead!", "tone": "emotional", "occasion": "general", "word_count": 11},
              {"text": "Sending warm hugs, sweet smiles, and sunshine for every step today!", "tone": "emotional", "occasion": "general", "word_count": 11},
              {"text": "Hope your celebration sparkles with joy, love, and unforgettable moments!", "tone": "balanced", "occasion": "general", "word_count": 10}
            ]}
            """
        )
    ]
    FakeAsyncClient.posted_payloads = []
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.GroqService()

    phrases = await service.generate_phrases(
        theme_name="Festival Glow",
        tone_funny_pct=30,
        tone_emotion_pct=70,
        prompt_keywords=["warmth", "family"],
        visual_style="editorial illustration",
        count=3,
    )

    assert len(phrases) == 3
    assert FakeAsyncClient.posted_payloads[0]["headers"]["Authorization"] == "Bearer test-groq-key"


@pytest.mark.asyncio
async def test_generate_phrases_parses_json_response_correctly(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Structured JSON content from Groq should be normalized without losing fields."""

    service_module = reload_groq_service_module()
    FakeAsyncClient.responses = [
        make_choice_payload(
            '{"phrases": [{"text": "Wishing you joy, calm, and kindness in every moment today!", '
            '"tone": "emotional", "occasion": "general", "word_count": 10}]}'
        )
    ]
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.GroqService()

    phrases = await service.generate_phrases(
        theme_name="Quiet Celebration",
        tone_funny_pct=20,
        tone_emotion_pct=80,
        prompt_keywords=["kindness"],
        visual_style="soft watercolor",
        count=1,
    )

    assert phrases == [
        {
            "text": "Wishing you joy, calm, and kindness in every moment today!",
            "tone": "emotional",
            "occasion": "general",
            "word_count": 10,
        }
    ]


@pytest.mark.asyncio
async def test_generate_phrases_falls_back_when_json_is_invalid(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Plain-text responses should still produce usable phrase dicts."""

    service_module = reload_groq_service_module()
    FakeAsyncClient.responses = [
        make_choice_payload(
            """
            1. May your home glow with love, laughter, and sweet togetherness tonight!
            2. Here is to warm chai, louder laughs, and a heart full of light!
            """
        )
    ]
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.GroqService()

    phrases = await service.generate_phrases(
        theme_name="Family Evening",
        tone_funny_pct=40,
        tone_emotion_pct=40,
        prompt_keywords=["chai", "home"],
        visual_style="cozy realism",
        count=2,
    )

    assert len(phrases) == 2
    assert phrases[0]["tone"] == "balanced"
    assert phrases[0]["text"].startswith("May your home glow")


def test_score_phrase_applies_all_rules(
    configured_env: dict[str, str],
) -> None:
    """Phrase scoring should reflect the configured bonuses and penalties."""

    service_module = reload_groq_service_module()
    service = service_module.GroqService()

    assert service._score_phrase(  # noqa: SLF001
        {
            "text": "Ready for more laughter, lighter worries, and brighter chai breaks today?!",
            "tone": "funny",
            "occasion": "general",
            "word_count": 10,
        },
        expected_tone="funny",
    ) == 38
    assert service._score_phrase(  # noqa: SLF001
        {
            "text": "Too tiny",
            "tone": "funny",
            "occasion": "general",
            "word_count": 2,
        },
        expected_tone="funny",
    ) == 5
    assert service._score_phrase(  # noqa: SLF001
        {
            "text": "This phrase keeps stretching beyond a comfortable greeting card length and keeps adding extra filler words for no reason at all today",
            "tone": "balanced",
            "occasion": "general",
            "word_count": 23,
        },
        expected_tone="emotional",
    ) == 0
    assert service._score_phrase(  # noqa: SLF001
        {
            "text": "This phrase keeps stretching beyond a comfortable greeting card length and keeps adding extra filler words for no reason at all today again always together forever now",
            "tone": "balanced",
            "occasion": "general",
            "word_count": 29,
        },
        expected_tone="emotional",
    ) == -10


@pytest.mark.asyncio
async def test_select_best_phrase_returns_highest_scoring_candidate(
    configured_env: dict[str, str],
) -> None:
    """The selection method should return the phrase with the strongest score."""

    service_module = reload_groq_service_module()
    service = service_module.GroqService()

    best = await service.select_best_phrase(
        phrases=[
            {
                "text": "Warm wishes always",
                "tone": "emotional",
                "occasion": "general",
                "word_count": 3,
            },
            {
                "text": "Could today bring louder laughs, sweeter chai, and brighter memories for you?!",
                "tone": "funny",
                "occasion": "general",
                "word_count": 11,
            },
        ],
        theme_name="Joy Burst",
        tone_funny_pct=70,
        tone_emotion_pct=20,
    )

    assert best["text"].startswith("Could today bring louder laughs")


@pytest.mark.asyncio
async def test_generate_dalle_prompt_returns_string_under_900_chars(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Generated DALL-E prompts should be returned as constrained strings."""

    service_module = reload_groq_service_module()
    FakeAsyncClient.responses = [
        make_choice_payload(
            "A cinematic festive courtyard at dusk with marigold garlands, warm lantern glow, "
            "rich saffron and teal accents, painterly realism, layered floral depth, premium "
            "greeting card composition, soft bokeh, elegant negative space for mood. "
            "No text, no words, no letters in the image."
        )
    ]
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.GroqService()

    prompt = await service.generate_dalle_prompt(
        phrase="Wishing you joy and warmth today!",
        theme_name="Festival Glow",
        color_palette=["saffron", "teal"],
        visual_style="painterly realism",
        prompt_keywords=["marigold", "lanterns"],
    )

    assert isinstance(prompt, str)
    assert len(prompt) < 900
    assert "No text, no words, no letters in the image." in prompt
