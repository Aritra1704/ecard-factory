#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
PORTS_FILE="${ROOT_DIR}/config/local.ports.env"

if [[ -f "${PORTS_FILE}" ]]; then
  # shellcheck source=/dev/null
  source "${PORTS_FILE}"
fi

N8N_PORT="${N8N_PORT:-5678}"
N8N_TIMEZONE="${N8N_TIMEZONE:-Asia/Kolkata}"
N8N_DATA_DIR="${N8N_DATA_DIR:-$HOME/.n8n}"
ECARD_PORT="${ECARD_PORT:-8080}"
ECARD_BASE_URL="${ECARD_BASE_URL:-http://host.docker.internal:${ECARD_PORT}}"

mkdir -p "${N8N_DATA_DIR}"

echo "Starting n8n on 0.0.0.0:${N8N_PORT}"
echo "ECARDFACTORY_BASE_URL=${ECARD_BASE_URL}"

exec docker run --rm -it \
  --name n8n \
  -p "${N8N_PORT}:5678" \
  -e N8N_SECURE_COOKIE=false \
  -e GENERIC_TIMEZONE="${N8N_TIMEZONE}" \
  -e ECARDFACTORY_BASE_URL="${ECARD_BASE_URL}" \
  -v "${N8N_DATA_DIR}:/home/node/.n8n" \
  n8nio/n8n
