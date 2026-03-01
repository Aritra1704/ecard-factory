#!/usr/bin/env bash

set -euo pipefail

if [[ -f ".env" ]]; then
  set -a
  # shellcheck disable=SC1091
  source ".env"
  set +a
fi

APP_URL="${RAILWAY_PUBLIC_URL:-${RAILWAY_STATIC_URL:-${APP_PUBLIC_URL:-}}}"

if [[ -z "${APP_URL}" ]]; then
  echo "Missing app URL. Set one of: RAILWAY_PUBLIC_URL, RAILWAY_STATIC_URL, APP_PUBLIC_URL."
  exit 1
fi

APP_URL="${APP_URL%/}"

curl --fail --silent --show-error \
  --request POST \
  --header "Content-Type: application/json" \
  --data "{\"public_base_url\":\"${APP_URL}\"}" \
  "${APP_URL}/telegram/setup-webhook"

echo
echo "Telegram webhook registered against ${APP_URL}/telegram/webhook"
