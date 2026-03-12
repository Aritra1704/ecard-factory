#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORTS_FILE="${ROOT_DIR}/config/local.ports.env"

if [[ -f "${PORTS_FILE}" ]]; then
  # shellcheck source=/dev/null
  source "${PORTS_FILE}"
fi

CONTENTFORGE_HOST_BIND="${CONTENTFORGE_HOST_BIND:-0.0.0.0}"
CONTENTFORGE_PORT="${CONTENTFORGE_PORT:-8001}"
CONTENTFORGE_RELOAD="${CONTENTFORGE_RELOAD:-false}"

cd "${ROOT_DIR}"

if [[ -d "${ROOT_DIR}/venv" ]]; then
  # shellcheck source=/dev/null
  source "${ROOT_DIR}/venv/bin/activate"
fi

if [[ -f "${ROOT_DIR}/contentforge/main.py" ]]; then
  echo "Starting ContentForge on ${CONTENTFORGE_HOST_BIND}:${CONTENTFORGE_PORT} (reload=${CONTENTFORGE_RELOAD})"
  if [[ "${CONTENTFORGE_RELOAD}" == "true" ]]; then
    exec uvicorn contentforge.main:app --host "${CONTENTFORGE_HOST_BIND}" --port "${CONTENTFORGE_PORT}" --reload
  else
    exec uvicorn contentforge.main:app --host "${CONTENTFORGE_HOST_BIND}" --port "${CONTENTFORGE_PORT}"
  fi
fi

cat <<MSG
No standalone ContentForge service found at contentforge/main.py.
Current eCardFactory flow uses an internal stub ContentForge adapter.
Nothing to run separately.
MSG
