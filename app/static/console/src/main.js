import React, { useCallback, useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useNavigate, useParams } from "react-router-dom";
import htm from "htm";

const bootFallback = document.getElementById("boot-fallback");
const bootFallbackMessage = document.getElementById("boot-fallback-message");

function setBootFallbackMessage(message) {
  if (bootFallbackMessage) {
    bootFallbackMessage.textContent = message;
  }
}

function showBootFallback(message) {
  if (message) {
    setBootFallbackMessage(message);
  }
  if (bootFallback) {
    bootFallback.classList.remove("hidden");
  }
}

function hideBootFallback() {
  if (bootFallback) {
    bootFallback.classList.add("hidden");
  }
}

function reportBootFailure(message, error) {
  if (error) {
    // eslint-disable-next-line no-console
    console.error(message, error);
  }
  showBootFallback(message);
}

const html = htm.bind(React.createElement);

  function humanize(value) {
    return String(value || "unknown")
      .replace(/_/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase());
  }

  function themeBucketLabel(bucket) {
    const value = String(bucket || "everyday");
    if (value === "occasion") {
      return "Occasion";
    }
    if (value === "current_event") {
      return "Current Event";
    }
    return "Everyday";
  }

  function statusTone(statusValue) {
    const status = String(statusValue || "").toLowerCase();
    if (status === "completed" || status === "approved") {
      return "success";
    }
    if (status.includes("reject") || status.includes("timeout") || status.includes("failed")) {
      return "danger";
    }
    if (status.includes("pending") || status.includes("progress") || status.includes("queued")) {
      return "warning";
    }
    return "neutral";
  }

  function StatusBadge({ value }) {
    return html`<span className=${`badge ${statusTone(value)}`}>${humanize(value)}</span>`;
  }

  function SidebarIcon({ name }) {
    const sharedProps = {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "1.8",
      strokeLinecap: "round",
      strokeLinejoin: "round",
      "aria-hidden": "true",
    };

    if (name === "home") {
      return html`
        <svg ...${sharedProps}>
          <path d="M3 10.5 12 4l9 6.5" />
          <path d="M5.5 9.5V20h13V9.5" />
          <path d="M9.5 20v-5.5h5V20" />
        </svg>
      `;
    }

    if (name === "themes") {
      return html`
        <svg ...${sharedProps}>
          <path d="M12 3.5v3" />
          <path d="m5.9 5.9 2.1 2.1" />
          <path d="M3.5 12h3" />
          <path d="m5.9 18.1 2.1-2.1" />
          <path d="M12 20.5v-3" />
          <path d="m18.1 18.1-2.1-2.1" />
          <path d="M20.5 12h-3" />
          <path d="m18.1 5.9-2.1 2.1" />
          <circle cx="12" cy="12" r="3.5" />
        </svg>
      `;
    }

    if (name === "studio") {
      return html`
        <svg ...${sharedProps}>
          <rect x="4" y="5" width="16" height="14" rx="3" />
          <path d="M8 15.5 11 12l2.5 2.5L16 11l2 2.5" />
          <circle cx="9" cy="9" r="1.2" fill="currentColor" stroke="none" />
        </svg>
      `;
    }

    if (name === "compare") {
      return html`
        <svg ...${sharedProps}>
          <rect x="4" y="5" width="6.5" height="14" rx="2" />
          <rect x="13.5" y="5" width="6.5" height="14" rx="2" />
          <path d="M7.25 9h0" />
          <path d="M16.75 15h0" />
        </svg>
      `;
    }

    return html`
      <svg ...${sharedProps}>
        <rect x="4" y="5" width="16" height="14" rx="3" />
        <path d="M8 9h8" />
        <path d="M8 12h8" />
        <path d="M8 15h5" />
      </svg>
    `;
  }

  function formatDate(value) {
    if (!value) {
      return "-";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "-";
    }
    return parsed.toLocaleString();
  }

  function formatBytes(bytes) {
    const value = Number(bytes || 0);
    if (value <= 0) {
      return "0 B";
    }
    const units = ["B", "KB", "MB", "GB", "TB"];
    const exp = Math.min(Math.floor(Math.log(value) / Math.log(1024)), units.length - 1);
    const amount = value / 1024 ** exp;
    return `${amount.toFixed(exp === 0 ? 0 : 1)} ${units[exp]}`;
  }

  function summarizePayload(payload) {
    if (!payload || typeof payload !== "object") {
      return "";
    }
    const preferredKeys = [
      "decision",
      "status",
      "winner_model",
      "endpoint",
      "image_preview_url",
      "final_preview_url",
      "notes",
    ];
    const parts = [];
    preferredKeys.forEach((key) => {
      const value = payload[key];
      if (value !== undefined && value !== null && String(value).trim() !== "") {
        parts.push(`${key}: ${String(value)}`);
      }
    });
    if (parts.length > 0) {
      return parts.slice(0, 3).join(" | ");
    }
    const fallback = Object.entries(payload)
      .slice(0, 2)
      .map(([key, value]) => `${key}: ${String(value)}`)
      .join(" | ");
    return fallback;
  }

  async function requestJSON(url, options = {}) {
    const headers = new Headers(options.headers || {});
    if (options.body && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }
    const response = await fetch(url, {
      ...options,
      headers,
    });

    const text = await response.text();
    let payload = null;
    if (text) {
      try {
        payload = JSON.parse(text);
      } catch (_error) {
        payload = text;
      }
    }

    if (!response.ok) {
      const detail = payload && typeof payload === "object" && payload.detail ? payload.detail : response.statusText;
      throw new Error(detail || `Request failed (${response.status})`);
    }
    return payload;
  }

  function normalizeDashboardError(scope, error) {
    const message = String(error?.message || "").trim();
    if (!message) {
      return `Unable to load ${scope}`;
    }
    return message;
  }

  function isOptionalThemeMissingError(error) {
    const message = String(error?.message || "").trim().toLowerCase();
    return message === "not found" || message.includes("404");
  }

  function buildStartPayload(formValues) {
    return {
      theme_name: String(formValues.theme_name || "Internal Theme").trim(),
      tone_funny_pct: Number(formValues.tone_funny_pct || 20),
      tone_emotion_pct: Number(formValues.tone_emotion_pct || 80),
      tone_style: String(formValues.tone_style || "conversational"),
      audience: String(formValues.audience || "internal reviewer").trim(),
      cultural_context: String(formValues.cultural_context || "global").trim(),
      output_spec: buildOutputSpec(formValues.copy_style, formValues.target_words),
      avoid_cliches: true,
      cards_per_theme: Number(formValues.cards_per_theme || 10),
      notes: String(formValues.notes || "").trim() || null,
      rendering: {
        theme_style: "minimal",
        text_alignment: "center",
        export_size: "1080x1350",
      },
    };
  }

  function resolveStudioCopyStyle(value) {
    const normalized = String(value || "").trim().toLowerCase();
    if (normalized === "witty" || normalized === "playful" || normalized === "heartfelt" || normalized === "minimal") {
      return normalized;
    }
    if (normalized === "short_crisp") {
      return "minimal";
    }
    if (normalized === "warm_note") {
      return "heartfelt";
    }
    if (normalized.includes("play")) {
      return "playful";
    }
    if (normalized.includes("witty") || normalized.includes("humor") || normalized.includes("fun")) {
      return "witty";
    }
    if (
      normalized.includes("heart") ||
      normalized.includes("warm") ||
      normalized.includes("romantic") ||
      normalized.includes("reflect") ||
      normalized.includes("uplift")
    ) {
      return "heartfelt";
    }
    return "minimal";
  }

  function buildFormValuesFromResolvedTheme(theme) {
    if (!theme || typeof theme !== "object") {
      return null;
    }
    return {
      theme_name: String(theme.theme_name || "Internal Theme").trim(),
      audience: String(theme.audience || "internal reviewer").trim(),
      cultural_context: String(theme.cultural_context || "global").trim(),
      tone_style: String(theme.tone_style || "conversational").trim(),
      tone_funny_pct: Number(theme.tone_funny_pct ?? 20),
      tone_emotion_pct: Number(theme.tone_emotion_pct ?? 80),
      copy_style: resolveStudioCopyStyle(theme.tone_style),
      target_words: 14,
    };
  }

  function buildOutputSpec(copyStyle, targetWords) {
    return {
      format: resolveStudioCopyStyle(copyStyle),
      length: { target_words: Number(targetWords || 16) },
      structure: { no_lists: true, no_numbering: true },
    };
  }

  function buildThemeRunDefaults(theme = null) {
    return {
      theme_key: "",
      cards_per_theme: 10,
      notes: "",
      copy_style: resolveStudioCopyStyle(theme?.tone_style || theme?.default_tone_style),
      target_words: 14,
      tone_funny_pct: Number(theme?.tone_funny_pct ?? theme?.default_funny_pct ?? 20),
    };
  }

  function buildThemeRunPayload(formValues) {
    return {
      cards_per_theme: Number(formValues.cards_per_theme || 10),
      notes: String(formValues.notes || "").trim() || null,
      copy_style: resolveStudioCopyStyle(formValues.copy_style),
      target_words: Number(formValues.target_words || 14),
      tone_funny_pct: Number(formValues.tone_funny_pct ?? 20),
    };
  }

  const STUDIO_STYLE_OPTIONS = [
    { value: "witty", label: "witty" },
    { value: "playful", label: "playful" },
    { value: "heartfelt", label: "heartfelt" },
    { value: "minimal", label: "minimal" },
  ];

  function copyStyleLabel(value) {
    const normalized = resolveStudioCopyStyle(value);
    if (normalized === "heartfelt") {
      return "Heartfelt";
    }
    if (normalized === "playful") {
      return "Playful";
    }
    if (normalized === "witty") {
      return "Witty";
    }
    return "Minimal";
  }

  function renderStudioStyleOptions() {
    return STUDIO_STYLE_OPTIONS.map(
      (option) => html`<option key=${option.value} value=${option.value}>${option.label}</option>`,
    );
  }

  function getJobOutputSpec(job) {
    return job && typeof job.output_spec === "object" && job.output_spec !== null ? job.output_spec : {};
  }

  function getStudioState(job) {
    const outputSpec = getJobOutputSpec(job);
    return outputSpec && typeof outputSpec.studio === "object" && outputSpec.studio !== null ? outputSpec.studio : {};
  }

  function isFavoriteJob(job) {
    return Boolean(getStudioState(job).is_favorite);
  }

  async function fetchJobAssets(jobId) {
    const payload = await requestJSON(`/api/jobs/${jobId}/assets`);
    return Array.isArray(payload) ? payload : [];
  }

  async function fetchJobImageAssets(jobId) {
    const payload = await requestJSON(`/api/jobs/${jobId}/image-assets`);
    return payload && typeof payload === "object" ? payload : { candidates: [] };
  }

  async function autoBuildStudioJob(jobId) {
    await requestJSON(`/api/jobs/${jobId}/approve-content`, { method: "POST" });
    const imageAssets = await requestJSON(`/api/jobs/${jobId}/image-assets/generate`, { method: "POST" });
    const firstImageOption = Array.isArray(imageAssets?.candidates) ? imageAssets.candidates[0] : null;
    if (!firstImageOption?.candidate_id) {
      throw new Error("ImageForge returned no image candidates");
    }
    await requestJSON(`/api/jobs/${jobId}/image-assets/${firstImageOption.candidate_id}/select`, { method: "POST" });
    await requestJSON(`/api/jobs/${jobId}/render-final`, { method: "POST" });
    return { imageOptionUsed: true };
  }

  function splitCsv(value) {
    return String(value || "")
      .split(",")
      .map((item) => item.trim())
      .filter(Boolean);
  }

  function formatDateInput(value) {
    if (!value) {
      return "";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "";
    }
    return parsed.toISOString().slice(0, 10);
  }

  function formatDateTimeLocalInput(value) {
    if (!value) {
      return "";
    }
    const parsed = new Date(value);
    if (Number.isNaN(parsed.getTime())) {
      return "";
    }
    const offsetMs = parsed.getTimezoneOffset() * 60 * 1000;
    return new Date(parsed.getTime() - offsetMs).toISOString().slice(0, 16);
  }

  function truncateText(value, maxLength = 140) {
    const text = String(value || "").trim();
    if (!text) {
      return "";
    }
    if (text.length <= maxLength) {
      return text;
    }
    return `${text.slice(0, maxLength - 1).trimEnd()}...`;
  }

  function normalizePreviewUrl(value) {
    return typeof value === "string" ? value.trim() : "";
  }

  function isLikelyImageUrl(value) {
    const url = normalizePreviewUrl(value);
    if (!url) {
      return false;
    }
    if (url.startsWith("data:image/")) {
      return true;
    }
    try {
      const parsed = new URL(url, window.location.origin);
      return /\.(png|jpe?g|webp|gif|svg)$/i.test(parsed.pathname);
    } catch (_error) {
      return false;
    }
  }

  function collectPreviewCandidates(job, assetRows = []) {
    if (!job || typeof job !== "object") {
      return [];
    }

    const candidates = [];
    const seen = new Set();
    const pushCandidate = (label, url, source) => {
      const normalized = normalizePreviewUrl(url);
      if (!normalized || seen.has(normalized) || !isLikelyImageUrl(normalized)) {
        return;
      }
      seen.add(normalized);
      candidates.push({ label, url: normalized, source });
    };

    pushCandidate("Final Preview", job.final_preview_url, "final_preview_url");
    pushCandidate(
      "Final PNG",
      job.final_asset_urls && typeof job.final_asset_urls === "object" ? job.final_asset_urls.png : "",
      "final_asset_urls.png",
    );
    pushCandidate("Image Preview", job.image_preview_url, "image_preview_url");
    pushCandidate("Content Preview", job.content_preview_url, "content_preview_url");

    if (Array.isArray(assetRows)) {
      const assetTypeMap = {
        final_preview: "Final Preview",
        final_png: "Final PNG",
        image_preview: "Image Preview",
        content_preview: "Content Preview",
      };
      assetRows.forEach((asset) => {
        const assetType = String(asset?.asset_type || "").toLowerCase();
        const label = assetTypeMap[assetType];
        if (!label) {
          return;
        }
        pushCandidate(label, asset.public_url || asset.asset_url, `asset:${assetType}`);
      });
    }

    return candidates;
  }

  function usePreviewSelection(candidates) {
    const candidateKey = useMemo(
      () => candidates.map((candidate) => `${candidate.source}:${candidate.url}`).join("|"),
      [candidates],
    );
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
      setActiveIndex(0);
    }, [candidateKey]);

    const currentCandidate = activeIndex < candidates.length ? candidates[activeIndex] : null;
    const exhausted = candidates.length > 0 && activeIndex >= candidates.length;

    function handleError() {
      setActiveIndex((current) => current + 1);
    }

    return { currentCandidate, exhausted, handleError };
  }

  function PreviewVariantCard({ image }) {
    const candidates = useMemo(() => {
      if (!image || !image.url) {
        return [];
      }
      return [{ label: image.label || "Preview", url: image.url, source: image.label || "preview" }];
    }, [image]);
    const { currentCandidate, exhausted, handleError } = usePreviewSelection(candidates);

    return html`
      <article className="image-card">
        ${currentCandidate
          ? html`
              <a href=${currentCandidate.url} target="_blank" rel="noreferrer">
                <img src=${currentCandidate.url} alt=${image.label} loading="lazy" onError=${handleError} />
              </a>
            `
          : html`<p className="empty-state">${exhausted ? "Preview unavailable." : "No preview available yet."}</p>`}
        <p className="image-caption">${image.label}</p>
      </article>
    `;
  }

  function GeneratedECardTile({ job, actionState, onArchive, onDelete }) {
    const previewCandidates = useMemo(() => collectPreviewCandidates(job), [job]);
    const { currentCandidate, exhausted, handleError } = usePreviewSelection(previewCandidates);
    const contentFallback = truncateText(job.content_preview || "Content preview will appear here after generation.", 180);

    return html`
      <article className="ecard-tile">
        <div className="ecard-media">
          ${currentCandidate
            ? html`
                <img
                  src=${currentCandidate.url}
                  alt=${job.theme_name || "Generated eCard"}
                  loading="lazy"
                  onError=${handleError}
                />
              `
            : exhausted
              ? html`
                  <div className="ecard-placeholder">
                    <p className="ecard-placeholder-kicker">Preview Unavailable</p>
                    <p className="ecard-placeholder-copy">The stored preview URL did not load.</p>
                  </div>
                `
            : html`
                <div className="ecard-placeholder">
                  <p className="ecard-placeholder-kicker">Content Preview</p>
                  <p className="ecard-placeholder-copy">${contentFallback}</p>
                </div>
              `}
        </div>
        <div className="ecard-body">
          <div className="ecard-head">
            <div>
              <p className="ecard-theme">${job.theme_name || "Untitled Theme"}</p>
              <p className="ecard-meta">${formatDate(job.created_at)}</p>
            </div>
            <${StatusBadge} value=${job.status} />
          </div>
          <div className="ecard-stage-row">
            <span className="ecard-stage">${humanize(job.current_stage)}</span>
            <span className="ecard-job-id">${job.job_id}</span>
          </div>
          <div className="ecard-actions">
            <${Link} to=${`/jobs/${job.job_id}`} className="button-link">View Details<//>
            ${currentCandidate
              ? html`
                  <a href=${currentCandidate.url} target="_blank" rel="noreferrer" className="button-link">
                    Open Image
                  </a>
                `
              : html`<button type="button" className="button" disabled=${true}>Open Image</button>`}
            <button
              type="button"
              className="button"
              onClick=${() => onArchive(job)}
              disabled=${actionState === `archive:${job.job_id}` || job.status === "archived"}
            >
              ${actionState === `archive:${job.job_id}` ? "Archiving..." : "Archive"}
            </button>
            <button
              type="button"
              className="button danger"
              onClick=${() => onDelete(job)}
              disabled=${actionState === `delete:${job.job_id}`}
            >
              ${actionState === `delete:${job.job_id}` ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      </article>
    `;
  }

  function collectImageOptionAssets(assets = []) {
    return assets
      .filter((asset) => {
        const assetType = String(asset?.asset_type || "").toLowerCase();
        return assetType === "image_option" || assetType === "image_preview";
      })
      .map((asset, index) => {
        const version = String(asset.version || "");
        const [, themeStyle = "", textAlignment = ""] = version.split(":");
        return {
          key: asset.relative_path || asset.public_url || `${asset.asset_type}_${index}`,
          asset_type: asset.asset_type,
          relative_path: asset.relative_path || "",
          url: asset.public_url || asset.asset_url || "",
          theme_style: themeStyle || "minimal",
          text_alignment: textAlignment || "center",
          approved: Boolean(asset.approved),
          created_at: asset.created_at,
        };
      })
      .filter((asset) => asset.url);
  }

  function collectImageAssetCandidates(imageAssets) {
    const candidates = Array.isArray(imageAssets?.candidates) ? imageAssets.candidates : [];
    return candidates
      .map((candidate, index) => ({
        key: candidate.candidate_id || candidate.public_url || `image_candidate_${index}`,
        candidate_id: String(candidate.candidate_id || ""),
        provider: String(candidate.provider || "unknown"),
        model: String(candidate.model || "").trim(),
        candidate_index: Number(candidate.candidate_index || index + 1),
        url: candidate.public_url || "",
        relative_path: candidate.relative_path || "",
        width: candidate.width ?? null,
        height: candidate.height ?? null,
        is_selected: Boolean(candidate.is_selected),
        created_at: candidate.created_at || null,
      }))
      .filter((candidate) => candidate.url);
  }

  function collectFinalCardOptions(job, assets = []) {
    const finalAssetRows = Array.isArray(assets)
      ? assets.filter((asset) => {
          const assetType = String(asset?.asset_type || "").toLowerCase();
          return assetType === "final_preview" || assetType === "final_png";
        })
      : [];
    return collectPreviewCandidates(job, finalAssetRows).map((candidate, index) => ({
      key: `${candidate.source}:${index}`,
      label: candidate.label,
      url: candidate.url,
      source: candidate.source,
    }));
  }

  function getSelectedTextCandidate(job, candidates) {
    const studioState = getStudioState(job);
    const selectedId = Number(studioState.selected_text_candidate_id || 0);
    if (selectedId > 0) {
      const explicit = candidates.find((candidate) => Number(candidate.id) === selectedId);
      if (explicit) {
        return explicit;
      }
    }
    return candidates.find((candidate) => candidate.is_selected) || candidates[0] || null;
  }

  function getSelectedImageOption(job, assets) {
    const studioState = getStudioState(job);
    const selectedRelativePath = String(studioState.selected_image_relative_path || "");
    const imageOptions = collectImageOptionAssets(assets);
    if (selectedRelativePath) {
      const explicit = imageOptions.find((asset) => asset.relative_path === selectedRelativePath);
      if (explicit) {
        return explicit;
      }
    }
    const approved = imageOptions.find((asset) => asset.approved);
    if (approved) {
      return approved;
    }
    return imageOptions.find((asset) => asset.asset_type === "image_preview") || imageOptions[0] || null;
  }

  function getSelectedImageAsset(imageAssets) {
    const candidates = collectImageAssetCandidates(imageAssets);
    const selectedId = String(imageAssets?.selected_image_candidate_id || "");
    if (selectedId) {
      const explicit = candidates.find((candidate) => candidate.candidate_id === selectedId);
      if (explicit) {
        return explicit;
      }
    }
    return candidates.find((candidate) => candidate.is_selected) || candidates[0] || null;
  }

  function formatDimensions(width, height) {
    if (!width || !height) {
      return null;
    }
    return `${width} x ${height}`;
  }

  function statusCategory(job) {
    const status = String(job?.status || "").toLowerCase();
    if (status === "completed") {
      return "completed";
    }
    if (status.includes("reject") || status.includes("timeout") || status.includes("failed")) {
      return "failed";
    }
    if (status === "archived") {
      return "archived";
    }
    return "in_progress";
  }

  function WorkflowConsolePage() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [storage, setStorage] = useState(null);
    const [themeSchedule, setThemeSchedule] = useState([]);
    const [todayTheme, setTodayTheme] = useState(null);
    const [jobsLoading, setJobsLoading] = useState(false);
    const [storageLoading, setStorageLoading] = useState(false);
    const [themeLoading, setThemeLoading] = useState(false);
    const [jobsError, setJobsError] = useState("");
    const [storageError, setStorageError] = useState("");
    const [themeError, setThemeError] = useState("");
    const [themeNotice, setThemeNotice] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [themeRunOpen, setThemeRunOpen] = useState(false);
    const [themeRunMode, setThemeRunMode] = useState("today");
    const [themeCatalog, setThemeCatalog] = useState([]);
    const [creating, setCreating] = useState(false);
    const [creatingThemeJob, setCreatingThemeJob] = useState(false);
    const [cardActionState, setCardActionState] = useState("");
    const [formValues, setFormValues] = useState({
      theme_name: "Internal Launch Sprint",
      audience: "operations team",
      cultural_context: "global",
      tone_style: "conversational",
      tone_funny_pct: 20,
      tone_emotion_pct: 80,
      copy_style: "minimal",
      target_words: 14,
      cards_per_theme: 10,
      notes: "",
    });
    const [themeRunValues, setThemeRunValues] = useState(buildThemeRunDefaults());
    const resolvedTodayTheme = todayTheme && typeof todayTheme === "object" ? todayTheme.theme || null : null;

    const summary = useMemo(() => {
      let active = 0;
      let completed = 0;
      let failed = 0;
      jobs.forEach((job) => {
        const status = String(job.status || "").toLowerCase();
        if (status === "completed") {
          completed += 1;
          return;
        }
        if (status.includes("reject") || status.includes("timeout") || status.includes("failed")) {
          failed += 1;
          return;
        }
        if (status !== "archived") {
          active += 1;
        }
      });
      return { active, completed, failed };
    }, [jobs]);

    const recentCards = useMemo(
      () => jobs
        .filter((job) => job.final_preview_url || (job.final_asset_urls && job.final_asset_urls.png) || job.image_preview_url)
        .slice(0, 6),
      [jobs],
    );
    const inProgressJobs = useMemo(
      () => jobs.filter((job) => {
        const status = String(job.status || "").toLowerCase();
        return status !== "completed" && !status.includes("failed") && !status.includes("reject") && !status.includes("timeout") && status !== "archived";
      }).slice(0, 8),
      [jobs],
    );
    const failedJobs = useMemo(
      () => jobs.filter((job) => {
        const status = String(job.status || "").toLowerCase();
        return status.includes("failed") || status.includes("reject") || status.includes("timeout");
      }).slice(0, 8),
      [jobs],
    );
    const favoriteJobs = useMemo(
      () => jobs.filter((job) => isFavoriteJob(job)).slice(0, 6),
      [jobs],
    );

    async function loadDashboard() {
      setJobsLoading(true);
      setStorageLoading(true);
      setThemeLoading(true);
      setJobsError("");
      setStorageError("");
      setThemeError("");
      setThemeNotice("");

      const [jobsResult, storageResult, scheduleResult, todayResult] = await Promise.allSettled([
        requestJSON("/api/jobs?limit=50"),
        requestJSON("/api/storage/summary"),
        requestJSON("/api/themes/schedule"),
        requestJSON("/api/themes/today"),
      ]);
      let nextThemeNotice = "";

      if (jobsResult.status === "fulfilled") {
        setJobs(Array.isArray(jobsResult.value) ? jobsResult.value : []);
      } else {
        setJobs([]);
        setJobsError(normalizeDashboardError("jobs", jobsResult.reason));
      }

      if (storageResult.status === "fulfilled") {
        setStorage(storageResult.value || null);
      } else {
        setStorage(null);
        setStorageError(normalizeDashboardError("storage summary", storageResult.reason));
      }

      if (scheduleResult.status === "fulfilled") {
        const scheduleRows = Array.isArray(scheduleResult.value)
          ? []
          : Array.isArray(scheduleResult.value?.week_schedule)
            ? scheduleResult.value.week_schedule
            : [];
        setThemeSchedule(scheduleRows);
        if (scheduleRows.length === 0) {
          nextThemeNotice = "Theme schedule not configured yet";
        }
      } else {
        setThemeSchedule([]);
        if (isOptionalThemeMissingError(scheduleResult.reason)) {
          nextThemeNotice = "Theme Factory not configured yet";
        } else {
          setThemeError(normalizeDashboardError("Theme Factory schedule", scheduleResult.reason));
        }
      }

      if (todayResult.status === "fulfilled") {
        setTodayTheme(todayResult.value || null);
        if (!nextThemeNotice && todayResult.value?.resolved === false) {
          nextThemeNotice = todayResult.value?.message || "Theme schedule not configured yet";
        } else if (!nextThemeNotice && !todayResult.value?.theme) {
          nextThemeNotice = "Theme schedule not configured yet";
        }
      } else {
        setTodayTheme(null);
        if (isOptionalThemeMissingError(todayResult.reason)) {
          nextThemeNotice = nextThemeNotice || "Theme schedule not configured yet";
        } else {
          setThemeError(normalizeDashboardError("today's theme", todayResult.reason));
        }
      }
      setThemeNotice(nextThemeNotice);

      setJobsLoading(false);
      setStorageLoading(false);
      setThemeLoading(false);
      const themeScheduleFailure =
        scheduleResult.status !== "fulfilled" && !isOptionalThemeMissingError(scheduleResult.reason);
      const todayThemeFailure =
        todayResult.status !== "fulfilled" && !isOptionalThemeMissingError(todayResult.reason);
      const hasFailures =
        jobsResult.status !== "fulfilled" ||
        storageResult.status !== "fulfilled" ||
        themeScheduleFailure ||
        todayThemeFailure;
      setStatusMessage(
        hasFailures
          ? `Refresh completed with errors at ${new Date().toLocaleTimeString()}`
          : `Refreshed ${new Date().toLocaleTimeString()}`,
      );
    }

    useEffect(() => {
      loadDashboard();
    }, []);

    async function handleCreateJob(event) {
      event.preventDefault();
      setCreating(true);
      setJobsError("");
      try {
        const payload = buildStartPayload(formValues);
        const created = await requestJSON("/api/jobs/start", {
          method: "POST",
          body: JSON.stringify(payload),
        });
        setCreateOpen(false);
        try {
          await autoBuildStudioJob(created.job_id);
          setStatusMessage(`Created ${created.job_id} and built initial card options`);
        } catch (autoBuildError) {
          setStatusMessage(`Created ${created.job_id}. Studio follow-up is needed: ${autoBuildError.message || "auto-build failed"}`);
        }
        await loadDashboard();
        navigate(`/studio/${created.job_id}`);
      } catch (requestError) {
        setJobsError(requestError.message || "Unable to create new job");
      } finally {
        setCreating(false);
      }
    }

    function updateField(key, value) {
      setFormValues((current) => ({ ...current, [key]: value }));
    }

    function applyTodayThemeToForm() {
      const nextValues = buildFormValuesFromResolvedTheme(resolvedTodayTheme);
      if (!nextValues) {
        return;
      }
      setFormValues((current) => ({ ...current, ...nextValues }));
    }

    async function ensureThemeCatalogLoaded() {
      if (themeCatalog.length > 0) {
        return themeCatalog;
      }
      const payload = await requestJSON("/api/themes");
      const items = Array.isArray(payload) ? payload : [];
      setThemeCatalog(items);
      return items;
    }

    async function openThemeRunModal(mode) {
      setThemeRunMode(mode);
      setThemeError("");
      setThemeRunValues(buildThemeRunDefaults(resolvedTodayTheme));
      if (mode === "manual") {
        try {
          const items = await ensureThemeCatalogLoaded();
          const firstTheme = items[0] || null;
          setThemeRunValues({
            ...buildThemeRunDefaults(firstTheme),
            theme_key: firstTheme?.theme_key || "",
          });
          setThemeRunOpen(true);
        } catch (requestError) {
          setThemeError(requestError.message || "Unable to load theme catalog");
        }
        return;
      }
      setThemeRunOpen(true);
    }

    async function handleSubmitThemeRun(event) {
      event.preventDefault();
      setCreatingThemeJob(true);
      setThemeError("");
      try {
        const basePayload = buildThemeRunPayload(themeRunValues);
        const created = themeRunMode === "manual"
          ? await requestJSON("/api/jobs/start-from-theme", {
              method: "POST",
              body: JSON.stringify({
                theme_key: themeRunValues.theme_key,
                ...basePayload,
              }),
            })
          : await requestJSON("/api/jobs/create-daily-theme-job", {
              method: "POST",
              body: JSON.stringify(basePayload),
            });
        setThemeRunOpen(false);
        try {
          await autoBuildStudioJob(created.job_id);
          setStatusMessage(
            themeRunMode === "manual"
              ? `Created ${created.job_id} from ${themeRunValues.theme_key} and built initial card options`
              : `Created ${created.job_id} from today's theme and built initial card options`,
          );
        } catch (autoBuildError) {
          setStatusMessage(
            themeRunMode === "manual"
              ? `Created ${created.job_id} from ${themeRunValues.theme_key}. Studio follow-up is needed: ${autoBuildError.message || "auto-build failed"}`
              : `Created ${created.job_id} from today's theme. Studio follow-up is needed: ${autoBuildError.message || "auto-build failed"}`,
          );
        }
        await loadDashboard();
        navigate(`/studio/${created.job_id}`);
      } catch (requestError) {
        setThemeError(
          requestError.message || (themeRunMode === "manual" ? "Unable to create theme job" : "Unable to create today's themed job"),
        );
      } finally {
        setCreatingThemeJob(false);
      }
    }

    function handleThemeSelectionChange(themeKey) {
      const selectedTheme = themeCatalog.find((theme) => theme.theme_key === themeKey);
      setThemeRunValues((current) => ({
        ...current,
        theme_key: themeKey,
        tone_funny_pct: Number(selectedTheme?.default_funny_pct ?? current.tone_funny_pct ?? 20),
      }));
    }

    async function handleArchiveJob(job) {
      setCardActionState(`archive:${job.job_id}`);
      setJobsError("");
      try {
        await requestJSON(`/api/jobs/${job.job_id}/archive`, { method: "POST" });
        setStatusMessage(`Archived ${job.job_id}`);
        await loadDashboard();
      } catch (requestError) {
        setJobsError(requestError.message || "Unable to archive job");
      } finally {
        setCardActionState("");
      }
    }

    async function handleDeleteJob(job) {
      const confirmed = window.confirm(`Delete ${job.job_id} and associated files?`);
      if (!confirmed) {
        return;
      }

      setCardActionState(`delete:${job.job_id}`);
      setJobsError("");
      try {
        await requestJSON(`/api/jobs/${job.job_id}`, { method: "DELETE" });
        setStatusMessage(`Deleted ${job.job_id}`);
        await loadDashboard();
      } catch (requestError) {
        setJobsError(requestError.message || "Unable to delete job");
      } finally {
        setCardActionState("");
      }
    }

    return html`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Home</p>
            <h1 className="page-title">eCard Studio Home</h1>
            <p className="page-description">
              Card-first controls for today's theme, manual theme runs, and recent eCard output.
            </p>
          </div>
          <div className="inline-actions">
            <button
              type="button"
              className="button primary"
              onClick=${() => openThemeRunModal("today")}
              disabled=${creatingThemeJob || themeLoading || !resolvedTodayTheme}
            >
              Generate Today's Cards
            </button>
            <button type="button" className="button" onClick=${() => openThemeRunModal("manual")}>Generate From Theme</button>
            <button type="button" className="button" onClick=${() => setCreateOpen(true)}>Create New Card Job</button>
            <button
              type="button"
              className="button"
              onClick=${loadDashboard}
              disabled=${jobsLoading || storageLoading || themeLoading}
            >
              Refresh
            </button>
          </div>
        </header>

        ${statusMessage ? html`<p className="status-line">${statusMessage}</p>` : null}

        ${(jobsLoading || storageLoading || themeLoading || jobsError || storageError || themeError)
          ? html`
              <div className="status-stack">
                ${jobsLoading
                  ? html`<div className="status-panel warning">Loading jobs from /api/jobs...</div>`
                  : null}
                ${storageLoading
                  ? html`<div className="status-panel warning">Loading storage summary from /api/storage/summary...</div>`
                  : null}
                ${themeLoading
                  ? html`<div className="status-panel warning">Loading Theme Factory data from /api/themes/schedule...</div>`
                  : null}
                ${jobsError ? html`<div className="status-panel error">Unable to load jobs: ${jobsError}</div>` : null}
                ${storageError
                  ? html`<div className="status-panel error">Unable to load storage summary: ${storageError}</div>`
                  : null}
                ${themeError ? html`<div className="status-panel error">Theme error: ${themeError}</div>` : null}
              </div>
            `
          : null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Today's Theme</p>
            <p className="summary-value summary-value-small">${resolvedTodayTheme ? resolvedTodayTheme.theme_name : "Unavailable"}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">In Progress</p>
            <p className="summary-value">${jobsLoading ? "..." : inProgressJobs.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Failed Jobs</p>
            <p className="summary-value">${jobsLoading ? "..." : failedJobs.length}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Favorite Cards</p>
            <p className="summary-value">${jobsLoading ? "..." : favoriteJobs.length}</p>
          </article>
        </section>

        <section className="section-panel home-hero">
          <div className="section-head">
            <div>
              <h2 className="section-title">Today's Theme</h2>
              <p className="section-copy">
                ${resolvedTodayTheme
                  ? `${resolvedTodayTheme.theme_name} | ${copyStyleLabel("minimal")} card flow with ${humanize(todayTheme?.weekday)} scheduling`
                  : themeNotice || "Theme schedule not configured yet."}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${() => openThemeRunModal("today")}
                disabled=${creatingThemeJob || themeLoading || !resolvedTodayTheme}
              >
                ${creatingThemeJob && themeRunMode === "today" ? "Generating..." : "Generate Today's Cards"}
              </button>
              <button type="button" className="button" onClick=${() => openThemeRunModal("manual")}>Generate From Theme</button>
              <button type="button" className="button" onClick=${() => setCreateOpen(true)}>Create New Card Job</button>
            </div>
          </div>
          ${resolvedTodayTheme
            ? html`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">theme_name</p>
                    <p className="key-value">${resolvedTodayTheme.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">bucket</p>
                    <p className="key-value">${themeBucketLabel(resolvedTodayTheme.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">tone_style</p>
                    <p className="key-value">${resolvedTodayTheme.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">audience</p>
                    <p className="key-value">${resolvedTodayTheme.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">default run</p>
                    <p className="key-value">10 cards | 8-18 words</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">storage</p>
                    <p className="key-value">${storageLoading ? "..." : storage ? formatBytes(storage.total_bytes) : "Unavailable"}</p>
                  </article>
                </div>
              `
            : html`<p className="empty-state">Theme schedule not configured yet.</p>`}
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Recent eCards</h2>
              <p className="section-copy">The most recent visual card outputs. Open Studio to tweak text, image, or final card direction.</p>
            </div>
            <${Link} to="/studio" className="button-link">Open Studio<//>
          </div>
          ${jobsLoading
            ? html`<p className="empty-state">Loading recent eCards...</p>`
            : recentCards.length === 0
              ? html`<p className="empty-state">No rendered cards yet. Generate today's cards or run a theme manually.</p>`
              : html`
                  <div className="ecard-grid">
                    ${recentCards.map(
                      (job) => html`
                        <${GeneratedECardTile}
                          key=${job.job_id}
                          job=${job}
                          actionState=${cardActionState}
                          onArchive=${handleArchiveJob}
                          onDelete=${handleDeleteJob}
                        />
                      `,
                    )}
                  </div>
                `}
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Favorite Cards</h2>
              <p className="section-copy">Cards you marked for quick access and reuse.</p>
            </div>
          </div>
          ${favoriteJobs.length === 0
            ? html`<p className="empty-state">No favorite cards yet. Mark a final card from Studio.</p>`
            : html`
                <div className="ecard-grid">
                  ${favoriteJobs.map(
                    (job) => html`
                      <${GeneratedECardTile}
                        key=${job.job_id}
                        job=${job}
                        actionState=${cardActionState}
                        onArchive=${handleArchiveJob}
                        onDelete=${handleDeleteJob}
                      />
                    `,
                  )}
                </div>
              `}
        </section>

        <section className="two-column">
          <section className="section-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">In Progress Jobs</h2>
                <p className="section-copy">Jobs still moving through card generation or waiting for operator intervention.</p>
              </div>
              <${Link} to="/jobs" className="button-link">All Jobs<//>
            </div>
            ${inProgressJobs.length === 0
              ? html`<p className="empty-state">No jobs in progress.</p>`
              : html`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>job_id</th>
                          <th>theme</th>
                          <th>status</th>
                          <th>updated</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${inProgressJobs.map(
                          (job) => html`
                            <tr key=${job.job_id}>
                              <td><${Link} className="job-link" to=${`/studio/${job.job_id}`}>${job.job_id}<//></td>
                              <td>${job.theme_name}</td>
                              <td><${StatusBadge} value=${job.status} /></td>
                              <td>${formatDate(job.updated_at)}</td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>

          <section className="section-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">Failed Jobs</h2>
                <p className="section-copy">Jobs that need a rerun from text, image, or final card generation.</p>
              </div>
            </div>
            ${failedJobs.length === 0
              ? html`<p className="empty-state">No failed jobs.</p>`
              : html`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>job_id</th>
                          <th>theme</th>
                          <th>status</th>
                          <th>last_error</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${failedJobs.map(
                          (job) => html`
                            <tr key=${job.job_id}>
                              <td><${Link} className="job-link" to=${`/studio/${job.job_id}`}>${job.job_id}<//></td>
                              <td>${job.theme_name}</td>
                              <td><${StatusBadge} value=${job.status} /></td>
                              <td>${truncateText(job.last_error_message || "-", 80)}</td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>
        </section>

        ${createOpen
          ? html`
              <div className="modal-backdrop" onClick=${() => setCreateOpen(false)}>
                <section className="modal" onClick=${(event) => event.stopPropagation()}>
                  <h2 className="section-title">Create New Card Job</h2>
                  <p className="section-copy">Starts a new card run with short, crisp copy defaults and opens Studio.</p>
                  <form onSubmit=${handleCreateJob}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="themeName">Theme Name</label>
                        <input
                          id="themeName"
                          value=${formValues.theme_name}
                          onInput=${(event) => updateField("theme_name", event.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="audience">Audience</label>
                        <input
                          id="audience"
                          value=${formValues.audience}
                          onInput=${(event) => updateField("audience", event.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="culturalContext">Cultural Context</label>
                        <input
                          id="culturalContext"
                          value=${formValues.cultural_context}
                          onInput=${(event) => updateField("cultural_context", event.target.value)}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="toneStyle">Tone Style</label>
                        <select
                          id="toneStyle"
                          value=${formValues.tone_style}
                          onChange=${(event) => updateField("tone_style", event.target.value)}
                        >
                          <option value="conversational">conversational</option>
                          <option value="minimal">minimal</option>
                          <option value="poetic">poetic</option>
                          <option value="witty">witty</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="funnyPct">Funny %</label>
                        <input
                          id="funnyPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${formValues.tone_funny_pct}
                          onInput=${(event) => updateField("tone_funny_pct", event.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="emotionPct">Emotion %</label>
                        <input
                          id="emotionPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${formValues.tone_emotion_pct}
                          onInput=${(event) => updateField("tone_emotion_pct", event.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="copyStyle">Copy Style</label>
                        <select
                          id="copyStyle"
                          value=${formValues.copy_style}
                          onChange=${(event) => updateField("copy_style", event.target.value)}
                        >
                          ${renderStudioStyleOptions()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="targetWords">Target Words</label>
                        <input
                          id="targetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${formValues.target_words}
                          onInput=${(event) => updateField("target_words", event.target.value)}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="cardsPerTheme">Cards Per Theme</label>
                        <input
                          id="cardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${formValues.cards_per_theme}
                          onInput=${(event) => updateField("cards_per_theme", event.target.value)}
                        />
                      </div>
                      <div className="form-field full">
                        <p className="form-helper">Defaults target short one-line card copy. Use witty or playful for humor, heartfelt for emotional greetings.</p>
                      </div>
                      <div className="form-field full">
                        <label htmlFor="jobNotes">Notes</label>
                        <textarea
                          id="jobNotes"
                          rows="3"
                          value=${formValues.notes}
                          onInput=${(event) => updateField("notes", event.target.value)}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{ marginTop: "12px" }}>
                      <button
                        type="button"
                        className="button"
                        onClick=${applyTodayThemeToForm}
                        disabled=${!resolvedTodayTheme}
                      >
                        Use Today's Theme
                      </button>
                      <button type="submit" className="button primary" disabled=${creating}>
                        ${creating ? "Creating..." : "Create Job"}
                      </button>
                      <button type="button" className="button" onClick=${() => setCreateOpen(false)}>
                        Cancel
                      </button>
                    </div>
                  </form>
                </section>
              </div>
            `
          : null}

        ${themeRunOpen
          ? html`
              <div className="modal-backdrop" onClick=${() => setThemeRunOpen(false)}>
                <section className="modal" onClick=${(event) => event.stopPropagation()}>
                  <h2 className="section-title">${themeRunMode === "manual" ? "Generate From Theme" : "Use Today's Theme"}</h2>
                  <p className="section-copy">
                    ${themeRunMode === "manual"
                      ? "Start a workflow job from any selected Theme Factory record."
                      : resolvedTodayTheme
                        ? `Resolved theme: ${resolvedTodayTheme.theme_name}`
                        : "Use today's resolved theme."}
                  </p>
                  <form onSubmit=${handleSubmitThemeRun}>
                    <div className="form-grid">
                      ${themeRunMode === "manual"
                        ? html`
                            <div className="form-field full">
                              <label htmlFor="runThemeKey">Theme</label>
                              <select
                                id="runThemeKey"
                                value=${themeRunValues.theme_key}
                                onChange=${(event) => handleThemeSelectionChange(event.target.value)}
                                required
                              >
                                ${themeCatalog.map((theme) => html`<option key=${theme.id} value=${theme.theme_key}>${theme.theme_name}</option>`)}
                              </select>
                            </div>
                          `
                        : null}
                      <div className="form-field">
                        <label htmlFor="runCopyStyle">Copy Style</label>
                        <select
                          id="runCopyStyle"
                          value=${themeRunValues.copy_style}
                          onChange=${(event) => setThemeRunValues((current) => ({ ...current, copy_style: event.target.value }))}
                        >
                          ${renderStudioStyleOptions()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="runTargetWords">Target Words</label>
                        <input
                          id="runTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${themeRunValues.target_words}
                          onInput=${(event) => setThemeRunValues((current) => ({ ...current, target_words: event.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="runFunnyPct">Funny %</label>
                        <input
                          id="runFunnyPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${themeRunValues.tone_funny_pct}
                          onInput=${(event) => setThemeRunValues((current) => ({ ...current, tone_funny_pct: event.target.value }))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="runCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="runCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${themeRunValues.cards_per_theme}
                          onInput=${(event) => setThemeRunValues((current) => ({ ...current, cards_per_theme: event.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-field full">
                        <p className="form-helper">This starts a real card job from the selected theme and opens Studio for text, image, and final card control.</p>
                      </div>
                      <div className="form-field full">
                        <label htmlFor="runThemeNotes">Notes</label>
                        <textarea
                          id="runThemeNotes"
                          rows="3"
                          value=${themeRunValues.notes}
                          onInput=${(event) => setThemeRunValues((current) => ({ ...current, notes: event.target.value }))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{ marginTop: "12px" }}>
                      <button type="submit" className="button primary" disabled=${creatingThemeJob}>
                        ${creatingThemeJob ? "Creating..." : themeRunMode === "manual" ? "Generate From Theme" : "Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${() => setThemeRunOpen(false)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `
          : null}
      </section>
    `;
  }

  function JobDetailPage() {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [job, setJob] = useState(null);
    const [assets, setAssets] = useState([]);
    const [events, setEvents] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [shortlist, setShortlist] = useState([]);
    const [shortlistSelection, setShortlistSelection] = useState([]);
    const [loading, setLoading] = useState(false);
    const [workingAction, setWorkingAction] = useState("");
    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");

    const loadJobDetail = useCallback(async (options = {}) => {
      if (!jobId) {
        return;
      }
      const quiet = Boolean(options.quiet);
      if (!quiet) {
        setLoading(true);
      }
      setError("");
      try {
        const [jobPayload, assetPayload, eventPayload, candidatePayload, shortlistPayload] = await Promise.all([
          requestJSON(`/api/jobs/${jobId}`),
          requestJSON(`/api/jobs/${jobId}/assets`),
          requestJSON(`/api/jobs/${jobId}/events`),
          requestJSON(`/api/jobs/${jobId}/candidates`),
          requestJSON(`/api/jobs/${jobId}/shortlist`),
        ]);
        setJob(jobPayload || null);
        setAssets(Array.isArray(assetPayload) ? assetPayload : []);
        setEvents(Array.isArray(eventPayload) ? eventPayload : []);
        const nextCandidates = Array.isArray(candidatePayload) ? candidatePayload : [];
        const nextShortlist = Array.isArray(shortlistPayload) ? shortlistPayload : [];
        setCandidates(nextCandidates);
        setShortlist(nextShortlist);
        const selectedIds = nextShortlist
          .filter((entry) => entry.is_selected)
          .map((entry) => Number(entry.candidate_id))
          .filter((value) => Number.isInteger(value));
        setShortlistSelection(
          selectedIds.length > 0
            ? selectedIds
            : nextShortlist[0]
              ? [Number(nextShortlist[0].candidate_id)]
              : [],
        );
      } catch (requestError) {
        setError(requestError.message || "Unable to load job detail");
      } finally {
        if (!quiet) {
          setLoading(false);
        }
      }
    }, [jobId]);

    useEffect(() => {
      loadJobDetail();
    }, [loadJobDetail]);

    useEffect(() => {
      if (!jobId) {
        return undefined;
      }
      const intervalId = window.setInterval(() => {
        if (document.visibilityState === "visible") {
          loadJobDetail({ quiet: true });
        }
      }, 10000);
      return () => window.clearInterval(intervalId);
    }, [jobId, loadJobDetail]);

    const stageBreakdown = useMemo(() => {
      if (!job) {
        return [];
      }
      const status = String(job.status || "").toLowerCase();
      const contentGenerationStatus =
        job.content_preview ? "completed" : status.startsWith("content") ? "in_progress" : "pending";
      const imageGenerationStatus =
        job.image_preview_url || status.startsWith("final") || status === "completed"
          ? "completed"
          : status.startsWith("image")
            ? "in_progress"
            : "pending";
      const finalRenderStatus =
        job.final_asset_urls && (job.final_asset_urls.png || job.final_asset_urls.pdf)
          ? "completed"
          : status.startsWith("final")
            ? "in_progress"
            : status === "completed"
              ? "completed"
              : "pending";

      return [
        { label: "content_generation_status", value: contentGenerationStatus },
        { label: "content_approval_status", value: job.content_approval_status || "pending" },
        { label: "image_generation_status", value: imageGenerationStatus },
        { label: "image_approval_status", value: job.image_approval_status || "pending" },
        { label: "final_render_status", value: finalRenderStatus },
        { label: "final_approval_status", value: job.final_approval_status || "pending" },
      ];
    }, [job]);

    const previewImages = useMemo(() => {
      if (!job) {
        return [];
      }
      return collectPreviewCandidates(job, assets);
    }, [job, assets]);

    const finalPreviewSelection = usePreviewSelection(previewImages);
    const imagePreviewCandidates = useMemo(() => {
      if (!job) {
        return [];
      }
      return collectPreviewCandidates(
        {
          image_preview_url: job.image_preview_url,
          content_preview_url: job.content_preview_url,
        },
        assets.filter((asset) => String(asset?.asset_type || "").toLowerCase() === "image_preview"),
      );
    }, [job, assets]);
    const imagePreviewSelection = usePreviewSelection(imagePreviewCandidates);
    const shortlistPreviewImages = useMemo(
      () => assets
        .filter((asset) => String(asset?.asset_type || "").toLowerCase() === "shortlist_preview")
        .map((asset, index) => ({
          label: `Shortlist Preview ${index + 1}`,
          url: asset.public_url || asset.asset_url,
          source: `shortlist_preview:${index}`,
        }))
        .filter((entry) => entry.url),
      [assets],
    );

    async function handleStageAction(actionKey, endpoint, successMessage) {
      if (!jobId) {
        return;
      }
      setWorkingAction(actionKey);
      setError("");
      try {
        const payload = await requestJSON(endpoint, { method: "POST" });
        setStatusMessage(successMessage || `${payload.job_id} updated`);
        await loadJobDetail();
      } catch (requestError) {
        setError(requestError.message || "Unable to update stage");
      } finally {
        setWorkingAction("");
      }
    }

    function toggleShortlistSelection(candidateId, checked) {
      setShortlistSelection((current) => {
        const next = new Set(current);
        if (checked) {
          next.add(candidateId);
        } else {
          next.delete(candidateId);
        }
        return Array.from(next);
      });
    }

    async function handleRenderShortlist() {
      if (!jobId) {
        return;
      }
      setWorkingAction("render-shortlist");
      setError("");
      try {
        const payload = await requestJSON(`/api/jobs/${jobId}/render-shortlist`, {
          method: "POST",
          body: JSON.stringify({ candidate_ids: shortlistSelection }),
        });
        setStatusMessage(`Rendered ${payload.rendered_count} shortlist preview card(s)`);
        await loadJobDetail();
      } catch (requestError) {
        setError(requestError.message || "Unable to render shortlist");
      } finally {
        setWorkingAction("");
      }
    }

    async function handleArchive() {
      if (!jobId) {
        return;
      }
      setWorkingAction("archive");
      setError("");
      try {
        const payload = await requestJSON(`/api/jobs/${jobId}/archive`, { method: "POST" });
        setStatusMessage(`Job archived (${formatDate(payload.updated_at)})`);
        await loadJobDetail();
      } catch (requestError) {
        setError(requestError.message || "Unable to archive job");
      } finally {
        setWorkingAction("");
      }
    }

    async function handleDelete() {
      if (!jobId) {
        return;
      }
      const confirmed = window.confirm(`Delete ${jobId} and associated files?`);
      if (!confirmed) {
        return;
      }
      setWorkingAction("delete");
      setError("");
      try {
        await requestJSON(`/api/jobs/${jobId}`, { method: "DELETE" });
        navigate("/");
      } catch (requestError) {
        setError(requestError.message || "Unable to delete job");
      } finally {
        setWorkingAction("");
      }
    }

    return html`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Jobs</p>
            <h1 className="page-title">Job Detail</h1>
            <p className="page-description">${jobId || "-"}</p>
          </div>
          <div className="inline-actions">
            <button className="button" type="button" onClick=${loadJobDetail} disabled=${loading}>Refresh</button>
            <button
              className="button"
              type="button"
              onClick=${handleArchive}
              disabled=${workingAction === "archive"}
            >
              ${workingAction === "archive" ? "Archiving..." : "Archive Job"}
            </button>
            <button
              className="button danger"
              type="button"
              onClick=${handleDelete}
              disabled=${workingAction === "delete"}
            >
              ${workingAction === "delete" ? "Deleting..." : "Delete Job + Files"}
            </button>
          </div>
        </header>

        ${error ? html`<p className="status-line error">${error}</p>` : null}
        ${statusMessage ? html`<p className="status-line">${statusMessage}</p>` : null}
        ${job?.last_error_message ? html`<div className="status-panel error">Last stage error: ${job.last_error_message}</div>` : null}

        ${job
          ? html`
              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Card Snapshot</h2>
                    <p className="section-copy">The selected text, selected image, and latest final card preview for this job.</p>
                  </div>
                  <div className="inline-actions">
                    <${Link} to=${`/studio/${jobId}`} className="button-link">Open Studio<//>
                    <button
                      type="button"
                      className="button"
                      onClick=${() => handleStageAction("rerun-content", `/api/jobs/${jobId}/rerun/content`, `Text rerun for ${jobId}`)}
                      disabled=${workingAction === "rerun-content"}
                    >
                      ${workingAction === "rerun-content" ? "Working..." : "Regenerate Text"}
                    </button>
                    <button
                      type="button"
                      className="button"
                      onClick=${() => handleStageAction("rerun-image", `/api/jobs/${jobId}/rerun/image`, `Image rerun for ${jobId}`)}
                      disabled=${workingAction === "rerun-image"}
                    >
                      ${workingAction === "rerun-image" ? "Working..." : "Regenerate Image"}
                    </button>
                    <button
                      type="button"
                      className="button primary"
                      onClick=${() => handleStageAction("rerun-card", `/api/jobs/${jobId}/rerun/final-render`, `Card rerun for ${jobId}`)}
                      disabled=${workingAction === "rerun-card"}
                    >
                      ${workingAction === "rerun-card" ? "Working..." : "Regenerate Card"}
                    </button>
                  </div>
                </div>
                <div className="studio-current-grid">
                  <article className="key-card">
                    <p className="key-label">selected text</p>
                    <p className="studio-current-copy">${job.content_preview || "No text selected yet."}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">selected image</p>
                    ${imagePreviewSelection.currentCandidate
                      ? html`<img className="studio-current-image" src=${imagePreviewSelection.currentCandidate.url} alt="Selected image" loading="lazy" onError=${imagePreviewSelection.handleError} />`
                      : html`<p className="empty-state compact">No image selected yet.</p>`}
                  </article>
                  <article className="key-card">
                    <p className="key-label">final card preview</p>
                    ${finalPreviewSelection.currentCandidate
                      ? html`<img className="studio-current-image" src=${finalPreviewSelection.currentCandidate.url} alt="Final card preview" loading="lazy" onError=${finalPreviewSelection.handleError} />`
                      : html`<p className="empty-state compact">No final card rendered yet.</p>`}
                  </article>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Stage and Status Breakdown</h2>
                    <p className="section-copy">Workflow state remains available here, but Studio is the primary operator surface.</p>
                  </div>
                  <${StatusBadge} value=${job.status} />
                </div>
                <div className="key-value-grid">
                  ${stageBreakdown.map(
                    (entry) => html`
                      <article className="key-card" key=${entry.label}>
                        <p className="key-label">${entry.label}</p>
                        <p className="key-value"><${StatusBadge} value=${entry.value} /></p>
                      </article>
                    `,
                  )}
                </div>
                <div className="key-value-grid job-meta-grid">
                  <article className="key-card">
                    <p className="key-label">cards_per_theme</p>
                    <p className="key-value">${job.cards_per_theme || 10}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">retry_count</p>
                    <p className="key-value">${job.retry_count || 0}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">last_stage_started_at</p>
                    <p className="key-value">${formatDate(job.last_stage_started_at)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">last_stage_finished_at</p>
                    <p className="key-value">${formatDate(job.last_stage_finished_at)}</p>
                  </article>
                </div>
                ${job.operator_notes
                  ? html`
                      <div className="status-panel neutral">Operator notes: ${job.operator_notes}</div>
                    `
                  : null}
                <div className="status-stack padded-status-stack">
                  <div className="status-panel neutral">
                    Review order: approve the exact message text first, then generate and approve the image, then render and approve the final card.
                  </div>
                  <div className="status-panel neutral">
                    This page refreshes automatically every 10 seconds while it stays open.
                  </div>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Content Review</h2>
                    <p className="section-copy">Approval is secondary here. The primary action is to rerun text if the card copy is not right.</p>
                  </div>
                  <${StatusBadge} value=${job.content_approval_status || "pending"} />
                </div>
                ${job.content_preview
                  ? html`<div className="content-preview-block">${job.content_preview}</div>`
                  : html`<p className="empty-state">No content preview stored yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${() => handleStageAction("regenerate-content", `/api/jobs/${jobId}/regenerate-content`, `Content regenerated for ${jobId}`)}
                    disabled=${workingAction === "regenerate-content"}
                  >
                    ${workingAction === "regenerate-content" ? "Working..." : "Regenerate Text"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${() => handleStageAction("approve-content", `/api/jobs/${jobId}/approve-content`, `Content approved for ${jobId}`)}
                    disabled=${workingAction === "approve-content" || !job.content_preview}
                  >
                    ${workingAction === "approve-content" ? "Working..." : "Approve Content"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${() => handleStageAction("reject-content", `/api/jobs/${jobId}/reject-content`, `Content rejected for ${jobId}`)}
                    disabled=${workingAction === "reject-content" || !job.content_preview}
                  >
                    ${workingAction === "reject-content" ? "Working..." : "Reject Content"}
                  </button>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Image Review</h2>
                    <p className="section-copy">The main control here is to generate or rerun the image. Approval buttons remain available as operator overrides.</p>
                  </div>
                  <${StatusBadge} value=${job.image_approval_status || "pending"} />
                </div>
                ${imagePreviewSelection.currentCandidate
                  ? html`
                      <div className="image-grid image-grid-single">
                        <article className="image-card">
                          <a href=${imagePreviewSelection.currentCandidate.url} target="_blank" rel="noreferrer">
                            <img
                              src=${imagePreviewSelection.currentCandidate.url}
                              alt="Image Preview"
                              loading="lazy"
                              onError=${imagePreviewSelection.handleError}
                            />
                          </a>
                          <p className="image-caption">Image Preview</p>
                        </article>
                      </div>
                    `
                  : imagePreviewSelection.exhausted
                    ? html`<p className="empty-state">Preview unavailable.</p>`
                    : html`<p className="empty-state">No image preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${() => handleStageAction("generate-image", `/api/jobs/${jobId}/generate-image`, `Image generated for ${jobId}`)}
                    disabled=${workingAction === "generate-image" || job.content_approval_status !== "approved"}
                  >
                    ${workingAction === "generate-image" ? "Working..." : "Generate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${() => handleStageAction("regenerate-image", `/api/jobs/${jobId}/regenerate-image`, `Image regenerated for ${jobId}`)}
                    disabled=${workingAction === "regenerate-image" || job.content_approval_status !== "approved"}
                  >
                    ${workingAction === "regenerate-image" ? "Working..." : "Regenerate Image"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${() => handleStageAction("approve-image", `/api/jobs/${jobId}/approve-image`, `Image approved for ${jobId}`)}
                    disabled=${workingAction === "approve-image" || !job.image_preview_url}
                  >
                    ${workingAction === "approve-image" ? "Working..." : "Approve Image"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${() => handleStageAction("reject-image", `/api/jobs/${jobId}/reject-image`, `Image rejected for ${jobId}`)}
                    disabled=${workingAction === "reject-image" || !job.image_preview_url}
                  >
                    ${workingAction === "reject-image" ? "Working..." : "Reject Image"}
                  </button>
                </div>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Final Card Review</h2>
                    <p className="section-copy">Use rerun when the card layout or polish is off. Approval stays available below as a secondary control.</p>
                  </div>
                  <${StatusBadge} value=${job.final_approval_status || "pending"} />
                </div>
                ${finalPreviewSelection.currentCandidate
                  ? html`
                      <div className="hero-preview">
                        <a href=${finalPreviewSelection.currentCandidate.url} target="_blank" rel="noreferrer">
                          <img
                            src=${finalPreviewSelection.currentCandidate.url}
                            alt=${job.theme_name || "Generated eCard"}
                            loading="lazy"
                            onError=${finalPreviewSelection.handleError}
                          />
                        </a>
                      </div>
                    `
                  : finalPreviewSelection.exhausted
                    ? html`<p className="empty-state">Preview unavailable.</p>`
                    : html`<p className="empty-state">No final card preview available yet.</p>`}
                <div className="inline-actions padded-actions">
                  <button
                    type="button"
                    className="button primary"
                    onClick=${() => handleStageAction("render-final", `/api/jobs/${jobId}/render-final`, `Final rendered for ${jobId}`)}
                    disabled=${workingAction === "render-final" || job.image_approval_status !== "approved"}
                  >
                    ${workingAction === "render-final" ? "Working..." : "Regenerate Card"}
                  </button>
                  <button
                    type="button"
                    className="button"
                    onClick=${() => handleStageAction("approve-final", `/api/jobs/${jobId}/approve-final`, `Final approved for ${jobId}`)}
                    disabled=${workingAction === "approve-final" || !job.final_preview_url}
                  >
                    ${workingAction === "approve-final" ? "Working..." : "Approve Final"}
                  </button>
                  <button
                    type="button"
                    className="button danger"
                    onClick=${() => handleStageAction("reject-final", `/api/jobs/${jobId}/reject-final`, `Final rejected for ${jobId}`)}
                    disabled=${workingAction === "reject-final" || !job.final_preview_url}
                  >
                    ${workingAction === "reject-final" ? "Working..." : "Reject Final"}
                  </button>
                </div>
              </section>

              <section className="two-column">
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Lifecycle Events</h2>
                      <p className="section-copy">Audit timeline from /api/jobs/${jobId}/events.</p>
                    </div>
                  </div>
                  ${events.length === 0
                    ? html`<p className="empty-state">No lifecycle events found.</p>`
                    : html`
                        <ul className="list-simple">
                          ${events
                            .slice()
                            .reverse()
                            .map(
                              (event, index) => html`
                                <li key=${`${event.event_type}_${index}`} className="list-item">
                                  <p className="event-type">${event.event_type}</p>
                                  <p className="event-meta">${formatDate(event.created_at)}</p>
                                  ${summarizePayload(event.event_payload_json)
                                    ? html`<p className="event-meta">${summarizePayload(event.event_payload_json)}</p>`
                                    : null}
                                </li>
                              `,
                            )}
                        </ul>
                      `}
                </section>

                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Saved Assets</h2>
                      <p className="section-copy">Persisted file paths, URLs, and metadata references.</p>
                    </div>
                  </div>
                  ${assets.length === 0
                    ? html`<p className="empty-state">No assets saved for this job yet.</p>`
                    : html`
                        <div className="table-wrap">
                          <table className="console-table">
                            <thead>
                              <tr>
                                <th>asset_type</th>
                                <th>public_url</th>
                                <th>relative_path</th>
                                <th>absolute_path</th>
                                <th>approved</th>
                                <th>created_at</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${assets.map(
                                (asset, index) => html`
                                  <tr key=${`${asset.asset_type}_${index}`}>
                                    <td>${asset.asset_type}</td>
                                    <td>
                                      ${asset.asset_url
                                        ? html`<a className="job-link" href=${asset.asset_url} target="_blank" rel="noreferrer">open</a>`
                                        : "-"}
                                    </td>
                                    <td><code>${asset.relative_path || "-"}</code></td>
                                    <td><code>${asset.absolute_path || "-"}</code></td>
                                    <td><${StatusBadge} value=${asset.approved ? "approved" : "pending"} /></td>
                                    <td>${formatDate(asset.created_at)}</td>
                                  </tr>
                                `,
                              )}
                            </tbody>
                          </table>
                        </div>
                      `}
                </section>
              </section>

              <details className="section-panel debug-panel">
                <summary className="debug-summary">
                  <span>Internal Debug</span>
                  <span className="section-copy">Candidate pool, shortlist ranking, and alternate preview renders.</span>
                </summary>

                <section className="section-panel section-embedded">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Candidate Pool</h2>
                      <p className="section-copy">All stored text variants for this job. Useful for debugging, not for normal approval.</p>
                    </div>
                    <p className="section-copy">${candidates.length} total candidates</p>
                  </div>
                  ${candidates.length === 0
                    ? html`<p className="empty-state">No candidates stored for this job yet.</p>`
                    : html`
                        <div className="table-wrap">
                          <table className="console-table">
                            <thead>
                              <tr>
                                <th>model</th>
                                <th>raw_score</th>
                                <th>judged_score</th>
                                <th>shortlist</th>
                                <th>selected</th>
                                <th>text</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${candidates.map(
                                (candidate) => html`
                                  <tr key=${candidate.id || `${candidate.model}_${candidate.text}`}>
                                    <td>${candidate.model}</td>
                                    <td>${Number(candidate.raw_score || 0).toFixed(3)}</td>
                                    <td>${Number(candidate.judged_score ?? candidate.judge_score ?? 0).toFixed(3)}</td>
                                    <td><${StatusBadge} value=${candidate.is_shortlisted ? "shortlisted" : "pooled"} /></td>
                                    <td><${StatusBadge} value=${candidate.is_selected ? "selected" : "not_selected"} /></td>
                                    <td>${truncateText(candidate.text || candidate.content_text, 200)}</td>
                                  </tr>
                                `,
                              )}
                            </tbody>
                          </table>
                        </div>
                      `}
                </section>

                <section className="section-panel section-embedded">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Top 10 Shortlist</h2>
                      <p className="section-copy">Internal ranking output. Only use this if you want to inspect or render alternate internal previews.</p>
                    </div>
                    <button type="button" className="button primary" onClick=${handleRenderShortlist} disabled=${workingAction === "render-shortlist" || shortlist.length === 0}>
                      ${workingAction === "render-shortlist" ? "Rendering..." : "Render Shortlist"}
                    </button>
                  </div>
                  ${shortlist.length === 0
                    ? html`<p className="empty-state">No shortlist available for this job yet.</p>`
                    : html`
                        <div className="table-wrap">
                          <table className="console-table">
                            <thead>
                              <tr>
                                <th>use</th>
                                <th>rank</th>
                                <th>model</th>
                                <th>score</th>
                                <th>text</th>
                              </tr>
                            </thead>
                            <tbody>
                              ${shortlist.map(
                                (entry) => html`
                                  <tr key=${entry.candidate_id}>
                                    <td>
                                      <input
                                        type="checkbox"
                                        checked=${shortlistSelection.includes(Number(entry.candidate_id))}
                                        onChange=${(event) => toggleShortlistSelection(Number(entry.candidate_id), event.target.checked)}
                                      />
                                    </td>
                                    <td>${entry.rank}</td>
                                    <td>${entry.model}</td>
                                    <td>${Number(entry.score || 0).toFixed(3)}</td>
                                    <td>${truncateText(entry.text, 220)}</td>
                                  </tr>
                                `,
                              )}
                            </tbody>
                          </table>
                        </div>
                      `}
                </section>

                <section className="section-panel section-embedded">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Additional Previews</h2>
                      <p className="section-copy">Alternate preview variants, shortlist renders, and exported images discovered on this job.</p>
                    </div>
                  </div>
                  ${previewImages.length === 0 && shortlistPreviewImages.length === 0
                    ? html`<p className="empty-state">No preview variants available yet.</p>`
                    : html`
                        <div className="image-grid">
                          ${[...previewImages, ...shortlistPreviewImages].map(
                            (image) => html`
                              <${PreviewVariantCard} key=${image.url} image=${image} />
                            `,
                          )}
                        </div>
                      `}
                </section>
              </details>
            `
          : html`<p className="empty-state">${loading ? "Loading job details..." : "Job not found."}</p>`}
      </section>
    `;
  }

  function ThemeFactoryPage() {
    const navigate = useNavigate();
    const [catalog, setCatalog] = useState([]);
    const [scheduleDashboard, setScheduleDashboard] = useState({
      week_schedule: [],
      month_schedule: [],
      active_overrides: [],
    });
    const [todayTheme, setTodayTheme] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [notice, setNotice] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [workingAction, setWorkingAction] = useState("");
    const [themeEditorOpen, setThemeEditorOpen] = useState(false);
    const [scheduleEditorOpen, setScheduleEditorOpen] = useState(false);
    const [overrideEditorOpen, setOverrideEditorOpen] = useState(false);
    const [todayThemeRunOpen, setTodayThemeRunOpen] = useState(false);
    const [editingThemeId, setEditingThemeId] = useState(null);
    const [editingScheduleId, setEditingScheduleId] = useState(null);
    const [themeForm, setThemeForm] = useState({
      theme_key: "",
      theme_name: "",
      description: "",
      theme_bucket: "everyday",
      theme_type: "evergreen",
      cultural_context: "global",
      tone_style: "conversational",
      default_funny_pct: 20,
      default_emotion_pct: 80,
      default_audience: "general audience",
      default_visual_style: "minimal",
      is_active: true,
      priority: 0,
    });
    const [scheduleForm, setScheduleForm] = useState({
      theme_id: "",
      schedule_type: "weekly_recurring",
      start_date: "",
      end_date: "",
      weekday_mask: "monday",
      month_mask: "",
      region: "",
      country: "",
      is_active: true,
      priority: 0,
      notes: "",
    });
    const [overrideForm, setOverrideForm] = useState({
      theme_id: "",
      override_scope: "editorial",
      start_at: "",
      end_at: "",
      reason: "",
      force_top_priority: true,
      created_by: "console_admin",
    });
    const [todayThemeRunForm, setTodayThemeRunForm] = useState(buildThemeRunDefaults());

    const resolvedTodayTheme = todayTheme && typeof todayTheme === "object" ? todayTheme.theme || null : null;
    const bucketCounts = useMemo(
      () => catalog.reduce(
        (accumulator, theme) => {
          const bucket = String(theme.theme_bucket || "everyday");
          accumulator[bucket] = (accumulator[bucket] || 0) + 1;
          return accumulator;
        },
        { everyday: 0, occasion: 0, current_event: 0 },
      ),
      [catalog],
    );
    const bucketSections = useMemo(
      () => [
        {
          key: "everyday",
          title: "Everyday Themes",
          description: "Recurring weekday themes that keep the console stocked with steady daily runs.",
          items: catalog.filter((theme) => String(theme.theme_bucket || "everyday") === "everyday"),
        },
        {
          key: "occasion",
          title: "Occasion Themes",
          description: "Date-range and seasonal campaign themes such as Ramadan, Holi, and Valentine's Week.",
          items: catalog.filter((theme) => String(theme.theme_bucket || "everyday") === "occasion"),
        },
        {
          key: "current_event",
          title: "Current Event Themes",
          description: "Editorial and trend-driven themes that are intended to be activated through overrides.",
          items: catalog.filter((theme) => String(theme.theme_bucket || "everyday") === "current_event"),
        },
      ],
      [catalog],
    );

    async function loadThemeFactory() {
      setLoading(true);
      setError("");
      setNotice("");
      const [catalogResult, todayResult, scheduleResult] = await Promise.allSettled([
        requestJSON("/api/themes"),
        requestJSON("/api/themes/today"),
        requestJSON("/api/themes/schedule"),
      ]);

      if (catalogResult.status === "fulfilled") {
        const items = Array.isArray(catalogResult.value) ? catalogResult.value : [];
        setCatalog(items);
        if (items.length > 0) {
          setScheduleForm((current) => ({ ...current, theme_id: String(current.theme_id || items[0].id) }));
          setOverrideForm((current) => ({ ...current, theme_id: String(current.theme_id || items[0].id) }));
        }
        if (items.length === 0) {
          setNotice("Theme schedule not configured yet");
        }
      } else {
        setCatalog([]);
        if (isOptionalThemeMissingError(catalogResult.reason)) {
          setNotice("Theme schedule not configured yet");
        } else {
          setError(normalizeDashboardError("theme catalog", catalogResult.reason));
        }
      }

      if (todayResult.status === "fulfilled") {
        setTodayTheme(todayResult.value || null);
        if (todayResult.value?.resolved === false) {
          setNotice((current) => current || todayResult.value?.message || "No theme resolved yet");
        }
      } else {
        setTodayTheme(null);
        if (isOptionalThemeMissingError(todayResult.reason)) {
          setNotice((current) => current || "No theme resolved yet");
        } else {
          setError((current) => current || normalizeDashboardError("today's theme", todayResult.reason));
        }
      }

      if (scheduleResult.status === "fulfilled") {
        if (Array.isArray(scheduleResult.value)) {
          setScheduleDashboard({ week_schedule: [], month_schedule: [], active_overrides: [] });
          setNotice((current) => current || "Theme schedule not configured yet");
          setLoading(false);
          return;
        }
        setScheduleDashboard({
          week_schedule: Array.isArray(scheduleResult.value?.week_schedule) ? scheduleResult.value.week_schedule : [],
          month_schedule: Array.isArray(scheduleResult.value?.month_schedule) ? scheduleResult.value.month_schedule : [],
          active_overrides: Array.isArray(scheduleResult.value?.active_overrides) ? scheduleResult.value.active_overrides : [],
        });
      } else {
        setScheduleDashboard({ week_schedule: [], month_schedule: [], active_overrides: [] });
        if (isOptionalThemeMissingError(scheduleResult.reason)) {
          setNotice((current) => current || "Theme schedule not configured yet");
        } else {
          setError((current) => current || normalizeDashboardError("theme schedule", scheduleResult.reason));
        }
      }

      setLoading(false);
    }

    useEffect(() => {
      loadThemeFactory();
    }, []);

    function openThemeEditor(theme = null) {
      setEditingThemeId(theme ? theme.id : null);
      setThemeForm({
        theme_key: theme?.theme_key || "",
        theme_name: theme?.theme_name || "",
        description: theme?.description || "",
        theme_bucket: theme?.theme_bucket || "everyday",
        theme_type: theme?.theme_type || "evergreen",
        cultural_context: theme?.cultural_context || "global",
        tone_style: theme?.tone_style || "conversational",
        default_funny_pct: theme?.default_funny_pct ?? 20,
        default_emotion_pct: theme?.default_emotion_pct ?? 80,
        default_audience: theme?.default_audience || "general audience",
        default_visual_style: theme?.default_visual_style || "minimal",
        is_active: theme?.is_active ?? true,
        priority: theme?.priority ?? 0,
      });
      setThemeEditorOpen(true);
    }

    function openScheduleEditor(schedule = null) {
      setEditingScheduleId(schedule ? schedule.id : null);
      setScheduleForm({
        theme_id: String(schedule?.theme_id || catalog[0]?.id || ""),
        schedule_type: schedule?.schedule_type || "weekly_recurring",
        start_date: formatDateInput(schedule?.start_date),
        end_date: formatDateInput(schedule?.end_date),
        weekday_mask: Array.isArray(schedule?.weekday_mask) ? schedule.weekday_mask.join(", ") : "monday",
        month_mask: Array.isArray(schedule?.month_mask) ? schedule.month_mask.join(", ") : "",
        region: schedule?.region || "",
        country: schedule?.country || "",
        is_active: schedule?.is_active ?? true,
        priority: schedule?.priority ?? 0,
        notes: schedule?.notes || "",
      });
      setScheduleEditorOpen(true);
    }

    function openOverrideEditor(themeId = null) {
      const start = new Date();
      const end = new Date(start.getTime() + 24 * 60 * 60 * 1000);
      setOverrideForm({
        theme_id: String(themeId || resolvedTodayTheme?.theme_id || catalog[0]?.id || ""),
        override_scope: "editorial",
        start_at: formatDateTimeLocalInput(start.toISOString()),
        end_at: formatDateTimeLocalInput(end.toISOString()),
        reason: "",
        force_top_priority: true,
        created_by: "console_admin",
      });
      setOverrideEditorOpen(true);
    }

    async function handleSaveTheme(event) {
      event.preventDefault();
      setWorkingAction("save-theme");
      setError("");
      try {
        const payload = {
          theme_key: String(themeForm.theme_key || "").trim(),
          theme_name: String(themeForm.theme_name || "").trim(),
          description: String(themeForm.description || "").trim() || null,
          theme_bucket: themeForm.theme_bucket,
          theme_type: themeForm.theme_type,
          cultural_context: String(themeForm.cultural_context || "").trim() || null,
          tone_style: String(themeForm.tone_style || "").trim(),
          default_funny_pct: Number(themeForm.default_funny_pct || 0),
          default_emotion_pct: Number(themeForm.default_emotion_pct || 0),
          default_audience: String(themeForm.default_audience || "").trim(),
          default_visual_style: String(themeForm.default_visual_style || "").trim(),
          is_active: Boolean(themeForm.is_active),
          priority: Number(themeForm.priority || 0),
        };
        const url = editingThemeId ? `/api/themes/${editingThemeId}` : "/api/themes";
        const method = editingThemeId ? "PUT" : "POST";
        await requestJSON(url, { method, body: JSON.stringify(payload) });
        setThemeEditorOpen(false);
        setStatusMessage(editingThemeId ? "Theme updated" : "Theme created");
        await loadThemeFactory();
      } catch (requestError) {
        setError(requestError.message || "Unable to save theme");
      } finally {
        setWorkingAction("");
      }
    }

    async function handleDeleteTheme(theme) {
      const confirmed = window.confirm(`Deactivate theme ${theme.theme_name}?`);
      if (!confirmed) {
        return;
      }
      setWorkingAction(`delete-theme:${theme.id}`);
      setError("");
      try {
        await requestJSON(`/api/themes/${theme.id}`, { method: "DELETE" });
        setStatusMessage(`Theme deactivated: ${theme.theme_name}`);
        await loadThemeFactory();
      } catch (requestError) {
        setError(requestError.message || "Unable to delete theme");
      } finally {
        setWorkingAction("");
      }
    }

    async function handleSaveSchedule(event) {
      event.preventDefault();
      setWorkingAction("save-schedule");
      setError("");
      try {
        const payload = {
          theme_id: Number(scheduleForm.theme_id),
          schedule_type: scheduleForm.schedule_type,
          start_date: scheduleForm.start_date || null,
          end_date: scheduleForm.end_date || null,
          weekday_mask: splitCsv(scheduleForm.weekday_mask),
          month_mask: splitCsv(scheduleForm.month_mask).map((value) => Number(value)).filter((value) => Number.isInteger(value)),
          region: String(scheduleForm.region || "").trim() || null,
          country: String(scheduleForm.country || "").trim() || null,
          is_active: Boolean(scheduleForm.is_active),
          priority: Number(scheduleForm.priority || 0),
          notes: String(scheduleForm.notes || "").trim() || null,
        };
        const url = editingScheduleId ? `/api/themes/schedule/${editingScheduleId}` : "/api/themes/schedule";
        const method = editingScheduleId ? "PUT" : "POST";
        await requestJSON(url, { method, body: JSON.stringify(payload) });
        setScheduleEditorOpen(false);
        setStatusMessage(editingScheduleId ? "Schedule updated" : "Schedule created");
        await loadThemeFactory();
      } catch (requestError) {
        setError(requestError.message || "Unable to save schedule");
      } finally {
        setWorkingAction("");
      }
    }

    async function handleSaveOverride(event) {
      event.preventDefault();
      setWorkingAction("save-override");
      setError("");
      try {
        const payload = {
          theme_id: Number(overrideForm.theme_id),
          override_scope: String(overrideForm.override_scope || "").trim(),
          start_at: new Date(overrideForm.start_at).toISOString(),
          end_at: new Date(overrideForm.end_at).toISOString(),
          reason: String(overrideForm.reason || "").trim() || null,
          force_top_priority: Boolean(overrideForm.force_top_priority),
          created_by: String(overrideForm.created_by || "console_admin").trim(),
        };
        await requestJSON("/api/themes/overrides", { method: "POST", body: JSON.stringify(payload) });
        setOverrideEditorOpen(false);
        setStatusMessage("Override created");
        await loadThemeFactory();
      } catch (requestError) {
        setError(requestError.message || "Unable to save override");
      } finally {
        setWorkingAction("");
      }
    }

    async function handleUseTodayTheme(event) {
      if (event) {
        event.preventDefault();
      }
      setWorkingAction("create-today-job");
      setError("");
      try {
        const created = await requestJSON("/api/jobs/create-daily-theme-job", {
          method: "POST",
          body: JSON.stringify(buildThemeRunPayload(todayThemeRunForm)),
        });
        setTodayThemeRunOpen(false);
        try {
          await autoBuildStudioJob(created.job_id);
          setStatusMessage(`Created ${created.job_id} from today's theme and opened Studio`);
        } catch (autoBuildError) {
          setStatusMessage(`Created ${created.job_id} from today's theme. Studio follow-up is needed: ${autoBuildError.message || "auto-build failed"}`);
        }
        navigate(`/studio/${created.job_id}`);
      } catch (requestError) {
        setError(requestError.message || "Unable to create today's themed job");
      } finally {
        setWorkingAction("");
      }
    }

    return html`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Admin</p>
            <h1 className="page-title">Theme Factory</h1>
            <p className="page-description">
              Database-backed theme catalog, schedules, overrides, and daily resolution controls.
            </p>
          </div>
          <div className="inline-actions">
            <button
              type="button"
              className="button primary"
              onClick=${() => {
                setTodayThemeRunForm(buildThemeRunDefaults(resolvedTodayTheme));
                setTodayThemeRunOpen(true);
              }}
              disabled=${workingAction === "create-today-job" || !resolvedTodayTheme}
            >
              ${workingAction === "create-today-job" ? "Creating..." : "Use Today's Theme"}
            </button>
            <button type="button" className="button" onClick=${loadThemeFactory} disabled=${loading}>Refresh</button>
            <${Link} to="/" className="button-link">Home<//>
          </div>
        </header>

        ${error ? html`<div className="status-panel error">${error}</div>` : null}
        ${notice ? html`<div className="status-panel neutral">${notice}</div>` : null}
        ${statusMessage ? html`<p className="status-line">${statusMessage}</p>` : null}
        ${loading ? html`<div className="status-panel warning">Loading Theme Factory data...</div>` : null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Everyday Themes</p>
            <p className="summary-value">${bucketCounts.everyday}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Occasion Themes</p>
            <p className="summary-value">${bucketCounts.occasion}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Current Event Themes</p>
            <p className="summary-value">${bucketCounts.current_event}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Active Overrides</p>
            <p className="summary-value">${scheduleDashboard.active_overrides.length}</p>
          </article>
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Today's Theme</h2>
              <p className="section-copy">Resolved using overrides, schedules, and evergreen fallback logic.</p>
            </div>
          </div>
          ${resolvedTodayTheme
            ? html`
                <div className="key-value-grid">
                  <article className="key-card">
                    <p className="key-label">Theme</p>
                    <p className="key-value">${resolvedTodayTheme.theme_name}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Bucket</p>
                    <p className="key-value">${themeBucketLabel(resolvedTodayTheme.theme_bucket)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Source</p>
                    <p className="key-value">${humanize(todayTheme?.source)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Weekday</p>
                    <p className="key-value">${humanize(todayTheme?.weekday)}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Audience</p>
                    <p className="key-value">${resolvedTodayTheme.audience}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Tone</p>
                    <p className="key-value">${resolvedTodayTheme.tone_style}</p>
                  </article>
                  <article className="key-card">
                    <p className="key-label">Priority</p>
                    <p className="key-value">${resolvedTodayTheme.priority}</p>
                  </article>
                </div>
              `
            : html`<p className="empty-state">No theme resolved yet.</p>`}
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Theme Catalog</h2>
              <p className="section-copy">Source themes are grouped by the three operational buckets used by Theme Factory resolution.</p>
            </div>
            <div className="inline-actions">
              <button type="button" className="button primary" onClick=${() => openThemeEditor()}>Add Theme</button>
            </div>
          </div>
          ${catalog.length === 0
            ? html`<p className="empty-state">No theme catalog entries found.</p>`
            : html`
                ${bucketSections.map(
                  (section) => html`
                    <section className="section-panel" key=${section.key}>
                      <div className="section-head">
                        <div>
                          <h3 className="section-title">${section.title}</h3>
                          <p className="section-copy">${section.description}</p>
                        </div>
                      </div>
                      ${section.items.length === 0
                        ? html`<p className="empty-state">No ${section.title.toLowerCase()} configured.</p>`
                        : html`
                            <div className="table-wrap">
                              <table className="console-table">
                                <thead>
                                  <tr>
                                    <th>theme_key</th>
                                    <th>theme_name</th>
                                    <th>theme_type</th>
                                    <th>audience</th>
                                    <th>visual_style</th>
                                    <th>priority</th>
                                    <th>status</th>
                                    <th>actions</th>
                                  </tr>
                                </thead>
                                <tbody>
                                  ${section.items.map(
                                    (theme) => html`
                                      <tr key=${theme.id}>
                                        <td><code>${theme.theme_key}</code></td>
                                        <td>${theme.theme_name}</td>
                                        <td>${humanize(theme.theme_type)}</td>
                                        <td>${theme.default_audience}</td>
                                        <td>${theme.default_visual_style}</td>
                                        <td>${theme.priority}</td>
                                        <td><${StatusBadge} value=${theme.is_active ? "active" : "inactive"} /></td>
                                        <td>
                                          <div className="inline-actions">
                                            <button type="button" className="button" onClick=${() => openThemeEditor(theme)}>Edit</button>
                                            <button
                                              type="button"
                                              className="button danger"
                                              onClick=${() => handleDeleteTheme(theme)}
                                              disabled=${workingAction === `delete-theme:${theme.id}`}
                                            >
                                              ${workingAction === `delete-theme:${theme.id}` ? "Deleting..." : "Delete"}
                                            </button>
                                          </div>
                                        </td>
                                      </tr>
                                    `,
                                  )}
                                </tbody>
                              </table>
                            </div>
                          `}
                    </section>
                  `,
                )}
              `}
        </section>

        <section className="two-column">
          <section className="section-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">This Week's Schedule</h2>
                <p className="section-copy">Resolved day-by-day schedule for the current week.</p>
              </div>
              <button type="button" className="button primary" onClick=${() => openScheduleEditor()}>Add Schedule</button>
            </div>
            ${scheduleDashboard.week_schedule.length === 0
              ? html`<p className="empty-state">No week schedule found.</p>`
              : html`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>date</th>
                          <th>weekday</th>
                          <th>theme</th>
                          <th>source</th>
                          <th>schedule_type</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${scheduleDashboard.week_schedule.map(
                          (row) => html`
                            <tr key=${`${row.plan_date}_${row.weekday}`}>
                              <td>${formatDate(row.plan_date)}</td>
                              <td>${humanize(row.weekday)}</td>
                              <td>${row.theme?.theme_name || "-"}</td>
                              <td>${humanize(row.source)}</td>
                              <td>${humanize(row.schedule_type)}</td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>

          <section className="section-panel">
            <div className="section-head">
              <div>
                <h2 className="section-title">Active Overrides</h2>
                <p className="section-copy">Urgent editorial or manual overrides currently taking precedence.</p>
              </div>
              <button type="button" className="button primary" onClick=${() => openOverrideEditor()}>Add Override</button>
            </div>
            ${scheduleDashboard.active_overrides.length === 0
              ? html`<p className="empty-state">No active overrides right now.</p>`
              : html`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>theme</th>
                          <th>scope</th>
                          <th>window</th>
                          <th>reason</th>
                          <th>priority</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${scheduleDashboard.active_overrides.map(
                          (override) => html`
                            <tr key=${override.id}>
                              <td>${override.theme_name || "-"}</td>
                              <td>${humanize(override.override_scope)}</td>
                              <td>${formatDate(override.start_at)} - ${formatDate(override.end_at)}</td>
                              <td>${override.reason || "-"}</td>
                              <td>${override.force_top_priority ? "top" : "normal"}</td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                `}
          </section>
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">This Month's Schedule</h2>
              <p className="section-copy">Schedule rules intersecting the current month.</p>
            </div>
          </div>
          ${scheduleDashboard.month_schedule.length === 0
            ? html`<p className="empty-state">No monthly schedule rules found.</p>`
            : html`
                <div className="table-wrap">
                  <table className="console-table">
                    <thead>
                      <tr>
                        <th>theme</th>
                        <th>schedule_type</th>
                        <th>start_date</th>
                        <th>end_date</th>
                        <th>weekday_mask</th>
                        <th>priority</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${scheduleDashboard.month_schedule.map(
                        (schedule) => html`
                          <tr key=${schedule.id}>
                            <td>${schedule.theme_name || "-"}</td>
                            <td>${humanize(schedule.schedule_type)}</td>
                            <td>${schedule.start_date ? formatDate(schedule.start_date) : "-"}</td>
                            <td>${schedule.end_date ? formatDate(schedule.end_date) : "-"}</td>
                            <td>${(schedule.weekday_mask || []).join(", ") || "-"}</td>
                            <td>${schedule.priority}</td>
                            <td>
                              <button type="button" className="button" onClick=${() => openScheduleEditor(schedule)}>
                                Edit
                              </button>
                            </td>
                          </tr>
                        `,
                      )}
                    </tbody>
                  </table>
                </div>
              `}
        </section>

        ${todayThemeRunOpen
          ? html`
              <div className="modal-backdrop" onClick=${() => setTodayThemeRunOpen(false)}>
                <section className="modal" onClick=${(event) => event.stopPropagation()}>
                  <h2 className="section-title">Use Today's Theme</h2>
                  <p className="section-copy">
                    ${resolvedTodayTheme ? `Resolved theme: ${resolvedTodayTheme.theme_name}` : "No theme resolved yet."}
                  </p>
                  <form onSubmit=${handleUseTodayTheme}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="todayCopyStyle">Copy Style</label>
                        <select
                          id="todayCopyStyle"
                          value=${todayThemeRunForm.copy_style}
                          onChange=${(event) => setTodayThemeRunForm((current) => ({ ...current, copy_style: event.target.value }))}
                        >
                          ${renderStudioStyleOptions()}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayTargetWords">Target Words</label>
                        <input
                          id="todayTargetWords"
                          type="number"
                          min="4"
                          max="60"
                          value=${todayThemeRunForm.target_words}
                          onInput=${(event) => setTodayThemeRunForm((current) => ({ ...current, target_words: event.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayFunnyPct">Funny %</label>
                        <input
                          id="todayFunnyPct"
                          type="number"
                          min="0"
                          max="100"
                          value=${todayThemeRunForm.tone_funny_pct}
                          onInput=${(event) => setTodayThemeRunForm((current) => ({ ...current, tone_funny_pct: event.target.value }))}
                        />
                      </div>
                      <div className="form-field">
                        <label htmlFor="todayCardsPerTheme">Cards Per Theme</label>
                        <input
                          id="todayCardsPerTheme"
                          type="number"
                          min="1"
                          max="50"
                          value=${todayThemeRunForm.cards_per_theme}
                          onInput=${(event) => setTodayThemeRunForm((current) => ({ ...current, cards_per_theme: event.target.value }))}
                          required
                        />
                      </div>
                      <div className="form-field full">
                        <p className="form-helper">This launches a theme run directly into Studio with short card-copy defaults.</p>
                      </div>
                      <div className="form-field full">
                        <label htmlFor="todayThemeNotes">Notes</label>
                        <textarea
                          id="todayThemeNotes"
                          rows="3"
                          value=${todayThemeRunForm.notes}
                          onInput=${(event) => setTodayThemeRunForm((current) => ({ ...current, notes: event.target.value }))}
                          placeholder="Optional operator notes"
                        ></textarea>
                      </div>
                    </div>
                    <div className="inline-actions" style=${{ marginTop: "12px" }}>
                      <button type="submit" className="button primary" disabled=${workingAction === "create-today-job" || !resolvedTodayTheme}>
                        ${workingAction === "create-today-job" ? "Creating..." : "Use Today's Theme"}
                      </button>
                      <button type="button" className="button" onClick=${() => setTodayThemeRunOpen(false)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `
          : null}

        ${themeEditorOpen
          ? html`
              <div className="modal-backdrop" onClick=${() => setThemeEditorOpen(false)}>
                <section className="modal modal-wide" onClick=${(event) => event.stopPropagation()}>
                  <h2 className="section-title">${editingThemeId ? "Edit Theme" : "Add Theme"}</h2>
                  <form onSubmit=${handleSaveTheme}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="themeKey">Theme Key</label>
                        <input id="themeKey" value=${themeForm.theme_key} onInput=${(event) => setThemeForm((current) => ({ ...current, theme_key: event.target.value }))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeNameFactory">Theme Name</label>
                        <input id="themeNameFactory" value=${themeForm.theme_name} onInput=${(event) => setThemeForm((current) => ({ ...current, theme_name: event.target.value }))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeBucket">Theme Bucket</label>
                        <select id="themeBucket" value=${themeForm.theme_bucket} onChange=${(event) => setThemeForm((current) => ({ ...current, theme_bucket: event.target.value }))}>
                          <option value="everyday">everyday</option>
                          <option value="occasion">occasion</option>
                          <option value="current_event">current event</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeType">Theme Type</label>
                        <select id="themeType" value=${themeForm.theme_type} onChange=${(event) => setThemeForm((current) => ({ ...current, theme_type: event.target.value }))}>
                          <option value="evergreen">evergreen</option>
                          <option value="calendar">calendar</option>
                          <option value="campaign">campaign</option>
                          <option value="news">news</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeContext">Cultural Context</label>
                        <input id="themeContext" value=${themeForm.cultural_context} onInput=${(event) => setThemeForm((current) => ({ ...current, cultural_context: event.target.value }))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeTone">Tone Style</label>
                        <input id="themeTone" value=${themeForm.tone_style} onInput=${(event) => setThemeForm((current) => ({ ...current, tone_style: event.target.value }))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeAudience">Audience</label>
                        <input id="themeAudience" value=${themeForm.default_audience} onInput=${(event) => setThemeForm((current) => ({ ...current, default_audience: event.target.value }))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeVisual">Visual Style</label>
                        <input id="themeVisual" value=${themeForm.default_visual_style} onInput=${(event) => setThemeForm((current) => ({ ...current, default_visual_style: event.target.value }))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themePriority">Priority</label>
                        <input id="themePriority" type="number" value=${themeForm.priority} onInput=${(event) => setThemeForm((current) => ({ ...current, priority: event.target.value }))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeFunny">Funny %</label>
                        <input id="themeFunny" type="number" min="0" max="100" value=${themeForm.default_funny_pct} onInput=${(event) => setThemeForm((current) => ({ ...current, default_funny_pct: event.target.value }))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="themeEmotion">Emotion %</label>
                        <input id="themeEmotion" type="number" min="0" max="100" value=${themeForm.default_emotion_pct} onInput=${(event) => setThemeForm((current) => ({ ...current, default_emotion_pct: event.target.value }))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="themeDescription">Description</label>
                        <textarea id="themeDescription" rows="4" value=${themeForm.description} onInput=${(event) => setThemeForm((current) => ({ ...current, description: event.target.value }))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${themeForm.is_active} onChange=${(event) => setThemeForm((current) => ({ ...current, is_active: event.target.checked }))} />
                        <span>Active theme</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{ marginTop: "12px" }}>
                      <button type="submit" className="button primary" disabled=${workingAction === "save-theme"}>
                        ${workingAction === "save-theme" ? "Saving..." : "Save Theme"}
                      </button>
                      <button type="button" className="button" onClick=${() => setThemeEditorOpen(false)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `
          : null}

        ${scheduleEditorOpen
          ? html`
              <div className="modal-backdrop" onClick=${() => setScheduleEditorOpen(false)}>
                <section className="modal modal-wide" onClick=${(event) => event.stopPropagation()}>
                  <h2 className="section-title">${editingScheduleId ? "Edit Schedule" : "Add Schedule"}</h2>
                  <form onSubmit=${handleSaveSchedule}>
                    <div className="form-grid">
                      <div className="form-field">
                        <label htmlFor="scheduleTheme">Theme</label>
                        <select id="scheduleTheme" value=${scheduleForm.theme_id} onChange=${(event) => setScheduleForm((current) => ({ ...current, theme_id: event.target.value }))} required>
                          ${catalog.map((theme) => html`<option key=${theme.id} value=${theme.id}>${theme.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleType">Schedule Type</label>
                        <select id="scheduleType" value=${scheduleForm.schedule_type} onChange=${(event) => setScheduleForm((current) => ({ ...current, schedule_type: event.target.value }))}>
                          <option value="single_day">single_day</option>
                          <option value="date_range">date_range</option>
                          <option value="weekly_recurring">weekly_recurring</option>
                          <option value="monthly_recurring">monthly_recurring</option>
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleStart">Start Date</label>
                        <input id="scheduleStart" type="date" value=${scheduleForm.start_date} onInput=${(event) => setScheduleForm((current) => ({ ...current, start_date: event.target.value }))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleEnd">End Date</label>
                        <input id="scheduleEnd" type="date" value=${scheduleForm.end_date} onInput=${(event) => setScheduleForm((current) => ({ ...current, end_date: event.target.value }))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="weekdayMask">Weekday Mask</label>
                        <input id="weekdayMask" value=${scheduleForm.weekday_mask} onInput=${(event) => setScheduleForm((current) => ({ ...current, weekday_mask: event.target.value }))} placeholder="monday, thursday" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="monthMask">Month Mask</label>
                        <input id="monthMask" value=${scheduleForm.month_mask} onInput=${(event) => setScheduleForm((current) => ({ ...current, month_mask: event.target.value }))} placeholder="2, 3, 8" />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleRegion">Region</label>
                        <input id="scheduleRegion" value=${scheduleForm.region} onInput=${(event) => setScheduleForm((current) => ({ ...current, region: event.target.value }))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="scheduleCountry">Country</label>
                        <input id="scheduleCountry" value=${scheduleForm.country} onInput=${(event) => setScheduleForm((current) => ({ ...current, country: event.target.value }))} />
                      </div>
                      <div className="form-field">
                        <label htmlFor="schedulePriority">Priority</label>
                        <input id="schedulePriority" type="number" value=${scheduleForm.priority} onInput=${(event) => setScheduleForm((current) => ({ ...current, priority: event.target.value }))} />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="scheduleNotes">Notes</label>
                        <textarea id="scheduleNotes" rows="4" value=${scheduleForm.notes} onInput=${(event) => setScheduleForm((current) => ({ ...current, notes: event.target.value }))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${scheduleForm.is_active} onChange=${(event) => setScheduleForm((current) => ({ ...current, is_active: event.target.checked }))} />
                        <span>Active schedule</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{ marginTop: "12px" }}>
                      <button type="submit" className="button primary" disabled=${workingAction === "save-schedule"}>
                        ${workingAction === "save-schedule" ? "Saving..." : "Save Schedule"}
                      </button>
                      <button type="button" className="button" onClick=${() => setScheduleEditorOpen(false)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `
          : null}

        ${overrideEditorOpen
          ? html`
              <div className="modal-backdrop" onClick=${() => setOverrideEditorOpen(false)}>
                <section className="modal" onClick=${(event) => event.stopPropagation()}>
                  <h2 className="section-title">Add Override</h2>
                  <form onSubmit=${handleSaveOverride}>
                    <div className="form-grid">
                      <div className="form-field full">
                        <label htmlFor="overrideTheme">Theme</label>
                        <select id="overrideTheme" value=${overrideForm.theme_id} onChange=${(event) => setOverrideForm((current) => ({ ...current, theme_id: event.target.value }))} required>
                          ${catalog.map((theme) => html`<option key=${theme.id} value=${theme.id}>${theme.theme_name}</option>`)}
                        </select>
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideScope">Scope</label>
                        <input id="overrideScope" value=${overrideForm.override_scope} onInput=${(event) => setOverrideForm((current) => ({ ...current, override_scope: event.target.value }))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideBy">Created By</label>
                        <input id="overrideBy" value=${overrideForm.created_by} onInput=${(event) => setOverrideForm((current) => ({ ...current, created_by: event.target.value }))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideStart">Start At</label>
                        <input id="overrideStart" type="datetime-local" value=${overrideForm.start_at} onInput=${(event) => setOverrideForm((current) => ({ ...current, start_at: event.target.value }))} required />
                      </div>
                      <div className="form-field">
                        <label htmlFor="overrideEnd">End At</label>
                        <input id="overrideEnd" type="datetime-local" value=${overrideForm.end_at} onInput=${(event) => setOverrideForm((current) => ({ ...current, end_at: event.target.value }))} required />
                      </div>
                      <div className="form-field full">
                        <label htmlFor="overrideReason">Reason</label>
                        <textarea id="overrideReason" rows="4" value=${overrideForm.reason} onInput=${(event) => setOverrideForm((current) => ({ ...current, reason: event.target.value }))}></textarea>
                      </div>
                      <label className="checkbox-field full">
                        <input type="checkbox" checked=${overrideForm.force_top_priority} onChange=${(event) => setOverrideForm((current) => ({ ...current, force_top_priority: event.target.checked }))} />
                        <span>Force top priority</span>
                      </label>
                    </div>
                    <div className="inline-actions" style=${{ marginTop: "12px" }}>
                      <button type="submit" className="button primary" disabled=${workingAction === "save-override"}>
                        ${workingAction === "save-override" ? "Saving..." : "Save Override"}
                      </button>
                      <button type="button" className="button" onClick=${() => setOverrideEditorOpen(false)}>Cancel</button>
                    </div>
                  </form>
                </section>
              </div>
            `
          : null}
      </section>
    `;
  }

  function StudioPage() {
    const navigate = useNavigate();
    const { jobId } = useParams();
    const [jobs, setJobs] = useState([]);
    const [job, setJob] = useState(null);
    const [assets, setAssets] = useState([]);
    const [candidates, setCandidates] = useState([]);
    const [imageAssets, setImageAssets] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [workingAction, setWorkingAction] = useState("");
    const [activeTab, setActiveTab] = useState("text");

    const loadStudio = useCallback(async (options = {}) => {
      const quiet = Boolean(options.quiet);
      if (!quiet) {
        setLoading(true);
      }
      setError("");
      try {
        const jobsPayload = await requestJSON("/api/jobs?limit=50");
        const nextJobs = Array.isArray(jobsPayload) ? jobsPayload : [];
        setJobs(nextJobs);

        if (!jobId) {
          setJob(null);
          setAssets([]);
          setCandidates([]);
          setImageAssets(null);
          return;
        }

        const [jobPayload, assetPayload, candidatePayload, imageAssetPayload] = await Promise.all([
          requestJSON(`/api/jobs/${jobId}`),
          requestJSON(`/api/jobs/${jobId}/assets`),
          requestJSON(`/api/jobs/${jobId}/candidates`),
          fetchJobImageAssets(jobId),
        ]);
        setJob(jobPayload || null);
        setAssets(Array.isArray(assetPayload) ? assetPayload : []);
        setCandidates(Array.isArray(candidatePayload) ? candidatePayload : []);
        setImageAssets(imageAssetPayload || null);
      } catch (requestError) {
        setError(requestError.message || "Unable to load Studio");
      } finally {
        if (!quiet) {
          setLoading(false);
        }
      }
    }, [jobId]);

    useEffect(() => {
      loadStudio();
    }, [loadStudio]);

    useEffect(() => {
      if (!jobId) {
        return undefined;
      }
      const intervalId = window.setInterval(() => {
        if (document.visibilityState === "visible") {
          loadStudio({ quiet: true });
        }
      }, 10000);
      return () => window.clearInterval(intervalId);
    }, [jobId, loadStudio]);

    const studioState = useMemo(() => getStudioState(job || {}), [job]);
    const selectedTextCandidate = useMemo(
      () => getSelectedTextCandidate(job || {}, candidates),
      [job, candidates],
    );
    const imageOptions = useMemo(() => collectImageAssetCandidates(imageAssets), [imageAssets]);
    const selectedImageOption = useMemo(
      () => getSelectedImageAsset(imageAssets),
      [imageAssets],
    );
    const finalCards = useMemo(() => collectFinalCardOptions(job || {}, assets), [job, assets]);
    const finalPreviewSelection = usePreviewSelection(finalCards);

    async function runStudioAction(actionKey, requestFactory, successMessage, afterAction) {
      setWorkingAction(actionKey);
      setError("");
      try {
        await requestFactory();
        if (successMessage) {
          setStatusMessage(successMessage);
        }
        await loadStudio();
        if (typeof afterAction === "function") {
          afterAction();
        }
      } catch (requestError) {
        setError(requestError.message || "Studio action failed");
      } finally {
        setWorkingAction("");
      }
    }

    async function handleStudioDelete() {
      if (!jobId) {
        return;
      }
      const confirmed = window.confirm(`Delete ${jobId} and associated files?`);
      if (!confirmed) {
        return;
      }
      setWorkingAction("delete");
      setError("");
      try {
        await requestJSON(`/api/jobs/${jobId}`, { method: "DELETE" });
        navigate("/studio");
      } catch (requestError) {
        setError(requestError.message || "Unable to delete job");
      } finally {
        setWorkingAction("");
      }
    }

    function handleSwitchJob(nextJobId) {
      if (!nextJobId) {
        navigate("/studio");
        return;
      }
      navigate(`/studio/${nextJobId}`);
    }

    function renderTextTab() {
      if (!job) {
        return null;
      }
      return html`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Text Options</h2>
              <p className="section-copy">Choose the line that feels most like a card. If nothing lands, rerun only text.</p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${() => runStudioAction(
                  "regenerate-text",
                  () => requestJSON(`/api/jobs/${jobId}/regenerate-content`, { method: "POST" }),
                  `Regenerated text for ${jobId}`,
                )}
                disabled=${workingAction === "regenerate-text"}
              >
                ${workingAction === "regenerate-text" ? "Working..." : "Regenerate Text"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${() => runStudioAction(
                  "more-text",
                  () => requestJSON(`/api/jobs/${jobId}/generate-more-text`, { method: "POST" }),
                  `Generated 10 more text options for ${jobId}`,
                )}
                disabled=${workingAction === "more-text"}
              >
                ${workingAction === "more-text" ? "Working..." : "Generate 10 More"}
              </button>
            </div>
          </div>
          ${candidates.length === 0
            ? html`<p className="empty-state">No text options stored for this job yet.</p>`
            : html`
                <div className="studio-option-grid">
                  ${candidates.map((candidate) => {
                    const isSelected = Number(selectedTextCandidate?.id || 0) === Number(candidate.id || 0);
                    return html`
                      <article key=${candidate.id || `${candidate.model}_${candidate.text}`} className=${`studio-option-card ${isSelected ? "selected" : ""}`}>
                        <div className="studio-option-head">
                          <${StatusBadge} value=${isSelected ? "selected" : "option"} />
                          <span className="score-chip">
                            score ${Number(candidate.judged_score ?? candidate.judge_score ?? 0).toFixed(3)}
                          </span>
                        </div>
                        <p className="studio-option-text">${candidate.text || candidate.content_text}</p>
                        <div className="studio-meta-row">
                          <span className="mini-pill">${copyStyleLabel(job?.output_spec?.format)}</span>
                          <span className="mini-pill">${candidate.model}</span>
                        </div>
                        <div className="inline-actions">
                          <button
                            type="button"
                            className=${isSelected ? "button" : "button primary"}
                            onClick=${() => runStudioAction(
                              `select-text:${candidate.id}`,
                              () => requestJSON(`/api/jobs/${jobId}/select-text`, {
                                method: "POST",
                                body: JSON.stringify({ candidate_id: candidate.id }),
                              }),
                              `Selected text option ${candidate.id} for ${jobId}`,
                              () => setActiveTab("image"),
                            )}
                            disabled=${workingAction === `select-text:${candidate.id}` || isSelected}
                          >
                            ${workingAction === `select-text:${candidate.id}` ? "Working..." : isSelected ? "Using This Text" : "Use This Text"}
                          </button>
                        </div>
                      </article>
                    `;
                  })}
                </div>
              `}
        </section>
      `;
    }

    function renderImageTab() {
      if (!job) {
        return null;
      }
      return html`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Image Options</h2>
              <p className="section-copy">Generate ImageForge candidates, compare them, and choose one asset for final eCard composition.</p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${() => runStudioAction(
                  "generate-image-assets",
                  () => requestJSON(`/api/jobs/${jobId}/image-assets/generate`, { method: "POST" }),
                  `Generated image assets for ${jobId}`,
                )}
                disabled=${workingAction === "generate-image-assets" || !job.content_preview}
              >
                ${workingAction === "generate-image-assets" ? "Working..." : "Generate Assets"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${() => runStudioAction(
                  "regenerate-image-assets",
                  () => requestJSON(`/api/jobs/${jobId}/image-assets/regenerate`, { method: "POST" }),
                  `Regenerated image assets for ${jobId}`,
                )}
                disabled=${workingAction === "regenerate-image-assets" || !job.content_preview}
              >
                ${workingAction === "regenerate-image-assets" ? "Working..." : "Regenerate Assets"}
              </button>
            </div>
          </div>
          ${imageAssets
            ? html`
                <div className="status-panel neutral studio-selected-copy">
                  Image status: ${humanize(imageAssets.image_generation_status || "not_requested")}
                  ${imageAssets.image_generation_stage ? ` | Stage: ${humanize(imageAssets.image_generation_stage)}` : ""}
                </div>
              `
            : null}
          ${selectedTextCandidate
            ? html`
                <div className="status-panel neutral studio-selected-copy">
                  Selected text: ${selectedTextCandidate.text || selectedTextCandidate.content_text}
                </div>
              `
            : null}
          ${imageOptions.length === 0
            ? html`<p className="empty-state">No image candidates yet. Use Generate Assets to create ImageForge options.</p>`
            : html`
                <div className="studio-image-grid">
                  ${imageOptions.map((asset) => {
                    const isSelected = selectedImageOption && selectedImageOption.candidate_id === asset.candidate_id;
                    return html`
                      <article key=${asset.key} className=${`studio-image-card ${isSelected ? "selected" : ""}`}>
                        <a href=${asset.url} target="_blank" rel="noreferrer">
                          <img src=${asset.url} alt=${asset.provider} loading="lazy" />
                        </a>
                        <div className="studio-image-body">
                          <div className="studio-meta-row">
                            <span className="mini-pill">${humanize(asset.provider)}</span>
                            <span className="mini-pill">${asset.model || "Default Model"}</span>
                          </div>
                          <div className="studio-meta-row">
                            ${formatDimensions(asset.width, asset.height)
                              ? html`<span className="mini-pill">${formatDimensions(asset.width, asset.height)}</span>`
                              : null}
                            <span className="mini-pill">${formatDate(asset.created_at)}</span>
                            <span className="mini-pill">${isSelected ? "Selected" : `Candidate ${asset.candidate_index}`}</span>
                          </div>
                          <div className="inline-actions">
                            <button
                              type="button"
                              className=${isSelected ? "button" : "button primary"}
                              onClick=${() => runStudioAction(
                                `select-image-asset:${asset.candidate_id}`,
                                () => requestJSON(`/api/jobs/${jobId}/image-assets/${asset.candidate_id}/select`, { method: "POST" }),
                                `Selected image asset for ${jobId}`,
                                () => setActiveTab("final"),
                              )}
                              disabled=${workingAction === `select-image-asset:${asset.candidate_id}` || isSelected}
                            >
                              ${workingAction === `select-image-asset:${asset.candidate_id}` ? "Working..." : isSelected ? "Using This Image" : "Use This Image"}
                            </button>
                          </div>
                        </div>
                      </article>
                    `;
                  })}
                </div>
              `}
        </section>
      `;
    }

    function renderFinalTab() {
      if (!job) {
        return null;
      }
      const isFavorite = Boolean(studioState.is_favorite);
      const rerunLabel = finalCards.length > 0 ? "Regenerate Card" : "Render Card";
      const rerunEndpoint = finalCards.length > 0 ? `/api/jobs/${jobId}/rerun/final-render` : `/api/jobs/${jobId}/render-final`;
      return html`
        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Final Cards</h2>
              <p className="section-copy">Rendered card outputs. Keep the one you like, mark it favorite, or rerun only the card render.</p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button"
                onClick=${() => runStudioAction(
                  "favorite",
                  () => requestJSON(`/api/jobs/${jobId}/favorite`, {
                    method: "POST",
                    body: JSON.stringify({ favorite: !isFavorite }),
                  }),
                  isFavorite ? `Removed ${jobId} from favorites` : `Marked ${jobId} as favorite`,
                )}
                disabled=${workingAction === "favorite"}
              >
                ${workingAction === "favorite" ? "Working..." : isFavorite ? "Unfavorite" : "Mark Favorite"}
              </button>
              <button
                type="button"
                className="button primary"
                onClick=${() => runStudioAction(
                  "rerun-card",
                  () => requestJSON(rerunEndpoint, { method: "POST" }),
                  `${rerunLabel} completed for ${jobId}`,
                )}
                disabled=${workingAction === "rerun-card" || !job.image_preview_url}
              >
                ${workingAction === "rerun-card" ? "Working..." : rerunLabel}
              </button>
            </div>
          </div>
          ${finalCards.length === 0
            ? html`<p className="empty-state">No final cards rendered yet. Pick an image option and render the card.</p>`
            : html`
                <div className="studio-final-grid">
                  ${finalCards.map((card) => html`
                    <article key=${card.key} className="studio-final-card">
                      <a href=${card.url} target="_blank" rel="noreferrer">
                        <img src=${card.url} alt=${card.label} loading="lazy" />
                      </a>
                      <div className="studio-image-body">
                        <div className="studio-meta-row">
                          <span className="mini-pill">${card.label}</span>
                          <span className="mini-pill">${isFavorite ? "Favorite" : humanize(statusCategory(job))}</span>
                        </div>
                        <div className="ecard-actions">
                          <a href=${card.url} target="_blank" rel="noreferrer" className="button-link">Open</a>
                          <button
                            type="button"
                            className="button"
                            onClick=${() => runStudioAction(
                              "favorite",
                              () => requestJSON(`/api/jobs/${jobId}/favorite`, {
                                method: "POST",
                                body: JSON.stringify({ favorite: !isFavorite }),
                              }),
                              isFavorite ? `Removed ${jobId} from favorites` : `Marked ${jobId} as favorite`,
                            )}
                            disabled=${workingAction === "favorite"}
                          >
                            ${isFavorite ? "Unfavorite" : "Mark Favorite"}
                          </button>
                          <button
                            type="button"
                            className="button"
                            onClick=${() => runStudioAction(
                              "archive",
                              () => requestJSON(`/api/jobs/${jobId}/archive`, { method: "POST" }),
                              `Archived ${jobId}`,
                            )}
                            disabled=${workingAction === "archive" || job.status === "archived"}
                          >
                            ${workingAction === "archive" ? "Archiving..." : "Archive"}
                          </button>
                          <button
                            type="button"
                            className="button danger"
                            onClick=${handleStudioDelete}
                            disabled=${workingAction === "delete"}
                          >
                            ${workingAction === "delete" ? "Deleting..." : "Delete"}
                          </button>
                        </div>
                      </div>
                    </article>
                  `)}
                </div>
              `}
        </section>
      `;
    }

    return html`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Studio</p>
            <h1 className="page-title">eCard Studio</h1>
            <p className="page-description">
              Select text, select image, and rerun only the part of the card you want to change.
            </p>
          </div>
          <div className="inline-actions">
            ${jobs.length > 0
              ? html`
                  <label className="inline-select">
                    <span>Job</span>
                    <select value=${jobId || ""} onChange=${(event) => handleSwitchJob(event.target.value)}>
                      <option value="">Choose job</option>
                      ${jobs.map((item) => html`
                        <option key=${item.job_id} value=${item.job_id}>${item.theme_name} | ${item.job_id}</option>
                      `)}
                    </select>
                  </label>
                `
              : null}
            <button type="button" className="button" onClick=${loadStudio} disabled=${loading}>Refresh</button>
            ${jobId ? html`<${Link} to=${`/jobs/${jobId}`} className="button-link">Job Detail<//>` : null}
          </div>
        </header>

        ${error ? html`<div className="status-panel error">${error}</div>` : null}
        ${statusMessage ? html`<p className="status-line">${statusMessage}</p>` : null}
        ${loading ? html`<div className="status-panel warning">Loading Studio data...</div>` : null}

        ${!jobId
          ? html`
              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Pick a Job</h2>
                    <p className="section-copy">Open any recent job in Studio to control text, image, and final card generation.</p>
                  </div>
                </div>
                ${jobs.length === 0
                  ? html`<p className="empty-state">No jobs available yet. Start from Home or Theme Factory.</p>`
                  : html`
                      <div className="table-wrap">
                        <table className="console-table">
                          <thead>
                            <tr>
                              <th>job_id</th>
                              <th>theme</th>
                              <th>status</th>
                              <th>updated</th>
                              <th>open</th>
                            </tr>
                          </thead>
                          <tbody>
                            ${jobs.map((item) => html`
                              <tr key=${item.job_id}>
                                <td>${item.job_id}</td>
                                <td>${item.theme_name}</td>
                                <td><${StatusBadge} value=${item.status} /></td>
                                <td>${formatDate(item.updated_at)}</td>
                                <td><${Link} className="job-link" to=${`/studio/${item.job_id}`}>Open Studio<//></td>
                              </tr>
                            `)}
                          </tbody>
                        </table>
                      </div>
                    `}
              </section>
            `
          : job
            ? html`
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">${job.theme_name}</h2>
                      <p className="section-copy">${job.job_id} | ${job.cards_per_theme || 10} cards | ${copyStyleLabel(job?.output_spec?.format)}</p>
                    </div>
                    <${StatusBadge} value=${job.status} />
                  </div>
                  <div className="studio-current-grid">
                    <article className="key-card">
                      <p className="key-label">Selected Text</p>
                      <p className="studio-current-copy">${selectedTextCandidate?.text || selectedTextCandidate?.content_text || job.content_preview || "No text selected yet."}</p>
                    </article>
                    <article className="key-card">
                      <p className="key-label">Selected Image</p>
                      ${selectedImageOption
                        ? html`<img className="studio-current-image" src=${selectedImageOption.url} alt="Selected image" loading="lazy" />`
                        : html`<p className="empty-state compact">No image selected yet.</p>`}
                    </article>
                    <article className="key-card">
                      <p className="key-label">Final Card</p>
                      ${finalPreviewSelection.currentCandidate
                        ? html`<img className="studio-current-image" src=${finalPreviewSelection.currentCandidate.url} alt="Final card" loading="lazy" onError=${finalPreviewSelection.handleError} />`
                        : html`<p className="empty-state compact">No final card rendered yet.</p>`}
                    </article>
                  </div>
                </section>

                <div className="studio-tabbar" role="tablist" aria-label="Studio tabs">
                  ${[
                    ["text", "Text Options"],
                    ["image", "Image Options"],
                    ["final", "Final Cards"],
                  ].map(([tabKey, label]) => html`
                    <button
                      key=${tabKey}
                      type="button"
                      className=${activeTab === tabKey ? "studio-tab active" : "studio-tab"}
                      onClick=${() => setActiveTab(tabKey)}
                    >
                      ${label}
                    </button>
                  `)}
                </div>

                ${activeTab === "text" ? renderTextTab() : null}
                ${activeTab === "image" ? renderImageTab() : null}
                ${activeTab === "final" ? renderFinalTab() : null}
              `
            : html`<p className="empty-state">Job not found.</p>`}
      </section>
    `;
  }

  function JobsPage() {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const loadJobs = useCallback(async () => {
      setLoading(true);
      setError("");
      try {
        const payload = await requestJSON("/api/jobs?limit=100");
        setJobs(Array.isArray(payload) ? payload : []);
      } catch (requestError) {
        setError(requestError.message || "Unable to load jobs");
      } finally {
        setLoading(false);
      }
    }, []);

    useEffect(() => {
      loadJobs();
    }, [loadJobs]);

    return html`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Jobs</p>
            <h1 className="page-title">All Jobs</h1>
            <p className="page-description">Workflow data is still available, but Studio is the primary place to control card output.</p>
          </div>
          <div className="inline-actions">
            <button type="button" className="button" onClick=${loadJobs} disabled=${loading}>Refresh</button>
          </div>
        </header>

        ${error ? html`<div className="status-panel error">${error}</div>` : null}
        ${loading ? html`<div className="status-panel warning">Loading jobs...</div>` : null}

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Jobs</h2>
              <p className="section-copy">Open Studio for operator control or Job Detail for audit-heavy troubleshooting.</p>
            </div>
          </div>
          ${jobs.length === 0
            ? html`<p className="empty-state">No jobs found.</p>`
            : html`
                <div className="table-wrap">
                  <table className="console-table">
                    <thead>
                      <tr>
                        <th>job_id</th>
                        <th>theme</th>
                        <th>status</th>
                        <th>stage</th>
                        <th>updated</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${jobs.map((job) => html`
                        <tr key=${job.job_id}>
                          <td>${job.job_id}</td>
                          <td>${job.theme_name}</td>
                          <td><${StatusBadge} value=${job.status} /></td>
                          <td>${humanize(job.current_stage)}</td>
                          <td>${formatDate(job.updated_at)}</td>
                          <td>
                            <div className="inline-actions">
                              <${Link} className="button-link" to=${`/studio/${job.job_id}`}>Studio<//>
                              <${Link} className="button-link" to=${`/jobs/${job.job_id}`}>Detail<//>
                            </div>
                          </td>
                        </tr>
                      `)}
                    </tbody>
                  </table>
                </div>
              `}
        </section>
      </section>
    `;
  }

  function ConsoleSidebar() {
    const navItems = [
      { to: "/", label: "Home", icon: "home", end: true },
      { to: "/themes", label: "Theme Factory", icon: "themes" },
      { to: "/studio", label: "Studio", icon: "studio" },
      { to: "/compare", label: "Compare Lab", icon: "compare" },
      { to: "/jobs", label: "Jobs", icon: "jobs" },
    ];

    return html`
      <aside className="console-sidebar">
        <div className="sidebar-brand">
          <p className="brand-overline">eCardFactory</p>
          <p className="sidebar-brand-mark">ECF</p>
        </div>
        <nav className="sidebar-nav icon-only" aria-label="Primary">
          ${navItems.map((item) => html`
            <${NavLink}
              key=${item.to}
              to=${item.to}
              end=${Boolean(item.end)}
              title=${item.label}
              data-tooltip=${item.label}
              className=${({ isActive }) => (isActive ? "nav-link icon-link active" : "nav-link icon-link")}
            >
              <span className="nav-icon"><${SidebarIcon} name=${item.icon} /></span>
              <span className="sr-only">${item.label}</span>
            <//>
          `)}
        </nav>
      </aside>
    `;
  }

  function CompareLabPage() {
    return html`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Tools</p>
            <h1 className="page-title">Compare Lab</h1>
            <p className="page-description">
              Secondary lab surface for model target selection, prompt/theme tuning, judge mode, sweep mode, and winner analysis.
            </p>
          </div>
          <div className="inline-actions">
            <a href="/static/compare.html" target="_blank" rel="noreferrer" className="button-link">Open Standalone Compare</a>
          </div>
        </header>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Embedded Legacy Compare Interface</h2>
              <p className="section-copy">All existing compare workflow features are preserved without functional changes.</p>
            </div>
          </div>
          <iframe
            className="compare-frame"
            src="/static/compare.html"
            title="eCardFactory Compare Lab"
            loading="lazy"
          ></iframe>
        </section>
      </section>
    `;
  }

  function AppFrame() {
    return html`
      <div className="console-layout">
        <${ConsoleSidebar} />

        <main className="console-main">
          <${Routes}>
            <${Route} path="/" element=${html`<${WorkflowConsolePage} />`} />
            <${Route} path="/themes" element=${html`<${ThemeFactoryPage} />`} />
            <${Route} path="/studio" element=${html`<${StudioPage} />`} />
            <${Route} path="/studio/:jobId" element=${html`<${StudioPage} />`} />
            <${Route} path="/compare" element=${html`<${CompareLabPage} />`} />
            <${Route} path="/jobs" element=${html`<${JobsPage} />`} />
            <${Route} path="/jobs/:jobId" element=${html`<${JobDetailPage} />`} />
            <${Route} path="*" element=${html`<${Navigate} to="/" replace=${true} />`} />
          <//>
        </main>
      </div>
    `;
  }

  class ConsoleErrorBoundary extends React.Component {
    constructor(props) {
      super(props);
      this.state = { error: null };
    }

    static getDerivedStateFromError(error) {
      return { error };
    }

    componentDidCatch(error) {
      reportBootFailure(
        `Frontend render error: ${error?.message || "unknown error"}. See browser console for details.`,
        error,
      );
    }

    render() {
      if (!this.state.error) {
        return this.props.children;
      }
      return html`
        <div className="console-layout">
          <${ConsoleSidebar} />
          <main className="console-main">
            <header className="page-head">
              <div>
                <p className="page-kicker">Frontend</p>
                <h1 className="page-title">eCardFactory</h1>
                <p className="page-description">Unable to render the dashboard due to a frontend runtime error.</p>
              </div>
            </header>
            <section className="section-panel">
              <div className="section-head">
                <div>
                  <h2 className="section-title">Render Error</h2>
                  <p className="section-copy">Check browser console for stack trace.</p>
                </div>
              </div>
              <div className="empty-state">
                ${this.state.error?.message || "Unknown frontend error"}
              </div>
            </section>
          </main>
        </div>
      `;
    }
  }

  function AppReadySignal() {
    useEffect(() => {
      hideBootFallback();
    }, []);
    return null;
  }

  function App() {
    return html`
      <${BrowserRouter}>
        <${ConsoleErrorBoundary}>
          <${AppReadySignal} />
          <${AppFrame} />
        <//>
      <//>
    `;
  }

  window.addEventListener("error", (event) => {
    if (event.error) {
      reportBootFailure(
        `Frontend runtime error: ${event.error.message || "unknown error"}.`,
        event.error,
      );
    }
  });

  window.addEventListener("unhandledrejection", (event) => {
    reportBootFailure(
      `Unhandled async error: ${event.reason?.message || String(event.reason || "unknown")}`,
      event.reason,
    );
  });

const rootNode = document.getElementById("root");
if (!rootNode) {
  reportBootFailure("Frontend root element (#root) is missing in index.html.");
} else {
  try {
    const root = createRoot(rootNode);
    root.render(html`<${App} />`);
  } catch (error) {
    reportBootFailure(
      `Unable to mount React root: ${error?.message || "unknown mount error"}`,
      error,
    );
  }
}
