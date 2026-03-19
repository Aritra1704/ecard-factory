#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORTS_FILE="${ROOT_DIR}/config/local.ports.env"

if [[ -f "${PORTS_FILE}" ]]; then
  # shellcheck source=/dev/null
  source "${PORTS_FILE}"
fi

ECARD_HOST_BIND="${ECARD_HOST_BIND:-0.0.0.0}"
ECARD_PORT="${ECARD_PORT:-8080}"
ECARD_RELOAD="${ECARD_RELOAD:-false}"
ECARD_ENABLE_LEGACY_FRONTEND="${ECARD_ENABLE_LEGACY_FRONTEND:-true}"

cd "${ROOT_DIR}"

PYTHON_BIN=""
if [[ -d "${ROOT_DIR}/venv" ]]; then
  # shellcheck source=/dev/null
  source "${ROOT_DIR}/venv/bin/activate"
  if [[ -x "${ROOT_DIR}/venv/bin/python" ]]; then
    PYTHON_BIN="${ROOT_DIR}/venv/bin/python"
  fi
fi

CONSOLE_INDEX="${ROOT_DIR}/app/static/console/index.html"
CONSOLE_BUNDLE="${ROOT_DIR}/app/static/console/app.js"
CONSOLE_STYLESHEET="${ROOT_DIR}/app/static/console/console.css"

if [[ "${ECARD_ENABLE_LEGACY_FRONTEND}" == "true" ]]; then
  if [[ -f "${CONSOLE_INDEX}" && -f "${CONSOLE_BUNDLE}" && -f "${CONSOLE_STYLESHEET}" ]]; then
    echo "Legacy console fallback is available at the backend root."
    echo "Use 'npm run build:console' only when you intentionally want to refresh the fallback bundle."
  else
    echo "Legacy console fallback is enabled but frontend assets are incomplete." >&2
    echo "Backend APIs will still start. Use the standalone UI from ../content_engine_ui or rebuild the fallback with 'npm run build:console'." >&2
  fi
else
  echo "Legacy console fallback is disabled (ECARD_ENABLE_LEGACY_FRONTEND=${ECARD_ENABLE_LEGACY_FRONTEND})."
  echo "Use the standalone UI from ../content_engine_ui."
fi

export APP_PORT="${ECARD_PORT}"
export ECARD_ENABLE_LEGACY_FRONTEND

echo "Starting eCardFactory on ${ECARD_HOST_BIND}:${ECARD_PORT} (reload=${ECARD_RELOAD})"

if [[ -n "${PYTHON_BIN}" ]]; then
  if [[ "${ECARD_RELOAD}" == "true" ]]; then
    exec "${PYTHON_BIN}" -m uvicorn app.main:app --host "${ECARD_HOST_BIND}" --port "${ECARD_PORT}" --reload
  else
    exec "${PYTHON_BIN}" -m uvicorn app.main:app --host "${ECARD_HOST_BIND}" --port "${ECARD_PORT}"
  fi
fi

if [[ "${ECARD_RELOAD}" == "true" ]]; then
  exec uvicorn app.main:app --host "${ECARD_HOST_BIND}" --port "${ECARD_PORT}" --reload
else
  exec uvicorn app.main:app --host "${ECARD_HOST_BIND}" --port "${ECARD_PORT}"
fi
