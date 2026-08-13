"""
Generates synthetic farmer profiles.

IMPORTANT: asset/utility proxies must be correlated with each other and with
land size / district — not drawn independently — or the EVI distribution
will look unrealistic in the demo.

Usage:
    python generate_farmers.py --count 2000 --out ../processed/farmers.csv
"""

import argparse
import csv
import random
from faker import Faker

fake = Faker("en_IN")

# TODO: replace with SECC-2011 anchored probabilities, ideally per-district
LAND_SIZE_BUCKETS = [
    ("marginal", 0, 1, 0.55),   # (label, min_acres, max_acres, population_share)
    ("small", 1, 2.5, 0.20),
    ("semi-medium", 2.5, 5, 0.15),
    ("medium", 5, 10, 0.07),
    ("large", 10, 25, 0.03),
]

HOUSE_TYPES = ["kutcha", "semi-pucca", "pucca"]


def pick_land_bucket():
    r = random.random()
    cumulative = 0
    for label, lo, hi, share in LAND_SIZE_BUCKETS:
        cumulative += share
        if r <= cumulative:
            return label, round(random.uniform(lo, hi), 2)
    return LAND_SIZE_BUCKETS[-1][0], LAND_SIZE_BUCKETS[-1][2]


def correlated_asset_proxies(land_size_acres: float):
    """
    Larger landholding -> higher probability of electricity, pucca house,
    vehicle ownership, bank/KCC access. This is the correlation structure
    that must NOT be replaced with independent random.choice calls.
    """
    wealth_factor = min(land_size_acres / 10, 1.0)  # 0-1 proxy

    has_electricity = random.random() < (0.55 + 0.4 * wealth_factor)
    has_lpg = random.random() < (0.45 + 0.45 * wealth_factor)
    house_type = random.choices(
        HOUSE_TYPES,
        weights=[max(0.6 - wealth_factor, 0.05), 0.3, 0.1 + 0.5 * wealth_factor],
    )[0]
    owns_vehicle = random.random() < (0.15 + 0.5 * wealth_factor)
    has_bank_account = random.random() < (0.7 + 0.25 * wealth_factor)
    has_kcc = has_bank_account and random.random() < (0.3 + 0.4 * wealth_factor)

    return {
        "has_electricity": has_electricity,
        "has_lpg": has_lpg,
        "house_type": house_type,
        "owns_vehicle": owns_vehicle,
        "has_bank_account": has_bank_account,
        "has_kcc": has_kcc,
    }


def generate_farmer():
    land_label, land_size = pick_land_bucket()
    proxies = correlated_asset_proxies(land_size)

    return {
        "full_name": fake.name(),
        "phone": fake.msisdn()[:10],
        "state": fake.state(),
        "land_size_acres": land_size,
        "land_category": land_label,
        "irrigation_type": random.choices(
            ["canal", "borewell", "drip", "rainfed"],
            weights=[0.25, 0.3, 0.15 + 0.2 * (land_size / 10), 0.3],
        )[0],
        **proxies,
    }


def main(count: int, out_path: str):
    rows = [generate_farmer() for _ in range(count)]
    with open(out_path, "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    print(f"Generated {count} farmer records -> {out_path}")


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--count", type=int, default=2000)
    parser.add_argument("--out", type=str, default="../processed/farmers.csv")
    args = parser.parse_args()
    main(args.count, args.out)
