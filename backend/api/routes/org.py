from fastapi import APIRouter
from pydantic import BaseModel

router = APIRouter()

class OrgReadiness(BaseModel):
    team: str
    readinessScore: float
    memberCount: int

@router.get("/readiness")
def get_org_readiness():
    return {
        "teams": [
            OrgReadiness(team="Engineering",   readinessScore=68.0, memberCount=12),
            OrgReadiness(team="Product",       readinessScore=74.0, memberCount=8),
            OrgReadiness(team="Design",        readinessScore=71.0, memberCount=5),
            OrgReadiness(team="Data Science",  readinessScore=81.0, memberCount=9),
            OrgReadiness(team="Leadership",    readinessScore=55.0, memberCount=4),
        ]
    }
