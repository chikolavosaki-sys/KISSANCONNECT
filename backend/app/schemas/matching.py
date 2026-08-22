from pydantic import BaseModel

class MatchResult(BaseModel):
    scheme_id:int
    scheme_name:str
    match_score:float
    cosine_score:float
    evi_alignment_score:float
    matched_keywords:list[str]
    missing_keywords:list[str]
