import json
import logging

logger = logging.getLogger(__name__)


class GeminiService:
    """
    Wraps Google Gemini 1.5 Pro as the Action Planner.
    Lazy-imports google.generativeai so the backend starts even if the
    package is not installed — falls back to mock mode.
    """

    def __init__(self):
        from config import settings
        self._mock = True

        if not settings.gemini_api_key:
            logger.warning("GEMINI_API_KEY not set — GeminiService running in mock mode")
            return

        try:
            import google.generativeai as genai
            genai.configure(api_key=settings.gemini_api_key)
            self._model = genai.GenerativeModel(
                model_name=settings.gemini_model,
                generation_config=genai.GenerationConfig(
                    response_mime_type="application/json",
                    temperature=0.3,
                    max_output_tokens=4096,
                ),
            )
            self._mock = False
        except ImportError:
            logger.warning("google-generativeai not installed — GeminiService in mock mode. Run: pip install google-generativeai")

    async def plan_actions(self, context: dict) -> dict:
        """
        Given the full planning context (gaps, calendar, colleagues, resources),
        propose 3-5 specific micro-interventions.
        """
        if self._mock:
            return {
                "actions": [
                    {
                        "id": "act_1",
                        "title": "45-min learning block: AutoGen Orchestration Patterns",
                        "targetGap": "Agentic AI design",
                        "impact": "high",
                        "scheduledFor": "tomorrow 09:00",
                    },
                    {
                        "id": "act_2",
                        "title": "Read: Multimodal Fusion paper (Chen et al, 2026)",
                        "targetGap": "Multimodal systems",
                        "impact": "medium",
                        "scheduledFor": "this week",
                    },
                    {
                        "id": "act_3",
                        "title": "Connect with Jane D. (ML lead) — 30-min mentorship call",
                        "targetGap": "Causal reasoning",
                        "impact": "medium",
                        "scheduledFor": "Thursday 14:00",
                    },
                ],
                "mock": True,
            }

        prompt = f"Plan 3-5 specific micro-interventions for the following context. Return valid JSON only.\n\n{json.dumps(context)}"
        response = self._model.generate_content(prompt)
        return json.loads(response.text)