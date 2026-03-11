(() => {
  const { useEffect, useMemo, useState } = React;
  const { BrowserRouter, Link, NavLink, Navigate, Route, Routes, useNavigate, useParams } = ReactRouterDOM;
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

  function WorkflowConsolePage() {
    const navigate = useNavigate();
    const [jobs, setJobs] = useState([]);
    const [storage, setStorage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [statusMessage, setStatusMessage] = useState("");
    const [createOpen, setCreateOpen] = useState(false);
    const [creating, setCreating] = useState(false);
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
      setLoading(true);
      setError("");
      try {
        const [jobsPayload, storagePayload] = await Promise.all([
          requestJSON("/api/jobs?limit=50"),
          requestJSON("/api/storage/summary"),
        ]);
        setJobs(Array.isArray(jobsPayload) ? jobsPayload : []);
        setStorage(storagePayload || null);
        setStatusMessage(`Refreshed ${new Date().toLocaleTimeString()}`);
      } catch (requestError) {
        setError(requestError.message);
      } finally {
        setLoading(false);
      }
    }

    useEffect(() => {
      loadDashboard();
    }, []);

    async function handleCreateJob(event) {
      event.preventDefault();
      setCreating(true);
      setError("");
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
        setError(requestError.message);
      } finally {
        setCreating(false);
      }
    }

    function updateField(key, value) {
      setFormValues((current) => ({ ...current, [key]: value }));
    }

    return html`
      <section>
        <header className="page-head">
          <div>
            <p className="page-kicker">Workflow</p>
            <h1 className="page-title">Workflow Console</h1>
            <p className="page-description">
              Internal operations dashboard for job lifecycle monitoring and intervention.
            </p>
          </div>
          <div className="inline-actions">
            <button type="button" className="button primary" onClick=${() => setCreateOpen(true)}>Create New Job</button>
            <button type="button" className="button" onClick=${loadDashboard} disabled=${loading}>Refresh</button>
            <${Link} to="/compare" className="button-link">Open Compare Lab<//>
          </div>
        </header>

        ${error ? html`<p className="status-line error">${error}</p>` : null}
        ${statusMessage ? html`<p className="status-line">${statusMessage}</p>` : null}

        <section className="cards-grid">
          <article className="summary-card">
            <p className="summary-label">Active Jobs</p>
            <p className="summary-value">${summary.active}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Completed Jobs</p>
            <p className="summary-value">${summary.completed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Failed Jobs</p>
            <p className="summary-value">${summary.failed}</p>
          </article>
          <article className="summary-card">
            <p className="summary-label">Storage Usage</p>
            <p className="summary-value">${storage ? formatBytes(storage.total_bytes) : "-"}</p>
          </article>
        </section>

        <section className="section-panel">
          <div className="section-head">
            <div>
              <h2 className="section-title">Recent Jobs</h2>
              <p className="section-copy">Newest 50 jobs from workflow backend.</p>
            </div>
          </div>
          ${jobs.length === 0
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
        setError(requestError.message);
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
      const contentGenerationStatus = job.content_preview ? "completed" : status.startsWith("content") ? "in_progress" : "pending";
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
        setError(requestError.message);
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
        setError(requestError.message);
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
                      <p className="section-copy">Persisted files and metadata references.</p>
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
                                <th>asset_url</th>
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
                    <h2 className="section-title">Preview and Final Images</h2>
                    <p className="section-copy">Inline preview assets if available.</p>
                  </div>
                </div>
                ${previewImages.length === 0
                  ? html`<p className="empty-state">No preview or final image available yet.</p>`
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

  function App() {
    return html`
      <${BrowserRouter}>
        <${AppFrame} />
      <//>
    `;
  }

  const rootNode = document.getElementById("root");
  const root = ReactDOM.createRoot(rootNode);
  root.render(html`<${App} />`);
})();
