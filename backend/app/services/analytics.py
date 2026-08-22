from sqlalchemy import func, select
from sqlalchemy.orm import Session
from app.models.state import State
from app.models.district import District
from app.models.farmer import Farmer

def india_overview(db: Session):
    total_farmers = db.scalar(select(func.count(Farmer.farmer_id))) or 0
    total_states = db.scalar(select(func.count(State.state_id))) or 0
    total_districts = db.scalar(select(func.count(District.district_id))) or 0

    return {
        "total_farmers": total_farmers,
        "total_states": total_states,
        "total_districts": total_districts,
    }
