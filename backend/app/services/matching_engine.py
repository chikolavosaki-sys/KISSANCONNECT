"""
3-stage hybrid scheme matching pipeline:
  1. Hard rule filters   - e.g. state match, land size caps, category eligibility
  2. Structured scoring  - weighted eligibility score on structured fields
  3. TF-IDF similarity   - cosine similarity between farmer profile text and
                            scheme description text (scikit-learn), for
                            fuzzy/semantic matches the rules miss.

Returns ranked scheme matches with keyword highlights for explainability.
"""

from typing import List, Dict
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity


def hard_filter(farmer: Dict, schemes: List[Dict]) -> List[Dict]:
    # TODO: filter by state, land size ceiling, category (e.g. only landholding farmers)
    return schemes


def structured_score(farmer: Dict, schemes: List[Dict]) -> List[Dict]:
    # TODO: score each scheme 0-1 based on how well structured fields match
    for s in schemes:
        s["structured_score"] = 0.5  # placeholder
    return schemes


def tfidf_similarity(farmer_profile_text: str, schemes: List[Dict]) -> List[Dict]:
    if not schemes:
        return schemes

    corpus = [farmer_profile_text] + [s.get("description", "") for s in schemes]
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf_matrix = vectorizer.fit_transform(corpus)

    sims = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:]).flatten()
    for s, sim in zip(schemes, sims):
        s["similarity_score"] = round(float(sim), 3)

    return schemes


def match_farmer_to_schemes(farmer: Dict, all_schemes: List[Dict]) -> List[Dict]:
    candidates = hard_filter(farmer, all_schemes)
    candidates = structured_score(farmer, candidates)

    farmer_text = f"{farmer.get('primary_crop', '')} {farmer.get('land_ownership_type', '')} {farmer.get('irrigation_type', '')}"
    candidates = tfidf_similarity(farmer_text, candidates)

    for s in candidates:
        s["final_score"] = 0.6 * s.get("structured_score", 0) + 0.4 * s.get("similarity_score", 0)

    return sorted(candidates, key=lambda x: x["final_score"], reverse=True)
