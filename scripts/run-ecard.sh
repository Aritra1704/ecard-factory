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

if [[ -d "${ROOT_DIR}/venv" ]]; then
  # shellcheck source=/dev/null
  source "${ROOT_DIR}/venv/bin/activate"
fi

export APP_PORT="${ECARD_PORT}"

echo "Starting eCardFactory on ${ECARD_HOST_BIND}:${ECARD_PORT} (reload=${ECARD_RELOAD})"

if [[ "${ECARD_RELOAD}" == "true" ]]; then
  exec uvicorn app.main:app --host "${ECARD_HOST_BIND}" --port "${ECARD_PORT}" --reload
else
  exec uvicorn app.main:app --host "${ECARD_HOST_BIND}" --port "${ECARD_PORT}"
fi
