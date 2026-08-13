# KisanConnect (KisanSetu)

Farmer-to-government-scheme eligibility matching platform for India. Built for [Hackathon Name].

Goes beyond myScheme.gov.in with agriculture-vertical specificity: rich land/crop/irrigation
profiling, a computed **Economic Vulnerability Index (EVI)**, a two-sided application workflow
with admin review, and district/state-level public analytics.

## Repo layout

| Folder      | Purpose |
|-------------|---------|
| `frontend/` | React app — landing, registration, dashboard, scheme browser, admin portal, analytics |
| `backend/`  | FastAPI app — REST API, EVI engine, matching pipeline, auth |
| `data/`     | Synthetic dataset generators (Faker, SECC-2011 / Agri Census anchored) |
| `docs/`     | Handoff doc, architecture diagram, API spec |

## Quick start

### 1. Clone
```bash
git clone https://github.com/<your-org>/kisanconnect.git
cd kisanconnect
```

### 2. Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate        # Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env             # fill in DB URL, JWT secret
uvicorn app.main:app --reload
```
API runs at `http://localhost:8000` (docs at `/docs`).

### 3. Frontend
```bash
cd frontend
npm install
cp .env.example .env             # set VITE_API_URL / NEXT_PUBLIC_API_URL
npm run dev
```

### 4. Database (Postgres via Docker, optional but recommended)
```bash
docker-compose up -d postgres
```

### 5. Generate synthetic data
```bash
cd data/generators
python generate_districts.py
python generate_schemes.py
python generate_farmers.py --count 2000
```

## Tech stack
- **Frontend:** React (builder.io export), Tailwind
- **Backend:** FastAPI, PostgreSQL, SQLAlchemy, JWT/RBAC
- **Matching:** scikit-learn (TF-IDF + cosine similarity)
- **Data:** Python + Faker, SECC-2011 methodology
- **Deployment:** Vercel (frontend) / Render (backend) / Supabase (DB)

## Team workflow
- Branch off `main`: `git checkout -b feature/<name>`
- PR into `main`, at least one review before merge
- Keep `.env` files local — never commit secrets (see `.gitignore`)

See `docs/KisanConnect_Project_Handoff.md` for full architecture context.
