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

  function resolvePrimaryImageUrl(job) {
    if (!job || typeof job !== "object") {
      return "";
    }
    if (job.final_preview_url) {
      return job.final_preview_url;
    }
    if (job.final_asset_urls && typeof job.final_asset_urls === "object" && job.final_asset_urls.png) {
      return job.final_asset_urls.png;
    }
    if (job.image_preview_url) {
      return job.image_preview_url;
    }
    return "";
  }

  function GeneratedECardTile({ job, actionState, onArchive, onDelete }) {
    const imageUrl = resolvePrimaryImageUrl(job);
    const contentFallback = truncateText(job.content_preview || "Content preview will appear here after generation.", 180);

    return html`
      <article className="ecard-tile">
        <div className="ecard-media">
          ${imageUrl
            ? html`<img src=${imageUrl} alt=${job.theme_name || "Generated eCard"} loading="lazy" />`
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
            ${imageUrl
              ? html`<a href=${imageUrl} target="_blank" rel="noreferrer" className="button-link">Open Image</a>`
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

      const [jobsResult, storageResult, scheduleResult, todayResult] = await Promise.allSettled([
        requestJSON("/api/jobs?limit=50"),
        requestJSON("/api/storage/summary"),
        requestJSON("/api/themes"),
        requestJSON("/api/themes/today"),
      ]);

      if (jobsResult.status === "fulfilled") {
        setJobs(Array.isArray(jobsResult.value) ? jobsResult.value : []);
      } else {
        setJobs([]);
        setJobsError(jobsResult.reason?.message || "Unable to load jobs");
      }

      if (storageResult.status === "fulfilled") {
        setStorage(storageResult.value || null);
      } else {
        setStorage(null);
        setStorageError(storageResult.reason?.message || "Unable to load storage summary");
      }

      if (scheduleResult.status === "fulfilled") {
        const scheduleRows = Array.isArray(scheduleResult.value?.schedule) ? scheduleResult.value.schedule : [];
        setThemeSchedule(scheduleRows);
      } else {
        setThemeSchedule([]);
        setThemeError(scheduleResult.reason?.message || "Unable to load weekly theme schedule");
      }

      if (todayResult.status === "fulfilled") {
        setTodayTheme(todayResult.value?.theme || null);
      } else {
        setTodayTheme(null);
        setThemeError(todayResult.reason?.message || "Unable to load today's theme");
      }

      setJobsLoading(false);
      setStorageLoading(false);
      setThemeLoading(false);
      const hasFailures =
        jobsResult.status !== "fulfilled" ||
        storageResult.status !== "fulfilled" ||
        scheduleResult.status !== "fulfilled" ||
        todayResult.status !== "fulfilled";
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
                  ? html`<div className="status-panel warning">Loading themes from /api/themes...</div>`
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
                ${todayTheme
                  ? `Today's Theme: ${todayTheme.theme_name} (${humanize(todayTheme.weekday)})`
                  : "Today's Theme: Unavailable"}
              </p>
            </div>
            <div className="inline-actions">
              <button
                type="button"
                className="button primary"
                onClick=${handleGenerateTodayCard}
                disabled=${creatingThemeJob || themeLoading || Boolean(themeError)}
              >
                ${creatingThemeJob ? "Generating..." : "Generate Today's Card"}
              </button>
            </div>
          </div>
          ${themeLoading
            ? html`<p className="empty-state">Loading weekly schedule...</p>`
            : themeSchedule.length === 0
              ? html`<p className="empty-state">No theme schedule found.</p>`
              : html`
                  <div className="table-wrap">
                    <table className="console-table">
                      <thead>
                        <tr>
                          <th>weekday</th>
                          <th>theme_name</th>
                          <th>tone_style</th>
                          <th>funny %</th>
                          <th>emotion %</th>
                        </tr>
                      </thead>
                      <tbody>
                        ${themeSchedule.map(
                          (row) => html`
                            <tr key=${row.weekday}>
                              <td>${humanize(row.weekday)}</td>
                              <td>${row.theme_name || "-"}</td>
                              <td>${row.tone_style || "-"}</td>
                              <td>${row.tone_funny_pct ?? "-"}</td>
                              <td>${row.tone_emotion_pct ?? "-"}</td>
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
        const [jobPayload, assetPayload, eventPayload] = await Promise.all([
          requestJSON(`/api/jobs/${jobId}`),
          requestJSON(`/api/jobs/${jobId}/assets`),
          requestJSON(`/api/jobs/${jobId}/events`),
        ]);
        setJob(jobPayload || null);
        setAssets(Array.isArray(assetPayload) ? assetPayload : []);
        setEvents(Array.isArray(eventPayload) ? eventPayload : []);
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
      const rows = [];
      const seen = new Set();
      const pushIfPresent = (label, url) => {
        if (!url || seen.has(url)) {
          return;
        }
        seen.add(url);
        rows.push({ label, url });
      };

      pushIfPresent("Image Preview", job.image_preview_url);
      pushIfPresent("Final Preview", job.final_preview_url);
      if (job.final_asset_urls && typeof job.final_asset_urls === "object") {
        pushIfPresent("Final PNG", job.final_asset_urls.png);
      }
      return rows;
    }, [job]);

    const finalCardUrl = job ? resolvePrimaryImageUrl(job) : "";

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
                    <h2 className="section-title">Generated Card Preview</h2>
                    <p className="section-copy">Best available final or preview image for this job.</p>
                  </div>
                </div>
                ${finalCardUrl
                  ? html`
                      <div className="hero-preview">
                        <a href=${finalCardUrl} target="_blank" rel="noreferrer">
                          <img src=${finalCardUrl} alt=${job.theme_name || "Generated eCard"} loading="lazy" />
                        </a>
                      </div>
                    `
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
                  ${job.image_preview_url
                    ? html`
                        <div className="image-grid image-grid-single">
                          <article className="image-card">
                            <a href=${job.image_preview_url} target="_blank" rel="noreferrer">
                              <img src=${job.image_preview_url} alt="Image Preview" loading="lazy" />
                            </a>
                            <p className="image-caption">Image Preview</p>
                          </article>
                        </div>
                      `
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
                    <p className="section-copy">All preview variants and exported images discovered on this job.</p>
                  </div>
                </div>
                ${previewImages.length === 0
                  ? html`<p className="empty-state">No preview variants available yet.</p>`
                  : html`
                      <div className="image-grid">
                        ${previewImages.map(
                          (image) => html`
                            <article key=${image.url} className="image-card">
                              <a href=${image.url} target="_blank" rel="noreferrer">
                                <img src=${image.url} alt=${image.label} loading="lazy" />
                              </a>
                              <p className="image-caption">${image.label}</p>
                            </article>
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
