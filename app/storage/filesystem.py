"""Filesystem asset storage backend."""

from __future__ import annotations

from pathlib import Path
from urllib.parse import quote

from app.storage.base import AssetStorage


class FilesystemAssetStorage(AssetStorage):
    """Persist workflow assets under one configurable local root directory."""

    REQUIRED_DIRS = ("preview", "image", "final", "pdf")

    def __init__(self, *, root_path: Path, public_base_url: str) -> None:
        self._root_path = root_path.expanduser().resolve()
        self._public_base_url = public_base_url.rstrip("/")

    @property
    def backend(self) -> str:
        return "filesystem"

    @property
    def root_path(self) -> Path:
        return self._root_path

    def ensure_directories(self) -> None:
        self._root_path.mkdir(parents=True, exist_ok=True)
        for directory in self.REQUIRED_DIRS:
            (self._root_path / directory).mkdir(parents=True, exist_ok=True)

    def save_bytes(self, relative_path: str, content_bytes: bytes) -> None:
        destination = self._resolve_relative(relative_path)
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_bytes(content_bytes)

    def save_text(self, relative_path: str, text: str) -> None:
        destination = self._resolve_relative(relative_path)
        destination.parent.mkdir(parents=True, exist_ok=True)
        destination.write_text(text, encoding="utf-8")

    def file_exists(self, relative_path: str) -> bool:
        return self._resolve_relative(relative_path).exists()

    def get_public_url(self, relative_path: str) -> str:
        relative = relative_path.strip("/").replace("\\", "/")
        quoted = "/".join(quote(part) for part in relative.split("/"))
        return f"{self._public_base_url}/{quoted}"

    def get_absolute_path(self, relative_path: str) -> str:
        relative = relative_path.strip("/")
        if not relative:
            return str(self._root_path)
        return str(self._resolve_relative(relative))

    def is_writable(self) -> bool:
        try:
            self.ensure_directories()
            probe = self._root_path / ".write_probe"
            probe.write_text("ok", encoding="utf-8")
            probe.unlink(missing_ok=True)
            return True
        except OSError:
            return False

    def _resolve_relative(self, relative_path: str) -> Path:
        relative = relative_path.strip().lstrip("/").replace("\\", "/")
        path = (self._root_path / relative).resolve()
        if self._root_path not in path.parents and path != self._root_path:
            raise ValueError(f"Path escapes storage root: {relative_path}")
        return path
