"""Dedicated HTTP client for ImageForge."""

from __future__ import annotations

from functools import lru_cache
from uuid import uuid4

import httpx
from fastapi import HTTPException, status

from app.config import settings
from app.integrations.imageforge.schemas import (
    GenerateImageRequest,
    GenerationResponse,
    RegenerateImageRequest,
    RequestDetailResponse,
    SelectCandidateResponse,
)


class ImageForgeClient:
    """All raw HTTP calls to the local ImageForge backend."""

    def __init__(
        self,
        *,
        enabled: bool,
        base_url: str,
        timeout_seconds: float,
    ) -> None:
        self._enabled = enabled
        self._base_url = base_url.rstrip("/")
        self._timeout_seconds = timeout_seconds

    @property
    def enabled(self) -> bool:
        """Return whether ImageForge integration is enabled."""

        return self._enabled

    async def generate(self, payload: GenerateImageRequest) -> GenerationResponse:
        """Call ImageForge generate and return the validated response."""

        return await self._request_json(
            method="POST",
            path="/api/images/generate",
            response_model=GenerationResponse,
            json_body=payload.model_dump(mode="json", exclude_none=True),
            trace_id=payload.trace_id,
        )

    async def regenerate(self, payload: RegenerateImageRequest) -> GenerationResponse:
        """Call ImageForge regenerate and return the validated response."""

        return await self._request_json(
            method="POST",
            path="/api/images/regenerate",
            response_model=GenerationResponse,
            json_body=payload.model_dump(mode="json", exclude_none=True),
            trace_id=payload.trace_id,
        )

    async def select_candidate(self, candidate_id: str) -> SelectCandidateResponse:
        """Select one candidate inside ImageForge and return its persisted state."""

        return await self._request_json(
            method="POST",
            path=f"/api/images/candidates/{candidate_id}/select",
            response_model=SelectCandidateResponse,
        )

    async def get_request_detail(self, request_id: str) -> RequestDetailResponse:
        """Fetch persisted ImageForge request detail when local resync is needed."""

        return await self._request_json(
            method="GET",
            path=f"/api/images/requests/{request_id}",
            response_model=RequestDetailResponse,
        )

    async def _request_json(
        self,
        *,
        method: str,
        path: str,
        response_model,
        json_body: dict[str, object] | None = None,
        trace_id: str | None = None,
    ):
        if not self._enabled:
            raise HTTPException(
                status_code=status.HTTP_503_SERVICE_UNAVAILABLE,
                detail="ImageForge integration is disabled",
            )

        headers = {"X-Request-Id": f"ecardfactory_{uuid4().hex[:16]}"}
        if trace_id:
            headers["X-Trace-Id"] = trace_id

        try:
            async with httpx.AsyncClient(
                base_url=self._base_url,
                timeout=self._timeout_seconds,
                follow_redirects=True,
            ) as client:
                response = await client.request(method, path, json=json_body, headers=headers)
        except httpx.TimeoutException as exc:
            raise HTTPException(
                status_code=status.HTTP_504_GATEWAY_TIMEOUT,
                detail="ImageForge request timed out",
            ) from exc
        except httpx.HTTPError as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail=f"ImageForge request failed: {exc}",
            ) from exc

        payload = self._decode_payload(response)
        if response.is_success:
            return response_model.model_validate(payload)

        detail = self._extract_error_detail(payload) or response.reason_phrase or "ImageForge request failed"
        raise HTTPException(status_code=response.status_code, detail=detail)

    @staticmethod
    def _decode_payload(response: httpx.Response) -> dict[str, object]:
        try:
            decoded = response.json()
        except ValueError as exc:
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="ImageForge returned a non-JSON response",
            ) from exc
        if not isinstance(decoded, dict):
            raise HTTPException(
                status_code=status.HTTP_502_BAD_GATEWAY,
                detail="ImageForge returned an unexpected response payload",
            )
        return decoded

    @staticmethod
    def _extract_error_detail(payload: dict[str, object]) -> str | None:
        detail = payload.get("detail")
        if isinstance(detail, str) and detail.strip():
            return detail.strip()
        error = payload.get("error")
        if isinstance(error, dict):
            message = error.get("message")
            if isinstance(message, str) and message.strip():
                return message.strip()
        return None


@lru_cache(maxsize=1)
def get_imageforge_client() -> ImageForgeClient:
    """Return the configured ImageForge client singleton."""

    return ImageForgeClient(
        enabled=bool(settings.imageforge_enabled),
        base_url=settings.imageforge_base_url,
        timeout_seconds=float(settings.imageforge_timeout_seconds),
    )
