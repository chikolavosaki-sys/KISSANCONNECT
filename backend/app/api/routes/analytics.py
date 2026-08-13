from fastapi import APIRouter

router = APIRouter()


@router.get("/district/{district_id}")
def district_analytics(district_id: int):
    # TODO: aggregate EVI distribution, scheme uptake by district
    return {"district_id": district_id}


@router.get("/state/{state_name}")
def state_analytics(state_name: str):
    return {"state": state_name}
