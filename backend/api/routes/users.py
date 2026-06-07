from fastapi import APIRouter
from models.capability import CapabilityModel, Capability

router = APIRouter()

@router.get("/me/capability-model", response_model=CapabilityModel)
def get_capability_model():
    return CapabilityModel(
        id="cap_123",
        userId="usr_123",
        version=1,
        readinessScore=74,
        createdAt="2026-06-07T00:00:00Z",
        capabilities=[
            Capability(
                id="c_1",
                name="Python engineering",
                domain="technical",
                currentLevel=0.82,
                evidenceSources=["github", "teams"],
                lastUpdated="2026-06-07T00:00:00Z"
            )
        ]
    )
