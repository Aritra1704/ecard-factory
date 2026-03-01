#!/bin/bash
TELEGRAM_BOT_TOKEN="${TELEGRAM_BOT_TOKEN}"
WEBHOOK_URL="https://ecard-factory-production.up.railway.app/telegram/webhook"
curl -X POST "https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/setWebhook" \
  -H "Content-Type: application/json" \
  -d "{\"url\": \"${WEBHOOK_URL}\"}"
echo ""
echo "Webhook registered: ${WEBHOOK_URL}"
