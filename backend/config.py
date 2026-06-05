from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    azure_openai_endpoint: str = "mock"
    azure_openai_key: str = "mock"
    azure_search_endpoint: str = "mock"
    azure_search_key: str = "mock"

settings = Settings()
