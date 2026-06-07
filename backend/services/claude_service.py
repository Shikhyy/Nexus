import logging

logger = logging.getLogger(__name__)


class ClaudeService:
    """
    Wraps Anthropic Claude for capability modelling.
    Lazy-imports anthropic so the backend starts even without the package.
    """

    def __init__(self):
        from config import settings
        self._mock = True

        if not settings.anthropic_api_key:
            logger.warning("ANTHROPIC_API_KEY not set — ClaudeService in mock mode")
            return

        try:
            import anthropic
            self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
            self._model = settings.claude_model
            self._mock = False
        except ImportError:
            logger.warning("anthropic package not installed — ClaudeService in mock mode. Run: pip install anthropic")

    async def model_capabilities(self, m365_activity: dict) -> dict:
        if self._mock:
            return {
                "capabilities": [
                    {"name": "Python engineering",      "level": 0.82, "confidence": 0.9},
                    {"name": "System design",           "level": 0.71, "confidence": 0.75},
                    {"name": "Agentic AI design",       "level": 0.18, "confidence": 0.85},
                    {"name": "Multimodal ML",           "level": 0.31, "confidence": 0.70},
                ],
                "mock": True,
            }

        prompt = f"Analyse the following M365 activity and return a structured JSON capability model:\n\n{m365_activity}"
        message = self.client.messages.create(
            model=self._model,
            max_tokens=2048,
            messages=[{"role": "user", "content": prompt}],
        )
        return {"raw": message.content[0].text}

    async def analyse_gap_evidence(self, gap: dict, signals: list) -> dict:
        if self._mock:
            return {"rationale": "Mock gap analysis", "intervention": "Self-study"}

        content = f"Gap: {gap}\n\nEvidence Signals: {signals}"
        message = self.client.messages.create(
            model=self._model,
            max_tokens=1024,
            messages=[{"role": "user", "content": content}],
        )
        return {"analysis": message.content[0].text}