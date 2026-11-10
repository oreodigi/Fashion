#!/usr/bin/env bash
# Deploy GitHub main to the isolated tejum.in/fashion/ directory.
set -Eeuo pipefail
export PATH="/opt/cpanel/ea-nodejs22/bin:/usr/local/cpanel/3rdparty/lib/path-bin:/usr/bin:/bin:/usr/local/bin:$PATH"
APP_DIR="/home/tejum/fashion-source"
WEB_DIR="/home/tejum/public_html/fashion"
REVISION_FILE="$APP_DIR/.deployed-revision"

cd "$APP_DIR"
exec 9>"$APP_DIR/.deploy.lock"
flock -n 9 || exit 0

git fetch --quiet origin main
LATEST="$(git rev-parse origin/main)"
CURRENT="$(cat "$REVISION_FILE" 2>/dev/null || true)"
if [[ "$LATEST" == "$CURRENT" && -f "$WEB_DIR/index.html" ]]; then
  exit 0
fi

echo "Deploying fashion revision ${LATEST:0:12}"
# GitHub main is the source of truth; only this dedicated project worktree is reset.
git reset --hard origin/main
npm ci --no-audit --no-fund
npm run build
test -s dist/index.html
install -d -m 755 "$WEB_DIR"
# The deletion scope is only the newly-created /fashion/ web directory.
rsync -a --delete dist/ "$WEB_DIR/"
find "$WEB_DIR" -type d -exec chmod 755 {} +
find "$WEB_DIR" -type f -exec chmod 644 {} +
printf '%s\n' "$LATEST" > "$REVISION_FILE"
echo "Fashion deployed: $LATEST"
