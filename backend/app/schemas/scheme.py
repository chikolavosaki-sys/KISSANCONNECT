from pydantic import BaseModel

class SchemeSummary(BaseModel):
    scheme_id: int
    scheme_name: str
    level: str
    applicable_state: str | None
    benefit_type: str | None
    benefit_amount_inr: float | None
    description: str | None
    official_url: str | None

    model_config = {"from_attributes": True}
