from decimal import Decimal
from pydantic import BaseModel, Field

class FarmerSummary(BaseModel):
    farmer_id: int
    full_name: str | None
    state_id: int
    district_id: int

    model_config = {"from_attributes": True}

class FarmerProfileUpdate(BaseModel):
    full_name: str | None = None
    age: int | None = Field(default=None, ge=18, le=100)
    gender: str | None = None
    marital_status: str | None = None
    education_level: str | None = None
    family_size: int | None = Field(default=None, ge=1, le=50)
    social_category: str | None = None
    differently_abled: bool | None = None
    state_id: int | None = None
    district_id: int | None = None
    pincode: int | None = Field(default=None, ge=100000, le=999999)
    address_line: str | None = None
    village: str | None = None
    block: str | None = None
    occupation: str | None = None
    annual_income_inr: Decimal | None = Field(default=None, ge=0)

    land_owned_acres: Decimal | None = Field(default=None, ge=0)
    land_ownership_type: str | None = None
    irrigated_acres: Decimal | None = Field(default=None, ge=0)
    unirrigated_acres: Decimal | None = Field(default=None, ge=0)
    irrigation_source: str | None = None
    primary_crop: str | None = None
    secondary_crop: str | None = None
    cropping_pattern: str | None = None
    soil_type: str | None = None
    farm_mechanization_level: str | None = None
    livestock_ownership: str | None = None
    dairy_poultry_involvement: str | None = None
    fisheries_involvement: str | None = None

    house_type: str | None = None
    electricity_conn: str | None = None
    lpg_conn: str | None = None
    drinking_water_source: str | None = None
    toilet_access: str | None = None
    vehicle_ownership: str | None = None
    bank_account: str | None = None
    kisan_credit_card: str | None = None
    existing_loan_indebtedness: str | None = None
    crop_insurance_pmfby: str | None = None
    aadhaar_linked: str | None = None
    ration_card_type: str | None = None
    income_certificate_avail: str | None = None
    land_record_avail: str | None = None
    caste_certificate_avail: str | None = None

class FarmerProfileResponse(BaseModel):
    farmer_id: int
    source_farmer_id: str
    full_name: str | None
    age: int | None
    gender: str | None
    state_id: int
    district_id: int
    pincode: int | None
    address_line: str | None
    village: str | None
    block: str | None
    occupation: str | None
    annual_income_inr: Decimal | None
    evi_score: Decimal | None
    evi_bucket: str | None

    model_config = {"from_attributes": True}
