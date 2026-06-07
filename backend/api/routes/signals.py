from fastapi import APIRouter, Depends
from models.gap import GapIndex, Gap
from models.signal import Signal
from api.routes.auth import get_current_user

router = APIRouter()

MOCK_SIGNALS = [
    Signal(
        id="sig_1", domain="agentic_ai",
        title="Agentic AI job postings spike 340% YoY",
        trendDelta="+340%", source="LinkedIn Market Data",
        type="market", timeAgo="2m ago"
    ),
    Signal(
        id="sig_2", domain="llm_engineering",
        title="AutoGen 0.4 ships multi-agent orchestration primitives",
        trendDelta="Hot", source="GitHub Release Feed",
        type="tech", timeAgo="14m ago"
    ),
    Signal(
        id="sig_3", domain="multimodal",
        title="GPT-4o Vision benchmarks outpace industry predictions by 82%",
        trendDelta="+82%", source="arXiv",
        type="research", timeAgo="1h ago"
    ),
]

@router.get("/")
def get_signals(current_user: dict = Depends(get_current_user)):
    return {"signals": MOCK_SIGNALS, "total": len(MOCK_SIGNALS)}
