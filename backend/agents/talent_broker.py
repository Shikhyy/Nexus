from services.gemini_service import GeminiService
from agents.memory import SemanticKernelMemory
import logging

logger = logging.getLogger(__name__)


class TalentBrokerAgent:
    """
    Acts as an internal resource allocator and mentorship matchmaker.
    Uses Semantic Kernel to find employees with specific latent skills
    and Gemini to form cross-functional teams and mentorship pairs.
    """

    def __init__(self):
        self.gemini = GeminiService()
        self.memory = SemanticKernelMemory()

    async def generate_mentorship_pairs(self, gap: dict) -> list[dict]:
        """
        Finds a senior expert for a specific gap and pairs them with a novice.
        """
        # In a real scenario, we'd query Semantic Kernel for employees
        # who have high capability in `gap['name']`.
        
        # MOCK IMPLEMENTATION for demo purposes
        domain = gap.get("name", "Unknown")
        return [
            {
                "id": f"pair_{domain}_1",
                "mentor": "Alex Chen",
                "mentorRole": "Principal Engineer",
                "mentee": "Sarah Jenkins",
                "menteeRole": "Frontend Dev",
                "topic": domain,
                "status": "pending_approval",
                "matchScore": 92
            }
        ]

    async def assemble_strike_team(self, objective: str) -> dict:
        """
        Assembles a cross-functional team for a new high-priority objective.
        """
        # MOCK IMPLEMENTATION for demo purposes
        return {
            "id": f"team_{hash(objective)}",
            "objective": objective,
            "teamName": "Tiger Team Alpha",
            "members": [
                {"name": "Dr. Emily Wu", "role": "AI Architect", "reason": "High capability in LLM Orchestration"},
                {"name": "Marcus Johnson", "role": "Data Engineer", "reason": "Extensive M365 activity with Vector DBs"},
                {"name": "Priya Patel", "role": "Product Lead", "reason": "History of shipping Agentic features"}
            ],
            "readinessScore": 88
        }
