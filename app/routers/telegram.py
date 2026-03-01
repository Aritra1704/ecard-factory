"""Telegram approval endpoints for n8n notifications and webhook processing."""

from __future__ import annotations

from fastapi import APIRouter

from app.schemas.telegram import (
    FinalApprovalRequest,
    ImageApprovalRequest,
    PhraseApprovalRequest,
    TelegramNotificationRequest,
    TelegramSendResponse,
    TelegramSetupWebhookRequest,
    TelegramSetupWebhookResponse,
    TelegramWebhookRequest,
    TelegramWebhookResponse,
)
from app.services.telegram_service import TelegramService, decode_preview_base64

router = APIRouter(tags=["telegram"])
service = TelegramService()


@router.post("/phrase-approval", response_model=TelegramSendResponse)
async def send_phrase_approval(payload: PhraseApprovalRequest) -> TelegramSendResponse:
    """Send a phrase approval prompt to Telegram."""

    result = await service.send_phrase_approval(
        card_id=payload.card_id,
        phrases=payload.phrases,
        theme_name=payload.theme_name,
        plan_date=payload.plan_date,
    )
    return TelegramSendResponse(**result)


@router.post("/image-approval", response_model=TelegramSendResponse)
async def send_image_approval(payload: ImageApprovalRequest) -> TelegramSendResponse:
    """Send an image approval prompt to Telegram."""

    result = await service.send_image_approval(
        card_id=payload.card_id,
        image_url=payload.image_url,
        phrase=payload.phrase,
        theme_name=payload.theme_name,
    )
    return TelegramSendResponse(**result)


@router.post("/final-approval", response_model=TelegramSendResponse)
async def send_final_approval(payload: FinalApprovalRequest) -> TelegramSendResponse:
    """Send a final assembled preview to Telegram."""

    result = await service.send_final_approval(
        card_id=payload.card_id,
        preview_bytes=decode_preview_base64(payload.preview_base64),
        phrase=payload.phrase,
        theme_name=payload.theme_name,
        estimated_cost=payload.estimated_cost,
    )
    return TelegramSendResponse(**result)


@router.post("/notify", response_model=TelegramSendResponse)
async def send_notification(payload: TelegramNotificationRequest) -> TelegramSendResponse:
    """Send a generic notification message to Telegram."""

    result = await service.send_notification(message=payload.message, parse_mode=payload.parse_mode)
    return TelegramSendResponse(**result)


@router.post("/setup-webhook", response_model=TelegramSetupWebhookResponse)
async def setup_telegram_webhook(
    payload: TelegramSetupWebhookRequest,
) -> TelegramSetupWebhookResponse:
    """Register the deployed app URL as the Telegram webhook target."""

    result = await service.setup_webhook(payload.public_base_url)
    return TelegramSetupWebhookResponse(**result)


@router.post("/webhook", response_model=TelegramWebhookResponse)
async def process_telegram_webhook(payload: TelegramWebhookRequest) -> TelegramWebhookResponse:
    """Process an inbound Telegram bot webhook update."""

    result = await service.process_webhook(payload.update)
    return TelegramWebhookResponse(**result)
