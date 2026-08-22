#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

echo "==> Setting up backend"
cd "$ROOT/backend"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python scripts/init_db.py
python scripts/seed_data.py

echo "==> Setting up frontend"
cd "$ROOT/frontend"
if [ ! -f .env ]; then
  cp .env.example .env
  echo "VITE_API_URL=http://127.0.0.1:8000/api" >> .env
fi
npm install

echo ""
echo "Setup complete."
echo "Start backend:  cd backend && source .venv/bin/activate && python run.py"
echo "Start frontend: cd frontend && npm run dev"
echo "Or use Docker:  docker compose up --build"
