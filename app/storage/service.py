"""Storage service factory and startup validation helpers."""

from __future__ import annotations

from functools import lru_cache
import logging
from pathlib import Path

from app.config import settings
from app.storage.base import AssetStorage
from app.storage.filesystem import FilesystemAssetStorage

logger = logging.getLogger(__name__)
REPO_ROOT = Path(__file__).resolve().parents[2]


@lru_cache(maxsize=1)
def get_asset_storage() -> AssetStorage:
    """Return singleton asset storage backend based on environment settings."""

    backend = settings.asset_storage_backend.strip().lower()
    if backend != "filesystem":
        raise RuntimeError(f"Unsupported asset storage backend: {backend}")

    return FilesystemAssetStorage(
        root_path=Path(settings.asset_storage_root),
        public_base_url=settings.asset_public_base_url,
    )


def initialize_asset_storage_or_raise() -> AssetStorage:
    """Prepare storage directories and fail fast if the root is not writable."""

    storage = get_asset_storage()
    _assert_storage_root_not_in_repo(storage.root_path)
    try:
        storage.ensure_directories()
    except OSError as exc:
        logger.error(
            "asset storage init failed backend=%s root=%s error=%s",
            storage.backend,
            storage.get_absolute_path(""),
            exc,
        )
        raise RuntimeError(
            f"Unable to initialize asset storage root: {storage.get_absolute_path('')}"
        ) from exc

    writable = storage.is_writable()
    logger.info(
        "asset storage selected backend=%s root=%s writable=%s",
        storage.backend,
        storage.get_absolute_path(""),
        "true" if writable else "false",
    )
    if not writable:
        raise RuntimeError(
            f"Asset storage root is not writable: {storage.get_absolute_path('')}"
        )
    return storage


def _assert_storage_root_not_in_repo(storage_root: Path) -> None:
    """Reject storage roots inside the repository to avoid polluting source tree."""

    resolved = storage_root.expanduser().resolve()
    if resolved == REPO_ROOT or REPO_ROOT in resolved.parents:
        raise RuntimeError(
            f"ASSET_STORAGE_ROOT cannot be inside the project repository: {resolved}"
        )
