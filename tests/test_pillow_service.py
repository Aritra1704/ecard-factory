"""Unit tests for the Pillow-based card assembly service."""

from __future__ import annotations

from io import BytesIO
from unittest.mock import AsyncMock
import importlib
import sys

import pytest
from PIL import Image, ImageDraw, ImageFont


def reload_pillow_service_module():
    """Reload the Pillow service module so monkeypatches do not leak between tests."""

    for module_name in list(sys.modules):
        if module_name.startswith("app.services.pillow_service"):
            sys.modules.pop(module_name, None)

    return importlib.import_module("app.services.pillow_service")


def create_test_image_bytes() -> bytes:
    """Create a simple in-memory red PNG for mocked HTTP downloads."""

    image = Image.new("RGB", (100, 100), (220, 20, 60))
    output = BytesIO()
    image.save(output, format="PNG")
    return output.getvalue()


class FakeResponse:
    """Minimal httpx response stub for successful image downloads."""

    def __init__(self, content: bytes):
        self.content = content

    def raise_for_status(self) -> None:
        return None


class FakeAsyncClient:
    """Minimal async httpx client stub with context-manager support."""

    response_content = create_test_image_bytes()

    def __init__(self, *args, **kwargs):
        self.get = AsyncMock(return_value=FakeResponse(self.response_content))

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False


def test_auto_font_size_returns_expected_breakpoints() -> None:
    """Font sizing should follow the requested short, medium, and long rules."""

    service_module = reload_pillow_service_module()
    service = service_module.PillowService()

    assert service._auto_font_size("Short lovely wish") == 72
    assert service._auto_font_size("This phrase has exactly nine words in total here") == 56
    assert service._auto_font_size(
        "This phrase definitely has more than fifteen words and should therefore use the smallest configured size"
    ) == 44


def test_wrap_text_splits_long_phrases_correctly() -> None:
    """Long phrases should wrap into multiple lines within the max width."""

    service_module = reload_pillow_service_module()
    service = service_module.PillowService()
    image = Image.new("RGB", (400, 400), "white")
    draw = ImageDraw.Draw(image)
    font = ImageFont.load_default()

    lines = service._wrap_text(
        "This is a fairly long phrase intended to wrap across multiple lines neatly",
        font,
        120,
        draw,
    )

    assert len(lines) > 1
    for line in lines:
        assert draw.textlength(line, font=font) <= 120


@pytest.mark.asyncio
async def test_assemble_card_returns_png_bytes_and_correct_dimensions(monkeypatch) -> None:
    """Production card assembly should return PNG bytes at 2100x2100."""

    service_module = reload_pillow_service_module()
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.PillowService()

    result = await service.assemble_card(
        image_url="https://example.com/card.png",
        phrase="Wishing you joy and light",
        theme_name="Festival Glow",
        color_palette=["#264653", "#2A9D8F"],
        visual_style="clean illustration",
        card_id=101,
    )

    assert isinstance(result, bytes)
    assembled_image = Image.open(BytesIO(result))
    assert assembled_image.format == "PNG"
    assert assembled_image.size == (2100, 2100)


@pytest.mark.asyncio
async def test_create_preview_returns_smaller_jpeg_than_full_card(monkeypatch) -> None:
    """Preview generation should return a smaller 800x800 JPEG than the full card."""

    service_module = reload_pillow_service_module()
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.PillowService()

    assembled = await service.assemble_card(
        image_url="https://example.com/card.png",
        phrase="Wishing you joy and light",
        theme_name="Festival Glow",
        color_palette=["#264653", "#2A9D8F"],
        visual_style="clean illustration",
        card_id=101,
    )
    preview = await service.create_preview(
        image_url="https://example.com/card.png",
        phrase="Wishing you joy and light",
        color_palette=["#264653", "#2A9D8F"],
    )

    assert isinstance(preview, bytes)
    preview_image = Image.open(BytesIO(preview))
    assert preview_image.format == "JPEG"
    assert preview_image.size == (800, 800)
    assert len(preview) < len(assembled)
