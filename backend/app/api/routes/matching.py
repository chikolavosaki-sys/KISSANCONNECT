from fastapi import APIRouter,Depends,HTTPException,Query
from sqlalchemy import select
from sqlalchemy.orm import Session,joinedload
from app.api.deps import get_current_user
from app.core.database import get_db
from app.models.user import User
from app.models.farmer import Farmer
from app.models.scheme import Scheme
from app.services.evi import calculate_evi
from app.services.matching import match_schemes

router=APIRouter(prefix="/matching",tags=["Matching"])

@router.get("/evi")
def my_evi(user:User=Depends(get_current_user),db:Session=Depends(get_db)):
    if not user.farmer_id: raise HTTPException(400,"No farmer profile linked")
    farmer=db.get(Farmer,user.farmer_id)
    if not farmer: raise HTTPException(404,"Farmer profile not found")
    evi=calculate_evi(farmer)
    farmer.evi_score=evi["score"]; farmer.evi_bucket=evi["bucket"]
    db.commit()
    return evi

@router.get("/recommendations")
def recommendations(top_k:int=Query(10,ge=1,le=50),
                     user:User=Depends(get_current_user),db:Session=Depends(get_db)):
    if not user.farmer_id: raise HTTPException(400,"No farmer profile linked")
    farmer=db.scalar(select(Farmer).options(joinedload(Farmer.state),joinedload(Farmer.district)).where(Farmer.farmer_id==user.farmer_id))
    if not farmer: raise HTTPException(404,"Farmer profile not found")
    evi=calculate_evi(farmer)
    farmer.evi_score=evi["score"]; farmer.evi_bucket=evi["bucket"]
    results=match_schemes(farmer,db.scalars(select(Scheme)).all(),evi,top_k)
    db.commit()
    return {"evi":evi,"count":len(results),"recommendations":[
        {"scheme_id":s.scheme_id,"scheme_name":s.scheme_name,"match_score":score,
         "cosine_score":cos,"evi_alignment_score":boost,
         "matched_keywords":matched,"missing_keywords":missing,
         "benefit_type":s.benefit_type,"benefit_amount_inr":s.benefit_amount_inr,
         "description":s.description,"official_url":s.official_url}
        for s,score,cos,boost,matched,missing in results]}
