from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import farmers, schemes, applications, admin, analytics, auth

app = FastAPI(
    title="KisanConnect API",
    description="Farmer-to-government-scheme eligibility matching platform",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api/auth", tags=["auth"])
app.include_router(farmers.router, prefix="/api/farmers", tags=["farmers"])
app.include_router(schemes.router, prefix="/api/schemes", tags=["schemes"])
app.include_router(applications.router, prefix="/api/applications", tags=["applications"])
app.include_router(admin.router, prefix="/api/admin", tags=["admin"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])


@app.get("/")
def health_check():
    return {"status": "ok", "service": "KisanConnect API"}
