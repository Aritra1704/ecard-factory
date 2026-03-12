# Asset Storage v1

## Why Assets Are Outside The Repo

Generated previews, final images, and PDFs can be large and high-volume. Keeping them inside the Git repository causes:
- noisy untracked file churn
- accidental commits of generated binaries
- unnecessary repo growth

For v1, eCardFactory stores physical files only in an external storage root (`ASSET_STORAGE_ROOT`).

## Required Environment Variables

Set all three variables (no fallback defaults):

```env
ASSET_STORAGE_BACKEND=filesystem
ASSET_STORAGE_ROOT=/Volumes/Ari_SSD_01/ecardfactory-assets
ASSET_PUBLIC_BASE_URL=http://localhost:8080/assets
```

Validation behavior:
- `ASSET_STORAGE_BACKEND` must be `filesystem`.
- `ASSET_STORAGE_ROOT` must be an absolute path.
- Storage root inside the project repository is rejected at startup.

## Startup Validation

On app startup, eCardFactory:
1. resolves storage root from `ASSET_STORAGE_ROOT`
2. rejects repository-local roots
3. creates required folders if missing
4. verifies write access
5. logs selected backend and resolved root path

If root setup fails or is not writable, startup fails loudly.

## Filesystem Layout

All generated files are written under:
- `{ASSET_STORAGE_ROOT}/preview/`
- `{ASSET_STORAGE_ROOT}/image/`
- `{ASSET_STORAGE_ROOT}/final/`
- `{ASSET_STORAGE_ROOT}/pdf/`

Example:
- absolute path: `/Volumes/Ari_SSD_01/ecardfactory-assets/final/job_abc123_final.png`
- public URL: `http://localhost:8080/assets/final/job_abc123_final.png`

## FastAPI Asset Serving

`/assets` is mounted from `ASSET_STORAGE_ROOT` (not from repo-local `assets/`).

## DB Metadata And Cleanup

Each `card_assets` row stores metadata needed for lifecycle cleanup:
- `storage_backend`
- `storage_root`
- `relative_path`
- `public_url`
- `file_size_bytes`

Delete flow (`DELETE /api/jobs/{job_id}`):
1. delete job and related DB rows
2. use saved asset metadata to resolve physical file paths
3. remove physical files from storage root
4. return deleted file count

This keeps DB state and physical storage cleanup aligned.

## External SSD Setup (macOS)

1. Connect SSD (example mount: `/Volumes/Ari_SSD_01`).
2. Create root:
   - `mkdir -p /Volumes/Ari_SSD_01/ecardfactory-assets`
3. Verify write access:
   - `touch /Volumes/Ari_SSD_01/ecardfactory-assets/.write_test && rm /Volumes/Ari_SSD_01/ecardfactory-assets/.write_test`
4. Set env vars above.
5. Start eCardFactory.
