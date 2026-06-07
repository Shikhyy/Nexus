from fastapi import APIRouter, Depends, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from agents.action_planner import ActionPlannerAgent
from api.routes.auth import get_current_user

router = APIRouter()
limiter = Limiter(key_func=get_remote_address)

# Singleton agent — created once per module load
_planner = ActionPlannerAgent()


class ChatRequest:
    def __init__(self, message: str):
        self.message = message


from pydantic import BaseModel

class ChatRequestBody(BaseModel):
    message: str


@router.post("/ask")
@limiter.limit("20/minute")
async def ask_copilot(
    request: Request,
    req: ChatRequestBody,
    current_user: dict = Depends(get_current_user)
):
    response = await _planner.chat(req.message)
    return {"reply": response, "user": current_user["name"]}
