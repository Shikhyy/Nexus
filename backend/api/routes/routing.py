from fastapi import APIRouter
from agents.talent_broker import TalentBrokerAgent

router = APIRouter()

@router.get("/mentorships")
async def get_mentorship_pairs():
    broker = TalentBrokerAgent()
    # Mocking a gap to find pairs for
    pairs = await broker.generate_mentorship_pairs({"name": "Agentic AI Orchestration"})
    pairs.extend(await broker.generate_mentorship_pairs({"name": "Vector Database Optimization"}))
    return {"mentorships": pairs}

@router.get("/teams")
async def get_strike_teams():
    broker = TalentBrokerAgent()
    team1 = await broker.assemble_strike_team("Build Enterprise Multi-Agent Backend")
    return {"teams": [team1]}
