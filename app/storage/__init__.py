"""Asset storage exports."""

from app.storage.base import AssetStorage
from app.storage.service import get_asset_storage, initialize_asset_storage_or_raise

__all__ = ["AssetStorage", "get_asset_storage", "initialize_asset_storage_or_raise"]
