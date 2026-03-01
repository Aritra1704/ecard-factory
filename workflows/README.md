# n8n Workflows

## Import

1. Open n8n.
2. Go to `Workflows`.
3. Choose `Import from File`.
4. Select [daily_card_generation.json](/Users/aritrarpal/Documents/workspace_biz/ecard-factory/workflows/daily_card_generation.json).
5. Save the workflow before activating it.

The workflow JSON targets the FastAPI API that exists in this repo today. That means it uses:

- `GET /theme/today`
- `POST /cards/create`
- `POST /generation/phrases`
- `POST /generation/dalle-prompt`
- `POST /generation/image`
- `POST /assembly/preview`
- `POST /assembly/card`
- `POST /telegram/phrase-approval`
- `POST /telegram/image-approval`
- `POST /telegram/final-approval`
- `POST /telegram/notify`

## Credentials

This workflow does not require n8n credential objects if it runs inside the same private network as the app and can reach `http://ecard-factory:8000`.

If your n8n deployment is outside that network:

1. Replace `http://ecard-factory:8000` with the Railway public URL.
2. Add the required auth headers if you later put the API behind authentication.

## Webhook Setup

Telegram must send updates to the FastAPI app, not directly to n8n.

Why:
- The app already owns `POST /telegram/webhook`.
- That endpoint updates card status in Postgres.
- The workflow then resumes by polling `GET /cards/{id}` during each approval gate.

To register the Telegram webhook against the Railway app URL, run:

```bash
./scripts/setup_telegram_webhook.sh
```

The script calls `POST /telegram/setup-webhook`, which then calls Telegram `setWebhook` using the bot token configured in the app.

## Approval Gates

There are 3 gates in the workflow:

1. Phrase approval
   The workflow sends all generated phrases to Telegram and stores them on the card record. The bot command `/approve_phrase_{card_id}_{index}` updates the card to `phrase_approved`.

2. Image approval
   The workflow sends the generated DALL-E image to Telegram. The bot command `/approve_image_{card_id}` updates the card to `image_approved`.

3. Final approval
   The workflow assembles a preview JPEG, sends it to Telegram, and waits for `/approve_final_{card_id}`. The bot command marks the card `published`, and the workflow then renders the final full-quality PNG and patches the final status.

The imported workflow uses `Wait` nodes plus card-status polling. That is intentional. n8n mid-workflow webhook gates are possible, but they do not line up cleanly with the current FastAPI-owned Telegram webhook architecture. Polling keeps the workflow compatible with the app as it exists now.

## Configure Webhook URLs

You need these URLs aligned:

- Telegram webhook target: `https://<your-app-domain>/telegram/webhook`
- FastAPI app public base URL: `https://<your-app-domain>`
- n8n internal API targets in the workflow: `http://ecard-factory:8000`

If you deploy n8n outside the private network, update each HTTP Request node to use the public app URL instead.

## Common Issues

`theme/today` fails:
- Confirm the app is reachable at `http://ecard-factory:8000`.
- Confirm migrations are applied and the `ecard_factory` schema exists.

Phrase or image approvals never progress:
- Confirm Telegram webhook setup succeeded.
- Confirm Telegram commands are reaching `POST /telegram/webhook`.
- Confirm card status changes in `GET /cards/{id}` after you reply in Telegram.

Preview upload fails:
- Confirm the preview node returns binary data.
- Confirm `/telegram/final-approval` receives a base64 payload, not raw binary.

Workflow loops forever:
- Check whether the Telegram webhook is updating the card status.
- Check whether the correct approval command was used for that card id.
- Check the 24-hour timeout notification nodes to see whether the gate has already expired.

Import fails:
- Re-import the raw JSON file without editing it in a text editor that rewrites quotes or escapes.
- Use a current n8n build; the workflow uses `scheduleTrigger`, `wait`, `httpRequest`, `code`, and `if` nodes with current JSON export structure.
