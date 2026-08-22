from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.core.database import get_db
from app.core.security import create_access_token, hash_password, verify_password
from app.models.user import User
from app.models.farmer import Farmer
from app.models.state import State
from app.models.district import District
from app.schemas.auth import RegisterRequest, NewFarmerRegisterRequest, LoginRequest, TokenResponse
from app.schemas.farmer import FarmerProfileUpdate

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=TokenResponse)
def register(payload: RegisterRequest, db: Session = Depends(get_db)):
    if db.scalar(select(User).where(User.phone == payload.phone)):
        raise HTTPException(status_code=409, detail="Phone already registered")

    farmer = None
    if payload.farmer_id is not None:
        farmer = db.get(Farmer, payload.farmer_id)
        if not farmer:
            raise HTTPException(status_code=404, detail="Farmer profile not found")
        if farmer.user:
            raise HTTPException(status_code=409, detail="Farmer already has an account")

    user = User(
        farmer_id=payload.farmer_id,
        phone=payload.phone,
        password_hash=hash_password(payload.password),
        role="farmer",
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return TokenResponse(
        access_token=create_access_token(user.user_id, user.role),
        role=user.role,
        user_id=user.user_id,
    )

@router.post("/register/new", response_model=TokenResponse)
def register_new_farmer(payload: NewFarmerRegisterRequest, db: Session = Depends(get_db)):
    if db.scalar(select(User).where(User.phone == payload.phone)):
        raise HTTPException(status_code=409, detail="Phone already registered")

    state = db.get(State, payload.state_id)
    if not state:
        raise HTTPException(status_code=400, detail="Invalid state_id")

    district = db.get(District, payload.district_id)
    if not district or district.state_id != payload.state_id:
        raise HTTPException(status_code=400, detail="Invalid district for selected state")

    farmer = Farmer(
        source_farmer_id=f"REG-{payload.phone}",
        full_name=payload.full_name,
        age=payload.age,
        gender=payload.gender,
        state_id=payload.state_id,
        district_id=payload.district_id,
        pincode=payload.pincode,
        address_line=payload.address_line,
        village=payload.village,
        block=payload.block,
        occupation=payload.occupation,
        annual_income_inr=payload.annual_income_inr,
        social_category=payload.social_category,
    )
    db.add(farmer)
    db.flush()

    user = User(
        farmer_id=farmer.farmer_id,
        phone=payload.phone,
        password_hash=hash_password(payload.password),
        role="farmer",
        is_active=True,
    )
    db.add(user)
    db.commit()
    db.refresh(user)

    return TokenResponse(
        access_token=create_access_token(user.user_id, user.role),
        role=user.role,
        user_id=user.user_id,
    )

@router.post("/login", response_model=TokenResponse)
def login(payload: LoginRequest, db: Session = Depends(get_db)):
    user = db.scalar(select(User).where(User.phone == payload.phone))
    if not user or not verify_password(payload.password, user.password_hash):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid credentials")
    return TokenResponse(
        access_token=create_access_token(user.user_id, user.role),
        role=user.role,
        user_id=user.user_id,
    )

@router.get("/me")
def me(user: User = Depends(get_current_user)):
    return {
        "user_id": user.user_id,
        "farmer_id": user.farmer_id,
        "phone": user.phone,
        "role": user.role,
    }
