"""Unit tests for the DALL-E image generation service."""

from __future__ import annotations

from decimal import Decimal
from io import BytesIO
from unittest.mock import AsyncMock
import importlib
import sys

import pytest
from PIL import Image


def reload_dalle_service_module():
    """Reload the DALL-E service module so monkeypatches do not leak between tests."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database"}
            or module_name.startswith("app.models")
            or module_name.startswith("app.services.dalle_service")
        ):
            sys.modules.pop(module_name, None)

    return importlib.import_module("app.services.dalle_service")


def create_valid_png_bytes() -> bytes:
    """Create a large enough in-memory PNG to pass validation size checks."""

    image = Image.effect_noise((1024, 1024), 100).convert("RGB")
    output = BytesIO()
    image.save(output, format="PNG")
    return output.getvalue()


def create_small_png_bytes() -> bytes:
    """Create a tiny image payload that should fail the minimum file-size check."""

    image = Image.new("RGB", (64, 64), (220, 20, 60))
    output = BytesIO()
    image.save(output, format="PNG")
    return output.getvalue()


class FakeResponse:
    """Minimal httpx response stub for OpenAI and image download tests."""

    def __init__(self, *, status_code=200, json_data=None, content=b"", headers=None):
        self.status_code = status_code
        self._json_data = json_data if json_data is not None else {}
        self.content = content
        self.headers = headers or {}

    def json(self):
        return self._json_data

    def raise_for_status(self) -> None:
        if self.status_code >= 400:
            raise RuntimeError("HTTP error")


class FakeAsyncClient:
    """Queued async httpx client stub for DALL-E service tests."""

    queued_post_responses: list[FakeResponse] = []
    queued_get_responses: list[FakeResponse] = []
    posted_payloads: list[dict] = []
    requested_urls: list[str] = []
    raise_on_post: Exception | None = None

    def __init__(self, *args, **kwargs):
        self.post = AsyncMock(side_effect=self._post)
        self.get = AsyncMock(side_effect=self._get)

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    async def _post(self, url, *, headers=None, json=None):
        if self.__class__.raise_on_post is not None:
            raise self.__class__.raise_on_post
        self.__class__.posted_payloads.append({"url": url, "headers": headers, "json": json})
        return self.__class__.queued_post_responses.pop(0)

    async def _get(self, url, *args, **kwargs):
        self.__class__.requested_urls.append(url)
        return self.__class__.queued_get_responses.pop(0)


def make_openai_success_response() -> FakeResponse:
    """Build a successful OpenAI image-generation response."""

    return FakeResponse(
        status_code=200,
        json_data={
            "created": 1234567890,
            "data": [
                {
                    "url": "https://example.com/image.png",
                    "revised_prompt": "A beautiful scene with warm light and festive details.",
                }
            ],
        },
    )


class FakeSession:
    """Simple async session stub for testing card updates without a database."""

    def __init__(self, card):
        self.card = card
        self.committed = False

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    async def get(self, model, card_id):
        if self.card is not None and self.card.id == card_id:
            return self.card
        return None

    async def commit(self):
        self.committed = True


def make_session_factory(card):
    """Return a session factory compatible with the service constructor."""

    def factory():
        return FakeSession(card)

    return factory


@pytest.mark.asyncio
async def test_generate_image_returns_correct_dict(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """OpenAI image generation should return the normalized response payload."""

    service_module = reload_dalle_service_module()
    FakeAsyncClient.queued_post_responses = [make_openai_success_response()]
    FakeAsyncClient.queued_get_responses = []
    FakeAsyncClient.posted_payloads = []
    FakeAsyncClient.raise_on_post = None
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService()

    result = await service.generate_image("A premium greeting card background")

    assert result == {
        "image_url": "https://example.com/image.png",
        "revised_prompt": "A beautiful scene with warm light and festive details.",
        "card_id": None,
        "cost_estimate": 0.04,
    }


@pytest.mark.asyncio
async def test_generate_image_standard_cost_is_004(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Standard 1024 images should use the base $0.04 cost."""

    service_module = reload_dalle_service_module()
    FakeAsyncClient.queued_post_responses = [make_openai_success_response()]
    FakeAsyncClient.raise_on_post = None
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService()

    result = await service.generate_image("Prompt", quality="standard", size="1024x1024")

    assert result["cost_estimate"] == 0.04


@pytest.mark.asyncio
async def test_generate_image_hd_cost_is_008(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """HD 1024 images should use the $0.08 cost."""

    service_module = reload_dalle_service_module()
    FakeAsyncClient.queued_post_responses = [make_openai_success_response()]
    FakeAsyncClient.raise_on_post = None
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService()

    result = await service.generate_image("Prompt", quality="hd", size="1024x1024")

    assert result["cost_estimate"] == 0.08


@pytest.mark.asyncio
async def test_generate_image_large_standard_cost_is_008(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Large standard aspect ratios should use the $0.08 cost."""

    service_module = reload_dalle_service_module()
    FakeAsyncClient.queued_post_responses = [make_openai_success_response()]
    FakeAsyncClient.raise_on_post = None
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService()

    result = await service.generate_image("Prompt", quality="standard", size="1792x1024")

    assert result["cost_estimate"] == 0.08


@pytest.mark.asyncio
async def test_validate_image_returns_valid_for_good_image(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """A good PNG should pass validation with dimensions and size metadata."""

    service_module = reload_dalle_service_module()
    FakeAsyncClient.queued_get_responses = [
        FakeResponse(
            status_code=200,
            content=create_valid_png_bytes(),
            headers={"Content-Type": "image/png"},
        )
    ]
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService()

    validation = await service.validate_image("https://example.com/image.png")

    assert validation["valid"] is True
    assert validation["width"] == 1024
    assert validation["height"] == 1024
    assert validation["content_type"] == "image/png"


@pytest.mark.asyncio
async def test_validate_image_returns_invalid_for_wrong_content_type(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Unsupported MIME types should fail validation cleanly."""

    service_module = reload_dalle_service_module()
    FakeAsyncClient.queued_get_responses = [
        FakeResponse(
            status_code=200,
            content=create_valid_png_bytes(),
            headers={"Content-Type": "application/pdf"},
        )
    ]
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService()

    validation = await service.validate_image("https://example.com/image.png")

    assert validation["valid"] is False
    assert validation["error"] == "Unsupported content type."


@pytest.mark.asyncio
async def test_validate_image_returns_invalid_for_small_file(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Files smaller than 100KB should be rejected."""

    service_module = reload_dalle_service_module()
    FakeAsyncClient.queued_get_responses = [
        FakeResponse(
            status_code=200,
            content=create_small_png_bytes(),
            headers={"Content-Type": "image/png"},
        )
    ]
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService()

    validation = await service.validate_image("https://example.com/image.png")

    assert validation["valid"] is False
    assert validation["error"] == "Image file is smaller than 100KB."


@pytest.mark.asyncio
async def test_download_and_store_returns_bytes(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Downloading a generated image should return raw bytes without writing to disk."""

    service_module = reload_dalle_service_module()
    image_bytes = create_valid_png_bytes()
    FakeAsyncClient.queued_get_responses = [
        FakeResponse(status_code=200, content=image_bytes, headers={"Content-Type": "image/png"})
    ]
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService()

    downloaded = await service.download_and_store("https://example.com/image.png", card_id=12)

    assert downloaded == image_bytes


@pytest.mark.asyncio
async def test_generate_image_updates_card_status(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Generating an image for a card should persist URL, prompt, cost, and status."""

    service_module = reload_dalle_service_module()
    card_model = importlib.import_module("app.models.card")
    card = card_model.Card(
        id=5,
        event_id=1,
        theme_name="Festival Glow",
        theme_source="weekly",
        phrase="Warm wishes always",
        dalle_prompt="Old prompt",
        status="pending_image",
    )
    FakeAsyncClient.queued_post_responses = [make_openai_success_response()]
    FakeAsyncClient.raise_on_post = None
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService(session_factory=make_session_factory(card))

    result = await service.generate_image("Fresh prompt", card_id=5)

    assert result["card_id"] == 5
    assert card.image_url == "https://example.com/image.png"
    assert card.dalle_prompt == "A beautiful scene with warm light and festive details."
    assert card.status == "pending_image_approval"
    assert card.cost_image == Decimal("0.0400")


@pytest.mark.asyncio
async def test_generate_image_raises_503_when_openai_fails(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Transport failures from OpenAI should surface as 503 errors."""

    service_module = reload_dalle_service_module()
    FakeAsyncClient.raise_on_post = service_module.httpx.ConnectError("boom")
    FakeAsyncClient.queued_post_responses = []
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.DalleService()

    with pytest.raises(service_module.HTTPException) as exc_info:
        await service.generate_image("Prompt")

    assert exc_info.value.status_code == 503
