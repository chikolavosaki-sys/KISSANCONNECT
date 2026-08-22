from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

def norm(v): return str(v or "").strip().lower()

def hard_filter(scheme, farmer):
    state=norm(scheme.applicable_state)
    farmer_state=norm(farmer.state.state_name if farmer.state else "")
    if state and state not in {"all","india","pan india"} and state != farmer_state:
        return False

    if farmer.age is not None:
        if scheme.age_min is not None and farmer.age < scheme.age_min: return False
        if scheme.age_max is not None and farmer.age > scheme.age_max: return False

    if farmer.land_owned_acres is not None:
        land=float(farmer.land_owned_acres)
        if scheme.min_land_acres is not None and land < float(scheme.min_land_acres): return False
        if scheme.max_land_acres is not None and land > float(scheme.max_land_acres): return False

    restriction=norm(scheme.category_restriction)
    category=norm(farmer.social_category)
    if restriction and category:
        if "sc/st" in restriction and category not in {"sc","st"}: return False
        if "sc only" in restriction and category!="sc": return False
        if "st only" in restriction and category!="st": return False
        if "obc only" in restriction and category!="obc": return False

    gender=norm(farmer.gender)
    gr=norm(scheme.gender_restriction)
    if gr and gender:
        if ("women" in gr or "female" in gr) and gender not in {"female","woman","women"}: return False
        if "male" in gr and gender not in {"male","man"}: return False

    return True

def farmer_doc(farmer,evi):
    vals=[farmer.gender,farmer.social_category,farmer.education_level,
          farmer.land_ownership_type,farmer.primary_crop,farmer.secondary_crop,
          farmer.cropping_pattern,farmer.soil_type,farmer.irrigation_source,
          farmer.farm_mechanization_level,farmer.livestock_ownership,
          farmer.dairy_poultry_involvement,farmer.fisheries_involvement,
          farmer.kisan_credit_card,farmer.existing_loan_indebtedness,
          farmer.crop_insurance_pmfby,farmer.ration_card_type,farmer.house_type,
          farmer.vehicle_ownership,farmer.state.state_name if farmer.state else "",
          farmer.district.district_name if farmer.district else ""]
    tags=[]
    try:
        if float(farmer.land_owned_acres)<2: tags += ["small marginal farmer"]
    except (TypeError,ValueError): pass
    if evi["score"]<=35: tags += ["economically weak vulnerable household"]
    elif evi["score"]<=65: tags += ["moderately vulnerable household"]
    return " ".join(str(x) for x in vals if x)+" "+" ".join(tags)

def scheme_doc(s):
    return " ".join(str(x) for x in [
        s.scheme_name,s.level,s.issuing_ministry,s.applicable_state,
        s.category_restriction,s.gender_restriction,s.occupation_requirement,
        s.benefit_type,s.required_documents,s.sector_tags,s.description] if x)

def match_schemes(farmer,schemes,evi,top_k=10):
    filtered=[s for s in schemes if hard_filter(s,farmer)]
    if not filtered: return []
    docs=[scheme_doc(s) for s in filtered]
    vectorizer=TfidfVectorizer(stop_words="english",ngram_range=(1,2))
    matrix=vectorizer.fit_transform(docs+[farmer_doc(farmer,evi)])
    scores=cosine_similarity(matrix[-1],matrix[:-1]).flatten()
    farmer_terms=set(vectorizer.inverse_transform(matrix[-1])[0])
    features=vectorizer.get_feature_names_out()
    out=[]
    for i,s in enumerate(filtered):
        text=docs[i].lower()
        target=any(x in text for x in ["economically weaker","low income","vulnerable","small farmer","marginal farmer","financial assistance","subsidy"])
        evi_boost=1.0 if target and evi["score"]<=35 else (0.5 if target and evi["score"]<=65 else (0.1 if target else 0))
        final=.85*float(scores[i])+.15*evi_boost
        weights=matrix[i].toarray().ravel()
        idx=weights.argsort()[::-1]
        matched=[]; missing=[]
        for j in idx:
            if weights[j]<=0: continue
            term=features[j]
            if term in farmer_terms and len(matched)<5: matched.append(term)
            elif term not in farmer_terms and len(missing)<5: missing.append(term)
            if len(matched)>=5 and len(missing)>=5: break
        out.append((s,round(final,5),round(float(scores[i]),5),round(evi_boost,5),matched,missing))
    out.sort(key=lambda x:x[1],reverse=True)
    return out[:top_k]
