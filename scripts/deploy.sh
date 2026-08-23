#!/usr/bin/env bash
# Deploy the frontend to Vercel. Deploy the backend separately from Render's
# dashboard using backend/render.yaml, where its secret environment variables
# can remain outside the repository.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

if [ -z "${VITE_API_URL:-}" ]; then
  echo "VITE_API_URL is required (for example: https://your-api.onrender.com/api)."
  echo "Export it before running this script; the value is embedded in the frontend build."
  exit 1
fi

case "$VITE_API_URL" in
  http://*|https://*) ;;
  *)
    echo "VITE_API_URL must be an absolute http(s) API URL."
    exit 1
    ;;
esac

echo "==> Building and deploying frontend to Vercel"
cd "$ROOT/frontend"
npm run build

npx vercel --prod --build-env "VITE_API_URL=$VITE_API_URL"

echo ""
echo "Frontend deployed with VITE_API_URL=$VITE_API_URL"
echo "In Render, set DATABASE_URL and CORS_ORIGINS to the Vercel production URL."
