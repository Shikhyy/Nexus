import logging
from datetime import datetime, timedelta
from config import settings

logger = logging.getLogger(__name__)


class MSGraphService:
    """
    Microsoft 365 Graph API Integration.
    Fetches user calendar, teams messages, and recently used documents
    to feed into the CapabilityModellerAgent and ActionPlannerAgent.
    """

    def __init__(self):
        self._mock = True
        
        if settings.ms_graph_client_id and settings.ms_graph_client_secret:
            try:
                # We would normally import MSAL here:
                # from msal import ConfidentialClientApplication
                self._mock = False
                logger.info("MS Graph Service initialized with AAD credentials.")
            except Exception as e:
                logger.warning(f"Failed to init MSAL: {e}")
        else:
            logger.warning("MS_GRAPH credentials missing — running Graph API in mock mode.")

    async def get_recent_activity(self, user_id: str) -> dict:
        """Fetch emails, Teams messages, and SharePoint docs for Capability Modeling."""
        if self._mock:
            return {
                "user": user_id,
                "teams_messages_analyzed": 142,
                "documents_authored": [
                    "Nexus_Architecture_v2.docx",
                    "Q3_Agentic_Strategy.pptx"
                ],
                "emails_sent": 45,
                "top_collaborators": ["jane.doe@contoso.com", "alex.w@contoso.com"]
            }
            
        # In production, this would call:
        # GET https://graph.microsoft.com/v1.0/users/{user_id}/insights/used
        return {}

    async def get_calendar_slots(self, user_id: str, days: int = 7) -> list[dict]:
        """Fetch available calendar slots for the ActionPlannerAgent to schedule learning blocks."""
        if self._mock:
            now = datetime.now()
            return [
                {"start": (now + timedelta(days=1)).strftime("%Y-%m-%dT09:00:00Z"), "duration_mins": 45},
                {"start": (now + timedelta(days=2)).strftime("%Y-%m-%dT14:00:00Z"), "duration_mins": 30},
                {"start": (now + timedelta(days=3)).strftime("%Y-%m-%dT10:00:00Z"), "duration_mins": 60},
            ]
            
        # In production, this would call:
        # POST https://graph.microsoft.com/v1.0/users/{user_id}/calendar/getSchedule
        return []
