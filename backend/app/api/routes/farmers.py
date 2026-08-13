from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.session import get_db

router = APIRouter()


@router.get("/")
def list_farmers(db: Session = Depends(get_db)):
    # TODO: replace with real query once Farmer model + schema are wired up
    return {"message": "list of farmers - stub"}


@router.get("/{farmer_id}")
def get_farmer(farmer_id: int, db: Session = Depends(get_db)):
    # TODO: fetch farmer profile + EVI breakdown
    return {"farmer_id": farmer_id, "message": "farmer detail - stub"}


@router.post("/")
def create_farmer(db: Session = Depends(get_db)):
    # TODO: accept FarmerCreate schema, run EVI engine, persist
    return {"message": "farmer created - stub"}
