"""Renderers for internal workflow previews and user-facing final eCards."""

from __future__ import annotations

from dataclasses import dataclass, field
from io import BytesIO
import logging
from textwrap import wrap
from typing import Literal

import httpx
from PIL import Image, ImageDraw, ImageFont, ImageOps

logger = logging.getLogger(__name__)

TemplateName = Literal["minimal", "festive", "elegant", "playful"]
TextAlignment = Literal["left", "center", "right"]
ShapeLayer = Literal["background", "content"]
ShapeType = Literal["rounded_rect", "ellipse"]
TextRole = Literal["title", "body", "signoff", "metadata_title", "metadata_line"]
ImageFitMode = Literal["contain", "cover"]
PanelVariant = Literal["standard", "editorial", "caption"]
FontVariant = Literal["sans", "sans_bold", "sans_italic", "serif", "serif_bold", "serif_italic"]
ContentDensity = Literal["compact", "balanced", "dense"]


@dataclass(slots=True)
class PreviewCardRenderInput:
    """Rendering input for internal workflow previews."""

    title: str
    message: str
    signoff: str | None
    theme_style: TemplateName
    background_image_url: str | None
    text_alignment: TextAlignment
    export_size: str = "1080x1350"
    illustration_image_url: str | None = None
    layout_id: str | None = None
    theme_name: str = ""
    job_id: str = ""
    status: str = ""
    metadata_lines: list[str] = field(default_factory=list)


@dataclass(slots=True)
class FinalCardRenderInput:
    """Rendering input for user-facing final card exports."""

    title: str | None
    message: str
    signoff: str | None
    theme_style: TemplateName
    background_image_url: str | None
    text_alignment: TextAlignment
    export_size: str = "1080x1350"
    illustration_image_url: str | None = None
    layout_id: str | None = None


@dataclass(frozen=True, slots=True)
class WorkflowCardShapeSpec:
    """Explicit geometric shape placement for one layout."""

    shape_type: ShapeType
    layer: ShapeLayer
    box: tuple[int, int, int, int]
    fill: tuple[int, int, int, int]
    radius: int = 0
    outline: tuple[int, int, int, int] | None = None
    outline_width: int = 0
    shape_id: str = ""


@dataclass(frozen=True, slots=True)
class WorkflowCardTextBlockSpec:
    """Explicit resolved text placement for one layout."""

    block_id: str
    role: TextRole
    lines: tuple[str, ...]
    x_left: int
    x_right: int
    y: int
    font_size: int
    spacing: int
    fill: tuple[int, int, int, int]
    alignment: TextAlignment
    font_variant: FontVariant = "sans"


@dataclass(frozen=True, slots=True)
class WorkflowCardImageBlockSpec:
    """Explicit image placement for one remote asset inside a layout."""

    block_id: str
    layer: ShapeLayer
    image_url: str
    box: tuple[int, int, int, int]
    fit: ImageFitMode = "contain"
    corner_radius: int = 0
    crop_focus: tuple[float, float] = (0.5, 0.5)


@dataclass(frozen=True, slots=True)
class WorkflowCardLayoutSpec:
    """Versioned composition spec rendered by Pillow."""

    layout_id: str
    canvas_width: int
    canvas_height: int
    theme_style: TemplateName
    background_image_url: str | None
    gradient_top_color: tuple[int, int, int]
    gradient_bottom_color: tuple[int, int, int]
    background_blend_alpha: float
    shapes: tuple[WorkflowCardShapeSpec, ...]
    image_blocks: tuple[WorkflowCardImageBlockSpec, ...] = ()
    text_blocks: tuple[WorkflowCardTextBlockSpec, ...] = ()


@dataclass(frozen=True, slots=True)
class _TemplateStyle:
    top_color: tuple[int, int, int]
    bottom_color: tuple[int, int, int]
    panel_fill: tuple[int, int, int, int]
    title_color: tuple[int, int, int, int]
    body_color: tuple[int, int, int, int]
    accent_color: tuple[int, int, int, int]
    add_shapes: bool


class WorkflowCardRenderer:
    """Create polished card compositions for preview and final asset export."""

    DEFAULT_SIZE = (1080, 1350)
    _TEMPLATES: dict[str, _TemplateStyle] = {
        "minimal": _TemplateStyle(
            top_color=(245, 243, 236),
            bottom_color=(229, 239, 252),
            panel_fill=(255, 255, 255, 232),
            title_color=(28, 36, 52, 255),
            body_color=(35, 43, 57, 255),
            accent_color=(116, 143, 171, 255),
            add_shapes=False,
        ),
        "festive": _TemplateStyle(
            top_color=(255, 234, 206),
            bottom_color=(252, 190, 139),
            panel_fill=(255, 255, 255, 225),
            title_color=(133, 34, 21, 255),
            body_color=(88, 31, 22, 255),
            accent_color=(217, 77, 31, 255),
            add_shapes=True,
        ),
        "elegant": _TemplateStyle(
            top_color=(25, 30, 52),
            bottom_color=(55, 37, 67),
            panel_fill=(248, 245, 238, 225),
            title_color=(30, 26, 22, 255),
            body_color=(52, 45, 39, 255),
            accent_color=(182, 145, 91, 255),
            add_shapes=False,
        ),
        "playful": _TemplateStyle(
            top_color=(228, 250, 255),
            bottom_color=(255, 221, 244),
            panel_fill=(255, 255, 255, 224),
            title_color=(40, 48, 114, 255),
            body_color=(48, 52, 92, 255),
            accent_color=(255, 94, 163, 255),
            add_shapes=True,
        ),
    }

    def render_preview_png(self, payload: PreviewCardRenderInput) -> bytes:
        """Render internal preview card with workflow/debug metadata."""

        return self.render_layout_png(self.build_preview_layout_spec(payload))

    def render_final_png(self, payload: FinalCardRenderInput) -> bytes:
        """Render polished user-facing greeting card without workflow metadata."""

        return self.render_layout_png(self.build_final_layout_spec(payload))

    def build_preview_layout_spec(self, payload: PreviewCardRenderInput) -> WorkflowCardLayoutSpec:
        """Resolve a versioned preview layout spec from preview payload inputs."""

        width, height = self._parse_export_size(payload.export_size)
        theme_style = self._resolve_template_name(payload.theme_style)
        style = self._resolve_template_style(theme_style)
        padding = int(width * 0.075)

        shapes = list(self._build_template_shapes(width, height, style))
        text_blocks: list[WorkflowCardTextBlockSpec] = []

        header_shape, header_blocks = self._build_metadata_layout(
            width=width,
            height=height,
            payload=payload,
            style=style,
            padding=padding,
        )
        shapes.append(header_shape)
        text_blocks.extend(header_blocks)

        body_shapes, body_blocks = self._build_message_panel_layout(
            width=width,
            top=int(height * 0.26),
            height=int(height * 0.60),
            title="Internal Preview",
            message=payload.message,
            signoff=payload.signoff,
            alignment=payload.text_alignment,
            theme_style=theme_style,
            content_density=self._resolve_content_density(
                title="Internal Preview",
                message=payload.message,
                signoff=payload.signoff,
            ),
            style=style,
            padding=padding,
        )
        shapes.extend(body_shapes)
        text_blocks.extend(body_blocks)

        return WorkflowCardLayoutSpec(
            layout_id=self._resolve_layout_id(
                requested_layout_id=payload.layout_id,
                theme_style=theme_style,
                mode="preview",
            ),
            canvas_width=width,
            canvas_height=height,
            theme_style=theme_style,
            background_image_url=payload.background_image_url,
            gradient_top_color=style.top_color,
            gradient_bottom_color=style.bottom_color,
            background_blend_alpha=0.45,
            shapes=tuple(shapes),
            image_blocks=(),
            text_blocks=tuple(text_blocks),
        )

    def build_final_layout_spec(self, payload: FinalCardRenderInput) -> WorkflowCardLayoutSpec:
        """Resolve a versioned final-card layout spec from final render inputs."""

        width, height = self._parse_export_size(payload.export_size)
        theme_style = self._resolve_template_name(payload.theme_style)
        style = self._resolve_template_style(theme_style)
        padding = int(width * 0.08)
        content_density = self._resolve_content_density(
            title=(payload.title or "").strip() or None,
            message=payload.message,
            signoff=payload.signoff,
        )
        layout_id = self._resolve_layout_id(
            requested_layout_id=payload.layout_id,
            theme_style=theme_style,
            mode="final",
        )

        shapes = list(self._build_template_shapes(width, height, style))
        shapes.extend(self._build_theme_ornament_shapes(width=width, height=height, theme_style=theme_style, style=style))
        image_blocks: list[WorkflowCardImageBlockSpec] = []
        text_blocks: list[WorkflowCardTextBlockSpec] = []
        if layout_id == "text_left_illustration_right":
            panel_shapes, panel_images, panel_blocks = self._build_side_by_side_final_layout(
                width=width,
                height=height,
                title=(payload.title or "").strip() or None,
                message=payload.message,
                signoff=payload.signoff,
                alignment=payload.text_alignment,
                theme_style=theme_style,
                content_density=content_density,
                illustration_image_url=payload.illustration_image_url,
                style=style,
                padding=padding,
            )
        elif layout_id == "poster_illustration_caption":
            panel_shapes, panel_images, panel_blocks = self._build_poster_final_layout(
                width=width,
                height=height,
                title=(payload.title or "").strip() or None,
                message=payload.message,
                signoff=payload.signoff,
                alignment=payload.text_alignment,
                theme_style=theme_style,
                content_density=content_density,
                illustration_image_url=payload.illustration_image_url,
                style=style,
                padding=padding,
            )
        else:
            panel_shapes, panel_images, panel_blocks = self._build_top_illustration_final_layout(
                width=width,
                height=height,
                title=(payload.title or "").strip() or None,
                message=payload.message,
                signoff=payload.signoff,
                alignment=payload.text_alignment,
                theme_style=theme_style,
                content_density=content_density,
                illustration_image_url=payload.illustration_image_url,
                style=style,
                padding=padding,
            )
        shapes.extend(panel_shapes)
        image_blocks.extend(panel_images)
        text_blocks.extend(panel_blocks)

        return WorkflowCardLayoutSpec(
            layout_id=layout_id,
            canvas_width=width,
            canvas_height=height,
            theme_style=theme_style,
            background_image_url=payload.background_image_url,
            gradient_top_color=style.top_color,
            gradient_bottom_color=style.bottom_color,
            background_blend_alpha=0.45,
            shapes=tuple(shapes),
            image_blocks=tuple(image_blocks),
            text_blocks=tuple(text_blocks),
        )

    def render_layout_png(self, layout: WorkflowCardLayoutSpec) -> bytes:
        """Render PNG bytes from an explicit versioned layout spec."""

        canvas = self._create_base_canvas(
            width=layout.canvas_width,
            height=layout.canvas_height,
            top_color=layout.gradient_top_color,
            bottom_color=layout.gradient_bottom_color,
            background_image_url=layout.background_image_url,
            background_blend_alpha=layout.background_blend_alpha,
        )
        draw = ImageDraw.Draw(canvas, "RGBA")

        for layer in ("background", "content"):
            for shape in layout.shapes:
                if shape.layer != layer:
                    continue
                self._draw_shape(draw=draw, shape=shape)
            for image_block in layout.image_blocks:
                if image_block.layer != layer:
                    continue
                self._draw_image_block(canvas=canvas, image_block=image_block)

        for text_block in layout.text_blocks:
            font = self._load_font(size=text_block.font_size, variant=text_block.font_variant)
            self._draw_multiline(
                draw=draw,
                lines=list(text_block.lines),
                x_left=text_block.x_left,
                x_right=text_block.x_right,
                y=text_block.y,
                font=font,
                spacing=text_block.spacing,
                fill=text_block.fill,
                alignment=text_block.alignment,
            )
        return self._encode_png(canvas)

    def render_pdf_from_png(self, png_bytes: bytes) -> bytes:
        """Export PDF bytes from already-rendered PNG bytes."""

        with Image.open(BytesIO(png_bytes)) as image:
            output = BytesIO()
            image.convert("RGB").save(output, format="PDF", resolution=100.0)
            return output.getvalue()

    def _create_base_canvas(
        self,
        *,
        width: int,
        height: int,
        top_color: tuple[int, int, int],
        bottom_color: tuple[int, int, int],
        background_image_url: str | None,
        background_blend_alpha: float,
    ) -> Image.Image:
        """Build a stylized base canvas with optional background image."""

        canvas = self._build_vertical_gradient(width, height, top_color, bottom_color)
        background = self._download_background(background_image_url, width, height)
        if background is not None:
            canvas = Image.blend(background, canvas, alpha=background_blend_alpha)
        return canvas.convert("RGBA")

    def _build_metadata_layout(
        self,
        *,
        width: int,
        height: int,
        payload: PreviewCardRenderInput,
        style: _TemplateStyle,
        padding: int,
    ) -> tuple[WorkflowCardShapeSpec, list[WorkflowCardTextBlockSpec]]:
        """Build explicit preview-header shapes and text blocks."""

        header_height = int(height * 0.18)
        header_shape = WorkflowCardShapeSpec(
            shape_type="rounded_rect",
            layer="content",
            box=(padding, padding, width - padding, padding + header_height),
            fill=style.panel_fill,
            radius=28,
        )
        blocks: list[WorkflowCardTextBlockSpec] = []
        x = padding + int(width * 0.03)
        y = padding + int(height * 0.022)

        title_size = int(width * 0.043)
        blocks.append(
            WorkflowCardTextBlockSpec(
                block_id="preview_header_title",
                role="metadata_title",
                lines=((payload.title.strip() or "Approval Preview"),),
                x_left=x,
                x_right=width - padding - int(width * 0.03),
                y=y,
                font_size=title_size,
                font_variant="sans_bold",
                spacing=0,
                fill=style.title_color,
                alignment="left",
            )
        )
        y += int(height * 0.05)

        meta_size = int(width * 0.024)
        metadata_lines = [
            f"Theme: {payload.theme_name}",
            f"Job ID: {payload.job_id} | Status: {payload.status}",
        ]
        metadata_lines.extend([f"- {item}" for item in payload.metadata_lines[:3]])
        step_map = [int(height * 0.031), int(height * 0.03), int(height * 0.024), int(height * 0.024), int(height * 0.024)]

        for index, line in enumerate(metadata_lines):
            size = meta_size if index < 2 else int(width * 0.019)
            blocks.append(
                WorkflowCardTextBlockSpec(
                    block_id=f"preview_header_line_{index + 1}",
                    role="metadata_line",
                    lines=(line,),
                    x_left=x,
                    x_right=width - padding - int(width * 0.03),
                    y=y,
                    font_size=size,
                    font_variant="sans",
                    spacing=0,
                    fill=style.body_color,
                    alignment="left",
                )
            )
            y += step_map[min(index, len(step_map) - 1)]

        return header_shape, blocks

    def _build_message_panel_layout(
        self,
        *,
        width: int,
        top: int,
        height: int,
        title: str | None,
        message: str,
        signoff: str | None,
        alignment: TextAlignment,
        theme_style: TemplateName,
        content_density: ContentDensity,
        style: _TemplateStyle,
        padding: int,
        left: int | None = None,
        right: int | None = None,
        variant: PanelVariant = "standard",
    ) -> tuple[list[WorkflowCardShapeSpec], list[WorkflowCardTextBlockSpec]]:
        """Build one text panel as explicit shapes and positioned text blocks."""

        left = padding if left is None else left
        right = width - padding if right is None else right
        panel_width = max(1, right - left)
        panel_radius = 34
        panel_fill = style.panel_fill
        panel_outline: tuple[int, int, int, int] | None = None
        outline_scale = 0.0
        shadow_offset = max(12, int(height * 0.016))
        shadow_fill = (35, 43, 57, 32)
        horizontal_ratio = 0.085
        top_ratio = 0.085
        bottom_ratio = 0.08
        title_scale = 0.09
        body_scale = 0.04
        body_minimum = 20
        body_max_lines = 14
        signoff_scale = 0.04
        title_gap_ratio = 0.04
        body_gap_ratio = 0.05
        add_header_rule = False
        header_rule_scale = 0.18

        if content_density == "compact":
            title_scale += 0.01
            title_gap_ratio = max(0.03, title_gap_ratio - 0.006)
            body_gap_ratio = max(0.04, body_gap_ratio - 0.006)
            body_max_lines = max(8, body_max_lines - 1)
        elif content_density == "dense":
            top_ratio = max(0.07, top_ratio - 0.012)
            bottom_ratio = max(0.06, bottom_ratio - 0.012)
            title_scale = max(0.078, title_scale - 0.008)
            body_scale = max(0.036, body_scale - 0.002)
            body_minimum = max(body_minimum, 21)
            body_max_lines += 2
            title_gap_ratio = max(0.028, title_gap_ratio - 0.01)
            body_gap_ratio = max(0.04, body_gap_ratio - 0.008)

        if variant == "editorial":
            panel_radius = 40
            panel_fill = (250, 247, 241, 238)
            panel_outline = self._with_alpha(style.accent_color, 120)
            outline_scale = 0.006
            shadow_fill = self._with_alpha(style.accent_color, 26)
            horizontal_ratio = 0.1
            top_ratio = 0.1
            bottom_ratio = 0.09
            title_scale = 0.102
            body_scale = 0.043
            body_minimum = 22
            body_max_lines = 11
            signoff_scale = 0.044
            title_gap_ratio = 0.045
            body_gap_ratio = 0.055
            add_header_rule = True
            header_rule_scale = 0.22
            if content_density == "compact":
                title_scale += 0.008
                body_gap_ratio = max(0.046, body_gap_ratio - 0.006)
            elif content_density == "dense":
                top_ratio = max(0.082, top_ratio - 0.01)
                bottom_ratio = max(0.075, bottom_ratio - 0.01)
                title_scale = max(0.09, title_scale - 0.006)
                body_scale = max(0.04, body_scale - 0.001)
                body_max_lines += 2
                title_gap_ratio = max(0.032, title_gap_ratio - 0.008)
                body_gap_ratio = max(0.045, body_gap_ratio - 0.006)
        elif variant == "caption":
            panel_radius = 38
            panel_fill = (252, 249, 243, 238)
            panel_outline = self._with_alpha(style.accent_color, 128)
            outline_scale = 0.007
            shadow_fill = self._with_alpha(style.accent_color, 24)
            horizontal_ratio = 0.095
            top_ratio = 0.095
            bottom_ratio = 0.085
            title_scale = 0.094
            body_scale = 0.041
            body_minimum = 22
            body_max_lines = 10
            signoff_scale = 0.04
            title_gap_ratio = 0.042
            body_gap_ratio = 0.05
            add_header_rule = True
            header_rule_scale = 0.2
            if content_density == "compact":
                title_scale += 0.008
                body_gap_ratio = max(0.043, body_gap_ratio - 0.005)
            elif content_density == "dense":
                top_ratio = max(0.082, top_ratio - 0.01)
                bottom_ratio = max(0.072, bottom_ratio - 0.01)
                title_scale = max(0.086, title_scale - 0.006)
                body_scale = max(0.039, body_scale - 0.001)
                body_max_lines += 2
                title_gap_ratio = max(0.032, title_gap_ratio - 0.008)
                body_gap_ratio = max(0.043, body_gap_ratio - 0.006)

        panel_outline_width = max(0, int(panel_width * outline_scale)) if panel_outline else 0
        panel_shadow = WorkflowCardShapeSpec(
            shape_id="message_panel_shadow",
            shape_type="rounded_rect",
            layer="content",
            box=(left, top + shadow_offset, right, top + height + shadow_offset),
            fill=shadow_fill,
            radius=panel_radius + 2,
        )
        panel_shape = WorkflowCardShapeSpec(
            shape_id="message_panel",
            shape_type="rounded_rect",
            layer="content",
            box=(left, top, right, top + height),
            fill=panel_fill,
            radius=panel_radius,
            outline=panel_outline,
            outline_width=panel_outline_width,
        )

        horizontal_inset = max(28, int(panel_width * horizontal_ratio))
        inner_left = left + horizontal_inset
        inner_right = right - horizontal_inset
        inner_top = top + int(height * top_ratio)
        inner_bottom = top + height - int(height * bottom_ratio)
        content_width = inner_right - inner_left
        vertical_space = inner_bottom - inner_top

        scratch = Image.new("RGBA", (width, max(top + height, 1)))
        draw = ImageDraw.Draw(scratch, "RGBA")

        shapes = [panel_shadow, panel_shape]
        blocks: list[WorkflowCardTextBlockSpec] = []
        cursor_y = inner_top
        if add_header_rule:
            rule_width = max(120, int(panel_width * header_rule_scale))
            rule_height = max(8, int(height * 0.012))
            if alignment == "center":
                rule_left = left + ((panel_width - rule_width) // 2)
            elif alignment == "right":
                rule_left = right - horizontal_inset - rule_width
            else:
                rule_left = inner_left
            rule_top = top + int(height * 0.055)
            shapes.append(
                WorkflowCardShapeSpec(
                    shape_id="message_panel_rule",
                    shape_type="rounded_rect",
                    layer="content",
                    box=(rule_left, rule_top, rule_left + rule_width, rule_top + rule_height),
                    fill=self._with_alpha(style.accent_color, 178),
                    radius=999,
                )
            )
            cursor_y = max(cursor_y, rule_top + rule_height + int(height * 0.045))

        title_text = (title or "").strip()
        if title_text:
            initial_title_size = max(34, int(panel_width * title_scale))
            title_font_variant = self._resolve_font_variant(theme_style=theme_style, role="title", variant=variant)
            title_font = self._load_font(size=initial_title_size, variant=title_font_variant)
            title_lines = self._wrap_lines(draw, title_text, title_font, content_width, max_lines=2)
            title_font_size = getattr(title_font, "size", initial_title_size)
            title_spacing = max(10, int(title_font_size * 0.25))
            title_height = self._measure_multiline_height(draw, title_lines, title_font, title_spacing)
            blocks.append(
                WorkflowCardTextBlockSpec(
                    block_id="title",
                    role="title",
                    lines=tuple(title_lines),
                    x_left=inner_left,
                    x_right=inner_right,
                    y=cursor_y,
                    font_size=title_font_size,
                    font_variant=title_font_variant,
                    spacing=title_spacing,
                    fill=style.title_color,
                    alignment=alignment,
                )
            )
            cursor_y += title_height + int(height * title_gap_ratio)

        signoff_text = (signoff or "").strip()
        body_max_height = vertical_space - (cursor_y - inner_top)
        if signoff_text:
            body_max_height -= int(height * 0.12 if variant == "standard" else 0.105)
        body_font_variant = self._resolve_font_variant(theme_style=theme_style, role="body", variant=variant)
        body_font, body_lines, body_spacing = self._fit_body_text(
            draw=draw,
            message=message,
            max_width=content_width,
            max_height=max(body_max_height, 150),
            width=panel_width,
            font_variant=body_font_variant,
            initial_scale=body_scale,
            minimum_size=body_minimum,
            max_lines=body_max_lines,
        )
        body_font_size = getattr(body_font, "size", max(24, int(panel_width * max(body_scale, 0.04))))
        body_height = self._measure_multiline_height(draw, body_lines, body_font, body_spacing)
        blocks.append(
            WorkflowCardTextBlockSpec(
                block_id="body",
                role="body",
                lines=tuple(body_lines),
                x_left=inner_left,
                x_right=inner_right,
                y=cursor_y,
                font_size=body_font_size,
                font_variant=body_font_variant,
                spacing=body_spacing,
                fill=style.body_color,
                alignment=alignment,
            )
        )
        cursor_y += body_height + int(height * body_gap_ratio)

        if signoff_text:
            signoff_size = max(22, int(panel_width * signoff_scale))
            signoff_font_variant = self._resolve_font_variant(
                theme_style=theme_style,
                role="signoff",
                variant=variant,
            )
            blocks.append(
                WorkflowCardTextBlockSpec(
                    block_id="signoff",
                    role="signoff",
                    lines=(signoff_text,),
                    x_left=inner_left,
                    x_right=inner_right,
                    y=min(cursor_y, inner_bottom - int(height * 0.08)),
                    font_size=signoff_size,
                    font_variant=signoff_font_variant,
                    spacing=0,
                    fill=style.accent_color,
                    alignment=alignment,
                )
            )

        return shapes, blocks

    def _build_top_illustration_final_layout(
        self,
        *,
        width: int,
        height: int,
        title: str | None,
        message: str,
        signoff: str | None,
        alignment: TextAlignment,
        theme_style: TemplateName,
        content_density: ContentDensity,
        illustration_image_url: str | None,
        style: _TemplateStyle,
        padding: int,
    ) -> tuple[list[WorkflowCardShapeSpec], list[WorkflowCardImageBlockSpec], list[WorkflowCardTextBlockSpec]]:
        """Build the canonical illustration-top, text-bottom final layout."""

        top = int(height * 0.07)
        if content_density == "compact":
            illustration_bottom = int(height * 0.60)
        elif content_density == "dense":
            illustration_bottom = int(height * 0.53)
        else:
            illustration_bottom = int(height * 0.57)
        frame_box = (padding, top, width - padding, illustration_bottom)
        art_shadow = WorkflowCardShapeSpec(
            shape_id="top_art_shadow",
            shape_type="rounded_rect",
            layer="content",
            box=(frame_box[0], frame_box[1] + int(height * 0.012), frame_box[2], frame_box[3] + int(height * 0.012)),
            fill=(35, 43, 57, 44),
            radius=38,
        )
        art_frame = WorkflowCardShapeSpec(
            shape_id="top_art_frame",
            shape_type="rounded_rect",
            layer="content",
            box=(
                frame_box[0],
                frame_box[1] - int(height * 0.01),
                frame_box[2],
                frame_box[3] - int(height * 0.01),
            ),
            fill=(255, 248, 240, 228),
            radius=38,
            outline=self._with_alpha(style.accent_color, 130),
            outline_width=max(4, int(width * 0.005)),
        )
        art_matte = WorkflowCardShapeSpec(
            shape_id="top_art_matte",
            shape_type="rounded_rect",
            layer="content",
            box=(
                frame_box[0] + int(width * 0.022),
                frame_box[1] + int(height * 0.014),
                frame_box[2] - int(width * 0.022),
                frame_box[3] - int(height * 0.028),
            ),
            fill=(255, 255, 255, 238),
            radius=30,
            outline=(223, 214, 203, 255),
            outline_width=max(2, int(width * 0.002)),
        )
        image_blocks: list[WorkflowCardImageBlockSpec] = []
        if illustration_image_url:
            image_blocks.append(
                WorkflowCardImageBlockSpec(
                    block_id="hero_illustration",
                    layer="content",
                    image_url=illustration_image_url,
                    box=(
                        frame_box[0] + int(width * 0.048),
                        frame_box[1] + int(height * 0.034),
                        frame_box[2] - int(width * 0.048),
                        frame_box[3] - int(height * 0.056),
                    ),
                    fit="cover",
                    corner_radius=28,
                    crop_focus=(0.5, 0.34),
                )
            )

        accent_bar_top = illustration_bottom + int(height * 0.014)
        accent_bar = WorkflowCardShapeSpec(
            shape_id="top_accent_bar",
            shape_type="rounded_rect",
            layer="content",
            box=(
                int(width * 0.37),
                accent_bar_top,
                int(width * 0.63),
                accent_bar_top + max(8, int(height * 0.01)),
            ),
            fill=style.accent_color,
            radius=999,
        )

        overlap = int(height * (0.04 if content_density == "compact" else 0.018 if content_density == "dense" else 0.028))
        panel_top = illustration_bottom - overlap
        panel_min_height = int(height * (0.20 if content_density == "compact" else 0.27 if content_density == "dense" else 0.23))
        panel_height = max(panel_min_height, height - panel_top - int(height * 0.085))
        panel_left = padding + int(width * 0.08)
        panel_right = width - padding - int(width * 0.08)
        panel_shapes, panel_blocks = self._build_message_panel_layout(
            width=width,
            top=panel_top,
            height=panel_height,
            title=title,
            message=message,
            signoff=signoff,
            alignment=alignment,
            theme_style=theme_style,
            content_density=content_density,
            style=style,
            padding=padding,
            left=panel_left,
            right=panel_right,
            variant="caption",
        )
        return [art_shadow, art_frame, art_matte, accent_bar, *panel_shapes], image_blocks, panel_blocks

    def _build_side_by_side_final_layout(
        self,
        *,
        width: int,
        height: int,
        title: str | None,
        message: str,
        signoff: str | None,
        alignment: TextAlignment,
        theme_style: TemplateName,
        content_density: ContentDensity,
        illustration_image_url: str | None,
        style: _TemplateStyle,
        padding: int,
    ) -> tuple[list[WorkflowCardShapeSpec], list[WorkflowCardImageBlockSpec], list[WorkflowCardTextBlockSpec]]:
        """Build the alternate text-left, illustration-right final layout."""

        top = int(height * (0.135 if content_density == "compact" else 0.125 if content_density == "dense" else 0.14))
        bottom = int(height * (0.82 if content_density == "compact" else 0.865 if content_density == "dense" else 0.84))
        gutter = int(width * 0.04)
        text_left = padding
        text_right = int(width * (0.45 if content_density == "compact" else 0.5 if content_density == "dense" else 0.47))
        image_left = text_right + gutter
        image_right = width - padding

        image_shadow = WorkflowCardShapeSpec(
            shape_id="side_art_shadow",
            shape_type="rounded_rect",
            layer="content",
            box=(image_left, top + int(height * 0.012), image_right, bottom + int(height * 0.012)),
            fill=(35, 43, 57, 42),
            radius=36,
        )
        image_shape = WorkflowCardShapeSpec(
            shape_id="side_art_frame",
            shape_type="rounded_rect",
            layer="content",
            box=(image_left, top - int(height * 0.008), image_right, bottom - int(height * 0.008)),
            fill=(255, 248, 240, 232),
            radius=34,
            outline=self._with_alpha(style.accent_color, 122),
            outline_width=max(4, int(width * 0.004)),
        )
        image_matte = WorkflowCardShapeSpec(
            shape_id="side_art_matte",
            shape_type="rounded_rect",
            layer="content",
            box=(
                image_left + int(width * 0.018),
                top + int(height * 0.01),
                image_right - int(width * 0.018),
                bottom - int(height * 0.026),
            ),
            fill=(255, 255, 255, 240),
            radius=28,
            outline=(223, 214, 203, 255),
            outline_width=max(2, int(width * 0.002)),
        )
        image_blocks: list[WorkflowCardImageBlockSpec] = []
        if illustration_image_url:
            image_blocks.append(
                WorkflowCardImageBlockSpec(
                    block_id="side_illustration",
                    layer="content",
                    image_url=illustration_image_url,
                    box=(
                        image_left + int(width * 0.022),
                        top + int(height * 0.025),
                        image_right - int(width * 0.022),
                        bottom - int(height * 0.025),
                    ),
                    fit="cover",
                    corner_radius=28,
                    crop_focus=(0.5, 0.4),
                )
            )

        panel_shapes, panel_blocks = self._build_message_panel_layout(
            width=width,
            top=top,
            height=bottom - top,
            title=title,
            message=message,
            signoff=signoff,
            alignment=alignment,
            theme_style=theme_style,
            content_density=content_density,
            style=style,
            padding=padding,
            left=text_left,
            right=text_right,
            variant="editorial",
        )
        return [image_shadow, image_shape, image_matte, *panel_shapes], image_blocks, panel_blocks

    def _build_poster_final_layout(
        self,
        *,
        width: int,
        height: int,
        title: str | None,
        message: str,
        signoff: str | None,
        alignment: TextAlignment,
        theme_style: TemplateName,
        content_density: ContentDensity,
        illustration_image_url: str | None,
        style: _TemplateStyle,
        padding: int,
    ) -> tuple[list[WorkflowCardShapeSpec], list[WorkflowCardImageBlockSpec], list[WorkflowCardTextBlockSpec]]:
        """Build a centered poster-style illustration card with a separate caption block."""

        frame_width = int(width * 0.72)
        frame_left = (width - frame_width) // 2
        frame_right = frame_left + frame_width
        top = int(height * 0.06)
        if content_density == "compact":
            bottom = int(height * 0.72)
        elif content_density == "dense":
            bottom = int(height * 0.66)
        else:
            bottom = int(height * 0.69)

        image_shadow = WorkflowCardShapeSpec(
            shape_id="poster_art_shadow",
            shape_type="rounded_rect",
            layer="content",
            box=(frame_left, top + int(height * 0.012), frame_right, bottom + int(height * 0.012)),
            fill=(35, 43, 57, 48),
            radius=40,
        )
        image_shape = WorkflowCardShapeSpec(
            shape_id="poster_art_frame",
            shape_type="rounded_rect",
            layer="content",
            box=(frame_left, top - int(height * 0.01), frame_right, bottom - int(height * 0.01)),
            fill=(255, 248, 240, 234),
            radius=40,
            outline=self._with_alpha(style.accent_color, 136),
            outline_width=max(5, int(width * 0.005)),
        )
        image_matte = WorkflowCardShapeSpec(
            shape_id="poster_art_matte",
            shape_type="rounded_rect",
            layer="content",
            box=(
                frame_left + int(width * 0.02),
                top + int(height * 0.01),
                frame_right - int(width * 0.02),
                bottom - int(height * 0.03),
            ),
            fill=(255, 255, 255, 242),
            radius=30,
            outline=(223, 214, 203, 255),
            outline_width=max(2, int(width * 0.002)),
        )

        image_blocks: list[WorkflowCardImageBlockSpec] = []
        if illustration_image_url:
            image_blocks.append(
                WorkflowCardImageBlockSpec(
                    block_id="poster_illustration",
                    layer="content",
                    image_url=illustration_image_url,
                    box=(
                        frame_left + int(width * 0.04),
                        top + int(height * 0.03),
                        frame_right - int(width * 0.04),
                        bottom - int(height * 0.07),
                    ),
                    fit="cover",
                    corner_radius=24,
                    crop_focus=(0.5, 0.3),
                )
            )

        poster_crown = WorkflowCardShapeSpec(
            shape_id="poster_crown",
            shape_type="rounded_rect",
            layer="content",
            box=(
                frame_left + int(width * 0.12),
                top - int(height * 0.022),
                frame_right - int(width * 0.12),
                top - int(height * 0.008),
            ),
            fill=self._with_alpha(style.accent_color, 166),
            radius=999,
        )

        accent_bar_top = bottom + int(height * 0.012)
        accent_bar = WorkflowCardShapeSpec(
            shape_id="poster_accent_bar",
            shape_type="rounded_rect",
            layer="content",
            box=(
                int(width * 0.41),
                accent_bar_top,
                int(width * 0.59),
                accent_bar_top + max(8, int(height * 0.01)),
            ),
            fill=style.accent_color,
            radius=999,
        )

        panel_top = bottom + int(height * (0.034 if content_density == "dense" else 0.038))
        panel_min_height = int(height * (0.17 if content_density == "compact" else 0.23 if content_density == "dense" else 0.18))
        panel_height = max(panel_min_height, height - panel_top - int(height * 0.08))
        panel_left = padding + int(width * 0.1)
        panel_right = width - padding - int(width * 0.1)
        panel_shapes, panel_blocks = self._build_message_panel_layout(
            width=width,
            top=panel_top,
            height=panel_height,
            title=title,
            message=message,
            signoff=signoff,
            alignment=alignment,
            theme_style=theme_style,
            content_density=content_density,
            style=style,
            padding=padding,
            left=panel_left,
            right=panel_right,
            variant="caption",
        )
        return [image_shadow, image_shape, image_matte, poster_crown, accent_bar, *panel_shapes], image_blocks, panel_blocks

    def _fit_body_text(
        self,
        *,
        draw: ImageDraw.ImageDraw,
        message: str,
        max_width: int,
        max_height: int,
        width: int,
        font_variant: FontVariant = "sans",
        initial_scale: float = 0.04,
        minimum_size: int = 20,
        max_lines: int = 14,
    ) -> tuple[ImageFont.ImageFont, list[str], int]:
        """Wrap and scale body text so it fits without overflow."""

        text = message.strip() or "Warm wishes."
        initial = max(28, int(width * initial_scale))
        minimum = minimum_size

        for size in range(initial, minimum - 1, -2):
            font = self._load_font(size=size, variant=font_variant)
            lines = self._wrap_lines(draw, text, font, max_width, max_lines=max_lines)
            spacing = max(8, int(size * 0.3))
            total_height = self._measure_multiline_height(draw, lines, font, spacing)
            if total_height <= max_height:
                return font, lines, spacing

        fallback_font = self._load_font(size=minimum, variant=font_variant)
        lines = self._wrap_lines(draw, text, fallback_font, max_width, max_lines=max_lines, truncate=True)
        spacing = max(8, int(minimum * 0.3))
        return fallback_font, lines, spacing

    def _wrap_lines(
        self,
        draw: ImageDraw.ImageDraw,
        text: str,
        font: ImageFont.ImageFont,
        max_width: int,
        *,
        max_lines: int,
        truncate: bool = False,
    ) -> list[str]:
        """Wrap text into lines that fit width constraints."""

        words = text.split()
        if not words:
            return [""]

        lines: list[str] = []
        current = words[0]
        for word in words[1:]:
            candidate = f"{current} {word}"
            if draw.textlength(candidate, font=font) <= max_width:
                current = candidate
                continue
            lines.append(current)
            current = word
        lines.append(current)

        wrapped: list[str] = []
        for line in lines:
            if draw.textlength(line, font=font) <= max_width:
                wrapped.append(line)
                continue
            avg_char_width = max(draw.textlength("ABCDEFGHIJKLMNOPQRSTUVWXYZ", font=font) / 26, 1)
            char_count = max(1, int(max_width / avg_char_width))
            wrapped.extend(wrap(line, width=char_count))

        if len(wrapped) <= max_lines:
            return wrapped
        clipped = wrapped[:max_lines]
        if truncate:
            clipped[-1] = self._ellipsis_line(draw=draw, line=clipped[-1], font=font, max_width=max_width)
        return clipped

    def _draw_shape(self, *, draw: ImageDraw.ImageDraw, shape: WorkflowCardShapeSpec) -> None:
        """Render one geometric shape from the explicit layout spec."""

        if shape.shape_type == "ellipse":
            draw.ellipse(shape.box, fill=shape.fill, outline=shape.outline, width=shape.outline_width)
            return
        draw.rounded_rectangle(
            shape.box,
            radius=shape.radius,
            fill=shape.fill,
            outline=shape.outline,
            width=shape.outline_width,
        )

    def _draw_image_block(
        self,
        *,
        canvas: Image.Image,
        image_block: WorkflowCardImageBlockSpec,
    ) -> None:
        """Render one remote illustration asset into its resolved layout box."""

        image = self._download_remote_image(image_block.image_url)
        if image is None:
            return

        block_width = max(1, image_block.box[2] - image_block.box[0])
        block_height = max(1, image_block.box[3] - image_block.box[1])
        if image_block.fit == "cover":
            rendered = ImageOps.fit(
                image,
                (block_width, block_height),
                method=Image.Resampling.LANCZOS,
                centering=image_block.crop_focus,
            )
        else:
            contained = ImageOps.contain(
                image,
                (block_width, block_height),
                method=Image.Resampling.LANCZOS,
            )
            rendered = Image.new("RGBA", (block_width, block_height), (255, 255, 255, 0))
            offset = (
                (block_width - contained.width) // 2,
                (block_height - contained.height) // 2,
            )
            rendered.alpha_composite(contained, dest=offset)

        if image_block.corner_radius > 0:
            mask = Image.new("L", (block_width, block_height), 0)
            ImageDraw.Draw(mask).rounded_rectangle(
                (0, 0, block_width, block_height),
                radius=image_block.corner_radius,
                fill=255,
            )
            rendered.putalpha(mask)

        canvas.alpha_composite(rendered, dest=(image_block.box[0], image_block.box[1]))

    def _draw_multiline(
        self,
        *,
        draw: ImageDraw.ImageDraw,
        lines: list[str],
        x_left: int,
        x_right: int,
        y: int,
        font: ImageFont.ImageFont,
        spacing: int,
        fill: tuple[int, int, int, int],
        alignment: TextAlignment,
    ) -> None:
        """Render multiline text with the requested alignment."""

        current_y = y
        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=font)
            line_width = bbox[2] - bbox[0]
            line_height = bbox[3] - bbox[1]
            x = x_left
            if alignment == "center":
                x = x_left + ((x_right - x_left - line_width) // 2)
            elif alignment == "right":
                x = x_right - line_width
            draw.text((x, current_y), line, font=font, fill=fill)
            current_y += line_height + spacing

    @staticmethod
    def _measure_multiline_height(
        draw: ImageDraw.ImageDraw,
        lines: list[str],
        font: ImageFont.ImageFont,
        spacing: int,
    ) -> int:
        """Calculate total height of a multiline text block."""

        heights = []
        for line in lines:
            bbox = draw.textbbox((0, 0), line, font=font)
            heights.append(bbox[3] - bbox[1])
        if not heights:
            return 0
        return sum(heights) + spacing * max(0, len(heights) - 1)

    @staticmethod
    def _ellipsis_line(
        *,
        draw: ImageDraw.ImageDraw,
        line: str,
        font: ImageFont.ImageFont,
        max_width: int,
    ) -> str:
        """Truncate a single line and append ellipsis if needed."""

        candidate = line.strip()
        if draw.textlength(candidate, font=font) <= max_width:
            return candidate
        suffix = "..."
        while candidate and draw.textlength(f"{candidate}{suffix}", font=font) > max_width:
            candidate = candidate[:-1]
        return f"{candidate}{suffix}" if candidate else suffix

    def _download_background(self, url: str | None, width: int, height: int) -> Image.Image | None:
        """Fetch optional background image and resize to canvas."""

        image = self._download_remote_image(url)
        if image is None:
            return None
        return ImageOps.fit(image.convert("RGB"), (width, height), method=Image.Resampling.LANCZOS)

    def _download_remote_image(self, url: str | None) -> Image.Image | None:
        """Fetch one remote image as RGBA, logging failures instead of raising."""

        if not url:
            return None
        try:
            with httpx.Client(timeout=8.0, follow_redirects=True) as client:
                response = client.get(url)
                response.raise_for_status()
            return Image.open(BytesIO(response.content)).convert("RGBA")
        except Exception as exc:  # noqa: BLE001
            logger.warning("image download failed url=%s error=%s", url, exc)
            return None

    @classmethod
    def _resolve_template_name(cls, template_name: str) -> TemplateName:
        """Normalize one template name to the supported set."""

        normalized = str(template_name or "").strip().lower()
        if normalized in cls._TEMPLATES:
            return normalized  # type: ignore[return-value]
        return "minimal"

    @classmethod
    def _resolve_template_style(cls, template_name: str) -> _TemplateStyle:
        """Resolve style config for one supported template."""

        return cls._TEMPLATES[cls._resolve_template_name(template_name)]

    def _build_theme_ornament_shapes(
        self,
        *,
        width: int,
        height: int,
        theme_style: TemplateName,
        style: _TemplateStyle,
    ) -> tuple[WorkflowCardShapeSpec, ...]:
        """Return deterministic theme-specific decorative layers for final cards."""

        if theme_style == "minimal":
            return (
                WorkflowCardShapeSpec(
                    shape_id="minimal_outer_frame",
                    shape_type="rounded_rect",
                    layer="content",
                    box=(int(width * 0.038), int(height * 0.036), int(width * 0.962), int(height * 0.964)),
                    fill=(255, 255, 255, 0),
                    radius=46,
                    outline=self._with_alpha(style.accent_color, 88),
                    outline_width=max(2, int(width * 0.002)),
                ),
                WorkflowCardShapeSpec(
                    shape_id="minimal_footer_rule",
                    shape_type="rounded_rect",
                    layer="content",
                    box=(int(width * 0.29), int(height * 0.932), int(width * 0.71), int(height * 0.94)),
                    fill=self._with_alpha(style.accent_color, 126),
                    radius=999,
                ),
            )
        if theme_style == "elegant":
            return (
                WorkflowCardShapeSpec(
                    shape_id="elegant_outer_frame",
                    shape_type="rounded_rect",
                    layer="content",
                    box=(int(width * 0.032), int(height * 0.03), int(width * 0.968), int(height * 0.97)),
                    fill=(255, 255, 255, 0),
                    radius=52,
                    outline=self._with_alpha(style.accent_color, 152),
                    outline_width=max(3, int(width * 0.003)),
                ),
                WorkflowCardShapeSpec(
                    shape_id="elegant_inner_frame",
                    shape_type="rounded_rect",
                    layer="content",
                    box=(int(width * 0.05), int(height * 0.048), int(width * 0.95), int(height * 0.952)),
                    fill=(255, 255, 255, 0),
                    radius=44,
                    outline=self._with_alpha(style.accent_color, 96),
                    outline_width=max(2, int(width * 0.002)),
                ),
                WorkflowCardShapeSpec(
                    shape_id="elegant_side_rail_left",
                    shape_type="rounded_rect",
                    layer="content",
                    box=(int(width * 0.065), int(height * 0.18), int(width * 0.073), int(height * 0.82)),
                    fill=self._with_alpha(style.accent_color, 86),
                    radius=999,
                ),
                WorkflowCardShapeSpec(
                    shape_id="elegant_side_rail_right",
                    shape_type="rounded_rect",
                    layer="content",
                    box=(int(width * 0.927), int(height * 0.18), int(width * 0.935), int(height * 0.82)),
                    fill=self._with_alpha(style.accent_color, 86),
                    radius=999,
                ),
                WorkflowCardShapeSpec(
                    shape_id="elegant_crest",
                    shape_type="ellipse",
                    layer="content",
                    box=(int(width * 0.455), int(height * 0.048), int(width * 0.545), int(height * 0.112)),
                    fill=(255, 255, 255, 0),
                    outline=self._with_alpha(style.accent_color, 168),
                    outline_width=max(3, int(width * 0.003)),
                ),
            )
        if theme_style == "festive":
            return (
                WorkflowCardShapeSpec(
                    shape_id="festive_corner_left",
                    shape_type="ellipse",
                    layer="content",
                    box=(int(width * 0.07), int(height * 0.08), int(width * 0.15), int(height * 0.14)),
                    fill=self._with_alpha(style.accent_color, 136),
                ),
                WorkflowCardShapeSpec(
                    shape_id="festive_corner_right",
                    shape_type="ellipse",
                    layer="content",
                    box=(int(width * 0.85), int(height * 0.08), int(width * 0.93), int(height * 0.14)),
                    fill=self._with_alpha(style.accent_color, 136),
                ),
                WorkflowCardShapeSpec(
                    shape_id="festive_footer_band",
                    shape_type="rounded_rect",
                    layer="content",
                    box=(int(width * 0.19), int(height * 0.92), int(width * 0.81), int(height * 0.934)),
                    fill=self._with_alpha(style.accent_color, 132),
                    radius=999,
                ),
            )
        if theme_style == "playful":
            return (
                WorkflowCardShapeSpec(
                    shape_id="playful_bubble_left",
                    shape_type="ellipse",
                    layer="content",
                    box=(int(width * 0.065), int(height * 0.12), int(width * 0.13), int(height * 0.17)),
                    fill=self._with_alpha(style.accent_color, 112),
                ),
                WorkflowCardShapeSpec(
                    shape_id="playful_bubble_right",
                    shape_type="ellipse",
                    layer="content",
                    box=(int(width * 0.872), int(height * 0.2), int(width * 0.94), int(height * 0.252)),
                    fill=self._with_alpha(style.accent_color, 118),
                ),
                WorkflowCardShapeSpec(
                    shape_id="playful_footer_tab",
                    shape_type="rounded_rect",
                    layer="content",
                    box=(int(width * 0.36), int(height * 0.918), int(width * 0.64), int(height * 0.934)),
                    fill=self._with_alpha(style.accent_color, 128),
                    radius=999,
                ),
            )
        return ()

    @staticmethod
    def _resolve_font_variant(
        *,
        theme_style: TemplateName,
        role: TextRole,
        variant: PanelVariant,
    ) -> FontVariant:
        """Choose a deterministic font variant for the theme/role combination."""

        if role == "metadata_title":
            return "sans_bold"
        if role == "metadata_line":
            return "sans"
        if role == "signoff":
            if theme_style in {"elegant", "festive"}:
                return "serif_italic"
            return "sans_italic"
        if role == "body":
            if theme_style == "elegant":
                return "serif"
            if variant == "editorial" and theme_style == "minimal":
                return "serif"
            return "sans"
        if theme_style in {"elegant", "festive"}:
            return "serif_bold"
        if theme_style == "playful":
            return "sans_bold"
        if variant in {"editorial", "caption"}:
            return "serif_bold"
        return "sans_bold"

    @staticmethod
    def _resolve_content_density(
        *,
        title: str | None,
        message: str,
        signoff: str | None,
    ) -> ContentDensity:
        """Classify the copy volume so layout balance can respond deterministically."""

        title_words = len((title or "").split())
        message_words = len((message or "").split())
        signoff_words = len((signoff or "").split())
        total_chars = len((title or "").strip()) + len((message or "").strip()) + len((signoff or "").strip())

        if message_words >= 24 or total_chars >= 180 or (message_words >= 18 and title_words >= 5):
            return "dense"
        if message_words <= 12 and title_words <= 4 and signoff_words <= 3 and total_chars <= 96:
            return "compact"
        return "balanced"

    @classmethod
    def _resolve_layout_id(
        cls,
        *,
        requested_layout_id: str | None,
        theme_style: TemplateName,
        mode: Literal["preview", "final"],
    ) -> str:
        """Normalize the layout id or derive the first versioned default."""

        normalized = cls._normalize_layout_id(requested_layout_id)
        if mode == "preview" and normalized:
            return normalized
        if mode == "final" and normalized in {
            "illustration_top_text_bottom",
            "text_left_illustration_right",
            "poster_illustration_caption",
        }:
            return normalized
        if mode == "preview":
            return f"preview_{theme_style}_v1"
        if theme_style == "elegant":
            return "text_left_illustration_right"
        if theme_style in {"festive", "playful"}:
            return "poster_illustration_caption"
        return "illustration_top_text_bottom"

    @staticmethod
    def _normalize_layout_id(value: str | None) -> str | None:
        """Return a safe layout identifier suitable for asset metadata and tests."""

        raw = str(value or "").strip().lower()
        if not raw:
            return None
        cleaned = "".join(char for char in raw if char.isalnum() or char in {"_", "-"}).strip("_-")
        return cleaned or None

    @staticmethod
    def _with_alpha(color: tuple[int, int, int, int], alpha: int) -> tuple[int, int, int, int]:
        """Return one RGBA color with a replaced alpha channel."""

        return (color[0], color[1], color[2], max(0, min(255, alpha)))

    @staticmethod
    def _build_template_shapes(width: int, height: int, style: _TemplateStyle) -> tuple[WorkflowCardShapeSpec, ...]:
        """Return decorative background circles for festive/playful templates."""

        if not style.add_shapes:
            return ()
        accent = style.accent_color
        return (
            WorkflowCardShapeSpec(
                shape_type="ellipse",
                layer="background",
                box=(int(width * 0.03), int(height * 0.05), int(width * 0.21), int(height * 0.20)),
                fill=(accent[0], accent[1], accent[2], 65),
            ),
            WorkflowCardShapeSpec(
                shape_type="ellipse",
                layer="background",
                box=(int(width * 0.78), int(height * 0.12), int(width * 0.96), int(height * 0.27)),
                fill=(accent[0], accent[1], accent[2], 58),
            ),
            WorkflowCardShapeSpec(
                shape_type="ellipse",
                layer="background",
                box=(int(width * 0.82), int(height * 0.78), int(width * 0.98), int(height * 0.94)),
                fill=(accent[0], accent[1], accent[2], 46),
            ),
        )

    @staticmethod
    def _build_vertical_gradient(
        width: int,
        height: int,
        top_color: tuple[int, int, int],
        bottom_color: tuple[int, int, int],
    ) -> Image.Image:
        """Create a smooth vertical gradient background image."""

        base = Image.new("RGB", (width, height), top_color)
        pixels = base.load()
        for y in range(height):
            mix = y / max(height - 1, 1)
            r = int(top_color[0] + (bottom_color[0] - top_color[0]) * mix)
            g = int(top_color[1] + (bottom_color[1] - top_color[1]) * mix)
            b = int(top_color[2] + (bottom_color[2] - top_color[2]) * mix)
            for x in range(width):
                pixels[x, y] = (r, g, b)
        return base

    @classmethod
    def _parse_export_size(cls, export_size: str) -> tuple[int, int]:
        """Parse WxH export string with defaults and guard rails."""

        raw = (export_size or "").strip().lower()
        if "x" not in raw:
            return cls.DEFAULT_SIZE
        try:
            width_str, height_str = raw.split("x", 1)
            width = max(600, int(width_str))
            height = max(800, int(height_str))
            return width, height
        except ValueError:
            return cls.DEFAULT_SIZE

    @staticmethod
    def _load_font(*, size: int, variant: FontVariant = "sans") -> ImageFont.ImageFont:
        """Return an available font with fallback."""

        variant_map: dict[FontVariant, tuple[str, ...]] = {
            "sans": ("DejaVuSans.ttf", "Arial.ttf", "Helvetica.ttf"),
            "sans_bold": ("DejaVuSans-Bold.ttf", "DejaVuSans.ttf", "Arial.ttf"),
            "sans_italic": ("DejaVuSans-Oblique.ttf", "DejaVuSans.ttf", "Arial.ttf"),
            "serif": ("DejaVuSerif.ttf", "DejaVuSans.ttf", "Times New Roman.ttf"),
            "serif_bold": ("DejaVuSerif-Bold.ttf", "DejaVuSans-Bold.ttf", "DejaVuSans.ttf"),
            "serif_italic": ("DejaVuSerif-Italic.ttf", "DejaVuSerif.ttf", "DejaVuSans-Oblique.ttf"),
        }

        for font_name in variant_map.get(variant, variant_map["sans"]):
            try:
                return ImageFont.truetype(font_name, size=size)
            except OSError:
                continue
        return ImageFont.load_default()

    @staticmethod
    def _encode_png(image: Image.Image) -> bytes:
        """Encode a composed card as optimized PNG bytes."""

        output = BytesIO()
        image.convert("RGBA").save(output, format="PNG", optimize=True)
        return output.getvalue()
