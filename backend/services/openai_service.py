import logging

logger = logging.getLogger(__name__)


class OpenAIService:
    """
    Wraps Azure OpenAI for embedding generation and chat.
    Lazy-imports openai so the backend starts even without the package.
    """

    def __init__(self):
        from config import settings
        self._mock = True

        if not settings.azure_openai_key:
            logger.warning("AZURE_OPENAI_KEY not set — OpenAIService in mock mode")
            return

        try:
            from openai import AsyncAzureOpenAI
            self.client = AsyncAzureOpenAI(
                api_key=settings.azure_openai_key,
                api_version=settings.azure_openai_api_version,
                azure_endpoint=settings.azure_openai_endpoint,
            )
            self._azure_deployment = settings.azure_openai_deployment
            self._embedding_deployment = settings.azure_openai_embedding_deployment
            self._mock = False
        except ImportError:
            logger.warning("openai package not installed — OpenAIService in mock mode. Run: pip install openai")

    async def embed(self, text: str) -> list[float]:
        if self._mock:
            return [0.0] * 1536

        response = await self.client.embeddings.create(
            model=self._embedding_deployment,
            input=text,
        )
        return response.data[0].embedding

    async def chat(self, system: str, user: str) -> str:
        if self._mock:
            return '{"mock": true}'

        response = await self.client.chat.completions.create(
            model=self._azure_deployment,
            messages=[
                {"role": "system", "content": system},
                {"role": "user", "content": user},
            ],
        )
        return response.choices[0].message.content or ""