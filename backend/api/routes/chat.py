from fastapi import APIRouter
from pydantic import BaseModel
from agents.action_planner import ActionPlannerAgent
import asyncio

router = APIRouter()

class ChatRequest(BaseModel):
    message: str

@router.post("/ask")
async def ask_copilot(req: ChatRequest):
    await asyncio.sleep(1.0) # Simulate LLM generation latency
    planner = ActionPlannerAgent()
    response = await planner.chat(req.message)
    return {"reply": response}
