"""Schemas for asset storage debug endpoints."""

from __future__ import annotations

from pydantic import BaseModel


class StorageHealthResponse(BaseModel):
    """Storage backend status for operational debugging."""

    backend: str
    root_path: str
    writable: bool
