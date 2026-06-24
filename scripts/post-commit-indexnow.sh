#!/usr/bin/env bash
# Auto-ping IndexNow after every commit that changes files under src/, public/, or content/.
# Install with: ln -s ../../scripts/post-commit-indexnow.sh .git/hooks/post-commit
# Or:           (cd .git/hooks && ln -sf ../../scripts/post-commit-indexnow.sh post-commit)

set -e

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

changed=$(git diff --name-only --diff-filter=ACMRT HEAD@{1} HEAD 2>/dev/null || git diff --name-only --cached --diff-filter=ACMRT)
filtered=$(printf '%s\n' "$changed" | awk '/^(src\/(content|pages|layouts|lib)|public\/)/ {print}' || true)

if [ -z "$filtered" ]; then
  exit 0
fi

echo "[post-commit] detected changes in tracked content; pinging IndexNow..."
node scripts/indexnow.mjs --auto --dry-run || true