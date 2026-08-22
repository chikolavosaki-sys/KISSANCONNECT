from sqlalchemy import String
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class State(Base):
    __tablename__ = "states"

    state_id: Mapped[int] = mapped_column(primary_key=True)
    state_code: Mapped[str] = mapped_column(String(10), unique=True)
    state_name: Mapped[str] = mapped_column(String(120), unique=True)

    districts = relationship("District", back_populates="state")
    farmers = relationship("Farmer", back_populates="state")
