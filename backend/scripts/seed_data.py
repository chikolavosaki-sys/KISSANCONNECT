"""Seed states, districts, and sample schemes for local/demo use."""

import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
if str(ROOT) not in sys.path:
    sys.path.insert(0, str(ROOT))

from sqlalchemy import func, select

from app.core.database import SessionLocal
from app.models.district import District
from app.models.scheme import Scheme
from app.models.state import State

STATES = [
    ("AP", "andhra-pradesh", "Andhra Pradesh"),
    ("AS", "assam", "Assam"),
    ("BR", "bihar", "Bihar"),
    ("CG", "chhattisgarh", "Chhattisgarh"),
    ("DL", "delhi", "Delhi"),
    ("GA", "goa", "Goa"),
    ("GJ", "gujarat", "Gujarat"),
    ("HR", "haryana", "Haryana"),
    ("HP", "himachal-pradesh", "Himachal Pradesh"),
    ("JH", "jharkhand", "Jharkhand"),
    ("KA", "karnataka", "Karnataka"),
    ("KL", "kerala", "Kerala"),
    ("MP", "madhya-pradesh", "Madhya Pradesh"),
    ("MH", "maharashtra", "Maharashtra"),
    ("MN", "manipur", "Manipur"),
    ("ML", "meghalaya", "Meghalaya"),
    ("MZ", "mizoram", "Mizoram"),
    ("NL", "nagaland", "Nagaland"),
    ("OD", "odisha", "Odisha"),
    ("PB", "punjab", "Punjab"),
    ("RJ", "rajasthan", "Rajasthan"),
    ("SK", "sikkim", "Sikkim"),
    ("TN", "tamil-nadu", "Tamil Nadu"),
    ("TS", "telangana", "Telangana"),
    ("TR", "tripura", "Tripura"),
    ("UP", "uttar-pradesh", "Uttar Pradesh"),
    ("UK", "uttarakhand", "Uttarakhand"),
    ("WB", "west-bengal", "West Bengal"),
]

DISTRICTS_BY_SLUG = {
    "jharkhand": [
        "Bokaro", "Chatra", "Deoghar", "Dhanbad", "Dumka", "East Singhbhum",
        "Garhwa", "Giridih", "Godda", "Gumla", "Hazaribagh", "Jamtara",
        "Khunti", "Koderma", "Latehar", "Lohardaga", "Pakur", "Palamu",
        "Ramgarh", "Ranchi", "Sahibganj", "Seraikela-Kharsawan", "Simdega",
        "West Singhbhum",
    ],
    "bihar": [
        "Araria", "Arwal", "Aurangabad", "Banka", "Begusarai", "Bhagalpur",
        "Bhojpur", "Buxar", "Darbhanga", "Gaya", "Gopalganj", "Jamui",
        "Jehanabad", "Kaimur", "Katihar", "Khagaria", "Kishanganj",
        "Lakhisarai", "Madhepura", "Madhubani", "Munger", "Muzaffarpur",
        "Nalanda", "Nawada", "Patna", "Purnia", "Rohtas", "Saharsa",
        "Samastipur", "Saran", "Sheikhpura", "Sheohar", "Sitamarhi", "Siwan",
        "Supaul", "Vaishali",
    ],
    "uttar-pradesh": [
        "Agra", "Aligarh", "Ayodhya", "Azamgarh", "Bareilly", "Ghaziabad",
        "Gorakhpur", "Jhansi", "Kanpur Nagar", "Lucknow", "Mathura", "Meerut",
        "Prayagraj", "Varanasi",
    ],
    "maharashtra": [
        "Ahmednagar", "Akola", "Amravati", "Aurangabad", "Beed", "Bhandara",
        "Chandrapur", "Dhule", "Jalgaon", "Kolhapur", "Latur", "Mumbai City",
        "Nagpur", "Nashik", "Pune", "Satara", "Solapur", "Thane",
    ],
    "delhi": [
        "Central Delhi", "East Delhi", "New Delhi", "North Delhi",
        "North East Delhi", "North West Delhi", "Shahdara", "South Delhi",
        "South East Delhi", "South West Delhi", "West Delhi",
    ],
}

SAMPLE_SCHEMES = [
    {
        "source_scheme_id": "PM-KISAN",
        "scheme_name": "PM-KISAN",
        "level": "Central",
        "issuing_ministry": "Ministry of Agriculture and Farmers Welfare",
        "applicable_state": None,
        "benefit_type": "Direct Benefit Transfer",
        "benefit_amount_inr": "Rs. 6,000 per year in three installments",
        "description": "Income support for landholding farmer families.",
        "sector_tags": "income support,farmer,welfare",
        "required_documents": "Aadhaar, land records, bank account",
        "deadline_or_status": "Open",
    },
    {
        "source_scheme_id": "PMFBY",
        "scheme_name": "Pradhan Mantri Fasal Bima Yojana",
        "level": "Central",
        "issuing_ministry": "Ministry of Agriculture and Farmers Welfare",
        "applicable_state": None,
        "benefit_type": "Crop Insurance",
        "benefit_amount_inr": "Premium subsidy and claim support",
        "description": "Crop insurance scheme for farmers against natural calamities.",
        "sector_tags": "crop insurance,pmfby,risk protection",
        "required_documents": "Aadhaar, land records, sowing certificate",
        "deadline_or_status": "Seasonal",
    },
    {
        "source_scheme_id": "KCC",
        "scheme_name": "Kisan Credit Card",
        "level": "Central",
        "issuing_ministry": "Ministry of Agriculture and Farmers Welfare",
        "benefit_type": "Credit",
        "benefit_amount_inr": "Flexible credit limit based on land and crop",
        "description": "Short-term credit for crop cultivation and allied activities.",
        "sector_tags": "credit,kcc,loan,farmer",
        "required_documents": "Aadhaar, land records, income proof",
        "deadline_or_status": "Open",
    },
    {
        "source_scheme_id": "JH-SRLM",
        "scheme_name": "Jharkhand State Rural Livelihood Mission",
        "level": "State",
        "issuing_ministry": "Government of Jharkhand",
        "applicable_state": "Jharkhand",
        "benefit_type": "Livelihood Support",
        "benefit_amount_inr": "SHG formation and enterprise support",
        "description": "State livelihood mission for rural households and SHGs.",
        "sector_tags": "livelihood,shg,rural,jharkhand",
        "required_documents": "Aadhaar, residence proof",
        "deadline_or_status": "Open",
    },
    {
        "source_scheme_id": "SOIL-HEALTH",
        "scheme_name": "Soil Health Card Scheme",
        "level": "Central",
        "issuing_ministry": "Ministry of Agriculture and Farmers Welfare",
        "applicable_state": None,
        "benefit_type": "Advisory",
        "benefit_amount_inr": "Free soil testing and recommendations",
        "description": "Promotes balanced use of fertilizers through soil testing.",
        "sector_tags": "soil health,testing,advisory",
        "required_documents": "Aadhaar, land details",
        "deadline_or_status": "Open",
    },
]


def seed_states_and_districts(db) -> None:
    if db.scalar(select(func.count()).select_from(State)):
        print("States already seeded, skipping locations.")
        return

    slug_to_state: dict[str, State] = {}
    for code, slug, name in STATES:
        state = State(state_code=code, state_name=name)
        db.add(state)
        db.flush()
        slug_to_state[slug] = state

    for slug, district_names in DISTRICTS_BY_SLUG.items():
        state = slug_to_state.get(slug)
        if not state:
            continue
        for district_name in district_names:
            db.add(
                District(
                    state_id=state.state_id,
                    district_name=district_name,
                    district_code=district_name[:10].upper().replace(" ", "-"),
                )
            )

    print(f"Seeded {len(STATES)} states and districts for {len(DISTRICTS_BY_SLUG)} states.")


def seed_schemes(db) -> None:
    if db.scalar(select(func.count()).select_from(Scheme)):
        print("Schemes already seeded, skipping.")
        return

    for item in SAMPLE_SCHEMES:
        db.add(Scheme(**item))

    print(f"Seeded {len(SAMPLE_SCHEMES)} sample schemes.")


def main() -> None:
    db = SessionLocal()
    try:
        seed_states_and_districts(db)
        seed_schemes(db)
        db.commit()
    finally:
        db.close()


if __name__ == "__main__":
    main()
