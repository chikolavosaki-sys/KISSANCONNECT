from decimal import Decimal
from pydantic import BaseModel, Field

class RegisterRequest(BaseModel):
    phone: str = Field(min_length=10, max_length=30)
    password: str = Field(min_length=8, max_length=128)
    farmer_id: int | None = None

class NewFarmerRegisterRequest(BaseModel):
    phone: str = Field(min_length=10, max_length=30)
    password: str = Field(min_length=8, max_length=128)
    full_name: str = Field(min_length=2, max_length=200)
    age: int = Field(ge=18, le=100)
    gender: str
    state_id: int
    district_id: int
    pincode: int = Field(ge=100000, le=999999)
    address_line: str
    village: str | None = None
    block: str | None = None
    occupation: str | None = None
    annual_income_inr: Decimal | None = Field(default=None, ge=0)
    social_category: str | None = None

class LoginRequest(BaseModel):
    phone: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    user_id: int
