# Kissan Connect FastAPI Backend

This backend is built against the PostgreSQL schema already imported into `kissan-connect`.

## Existing database tables

- states
- districts
- farmers
- schemes

## Application tables

- users
- applications
- bookmarks
- audit_logs

## Setup

### Ubuntu

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
```

Edit `.env` with the PostgreSQL password.

### Windows PowerShell

```powershell
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
copy .env.example .env
```

## Run

```bash
uvicorn app.main:app --reload
```

Swagger:
http://127.0.0.1:8000/docs

Health:
http://127.0.0.1:8000/health

## Current implementation

The first backend layer implements:

- PostgreSQL connection
- SQLAlchemy models matching the existing schema
- JWT authentication
- password hashing
- farmer registration/login
- state/district APIs
- farmer profile API
- scheme listing/details
- application creation/listing
- bookmark add/list/remove
- admin India overview
- state analytics
- state → district analytics

The final recommendation engine will be added after validating the actual scheme eligibility fields and farmer attributes. The EVI service is intentionally not exposed as a finalized score until its exact mapping is locked against the project specification.

## Important

Do not commit `.env`.
Do not store plaintext passwords.
Do not put PostgreSQL credentials in React.


## Matching phase

Before using the new matching endpoints, run `alembic/versions/002_matching_fields.sql`.

New endpoints:
- GET /api/matching/evi
- GET /api/matching/recommendations?top_k=10

The matching flow follows the project README: hard eligibility filters, then TF-IDF/cosine similarity, then a 0.85/0.15 EVI alignment blend. The EVI is a prioritization heuristic, not a legal eligibility determination.

The supplied farmer dataset has no monthly electricity-unit field, so the electricity component uses the available connection field rather than inventing data.


## Farmer profile / registration phase

Run `alembic/versions/003_farmer_profile_fields.sql`.

New endpoints:
- POST /api/auth/register/new
- GET /api/farmers/me
- PATCH /api/farmers/me
- GET /api/farmers/lookup?source_farmer_id=...

`POST /api/auth/register/new` creates a new farmer profile and user account together and validates the selected district belongs to the selected state.

The API intentionally does not store raw Aadhaar or bank-account numbers. Sensitive identifiers should be handled with a dedicated encrypted/verification design before production.


## Admin analytics phase

Admin endpoints are now available under `/api/admin`.

Use `scripts/create_admin.py` to create the first administrator without hard-coding a password:

```bash
python scripts/create_admin.py
```

The admin dashboard API supports:

- India-wide overview
- State list with farmer/registration/application counts
- State detail
- State → district drill-down
- District detail
- Farmer search/filter/pagination
- Application analytics/filter/pagination
- Scheme usage analytics
- EVI distribution
- Crop distribution
- Gender/category distribution

Admin routes require one of:
- `district_admin`
- `state_admin`
- `super_admin`

Current implementation enforces the role but does not yet enforce geographic scope for `district_admin` or `state_admin`. Geographic scoping will be added when admin assignment tables are introduced.
