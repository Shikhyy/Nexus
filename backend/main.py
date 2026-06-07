from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded
from config import settings
from api.routes import auth, users, gaps, signals, agent, org, routing, chat, progress
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# ── Rate Limiter ──────────────────────────────────────────────────────────────
limiter = Limiter(key_func=get_remote_address, default_limits=["60/minute"])

app = FastAPI(
    title=settings.app_name,
    version="1.0.0",
    description="Real-time human-AI co-evolution engine powered by Groq, AutoGen, and Semantic Kernel.",
)

app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

# ── Global Error Handler ──────────────────────────────────────────────────────
@app.exception_handler(Exception)
async def global_exception_handler(request: Request, exc: Exception):
    logger.error(f"Global exception on {request.url}: {exc}")
    return JSONResponse(
        status_code=500,
        content={"detail": "An internal server error occurred."},
    )

# ── CORS ──────────────────────────────────────────────────────────────────────
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.allowed_origins,
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allow_headers=["Authorization", "Content-Type", "Accept"],
)

# ── Routers ───────────────────────────────────────────────────────────────────
app.include_router(auth.router,     prefix="/auth",     tags=["auth"])
app.include_router(users.router,    prefix="/users",    tags=["users"])
app.include_router(gaps.router,     prefix="/gaps",     tags=["gaps"])
app.include_router(signals.router,  prefix="/signals",  tags=["signals"])
app.include_router(agent.router,    prefix="/agent",    tags=["agents"])
app.include_router(org.router,      prefix="/org",      tags=["org"])
app.include_router(routing.router,  prefix="/routing",  tags=["routing"])
app.include_router(chat.router,     prefix="/chat",     tags=["chat"])
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
    """Endpoint for load-balancer / Azure App Service health probes."""
    return {"status": "healthy"}
