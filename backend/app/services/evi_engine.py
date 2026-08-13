"""
Economic Vulnerability Index (EVI) Engine.

Weighted linear scoring (0-100) over asset/utility proxies, chosen over
black-box ML for explainability — critical since there's no labeled
ground truth and judges/stakeholders need to see how a score is derived.

Each factor's weight and rationale should be documented here so the
breakdown can be shown directly on the farmer dashboard.
"""

from typing import Dict

# TODO: tune weights collaboratively; keep them summing to 1.0 and documented
WEIGHTS = {
    "land_size": 0.20,
    "irrigation_access": 0.15,
    "electricity": 0.10,
    "lpg": 0.10,
    "house_type": 0.15,
    "vehicle_ownership": 0.10,
    "bank_kcc_access": 0.20,
}

TIER_THRESHOLDS = [
    (0, 25, "Severe Vulnerability"),
    (25, 45, "High Vulnerability"),
    (45, 65, "Moderate Vulnerability"),
    (65, 85, "Low Vulnerability"),
    (85, 101, "Economically Stable"),
]


def compute_evi(farmer_data: Dict) -> Dict:
    """
    Returns {"score": float, "tier": str, "breakdown": {factor: contribution}}
    Placeholder scoring logic — replace sub-scores with real normalized
    values once field definitions are finalized.
    """
    breakdown = {}

    # Example sub-scores (0-1 scale each, invert where "having less" = more vulnerable)
    breakdown["land_size"] = min(farmer_data.get("land_size_acres", 0) / 5, 1.0)
    breakdown["irrigation_access"] = 1.0 if farmer_data.get("irrigation_type") not in (None, "rainfed") else 0.3
    breakdown["electricity"] = 1.0 if farmer_data.get("has_electricity") else 0.0
    breakdown["lpg"] = 1.0 if farmer_data.get("has_lpg") else 0.0
    breakdown["house_type"] = {"pucca": 1.0, "semi-pucca": 0.5, "kutcha": 0.0}.get(
        farmer_data.get("house_type"), 0.3
    )
    breakdown["vehicle_ownership"] = 1.0 if farmer_data.get("owns_vehicle") else 0.0
    breakdown["bank_kcc_access"] = (
        0.5 * (1.0 if farmer_data.get("has_bank_account") else 0.0)
        + 0.5 * (1.0 if farmer_data.get("has_kcc") else 0.0)
    )

    score = sum(breakdown[k] * WEIGHTS[k] for k in WEIGHTS) * 100
    tier = next(t for lo, hi, t in TIER_THRESHOLDS if lo <= score < hi)

    return {
        "score": round(score, 2),
        "tier": tier,
        "breakdown": {k: round(v * WEIGHTS[k] * 100, 2) for k, v in breakdown.items()},
    }
