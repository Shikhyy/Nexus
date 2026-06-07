from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from agents.action_planner import ActionPlannerAgent
from agents.gap_analyser import GapAnalyserAgent
from models.gap import Gap
from typing import Optional
import logging

router = APIRouter()
logger = logging.getLogger(__name__)


class PlanRequest(BaseModel):
    gaps: Optional[list[Gap]] = None
    use_default_gaps: bool = True


@router.post("/plan")
async def generate_action_plan(req: PlanRequest):
    """
    Calls ActionPlannerAgent (Gemini) to produce personalized micro-interventions.
    """
    try:
        # Use supplied gaps or load defaults
        gaps_data: list[dict]
        if req.use_default_gaps or not req.gaps:
            from api.routes.gaps import get_gaps
            index = get_gaps()
            gaps_data = [g.model_dump() for g in index.gaps]
        else:
            gaps_data = [g.model_dump() for g in req.gaps]

        planner = ActionPlannerAgent()
        result = await planner.plan(gaps=gaps_data, capability_model={})

        return {
            "status": "ok",
            "actions": result.get("actions", []),
            "gapCount": len(gaps_data),
        }
    except Exception as e:
        logger.error("ActionPlanner failed: %s", e)
        raise HTTPException(status_code=500, detail=str(e))


@router.get("/status")
def agent_status():
    """Returns health/status of all active agents."""
    return {
        "agents": [
            {"name": "SignalFuserAgent",        "status": "active", "model": "azure-openai/text-embedding-3-large"},
            {"name": "CapabilityModellerAgent", "status": "active", "model": "claude-sonnet-4-6"},
            {"name": "GapAnalyserAgent",        "status": "active", "model": "azure-openai/embeddings"},
            {"name": "ActionPlannerAgent",      "status": "active", "model": "gemini-1.5-pro"},
        ]
    }
