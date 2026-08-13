from fastapi import APIRouter

router = APIRouter()


@router.get("/")
def list_schemes():
    # TODO: return scheme catalog, support filters (state, category)
    return {"message": "list of schemes - stub"}


@router.get("/{scheme_id}")
def get_scheme(scheme_id: int):
    # TODO: return scheme detail
    return {"scheme_id": scheme_id}


@router.get("/match/{farmer_id}")
def match_schemes(farmer_id: int):
    # TODO: run 3-stage matching pipeline (hard filters -> eligibility score -> TF-IDF)
    return {"farmer_id": farmer_id, "matches": []}
