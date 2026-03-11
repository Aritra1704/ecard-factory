"""Schemas for asset storage debug endpoints."""

from __future__ import annotations

from pydantic import BaseModel, Field


class StorageHealthResponse(BaseModel):
    """Storage backend status for operational debugging."""

    backend: str
    root_path: str
    writable: bool


class StorageDirectorySummary(BaseModel):
    """Usage metrics for one top-level directory under asset storage root."""

    name: str
    files: int
    bytes: int


class StorageSummaryResponse(BaseModel):
    """Aggregated storage usage metrics for workflow assets."""

    backend: str
    root_path: str
    writable: bool
    total_files: int
    total_bytes: int
    directories: list[StorageDirectorySummary] = Field(default_factory=list)
