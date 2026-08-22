from datetime import datetime
from decimal import Decimal

from sqlalchemy import ForeignKey, Numeric, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Application(Base):
    __tablename__ = "applications"

    application_id: Mapped[int] = mapped_column(primary_key=True)
    farmer_id: Mapped[int] = mapped_column(ForeignKey("farmers.farmer_id"))
    scheme_id: Mapped[int] = mapped_column(ForeignKey("schemes.scheme_id"))
    status: Mapped[str] = mapped_column(String(30), default="draft")
    application_data: Mapped[dict] = mapped_column(JSONB, default=dict)
    submitted_at: Mapped[datetime | None] = mapped_column(default=None)
    reviewed_at: Mapped[datetime | None] = mapped_column(default=None)
    reviewed_by: Mapped[int | None] = mapped_column(ForeignKey("users.user_id"))
    remarks: Mapped[str | None] = mapped_column(Text)
    match_score: Mapped[Decimal | None] = mapped_column(Numeric(6, 5))
    matched_keywords: Mapped[list] = mapped_column(JSONB, default=list)
    missing_keywords: Mapped[list] = mapped_column(JSONB, default=list)

    farmer = relationship("Farmer", back_populates="applications")
    scheme = relationship("Scheme", back_populates="applications")
