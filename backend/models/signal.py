from pydantic import BaseModel
from typing import Literal

class Signal(BaseModel):
    id: str
    domain: str
    title: str
    trendDelta: str
    source: str
    type: Literal['market', 'tech', 'research']
    timeAgo: str
