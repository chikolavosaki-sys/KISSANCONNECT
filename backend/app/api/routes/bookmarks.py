from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy import select
from sqlalchemy.orm import Session
from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.models.bookmark import Bookmark
from app.models.scheme import Scheme

router = APIRouter(prefix="/bookmarks", tags=["Bookmarks"])

@router.get("")
def list_bookmarks(user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    if not user.farmer_id:
        return []
    return db.scalars(
        select(Bookmark)
        .where(Bookmark.farmer_id == user.farmer_id)
        .order_by(Bookmark.bookmark_id.desc())
    ).all()

@router.post("/{scheme_id}")
def add_bookmark(
    scheme_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    if not user.farmer_id:
        raise HTTPException(status_code=400, detail="No farmer profile linked")
    if not db.get(Scheme, scheme_id):
        raise HTTPException(status_code=404, detail="Scheme not found")

    existing = db.scalar(select(Bookmark).where(
        Bookmark.farmer_id == user.farmer_id,
        Bookmark.scheme_id == scheme_id,
    ))
    if existing:
        return existing

    bookmark = Bookmark(farmer_id=user.farmer_id, scheme_id=scheme_id)
    db.add(bookmark)
    db.commit()
    db.refresh(bookmark)
    return bookmark

@router.delete("/{scheme_id}")
def remove_bookmark(
    scheme_id: int,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db),
):
    bookmark = db.scalar(select(Bookmark).where(
        Bookmark.farmer_id == user.farmer_id,
        Bookmark.scheme_id == scheme_id,
    ))
    if not bookmark:
        raise HTTPException(status_code=404, detail="Bookmark not found")
    db.delete(bookmark)
    db.commit()
    return {"message": "Bookmark removed"}
