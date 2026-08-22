#!/usr/bin/env bash
# Deploy frontend to Vercel and backend to Render.
# Prerequisites: npm, vercel CLI (npm i -g vercel), render CLI optional.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Deploying frontend to Vercel (from frontend/)"
cd "$ROOT/frontend"
npm run build

if ! command -v vercel >/dev/null 2>&1; then
  echo "Installing Vercel CLI..."
  npm install -g vercel
fi

vercel --prod

echo ""
echo "After frontend deploy, set VITE_API_URL in Vercel project settings to your backend URL."
echo "Backend: deploy backend/ to Render using render.yaml, or run: docker compose up backend"
