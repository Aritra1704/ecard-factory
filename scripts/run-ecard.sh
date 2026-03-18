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

cd "${ROOT_DIR}"

PYTHON_BIN=""
if [[ -d "${ROOT_DIR}/venv" ]]; then
  # shellcheck source=/dev/null
  source "${ROOT_DIR}/venv/bin/activate"
  if [[ -x "${ROOT_DIR}/venv/bin/python" ]]; then
    PYTHON_BIN="${ROOT_DIR}/venv/bin/python"
  fi
fi

CONSOLE_BUNDLE="${ROOT_DIR}/app/static/console/app.js"

if command -v npm >/dev/null 2>&1; then
  if [[ ! -d "${ROOT_DIR}/node_modules" ]]; then
    echo "Installing console frontend dependencies..."
    (cd "${ROOT_DIR}" && npm install)
  fi

  echo "Building local console frontend bundle..."
  (cd "${ROOT_DIR}" && npm run build:console)
elif [[ ! -f "${CONSOLE_BUNDLE}" ]]; then
  echo "npm is required to build the local console bundle and no prebuilt bundle was found."
  echo "Install Node.js/npm, then run: npm install && npm run build:console"
  exit 1
else
  echo "npm not found; using existing prebuilt console bundle: ${CONSOLE_BUNDLE}"
fi

export APP_PORT="${ECARD_PORT}"

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
