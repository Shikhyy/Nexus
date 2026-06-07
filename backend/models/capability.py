from pydantic import BaseModel
from typing import List

class Capability(BaseModel):
    id: str
    name: str
    domain: str
    currentLevel: float
    evidenceSources: List[str]
    lastUpdated: str

class CapabilityModel(BaseModel):
    id: str
    userId: str
    version: int
    readinessScore: float
    capabilities: List[Capability]
    createdAt: str
