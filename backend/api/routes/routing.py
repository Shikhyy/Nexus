from fastapi import APIRouter
from agents.talent_broker import TalentBrokerAgent
import asyncio

router = APIRouter()

@router.get("/mentorships")
async def get_mentorship_pairs():
    await asyncio.sleep(1.2)  # Simulate Semantic Kernel processing latency
    broker = TalentBrokerAgent()
    pairs = await broker.generate_mentorship_pairs({"name": "Agentic AI Orchestration"})
    pairs.extend(await broker.generate_mentorship_pairs({"name": "Vector Database Optimization"}))
    return {"mentorships": pairs}

@router.get("/teams")
async def get_strike_teams():
    await asyncio.sleep(1.8)  # Simulate Semantic Kernel processing latency
    broker = TalentBrokerAgent()
    team1 = await broker.assemble_strike_team("Build Enterprise Multi-Agent Backend")
    return {"teams": [team1]}
