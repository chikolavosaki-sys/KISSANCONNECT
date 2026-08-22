from pydantic import BaseModel

class StateAnalytics(BaseModel):
    state_id: int
    state_name: str
    farmer_count: int
    district_count: int
