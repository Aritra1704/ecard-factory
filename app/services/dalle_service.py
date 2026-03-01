"""OpenAI DALL-E 3 image generation and validation service."""

from __future__ import annotations

from decimal import Decimal
from io import BytesIO
from typing import Any

from fastapi import HTTPException, status
import httpx
from PIL import Image, UnidentifiedImageError

from app.config import settings
from app.database import async_session_factory
from app.models.card import Card


class DalleService:
    """Generate, validate, and download DALL-E images for card production."""

    API_URL = "https://api.openai.com/v1/images/generations"
    MIN_FILE_SIZE_BYTES = 100 * 1024
    MAX_FILE_SIZE_BYTES = 10 * 1024 * 1024
    MIN_DIMENSION = 512

    def __init__(self, api_key: str | None = None, session_factory=None) -> None:
        """Create a DALL-E service with configurable API key and session factory."""

        self.api_key = api_key or settings.openai_api_key
        self.session_factory = session_factory or async_session_factory

    async def generate_image(
        self,
        dalle_prompt: str,
        card_id: int | None = None,
        size: str = "1024x1024",
        quality: str = "standard",
    ) -> dict[str, Any]:
        """Generate one DALL-E 3 image and optionally persist the result to a card."""

        payload = {
            "model": "dall-e-3",
            "prompt": dalle_prompt,
            "n": 1,
            "size": size,
            "quality": quality,
            "response_format": "url",
        }
        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=60.0) as client:
                response = await client.post(self.API_URL, headers=headers, json=payload)
        except httpx.HTTPError as exc:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="OpenAI image generation request failed.",
            ) from exc

        if response.status_code >= 400:
            error_payload = self._safe_json(response)
            error_details = error_payload.get("error", {}) if isinstance(error_payload, dict) else {}
            error_code = str(error_details.get("code") or error_details.get("type") or "").lower()
            error_message = str(error_details.get("message") or "OpenAI image generation failed.")
            if "content_policy_violation" in error_code:
                raise HTTPException(
                    status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                    detail=f"OpenAI rejected the prompt due to content policy: {error_message}",
                )
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="OpenAI image generation failed.",
            )

        data = self._safe_json(response)
        try:
            image_data = data["data"][0]
            image_url = str(image_data["url"])
            revised_prompt = str(image_data.get("revised_prompt") or dalle_prompt)
        except (KeyError, IndexError, TypeError) as exc:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="OpenAI returned an unexpected image response format.",
            ) from exc

        cost_estimate = self._calculate_cost(size=size, quality=quality)
        result = {
            "image_url": image_url,
            "revised_prompt": revised_prompt,
            "card_id": card_id,
            "cost_estimate": cost_estimate,
        }

        if card_id is not None:
            await self._update_card_after_generation(
                card_id=card_id,
                image_url=image_url,
                revised_prompt=revised_prompt,
                original_prompt=dalle_prompt,
                cost_estimate=cost_estimate,
            )

        return result

    async def validate_image(self, image_url: str) -> dict[str, Any]:
        """Validate a generated image for format, size, and minimum resolution."""

        try:
            async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
                response = await client.get(image_url)
        except httpx.HTTPError as exc:
            return {
                "valid": False,
                "width": 0,
                "height": 0,
                "file_size_kb": 0.0,
                "content_type": "",
                "error": f"Failed to access image URL: {exc}",
            }

        content_type = str(response.headers.get("Content-Type", "")).split(";")[0].strip().lower()
        if response.status_code != 200:
            return {
                "valid": False,
                "width": 0,
                "height": 0,
                "file_size_kb": 0.0,
                "content_type": content_type,
                "error": f"Image URL returned HTTP {response.status_code}.",
            }

        file_size_bytes = len(response.content)
        file_size_kb = round(file_size_bytes / 1024, 2)
        if content_type not in {"image/png", "image/jpeg"}:
            return {
                "valid": False,
                "width": 0,
                "height": 0,
                "file_size_kb": file_size_kb,
                "content_type": content_type,
                "error": "Unsupported content type.",
            }

        if file_size_bytes < self.MIN_FILE_SIZE_BYTES:
            return {
                "valid": False,
                "width": 0,
                "height": 0,
                "file_size_kb": file_size_kb,
                "content_type": content_type,
                "error": "Image file is smaller than 100KB.",
            }

        if file_size_bytes > self.MAX_FILE_SIZE_BYTES:
            return {
                "valid": False,
                "width": 0,
                "height": 0,
                "file_size_kb": file_size_kb,
                "content_type": content_type,
                "error": "Image file exceeds 10MB.",
            }

        try:
            image = Image.open(BytesIO(response.content))
            width, height = image.size
        except UnidentifiedImageError:
            return {
                "valid": False,
                "width": 0,
                "height": 0,
                "file_size_kb": file_size_kb,
                "content_type": content_type,
                "error": "Downloaded file is not a valid image.",
            }

        if width < self.MIN_DIMENSION or height < self.MIN_DIMENSION:
            return {
                "valid": False,
                "width": width,
                "height": height,
                "file_size_kb": file_size_kb,
                "content_type": content_type,
                "error": "Image dimensions must be at least 512x512.",
            }

        return {
            "valid": True,
            "width": width,
            "height": height,
            "file_size_kb": file_size_kb,
            "content_type": content_type,
            "error": None,
        }

    async def download_and_store(self, image_url: str, card_id: int) -> bytes:
        """Download the generated image bytes for immediate downstream processing."""

        try:
            async with httpx.AsyncClient(timeout=30.0, follow_redirects=True) as client:
                response = await client.get(image_url)
                response.raise_for_status()
        except httpx.HTTPError as exc:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail=f"Failed to download generated image for card {card_id}.",
            ) from exc

        return response.content

    def _calculate_cost(self, *, size: str, quality: str) -> float:
        """Return the configured per-image cost for the requested DALL-E settings."""

        if quality == "hd":
            return 0.08 if size == "1024x1024" else 0.12
        return 0.04 if size == "1024x1024" else 0.08

    async def _update_card_after_generation(
        self,
        *,
        card_id: int,
        image_url: str,
        revised_prompt: str,
        original_prompt: str,
        cost_estimate: float,
    ) -> None:
        """Persist image generation results onto the related card record."""

        async with self.session_factory() as session:
            card = await session.get(Card, card_id)
            if card is None:
                raise HTTPException(
                    status_code=status.HTTP_404_NOT_FOUND,
                    detail=f"Card {card_id} not found.",
                )

            card.image_url = image_url
            card.cost_image = Decimal(f"{cost_estimate:.4f}")
            card.status = "pending_image_approval"
            if revised_prompt != original_prompt:
                card.dalle_prompt = revised_prompt

            await session.commit()

    def _safe_json(self, response: httpx.Response | Any) -> dict[str, Any]:
        """Best-effort JSON decoding for successful and failed API responses."""

        try:
            data = response.json()
        except (AttributeError, ValueError, TypeError):
            return {}
        return data if isinstance(data, dict) else {}
