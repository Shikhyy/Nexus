import logging
from config import settings

logger = logging.getLogger(__name__)


class SemanticKernelMemory:
    """
    Microsoft Semantic Kernel integration for long-term memory.
    Uses Azure AI Search as the vector database for capabilities and signals.
    """

    def __init__(self):
        self._mock = True
        
        try:
            import semantic_kernel as sk
            from semantic_kernel.connectors.memory.azure_cognitive_search import AzureCognitiveSearchMemoryStore
            
            if settings.azure_search_key and settings.azure_search_endpoint:
                self.kernel = sk.Kernel()
                
                # Configure Azure AI Search as the memory store
                store = AzureCognitiveSearchMemoryStore(
                    vector_size=1536,
                    search_endpoint=settings.azure_search_endpoint,
                    admin_key=settings.azure_search_key,
                )
                
                self.kernel.register_memory_store(memory_store=store)
                self._mock = False
            else:
                logger.warning("AZURE_SEARCH keys missing — Semantic Kernel running in mock mode")
        except ImportError:
            logger.warning("semantic_kernel not installed — Semantic Kernel running in mock mode")

    async def save_capability_evidence(self, user_id: str, text: str, embedding: list[float]):
        """Save a new piece of behavioral evidence to Semantic Kernel memory."""
        if self._mock:
            logger.info(f"[MOCK Semantic Kernel] Saved evidence for {user_id}")
            return
            
        await self.kernel.memory.save_information_async(
            collection=settings.azure_search_index,
            id=f"{user_id}_ev_{hash(text)}",
            text=text,
            description="Capability Evidence from MS Graph",
        )

    async def search_related_evidence(self, query: str, limit: int = 5) -> list[str]:
        """Query Azure AI Search via Semantic Kernel for capability context."""
        if self._mock:
            return ["Mock evidence: Completed Azure Fundamentals path", "Mock evidence: Commits in Python repo"]
            
        results = await self.kernel.memory.search_async(
            collection=settings.azure_search_index,
            query=query,
            limit=limit,
            min_relevance_score=0.7,
        )
        return [result.text for result in results]