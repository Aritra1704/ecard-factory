"""Debug endpoints for configured asset storage backend."""

from __future__ import annotations

from pathlib import Path

from fastapi import APIRouter

from app.schemas.storage import StorageDirectorySummary, StorageHealthResponse, StorageSummaryResponse
from app.storage import get_asset_storage

router = APIRouter(prefix="/api/storage", tags=["storage"])


def _scan_storage_usage(root_path: str) -> tuple[int, int, list[StorageDirectorySummary]]:
    """Return `(total_files, total_bytes, directories)` for storage root."""

    root = Path(root_path)
    if not root.exists():
        return 0, 0, []

    total_files = 0
    total_bytes = 0
    buckets: dict[str, dict[str, int]] = {}

    for item in root.rglob("*"):
        if not item.is_file():
            continue
        try:
            size = item.stat().st_size
        except OSError:
            continue

        total_files += 1
        total_bytes += size

        try:
            relative = item.relative_to(root)
        except ValueError:
            continue
        bucket = relative.parts[0] if relative.parts else "root"
        entry = buckets.setdefault(bucket, {"files": 0, "bytes": 0})
        entry["files"] += 1
        entry["bytes"] += size

    directories = [
        StorageDirectorySummary(name=name, files=entry["files"], bytes=entry["bytes"])
        for name, entry in buckets.items()
    ]
    directories.sort(key=lambda item: (-item.bytes, item.name))
    return total_files, total_bytes, directories


@router.get("/health", response_model=StorageHealthResponse)
async def storage_health() -> StorageHealthResponse:
    """Return selected storage backend, root path, and write capability."""

    storage = get_asset_storage()
    return StorageHealthResponse(
        backend=storage.backend,
        root_path=storage.get_absolute_path(""),
        writable=storage.is_writable(),
    )


@router.get("/summary", response_model=StorageSummaryResponse)
async def storage_summary() -> StorageSummaryResponse:
    """Return aggregate storage usage for workflow console cards."""

    storage = get_asset_storage()
    root_path = storage.get_absolute_path("")
    total_files, total_bytes, directories = _scan_storage_usage(root_path)
    return StorageSummaryResponse(
        backend=storage.backend,
        root_path=root_path,
        writable=storage.is_writable(),
        total_files=total_files,
        total_bytes=total_bytes,
        directories=directories,
    )
