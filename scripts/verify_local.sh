#!/usr/bin/env bash

set -u -o pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

if [ ! -d "venv" ]; then
  python3 -m venv venv
fi

# shellcheck disable=SC1091
source venv/bin/activate

if pip install -r requirements.txt && pytest tests/ --cov=app --cov-report=term-missing; then
  echo "PASS"
else
  echo "FAIL"
  exit 1
fi
