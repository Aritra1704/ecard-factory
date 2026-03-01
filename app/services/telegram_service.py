"""Telegram bot service for approval workflows and operator notifications."""

from __future__ import annotations

from base64 import b64decode
from html import escape
import re
from typing import Any

from fastapi import HTTPException, status
import httpx

from app.config import settings
from app.database import async_session_factory
from app.models.card import Card


class TelegramService:
    """Send approval prompts to Telegram and process webhook command responses."""

    PHRASE_APPROVE_RE = re.compile(r"^/approve_phrase_(\d+)_(\d+)$")
    PHRASE_REJECT_RE = re.compile(r"^/reject_phrase_(\d+)$")
    IMAGE_APPROVE_RE = re.compile(r"^/approve_image_(\d+)$")
    IMAGE_REJECT_RE = re.compile(r"^/reject_image_(\d+)$")
    FINAL_APPROVE_RE = re.compile(r"^/approve_final_(\d+)$")
    FINAL_REJECT_RE = re.compile(r"^/reject_final_(\d+)$")
    REGENERATE_RE = re.compile(r"^/regenerate_(\d+)$")

    def __init__(self, token: str | None = None, chat_id: str | None = None, session_factory=None) -> None:
        """Create a Telegram service using the configured bot token and chat id."""

        self.token = token or settings.telegram_bot_token
        self.chat_id = str(chat_id or settings.telegram_chat_id)
        self.session_factory = session_factory or async_session_factory
        self.base_url = f"https://api.telegram.org/bot{self.token}"

    async def send_phrase_approval(
        self,
        card_id: int,
        phrases: list[dict[str, Any]],
        theme_name: str,
        plan_date: str,
    ) -> dict[str, int | bool]:
        """Send the generated phrases to Telegram for manual approval."""

        if not phrases:
            raise HTTPException(status_code=422, detail="At least one phrase is required for approval.")

        await self._store_candidate_phrases(card_id=card_id, phrases=phrases)
        best_index = self._find_best_phrase_index(phrases)
        lines = [f"<b>\U0001F3A8 Daily Card Generation — {escape(plan_date)}</b>", ""]
        lines.append(f"<b>Theme:</b> {escape(theme_name)}")
        lines.append("")
        for index, phrase in enumerate(phrases, start=1):
            text = escape(str(phrase.get("text", "")))
            tone = escape(str(phrase.get("tone", "balanced")))
            prefix = "\u2b50 " if index - 1 == best_index else ""
            lines.append(f"{prefix}<b>{index}.</b> {text} <i>({tone})</i>")
        lines.extend(
            [
                "",
                (
                    f"Reply with /approve_phrase_{card_id}_{{index}} "
                    f"or /reject_phrase_{card_id}"
                ),
            ]
        )
        message = "\n".join(lines)
        return await self._send_message(message)

    async def send_image_approval(
        self,
        card_id: int,
        image_url: str,
        phrase: str,
        theme_name: str,
    ) -> dict[str, int | bool]:
        """Send the generated image URL to Telegram for visual approval."""

        caption = (
            f"\U0001F5BC Image for Card #{card_id}\n"
            f"Theme: {theme_name}\n"
            f'Phrase: "{phrase}"\n\n'
            f"/approve_image_{card_id} or /reject_image_{card_id}"
        )
        return await self._send_photo_url(photo=image_url, caption=caption)

    async def send_final_approval(
        self,
        card_id: int,
        preview_bytes: bytes,
        phrase: str,
        theme_name: str,
        estimated_cost: float,
    ) -> dict[str, int | bool]:
        """Send the assembled preview bytes to Telegram for final approval."""

        caption = (
            f"\u2705 Final Card Preview — Card #{card_id}\n"
            f'Phrase: "{phrase}"\n'
            f"Theme: {theme_name}\n"
            f"Est. cost: ${estimated_cost:.4f}\n\n"
            f"/approve_final_{card_id} — Publish to Gumroad\n"
            f"/reject_final_{card_id} — Discard\n"
            f"/regenerate_{card_id} — Regenerate image"
        )
        return await self._send_photo_bytes(photo_bytes=preview_bytes, caption=caption)

    async def send_notification(
        self,
        message: str,
        parse_mode: str = "HTML",
    ) -> dict[str, int | bool]:
        """Send a generic operator notification through the Telegram bot."""

        return await self._send_message(message, parse_mode=parse_mode)

    async def process_webhook(self, update: dict[str, Any]) -> dict[str, Any]:
        """Parse a Telegram webhook payload and execute the requested approval action."""

        message = self._extract_message(update)
        text = str(message.get("text") or "").strip()
        chat_id = str(message.get("chat", {}).get("id", ""))
        if not text:
            return {"action": "ignored", "reason": "no_text"}
        if chat_id and chat_id != self.chat_id:
            return {"action": "ignored", "reason": "unknown_chat"}

        async with self.session_factory() as session:
            if match := self.PHRASE_APPROVE_RE.match(text):
                card_id = int(match.group(1))
                phrase_index = int(match.group(2))
                card = await session.get(Card, card_id)
                self._require_card(card, card_id)
                phrases = list(card.candidate_phrases or [])
                if phrase_index < 1 or phrase_index > len(phrases):
                    raise HTTPException(status_code=422, detail="Phrase index out of range.")

                approved_phrase = str(phrases[phrase_index - 1].get("text") or "").strip()
                if not approved_phrase:
                    raise HTTPException(status_code=422, detail="Selected phrase is empty.")

                card.phrase = approved_phrase
                card.status = "phrase_approved"
                await session.commit()
                await self.send_notification(f"Phrase approved for Card #{card_id}.")
                return {
                    "action": "phrase_approved",
                    "card_id": card_id,
                    "phrase_index": phrase_index,
                }

            if match := self.PHRASE_REJECT_RE.match(text):
                card_id = int(match.group(1))
                card = await session.get(Card, card_id)
                self._require_card(card, card_id)
                card.status = "rejected"
                await session.commit()
                await self.send_notification(
                    f"Phrase rejected for Card #{card_id}. Send /regenerate_{card_id} to retry."
                )
                return {"action": "phrase_rejected", "card_id": card_id}

            if match := self.IMAGE_APPROVE_RE.match(text):
                card_id = int(match.group(1))
                card = await session.get(Card, card_id)
                self._require_card(card, card_id)
                card.status = "image_approved"
                await session.commit()
                await self.send_notification(f"Image approved for Card #{card_id}.")
                return {"action": "image_approved", "card_id": card_id}

            if match := self.IMAGE_REJECT_RE.match(text):
                card_id = int(match.group(1))
                card = await session.get(Card, card_id)
                self._require_card(card, card_id)
                card.status = "rejected"
                await session.commit()
                await self.send_notification(
                    f"Image rejected for Card #{card_id}. Send /regenerate_{card_id} to try again."
                )
                return {"action": "image_rejected", "card_id": card_id}

            if match := self.FINAL_APPROVE_RE.match(text):
                card_id = int(match.group(1))
                card = await session.get(Card, card_id)
                self._require_card(card, card_id)
                card.status = "published"
                await session.commit()
                await self.send_notification(f"Final card approved and published for Card #{card_id}.")
                return {"action": "final_approved", "card_id": card_id}

            if match := self.FINAL_REJECT_RE.match(text):
                card_id = int(match.group(1))
                card = await session.get(Card, card_id)
                self._require_card(card, card_id)
                card.status = "rejected"
                await session.commit()
                await self.send_notification(f"Final card rejected for Card #{card_id}.")
                return {"action": "final_rejected", "card_id": card_id}

            if match := self.REGENERATE_RE.match(text):
                card_id = int(match.group(1))
                card = await session.get(Card, card_id)
                self._require_card(card, card_id)
                card.status = "pending_image"
                await session.commit()
                await self.send_notification(f"Regeneration requested for Card #{card_id}.")
                return {"action": "regenerate_requested", "card_id": card_id}

        return {"action": "ignored", "reason": "unknown_command"}

    async def _send_message(self, text: str, parse_mode: str = "HTML") -> dict[str, int | bool]:
        """Send a plain Telegram text message and return the platform message id."""

        payload = {
            "chat_id": self.chat_id,
            "text": text,
            "parse_mode": parse_mode,
        }
        return await self._post_telegram("sendMessage", data=payload)

    async def _send_photo_url(self, *, photo: str, caption: str) -> dict[str, int | bool]:
        """Send a Telegram photo using a remote URL."""

        payload = {
            "chat_id": self.chat_id,
            "photo": photo,
            "caption": caption,
        }
        return await self._post_telegram("sendPhoto", data=payload)

    async def _send_photo_bytes(self, *, photo_bytes: bytes, caption: str) -> dict[str, int | bool]:
        """Send a Telegram photo as multipart bytes."""

        data = {
            "chat_id": self.chat_id,
            "caption": caption,
        }
        files = {
            "photo": ("card-preview.jpg", photo_bytes, "image/jpeg"),
        }
        return await self._post_telegram("sendPhoto", data=data, files=files)

    async def _post_telegram(
        self,
        method: str,
        *,
        data: dict[str, Any],
        files: dict[str, Any] | None = None,
    ) -> dict[str, int | bool]:
        """Send one request to the Telegram Bot API and normalize the response."""

        url = f"{self.base_url}/{method}"
        try:
            async with httpx.AsyncClient(timeout=20.0) as client:
                response = await client.post(url, data=data, files=files)
                response.raise_for_status()
                payload = response.json()
        except (httpx.HTTPError, ValueError) as exc:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Telegram API request failed.",
            ) from exc

        if not payload.get("ok"):
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Telegram API returned an unsuccessful response.",
            )

        message_id = int(payload.get("result", {}).get("message_id", 0))
        return {"message_id": message_id, "sent": True}

    async def _store_candidate_phrases(self, *, card_id: int, phrases: list[dict[str, Any]]) -> None:
        """Persist phrase candidates on the card so webhook approvals can resolve by index."""

        async with self.session_factory() as session:
            card = await session.get(Card, card_id)
            self._require_card(card, card_id)
            card.candidate_phrases = phrases
            await session.commit()

    def _find_best_phrase_index(self, phrases: list[dict[str, Any]]) -> int:
        """Choose which phrase to highlight as the recommended option."""

        for index, phrase in enumerate(phrases):
            if bool(phrase.get("is_best") or phrase.get("recommended") or phrase.get("best")):
                return index
        return 0

    def _extract_message(self, update: dict[str, Any]) -> dict[str, Any]:
        """Return the primary message object from a Telegram webhook payload."""

        for key in ("message", "edited_message", "channel_post"):
            value = update.get(key)
            if isinstance(value, dict):
                return value
        return {}

    def _require_card(self, card: Card | None, card_id: int) -> None:
        """Raise a 404 if the target card does not exist."""

        if card is None:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Card {card_id} not found.",
            )


def decode_preview_base64(preview_base64: str) -> bytes:
    """Decode preview image content from a base64 string."""

    try:
        return b64decode(preview_base64)
    except ValueError as exc:
        raise HTTPException(status_code=422, detail="Invalid base64 preview payload.") from exc
