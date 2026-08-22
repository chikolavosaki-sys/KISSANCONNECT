# Kissan Connect — Frontend integrated with the supplied FastAPI backend

This frontend is aligned to the backend ZIP supplied for Kissan Connect.

## Backend contract used

Authentication:
- `POST /api/auth/register/new`
- `POST /api/auth/login`
- `GET /api/auth/me`

Locations:
- `GET /api/locations/states`
- `GET /api/locations/states/{state_id}/districts`

Farmer:
- `GET /api/farmers/me`
- `PATCH /api/farmers/me`

Matching:
- `GET /api/matching/evi`
- `GET /api/matching/recommendations?top_k=10`

Schemes:
- `GET /api/schemes`
- `GET /api/schemes/{scheme_id}`

Applications:
- `GET /api/applications`
- `POST /api/applications`

Bookmarks:
- `GET /api/bookmarks`
- `POST /api/bookmarks/{scheme_id}`
- `DELETE /api/bookmarks/{scheme_id}`

Admin:
- `GET /api/admin/overview`
- `GET /api/admin/states`
- `GET /api/admin/states/{state_id}`
- `GET /api/admin/states/{state_id}/districts`
- `GET /api/admin/districts/{district_id}`
- `GET /api/admin/farmers`
- `GET /api/admin/applications`
- `GET /api/admin/schemes`

## Run locally

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

The local default is:

```text
http://127.0.0.1:8000/api
```

The backend supplied in the ZIP currently has:

```text
CORS_ORIGINS=http://localhost:5173
```

If you open the frontend at `http://127.0.0.1:5173`, add that origin to the backend CORS configuration too:

```text
CORS_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

Restart the backend after changing it.

## Deploying the frontend

For a frontend deployed separately from the backend, set the build-time environment variable:

```text
VITE_API_URL=https://YOUR-BACKEND-DOMAIN/api
```

The backend deployment must also allow the deployed frontend origin in:

```text
CORS_ORIGINS=https://YOUR-FRONTEND-DOMAIN
```

If frontend and backend are served through the same domain/reverse proxy, the frontend automatically falls back to:

```text
/api
```

in production.

## Important

Do not put the PostgreSQL username, PostgreSQL password, or JWT secret in the frontend.

The frontend stores only the access JWT returned by the authentication endpoint.

## Registration

The registration page uses the backend's real `NewFarmerRegisterRequest`.

The flow is:

1. Load states from PostgreSQL-backed `/api/locations/states`.
2. Load districts after a state is selected.
3. Submit the required registration fields to `/api/auth/register/new`.
4. Store the returned JWT.
5. Submit the extended agricultural/economic fields to `/api/farmers/me`.
6. Open the farmer dashboard.

## Admin

The officer login uses the same `/api/auth/login` endpoint and accepts:

- `district_admin`
- `state_admin`
- `super_admin`

The admin dashboard then calls the protected `/api/admin/*` endpoints.

The public landing-page map remains the existing public/demo visualization because the supplied backend intentionally exposes admin analytics only behind authentication. The frontend does not bypass that security boundary.
