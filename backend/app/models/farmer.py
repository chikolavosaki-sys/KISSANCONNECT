from decimal import Decimal
from sqlalchemy import Integer, Numeric, String, BigInteger, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class Farmer(Base):
    __tablename__ = "farmers"

    farmer_id: Mapped[int] = mapped_column(primary_key=True)
    source_farmer_id: Mapped[str] = mapped_column(String(100), unique=True)
    full_name: Mapped[str | None] = mapped_column(String(200))
    age: Mapped[int | None] = mapped_column(Integer)
    gender: Mapped[str | None] = mapped_column(String(40))
    marital_status: Mapped[str | None] = mapped_column(String(50))
    education_level: Mapped[str | None] = mapped_column(String(100))
    family_size: Mapped[int | None] = mapped_column(Integer)
    social_category: Mapped[str | None] = mapped_column(String(50))
    differently_abled: Mapped[bool | None]
    state_id: Mapped[int] = mapped_column(ForeignKey("states.state_id"))
    district_id: Mapped[int] = mapped_column(ForeignKey("districts.district_id"))
    pincode: Mapped[int | None] = mapped_column(Integer)
    address_line: Mapped[str | None]
    village: Mapped[str | None] = mapped_column(String(150))
    block: Mapped[str | None] = mapped_column(String(150))
    occupation: Mapped[str | None] = mapped_column(String(150))
    annual_income_inr: Mapped[Decimal | None] = mapped_column(Numeric(18,2))
    land_owned_acres: Mapped[Decimal | None] = mapped_column(Numeric(12,4))
    land_ownership_type: Mapped[str | None] = mapped_column(String(60))
    irrigated_acres: Mapped[Decimal | None] = mapped_column(Numeric(12,4))
    unirrigated_acres: Mapped[Decimal | None] = mapped_column(Numeric(12,4))
    irrigation_source: Mapped[str | None] = mapped_column(String(100))
    primary_crop: Mapped[str | None] = mapped_column(String(100))
    secondary_crop: Mapped[str | None] = mapped_column(String(100))
    cropping_pattern: Mapped[str | None] = mapped_column(String(100))
    soil_type: Mapped[str | None] = mapped_column(String(100))
    farm_mechanization_level: Mapped[str | None] = mapped_column(String(100))
    livestock_ownership: Mapped[str | None] = mapped_column(String(100))
    dairy_poultry_involvement: Mapped[str | None] = mapped_column(String(100))
    fisheries_involvement: Mapped[str | None] = mapped_column(String(100))
    house_type: Mapped[str | None] = mapped_column(String(100))
    electricity_conn: Mapped[str | None] = mapped_column(String(100))
    lpg_conn: Mapped[str | None] = mapped_column(String(100))
    drinking_water_source: Mapped[str | None] = mapped_column(String(100))
    toilet_access: Mapped[str | None] = mapped_column(String(100))
    vehicle_ownership: Mapped[str | None] = mapped_column(String(100))
    bank_account: Mapped[str | None] = mapped_column(String(100))
    kisan_credit_card: Mapped[str | None] = mapped_column(String(100))
    existing_loan_indebtedness: Mapped[str | None] = mapped_column(String(100))
    crop_insurance_pmfby: Mapped[str | None] = mapped_column(String(100))
    aadhaar_linked: Mapped[str | None] = mapped_column(String(100))
    ration_card_type: Mapped[str | None] = mapped_column(String(100))
    income_certificate_avail: Mapped[str | None] = mapped_column(String(100))
    land_record_avail: Mapped[str | None] = mapped_column(String(100))
    caste_certificate_avail: Mapped[str | None] = mapped_column(String(100))
    schemes_availed: Mapped[str | None]
    active_applications: Mapped[int | None] = mapped_column(Integer)
    bookmarked_schemes: Mapped[int | None] = mapped_column(Integer)

    evi_score: Mapped[Decimal | None] = mapped_column(Numeric(5, 2))
    evi_bucket: Mapped[str | None] = mapped_column(String(40))

    state = relationship("State", back_populates="farmers")
    district = relationship("District", back_populates="farmers")
    user = relationship("User", back_populates="farmer", uselist=False)
    applications = relationship("Application", back_populates="farmer")
    bookmarks = relationship("Bookmark", back_populates="farmer")
