from services.groq_service import GroqService
import logging

logger = logging.getLogger(__name__)

class CapabilityModellerAgent:
    def __init__(self):
        self.groq = GroqService()

    async def build_model(self, user_id: str) -> dict:
        from services.graph_service import MSGraphService
        graph = MSGraphService()
        m365_activity = await graph.get_recent_activity(user_id)
        
        mock_fallback = {
            "capabilities": [
                {"name": "Agentic AI", "level": 0.85, "trend": "up", "evidenceCount": 42},
                {"name": "React Server Components", "level": 0.9, "trend": "up", "evidenceCount": 112},
                {"name": "LLM Orchestration", "level": 0.6, "trend": "stable", "evidenceCount": 15}
            ]
        }
        
        system = "You are a Capability Modeller. Infer technical capabilities from Microsoft 365 signals. Return valid JSON containing a 'capabilities' array with properties: name, level (0-1), trend, and evidenceCount."
        model = await self.groq.generate_json(system, f"M365 Activity:\n{m365_activity}", mock_fallback)
        
        return {
            "capabilities": model.get("capabilities", []),
            "generatedAt": None,
            "source": "m365_graph",
        }

    async def update_capability(self, existing: dict, new_evidence: dict) -> dict:
        merged = {**existing, "newEvidence": new_evidence}
        mock_fallback = {"capabilities": existing.get("capabilities", [])}
        system = "Update the capability model with new evidence. Return valid JSON containing a 'capabilities' array."
        return await self.groq.generate_json(system, f"Merged Context:\n{merged}", mock_fallback)