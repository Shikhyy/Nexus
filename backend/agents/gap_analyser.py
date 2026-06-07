from services.openai_service import OpenAIService
import numpy as np
import logging

logger = logging.getLogger(__name__)


class GapAnalyserAgent:
    """
    AutoGen-style agent: computes cosine similarity between
    the DomainDemandVector (from SignalFuser) and the
    CapabilityModel (from CapabilityModeller), producing
    a ranked GapIndex.
    """

    def __init__(self):
        self.ai = OpenAIService()

    async def compute_gaps(
        self,
        capability_model: dict,
        demand_vector: dict,
    ) -> list[dict]:
        """
        Returns a ranked list of Gap objects.
        Gap urgency = demand_score - capability_score (clamped 0-1)
        """
        capabilities = capability_model.get("capabilities", [])
        cap_map = {c["name"].lower(): c["level"] for c in capabilities}

        gaps = []
        for domain, demand_score in demand_vector.items():
            # Resolve domain to closest known capability
            cap_score = cap_map.get(domain.lower().replace("_", " "), 0.0)
            urgency = max(0.0, demand_score - cap_score)

            if urgency > 0.05:  # Only surface meaningful gaps
                gaps.append({
                    "id": f"gap_{domain}",
                    "name": domain.replace("_", " ").title(),
                    "domain": "technical",
                    "coverageScore": round(cap_score, 3),
                    "urgencyScore": round(urgency, 3),
                    "horizon": "6m" if urgency > 0.7 else ("18m" if urgency > 0.4 else "36m"),
                    "status": "critical" if urgency > 0.7 else ("watch" if urgency > 0.35 else "closing"),
                    "trend": "widening" if urgency > 0.6 else "stable",
                    "signalIds": [],
                })

        # Rank by urgency descending
        return sorted(gaps, key=lambda g: g["urgencyScore"], reverse=True)

    def compute_readiness_score(self, gaps: list[dict]) -> float:
        """Overall readiness = 100 - weighted average gap urgency * 100."""
        if not gaps:
            return 100.0
        avg_urgency = sum(g["urgencyScore"] for g in gaps) / len(gaps)
        return round(max(0.0, 100.0 - avg_urgency * 100), 1)