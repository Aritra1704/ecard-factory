"""HTTP tests for the card workflow endpoints."""

from __future__ import annotations

from datetime import datetime, timezone
from decimal import Decimal
import importlib
import sys

from fastapi.testclient import TestClient


def reload_app_modules():
    """Reload the main app and cards router so test env overrides are applied cleanly."""

    for module_name in list(sys.modules):
        if (
            module_name in {"app.config", "app.database", "app.main"}
            or module_name.startswith("app.models")
            or module_name.startswith("app.routers")
            or module_name.startswith("app.schemas")
        ):
            sys.modules.pop(module_name, None)

    main_module = importlib.import_module("app.main")
    cards_module = importlib.import_module("app.routers.cards")
    return main_module, cards_module


class FakeScalarsResult:
    """Minimal scalar result wrapper for select(Card) responses."""

    def __init__(self, items):
        self.items = list(items)

    def all(self):
        return list(self.items)


class FakeExecuteResult:
    """Minimal execute result wrapper that exposes scalars()."""

    def __init__(self, items):
        self.items = list(items)

    def scalars(self) -> FakeScalarsResult:
        return FakeScalarsResult(self.items)


class FakeCardSession:
    """Simple in-memory async session stub for cards router tests."""

    def __init__(self, seed_cards=None):
        self.cards = {card.id: card for card in (seed_cards or [])}
        self.next_id = max(self.cards.keys(), default=0) + 1
        self.pending_add = None

    def add(self, card) -> None:
        self.pending_add = card

    async def commit(self) -> None:
        return None

    async def refresh(self, card) -> None:
        if getattr(card, "id", None) is None:
            card.id = self.next_id
            self.next_id += 1
        if getattr(card, "created_at", None) is None:
            card.created_at = datetime(2026, 2, 28, 8, 30, tzinfo=timezone.utc)
        if getattr(card, "cost_llm", None) is None:
            card.cost_llm = Decimal("0.0000")
        if getattr(card, "cost_image", None) is None:
            card.cost_image = Decimal("0.0400")
        self.cards[card.id] = card
        self.pending_add = None

    async def get(self, model, card_id: int):
        return self.cards.get(card_id)

    async def execute(self, statement):
        pending_cards = [
            card for card in self.cards.values() if "pending" in (card.status or "")
        ]
        pending_cards.sort(key=lambda card: (card.created_at, card.id), reverse=True)
        return FakeExecuteResult(pending_cards)


def make_card(card_model, *, card_id: int, status: str, image_url: str | None = None):
    """Build a fully populated card ORM instance for response serialization."""

    return card_model.Card(
        id=card_id,
        event_id=7,
        theme_name="Festival Glow",
        theme_source="weekly",
        phrase="Warm wishes for your day",
        dalle_prompt="festive illustration",
        image_url=image_url,
        canva_url=None,
        final_png_url=None,
        status=status,
        cost_llm=Decimal("0.0000"),
        cost_image=Decimal("0.0400"),
        created_at=datetime(2026, 2, 28, 8, card_id, tzinfo=timezone.utc),
    )


def test_post_cards_create_returns_201_with_card_id(
    configured_env: dict[str, str],
) -> None:
    """Card creation should persist a new row and return its generated identity."""

    main_module, cards_module = reload_app_modules()
    card_model = importlib.import_module("app.models.card")
    session = FakeCardSession()

    async def override_get_db():
        yield session

    main_module.app.dependency_overrides[cards_module.get_db] = override_get_db

    try:
        with TestClient(main_module.app) as client:
            response = client.post(
                "/cards/create",
                json={
                    "phrase": "Warm wishes for your day",
                    "theme_name": "Festival Glow",
                    "theme_source": "weekly",
                    "event_id": 7,
                    "dalle_prompt": "festive illustration",
                },
            )
    finally:
        main_module.app.dependency_overrides.clear()

    assert response.status_code == 201
    assert response.json()["card_id"] == 1
    assert response.json()["status"] == "pending_phrase_approval"
    assert 1 in session.cards
    assert isinstance(session.cards[1], card_model.Card)


def test_patch_cards_status_updates_correctly(
    configured_env: dict[str, str],
) -> None:
    """Status updates should mutate the stored card and return the new value."""

    main_module, cards_module = reload_app_modules()
    card_model = importlib.import_module("app.models.card")
    session = FakeCardSession(
        [make_card(card_model, card_id=1, status="pending_phrase_approval")]
    )

    async def override_get_db():
        yield session

    main_module.app.dependency_overrides[cards_module.get_db] = override_get_db

    try:
        with TestClient(main_module.app) as client:
            response = client.patch("/cards/1/status", json={"status": "phrase_approved"})
    finally:
        main_module.app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json() == {"card_id": 1, "status": "phrase_approved"}
    assert session.cards[1].status == "phrase_approved"


def test_patch_cards_urls_updates_correctly(
    configured_env: dict[str, str],
) -> None:
    """URL updates should persist the provided fields and report what changed."""

    main_module, cards_module = reload_app_modules()
    card_model = importlib.import_module("app.models.card")
    session = FakeCardSession(
        [make_card(card_model, card_id=1, status="pending_image")]
    )

    async def override_get_db():
        yield session

    main_module.app.dependency_overrides[cards_module.get_db] = override_get_db

    try:
        with TestClient(main_module.app) as client:
            response = client.patch(
                "/cards/1/urls",
                json={"image_url": "https://cdn.example.com/final.png"},
            )
    finally:
        main_module.app.dependency_overrides.clear()

    assert response.status_code == 200
    assert response.json() == {"card_id": 1, "updated_fields": ["image_url"]}
    assert session.cards[1].image_url == "https://cdn.example.com/final.png"


def test_get_cards_pending_returns_list(
    configured_env: dict[str, str],
) -> None:
    """Pending cards endpoint should return the cards still awaiting workflow steps."""

    main_module, cards_module = reload_app_modules()
    card_model = importlib.import_module("app.models.card")
    session = FakeCardSession(
        [
            make_card(card_model, card_id=1, status="pending_phrase_approval"),
            make_card(card_model, card_id=2, status="published"),
            make_card(card_model, card_id=3, status="pending_assembly"),
        ]
    )

    async def override_get_db():
        yield session

    main_module.app.dependency_overrides[cards_module.get_db] = override_get_db

    try:
        with TestClient(main_module.app) as client:
            response = client.get("/cards/pending")
    finally:
        main_module.app.dependency_overrides.clear()

    assert response.status_code == 200
    payload = response.json()
    assert isinstance(payload, list)
    assert [item["id"] for item in payload] == [3, 1]
    assert all("pending" in item["status"] for item in payload)


def test_invalid_card_status_returns_422(
    configured_env: dict[str, str],
) -> None:
    """Unsupported workflow statuses should be rejected by request validation."""

    main_module, cards_module = reload_app_modules()
    card_model = importlib.import_module("app.models.card")
    session = FakeCardSession(
        [make_card(card_model, card_id=1, status="pending_phrase_approval")]
    )

    async def override_get_db():
        yield session

    main_module.app.dependency_overrides[cards_module.get_db] = override_get_db

    try:
        with TestClient(main_module.app) as client:
            response = client.patch("/cards/1/status", json={"status": "not_a_real_status"})
    finally:
        main_module.app.dependency_overrides.clear()

    assert response.status_code == 422
