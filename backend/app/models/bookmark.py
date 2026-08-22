from datetime import datetime
from sqlalchemy import ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class Bookmark(Base):
    __tablename__ = "bookmarks"

    bookmark_id: Mapped[int] = mapped_column(primary_key=True)
    farmer_id: Mapped[int] = mapped_column(ForeignKey("farmers.farmer_id"))
    scheme_id: Mapped[int] = mapped_column(ForeignKey("schemes.scheme_id"))
    created_at: Mapped[datetime] = mapped_column(default=datetime.utcnow)

    farmer = relationship("Farmer", back_populates="bookmarks")
    scheme = relationship("Scheme", back_populates="bookmarks")
