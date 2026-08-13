from sqlalchemy import Column, Integer, String, Float, Boolean, DateTime, ForeignKey
from sqlalchemy.sql import func

from app.db.session import Base


class Farmer(Base):
    __tablename__ = "farmers"

    id = Column(Integer, primary_key=True, index=True)

    # Identity
    full_name = Column(String, nullable=False)
    phone = Column(String, unique=True, index=True, nullable=False)
    aadhaar_hash = Column(String, nullable=True)  # store hashed, never raw
    gender = Column(String, nullable=True)
    date_of_birth = Column(DateTime, nullable=True)

    # Location
    state = Column(String, nullable=False)
    district_id = Column(Integer, ForeignKey("districts.id"), nullable=False)
    village = Column(String, nullable=True)
    pincode = Column(String, nullable=True)

    # Land / agriculture
    land_size_acres = Column(Float, nullable=True)
    land_ownership_type = Column(String, nullable=True)  # owned / leased / sharecropped
    primary_crop = Column(String, nullable=True)
    irrigation_type = Column(String, nullable=True)  # canal / borewell / rainfed / drip

    # Livestock
    owns_livestock = Column(Boolean, default=False)
    livestock_count = Column(Integer, nullable=True)

    # Economic asset proxies (feed EVI engine)
    has_electricity = Column(Boolean, default=False)
    has_lpg = Column(Boolean, default=False)
    house_type = Column(String, nullable=True)  # kutcha / semi-pucca / pucca
    owns_vehicle = Column(Boolean, default=False)
    has_bank_account = Column(Boolean, default=False)
    has_kcc = Column(Boolean, default=False)  # Kisan Credit Card

    # Computed
    evi_score = Column(Float, nullable=True)
    evi_tier = Column(String, nullable=True)

    created_at = Column(DateTime(timezone=True), server_default=func.now())
    updated_at = Column(DateTime(timezone=True), onupdate=func.now())

    # NOTE: extend to full 40+ field schema per project handoff doc
