import React, { useEffect, useMemo, useState } from "react";
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
      output_spec: {
        format: "paragraph",
        length: { target_words: 80 },
        structure: { no_lists: true, no_numbering: true },
      },
      avoid_cliches: true,
      rendering: {
        theme_style: "minimal",
        text_alignment: "center",
        export_size: "1080x1350",
      },
    };
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
    };
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
    });
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
        setStatusMessage(`Created ${created.job_id}`);
        await loadDashboard();
        navigate(`/jobs/${created.job_id}`);
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

    async function handleGenerateTodayCard() {
      setCreatingThemeJob(true);
      setThemeError("");
      try {
        const created = await requestJSON("/api/jobs/create-daily-theme-job", {
          method: "POST",
        });
        setStatusMessage(`Created ${created.job_id} from today's theme`);
        await loadDashboard();
        navigate(`/jobs/${created.job_id}`);
      } catch (requestError) {
        setThemeError(requestError.message || "Unable to create today's themed job");
      } finally {
        setCreatingThemeJob(false);
      }
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
            <p className="page-kicker">Workflow</p>
            <h1 className="page-title">Workflow Console</h1>
            <p className="page-description">
              Generated eCards, workflow state, and intervention controls in one internal console.
            </p>
          </div>
          <div className="inline-actions">
            <button type="button" className="button primary" onClick=${() => setCreateOpen(true)}>Create New Card Job</button>
            <button
              type="button"
              className="button"
              onClick=${loadDashboard}
              disabled=${jobsLoading || storageLoading || themeLoading}
            >
              Refresh
            </button>
            <${Link} to="/themes" className="button-link">Open Theme Factory<//>
            <${Link} to="/compare" className="button-link">Open Compare Lab<//>
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
            <p className="summary-label">Active Jobs</p>
            <p className="summary-value">${jobsLoading ? "..." : summary.active}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Completed Jobs</p>
            <p className="summary-value">${jobsLoading ? "..." : summary.completed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Failed Jobs</p>
            <p className="summary-value">${jobsLoading ? "..." : summary.failed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Storage Usage</p>
            <p className="summary-value">${storageLoading ? "..." : storage ? formatBytes(storage.total_bytes) : "Unavailable"}</p>
          </article>
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Generated eCards</h2>
              <p className="section-copy">Final previews, generated image previews, and content-first placeholders for each job.</p>
            </div>
          </div>
          ${jobsLoading
            ? html`<p className="empty-state">Loading generated eCards...</p>`
            : jobsError
              ? html`<p className="empty-state">Unable to load generated eCards. Check API availability and refresh.</p>`
              : jobs.length === 0
                ? html`
                    <div className="empty-state">
                      <p className="empty-state-title">No generated eCards yet</p>
                      <p className="empty-state-copy">Start a workflow job to generate the first card for this console.</p>
                      <button type="button" className="button primary" onClick=${() => setCreateOpen(true)}>
                        Create New Card Job
                      </button>
                    </div>
                  `
                : html`
                    <div className="ecard-grid">
                      ${jobs.map(
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
              <h2 className="section-title">Weekly Theme Schedule</h2>
              <p className="section-copy">
                ${resolvedTodayTheme
                  ? `Today's Theme: ${resolvedTodayTheme.theme_name} (${humanize(todayTheme?.weekday)})`
                  : themeNotice || "Today's Theme: Unavailable"}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${handleGenerateTodayCard}
                disabled=${creatingThemeJob || themeLoading || !resolvedTodayTheme}
              >
                ${creatingThemeJob ? "Generating..." : "Generate Today's Card"}
              </button>
              <${Link} to="/themes" className="button-link">Manage Themes<//>
            </div>
          </div>
          ${themeNotice ? html`<div className="status-panel neutral">${themeNotice}</div>` : null}
          ${themeLoading
            ? html`<p className="empty-state">Loading weekly schedule...</p>`
            : themeSchedule.length === 0
              ? html`<p className="empty-state">Theme schedule not configured yet.</p>`
              : html`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>date</th>
                          <th>weekday</th>
                          <th>theme_name</th>
                          <th>source</th>
                          <th>tone_style</th>
                          <th>audience</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${themeSchedule.map(
                          (row) => html`
                            <tr key=${`${row.plan_date}_${row.weekday}`}>
                              <td>${formatDate(row.plan_date)}</td>
                              <td>${humanize(row.weekday)}</td>
                              <td>${row.theme?.theme_name || "-"}</td>
                              <td>${humanize(row.source)}</td>
                              <td>${row.theme?.tone_style || "-"}</td>
                              <td>${row.theme?.audience || "-"}</td>
                            </tr>
                          `,
                        )}
                      </tbody>
                    </table>
                  </div>
                `}
        </section>

        <section className="section-panel section-subdued">
          <div className="section-head">
            <div>
              <h2 className="section-title">Recent Jobs</h2>
              <p className="section-copy">Newest 50 jobs from workflow backend.</p>
            </div>
          </div>
          ${jobsLoading
            ? html`<p className="empty-state">Loading jobs...</p>`
            : jobsError
              ? html`<p className="empty-state">Unable to load jobs. Check API availability and refresh.</p>`
              : jobs.length === 0
                ? html`<p className="empty-state">No jobs found yet.</p>`
                : html`
                    <div className="table-wrap">
                      <table className="console-table">
                        <thead>
                          <tr>
                            <th>job_id</th>
                            <th>theme_name</th>
                            <th>current_stage</th>
                            <th>status</th>
                            <th>created_at</th>
                            <th>updated_at</th>
                          </tr>
                        </thead>
                        <tbody>
                          ${jobs.map(
                            (job) => html`
                              <tr key=${job.job_id}>
                                <td><${Link} className="job-link" to=${`/jobs/${job.job_id}`}>${job.job_id}<//></td>
                                <td>${job.theme_name || "-"}</td>
                                <td>${humanize(job.current_stage)}</td>
                                <td><${StatusBadge} value=${job.status} /></td>
                                <td>${formatDate(job.created_at)}</td>
                                <td>${formatDate(job.updated_at)}</td>
                              </tr>
                            `,
                          )}
                        </tbody>
                      </table>
                    </div>
                  `}
        </section>

        ${createOpen
          ? html`
              <div className="modal-backdrop" onClick=${() => setCreateOpen(false)}>
                <section className="modal" onClick=${(event) => event.stopPropagation()}>
                  <h2 className="section-title">Create New Workflow Job</h2>
                  <p className="section-copy">Starts generation and opens approval flow.</p>
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

    async function loadJobDetail() {
      if (!jobId) {
        return;
      }
      setLoading(true);
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
        setLoading(false);
      }
    }

    useEffect(() => {
      loadJobDetail();
    }, [jobId]);

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

    async function handleStageRerun(stage) {
      if (!jobId) {
        return;
      }
      const endpointMap = {
        content: `/api/jobs/${jobId}/rerun/content`,
        image: `/api/jobs/${jobId}/rerun/image`,
        final_render: `/api/jobs/${jobId}/rerun/final-render`,
        full: `/api/jobs/${jobId}/rerun/full`,
      };
      const actionKey = `rerun:${stage}`;
      setWorkingAction(actionKey);
      setError("");
      try {
        const payload = await requestJSON(endpointMap[stage], { method: "POST" });
        setStatusMessage(`Reran ${humanize(stage)} for ${payload.job_id} (retry ${payload.retry_count})`);
        await loadJobDetail();
      } catch (requestError) {
        setError(requestError.message || `Unable to rerun ${humanize(stage)}`);
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
                    <h2 className="section-title">Stage and Status Breakdown</h2>
                    <p className="section-copy">Lifecycle status across generation and approval gates.</p>
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
                <div className="section-head section-subhead">
                  <div>
                    <h2 className="section-title">Stage Reruns</h2>
                    <p className="section-copy">Operational rerun controls for each major workflow stage.</p>
                  </div>
                </div>
                <div className="inline-actions padded-actions">
                  <button type="button" className="button" onClick=${() => handleStageRerun("content")} disabled=${workingAction === "rerun:content"}>
                    ${workingAction === "rerun:content" ? "Rerunning..." : "Rerun Content"}
                  </button>
                  <button type="button" className="button" onClick=${() => handleStageRerun("image")} disabled=${workingAction === "rerun:image"}>
                    ${workingAction === "rerun:image" ? "Rerunning..." : "Rerun Image"}
                  </button>
                  <button type="button" className="button" onClick=${() => handleStageRerun("final_render")} disabled=${workingAction === "rerun:final_render"}>
                    ${workingAction === "rerun:final_render" ? "Rerunning..." : "Rerun Final Render"}
                  </button>
                  <button type="button" className="button primary" onClick=${() => handleStageRerun("full")} disabled=${workingAction === "rerun:full"}>
                    ${workingAction === "rerun:full" ? "Rerunning..." : "Rerun Full Workflow"}
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

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Candidate Pool</h2>
                    <p className="section-copy">All generated candidates across models before shortlist selection.</p>
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

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Top 10 Shortlist</h2>
                    <p className="section-copy">Select shortlisted phrases and render internal card previews from them.</p>
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

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Generated Card Preview</h2>
                    <p className="section-copy">Best available final or preview image for this job.</p>
                  </div>
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
                    : html`<p className="empty-state">No preview or final image available yet.</p>`}
              </section>

              <section className="two-column">
                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Image Preview</h2>
                      <p className="section-copy">Intermediate generated image if available.</p>
                    </div>
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
                </section>

                <section className="section-panel">
                  <div className="section-head">
                    <div>
                      <h2 className="section-title">Content Preview</h2>
                      <p className="section-copy">Approved or generated message copy stored on the job.</p>
                    </div>
                  </div>
                  ${job.content_preview
                    ? html`<div className="content-preview-block">${job.content_preview}</div>`
                    : html`<p className="empty-state">No content preview stored yet.</p>`}
                </section>
              </section>

              <section className="section-panel">
                <div className="section-head">
                  <div>
                    <h2 className="section-title">Additional Previews</h2>
                    <p className="section-copy">All preview variants, shortlist renders, and exported images discovered on this job.</p>
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

    const resolvedTodayTheme = todayTheme && typeof todayTheme === "object" ? todayTheme.theme || null : null;
    const bucketCounts = useMemo(
      () => catalog.reduce(
        (accumulator, theme) => {
          const bucket = String(theme.theme_bucket || "everyday");
          accumulator[bucket] = (accumulator[bucket] || 0) + 1;
          return accumulator;
        },
        { everyday: 0, special: 0, current_event: 0 },
      ),
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

    async function handleUseTodayTheme() {
      setWorkingAction("create-today-job");
      setError("");
      try {
        const created = await requestJSON("/api/jobs/create-daily-theme-job", { method: "POST" });
        setStatusMessage(`Created ${created.job_id} from today's theme`);
        navigate(`/jobs/${created.job_id}`);
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
              onClick=${handleUseTodayTheme}
              disabled=${workingAction === "create-today-job" || !resolvedTodayTheme}
            >
              ${workingAction === "create-today-job" ? "Creating..." : "Use Today's Theme"}
            </button>
            <button type="button" className="button" onClick=${loadThemeFactory} disabled=${loading}>Refresh</button>
            <${Link} to="/" className="button-link">Workflow Console<//>
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
            <p className="summary-label">Special Themes</p>
            <p className="summary-value">${bucketCounts.special}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Current Events</p>
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
                    <p className="key-value">${humanize(resolvedTodayTheme.theme_bucket)}</p>
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
              <p className="section-copy">Source themes available for schedules, overrides, and direct daily resolution.</p>
            </div>
            <div className="inline-actions">
              <button type="button" className="button primary" onClick=${() => openThemeEditor()}>Add Theme</button>
            </div>
          </div>
          ${catalog.length === 0
            ? html`<p className="empty-state">No theme catalog entries found.</p>`
            : html`
                <div className="table-wrap">
                  <table className="console-table">
                    <thead>
                      <tr>
                        <th>theme_key</th>
                        <th>theme_name</th>
                        <th>theme_bucket</th>
                        <th>theme_type</th>
                        <th>audience</th>
                        <th>visual_style</th>
                        <th>priority</th>
                        <th>status</th>
                        <th>actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      ${catalog.map(
                        (theme) => html`
                          <tr key=${theme.id}>
                            <td><code>${theme.theme_key}</code></td>
                            <td>${theme.theme_name}</td>
                            <td>${humanize(theme.theme_bucket)}</td>
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
                        <th>month_mask</th>
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
                            <td>${(schedule.month_mask || []).join(", ") || "-"}</td>
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
                          <option value="special">special</option>
                          <option value="current_event">current_event</option>
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
        <aside className="console-sidebar">
          <p className="brand-overline">eCardFactory</p>
          <h1 className="brand-title">Internal Console</h1>
          <p className="brand-subtitle">Workflow-first operations panel</p>
          <nav className="sidebar-nav" aria-label="Primary">
            <${NavLink}
              to="/"
              end
              className=${({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Workflow Console
            <//>
            <${NavLink}
              to="/themes"
              className=${({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Theme Factory
            <//>
            <${NavLink}
              to="/compare"
              className=${({ isActive }) => (isActive ? "nav-link active" : "nav-link")}
            >
              Compare Lab
            <//>
          </nav>
        </aside>

        <main className="console-main">
          <${Routes}>
            <${Route} path="/" element=${html`<${WorkflowConsolePage} />`} />
            <${Route} path="/themes" element=${html`<${ThemeFactoryPage} />`} />
            <${Route} path="/compare" element=${html`<${CompareLabPage} />`} />
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
          <aside className="console-sidebar">
            <p className="brand-overline">eCardFactory</p>
            <h1 className="brand-title">Internal Console</h1>
            <p className="brand-subtitle">Workflow-first operations panel</p>
            <nav className="sidebar-nav" aria-label="Primary">
              <a className="nav-link active" href="/">Workflow Console</a>
              <a className="nav-link" href="/themes">Theme Factory</a>
              <a className="nav-link" href="/compare">Compare Lab</a>
            </nav>
          </aside>
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
