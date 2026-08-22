from datetime import datetime
from sqlalchemy import BigInteger, ForeignKey, String, Text
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
    submitted_at: Mapped[datetime | None]
    reviewed_at: Mapped[datetime | None]
    reviewed_by: Mapped[int | None] = mapped_column(ForeignKey("users.user_id"))
    remarks: Mapped[str | None] = mapped_column(Text)

    farmer = relationship("Farmer", back_populates="applications")
    scheme = relationship("Scheme", back_populates="applications")
