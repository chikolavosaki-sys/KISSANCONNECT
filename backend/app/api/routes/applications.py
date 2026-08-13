from fastapi import APIRouter

router = APIRouter()


@router.post("/")
def submit_application():
    # TODO: farmer applies to a scheme
    return {"message": "application submitted - stub"}


@router.get("/{application_id}")
def get_application(application_id: int):
    return {"application_id": application_id}


@router.patch("/{application_id}/status")
def update_application_status(application_id: int):
    # TODO: admin approves/rejects
    return {"application_id": application_id, "status": "updated - stub"}
