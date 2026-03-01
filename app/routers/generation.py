"""Groq-backed generation endpoints for phrases and DALL-E prompts."""

from __future__ import annotations

import httpx
from fastapi import APIRouter, HTTPException, Request

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

router = APIRouter(tags=["generation"])
groq_service = GroqService()
dalle_service = DalleService()


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
