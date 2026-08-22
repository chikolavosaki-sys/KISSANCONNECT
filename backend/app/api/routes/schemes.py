from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.core.database import get_db
from app.models.scheme import Scheme

router = APIRouter(prefix="/schemes", tags=["Schemes"])

@router.get("")
def list_schemes(
    state: str | None = None,
    db: Session = Depends(get_db),
):
    query = select(Scheme)
    if state:
        query = query.where(
            (Scheme.applicable_state.is_(None)) |
            (Scheme.applicable_state.ilike(state))
        )
    return db.scalars(query.order_by(Scheme.scheme_name)).all()

@router.get("/{scheme_id}")
def get_scheme(scheme_id: int, db: Session = Depends(get_db)):
    scheme = db.get(Scheme, scheme_id)
    if not scheme:
        from fastapi import HTTPException
        raise HTTPException(status_code=404, detail="Scheme not found")
    return scheme
