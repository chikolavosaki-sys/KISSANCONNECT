from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.state import State
from app.models.district import District

router = APIRouter(prefix="/locations", tags=["Locations"])

@router.get("/states")
def list_states(db: Session = Depends(get_db)):
    return db.scalars(select(State).order_by(State.state_name)).all()

@router.get("/states/{state_id}/districts")
def list_districts(state_id: int, db: Session = Depends(get_db)):
    return db.scalars(
        select(District)
        .where(District.state_id == state_id)
        .order_by(District.district_name)
    ).all()
