from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.models.application import Application
from app.models.scheme import Scheme
from app.schemas.application import ApplicationCreate

router = APIRouter(prefix="/applications", tags=["Applications"])

@router.post("")
def create_application(
    payload: ApplicationCreate,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not user.farmer_id:
        raise HTTPException(status_code=400, detail="No farmer profile linked")

    if not db.get(Scheme, payload.scheme_id):
        raise HTTPException(status_code=404, detail="Scheme not found")

    existing = db.scalar(select(Application).where(
        Application.farmer_id == user.farmer_id,
        Application.scheme_id == payload.scheme_id,
    ))
    if existing:
        raise HTTPException(status_code=409, detail="Application already exists")

    app = Application(
        farmer_id=user.farmer_id,
        scheme_id=payload.scheme_id,
        application_data=payload.application_data,
        status="draft",
    )
    db.add(app)
    db.commit()
    db.refresh(app)
    return app

@router.get("")
def list_my_applications(
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not user.farmer_id:
        return []
    return db.scalars(
        select(Application)
        .where(Application.farmer_id == user.farmer_id)
        .order_by(Application.application_id.desc())
    ).all()
