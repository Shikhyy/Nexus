import json
import logging
from config import settings

logger = logging.getLogger(__name__)

class GroqService:
    """
    Wraps Groq for ultra-fast LLM inference using Llama 3 or Mixtral.
    """

    def __init__(self):
        self._mock = True
        
        if not settings.groq_api_key:
            logger.warning("GROQ_API_KEY not set — GroqService running in mock mode")
            return
            
        try:
            from groq import AsyncGroq
            self.client = AsyncGroq(api_key=settings.groq_api_key)
            self._model = settings.groq_model
            self._mock = False
        except ImportError:
            logger.warning("groq package not installed — GroqService in mock mode. Run: pip install groq")

    async def generate_json(self, system: str, user: str, mock_fallback: dict) -> dict:
        """
        Requests JSON output from Groq.
        """
        if self._mock:
            return mock_fallback

        try:
            response = await self.client.chat.completions.create(
                model=self._model,
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ],
                response_format={"type": "json_object"},
            )
            return json.loads(response.choices[0].message.content)
        except Exception as e:
            logger.error(f"Groq API error: {e}")
            return mock_fallback

    async def chat(self, system: str, user: str, mock_fallback: str) -> str:
        """
        Standard text response from Groq.
        """
        if self._mock:
            return mock_fallback

        try:
            response = await self.client.chat.completions.create(
                model=self._model,
                messages=[
                    {"role": "system", "content": system},
                    {"role": "user", "content": user},
                ]
            )
            return response.choices[0].message.content
        except Exception as e:
            logger.error(f"Groq API error: {e}")
            return mock_fallback
