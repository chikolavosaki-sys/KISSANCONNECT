from collections.abc import Generator

from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import settings


def _normalize_database_url(url: str) -> str:
    """Ensure SQLAlchemy uses psycopg3 and Neon-compatible SSL settings."""
    normalized = url.strip()
    if normalized.startswith("postgresql://"):
        normalized = normalized.replace("postgresql://", "postgresql+psycopg://", 1)
    elif normalized.startswith("postgres://"):
        normalized = normalized.replace("postgres://", "postgresql+psycopg://", 1)

    # channel_binding=require breaks some local psycopg builds; sslmode=require is enough for Neon.
    normalized = normalized.replace("&channel_binding=require", "")
    normalized = normalized.replace("?channel_binding=require&", "?")
    normalized = normalized.replace("?channel_binding=require", "")
    return normalized


engine = create_engine(
    _normalize_database_url(settings.database_url),
    pool_pre_ping=True,
)
SessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)

class Base(DeclarativeBase):
    pass

def get_db() -> Generator[Session, None, None]:
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
