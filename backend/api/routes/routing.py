from fastapi import APIRouter, Depends
from agents.talent_broker import TalentBrokerAgent
from api.routes.auth import get_current_user

router = APIRouter()

# Singleton broker
_broker = TalentBrokerAgent()


@router.get("/mentorships")
async def get_mentorship_pairs(current_user: dict = Depends(get_current_user)):
    pairs = await _broker.generate_mentorship_pairs({"name": "Agentic AI Orchestration"})
    pairs.extend(await _broker.generate_mentorship_pairs({"name": "Vector Database Optimization"}))
    return {"mentorships": pairs}


@router.get("/teams")
async def get_strike_teams(current_user: dict = Depends(get_current_user)):
    team1 = await _broker.assemble_strike_team("Build Enterprise Multi-Agent Backend")
    return {"teams": [team1]}
