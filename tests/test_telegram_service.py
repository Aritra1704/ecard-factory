"""Unit tests for the Telegram approval bot service."""

from __future__ import annotations

from base64 import b64encode
from unittest.mock import AsyncMock
import importlib
import sys

import pytest


def reload_telegram_service_module():
    """Reload the Telegram service module so test monkeypatches are isolated."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database"}
            or module_name.startswith("app.models")
            or module_name.startswith("app.services.telegram_service")
        ):
            sys.modules.pop(module_name, None)

    return importlib.import_module("app.services.telegram_service")


class FakeResponse:
    """Minimal httpx response stub for Telegram API tests."""

    def __init__(self, payload):
        self.payload = payload

    def raise_for_status(self) -> None:
        return None

    def json(self):
        return self.payload


class FakeAsyncClient:
    """Queued async client stub that captures Telegram Bot API requests."""

    responses: list[dict] = []
    posted_requests: list[dict] = []

    def __init__(self, *args, **kwargs):
        self.post = AsyncMock(side_effect=self._post)

    async def __aenter__(self):
        return self

    async def __aexit__(self, exc_type, exc, tb):
        return False

    async def _post(self, url, *, data=None, files=None):
        self.__class__.posted_requests.append({"url": url, "data": data, "files": files})
        return FakeResponse(self.__class__.responses.pop(0))


class FakeSession:
    """Simple async session stub for Telegram service tests."""

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
    """Return a session factory for the provided in-memory card object."""

    def factory():
        return FakeSession(card)

    return factory


def make_telegram_ok_payload(message_id: int = 101) -> dict:
    """Return a minimal successful Telegram Bot API payload."""

    return {"ok": True, "result": {"message_id": message_id}}


@pytest.mark.asyncio
async def test_send_phrase_approval_returns_message_id_and_stores_candidates(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Phrase approval sends a Telegram message and stores the candidate phrases on the card."""

    service_module = reload_telegram_service_module()
    card_model = importlib.import_module("app.models.card")
    card = card_model.Card(
        id=9,
        event_id=1,
        theme_name="Festival Glow",
        theme_source="weekly",
        phrase="Warm wishes always",
    )
    FakeAsyncClient.responses = [make_telegram_ok_payload(321)]
    FakeAsyncClient.posted_requests = []
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.TelegramService(session_factory=make_session_factory(card))

    result = await service.send_phrase_approval(
        card_id=9,
        phrases=[
            {"text": "May your evening glow with laughter and sweet little surprises ahead!", "tone": "balanced"},
            {
                "text": "Wishing your celebration softer worries, brighter smiles, and warmer hugs tonight!",
                "tone": "emotional",
                "is_best": True,
            },
        ],
        theme_name="Festival Glow",
        plan_date="2026-03-01",
    )

    assert result == {"message_id": 321, "sent": True}
    assert len(card.candidate_phrases) == 2
    assert "\u2b50" in FakeAsyncClient.posted_requests[0]["data"]["text"]


@pytest.mark.asyncio
async def test_send_image_approval_returns_message_id(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Image approval should post the image URL to Telegram as a photo."""

    service_module = reload_telegram_service_module()
    FakeAsyncClient.responses = [make_telegram_ok_payload(456)]
    FakeAsyncClient.posted_requests = []
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.TelegramService(session_factory=make_session_factory(None))

    result = await service.send_image_approval(
        card_id=12,
        image_url="https://example.com/image.png",
        phrase="Warm wishes always",
        theme_name="Festival Glow",
    )

    assert result == {"message_id": 456, "sent": True}
    assert FakeAsyncClient.posted_requests[0]["data"]["photo"] == "https://example.com/image.png"


@pytest.mark.asyncio
async def test_send_final_approval_sends_preview_bytes(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Final approval should upload the preview bytes as multipart photo data."""

    service_module = reload_telegram_service_module()
    FakeAsyncClient.responses = [make_telegram_ok_payload(654)]
    FakeAsyncClient.posted_requests = []
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.TelegramService(session_factory=make_session_factory(None))

    result = await service.send_final_approval(
        card_id=15,
        preview_bytes=b"preview-bytes",
        phrase="Warm wishes always",
        theme_name="Festival Glow",
        estimated_cost=0.084,
    )

    assert result == {"message_id": 654, "sent": True}
    assert FakeAsyncClient.posted_requests[0]["files"]["photo"][1] == b"preview-bytes"


@pytest.mark.asyncio
async def test_send_notification_returns_message_id(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Generic notifications should reuse the sendMessage Telegram path."""

    service_module = reload_telegram_service_module()
    FakeAsyncClient.responses = [make_telegram_ok_payload(777)]
    FakeAsyncClient.posted_requests = []
    monkeypatch.setattr(service_module.httpx, "AsyncClient", FakeAsyncClient)
    service = service_module.TelegramService(session_factory=make_session_factory(None))

    result = await service.send_notification("All systems operational.")

    assert result == {"message_id": 777, "sent": True}
    assert FakeAsyncClient.posted_requests[0]["url"].endswith("/sendMessage")


@pytest.mark.asyncio
async def test_process_webhook_approves_phrase_by_index(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Approving a phrase should replace the card phrase with the chosen candidate."""

    service_module = reload_telegram_service_module()
    card_model = importlib.import_module("app.models.card")
    card = card_model.Card(
        id=3,
        event_id=1,
        theme_name="Festival Glow",
        theme_source="weekly",
        phrase="Original phrase",
        candidate_phrases=[
            {"text": "First option filled with light and sweet joy tonight!", "tone": "balanced"},
            {"text": "Second option bringing softer hope and brighter smiles today!", "tone": "emotional"},
        ],
        status="pending_phrase_approval",
    )
    service = service_module.TelegramService(session_factory=make_session_factory(card))
    monkeypatch.setattr(service, "send_notification", AsyncMock(return_value={"message_id": 1, "sent": True}))

    result = await service.process_webhook(
        {
            "message": {
                "chat": {"id": configured_env["TELEGRAM_CHAT_ID"]},
                "text": "/approve_phrase_3_2",
            }
        }
    )

    assert result == {"action": "phrase_approved", "card_id": 3, "phrase_index": 2}
    assert card.phrase == "Second option bringing softer hope and brighter smiles today!"
    assert card.status == "phrase_approved"


@pytest.mark.asyncio
async def test_process_webhook_rejects_phrase(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Rejecting a phrase should mark the card as rejected."""

    service_module = reload_telegram_service_module()
    card_model = importlib.import_module("app.models.card")
    card = card_model.Card(
        id=4,
        event_id=1,
        theme_name="Festival Glow",
        theme_source="weekly",
        phrase="Original phrase",
        candidate_phrases=[{"text": "Option one", "tone": "balanced"}],
        status="pending_phrase_approval",
    )
    service = service_module.TelegramService(session_factory=make_session_factory(card))
    monkeypatch.setattr(service, "send_notification", AsyncMock(return_value={"message_id": 1, "sent": True}))

    result = await service.process_webhook(
        {
            "message": {
                "chat": {"id": configured_env["TELEGRAM_CHAT_ID"]},
                "text": "/reject_phrase_4",
            }
        }
    )

    assert result == {"action": "phrase_rejected", "card_id": 4}
    assert card.status == "rejected"


@pytest.mark.asyncio
async def test_process_webhook_approves_image(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """Approving an image should advance the card to image_approved."""

    service_module = reload_telegram_service_module()
    card_model = importlib.import_module("app.models.card")
    card = card_model.Card(
        id=5,
        event_id=1,
        theme_name="Festival Glow",
        theme_source="weekly",
        phrase="Warm wishes always",
        status="pending_image_approval",
    )
    service = service_module.TelegramService(session_factory=make_session_factory(card))
    monkeypatch.setattr(service, "send_notification", AsyncMock(return_value={"message_id": 1, "sent": True}))

    result = await service.process_webhook(
        {
            "message": {
                "chat": {"id": configured_env["TELEGRAM_CHAT_ID"]},
                "text": "/approve_image_5",
            }
        }
    )

    assert result == {"action": "image_approved", "card_id": 5}
    assert card.status == "image_approved"


@pytest.mark.asyncio
async def test_process_webhook_requests_regeneration(
    configured_env: dict[str, str],
    monkeypatch,
) -> None:
    """The regenerate command should move the card back to pending_image."""

    service_module = reload_telegram_service_module()
    card_model = importlib.import_module("app.models.card")
    card = card_model.Card(
        id=6,
        event_id=1,
        theme_name="Festival Glow",
        theme_source="weekly",
        phrase="Warm wishes always",
        status="rejected",
    )
    service = service_module.TelegramService(session_factory=make_session_factory(card))
    monkeypatch.setattr(service, "send_notification", AsyncMock(return_value={"message_id": 1, "sent": True}))

    result = await service.process_webhook(
        {
            "message": {
                "chat": {"id": configured_env["TELEGRAM_CHAT_ID"]},
                "text": "/regenerate_6",
            }
        }
    )

    assert result == {"action": "regenerate_requested", "card_id": 6}
    assert card.status == "pending_image"


def test_decode_preview_base64_decodes_bytes(configured_env: dict[str, str]) -> None:
    """Router helper should decode base64 preview payloads into bytes."""

    service_module = reload_telegram_service_module()

    assert service_module.decode_preview_base64(b64encode(b"preview").decode()) == b"preview"
