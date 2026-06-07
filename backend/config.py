from pydantic_settings import BaseSettings
from functools import lru_cache
import os

class Settings(BaseSettings):
    # App
    app_name: str = "NEXUS Human-AI Co-Evolution Engine"
    environment: str = "development"
    # JWT — MUST be set in .env. Generate with: openssl rand -hex 32
    secret_key: str = ""

    # Groq (Fast LLM Inference)
    groq_api_key: str = ""
    groq_model: str = "llama3-8b-8192"
    
    # Azure OpenAI
    azure_openai_endpoint: str = ""
    azure_openai_key: str = ""
    azure_openai_deployment: str = "gpt-4o"
    azure_openai_embedding_deployment: str = "text-embedding-3-large"
    azure_openai_api_version: str = "2024-02-15-preview"

    # Azure AI Search (Semantic Kernel Memory)
    azure_search_endpoint: str = ""
    azure_search_key: str = ""
    azure_search_index: str = "nexus-capabilities"

    # Azure Cosmos DB
    cosmos_endpoint: str = ""
    cosmos_key: str = ""
    cosmos_db: str = "nexus"

    # Azure SignalR
    signalr_connection_string: str = ""

    # Anthropic Claude (Capability Modeller)
    anthropic_api_key: str = ""
    claude_model: str = "claude-sonnet-4-6"

    # Google Gemini (Action Planner)
    gemini_api_key: str = ""
    gemini_model: str = "gemini-1.5-pro"

    # Microsoft Graph API (M365 Integration)
    ms_graph_tenant_id: str = ""
    ms_graph_client_id: str = ""
    ms_graph_client_secret: str = ""

    # CORS
    allowed_origins: list[str] = ["http://localhost:3000"]

    class Config:
        env_file = ".env"
        env_file_encoding = "utf-8"
        case_sensitive = False


@lru_cache()
def get_settings() -> Settings:
    return Settings()

settings = get_settings()
