"""Unit tests for the Stage 3 layout-spec-driven workflow card renderer."""

from __future__ import annotations

from io import BytesIO
import os
from pathlib import Path
import tempfile

from PIL import Image

os.environ.setdefault("DATABASE_URL", "postgresql://local_user:local_pass@localhost:5432/ecard_factory")
os.environ.setdefault("ASSET_STORAGE_BACKEND", "filesystem")
os.environ.setdefault(
    "ASSET_STORAGE_ROOT",
    str((Path(tempfile.gettempdir()) / "ecardfactory-renderer-test-assets").resolve()),
)
os.environ.setdefault("ASSET_PUBLIC_BASE_URL", "http://localhost:8080/assets")

from app.services.workflow_card_renderer import (
    FinalCardRenderInput,
    PreviewCardRenderInput,
    WorkflowCardRenderer,
)


def _shape_by_id(layout, shape_id: str):
    return next(shape for shape in layout.shapes if shape.shape_id == shape_id)


def test_build_final_layout_spec_is_versioned_and_explicit() -> None:
    """Final renders should resolve to one explicit versioned layout spec."""

    renderer = WorkflowCardRenderer()

    layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Festival Joy",
            message="Wishing you a bright season full of color, laughter, and kind company.",
            signoff="With love",
            theme_style="festive",
            background_image_url=None,
            illustration_image_url="https://example.com/illustration.png",
            text_alignment="center",
            export_size="1200x1500",
        )
    )

    assert layout.layout_id == "poster_illustration_caption"
    assert layout.canvas_width == 1200
    assert layout.canvas_height == 1500
    assert any(shape.shape_type == "rounded_rect" and shape.layer == "content" for shape in layout.shapes)
    assert any(shape.shape_type == "ellipse" and shape.layer == "background" for shape in layout.shapes)
    assert len(layout.image_blocks) == 1
    assert layout.image_blocks[0].fit == "cover"
    assert layout.image_blocks[0].crop_focus == (0.5, 0.3)
    assert any(shape.outline_width > 0 for shape in layout.shapes)
    shape_ids = {shape.shape_id for shape in layout.shapes}
    assert {"festive_corner_left", "festive_corner_right", "festive_footer_band"} <= shape_ids
    assert {block.role for block in layout.text_blocks} >= {"title", "body", "signoff"}
    role_to_variant = {block.role: block.font_variant for block in layout.text_blocks}
    assert role_to_variant["title"] == "serif_bold"
    assert role_to_variant["body"] == "sans"
    assert role_to_variant["signoff"] == "serif_italic"


def test_preview_layout_spec_includes_metadata_blocks() -> None:
    """Preview rendering should build explicit metadata blocks alongside message content."""

    renderer = WorkflowCardRenderer()

    layout = renderer.build_preview_layout_spec(
        PreviewCardRenderInput(
            title="Shortlist Render #1",
            message="A calm and thoughtful message for review.",
            signoff="Shortlist Preview",
            theme_style="minimal",
            background_image_url=None,
            text_alignment="left",
            export_size="1080x1350",
            theme_name="Launch Sprint",
            job_id="job_123",
            status="content_pending_approval",
            metadata_lines=[
                "Candidate model: test-model",
                "Shortlist rank: 1",
                "Rendered from shortlist",
            ],
        )
    )

    assert layout.layout_id == "preview_minimal_v1"
    assert any(block.role == "metadata_title" for block in layout.text_blocks)
    assert len([block for block in layout.text_blocks if block.role == "metadata_line"]) >= 5
    assert any(block.role == "body" for block in layout.text_blocks)
    assert any(block.role == "metadata_title" and block.font_variant == "sans_bold" for block in layout.text_blocks)


def test_render_layout_png_honors_canvas_dimensions_and_custom_layout_id() -> None:
    """Rendering from an explicit layout spec should preserve the resolved canvas size."""

    renderer = WorkflowCardRenderer()
    layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Team Launch",
            message="Steady progress, sharp execution, and a clean finish.",
            signoff=None,
            theme_style="elegant",
            background_image_url=None,
            illustration_image_url=None,
            text_alignment="right",
            export_size="900x1200",
            layout_id="text_left_illustration_right",
        )
    )

    png_bytes = renderer.render_layout_png(layout)
    with Image.open(BytesIO(png_bytes)) as image:
        assert image.format == "PNG"
        assert image.size == (900, 1200)
    assert layout.layout_id == "text_left_illustration_right"


def test_elegant_theme_defaults_to_side_by_side_layout() -> None:
    """Elegant cards should default to the side-by-side composition preset."""

    renderer = WorkflowCardRenderer()

    layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Quiet Grace",
            message="A restrained, polished design should not default to the festival poster layout.",
            signoff="Regards",
            theme_style="elegant",
            background_image_url=None,
            illustration_image_url="https://example.com/elegant.png",
            text_alignment="left",
            export_size="1080x1350",
        )
    )

    assert layout.layout_id == "text_left_illustration_right"
    assert len(layout.image_blocks) == 1
    assert layout.image_blocks[0].fit == "cover"
    assert layout.image_blocks[0].crop_focus == (0.5, 0.4)
    assert any(shape.outline_width > 0 for shape in layout.shapes)
    shape_ids = {shape.shape_id for shape in layout.shapes}
    assert {"elegant_outer_frame", "elegant_inner_frame", "elegant_crest"} <= shape_ids
    role_to_variant = {block.role: block.font_variant for block in layout.text_blocks}
    assert role_to_variant["title"] == "serif_bold"
    assert role_to_variant["body"] == "serif"
    assert role_to_variant["signoff"] == "serif_italic"


def test_minimal_theme_defaults_to_top_layout_with_caption_panel_polish() -> None:
    """Minimal cards should keep the top-art layout but still use the polished framing rules."""

    renderer = WorkflowCardRenderer()

    layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Warm Hello",
            message="A calm minimal card should still get framed art and a styled caption panel.",
            signoff="Take care",
            theme_style="minimal",
            background_image_url=None,
            illustration_image_url="https://example.com/minimal.png",
            text_alignment="center",
            export_size="1080x1350",
        )
    )

    assert layout.layout_id == "illustration_top_text_bottom"
    assert len(layout.image_blocks) == 1
    assert layout.image_blocks[0].fit == "cover"
    assert layout.image_blocks[0].crop_focus == (0.5, 0.34)
    assert any(shape.outline_width > 0 for shape in layout.shapes)
    shape_ids = {shape.shape_id for shape in layout.shapes}
    assert {"minimal_outer_frame", "minimal_footer_rule"} <= shape_ids
    role_to_variant = {block.role: block.font_variant for block in layout.text_blocks}
    assert role_to_variant["title"] == "serif_bold"
    assert role_to_variant["body"] == "sans"
    assert role_to_variant["signoff"] == "sans_italic"


def test_playful_theme_gets_theme_specific_ornaments() -> None:
    """Playful cards should include distinct decorative ornaments beyond the shared background circles."""

    renderer = WorkflowCardRenderer()

    layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Bright Hello",
            message="Playful cards should carry visible ornament language instead of looking like generic posters.",
            signoff="See you soon",
            theme_style="playful",
            background_image_url=None,
            illustration_image_url="https://example.com/playful.png",
            text_alignment="center",
            export_size="1080x1350",
        )
    )

    assert layout.layout_id == "poster_illustration_caption"
    shape_ids = {shape.shape_id for shape in layout.shapes}
    assert {"playful_bubble_left", "playful_bubble_right", "playful_footer_tab"} <= shape_ids


def test_top_layout_balances_art_and_text_for_dense_copy() -> None:
    """Dense copy should trade some art height for a larger message panel in top layout cards."""

    renderer = WorkflowCardRenderer()

    compact_layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Warm Wishes",
            message="A bright hello for you.",
            signoff="Love",
            theme_style="minimal",
            background_image_url=None,
            illustration_image_url="https://example.com/compact.png",
            text_alignment="center",
            export_size="1080x1350",
        )
    )
    dense_layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="A Long And Gracious Note For Someone Special",
            message=(
                "May this season bring quiet strength, kind company, steady hope, and enough room in your day "
                "to feel deeply appreciated for the care, patience, and warmth you keep giving to everyone around you."
            ),
            signoff="With admiration and gratitude",
            theme_style="minimal",
            background_image_url=None,
            illustration_image_url="https://example.com/dense.png",
            text_alignment="center",
            export_size="1080x1350",
        )
    )

    compact_art = _shape_by_id(compact_layout, "top_art_frame")
    dense_art = _shape_by_id(dense_layout, "top_art_frame")
    compact_panel = _shape_by_id(compact_layout, "message_panel")
    dense_panel = _shape_by_id(dense_layout, "message_panel")

    assert compact_art.box[3] > dense_art.box[3]
    assert dense_panel.box[1] < compact_panel.box[1]
    assert (dense_panel.box[3] - dense_panel.box[1]) > (compact_panel.box[3] - compact_panel.box[1])


def test_dense_elegant_copy_expands_side_text_column() -> None:
    """Dense elegant copy should widen the side-by-side text panel for readability."""

    renderer = WorkflowCardRenderer()

    compact_layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Quiet Grace",
            message="Calm thanks and warm regards.",
            signoff="Regards",
            theme_style="elegant",
            background_image_url=None,
            illustration_image_url="https://example.com/compact-elegant.png",
            text_alignment="left",
            export_size="1080x1350",
        )
    )
    dense_layout = renderer.build_final_layout_spec(
        FinalCardRenderInput(
            title="Quiet Grace In A Season Of Thoughtful Celebration",
            message=(
                "Wishing you a season of measured joy, graceful reflection, generous companionship, and the kind of "
                "steady peace that lingers well beyond the moment itself."
            ),
            signoff="With sincere regards",
            theme_style="elegant",
            background_image_url=None,
            illustration_image_url="https://example.com/dense-elegant.png",
            text_alignment="left",
            export_size="1080x1350",
        )
    )

    compact_panel = _shape_by_id(compact_layout, "message_panel")
    dense_panel = _shape_by_id(dense_layout, "message_panel")
    compact_art = _shape_by_id(compact_layout, "side_art_frame")
    dense_art = _shape_by_id(dense_layout, "side_art_frame")

    assert dense_panel.box[2] > compact_panel.box[2]
    assert dense_art.box[0] > compact_art.box[0]
