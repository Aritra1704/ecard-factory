"""Card workflow endpoints used by n8n and operator tooling."""

from __future__ import annotations

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from app.database import get_db
from app.models.card import Card
from app.schemas.cards import (
    CardContentUpdate,
    CardCreate,
    CardResponse,
    CardStatusUpdate,
    CardUrlUpdate,
)

router = APIRouter(prefix="/cards", tags=["cards"])


@router.post("/create", status_code=status.HTTP_201_CREATED)
async def create_card(
    payload: CardCreate,
    db: AsyncSession = Depends(get_db),
) -> dict[str, int | str]:
    """Create a new card row for the downstream approval and assembly flow."""

    card = Card(
        event_id=payload.event_id,
        theme_name=payload.theme_name,
        theme_source=payload.theme_source,
        phrase=payload.phrase,
        dalle_prompt=payload.dalle_prompt,
        status="pending_phrase_approval",
    )
    db.add(card)
    await db.commit()
    await db.refresh(card)

    return {
        "card_id": card.id,
        "status": card.status,
        "created_at": card.created_at.isoformat(),
    }


@router.patch("/{card_id}/status", name="update_card_status")
async def update_card_status(
    card_id: int,
    payload: CardStatusUpdate,
    db: AsyncSession = Depends(get_db),
) -> dict[str, int | str]:
    """Advance or reject a card as it moves through the workflow pipeline."""

    card = await db.get(Card, card_id)
    if card is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found.")

    card.status = payload.status
    await db.commit()

    return {"card_id": card.id, "status": card.status}


@router.patch("/{card_id}/urls")
async def update_card_urls(
    card_id: int,
    payload: CardUrlUpdate,
    db: AsyncSession = Depends(get_db),
) -> dict[str, int | list[str]]:
    """Persist generated asset URLs as the card progresses through the pipeline."""

    card = await db.get(Card, card_id)
    if card is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found.")

    updated_fields = list(payload.model_dump(exclude_unset=True).keys())
    for field_name, value in payload.model_dump(exclude_unset=True).items():
        setattr(card, field_name, value)

    await db.commit()

    return {"card_id": card.id, "updated_fields": updated_fields}


@router.patch("/{card_id}/content")
async def update_card_content(
    card_id: int,
    payload: CardContentUpdate,
    db: AsyncSession = Depends(get_db),
) -> dict[str, int | list[str]]:
    """Persist generated phrase or prompt content for a card record."""

    card = await db.get(Card, card_id)
    if card is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found.")

    updates = payload.model_dump(exclude_unset=True)
    if not updates:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="No content fields provided.")

    for field_name, value in updates.items():
        setattr(card, field_name, value)

    await db.commit()

    return {"card_id": card.id, "updated_fields": list(updates.keys())}


@router.get("/pending", response_model=list[CardResponse])
async def get_pending_cards(db: AsyncSession = Depends(get_db)) -> list[CardResponse]:
    """Return every card still waiting on some workflow stage or manual approval."""

    statement = (
        select(Card)
        .where(Card.status.ilike("%pending%"))
        .order_by(Card.created_at.desc(), Card.id.desc())
    )
    result = await db.execute(statement)
    cards = result.scalars().all()
    return [CardResponse.model_validate(card) for card in cards]


@router.get("/{card_id}", response_model=CardResponse)
async def get_card(card_id: int, db: AsyncSession = Depends(get_db)) -> CardResponse:
    """Return the full stored representation for a single card."""

    card = await db.get(Card, card_id)
    if card is None:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Card not found.")

    return CardResponse.model_validate(card)
