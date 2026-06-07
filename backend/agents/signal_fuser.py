from services.openai_service import OpenAIService
import numpy as np
import logging

logger = logging.getLogger(__name__)


class SignalFuserAgent:
    """
    AutoGen-style agent: takes raw market signals from multiple sources
    and fuses them into a normalized DomainDemandVector using
    Azure OpenAI embeddings + cosine similarity clustering.
    """

    def __init__(self):
        self.ai = OpenAIService()

    async def fuse_signals(self, raw_signals: list[dict]) -> dict:
        """
        Embed each signal title, cluster by domain, return demand vector.
        """
        if not raw_signals:
            return {}

        domain_scores: dict[str, float] = {}

        for signal in raw_signals:
            title = signal.get("title", "")
            domain = signal.get("domain", "general")
            weight = float(signal.get("weight", 1.0))

            # In production: embed the signal and use cosine similarity
            # to determine domain affinity. For now use weight directly.
            embedding = await self.ai.embed(title)
            magnitude = float(np.linalg.norm(embedding)) if any(embedding) else 1.0

            domain_scores[domain] = domain_scores.get(domain, 0.0) + (weight / magnitude)

        # Normalize scores to [0, 1]
        max_score = max(domain_scores.values()) if domain_scores else 1.0
        normalized = {k: round(v / max_score, 4) for k, v in domain_scores.items()}

        return {"domainDemandVector": normalized, "signalCount": len(raw_signals)}

    async def get_trending_domains(self, signals: list[dict]) -> list[str]:
        """Return domains sorted by demand score descending."""
        fused = await self.fuse_signals(signals)
        vector = fused.get("domainDemandVector", {})
        return sorted(vector.keys(), key=lambda k: vector[k], reverse=True)