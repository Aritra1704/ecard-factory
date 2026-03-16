"""Application settings loaded from environment variables.

This module centralizes configuration so the rest of the codebase reads from a
single validated settings object instead of scattered environment access.
"""

from pathlib import Path
from typing import Literal

from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Validated application configuration loaded from `.env` and the process environment."""

    # Load values from a local `.env` file during development while still letting
    # real environment variables override them in deployed environments.
    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        case_sensitive=True,
        extra="ignore",
    )

    # External service credentials are required because the application cannot
    # operate correctly without them.
    database_url: str = Field(..., validation_alias="DATABASE_URL")
    railway_database_url: str | None = Field(
        default=None,
        validation_alias="RAILWAY_DATABASE_URL",
    )
    openai_api_key: str = Field(..., validation_alias="OPENAI_API_KEY")
    groq_api_key: str = Field(..., validation_alias="GROQ_API_KEY")
    telegram_bot_token: str = Field(..., validation_alias="TELEGRAM_BOT_TOKEN")
    telegram_chat_id: str = Field(..., validation_alias="TELEGRAM_CHAT_ID")
    canva_client_id: str = Field(..., validation_alias="CANVA_CLIENT_ID")
    canva_client_secret: str = Field(..., validation_alias="CANVA_CLIENT_SECRET")

    # Operational settings keep sane defaults for local development while
    # remaining fully configurable in production.
    app_env: str = Field(default="development", validation_alias="APP_ENV")
    app_port: int = Field(default=8000, validation_alias="APP_PORT")
    log_level: str = Field(default="info", validation_alias="LOG_LEVEL")
    db_schema: str = Field(default="ecard_factory", validation_alias="DB_SCHEMA")
    auto_init_db_on_startup: bool = Field(default=True, validation_alias="AUTO_INIT_DB_ON_STARTUP")
    judge_backend: str = Field(default="ollama", validation_alias="JUDGE_BACKEND")
    judge_model: str = Field(default="qwen2.5:7b-instruct", validation_alias="JUDGE_MODEL")
    judge_timeout_seconds: float = Field(default=20.0, validation_alias="JUDGE_TIMEOUT_SECONDS")
    workflow_memory_fallback_enabled: bool = Field(
        default=False,
        validation_alias="WORKFLOW_MEMORY_FALLBACK_ENABLED",
    )
    image_provider: Literal["local_sdxl", "local_flux", "dalle"] = Field(
        default="local_sdxl",
        validation_alias="IMAGE_PROVIDER",
    )
    image_candidates_per_run: int = Field(
        default=3,
        ge=1,
        validation_alias="IMAGE_CANDIDATES_PER_RUN",
    )
    imageforge_enabled: bool = Field(default=True, validation_alias="IMAGEFORGE_ENABLED")
    imageforge_base_url: str = Field(
        default="http://127.0.0.1:8090",
        validation_alias="IMAGEFORGE_BASE_URL",
    )
    imageforge_timeout_seconds: float = Field(
        default=300.0,
        ge=1.0,
        validation_alias="IMAGEFORGE_TIMEOUT_SECONDS",
    )
    imageforge_default_provider: str = Field(
        default="comfyui",
        validation_alias="IMAGEFORGE_DEFAULT_PROVIDER",
    )
    imageforge_default_model: str = Field(
        default="sd_xl_base_1.0",
        validation_alias="IMAGEFORGE_DEFAULT_MODEL",
    )
    imageforge_default_candidate_count: int = Field(
        default=3,
        ge=1,
        validation_alias="IMAGEFORGE_DEFAULT_CANDIDATE_COUNT",
    )
    asset_storage_backend: Literal["filesystem"] = Field(..., validation_alias="ASSET_STORAGE_BACKEND")
    asset_storage_root: str = Field(..., validation_alias="ASSET_STORAGE_ROOT")
    asset_public_base_url: str = Field(..., validation_alias="ASSET_PUBLIC_BASE_URL")

    @field_validator("asset_storage_root")
    @classmethod
    def _validate_asset_storage_root(cls, value: str) -> str:
        root = value.strip()
        if not root:
            raise ValueError("ASSET_STORAGE_ROOT cannot be empty")
        if not Path(root).expanduser().is_absolute():
            raise ValueError("ASSET_STORAGE_ROOT must be an absolute path")
        return root

    @field_validator("asset_public_base_url")
    @classmethod
    def _validate_asset_public_base_url(cls, value: str) -> str:
        normalized = value.strip().rstrip("/")
        if not normalized:
            raise ValueError("ASSET_PUBLIC_BASE_URL cannot be empty")
        return normalized

    @field_validator("imageforge_base_url")
    @classmethod
    def _validate_imageforge_base_url(cls, value: str) -> str:
        normalized = value.strip().rstrip("/")
        if not normalized:
            raise ValueError("IMAGEFORGE_BASE_URL cannot be empty")
        return normalized

    @property
    def active_db_url(self) -> str:
        """Return the database URL that should be used in the current environment."""

        if self.app_env.lower() == "production":
            return self.railway_database_url or self.database_url

        return self.database_url


# Export a singleton settings object so application modules reuse one validated
# configuration instance instead of re-reading environment variables repeatedly.
settings = Settings()
