"""Create all tables and apply SQL migrations."""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from sqlalchemy import text

from app.core.database import Base, engine
from app.models import (  # noqa: F401 — register models with Base.metadata
    Application,
    AuditLog,
    Bookmark,
    District,
    Farmer,
    Scheme,
    State,
    User,
)

MIGRATION_FILES = [
    "002_matching_fields.sql",
    "003_farmer_profile_fields.sql",
]


def run_sql_file(path: Path) -> None:
    sql = path.read_text(encoding="utf-8")
    with engine.begin() as conn:
        conn.execute(text(sql))
    print(f"Applied {path.name}")


def main() -> None:
    print("Creating tables from SQLAlchemy models...")
    Base.metadata.create_all(bind=engine)
    print("Base schema created.")

    migrations_dir = Path(__file__).resolve().parents[1] / "alembic" / "versions"
    for name in MIGRATION_FILES:
        path = migrations_dir / name
        if path.exists():
            run_sql_file(path)

    with engine.connect() as conn:
        tables = conn.execute(
            text(
                "SELECT tablename FROM pg_tables "
                "WHERE schemaname = 'public' ORDER BY tablename"
            )
        ).scalars().all()
    print("Tables:", ", ".join(tables))


if __name__ == "__main__":
    main()
