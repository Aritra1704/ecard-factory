"""Debug endpoints for configured asset storage backend."""

from __future__ import annotations

from fastapi import APIRouter

from app.schemas.storage import StorageHealthResponse
from app.storage import get_asset_storage

router = APIRouter(prefix="/api/storage", tags=["storage"])


@router.get("/health", response_model=StorageHealthResponse)
async def storage_health() -> StorageHealthResponse:
    """Return selected storage backend, root path, and write capability."""

    storage = get_asset_storage()
    return StorageHealthResponse(
        backend=storage.backend,
        root_path=storage.get_absolute_path(""),
        writable=storage.is_writable(),
    )
