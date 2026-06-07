from services.groq_service import GroqService
import logging

logger = logging.getLogger(__name__)

class ActionPlannerAgent:
    def __init__(self):
        self.groq = GroqService()

    async def plan(self, gaps: list[dict], capability_model: dict, user_id: str = "current_user") -> dict:
        from services.graph_service import MSGraphService
        graph = MSGraphService()
        calendar_slots = await graph.get_calendar_slots(user_id)
        
        context = {
            "openGaps": gaps[:5],
            "capabilityProfile": capability_model,
            "availableSlots": calendar_slots,
        }

        mock_fallback = {
            "actions": [
                {"id": "act_1", "title": "45-min learning block: AutoGen Orchestration", "targetGap": "Agentic AI", "impact": "high", "scheduledFor": "tomorrow 09:00"},
                {"id": "act_2", "title": "Read: Multimodal Fusion paper", "targetGap": "Multimodal systems", "impact": "medium", "scheduledFor": "this week"}
            ]
        }

        system = "You are the Action Planner. Given a capability profile and open gaps, propose 3-5 micro-interventions. Return valid JSON containing an 'actions' array."
        result = await self.groq.generate_json(system, f"Context:\n{context}", mock_fallback)
        return {"actions": result.get("actions", [])}

    async def refine_action(self, action_id: str, feedback: str, existing_actions: list[dict]) -> dict:
        context = {"feedback": feedback, "actionToRefine": next((a for a in existing_actions if a["id"] == action_id), {}), "allActions": existing_actions}
        mock_fallback = {"actions": existing_actions}
        system = "Refine the specific action based on feedback. Return valid JSON containing the 'actions' array."
        return await self.groq.generate_json(system, f"Context:\n{context}", mock_fallback)

    async def chat(self, user_message: str) -> str:
        system = "You are the Nexus Copilot. Answer concisely based on the user query."
        query = user_message.lower()
        if "agentic" in query or "team" in query:
            fallback = "Based on Semantic Kernel capability mapping, Dr. Emily Wu and Marcus Johnson have strong latent signals in Agentic AI. I can assemble a Tiger Team for you."
        elif "vector" in query or "db" in query:
            fallback = "Vector DB adoption is rising. I recommend pairing Sarah Jenkins with a junior dev for a knowledge transfer session."
        else:
            fallback = "I can analyze our market signals against your organizational capability map. Try asking me to form a team."
            
        return await self.groq.chat(system, user_message, fallback)