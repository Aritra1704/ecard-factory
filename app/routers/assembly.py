"""Endpoints for assembling production cards and previews with Pillow."""

from __future__ import annotations

import httpx
from fastapi import APIRouter, HTTPException, Request
from fastapi.responses import Response

from app.schemas.assembly import CardAssemblyRequest, PreviewRequest
from app.schemas.cards import CardStatusUpdate
from app.services.pillow_service import PillowService

router = APIRouter(tags=["assembly"])
service = PillowService()


async def _update_card_status(request: Request, card_id: int, status_value: str) -> None:
    """Update the related card workflow status through the cards API itself."""

    transport = httpx.ASGITransport(app=request.app)
    async with httpx.AsyncClient(transport=transport, base_url=str(request.base_url)) as client:
        try:
            response = await client.patch(
                f"/cards/{card_id}/status",
                json=CardStatusUpdate(status=status_value).model_dump(),
            )
            response.raise_for_status()
        except httpx.HTTPError as exc:
            raise HTTPException(
                status_code=502,
                detail=f"Failed to update card status for card {card_id}.",
            ) from exc


@router.post("/card")
async def assemble_card(payload: CardAssemblyRequest, request: Request) -> Response:
    """Render and return a production PNG card assembled in memory."""

    png_bytes = await service.assemble_card(
        image_url=payload.image_url,
        phrase=payload.phrase,
        theme_name=payload.theme_name,
        color_palette=payload.color_palette,
        visual_style=payload.visual_style,
        card_id=payload.card_id,
    )
    await _update_card_status(request, payload.card_id, "assembly_approved")
    return Response(content=png_bytes, media_type="image/png")


@router.post("/preview")
async def create_preview(payload: PreviewRequest, request: Request) -> Response:
    """Render and return a lightweight JPEG preview image."""

    jpeg_bytes = await service.create_preview(
        image_url=payload.image_url,
        phrase=payload.phrase,
        color_palette=payload.color_palette,
    )
    await _update_card_status(request, payload.card_id, "pending_assembly")
    return Response(content=jpeg_bytes, media_type="image/jpeg")
