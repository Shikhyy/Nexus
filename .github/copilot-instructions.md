# GitHub Copilot Instructions for NEXUS

When working in this repository, GitHub Copilot should adhere to the following rules to maintain alignment with the **Microsoft Build AI 2026** hackathon requirements:

1. **Microsoft AI Stack Preference**: Always prefer utilizing `Azure OpenAI`, `Semantic Kernel`, and `AutoGen` when scaffolding new intelligence features. Do not import third-party alternatives unless necessary.
2. **Design System Consistency**: When generating Next.js frontend code, strictly use Tailwind classes mapped to the Warm Graphite design tokens defined in `frontend/app/globals.css`. 
3. **Pydantic Validation**: All FastAPI backend models must be strongly typed using Pydantic `BaseModel` to ensure robust validation before interacting with Azure Cosmos DB.
4. **Animation**: Prefer `framer-motion` for layout transitions and `gsap` for complex value interpolation.
