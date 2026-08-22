from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.core.config import settings
from app.api.routes import auth, locations, farmers, schemes, applications, bookmarks, admin, matching

app = FastAPI(
    title="Kissan Connect API",
    version="1.0.0",
    description="Production API for Kissan Connect farmer scheme discovery and administration.",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.cors_list,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router, prefix="/api")
app.include_router(locations.router, prefix="/api")
app.include_router(farmers.router, prefix="/api")
app.include_router(schemes.router, prefix="/api")
app.include_router(applications.router, prefix="/api")
app.include_router(bookmarks.router, prefix="/api")
app.include_router(admin.router, prefix="/api")
app.include_router(matching.router, prefix="/api")

@app.get("/")
def root():
    return {"name": "Kissan Connect API", "status": "ok"}

@app.get("/health")
def health():
    return {"status": "healthy"}
