from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from config import settings
from api.routes import auth, users, gaps, signals, agent, org, progress
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Real-time human-AI co-evolution engine powered by Azure AI, AutoGen, Semantic Kernel, and multi-model AI.",
)

# CORS — uses settings so it works in dev and production
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router,     prefix="/auth",     tags=["auth"])
app.include_router(users.router,    prefix="/users",    tags=["users"])
app.include_router(gaps.router,     prefix="/gaps",     tags=["gaps"])
app.include_router(signals.router,  prefix="/signals",  tags=["signals"])
app.include_router(agent.router,    prefix="/agent",    tags=["agents"])
app.include_router(org.router,      prefix="/org",      tags=["org"])
app.include_router(progress.router, prefix="/progress", tags=["progress"])


@app.get("/", tags=["health"])
def read_root():
    return {
        "status": "ok",
        "app": settings.app_name,
        "environment": settings.environment,
        "version": "1.0.0",
    }


@app.get("/health", tags=["health"])
def health_check():
    """
    Endpoint for load-balancer / Azure App Service health probes.
    """
    return {"status": "healthy"}
