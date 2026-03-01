"""Pydantic schemas for Telegram approval and webhook endpoints."""

from __future__ import annotations

from typing import Any

from pydantic import BaseModel, Field


class PhraseApprovalRequest(BaseModel):
    """Request body for sending phrase candidates to Telegram."""

    card_id: int
    phrases: list[dict[str, Any]] = Field(default_factory=list)
    theme_name: str
    plan_date: str


class ImageApprovalRequest(BaseModel):
    """Request body for sending an image approval request to Telegram."""

    card_id: int
    image_url: str
    phrase: str
    theme_name: str


class FinalApprovalRequest(BaseModel):
    """Request body for sending a final assembled preview to Telegram."""

    card_id: int
    preview_base64: str
    phrase: str
    theme_name: str
    estimated_cost: float


class TelegramNotificationRequest(BaseModel):
    """Request body for sending a generic Telegram notification."""

    message: str
    parse_mode: str = "HTML"


class TelegramWebhookRequest(BaseModel):
    """Webhook payload wrapper for Telegram update objects."""

    update: dict[str, Any]


class TelegramSetupWebhookRequest(BaseModel):
    """Request body for registering the public Telegram webhook URL."""

    public_base_url: str


class TelegramSendResponse(BaseModel):
    """Response returned after sending a Telegram message or photo."""

    message_id: int
    sent: bool


class TelegramSetupWebhookResponse(BaseModel):
    """Response returned after a successful Telegram webhook registration."""

    message_id: int
    sent: bool
    webhook_url: str


class TelegramWebhookResponse(BaseModel):
    """Response returned after processing one Telegram webhook command."""

    action: str
    card_id: int | None = None
    phrase_index: int | None = None
    reason: str | None = None
