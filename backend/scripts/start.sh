#!/usr/bin/env sh
# Container entrypoint. Database setup is safe to repeat because the schema,
# migrations, and seed script all use idempotent operations.
set -eu

if [ "${RUN_DB_INIT:-true}" = "true" ]; then
  echo "Preparing database schema and migrations..."
  python scripts/init_db.py
fi

if [ "${SEED_DEMO_DATA:-true}" = "true" ]; then
  echo "Seeding demo reference data..."
  python scripts/seed_data.py
fi

exec python run.py
