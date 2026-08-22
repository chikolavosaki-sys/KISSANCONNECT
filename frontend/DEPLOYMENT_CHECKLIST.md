# Deployment checklist

1. Build:
   `npm run build`

2. Configure:
   `VITE_API_BASE_URL=https://YOUR-BACKEND-DOMAIN/api`
   when frontend/backend are on different domains.

3. Backend CORS must include the exact frontend origin.

4. Test:
   - `/api/locations/states` loads on registration.
   - Selecting a state loads districts.
   - Farmer registration returns a JWT.
   - Farmer login redirects to `/farmer/dashboard`.
   - Officer login redirects to `/admin`.
   - Admin state and district drill-down works.

5. Never expose:
   - DATABASE_URL
   - PostgreSQL password
   - JWT_SECRET_KEY
