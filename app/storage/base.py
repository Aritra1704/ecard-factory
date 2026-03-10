"""Storage abstraction used by workflow services for preview/final assets."""

from __future__ import annotations

from abc import ABC, abstractmethod
from pathlib import Path


class AssetStorage(ABC):
    """Abstract storage contract for local and future cloud backends."""

    @property
    @abstractmethod
    def backend(self) -> str:
        """Return backend identifier (filesystem, s3, r2, etc.)."""

    @property
    @abstractmethod
    def root_path(self) -> Path:
        """Return backend root path (local path or logical root for cloud)."""

    @abstractmethod
    def ensure_directories(self) -> None:
        """Create required directories and validate backend root readiness."""

    @abstractmethod
    def save_bytes(self, relative_path: str, content_bytes: bytes) -> None:
        """Persist raw bytes under a relative storage path."""

    @abstractmethod
    def save_text(self, relative_path: str, text: str) -> None:
        """Persist plain text under a relative storage path."""

    @abstractmethod
    def file_exists(self, relative_path: str) -> bool:
        """Return whether a relative path exists in storage."""

    @abstractmethod
    def get_public_url(self, relative_path: str) -> str:
        """Return public URL for a stored relative path."""

    @abstractmethod
    def get_absolute_path(self, relative_path: str) -> str:
        """Return absolute backend path for a relative path."""

    @abstractmethod
    def is_writable(self) -> bool:
        """Return True when storage root can be written to."""
