"""Schemas for editable operator-facing option catalogs."""

from __future__ import annotations

from datetime import datetime
from typing import Literal

from pydantic import BaseModel, ConfigDict, Field, field_validator

OperatorOptionCategory = Literal[
    "audience",
    "cultural_context",
    "tone_style",
    "copy_style",
    "visual_style",
    "theme_bucket",
    "theme_type",
    "schedule_type",
    "override_scope",
]


def _normalize_key(value: str) -> str:
    collapsed = "_".join(
        "".join(char.lower() if char.isalnum() else " " for char in str(value or "").strip()).split()
    )
    return collapsed[:120]


class OperatorOptionBase(BaseModel):
    """Common fields for one configurable dropdown option row."""

    category: OperatorOptionCategory
    option_key: str
    option_value: str
    label: str
    description: str | None = None
    sort_order: int = 0
    is_active: bool = True
    is_default: bool = False

    @field_validator("option_key", mode="before")
    @classmethod
    def normalize_option_key(cls, value: str) -> str:
        normalized = _normalize_key(value)
        if not normalized:
            raise ValueError("option_key is required")
        return normalized

    @field_validator("option_value", "label", mode="before")
    @classmethod
    def normalize_required_text(cls, value: str) -> str:
        normalized = str(value or "").strip()
        if not normalized:
            raise ValueError("value is required")
        return normalized

    @field_validator("description", mode="before")
    @classmethod
    def normalize_description(cls, value: str | None) -> str | None:
        normalized = str(value or "").strip()
        return normalized or None


class OperatorOptionCreate(OperatorOptionBase):
    """Payload for creating one operator option row."""


class OperatorOptionUpdate(BaseModel):
    """Payload for updating one operator option row."""

    category: OperatorOptionCategory | None = None
    option_key: str | None = None
    option_value: str | None = None
    label: str | None = None
    description: str | None = None
    sort_order: int | None = None
    is_active: bool | None = None
    is_default: bool | None = None

    @field_validator("option_key", mode="before")
    @classmethod
    def normalize_option_key(cls, value: str | None) -> str | None:
        if value is None:
            return None
        normalized = _normalize_key(value)
        if not normalized:
            raise ValueError("option_key is required")
        return normalized

    @field_validator("option_value", "label", mode="before")
    @classmethod
    def normalize_required_text(cls, value: str | None) -> str | None:
        if value is None:
            return None
        normalized = str(value).strip()
        if not normalized:
            raise ValueError("value is required")
        return normalized

    @field_validator("description", mode="before")
    @classmethod
    def normalize_description(cls, value: str | None) -> str | None:
        if value is None:
            return None
        normalized = str(value).strip()
        return normalized or None


class OperatorOptionResponse(OperatorOptionBase):
    """Response row returned for operator dropdown configuration."""

    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime | None = None
    updated_at: datetime | None = None


class OperatorOptionCatalogResponse(BaseModel):
    """Grouped option payload used by forms and config screens."""

    source: Literal["database", "seed"]
    categories: dict[OperatorOptionCategory, list[OperatorOptionResponse]] = Field(default_factory=dict)


class OperatorOptionDeleteResponse(BaseModel):
    """Response payload for soft-deleting one operator option row."""

    option_id: int
    deleted: bool = True
