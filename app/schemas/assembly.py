"""Request schemas for Pillow-based card assembly endpoints."""

from __future__ import annotations

from pydantic import BaseModel, Field


class CardAssemblyRequest(BaseModel):
    """Request body for creating a production card image."""

    image_url: str
    phrase: str
    theme_name: str
    color_palette: list[str] = Field(default_factory=list)
    visual_style: str
    card_id: int


class PreviewRequest(BaseModel):
    """Request body for creating a lightweight preview image."""

    image_url: str
    phrase: str
    color_palette: list[str] = Field(default_factory=list)
