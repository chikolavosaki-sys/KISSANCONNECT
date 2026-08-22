from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy import select
from sqlalchemy.orm import Session, joinedload

from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.models.farmer import Farmer
from app.models.state import State
from app.models.district import District
from app.schemas.farmer import FarmerProfileUpdate, FarmerProfileResponse

router = APIRouter(prefix="/farmers", tags=["Farmers"])

@router.get("/me", response_model=FarmerProfileResponse)
def get_my_farmer(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user.farmer_id:
        raise HTTPException(status_code=404, detail="No farmer profile linked to this account")
    farmer = db.scalar(
        select(Farmer)
        .where(Farmer.farmer_id == user.farmer_id)
    )
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer profile not found")
    return farmer

@router.patch("/me", response_model=FarmerProfileResponse)
def update_my_farmer(
    payload: FarmerProfileUpdate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not user.farmer_id:
        raise HTTPException(status_code=404, detail="No farmer profile linked to this account")

    farmer = db.get(Farmer, user.farmer_id)
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer profile not found")

    data = payload.model_dump(exclude_unset=True)

    if "state_id" in data:
        state = db.get(State, data["state_id"])
        if not state:
            raise HTTPException(status_code=400, detail="Invalid state_id")

    if "district_id" in data:
        district = db.get(District, data["district_id"])
        if not district:
            raise HTTPException(status_code=400, detail="Invalid district_id")
        state_id = data.get("state_id", farmer.state_id)
        if district.state_id != state_id:
            raise HTTPException(
                status_code=400,
                detail="District does not belong to selected state",
            )

    for field, value in data.items():
        setattr(farmer, field, value)

    db.commit()
    db.refresh(farmer)
    return farmer

@router.get("/lookup")
def lookup_farmer(
    source_farmer_id: str = Query(..., min_length=1),
    db: Session = Depends(get_db),
):
    farmer = db.scalar(
        select(Farmer)
        .where(Farmer.source_farmer_id == source_farmer_id)
    )
    if not farmer:
        raise HTTPException(status_code=404, detail="Farmer profile not found")
    if farmer.user:
        return {
            "available": False,
            "message": "This farmer profile is already linked to an account",
        }
    return {
        "available": True,
        "farmer_id": farmer.farmer_id,
        "source_farmer_id": farmer.source_farmer_id,
        "full_name": farmer.full_name,
        "state_id": farmer.state_id,
        "district_id": farmer.district_id,
    }
