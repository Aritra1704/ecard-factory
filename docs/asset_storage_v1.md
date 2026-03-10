# Asset Storage v1

## Purpose

eCardFactory v1 stores generated workflow assets through a configurable storage backend.
Current backend: `filesystem`.

This allows immediate use of an external SSD and keeps business logic ready for future cloud storage backends.

## Environment Variables

Add these values to `.env`:

```env
ASSET_STORAGE_BACKEND=filesystem
ASSET_STORAGE_ROOT=/Volumes/Ari_SSD_01/ecardfactory-assets
ASSET_PUBLIC_BASE_URL=http://localhost:8080/assets
```

Notes:
- `ASSET_STORAGE_BACKEND` currently supports `filesystem`.
- `ASSET_STORAGE_ROOT` can point to any writable local path, including external SSD.
- `ASSET_PUBLIC_BASE_URL` must match your API host/port that serves `/assets`.

## Directory Structure

Under `ASSET_STORAGE_ROOT`, eCardFactory creates:

- `preview/`
- `image/`
- `final/`
- `pdf/`

Example files:

- `preview/{job_id}_content_preview.png`
- `image/{job_id}_image_preview.png`
- `final/{job_id}_final.png`
- `pdf/{job_id}_final.pdf`

## External SSD Setup (macOS)

1. Connect and mount the SSD (example mount: `/Volumes/Ari_SSD_01`).
2. Create the storage root:
   - `mkdir -p /Volumes/Ari_SSD_01/ecardfactory-assets`
3. Ensure your user has write access:
   - `touch /Volumes/Ari_SSD_01/ecardfactory-assets/.write_test && rm /Volumes/Ari_SSD_01/ecardfactory-assets/.write_test`
4. Set `.env` values shown above.
5. Start eCardFactory.

On startup, eCardFactory:
- creates required subdirectories if missing
- validates writability
- logs selected backend and root path
- fails startup if storage root is not writable

## API and Serving

- Final approval writes real final assets to configured storage root.
- FastAPI serves files at `/assets` from `ASSET_STORAGE_ROOT`.
- Storage debug endpoint:
  - `GET /api/storage/health`
  - returns backend, root path, writable status.

## Migration Notes (Future Cloud Backends)

The storage abstraction (`app/storage`) isolates backend-specific logic.
To add a new backend (S3, R2, Supabase):

1. Implement the storage interface methods.
2. Add backend selection in the storage factory.
3. Keep workflow service logic unchanged.

Current DB metadata in `card_assets` supports:
- `asset_type`
- `relative_path`
- `absolute_path` (optional)
- `public_url`
- `created_at`
