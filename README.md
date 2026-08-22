# Kissan Connect

Kissan Connect is a farmer-first platform for discovering agricultural government schemes, understanding profile-based matching, and tracking applications. It combines a React frontend, a FastAPI backend, PostgreSQL data, and protected administrative analytics.

## Live Links

Add deployment URLs here after publishing the services:

- **Frontend:** `[ADD FRONTEND URL]`
- **Backend API:** `[ADD BACKEND API URL]`
- **API documentation:** `[ADD BACKEND URL]/docs`
- **Health check:** `[ADD BACKEND URL]/health`
- **Repository:** `[ADD REPOSITORY URL]`

## Main Features

- Public home page with an India state activity map
- Public state-level farmer reporting with green concentration shading and hover details
- Farmer registration with state and district selection
- Farmer login using JWT authentication
- Multi-step farmer profile and agricultural information form
- Economic Vulnerability Index (EVI) calculation as a decision-support heuristic
- Scheme recommendations using eligibility filters, TF-IDF, cosine similarity, and EVI alignment
- Scheme browsing and details
- Bookmarking and application tracking
- Officer login and protected admin dashboards
- India, state, and district analytics
- Farmer, application, scheme, gender, crop, category, and EVI analytics
- Language selector supporting the 22 scheduled languages of India for the farmer-facing flow

## Project Structure

```text
kissan-connect-02/
├── backend/                 FastAPI service and database integration
│   ├── app/
│   │   ├── api/routes/      Authentication, farmer, scheme, matching, and admin routes
│   │   ├── core/            Settings, database, and security
│   │   ├── models/          SQLAlchemy models
│   │   ├── schemas/         Pydantic request and response schemas
│   │   └── services/        EVI, matching, and analytics services
│   ├── alembic/versions/    SQL changes for matching and profile fields
│   ├── scripts/             Administrative utility scripts
│   └── requirements.txt
├── frontend/                React, Vite, and Tailwind application
│   ├── src/api/             Backend API clients
│   ├── src/components/      Layout, farmer, home, admin, and UI components
│   ├── src/context/         Authentication and language state
│   ├── src/pages/           Public, farmer, and admin pages
│   └── package.json
├── data/                    Source, cleaned, and validation datasets
└── README.md
```

## Quick Start (Docker — recommended)

From the repository root:

```bash
docker compose up --build
```

This starts:
- PostgreSQL on `localhost:5432`
- Backend API on `http://127.0.0.1:8000`
- Frontend on `http://localhost:5173`

The backend container automatically runs database initialization and seed data on first boot.

## Quick Start (Neon / existing PostgreSQL)

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate   # Windows: .venv\Scripts\Activate.ps1
pip install -r requirements.txt

# Create backend/.env with your Neon URL (see backend/.env.example)
python scripts/init_db.py
python scripts/seed_data.py
python run.py
```

In a second terminal:

```bash
cd frontend
echo "VITE_API_URL=http://127.0.0.1:8000/api" > .env
npm install
npm run dev
```

Or run the setup script:

```bash
bash scripts/setup.sh
```

## Requirements

- Python 3.10 or newer
- Node.js 18 or newer
- npm
- PostgreSQL 14 or newer
- A PostgreSQL database named `kissan-connect`

## Backend Setup

Open PowerShell or a terminal in `backend/`.

### Windows PowerShell

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

### macOS or Linux

```bash
cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
```

Create `backend/.env` with values appropriate for your machine:

```env
DATABASE_URL=postgresql+psycopg://USERNAME:PASSWORD@localhost:5432/kissan-connect
JWT_SECRET_KEY=replace-with-a-long-random-secret
JWT_ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=60
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173,http://localhost:5174,http://127.0.0.1:5174
```

Do not commit `.env` files or expose database credentials and JWT secrets in the frontend.

### Database Preparation

Ensure the base PostgreSQL tables are available. The project SQL schema is at `data/database/schema.sql`.

Apply the feature SQL changes once against the same database:

```text
backend/alembic/versions/002_matching_fields.sql
backend/alembic/versions/003_farmer_profile_fields.sql
```

The files are plain SQL migrations. Run them with your PostgreSQL client or migration workflow. They add EVI, matching, and extended farmer profile fields using `IF NOT EXISTS` safeguards.

### Start the Backend

From `backend/` with the virtual environment active:

```powershell
uvicorn app.main:app --reload
```

The backend is available at:

- API base: `http://127.0.0.1:8000/api`
- Swagger UI: `http://127.0.0.1:8000/docs`
- Health check: `http://127.0.0.1:8000/health`

## Frontend Setup

Open a second terminal in `frontend/`:

```powershell
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000/api
```

Start the development server:

```powershell
npm run dev
```

Vite normally uses `http://localhost:5173`. If that port is occupied, Vite selects another port such as `5174` or `5175`. Add the actual frontend origin to `backend/.env` under `CORS_ORIGINS`, then restart the backend.

Useful frontend commands:

```powershell
npm run build
npm run preview
```

## Application Routes

### Public

- `/` - Public home page and reporting map
- `/register` - Farmer registration
- `/farmer/login` - Farmer login
- `/officer/login` - Officer login

### Farmer

- `/farmer/dashboard` - Recommendations, EVI, applications, and bookmarks
- `/farmer/profile` - Farmer profile management
- `/farmer/schemes` - Scheme recommendations
- `/farmer/applications` - Application history
- `/farmer/bookmarks` - Saved schemes

### Admin

- `/admin` - National analytics dashboard
- `/admin/state/:stateId` - State analytics
- `/admin/district/:districtId` - District analytics

## API Overview

All application endpoints are prefixed with `/api`.

- `POST /auth/register/new` - Create a farmer and account
- `POST /auth/login` - Authenticate a farmer or officer
- `GET /auth/me` - Read the current authenticated user
- `GET /locations/states` - List states
- `GET /locations/states/{state_id}/districts` - List districts for a state
- `GET /farmers/me` and `PATCH /farmers/me` - Read and update the farmer profile
- `GET /matching/evi` - Calculate and persist the farmer EVI
- `GET /matching/recommendations?top_k=10` - Return matched schemes
- `GET /schemes` and `GET /schemes/{scheme_id}` - Browse schemes
- `GET /applications` and `POST /applications` - Read and create applications
- `GET /bookmarks`, `POST /bookmarks/{scheme_id}`, `DELETE /bookmarks/{scheme_id}` - Manage bookmarks
- `/admin/*` - Protected administrative analytics endpoints

Protected endpoints require:

```http
Authorization: Bearer <access-token>
```

Admin endpoints require one of these roles:

- `district_admin`
- `state_admin`
- `super_admin`

## Configuration and Deployment

### Frontend deployment (Vercel)

1. Push this repo to GitHub.
2. Import the project in [Vercel](https://vercel.com/new) and set the **Root Directory** to `frontend`.
3. Add environment variable:
   ```env
   VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
   ```
4. Deploy.

Or from the CLI (after `vercel login`):

```bash
cd frontend
npm run build
vercel --prod
```

### Backend deployment (Render / Railway / any Docker host)

The FastAPI backend is not suited for Vercel serverless. Deploy `backend/` using the included `Dockerfile` and `render.yaml`.

Set these environment variables on your host:

```env
DATABASE_URL=postgresql+psycopg://USER:PASS@HOST/neondb?sslmode=require
JWT_SECRET_KEY=<long-random-secret>
CORS_ORIGINS=https://YOUR-VERCEL-FRONTEND-DOMAIN
```

After deploying the backend, update `VITE_API_URL` in Vercel to point to the backend URL.

Run migrations once against Neon:

```bash
cd backend
source .venv/bin/activate
python scripts/init_db.py
python scripts/seed_data.py
```

Before production deployment:

- Use a strong randomly generated `JWT_SECRET_KEY`.
- Use a managed PostgreSQL instance with backups.
- Restrict database network access.
- Configure HTTPS for frontend and backend.
- Configure production CORS to exact frontend origins.
- Do not expose `.env` files, passwords, or tokens.
- Run migrations before starting the application.
- Add geographic scope enforcement for state and district admin roles before handling real administrative data.
- Replace public demo map statistics with an approved public reporting API or an audited published dataset.

## Troubleshooting

### Cannot connect to the API

1. Confirm the backend is running from `backend/`.
2. Open `http://127.0.0.1:8000/health` and confirm it returns a healthy response.
3. Confirm `frontend/.env` uses `http://127.0.0.1:8000/api`.
4. Confirm the browser origin and Vite port are included in `CORS_ORIGINS`.
5. Restart the backend after changing `.env`.
6. Start Vite from `frontend/`, not the repository root.

### API returns HTTP 500

Check the backend terminal traceback. A successful CORS preflight does not guarantee that endpoint logic or database mappings are valid. Confirm the database schema and feature SQL migrations match the SQLAlchemy models.

### Map does not appear

The public map uses the geography asset configured by `VITE_MAP_GEO_URL`, or its default remote TopoJSON asset. Confirm the browser has network access to that asset. For a production deployment, host an approved geography file with the frontend or configure `VITE_MAP_GEO_URL` to a reliable asset.

## Data and Privacy Notes

The EVI is a prioritization heuristic and is not a legal eligibility decision. Final scheme eligibility is governed by the applicable government programme rules.

The registration flow intentionally does not store raw Aadhaar or bank-account numbers. Sensitive identity verification should use a separate encrypted and audited design before production use.

The public landing map uses anonymized demo statistics. It should not be treated as an official government census or beneficiary report.

## License

No license file is currently defined in this repository. Add the appropriate license before public distribution.
