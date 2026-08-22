from decimal import Decimal
from sqlalchemy import BigInteger, Integer, Numeric, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship
from app.core.database import Base

class District(Base):
    __tablename__ = "districts"

    district_id: Mapped[int] = mapped_column(primary_key=True)
    district_code: Mapped[str | None] = mapped_column(String(50))
    state_id: Mapped[int] = mapped_column(ForeignKey("states.state_id"))
    district_name: Mapped[str] = mapped_column(String(150))
    agro_climatic_zone: Mapped[str | None] = mapped_column(String(150))
    drought_prone_flag: Mapped[int | None] = mapped_column(Integer)
    flood_prone_flag: Mapped[int | None] = mapped_column(Integer)
    aspirational_district_flag: Mapped[int | None] = mapped_column(Integer)
    state_rural_poverty_rate_pct: Mapped[Decimal | None] = mapped_column(Numeric(8,3))
    state_irrigation_coverage_pct: Mapped[Decimal | None] = mapped_column(Numeric(8,3))
    state_avg_landholding_ha: Mapped[Decimal | None] = mapped_column(Numeric(10,4))

    state = relationship("State", back_populates="districts")
    farmers = relationship("Farmer", back_populates="district")
