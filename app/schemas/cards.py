"""Pydantic schemas for card workflow endpoints."""

from __future__ import annotations

from datetime import datetime
from decimal import Decimal
from typing import Literal

from pydantic import BaseModel, ConfigDict

CardStatus = Literal[
    "pending_phrase_approval",
    "phrase_approved",
    "pending_image",
    "pending_image_approval",
    "image_approved",
    "pending_assembly",
    "assembly_approved",
    "published",
    "rejected",
]


class CardCreate(BaseModel):
    """Request body for creating a new card pipeline record."""

    phrase: str
    theme_name: str
    theme_source: str
    event_id: int | None = None
    dalle_prompt: str | None = None


class CardStatusUpdate(BaseModel):
    """Request body for updating a card workflow status."""

    status: CardStatus


class CardUrlUpdate(BaseModel):
    """Request body for updating generated asset URLs on a card."""

    image_url: str | None = None
    canva_url: str | None = None
    final_png_url: str | None = None
    dalle_prompt: str | None = None


class CardContentUpdate(BaseModel):
    """Request body for updating phrase-generation content on a card."""

    phrase: str | None = None
    dalle_prompt: str | None = None
    candidate_phrases: list[dict[str, object]] | None = None


class CardResponse(BaseModel):
    """Full serialized card payload returned by the cards API."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    event_id: int | None
    theme_name: str
    theme_source: str
    phrase: str
    dalle_prompt: str | None
    image_url: str | None
    canva_url: str | None
    final_png_url: str | None
    status: str
    cost_llm: Decimal
    cost_image: Decimal
    created_at: datetime
