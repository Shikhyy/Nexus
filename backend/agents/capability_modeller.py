from services.claude_service import ClaudeService
import logging

logger = logging.getLogger(__name__)


class CapabilityModellerAgent:
    """
    AutoGen-style agent: reads Microsoft 365 behavioral signals
    (calendar, Teams messages, documents touched) and uses
    Claude's reasoning ability to infer latent capability levels.
    """

    def __init__(self):
        self.claude = ClaudeService()

    async def build_model(self, user_id: str) -> dict:
        """
        Input: user_id to fetch raw M365 Graph API payload (meetings, docs, code activity)
        Output: structured CapabilityModel with confidence scores
        """
        logger.info(f"CapabilityModeller: fetching M365 activity for {user_id}")
        
        from services.graph_service import MSGraphService
        graph = MSGraphService()
        m365_activity = await graph.get_recent_activity(user_id)
        
        logger.info("CapabilityModeller: building model from M365 activity")
        model = await self.claude.model_capabilities(m365_activity)
        return {
            "capabilities": model.get("capabilities", []),
            "generatedAt": None,
            "source": "m365_graph",
        }

    async def update_capability(self, existing: dict, new_evidence: dict) -> dict:
        """Incrementally update a capability model with new evidence."""
        merged = {**existing, "newEvidence": new_evidence}
        return await self.claude.model_capabilities(merged)