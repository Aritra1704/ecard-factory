"""Real integration tests for the live eCard Factory pipeline."""

from __future__ import annotations

from datetime import datetime

import httpx
import pytest


@pytest.mark.integration
@pytest.mark.asyncio
async def test_theme_resolver_hits_real_db(real_db_session):
    """Theme resolution should return a real persisted theme from the configured database."""

    from app.services.theme_resolver import KOLKATA_TZ, ThemeResolver

    resolver = ThemeResolver()
    resolved = await resolver.resolve_today(real_db_session)
    today = datetime.now(KOLKATA_TZ).date().isoformat()

    assert set(resolved.keys()) == {
        "theme_name",
        "source",
        "tone_funny_pct",
        "tone_emotion_pct",
        "prompt_keywords",
        "color_palette",
        "visual_style",
        "instagram_hashtags",
        "plan_date",
    }
    assert resolved["plan_date"] == today
    assert isinstance(resolved["theme_name"], str)
    assert resolved["theme_name"].strip()
    assert resolved["source"] in ["weekly", "override", "fallback"]


@pytest.mark.integration
@pytest.mark.asyncio
async def test_groq_generates_real_phrases():
    """Groq should return three live phrase candidates for a simple theme input."""

    from app.services.groq_service import GroqService

    service = GroqService()
    phrases = await service.generate_phrases(
        theme_name="Motivational",
        tone_funny_pct=30,
        tone_emotion_pct=70,
        prompt_keywords=["strength", "monday", "energy"],
        visual_style="uplifting editorial illustration",
        count=3,
    )

    assert len(phrases) == 3
    for phrase in phrases:
        assert phrase["text"]
        assert phrase["tone"]
        assert phrase["word_count"]
        assert 6 <= len(str(phrase["text"]).split()) <= 25


@pytest.mark.integration
@pytest.mark.asyncio
async def test_groq_generates_real_dalle_prompt():
    """Groq should produce a real DALL-E prompt that stays within the configured limit."""

    from app.services.groq_service import GroqService

    service = GroqService()
    prompt = await service.generate_dalle_prompt(
        phrase="Wishing you strength this Monday morning",
        theme_name="Motivational",
        color_palette=["#1D4ED8", "#F59E0B"],
        visual_style="cinematic editorial realism",
        prompt_keywords=["strength", "monday", "energy"],
    )

    assert isinstance(prompt, str)
    assert len(prompt) < 900
    assert "No text" in prompt


@pytest.mark.integration
@pytest.mark.asyncio
async def test_health_endpoint_hits_real_db():
    """The local health endpoint should be reachable while uvicorn is running."""

    async with httpx.AsyncClient(timeout=10.0) as client:
        response = await client.get("http://localhost:8000/health")

    payload = response.json()
    assert response.status_code == 200
    assert {"status", "env", "schema", "version"} <= set(payload.keys())


@pytest.mark.integration
@pytest.mark.asyncio
async def test_full_card_pipeline_dry_run(real_db_session):
    """Exercise the full dry-run pipeline with live DB and Groq but no paid DALL-E call."""

    from app.models.card import Card
    from app.services.groq_service import GroqService
    from app.services.pillow_service import PillowService
    from app.services.theme_resolver import ThemeResolver

    resolver = ThemeResolver()
    groq = GroqService()
    pillow = PillowService()
    card = None

    try:
        resolved = await resolver.resolve_today(real_db_session)

        card = Card(
            phrase="Temporary phrase placeholder",
            theme_name=resolved["theme_name"],
            theme_source=resolved["source"],
            event_id=None,
            status="pending_phrase_approval",
        )
        real_db_session.add(card)
        await real_db_session.commit()
        await real_db_session.refresh(card)

        phrases = await groq.generate_phrases(
            theme_name=resolved["theme_name"],
            tone_funny_pct=resolved["tone_funny_pct"],
            tone_emotion_pct=resolved["tone_emotion_pct"],
            prompt_keywords=resolved["prompt_keywords"],
            visual_style=resolved["visual_style"],
            count=3,
        )
        best_phrase = await groq.select_best_phrase(
            phrases=phrases,
            theme_name=resolved["theme_name"],
            tone_funny_pct=resolved["tone_funny_pct"],
            tone_emotion_pct=resolved["tone_emotion_pct"],
        )
        dalle_prompt = await groq.generate_dalle_prompt(
            phrase=best_phrase["text"],
            theme_name=resolved["theme_name"],
            color_palette=resolved["color_palette"],
            visual_style=resolved["visual_style"],
            prompt_keywords=resolved["prompt_keywords"],
        )

        preview_bytes = await pillow.create_preview(
            image_url="https://picsum.photos/1024/1024",
            phrase=best_phrase["text"],
            color_palette=resolved["color_palette"],
        )

        card.phrase = str(best_phrase["text"])
        card.dalle_prompt = dalle_prompt
        card.status = "phrase_approved"
        await real_db_session.commit()

        stored_card = await real_db_session.get(Card, card.id)

        assert phrases
        assert best_phrase["text"]
        assert dalle_prompt
        assert preview_bytes.startswith(b"\xff\xd8")
        assert len(preview_bytes) > 10 * 1024
        assert stored_card is not None
        assert stored_card.status == "phrase_approved"
        assert stored_card.phrase == best_phrase["text"]
    finally:
        if card is not None and card.id is not None:
            stored = await real_db_session.get(Card, card.id)
            if stored is not None:
                await real_db_session.delete(stored)
                await real_db_session.commit()
