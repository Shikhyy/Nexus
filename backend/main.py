from fastapi import FastAPI
from api.routes import auth, users, gaps, signals, agent, org, progress

app = FastAPI(title="NEXUS Backend API")

app.include_router(auth.router, prefix="/auth")
app.include_router(users.router, prefix="/users")
app.include_router(gaps.router, prefix="/gaps")
app.include_router(signals.router, prefix="/signals")
app.include_router(agent.router, prefix="/agent")
app.include_router(org.router, prefix="/org")
app.include_router(progress.router, prefix="/progress")

@app.get("/")
def read_root():
    return {"status": "ok", "app": "NEXUS Human-AI Co-Evolution Engine"}
