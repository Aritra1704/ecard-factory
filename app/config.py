"""Application settings loaded from environment variables.

This module centralizes configuration so the rest of the codebase reads from a
single validated settings object instead of scattered environment access.
"""

from pydantic import Field
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

    @property
    def active_db_url(self) -> str:
        """Return the database URL that should be used in the current environment."""

        if self.app_env.lower() == "production":
            return self.railway_database_url or self.database_url

        return self.database_url


# Export a singleton settings object so application modules reuse one validated
# configuration instance instead of re-reading environment variables repeatedly.
settings = Settings()
