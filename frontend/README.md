# Kissan Connect Frontend

Production-oriented React + Vite + Tailwind frontend integrated with the supplied Kissan Connect FastAPI backend.

## Quick start

```powershell
npm install
Copy-Item .env.example .env
npm run dev
```

Local backend default:

```text
http://127.0.0.1:8000/api
```

For a separately deployed backend, set:

```text
VITE_API_BASE_URL=https://YOUR-BACKEND-DOMAIN/api
```

See `README_BACKEND_INTEGRATION.md` for the complete API contract and deployment notes.
