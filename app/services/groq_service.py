"""Groq-backed phrase and prompt generation service."""

from __future__ import annotations

import json
import logging
import re
from typing import Any

from fastapi import HTTPException, status
import httpx

from app.config import settings

logger = logging.getLogger(__name__)


class GroqService:
    """Generate greeting card phrases and image prompts through Groq's chat API."""

    API_URL = "https://api.groq.com/openai/v1/chat/completions"
    MODEL = "llama-3.3-70b-versatile"
    PHRASE_SYSTEM_PROMPT = (
        "You are a professional greeting card copywriter specializing in emotionally "
        "resonant, culturally aware content for the Indian market. You write phrases "
        "that feel personal, warm, and shareable on WhatsApp and Instagram."
    )
    DALLE_SYSTEM_PROMPT = (
        "You write concise, vivid DALL-E 3 prompts for premium greeting card imagery. "
        "Your prompts should describe only the visual scene and must never ask for text "
        "or typography inside the image."
    )
    DALLE_ENDING = "No text, no words, no letters in the image."

    def __init__(self, api_key: str | None = None) -> None:
        """Create a service instance that authenticates using the configured Groq key."""

        self.api_key = api_key or settings.groq_api_key

    async def generate_phrases(
        self,
        theme_name: str,
        tone_funny_pct: int,
        tone_emotion_pct: int,
        prompt_keywords: list[str],
        visual_style: str,
        event_name: str | None = None,
        count: int = 5,
    ) -> list[dict[str, Any]]:
        """Generate structured greeting card phrases for the provided theme."""

        expected_tone = self._expected_tone(tone_funny_pct, tone_emotion_pct)
        user_prompt = self._build_phrase_prompt(
            theme_name=theme_name,
            event_name=event_name,
            tone_funny_pct=tone_funny_pct,
            tone_emotion_pct=tone_emotion_pct,
            prompt_keywords=prompt_keywords,
            visual_style=visual_style,
            count=count,
        )
        content = await self._chat_completion(
            payload={
                "model": self.MODEL,
                "temperature": 0.9,
                "response_format": {"type": "json_object"},
                "messages": [
                    {"role": "system", "content": self.PHRASE_SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt},
                ],
            }
        )

        phrases = self._parse_phrase_response(
            content=content,
            expected_tone=expected_tone,
            fallback_occasion=event_name or theme_name,
            count=count,
        )
        if not phrases:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Groq returned no usable phrases.",
            )

        logger.info("Generated %s phrases from Groq for theme '%s'.", len(phrases), theme_name)
        return phrases[:count]

    async def select_best_phrase(
        self,
        phrases: list[dict[str, Any]],
        theme_name: str,
        tone_funny_pct: int,
        tone_emotion_pct: int,
    ) -> dict[str, Any]:
        """Return the highest-scoring phrase candidate for the requested tone balance."""

        if not phrases:
            raise HTTPException(
                status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
                detail="At least one phrase is required to select the best candidate.",
            )

        expected_tone = self._expected_tone(tone_funny_pct, tone_emotion_pct)
        best_phrase = max(
            phrases,
            key=lambda phrase: self._score_phrase(phrase, expected_tone=expected_tone),
        )
        logger.info("Selected best Groq phrase for theme '%s' with tone '%s'.", theme_name, expected_tone)
        return self._normalize_phrase(
            best_phrase,
            expected_tone=expected_tone,
            fallback_occasion=theme_name,
        )

    async def generate_dalle_prompt(
        self,
        phrase: str,
        theme_name: str,
        color_palette: list[str],
        visual_style: str,
        prompt_keywords: list[str],
    ) -> str:
        """Generate an optimized DALL-E prompt for a greeting card background image."""

        palette_text = ", ".join(color_palette) if color_palette else "tasteful premium greeting card colors"
        keywords_text = ", ".join(prompt_keywords) if prompt_keywords else "celebratory composition"
        user_prompt = (
            "Create one DALL-E 3 prompt for a greeting card background image.\n"
            f"Approved phrase context: {phrase}\n"
            f"Theme: {theme_name}\n"
            f"Color palette: {palette_text}\n"
            f"Visual style: {visual_style}\n"
            f"Keywords: {keywords_text}\n"
            "Requirements:\n"
            "- Under 900 characters.\n"
            "- Describe a photorealistic or artistic scene suitable for a greeting card background.\n"
            "- Reference the color palette naturally.\n"
            "- Include the visual style.\n"
            "- Do not describe any text, typography, lettering, or written words.\n"
            f'- End exactly with: "{self.DALLE_ENDING}"'
        )
        content = await self._chat_completion(
            payload={
                "model": self.MODEL,
                "temperature": 0.7,
                "messages": [
                    {"role": "system", "content": self.DALLE_SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt},
                ],
            }
        )

        prompt = self._constrain_dalle_prompt(content)
        logger.info("Generated Groq DALL-E prompt for theme '%s'.", theme_name)
        return prompt

    async def _chat_completion(self, payload: dict[str, Any]) -> str:
        """Execute one Groq chat completion request and return the message content."""

        headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

        try:
            async with httpx.AsyncClient(timeout=30.0) as client:
                response = await client.post(self.API_URL, headers=headers, json=payload)
                response.raise_for_status()
                data = response.json()
        except (httpx.HTTPError, ValueError) as exc:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Groq API request failed.",
            ) from exc

        try:
            return str(data["choices"][0]["message"]["content"]).strip()
        except (KeyError, IndexError, TypeError) as exc:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="Groq API returned an unexpected response format.",
            ) from exc

    def _build_phrase_prompt(
        self,
        *,
        theme_name: str,
        event_name: str | None,
        tone_funny_pct: int,
        tone_emotion_pct: int,
        prompt_keywords: list[str],
        visual_style: str,
        count: int,
    ) -> str:
        """Build the phrase-generation user prompt from the theme inputs."""

        tone_instruction = "Balance humor and heartfelt warmth evenly."
        if tone_funny_pct >= 60:
            tone_instruction = "Lean strongly into humor, wit, and playful relatability."
        elif tone_emotion_pct >= 60:
            tone_instruction = "Lean strongly into emotional depth, tenderness, and sincerity."

        event_line = f"Event or occasion: {event_name}\n" if event_name else ""
        keywords_text = ", ".join(prompt_keywords) if prompt_keywords else "none supplied"

        return (
            f"{tone_instruction}\n"
            f"Theme name: {theme_name}\n"
            f"{event_line}"
            f"Prompt keywords: {keywords_text}\n"
            f"Visual style reference: {visual_style}\n"
            f"Create exactly {count} greeting card phrases for the Indian market.\n"
            "Each phrase must be 8-20 words and feel personal, warm, and highly shareable.\n"
            "Return valid JSON only in this exact format:\n"
            '{"phrases": [{"text": "...", "tone": "funny|emotional|balanced", '
            '"occasion": "...", "word_count": 12}]}'
        )

    def _parse_phrase_response(
        self,
        *,
        content: str,
        expected_tone: str,
        fallback_occasion: str,
        count: int,
    ) -> list[dict[str, Any]]:
        """Parse structured phrase JSON, then fall back to text extraction if needed."""

        parsed = self._try_parse_json_payload(content)
        if isinstance(parsed, dict) and isinstance(parsed.get("phrases"), list):
            phrases = [
                self._normalize_phrase(
                    item,
                    expected_tone=expected_tone,
                    fallback_occasion=fallback_occasion,
                )
                for item in parsed["phrases"]
                if self._extract_phrase_text(item)
            ]
            if phrases:
                return phrases[:count]

        fallback_phrases = self._extract_phrases_from_text(
            content=content,
            expected_tone=expected_tone,
            fallback_occasion=fallback_occasion,
            count=count,
        )
        return fallback_phrases

    def _try_parse_json_payload(self, content: str) -> Any:
        """Try to parse a Groq text response as JSON, including fenced content blocks."""

        candidate = content.strip()
        try:
            return json.loads(candidate)
        except json.JSONDecodeError:
            pass

        start = candidate.find("{")
        end = candidate.rfind("}")
        if start != -1 and end != -1 and end > start:
            try:
                return json.loads(candidate[start : end + 1])
            except json.JSONDecodeError:
                return None

        return None

    def _extract_phrases_from_text(
        self,
        *,
        content: str,
        expected_tone: str,
        fallback_occasion: str,
        count: int,
    ) -> list[dict[str, Any]]:
        """Extract phrase candidates from plain text when JSON parsing is not possible."""

        phrases: list[dict[str, Any]] = []
        for raw_line in content.splitlines():
            cleaned = re.sub(r"^\s*(?:[-*]|\d+[.)])\s*", "", raw_line).strip()
            cleaned = cleaned.strip("\"' ")
            if not cleaned:
                continue
            if cleaned.lower().startswith("phrases"):
                continue

            phrases.append(
                {
                    "text": cleaned,
                    "tone": expected_tone,
                    "occasion": fallback_occasion,
                    "word_count": len(cleaned.split()),
                }
            )
            if len(phrases) >= count:
                break

        return phrases

    def _normalize_phrase(
        self,
        phrase: dict[str, Any],
        *,
        expected_tone: str,
        fallback_occasion: str,
    ) -> dict[str, Any]:
        """Normalize Groq phrase payloads into the API's stable dict format."""

        text = self._extract_phrase_text(phrase)
        tone = str(phrase.get("tone") or expected_tone).strip().lower()
        if tone not in {"funny", "emotional", "balanced"}:
            tone = expected_tone
        occasion = str(phrase.get("occasion") or fallback_occasion).strip() or fallback_occasion
        word_count = phrase.get("word_count")
        if not isinstance(word_count, int):
            word_count = len(text.split())

        return {
            "text": text,
            "tone": tone,
            "occasion": occasion,
            "word_count": word_count,
        }

    def _extract_phrase_text(self, phrase: Any) -> str:
        """Return the phrase text from either a dict or a raw string payload."""

        if isinstance(phrase, str):
            return phrase.strip()
        if isinstance(phrase, dict):
            return str(phrase.get("text") or "").strip()
        return ""

    def _expected_tone(self, tone_funny_pct: int, tone_emotion_pct: int) -> str:
        """Map tone weights into the winning target tone bucket."""

        if tone_funny_pct >= 60:
            return "funny"
        if tone_emotion_pct >= 60:
            return "emotional"
        return "balanced"

    def _score_phrase(self, phrase: dict[str, Any], *, expected_tone: str) -> int:
        """Score one phrase candidate according to the product selection rules."""

        normalized = self._normalize_phrase(
            phrase,
            expected_tone=expected_tone,
            fallback_occasion="general",
        )
        text = normalized["text"]
        tone = normalized["tone"]
        word_count = normalized["word_count"]

        score = 0
        if 8 <= word_count <= 20:
            score += 10
        if tone == expected_tone:
            score += 20
        if "?" in text:
            score += 5
        if "!" in text:
            score += 3
        if word_count < 6:
            score -= 15
        if word_count > 25:
            score -= 10

        return score

    def _constrain_dalle_prompt(self, prompt: str) -> str:
        """Normalize the prompt so it fits DALL-E length and ending requirements."""

        cleaned = re.sub(r"\s+", " ", prompt).strip()
        ending = self.DALLE_ENDING
        if cleaned.endswith(ending):
            constrained = cleaned
        else:
            cleaned = cleaned.rstrip(" .")
            constrained = f"{cleaned}. {ending}" if cleaned else ending

        if len(constrained) <= 900:
            return constrained

        allowed_prefix = 900 - len(ending) - 1
        prefix = constrained[:allowed_prefix].rstrip(" ,.;:")
        return f"{prefix} {ending}"
