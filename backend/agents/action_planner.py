from services.gemini_service import GeminiService
import logging

logger = logging.getLogger(__name__)


class ActionPlannerAgent:
    """
    AutoGen-style agent: uses Gemini's long-context capability to
    ingest the full planning context and generate highly-specific,
    calendar-aware micro-interventions.
    """

    def __init__(self):
        self.gemini = GeminiService()

    async def plan(
        self,
        gaps: list[dict],
        capability_model: dict,
        user_id: str = "current_user",
    ) -> dict:
        """
        Calls Gemini to generate a personalized action plan.
        
        Args:
            gaps: GapIndex ranked gap list
            capability_model: user's current capability profile
            user_id: string to fetch available time blocks from M365 Graph
        """
        from services.graph_service import MSGraphService
        graph = MSGraphService()
        calendar_slots = await graph.get_calendar_slots(user_id)
        
        context = {
            "openGaps": gaps[:5],  # Top 5 only to stay focused
            "capabilityProfile": capability_model,
            "availableSlots": calendar_slots,
        }

        logger.info("ActionPlanner: generating plan for %d gaps", len(gaps))
        result = await self.gemini.plan_actions(context)

        actions = result.get("actions", [])
        logger.info("ActionPlanner: produced %d actions", len(actions))
        return {"actions": actions}

    async def refine_action(self, action_id: str, feedback: str, existing_actions: list[dict]) -> dict:
        """Allow the user to give feedback and regenerate a specific action."""
        context = {
            "feedback": feedback,
            "actionToRefine": next((a for a in existing_actions if a["id"] == action_id), {}),
            "allActions": existing_actions,
        }
        return await self.gemini.plan_actions(context)

    async def chat(self, user_message: str) -> str:
        """
        Handles free-form conversational queries from the Nexus Copilot UI.
        """
        logger.info(f"ActionPlanner: handling chat query -> {user_message[:50]}")
        
        # MOCK IMPLEMENTATION: In production, this passes the user_message to Gemini
        # wrapped in Semantic Kernel context.
        query = user_message.lower()
        if "agentic" in query or "team" in query:
            return "Based on Semantic Kernel capability mapping, Dr. Emily Wu and Marcus Johnson have strong latent signals in Agentic AI. I can assemble a Tiger Team for you."
        if "vector" in query or "db" in query:
            return "Vector DB adoption is rising (60% Fortune 500). Sarah Jenkins recently committed several Pinecone integrations. I recommend pairing her with a junior dev for a knowledge transfer session."
        
        return "I can analyze our market signals against your M365 organizational capability map. Try asking me to form a team or find an internal expert for a specific technology."