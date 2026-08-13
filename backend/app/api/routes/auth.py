from fastapi import APIRouter

router = APIRouter()


@router.post("/register")
def register():
    # TODO: farmer/admin registration with hashed password
    return {"message": "registered - stub"}


@router.post("/login")
def login():
    # TODO: verify credentials, issue JWT
    return {"access_token": "stub-token", "token_type": "bearer"}
