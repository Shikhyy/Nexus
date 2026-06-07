from pydantic import BaseModel, Field
from typing import Optional

class CosmosDocument(BaseModel):
    id: str = Field(..., description="Unique Cosmos DB identifier")
    partitionKey: str = Field(..., description="Logical partition key")
    documentType: str = Field(..., description="Discriminator for cosmos container")
    
class CapabilityModelDoc(CosmosDocument):
    documentType: str = "capability_model"
    userId: str
    readinessScore: float
    # Nested capability documents would go here
    
class AgentActionDoc(CosmosDocument):
    documentType: str = "agent_action"
    targetUserId: str
    actionType: str
    impact: str
    status: str
