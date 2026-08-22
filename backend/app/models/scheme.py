from decimal import Decimal
from sqlalchemy import Integer, Numeric, String, Text
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class Scheme(Base):
    __tablename__ = "schemes"

    scheme_id: Mapped[int] = mapped_column(primary_key=True)
    source_scheme_id: Mapped[str | None] = mapped_column(String(100), unique=True)
    scheme_name: Mapped[str] = mapped_column(String(300))
    level: Mapped[str] = mapped_column(String(30))
    issuing_ministry: Mapped[str | None] = mapped_column(String(300))
    applicable_state: Mapped[str | None] = mapped_column(String(120))
    min_land_acres: Mapped[Decimal | None] = mapped_column(Numeric(12,4))
    max_land_acres: Mapped[Decimal | None] = mapped_column(Numeric(12,4))
    income_ceiling_inr: Mapped[Decimal | None] = mapped_column(Numeric(18,2))
    category_restriction: Mapped[str | None] = mapped_column(String(200))
    gender_restriction: Mapped[str | None] = mapped_column(String(100))
    age_min: Mapped[int | None] = mapped_column(Integer)
    age_max: Mapped[int | None] = mapped_column(Integer)
    occupation_requirement: Mapped[str | None] = mapped_column(Text)
    benefit_type: Mapped[str | None] = mapped_column(String(150))
    benefit_amount_inr: Mapped[str | None] = mapped_column(Text)
    required_documents: Mapped[str | None] = mapped_column(Text)
    sector_tags: Mapped[str | None] = mapped_column(Text)
    description: Mapped[str | None] = mapped_column(Text)
    deadline_or_status: Mapped[str | None] = mapped_column(String(150))
    official_url: Mapped[str | None] = mapped_column(Text)

    applications = relationship("Application", back_populates="scheme")
    bookmarks = relationship("Bookmark", back_populates="scheme")
