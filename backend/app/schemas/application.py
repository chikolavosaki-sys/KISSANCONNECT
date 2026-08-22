from pydantic import BaseModel

class ApplicationCreate(BaseModel):
    scheme_id: int
    application_data: dict = {}

class ApplicationResponse(BaseModel):
    application_id: int
    scheme_id: int
    status: str
    application_data: dict

    model_config = {"from_attributes": True}
