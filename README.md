# NEXUS: The Human-AI Co-Evolution Engine
**Microsoft Build AI 2026 Hackathon Submission**

NEXUS is a revolutionary adaptation platform designed to continuously map, analyze, and close the capability gaps between an enterprise's workforce and the rapidly accelerating demands of the AI market. It moves beyond static HR learning platforms into real-time, behavior-based co-evolution.

## 🚀 Architecture Overview

NEXUS utilizes a robust, real-time decoupled architecture:

- **Frontend**: Next.js 14 App Router, heavily utilizing Three.js/WebGL for 60fps data visualizations and GSAP/Framer Motion for immersive UX.
- **Backend**: FastAPI asynchronous server designed for high-throughput AI inference and data streaming.
- **Database**: Azure Cosmos DB (Schema stubs implemented via Pydantic).
- **Real-Time**: Azure SignalR Service configuration stubs for WebSocket streaming.

## 🧠 Microsoft AI Stack Integrations

Our solution is built from the ground up to leverage the full power of the Microsoft AI ecosystem:

1. **Azure AI Foundry & OpenAI**: Utilizing `AsyncAzureOpenAI` (`text-embedding-3-large`) for generating dense vector representations of user capabilities and market demands to compute precise gap analysis.
2. **AutoGen Framework**: We implement a multi-agent orchestrated backend:
   - `SignalFuserAgent`: Synthesizes raw market data.
   - `CapabilityModellerAgent`: Inferences user capability from behavioral data.
   - `GapAnalyserAgent`: Computes cosine similarity between current state and market demand.
   - `ActionPlannerAgent`: Generates bespoke micro-learning interventions.
3. **Semantic Kernel**: Configured as the core memory retrieval system, utilizing Azure AI Search primitives to give our AutoGen agents long-term context over a user's career trajectory.
4. **GitHub Copilot**: Our repository utilizes custom `.github/copilot-instructions.md` to enforce architectural consistency and Azure integration patterns during development.

## ⚙️ Local Setup Instructions

### Prerequisites
- Node.js (v18+)
- Python 3.10+
- `npm` and `pip`

### 1. Start the FastAPI Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
python -m uvicorn main:app --reload --port 8000
```

### 2. Start the Next.js Frontend
```bash
cd frontend
npm install
npm run dev
```

Navigate to `http://localhost:3000` to view the 3D Adaptation Map!

## 👥 Team Details

- **[Participant Name 1]** - [Role/Title] - [HackerEarth Profile URL]
- **[Participant Name 2]** - [Role/Title] - [HackerEarth Profile URL]
- **[Participant Name 3]** - [Role/Title] - [HackerEarth Profile URL]

*Note: Edit this section to include actual team member details before final judging.*
