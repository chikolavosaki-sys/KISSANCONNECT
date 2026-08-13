from fastapi import APIRouter

router = APIRouter()


@router.get("/applications")
def list_pending_applications():
    # TODO: admin review queue
    return {"message": "pending applications - stub"}


@router.get("/farmers")
def list_all_farmers():
    return {"message": "all farmers - stub"}


@router.get("/schemes")
def manage_schemes():
    return {"message": "scheme management - stub"}
