def yes(v):
    return str(v or "").strip().lower() in {"y","yes","true","1"}

def land_score(v):
    try: x=float(v)
    except (TypeError,ValueError): return 0
    if x < 1: return 0
    if x < 2: return 10
    if x <= 5: return 20
    return 25

def house_score(v):
    v=str(v or "").lower()
    if "semi" in v: return 8
    if "pucca" in v: return 15
    return 0

def vehicle_score(v):
    v=str(v or "").lower()
    if not v or v in {"none","no","nil"}: return 0
    if any(x in v for x in ["tractor","4-wheeler","car"]): return 10
    return 5

def irrigation_score(v):
    v=str(v or "").lower()
    if not v or "rain" in v: return 0
    if any(x in v for x in ["bore","canal","drip","sprinkler","well","tube"]): return 15
    return 8

def calculate_evi(farmer):
    score = land_score(farmer.land_owned_acres)
    score += house_score(farmer.house_type)
    score += 10 if yes(farmer.electricity_conn) else 0

    lpg=str(farmer.lpg_conn or "").lower()
    score += 5 if "ujjwala" in lpg else (10 if yes(farmer.lpg_conn) or "regular" in lpg else 0)

    score += vehicle_score(farmer.vehicle_ownership)
    score += irrigation_score(farmer.irrigation_source)

    if yes(farmer.kisan_credit_card):
        score += 15
    elif yes(farmer.bank_account):
        score += 8

    score=round(min(100,max(0,score)),2)
    bucket="Highly Vulnerable" if score<=35 else ("Moderately Vulnerable" if score<=65 else "Stable")
    return {"score":score,"bucket":bucket,"status":"calculated"}
