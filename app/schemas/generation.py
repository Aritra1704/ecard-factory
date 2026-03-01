"""Pydantic schemas for Groq-backed generation endpoints."""

from __future__ import annotations

from typing import Any
from typing import Literal

from pydantic import BaseModel, Field


class PhraseGenerationRequest(BaseModel):
    """Request body for generating greeting card phrase candidates."""

    theme_name: str
    tone_funny_pct: int = Field(ge=0, le=100)
    tone_emotion_pct: int = Field(ge=0, le=100)
    prompt_keywords: list[str] = Field(default_factory=list)
    visual_style: str
    event_name: str | None = None
    count: int = Field(default=5, ge=1, le=10)
    card_id: int | None = None


class PhraseGenerationResponse(BaseModel):
    """Response payload containing all generated phrases and the top pick."""

    phrases: list[dict[str, Any]]
    best_phrase: dict[str, Any]
    card_id: int | None = None


class DallePromptRequest(BaseModel):
    """Request body for generating a DALL-E-ready image prompt."""

    phrase: str
    theme_name: str
    color_palette: list[str] = Field(default_factory=list)
    visual_style: str
    prompt_keywords: list[str] = Field(default_factory=list)
    card_id: int | None = None


class DallePromptResponse(BaseModel):
    """Response payload for an optimized DALL-E prompt."""

    dalle_prompt: str
    card_id: int | None = None


class ImageGenerationRequest(BaseModel):
    """Request body for generating a DALL-E image from an approved prompt."""

    dalle_prompt: str
    card_id: int | None = None
    quality: Literal["standard", "hd"] = "standard"
    size: Literal["1024x1024", "1792x1024", "1024x1792"] = "1024x1024"


class ImageGenerationResponse(BaseModel):
    """Response payload for a generated DALL-E image."""

    image_url: str
    revised_prompt: str
    cost_estimate: float
    card_id: int | None = None


class ImageValidationRequest(BaseModel):
    """Request body for validating a generated image URL."""

    image_url: str


class ImageValidationResponse(BaseModel):
    """Response payload describing the result of image validation."""

    valid: bool
    width: int
    height: int
    file_size_kb: float
    content_type: str
    error: str | None = None
