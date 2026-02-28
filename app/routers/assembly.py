"""Endpoints for assembling production cards and previews with Pillow."""

from __future__ import annotations

from fastapi import APIRouter
from fastapi.responses import Response

from app.schemas.assembly import CardAssemblyRequest, PreviewRequest
from app.services.pillow_service import PillowService

router = APIRouter(prefix="/assembly", tags=["assembly"])
service = PillowService()


@router.post("/card")
async def assemble_card(payload: CardAssemblyRequest) -> Response:
    """Render and return a production PNG card assembled in memory."""

    png_bytes = await service.assemble_card(
        image_url=payload.image_url,
        phrase=payload.phrase,
        theme_name=payload.theme_name,
        color_palette=payload.color_palette,
        visual_style=payload.visual_style,
        card_id=payload.card_id,
    )
    return Response(content=png_bytes, media_type="image/png")


@router.post("/preview")
async def create_preview(payload: PreviewRequest) -> Response:
    """Render and return a lightweight JPEG preview image."""

    jpeg_bytes = await service.create_preview(
        image_url=payload.image_url,
        phrase=payload.phrase,
        color_palette=payload.color_palette,
    )
    return Response(content=jpeg_bytes, media_type="image/jpeg")
