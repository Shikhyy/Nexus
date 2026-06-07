from fastapi import APIRouter, Depends
from models.gap import GapIndex, Gap
from api.routes.auth import get_current_user

router = APIRouter()


def _get_gap_data() -> GapIndex:
    """Internal helper — returns gap data without auth. Used by other routes."""
    return GapIndex(
        readinessScore=74.0,
        computedAt="2026-06-07T00:00:00Z",
        gaps=[
            Gap(id="1", name="Agentic AI design", domain="technical", coverageScore=0.18,
                urgencyScore=0.94, horizon="6m", status="critical", signalIds=["sig_1"], trend="widening"),
            Gap(id="2", name="Multimodal systems", domain="technical", coverageScore=0.45,
                urgencyScore=0.72, horizon="18m", status="watch", signalIds=["sig_3"], trend="stable"),
            Gap(id="3", name="Causal reasoning", domain="technical", coverageScore=0.62,
                urgencyScore=0.45, horizon="18m", status="watch", signalIds=[], trend="stable"),
            Gap(id="4", name="Data engineering ops", domain="technical", coverageScore=0.78,
                urgencyScore=0.28, horizon="36m", status="closing", signalIds=[], trend="closing"),
        ]
    )


@router.get("/", response_model=GapIndex)
def get_gaps(current_user: dict = Depends(get_current_user)):
    return _get_gap_data()
