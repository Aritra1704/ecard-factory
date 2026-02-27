"""Import all ORM models so SQLAlchemy metadata and Alembic can discover them."""

from app.models.alert import Alert
from app.models.card import Card
from app.models.competitor import Competitor
from app.models.daily_plan import DailyContentPlan
from app.models.event import Event
from app.models.listing import Listing
from app.models.sale import Sale
from app.models.social_post import SocialPost
from app.models.theme import ThemeOverride, WeeklyTheme
from app.models.watermark import Watermark

__all__ = [
    "Alert",
    "Card",
    "Competitor",
    "DailyContentPlan",
    "Event",
    "Listing",
    "Sale",
    "SocialPost",
    "ThemeOverride",
    "Watermark",
    "WeeklyTheme",
]
