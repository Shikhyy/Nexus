from pydantic import BaseModel
from typing import List, Literal

class Gap(BaseModel):
    id: str
    name: str
    domain: str
    coverageScore: float
    urgencyScore: float
    horizon: Literal['6m', '18m', '36m']
    status: Literal['critical', 'watch', 'closing']
    signalIds: List[str]
    trend: Literal['widening', 'stable', 'closing']

class GapIndex(BaseModel):
    gaps: List[Gap]
    readinessScore: float
    computedAt: str
