from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel
from agents.action_planner import ActionPlannerAgent
from agents.gap_analyser import GapAnalyserAgent
from models.gap import Gap
from typing import Optional
from api.routes.auth import get_current_user
import logging

router = APIRouter()
logger = logging.getLogger(__name__)

# Singletons
_planner = ActionPlannerAgent()
_analyser = GapAnalyserAgent()


class PlanRequest(BaseModel):
    gaps: Optional[list[Gap]] = None
    use_default_gaps: bool = True


@router.post("/plan")
async def generate_action_plan(
    req: PlanRequest,
    current_user: dict = Depends(get_current_user)
):
    """Calls ActionPlannerAgent (Groq) to produce personalized micro-interventions."""
    try:
        if req.use_default_gaps or not req.gaps:
            from api.routes.gaps import _get_gap_data
            index = _get_gap_data()
            gaps_data = [g.model_dump() for g in index.gaps]
        else:
            gaps_data = [g.model_dump() for g in req.gaps]

        result = await _planner.plan(gaps=gaps_data, capability_model={})
        return {
            "status": "ok",
            "actions": result.get("actions", []),
            "gapCount": len(gaps_data),
        }
    except Exception as e:
        logger.error("ActionPlanner failed: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status")
def agent_status(current_user: dict = Depends(get_current_user)):
    """Returns health/status of all active agents."""
    from config import settings
    model = settings.groq_model if settings.groq_api_key else "mock"
    return {
        "agents": [
            {"name": "SignalFuserAgent",        "status": "active", "model": f"groq/{model}"},
            {"name": "CapabilityModellerAgent", "status": "active", "model": f"groq/{model}"},
            {"name": "GapAnalyserAgent",        "status": "active", "model": f"groq/{model}"},
            {"name": "ActionPlannerAgent",      "status": "active", "model": f"groq/{model}"},
        ]
    }
