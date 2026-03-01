"""Pure unit tests for ORM model construction and configured defaults."""

from __future__ import annotations

from datetime import date
from decimal import Decimal
import importlib
import sys


def reload_models_module():
    """Reload database and model modules so tests use the current environment."""

    for module_name in list(sys.modules):
        if module_name in {"app.config", "app.database"} or module_name.startswith("app.models"):
            sys.modules.pop(module_name, None)

    return importlib.import_module("app.models")


def test_models_can_be_instantiated_and_represented(configured_env: dict[str, str]) -> None:
    """Every ORM model should instantiate with required fields and return a repr string."""

    models = reload_models_module()

    event = models.Event(
        name="Diwali",
        event_date=date(2026, 11, 8),
        region="india",
        theme_keywords=["lights", "family", "rangoli"],
        recurrence="annual_lunar",
    )
    weekly_theme = models.WeeklyTheme(
        rotation_month=1,
        day_of_week="monday",
        theme_name="Motivation Monday",
        tone_funny_pct=30,
        tone_emotion_pct=70,
        prompt_keywords=["fresh start", "uplift"],
        color_palette=["#2F6BFF", "#F1FAEE"],
        visual_style="clean editorial illustration",
        instagram_hashtags=["#MotivationMonday"],
    )
    override = models.ThemeOverride(
        override_type="festival",
        event_id=1,
        theme_name="Festival Glow",
        tone_funny_pct=25,
        tone_emotion_pct=75,
        prompt_keywords=["festival", "warmth"],
        color_palette=["#FFD166", "#F4A261"],
        visual_style="festive hand-lettering",
        instagram_hashtags=["#FestivalGlow"],
        start_date=date(2026, 11, 1),
        end_date=date(2026, 11, 9),
    )
    daily_plan = models.DailyContentPlan(
        plan_date=date(2026, 11, 8),
        theme_name="Festival Glow",
        source="override",
        override_id=1,
        weekly_theme_id=1,
        tone_funny_pct=25,
        tone_emotion_pct=75,
        prompt_keywords=["festival", "warmth"],
        color_palette=["#FFD166", "#F4A261"],
    )
    card = models.Card(
        event_id=1,
        theme_name="Festival Glow",
        theme_source="override",
        phrase="Wishing you warmth, light, and joy.",
    )
    listing = models.Listing(
        card_id=1,
        platform="etsy",
        listing_url="https://example.com/listings/1",
        price=Decimal("5.99"),
    )
    sale = models.Sale(
        listing_id=1,
        platform="etsy",
        gross_amount=Decimal("5.99"),
        platform_fee=Decimal("1.00"),
        net_amount=Decimal("4.99"),
    )
    social_post = models.SocialPost(card_id=1, platform="instagram")
    watermark = models.Watermark(card_id=1, phash="a" * 64)
    alert = models.Alert(
        alert_type="infringement",
        card_id=1,
        infringing_url="https://example.com/copycat",
        similarity_pct=92,
    )
    competitor = models.Competitor(
        name="Sample Seller",
        platform="etsy",
        url="https://example.com/sellers/sample",
    )

    for instance in [
        event,
        weekly_theme,
        override,
        daily_plan,
        card,
        listing,
        sale,
        social_post,
        watermark,
        alert,
        competitor,
    ]:
        assert isinstance(repr(instance), str)

    assert event.name == "Diwali"
    assert card.phrase.startswith("Wishing")
    assert listing.platform == "etsy"
    assert sale.net_amount == Decimal("4.99")
    assert competitor.name == "Sample Seller"


def test_model_defaults_are_configured(configured_env: dict[str, str]) -> None:
    """Important ORM defaults should be present without requiring a database round-trip."""

    models = reload_models_module()

    assert models.Event.__table__.c.lead_days.default.arg == 21
    assert models.WeeklyTheme.__table__.c.active.default.arg is True
    assert models.ThemeOverride.__table__.c.priority.default.arg == 10
    assert models.ThemeOverride.__table__.c.created_by.default.arg == "system"
    assert models.DailyContentPlan.__table__.c.cards_generated.default.arg == 0
    assert models.DailyContentPlan.__table__.c.status.default.arg == "pending"
    assert models.Card.__table__.c.status.default.arg == "pending_phrase_approval"
    assert models.Card.__table__.c.candidate_phrases.default.arg.__name__ == "list"
    assert models.Card.__table__.c.cost_llm.default.arg == Decimal("0.0000")
    assert models.Card.__table__.c.cost_image.default.arg == Decimal("0.0400")
    assert models.SocialPost.__table__.c.reach.default.arg == 0
    assert models.Alert.__table__.c.status.default.arg == "pending"
    assert models.Card.__table__.c.created_at.server_default is not None
    assert models.Listing.__table__.c.listed_at.server_default is not None
    assert models.Sale.__table__.c.sale_date.server_default is not None
    assert models.Watermark.__table__.c.registered_at.server_default is not None
