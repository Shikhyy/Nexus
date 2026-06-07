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
        calendar_slots: list[dict] | None = None,
    ) -> dict:
        """
        Calls Gemini to generate a personalized action plan.
        
        Args:
            gaps: GapIndex ranked gap list
            capability_model: user's current capability profile
            calendar_slots: available time blocks from M365 Graph
        """
        context = {
            "openGaps": gaps[:5],  # Top 5 only to stay focused
            "capabilityProfile": capability_model,
            "availableSlots": calendar_slots or [],
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