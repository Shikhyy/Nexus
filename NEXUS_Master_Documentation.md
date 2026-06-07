# NEXUS — Human-AI Co-Evolution Engine
## Master Documentation

> **Hackathon:** Microsoft Build AI Hackathon (India) · Powered by HackerEarth
> **Deadline:** June 30, 2026
> **Team:** Solo
> **Stack:** Next.js 14 · Azure OpenAI · AutoGen · Semantic Kernel · MS Graph · Three.js · GSAP · Framer Motion

---

# Table of Contents

1. [Product Requirements Document (PRD)](#1-product-requirements-document)
2. [App Flow](#2-app-flow)
3. [Tech Stack](#3-tech-stack)
4. [Frontend Design & Architecture](#4-frontend-design--architecture)
5. [Backend Architecture & Schema](#5-backend-architecture--schema)
6. [Implementation Plan](#6-implementation-plan)
7. [AI Agents Specification](#7-ai-agents-specification)
8. [Claude Integration](#8-claude-integration)
9. [Gemini Integration](#9-gemini-integration)
10. [Design System Reference](#10-design-system-reference)

---

# 1. Product Requirements Document

## 1.1 Executive Summary

NEXUS is the world's first **Human-AI Co-Evolution Engine** — an agentic AI platform that continuously maps the gap between a person's current capabilities and future market demand, then autonomously closes that gap through adaptive intelligence, personalised learning orchestration, and direct action across M365 and Azure services.

Every AI tool today makes you more productive at what you already do. NEXUS makes you ready for what you will need to do next. It is not a productivity tool. It is not a learning platform. It is infrastructure for human adaptation.

---

## 1.2 Problem Statement

### The Adaptation Gap Crisis

The world is changing faster than humans can adapt to it. Three forces are converging:

- **Skill obsolescence acceleration** — The World Economic Forum estimates 44% of core skills will be disrupted by 2028. Previously, skill half-lives were measured in decades. Today they are measured in years.
- **Signal overload** — There are too many signals about the future (research papers, job market shifts, technology releases, economic patterns) for any individual to process and act on.
- **Reactive tooling** — Every existing tool — LinkedIn Learning, Coursera, Copilot, Gemini — optimises for what you do today. None of them ask: are you becoming who the future needs you to be?

### The Gap Nobody Is Closing

```
WHERE YOU ARE TODAY ←————— [THE GAP] ————→ WHERE THE FUTURE NEEDS YOU
      (capability model)                        (demand signal model)

Current tools only serve the left side.
NEXUS bridges both sides and closes the gap.
```

### Quantified Pain

| Metric | Value |
|--------|-------|
| Knowledge workers globally | 1.25 billion |
| Skills disrupted by 2028 | 44% |
| Cost of talent mismatch (US alone) | $1.3 trillion/year |
| Existing products that proactively close the gap | 0 |

---

## 1.3 Solution

NEXUS runs a continuous **co-evolution loop** powered by four interlocked AI engines:

```
┌─────────────────────────────────────────────────────────┐
│                   THE CO-EVOLUTION LOOP                  │
│                                                          │
│  [World Signal Engine] → reads 12+ live global signals  │
│           ↓                                              │
│  [Capability Model]    → maps who you are right now      │
│           ↓                                              │
│  [Gap Analyser]        → computes precise delta          │
│           ↓                                              │
│  [Co-Evolution Agent]  → acts to close the gap           │
│           ↑                                              │
│  ←←←←←←← feedback loop ←←←←←←←←←←←←←←←←←←←←←←←←←  │
└─────────────────────────────────────────────────────────┘
```

---

## 1.4 Target Users

### Primary — Individual Knowledge Workers
- Software engineers, product managers, designers, data scientists
- Mid-career professionals facing rapid skill disruption
- People who know they need to adapt but don't know where to start

### Secondary — Organisation Leaders
- CTOs, CPOs, HR leads, L&D teams
- Need to understand collective team adaptation readiness
- Want to see organisational blind spots before they become crises

### Tertiary — Enterprise Administrators
- IT admins deploying NEXUS across an org
- Compliance officers needing audit trails of AI actions
- Finance teams needing ROI on adaptation investment

---

## 1.5 Core Features

### F1 — Adaptation Map (Individual)
- Real-time personal capability model built from M365 behaviour
- Ranked capability gap index with 6, 18, and 36-month horizons
- Evidence trail for every gap (signals that surfaced it)
- Progress tracking as gaps close over time

### F2 — World Signal Engine
- 12+ live signal streams: Bing News, research publications, job postings, economic indicators, GitHub trends, patent filings
- Signal topology visualisation — force-directed graph of domain signals
- Domain-level trend scoring (0–100) updated every 60 seconds
- Personalised signal filtering — only signals relevant to your gap profile

### F3 — Co-Evolution Agent
- Autonomous action execution with explicit user consent
- Calendar intervention — micro-learning blocks scheduled intelligently
- Resource matching — papers, courses, people matched to specific gaps
- Document rewriting — outputs modelled on future-ready patterns
- Colleague connector — surfaces team members whose work maps your gaps
- Full action log with approve/reject for every pending action

### F4 — Org Heatmap (Team Leaders)
- Collective adaptation readiness by team, function, and seniority
- Organisation-wide gap index — top skills the company is behind on
- At-risk individuals — people whose gaps are widening, not closing
- Comparative readiness across teams

### F5 — Progress Engine
- Week-over-week gap closure tracking
- Readiness score trajectory (0–100)
- Agent effectiveness metrics — which actions produced the most closure
- Cohort comparison — how you compare to peers in similar roles

---

## 1.6 Non-Goals (v1)

- Not a full LMS — NEXUS curates and schedules learning, doesn't host it
- Not a performance review tool — no manager-visible individual scores
- Not a content creation platform — generates briefs and edits, doesn't publish
- Not a real-time chat assistant — operates in the background, surfaces results

---

## 1.7 Success Metrics

| Metric | Target (Hackathon Demo) | Target (6 months post-launch) |
|--------|------------------------|-------------------------------|
| Readiness score improvement | +10 pts/month | +8 pts/month sustained |
| Gap closure rate | 1 gap/6 weeks | 1 gap/4 weeks |
| Agent action approval rate | >70% | >80% |
| Weekly active usage | 4+ sessions | 5+ sessions |
| Demo "wow" moment | Judge silence | N/A |

---

## 1.8 Constraints

- **Solo builder** — architecture must be buildable by one person in 4 weeks
- **Hackathon judging** — 50% of score is AI Integration + Architecture depth
- **Microsoft stack requirement** — must use Azure AI, MS Graph, and M365 services
- **Deployed link required** — must be live and accessible for judging
- **3-minute video** — demo must be self-evident with no explanation

---

# 2. App Flow

## 2.1 User Journey Map

```
NEW USER
    │
    ▼
[Landing Page]
    │  Sees: 3D particle orb, hero copy, feature sections
    │  Does: Clicks "Enter NEXUS"
    │
    ▼
[Onboarding — Step 1: Identity]
    │  Sees: Role, industry, seniority selector
    │  Does: Selects their profile (30 seconds)
    │
    ▼
[Onboarding — Step 2: M365 Consent]
    │  Sees: Clear explanation of what data is read (Calendar, Teams, Outlook)
    │  Does: Grants OAuth consent via Azure Entra ID
    │
    ▼
[Onboarding — Step 3: Initial scan]
    │  Sees: GSAP-animated "scanning" state — orb builds as data is ingested
    │  Does: Waits 8–12 seconds for initial capability model to generate
    │
    ▼
[Dashboard — Adaptation Map]  ← PRIMARY VIEW
    │  Sees: Readiness score, gap index, signal feed, agent actions
    │  Does: Reviews gaps, approves/rejects agent actions, drills into signals
    │
    ├──→ [World Signals Page]
    │       Sees: Signal topology graph, live signal stream
    │       Does: Clicks signal nodes, traces to gap evidence
    │
    ├──→ [Org Heatmap Page]  (if leader role)
    │       Sees: Team readiness grid, collective gap index
    │       Does: Clicks team → sees individual members
    │
    ├──→ [Agent Feed Page]
    │       Sees: All autonomous actions with status
    │       Does: Approves pending actions, reviews completed
    │
    └──→ [Progress Page]
            Sees: Readiness score trajectory, gap closure timeline
            Does: Reviews week-over-week improvement

RETURNING USER
    │
    ▼
[Dashboard — directly]
    │  NEXUS has been running in the background
    │  New signals detected → gaps updated
    │  Agent has queued new actions for approval
    │
    ▼
[Review overnight agent actions]
    │  3–5 actions pending from background run
    │  1-click approve or reject
    │
    ▼
[Resume normal work]
    │  NEXUS continues running silently
    │  Next surface: 20-minute calendar block tomorrow morning
```

---

## 2.2 Page-by-Page Flow

### Page 1 — Landing (`/`)

**Entry state:** No auth required. Public page.

**Sections:**
1. `HERO` — Full viewport. 3D orb (Three.js). Scroll parallax. CTA: "Enter NEXUS"
2. `STATS` — Three numbers. Warm linen background. Scroll-triggered counter animation.
3. `FEATURES` — Four feature cards. Hover lift. Scroll-triggered staggered entry.
4. `ARCHITECTURE` — Five-layer system diagram. Scroll-triggered left-slide entry.
5. `CTA` — Radial gradient. Final CTA button.

**Exits:** → `/onboarding` or `/dashboard` (if already authed)

---

### Page 2 — Onboarding (`/onboarding`)

**Entry state:** Post-auth redirect. Three-step linear flow.

**Step 1:** Role/industry selection. 8 options rendered as selectable cards.
**Step 2:** M365 consent. Microsoft OAuth popup. Clear data explanation.
**Step 3:** Capability model generation. Three.js orb animates as nodes populate.

**Exit:** → `/dashboard`

---

### Page 3 — Dashboard (`/dashboard`)

**Entry state:** Authenticated. Primary view.

**Layout:** Top header + 3-column content grid
- Left: KPI row (4 cards) + Gap index panel + Agent actions panel
- Right: Live signal feed

**Key interactions:**
- `Run agent` button → triggers manual agent cycle
- Click gap row → expands evidence panel showing signals that surfaced it
- Click signal → links to World Signals page with that signal highlighted
- Approve/reject action → animates out with status update

---

### Page 4 — World Signals (`/signals`)

**Entry state:** Authenticated.

**Layout:** SVG force graph (left) + Signal stream (right)

**Key interactions:**
- Click graph node → expands detail panel showing signal strength, trend delta, gap mapping
- Signal stream auto-refreshes every 60 seconds
- Filter by signal type (research / market / economic / tech)

---

### Page 5 — Org Heatmap (`/org`)

**Entry state:** Authenticated. Leader role only (others see locked state).

**Layout:** 4 KPI cards + Treemap grid (left) + Team detail panel (right)

**Key interactions:**
- Click team card → right panel shows individual member scores
- Hover team card → shows top gap for that team
- Sort by: readiness score, team size, gap urgency

---

### Page 6 — Agent Feed (`/agent`)

**Entry state:** Authenticated.

**Layout:** Stats row + Filter tabs + Scrollable action list

**Key interactions:**
- Approve → action executes, animates to "done" state
- Reject → action fades out, moves to rejected list
- Filter by: all / pending / done / rejected
- Click action → expands full detail with evidence trail

---

### Page 7 — Progress (`/progress`)

**Entry state:** Authenticated.

**Layout:** Readiness score trajectory chart + Gap closure timeline + Agent effectiveness metrics

**Key interactions:**
- Hover chart point → tooltip with that week's key action
- Click gap in timeline → shows which actions closed it

---

## 2.3 State Transitions

```
UNAUTHENTICATED
    │
    │ Azure Entra ID OAuth
    ▼
AUTHENTICATED + NO_PROFILE
    │
    │ Complete onboarding (role, industry, consent)
    ▼
AUTHENTICATED + PROFILE_PENDING
    │
    │ Initial M365 scan complete (~10s)
    ▼
AUTHENTICATED + ACTIVE
    │
    ├── Gap model: CURRENT (refreshed every 60min)
    ├── Signals: LIVE (streaming via SignalR)
    └── Agent: RUNNING (background cycle every 4h)
```

---

# 3. Tech Stack

## 3.1 Frontend

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| Framework | Next.js | 14.2 | App router, SSR, routing |
| Language | TypeScript | 5.x | Type safety |
| Styling | Tailwind CSS | 3.4 | Utility-first styling |
| 3D Engine | Three.js | r163 | Particle orb, WebGL |
| 3D React | @react-three/fiber | 8.x | React bindings for Three.js |
| 3D Helpers | @react-three/drei | 9.x | OrbitControls, Points, etc |
| Animation | GSAP | 3.12 | Gap bars, counters, scroll |
| Animation | Framer Motion | 11.x | Page transitions, layout |
| Data viz | D3.js | 7.x | Force graph, treemap |
| Smooth scroll | Lenis | 1.x | Premium scroll feel |
| State | Zustand | 4.x | Client state management |
| Server state | TanStack Query | 5.x | API caching, refetch |
| Real-time | Azure SignalR client | 1.x | Live dashboard updates |
| Auth client | MSAL React | 2.x | Azure Entra ID auth |
| UI primitives | Radix UI | 1.x | Accessible base components |

---

## 3.2 Backend

| Layer | Technology | Version | Purpose |
|-------|-----------|---------|---------|
| API framework | FastAPI | 0.111 | REST API server |
| Language | Python | 3.11 | Backend language |
| Runtime | Uvicorn | 0.29 | ASGI server |
| Validation | Pydantic | 2.x | Request/response schemas |
| Auth | python-jose | 3.x | JWT validation |
| HTTP client | httpx | 0.27 | Async HTTP requests |
| Task queue | Azure Service Bus | SDK | Background job dispatch |

---

## 3.3 AI / Agents

| Component | Technology | Purpose |
|-----------|-----------|---------|
| LLM reasoning | Azure OpenAI GPT-4o | All reasoning, extraction, generation |
| LLM vision | GPT-4o Vision | Multimodal signal analysis |
| Agent orchestration | AutoGen 0.4 | Multi-agent coordination |
| Agent memory | Semantic Kernel | Persistent agent memory |
| Vector search | Azure AI Search | Semantic similarity, RAG |
| Embeddings | text-embedding-3-large | Capability and signal embeddings |
| LLM eval | Azure AI Foundry | Agent output evaluation |
| Secondary LLM | Google Gemini 1.5 Pro | Signal fusion validation, redundancy |
| Tertiary LLM | Claude 3.5 Sonnet | Capability model analysis, nuanced reasoning |
| NLP | Azure AI Language | Trend extraction, NER, sentiment |

---

## 3.4 Azure Infrastructure

| Service | Tier | Purpose |
|---------|------|---------|
| Azure OpenAI | S0 | GPT-4o deployment |
| Azure AI Search | Standard | Vector index for capabilities and signals |
| Azure AI Foundry | Standard | Agent evals and fine-tuning |
| Azure AI Language | S0 | NLP on signal streams |
| Azure App Service | B3 | FastAPI backend hosting |
| Azure Container Apps | Consumption | AutoGen agent workers |
| Azure Functions | Consumption | Signal ingestion (60s trigger) |
| Azure Event Hubs | Standard | Signal event streaming |
| Azure Service Bus | Standard | Background job queue |
| Azure SignalR | Standard | Real-time frontend push |
| Azure Stream Analytics | S1 | Real-time event processing |
| Cosmos DB | Serverless | Capability models, gap history |
| Azure Blob Storage | LRS | Raw signal archives |
| Azure Cache for Redis | C1 | Dashboard read cache |
| Azure Static Web Apps | Standard | Next.js frontend hosting |
| Azure Entra ID | P1 | Authentication and SSO |
| Azure Key Vault | Standard | Secrets management |
| Azure Monitor | Standard | Logging and alerting |
| Azure CDN | Standard | Static asset delivery |

---

## 3.5 Microsoft Integration Services

| Service | Data Accessed | Purpose |
|---------|--------------|---------|
| MS Graph — Calendar | Events, free/busy | Schedule micro-learning blocks |
| MS Graph — Teams | Messages, channel activity | Communication pattern analysis |
| MS Graph — Outlook | Email metadata (no content) | Work pattern signals |
| MS Graph — OneDrive | Document metadata | Output style analysis |
| MS Graph — User Profile | Role, department, skills | Capability model seed |
| Bing Search API | News, web | Live world signal ingestion |
| Copilot Studio | Agent publishing | Deploy co-evolution agent to Teams |
| Azure Logic Apps | Connectors | M365 action execution |

---

## 3.6 External APIs

| API | Purpose |
|-----|---------|
| Bing News API | Real-time news signals |
| Bing Web Search API | Research and trend signals |
| arXiv API | Research publication signals |
| GitHub Trending API | Technology adoption signals |
| Google Gemini API | Secondary LLM reasoning |
| Anthropic Claude API | Tertiary LLM for capability analysis |

---

# 4. Frontend Design & Architecture

## 4.1 Design Philosophy

NEXUS uses the **Warm Graphite** design language — the visual vocabulary of instruments that cost money. Bloomberg Terminal, Palantir Gotham, Linear, Vercel. The principle: every design decision signals competence, not aesthetics.

**Five rules:**
1. Warm neutrals, never cool grey — Parchment feels handcrafted; cool grey feels like a Bootstrap template
2. 0.5px hairline borders everywhere — the single most underrated premium detail in UI
3. Semantic colour only — every colour means something, never decorative
4. Inter + DM Mono typographic pairing — the signature of premium dev tooling
5. Instrument Serif for display — rare in SaaS, immediately distinctive

---

## 4.2 Colour System

```css
/* Warm graphite scale */
--parchment:    #FAFAF8;   /* App canvas */
--linen:        #F4F2EE;   /* Sidebar, panel backgrounds */
--stone:        #EDE9E2;   /* Hover states, active items */
--border:       #E2DDD6;   /* All borders (0.5px) */
--muted:        #B8B2A8;   /* Disabled, metadata, timestamps */
--secondary:    #6B6560;   /* Body copy, secondary labels */
--primary:      #3D3830;   /* Primary body text */
--obsidian:     #1A1713;   /* Headings, CTA buttons, logo */

/* Semantic accents */
--sienna:       #C4511A;   /* Critical gaps, urgent signals */
--forest:       #1E6E4A;   /* Closing gaps, positive deltas */
--ochre:        #9B6914;   /* Watch-level gaps, caution states */
--prussian:     #1E4E8C;   /* Insights, informational signals */

/* Semantic surfaces (for backgrounds) */
--sienna-surface:   #FAE8E0;
--forest-surface:   #E0F0E8;
--ochre-surface:    #FBF0D8;
--prussian-surface: #E0EAF8;
```

---

## 4.3 Typography

```css
/* Display — Instrument Serif */
/* Used for: hero headings, large stats, section titles */
font-family: 'Instrument Serif', serif;
/* Weights: 400 (regular), 400 italic */
/* Sizes: 48px–88px (hero), 32px–56px (section) */

/* UI — Geist */
/* Used for: all UI text, labels, body copy, buttons */
font-family: 'Geist', sans-serif;
/* Weights: 300 (body), 400 (default), 500 (medium), 600 (heading) */
/* Sizes: 10px (label) → 20px (page title) */

/* Mono — DM Mono */
/* Used for: timestamps, metadata, hex values, codes, ranks */
font-family: 'DM Mono', monospace;
/* Weights: 400, 500 */
/* Sizes: 9px–13px */
```

---

## 4.4 Component Architecture

```
app/
├── layout.tsx                    # Root layout, cursor, fonts
├── page.tsx                      # Landing page
├── dashboard/page.tsx            # Adaptation map
├── signals/page.tsx              # World signals
├── org/page.tsx                  # Org heatmap
├── agent/page.tsx                # Agent feed
├── progress/page.tsx             # Progress tracking
├── onboarding/page.tsx           # Onboarding flow
│
├── components/
│   ├── 3d/
│   │   ├── OrbScene.tsx          # Three.js particle orb (landing)
│   │   ├── OnboardingOrb.tsx     # Building orb (onboarding)
│   │   └── MiniOrb.tsx           # Small orb (dashboard header)
│   │
│   ├── layout/
│   │   ├── AppShell.tsx          # Sidebar + main layout wrapper
│   │   ├── Sidebar.tsx           # Navigation sidebar
│   │   └── TopBar.tsx            # Page header bar
│   │
│   ├── dashboard/
│   │   ├── KPICard.tsx           # Metric card with GSAP counter
│   │   ├── GapIndex.tsx          # Gap bar list with GSAP animation
│   │   ├── GapBar.tsx            # Individual gap bar row
│   │   ├── SignalFeed.tsx        # Live signal feed panel
│   │   └── ActionPanel.tsx       # Recent agent actions
│   │
│   ├── signals/
│   │   ├── SignalGraph.tsx       # SVG force-directed graph
│   │   ├── SignalStream.tsx      # Live scrolling signal list
│   │   └── NodeDetail.tsx        # Signal node detail panel
│   │
│   ├── org/
│   │   ├── TeamGrid.tsx          # Heatmap grid of teams
│   │   ├── TeamCard.tsx          # Individual team cell
│   │   └── TeamDetail.tsx        # Right-panel member list
│   │
│   ├── agent/
│   │   ├── ActionList.tsx        # Paginated action feed
│   │   ├── ActionCard.tsx        # Single action with approve/reject
│   │   └── FilterBar.tsx         # Status filter tabs
│   │
│   └── ui/
│       ├── Button.tsx            # Button variants
│       ├── Tag.tsx               # Status/category tags
│       ├── Tooltip.tsx           # Accessible tooltips
│       ├── Badge.tsx             # Number badges
│       └── Skeleton.tsx          # Loading skeletons

```

---

## 4.5 Animation Specification

### GSAP Animations

```typescript
// Gap bar entry — staggered spring
gsap.fromTo(barRefs, 
  { scaleX: 0 }, 
  { scaleX: 1, duration: 1.1, ease: 'power3.out', 
    stagger: 0.07, transformOrigin: 'left center', delay: 0.4 }
)

// KPI counter — number count-up
gsap.fromTo(valRef, 
  { textContent: 0 }, 
  { textContent: targetValue, duration: 1.4, 
    ease: 'expo.out', snap: { textContent: 1 }, delay: 0.3 }
)

// Section reveal — ScrollTrigger
gsap.fromTo('.feature-card', 
  { opacity: 0, y: 40 }, 
  { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
    stagger: 0.08, scrollTrigger: { trigger: '.features-section', start: 'top 80%' } }
)

// Signal bar — data update morph
gsap.to(barRef, { 
  width: `${newValue}%`, duration: 0.6, 
  ease: 'power2.inOut' 
})
```

### Three.js Orb Specification

```typescript
// Particle count: 2,400 (outer) + 600 (inner core)
// Distribution: Fibonacci sphere (even coverage)
// Rotation: outer 0.06 rad/s Y, inner -0.10 rad/s Y
// Colour scheme: 15% sienna (critical gaps), 15% forest (closing), 70% warm grey

// Ring system: 3 orbital rings
// Radii: 2.8, 3.4, 4.0
// Tilt angles: 0.3, -0.6, 1.1 radians
// Rotation speeds: 0.04, -0.025, 0.015 rad/s

// Glow core: sphere r=0.45, opacity 0.06, pulsing scale sin wave
```

### Framer Motion Patterns

```typescript
// Page transition
const pageVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 }
}
const pageTransition = { duration: 0.3, ease: [0.16, 1, 0.3, 1] }

// Sidebar collapse
<motion.aside animate={{ width: collapsed ? 52 : 240 }} 
  transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }} />

// Signal entry (AnimatePresence)
<motion.div initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }} transition={{ duration: 0.4 }} />

// Card hover lift
whileHover={{ y: -4 }} transition={{ duration: 0.3 }}
```

---

## 4.6 Responsive Breakpoints

```css
/* Mobile: < 768px — sidebar hidden, single column */
/* Tablet: 768–1024px — collapsed sidebar, 2-column grid */
/* Desktop: 1024–1440px — full sidebar, 3-column grid */
/* Wide: > 1440px — max-width 1600px, centred */
```

---

# 5. Backend Architecture & Schema

## 5.1 System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                        NEXUS BACKEND                            │
│                                                                  │
│  ┌─────────────┐    ┌──────────────┐    ┌────────────────────┐  │
│  │  L1 SIGNAL  │    │  L2 INTELLI- │    │   L3 DATA LAYER    │  │
│  │  INGESTION  │───▶│  GENCE LAYER │───▶│                    │  │
│  │             │    │              │    │  Cosmos DB          │  │
│  │ Azure Funcs │    │ AutoGen Swarm│    │  Redis Cache        │  │
│  │ Event Hubs  │    │ Semantic Kern│    │  Azure Blob         │  │
│  │ Bing API    │    │ GPT-4o       │    │  AI Search Index    │  │
│  │ MS Graph    │    │ Gemini       │    │                    │  │
│  │ AI Language │    │ Claude       │    └────────────────────┘  │
│  └─────────────┘    └──────────────┘                            │
│                            │                                     │
│  ┌─────────────────────────┼─────────────────────────────────┐  │
│  │  L4 ACTION LAYER        │          L5 PRESENTATION        │  │
│  │                         ▼                                  │  │
│  │  Service Bus      FastAPI REST ──────────────────────────▶│  │
│  │  Logic Apps       Azure SignalR ─────────── Next.js 14    │  │
│  │  MS Graph API     WebSocket                               │  │
│  └─────────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────────┘
```

---

## 5.2 FastAPI Project Structure

```
backend/
├── main.py                        # FastAPI app entry
├── config.py                      # Settings (pydantic-settings)
├── requirements.txt
│
├── api/
│   ├── routes/
│   │   ├── auth.py                # /auth/* endpoints
│   │   ├── users.py               # /users/* endpoints
│   │   ├── gaps.py                # /gaps/* endpoints
│   │   ├── signals.py             # /signals/* endpoints
│   │   ├── agent.py               # /agent/* endpoints
│   │   ├── org.py                 # /org/* endpoints
│   │   └── progress.py            # /progress/* endpoints
│   └── deps.py                    # Shared dependencies
│
├── agents/
│   ├── orchestrator.py            # AutoGen multi-agent coordinator
│   ├── signal_fuser.py            # Signal Fuser Agent
│   ├── capability_modeller.py     # Capability Model Agent
│   ├── gap_analyser.py            # Gap Analyser Agent
│   ├── action_planner.py          # Action Planner Agent
│   └── memory.py                  # Semantic Kernel memory store
│
├── services/
│   ├── graph_service.py           # MS Graph API client
│   ├── openai_service.py          # Azure OpenAI client
│   ├── gemini_service.py          # Google Gemini client
│   ├── claude_service.py          # Anthropic Claude client
│   ├── search_service.py          # Azure AI Search client
│   ├── bing_service.py            # Bing Search API client
│   ├── signalr_service.py         # SignalR hub client
│   └── cosmos_service.py          # Cosmos DB client
│
├── models/
│   ├── user.py                    # User models
│   ├── capability.py              # Capability model schemas
│   ├── gap.py                     # Gap models
│   ├── signal.py                  # Signal models
│   └── action.py                  # Agent action models
│
├── ingestion/
│   ├── signal_ingestor.py         # Azure Functions trigger handler
│   ├── bing_harvester.py          # Bing news + web harvester
│   ├── arxiv_harvester.py         # Research paper harvester
│   └── graph_harvester.py         # MS Graph activity harvester
│
└── utils/
    ├── embeddings.py              # Embedding generation utils
    ├── cache.py                   # Redis cache helpers
    └── logging.py                 # Structured logging
```

---

## 5.3 Database Schema (Cosmos DB)

### Collection: `users`

```json
{
  "id": "usr_01J8X4K2M...",
  "email": "arjun@company.com",
  "displayName": "Arjun Kapoor",
  "role": "Senior Software Engineer",
  "industry": "Technology",
  "seniority": "senior",
  "department": "Engineering",
  "msGraphId": "aad-oid-...",
  "consentScopes": ["Calendars.ReadWrite", "Mail.Read", "User.Read"],
  "consentGrantedAt": "2026-06-01T09:00:00Z",
  "isLeader": false,
  "orgId": "org_...",
  "teamId": "team_...",
  "createdAt": "2026-06-01T09:00:00Z",
  "lastActiveAt": "2026-06-07T14:30:00Z",
  "_ts": 1717762200
}
```

### Collection: `capability_models`

```json
{
  "id": "cap_01J8X4...",
  "userId": "usr_01J8X4K2M...",
  "version": 14,
  "readinessScore": 74,
  "capabilities": [
    {
      "id": "cap_skill_001",
      "name": "Python engineering",
      "domain": "technical",
      "currentLevel": 0.82,
      "evidenceSources": ["teams_messages", "github_activity"],
      "lastUpdated": "2026-06-07T14:00:00Z"
    }
  ],
  "gapIndex": [
    {
      "id": "gap_001",
      "name": "Agentic AI design",
      "domain": "technical",
      "coverageScore": 0.18,
      "urgencyScore": 0.94,
      "horizon": "6m",
      "status": "critical",
      "signalIds": ["sig_001", "sig_042", "sig_107"],
      "trend": "widening",
      "detectedAt": "2026-05-15T00:00:00Z",
      "lastUpdated": "2026-06-07T14:00:00Z"
    }
  ],
  "modelMetadata": {
    "signalCount": 847,
    "lastFullRefresh": "2026-06-07T14:00:00Z",
    "nextRefresh": "2026-06-07T15:00:00Z",
    "modelVersion": "gpt-4o-2024-11-20"
  },
  "createdAt": "2026-06-01T09:15:00Z",
  "_ts": 1717762800
}
```

### Collection: `signals`

```json
{
  "id": "sig_001",
  "type": "market",
  "subtype": "job_postings",
  "domain": "agentic_ai",
  "title": "Agentic AI job postings spike 340% YoY",
  "summary": "Analysis of 2.3M job postings shows agentic AI skills mentioned in 340% more listings vs same period 2025",
  "source": "bing_news",
  "sourceUrl": "https://...",
  "strengthScore": 94,
  "trendDelta": "+340%",
  "affectedDomains": ["agentic_ai", "llm_engineering", "system_design"],
  "embedding": [0.021, -0.034, ...],
  "rawContent": "...",
  "processedAt": "2026-06-07T13:45:00Z",
  "expiresAt": "2026-07-07T00:00:00Z",
  "_ts": 1717761900
}
```

### Collection: `agent_actions`

```json
{
  "id": "act_01J8X5...",
  "userId": "usr_01J8X4K2M...",
  "agentId": "action_planner_v2",
  "type": "calendar_block",
  "status": "pending",
  "title": "Micro-learning block: Agentic AI design",
  "detail": "20-minute focused session — AutoGen orchestration patterns",
  "targetGapId": "gap_001",
  "targetGapName": "Agentic AI design",
  "impactScore": 0.87,
  "impactLevel": "high",
  "payload": {
    "calendarEvent": {
      "subject": "NEXUS: Agentic AI — 20min deep work",
      "startDateTime": "2026-06-08T09:00:00",
      "endDateTime": "2026-06-08T09:20:00",
      "body": "Scheduled by NEXUS co-evolution agent..."
    }
  },
  "evidenceSignalIds": ["sig_001", "sig_042"],
  "proposedAt": "2026-06-07T14:00:00Z",
  "approvedAt": null,
  "executedAt": null,
  "rejectedAt": null,
  "rejectionReason": null,
  "idempotencyKey": "cal_arjun_20260608_0900_agentic",
  "_ts": 1717762800
}
```

### Collection: `progress_snapshots`

```json
{
  "id": "snap_01J8X6...",
  "userId": "usr_01J8X4K2M...",
  "weekOf": "2026-06-02",
  "readinessScore": 74,
  "readinessDelta": 6,
  "gapsClosed": [],
  "gapsOpened": ["gap_009"],
  "gapProgressMap": {
    "gap_001": { "before": 0.14, "after": 0.18, "delta": 0.04 },
    "gap_002": { "before": 0.29, "after": 0.34, "delta": 0.05 }
  },
  "actionsExecuted": 7,
  "actionsApproved": 5,
  "actionsRejected": 2,
  "topActionImpact": "act_01J8X4...",
  "snapshotAt": "2026-06-07T23:59:00Z",
  "_ts": 1717804740
}
```

### Collection: `organisations`

```json
{
  "id": "org_01J8X3...",
  "name": "Nexus Corp",
  "size": 52,
  "industry": "Technology",
  "adminUserId": "usr_...",
  "teamIds": ["team_001", "team_002", "team_003"],
  "orgReadinessScore": 67,
  "collectiveGapIndex": [
    { "name": "Agentic AI design", "affectedCount": 23, "avgCoverage": 0.21 },
    { "name": "Causal reasoning", "affectedCount": 18, "avgCoverage": 0.38 }
  ],
  "createdAt": "2026-05-01T00:00:00Z",
  "_ts": 1717762800
}
```

---

## 5.4 Azure AI Search Index Schema

### Index: `nexus-signals`

```json
{
  "name": "nexus-signals",
  "fields": [
    { "name": "id", "type": "Edm.String", "key": true },
    { "name": "domain", "type": "Edm.String", "filterable": true, "facetable": true },
    { "name": "type", "type": "Edm.String", "filterable": true },
    { "name": "strengthScore", "type": "Edm.Double", "sortable": true, "filterable": true },
    { "name": "title", "type": "Edm.String", "searchable": true },
    { "name": "summary", "type": "Edm.String", "searchable": true },
    { "name": "processedAt", "type": "Edm.DateTimeOffset", "sortable": true, "filterable": true },
    { "name": "contentVector", "type": "Collection(Edm.Single)", "dimensions": 3072,
      "vectorSearchProfile": "nexus-vector-profile" }
  ],
  "vectorSearch": {
    "profiles": [{ "name": "nexus-vector-profile", "algorithm": "nexus-hnsw" }],
    "algorithms": [{ "name": "nexus-hnsw", "kind": "hnsw",
      "parameters": { "m": 4, "efConstruction": 400, "metric": "cosine" } }]
  }
}
```

### Index: `nexus-capabilities`

```json
{
  "name": "nexus-capabilities",
  "fields": [
    { "name": "id", "type": "Edm.String", "key": true },
    { "name": "userId", "type": "Edm.String", "filterable": true },
    { "name": "name", "type": "Edm.String", "searchable": true },
    { "name": "domain", "type": "Edm.String", "filterable": true },
    { "name": "currentLevel", "type": "Edm.Double", "sortable": true },
    { "name": "capabilityVector", "type": "Collection(Edm.Single)", "dimensions": 3072,
      "vectorSearchProfile": "nexus-vector-profile" }
  ]
}
```

---

## 5.5 API Endpoints

```
Authentication
POST   /auth/login                    Azure Entra ID redirect
POST   /auth/callback                 OAuth callback handler
POST   /auth/logout                   Token revocation
GET    /auth/me                       Current user profile

Users
GET    /users/me                      Full user profile
PATCH  /users/me                      Update profile
GET    /users/me/capability-model     Full capability model
POST   /users/me/refresh              Trigger manual M365 rescan

Gaps
GET    /gaps                          User gap index (ranked)
GET    /gaps/{gap_id}                 Single gap detail + evidence
GET    /gaps/{gap_id}/history         Gap progress over time
POST   /gaps/{gap_id}/dismiss         Mark gap as intentionally skipped

Signals
GET    /signals                       Latest signals (paginated)
GET    /signals?domain={d}            Filtered by domain
GET    /signals/{signal_id}           Single signal detail
GET    /signals/topology              Graph nodes + edges for D3

Agent
GET    /agent/actions                 All actions (filterable by status)
GET    /agent/actions/pending         Pending approval queue
POST   /agent/actions/{id}/approve    Approve and execute action
POST   /agent/actions/{id}/reject     Reject action with reason
POST   /agent/run                     Trigger manual agent cycle

Organisation
GET    /org                           Org overview + collective gaps
GET    /org/teams                     All teams + readiness scores
GET    /org/teams/{team_id}           Team detail + member list
GET    /org/heatmap                   Heatmap data for D3 treemap

Progress
GET    /progress/snapshots            Weekly snapshots (last 12)
GET    /progress/trajectory           Readiness score over time
GET    /progress/actions/impact       Which actions drove most closure

Real-time
WS     /ws/signals                    SignalR: live signal updates
WS     /ws/actions                    SignalR: agent action notifications
WS     /ws/score                      SignalR: readiness score changes
```

---

## 5.6 Signal Ingestion Pipeline

```python
# Azure Function — triggered every 60 seconds

async def ingest_signals(timer: func.TimerRequest):
    harvesters = [
        BingNewsHarvester(topics=get_trending_domains()),
        ArxivHarvester(categories=['cs.AI', 'cs.LG', 'econ.GN']),
        BingWebHarvester(queries=get_gap_queries()),
        GraphHarvester(scope='industry_signals'),
    ]
    
    raw_signals = await asyncio.gather(*[h.harvest() for h in harvesters])
    
    for signal in flatten(raw_signals):
        # Deduplicate via content hash
        if await cosmos.exists(signal.content_hash): continue
        
        # Extract domain + strength via Azure AI Language
        enriched = await language_service.enrich(signal)
        
        # Embed via text-embedding-3-large
        enriched.embedding = await openai.embed(enriched.summary)
        
        # Store + index
        await cosmos.upsert('signals', enriched)
        await search.upload('nexus-signals', enriched)
        
        # Publish to Event Hubs for agent processing
        await event_hubs.publish('nexus-signals', enriched)
```

---

# 6. Implementation Plan

## 6.1 4-Week Sprint Overview

```
Week 1: Foundation     → Signal pipeline + capability model + React shell
Week 2: Intelligence   → AutoGen agents + gap computation + SignalR
Week 3: Experience     → Dashboard UI + animations + org view + agent feed
Week 4: Polish + Ship  → 3D landing page + deployment + video + submission
```

---

## 6.2 Week 1 — Foundation (Days 1–7)

### Day 1–2: Azure Setup + Signal Ingestion

- [ ] Provision all Azure services (AI, Cosmos DB, Search, Event Hubs, Functions)
- [ ] Configure Azure Entra ID app registration with MS Graph scopes
- [ ] Build `BingNewsHarvester` — fetch + deduplicate news signals
- [ ] Build `ArxivHarvester` — fetch recent AI/ML papers
- [ ] Deploy Azure Function with 60s timer trigger
- [ ] Verify signals flowing into Cosmos DB + Event Hubs

**Key output:** Raw signals appearing in Cosmos DB every 60 seconds

### Day 3–4: Capability Model + MS Graph

- [ ] Build `GraphHarvester` — read Calendar, Teams activity, User Profile
- [ ] Build capability extraction prompt (GPT-4o) from activity signals
- [ ] Schema: `capability_models` collection in Cosmos DB
- [ ] Build `/users/me/capability-model` endpoint
- [ ] Build `/users/me/refresh` manual trigger endpoint
- [ ] Azure AI Search index: `nexus-capabilities` with vector field

**Key output:** Capability model generated from real M365 data

### Day 5–7: Next.js Shell + Auth

- [ ] Next.js 14 app router setup with TypeScript + Tailwind
- [ ] MSAL React auth with Azure Entra ID
- [ ] `AppShell` sidebar with collapsible navigation (Framer Motion)
- [ ] Root layout with custom cursor, grain overlay, font loading
- [ ] Protected route middleware
- [ ] Basic dashboard page skeleton

**Key output:** Authenticated Next.js app with working sidebar

---

## 6.3 Week 2 — Intelligence (Days 8–14)

### Day 8–9: AutoGen Agent Setup

- [ ] AutoGen 0.4 multi-agent system with 4 specialised agents
- [ ] `SignalFuserAgent` — fuses signals into domain-level demand model
- [ ] `CapabilityModelAgent` — updates user capability from new activity
- [ ] `GapAnalyserAgent` — computes gap delta + urgency scoring
- [ ] `ActionPlannerAgent` — proposes concrete actions to close gaps
- [ ] Semantic Kernel memory: agents share context via `nexus-capabilities` index

**Key output:** Full agent pipeline running end-to-end

### Day 10–11: Gap Engine

- [ ] Gap computation algorithm: cosine similarity between capability and demand embeddings
- [ ] Urgency scoring: signal velocity × gap size × horizon weight
- [ ] Gap trend detection: widening / stable / closing
- [ ] Gap evidence linking: which signals surface each gap
- [ ] `/gaps` API endpoint with ranked gap index
- [ ] Progress snapshot scheduler (nightly job)

**Key output:** Ranked gap index with evidence for any user

### Day 12–14: Real-time Infrastructure

- [ ] Azure SignalR hub configuration
- [ ] Backend SignalR service: push updates on signal ingest, action queue, score change
- [ ] Frontend SignalR client: subscribe to all three channels
- [ ] Redis cache: dashboard data cached at 50ms read latency
- [ ] `/agent/run` manual trigger endpoint
- [ ] Action queue: pending actions stored + API for approve/reject

**Key output:** Live dashboard with real-time updates via SignalR

---

## 6.4 Week 3 — Experience (Days 15–21)

### Day 15–16: Dashboard + GSAP

- [ ] KPI cards with GSAP counter animations (TextPlugin)
- [ ] Gap index panel with staggered GSAP bar animations
- [ ] Signal feed panel with Framer Motion entry animations
- [ ] Agent action panel with approve/reject interactions
- [ ] Full dashboard connected to live API

### Day 17–18: Signals + Org Pages

- [ ] SVG force-directed signal graph (D3 simulation)
- [ ] Signal stream with live SignalR updates
- [ ] Signal node detail panel (Framer AnimatePresence)
- [ ] Org heatmap grid (interactive team cards)
- [ ] Team detail right panel with member scores

### Day 19–21: Agent Feed + Progress

- [ ] Agent action list with filter tabs
- [ ] Approve/reject with optimistic UI updates
- [ ] Action detail expansion (Framer layout animation)
- [ ] Progress trajectory chart (D3 line chart + GSAP transitions)
- [ ] Gap closure timeline visualisation
- [ ] Agent effectiveness metrics panel

**Key output:** All 5 app pages fully functional with live data

---

## 6.5 Week 4 — Polish + Ship (Days 22–28)

### Day 22–23: Landing Page + Three.js

- [ ] Three.js particle orb (2,400 particles, Fibonacci distribution)
- [ ] Three.js ring system (3 orbital rings)
- [ ] Framer Motion scroll parallax on hero text
- [ ] All 5 landing page sections
- [ ] Lenis smooth scroll
- [ ] GSAP ScrollTrigger on feature cards and stats

### Day 24–25: Azure Deployment

- [ ] Azure Static Web Apps: Next.js frontend
- [ ] Azure App Service: FastAPI backend
- [ ] Azure Container Apps: AutoGen agent workers
- [ ] Azure CDN: static asset delivery
- [ ] Custom domain + SSL
- [ ] Environment variables via Azure Key Vault
- [ ] Health checks and monitoring via Azure Monitor

### Day 26–27: Demo Preparation

- [ ] Pre-run all 3 hero demo scenarios and cache results
- [ ] Build static screenshot fallbacks for every key screen
- [ ] Record 3-minute demo video (OBS)
- [ ] Prepare architecture diagram (clean, print-ready)

### Day 28: Submission

- [ ] Final submission writeup
- [ ] Architecture document
- [ ] Deployed link verification
- [ ] Submit on HackerEarth

---

## 6.6 Risk Register

| Risk | Probability | Impact | Mitigation |
|------|-------------|--------|------------|
| MS Graph consent issues in demo env | Medium | High | Use synthetic org data generator as fallback |
| AutoGen agent latency > 5s | Medium | Medium | Pre-cache all demo scenarios; show cached results |
| Three.js performance on demo machine | Low | High | LOD fallback — reduce particle count on < 60fps |
| Azure service quota limits | Low | High | Pre-request quota increases in Week 1 |
| SignalR connection drops during demo | Low | High | Polling fallback with 10s interval |
| Bing API rate limit | Medium | Low | Redis cache all Bing responses for 5 minutes |

---

# 7. AI Agents Specification

## 7.1 Agent Architecture Overview

NEXUS uses an **AutoGen 0.4 GroupChat** pattern with four specialised agents coordinated by a human-proxy agent. All agents share memory via Semantic Kernel's `AzureAISearchMemoryStore`.

```
┌──────────────────────────────────────────────────────────┐
│                  NEXUS AGENT SWARM                        │
│                                                           │
│  ┌─────────────┐   ┌─────────────┐   ┌────────────────┐  │
│  │ SIGNAL      │   │ CAPABILITY  │   │ GAP            │  │
│  │ FUSER       │──▶│ MODELLER    │──▶│ ANALYSER       │  │
│  │             │   │             │   │                │  │
│  │ GPT-4o      │   │ Claude 3.5  │   │ GPT-4o         │  │
│  └─────────────┘   └─────────────┘   └────────────────┘  │
│                                              │             │
│                                              ▼             │
│                    ┌─────────────────────────────────┐    │
│                    │ ACTION PLANNER                  │    │
│                    │                                 │    │
│                    │ Gemini 1.5 Pro (primary)        │    │
│                    │ GPT-4o (validation)             │    │
│                    └─────────────────────────────────┘    │
│                                                           │
│  Shared: Semantic Kernel Memory ← Azure AI Search         │
└──────────────────────────────────────────────────────────┘
```

---

## 7.2 Agent 1 — Signal Fuser

**Purpose:** Ingests raw signal stream and produces a structured domain demand model

**Model:** Azure OpenAI GPT-4o

**Trigger:** Every 60 seconds when new signals arrive from Event Hubs

**System Prompt:**
```
You are the Signal Fuser agent for NEXUS, a human co-evolution system.

Your job is to process a batch of raw signals (news articles, research papers, 
job posting trends, economic data) and produce a structured domain demand model.

For each signal batch:
1. Identify which capability domains are being signalled (from the taxonomy)
2. Estimate signal strength (0-100) based on source quality, recency, and convergence
3. Detect trend direction: accelerating / stable / decelerating
4. Flag any signals that represent a step-change (not incremental change)
5. Identify conflicts between signals from different sources

Output MUST be valid JSON matching the DomainDemandModel schema.
Do not include any text outside the JSON object.
```

**Input Schema:**
```python
class SignalBatch(BaseModel):
    signals: List[RawSignal]
    windowStart: datetime
    windowEnd: datetime
    userId: str  # for personalised domain weighting
```

**Output Schema:**
```python
class DomainDemandModel(BaseModel):
    domains: List[DomainSignal]
    stepChangeDetected: bool
    conflictingSignals: List[ConflictPair]
    processingMetadata: ProcessingMeta

class DomainSignal(BaseModel):
    domain: str
    strengthScore: float  # 0-100
    trend: Literal['accelerating', 'stable', 'decelerating']
    horizon: Literal['6m', '18m', '36m']
    topSignalIds: List[str]
    summary: str  # 1 sentence
```

---

## 7.3 Agent 2 — Capability Modeller

**Purpose:** Builds and updates the user's capability model from M365 behavioural signals

**Model:** Anthropic Claude 3.5 Sonnet (via Claude API)

**Trigger:** Every 60 minutes + on demand via `/users/me/refresh`

**Why Claude:** Claude 3.5 Sonnet demonstrates superior nuanced inference about human capability from indirect signals — it reasons better about what "writing detailed architecture docs in Teams" implies about a person's capabilities than GPT-4o in this specific task.

**System Prompt:**
```
You are the Capability Modeller for NEXUS. Your job is to build an accurate, 
evidence-based model of a person's current capabilities from indirect behavioural 
signals — not from what they claim, but from what they actually do.

You will receive:
- MS Graph activity signals (calendar patterns, Teams message metadata, 
  document creation patterns, meeting participation)
- Their stated role, industry, and seniority
- Their existing capability model (if available) for incremental updating

Your task:
1. Infer current capability levels (0.0–1.0) across the capability taxonomy
2. Identify evidence for each inference (what signal supports it)
3. Flag capabilities where evidence is thin (low confidence)
4. Detect capability drift — skills showing declining signal
5. Surface latent capabilities — things they're clearly doing but haven't named

Rules:
- Never infer capabilities from job title alone
- Be conservative — it is better to underestimate than overestimate
- Always cite the specific signal that supports each inference
- Capabilities with no signal evidence should remain unscored, not scored at 0

Output MUST be valid JSON matching the CapabilityUpdateModel schema.
```

**Capability Taxonomy:**
```yaml
technical:
  - agentic_ai_design
  - llm_engineering
  - system_architecture
  - data_engineering
  - frontend_development
  - backend_development
  - devops_mlops
  - security_engineering
  - multimodal_systems
  - causal_reasoning

strategic:
  - product_strategy
  - technical_vision
  - roadmap_planning
  - stakeholder_alignment
  - competitive_analysis

leadership:
  - team_building
  - cross_functional_collaboration
  - mentoring
  - decision_making_under_uncertainty

adaptive:
  - learning_velocity
  - pattern_recognition
  - domain_transfer
  - ambiguity_tolerance
```

---

## 7.4 Agent 3 — Gap Analyser

**Purpose:** Computes precise gaps between capability model and demand model, with urgency scoring

**Model:** Azure OpenAI GPT-4o

**Trigger:** After every Capability Modeller update + after every Signal Fuser cycle

**Core Algorithm:**
```python
async def compute_gap(
    capability_model: CapabilityModel,
    domain_demand_model: DomainDemandModel,
    search_client: SearchClient
) -> GapIndex:
    
    gaps = []
    
    for domain_signal in domain_demand_model.domains:
        # Find matching capability via vector similarity
        cap_embedding = await embed(domain_signal.domain)
        nearest_cap = await search_client.vector_search(
            'nexus-capabilities',
            vector=cap_embedding,
            filter=f"userId eq '{user_id}'"
        )
        
        current_level = nearest_cap.currentLevel if nearest_cap else 0.0
        demand_level = domain_signal.strengthScore / 100.0
        
        raw_gap = max(0, demand_level - current_level)
        
        if raw_gap < 0.05:  # Gap too small to surface
            continue
        
        # Urgency = gap_size × signal_velocity × horizon_weight
        urgency = raw_gap * signal_velocity(domain_signal) * HORIZON_WEIGHTS[domain_signal.horizon]
        
        gaps.append(Gap(
            domain=domain_signal.domain,
            coverageScore=current_level,
            demandScore=demand_level,
            rawGap=raw_gap,
            urgencyScore=urgency,
            horizon=domain_signal.horizon,
            status=classify_status(urgency),
            signalIds=domain_signal.topSignalIds
        ))
    
    # LLM refinement pass — GPT-4o adds human-readable names and recommendations
    refined_gaps = await gpt4o_refine(gaps, capability_model.userContext)
    
    return GapIndex(
        gaps=sorted(refined_gaps, key=lambda g: g.urgencyScore, reverse=True),
        readinessScore=compute_readiness_score(capability_model, gaps),
        computedAt=datetime.utcnow()
    )
```

---

## 7.5 Agent 4 — Action Planner

**Purpose:** Proposes concrete, personalised actions that will close specific gaps

**Model:** Google Gemini 1.5 Pro (primary) + GPT-4o (validation pass)

**Why Gemini:** Gemini 1.5 Pro's 1M token context window allows it to consider the full gap history, all available resources, calendar context, and colleague graph in a single pass — producing more personalised action proposals than GPT-4o which requires chunking.

**Trigger:** After every Gap Analyser cycle + on demand via `/agent/run`

**System Prompt:**
```
You are the Action Planner for NEXUS. Your job is to propose specific, 
actionable interventions that will measurably close a person's adaptation gaps.

You will receive:
- Their gap index (ranked by urgency)
- Their calendar availability for the next 14 days
- Their recent agent action history (what has already been tried)
- Their colleague graph (who in their org has related capabilities)
- Their learning style signals (inferred from past action approval patterns)
- Available resources (papers, courses, people) matched to each gap

For each proposed action:
1. It must be concrete — a specific thing they can do, not generic advice
2. It must be scheduled — tied to a specific time or trigger
3. It must be evidence-based — linked to the signals that surface the gap
4. It must be minimal — the smallest intervention that produces measurable closure
5. It must be reversible — the user can reject it without losing anything

Action types you can propose:
- CALENDAR_BLOCK: Schedule a focused work session on a specific gap topic
- RESOURCE_MATCH: Surface a specific paper, course, or video matched to the gap
- COLLEAGUE_CONNECT: Suggest a specific colleague whose work maps the gap
- DOCUMENT_REWRITE: Offer to rewrite a pending document in a future-ready style
- MEETING_INJECT: Suggest a topic to raise in an upcoming meeting
- TASK_CREATE: Create a specific task in Planner with clear acceptance criteria

Constraints:
- No more than 5 actions per agent cycle
- No calendar blocks > 25 minutes
- No duplicate action types within the same gap in the same week
- Respect calendar free/busy — never propose a block in a busy slot
- If user has rejected this action type 3+ times for this gap, try a different type

Output MUST be valid JSON matching the ActionBatch schema.
```

---

## 7.6 Agent Memory Configuration

```python
# Semantic Kernel memory setup
kernel = sk.Kernel()

memory_store = AzureAISearchMemoryStore(
    search_endpoint=settings.azure_search_endpoint,
    admin_key=settings.azure_search_key,
    vector_size=3072  # text-embedding-3-large
)

memory = SemanticTextMemory(
    storage=memory_store,
    embeddings_generator=AzureTextEmbedding(
        deployment_name="text-embedding-3-large",
        endpoint=settings.azure_openai_endpoint,
        api_key=settings.azure_openai_key,
    )
)

# Agents access shared memory collections:
# - "nexus.signals"        → recent signal summaries
# - "nexus.capabilities"   → user capability snapshots
# - "nexus.gaps"           → gap history and trend
# - "nexus.actions"        → action history and outcomes
# - "nexus.colleagues"     → colleague capability profiles
```

---

## 7.7 Agent Evaluation (Azure AI Foundry)

```python
# Evaluation metrics tracked per agent

SIGNAL_FUSER_METRICS = [
    "domain_classification_accuracy",    # vs human-labelled ground truth
    "strength_score_calibration",        # vs actual market outcomes
    "false_positive_rate",               # signals incorrectly flagged as high-strength
]

CAPABILITY_MODELLER_METRICS = [
    "inference_precision",               # are inferred capabilities actually present?
    "inference_recall",                  # are actual capabilities being detected?
    "confidence_calibration",            # do confidence scores match actual accuracy?
]

GAP_ANALYSER_METRICS = [
    "gap_prediction_accuracy",           # do flagged gaps actually matter 6m later?
    "urgency_ranking_quality",           # nDCG of urgency rankings
    "false_alarm_rate",                  # gaps flagged that close without intervention
]

ACTION_PLANNER_METRICS = [
    "action_approval_rate",              # % of proposed actions approved by users
    "gap_closure_attribution",           # % of gap closure attributable to actions
    "action_diversity_score",            # variety across action types and gaps
]
```

---

# 8. Claude Integration

## 8.1 Role in NEXUS

Claude 3.5 Sonnet is the **Capability Modeller** — the agent responsible for inferring human capabilities from indirect behavioural signals. This is the most nuanced reasoning task in the system: drawing inferences about what a person knows and can do from metadata (not content) about how they work.

Claude is chosen for this task specifically because:
1. Claude demonstrates superior performance on tasks requiring inference from weak signals
2. Claude's constitutional AI training makes it more conservative and accurate in capability inference (doesn't over-claim)
3. Claude's long context handles full 90-day activity histories in a single pass

## 8.2 API Integration

```python
# services/claude_service.py
import anthropic

class ClaudeService:
    def __init__(self):
        self.client = anthropic.Anthropic(api_key=settings.anthropic_api_key)
    
    async def model_capabilities(
        self, 
        activity_signals: ActivitySignals,
        existing_model: Optional[CapabilityModel],
        user_context: UserContext
    ) -> CapabilityUpdateModel:
        
        prompt = build_capability_prompt(activity_signals, existing_model, user_context)
        
        message = self.client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=4096,
            system=CAPABILITY_MODELLER_SYSTEM_PROMPT,
            messages=[{"role": "user", "content": prompt}]
        )
        
        raw_json = message.content[0].text
        return CapabilityUpdateModel.model_validate_json(raw_json)
    
    async def analyse_gap_evidence(
        self,
        gap: Gap,
        signals: List[Signal]
    ) -> GapEvidenceAnalysis:
        """
        Claude provides nuanced analysis of WHY a gap exists and
        what type of intervention would be most effective for this
        specific person's learning style.
        """
        message = self.client.messages.create(
            model="claude-sonnet-4-6",
            max_tokens=1024,
            system=GAP_EVIDENCE_SYSTEM_PROMPT,
            messages=[{
                "role": "user",
                "content": f"Gap: {gap.model_dump_json()}\n\nSignals: {[s.model_dump_json() for s in signals]}"
            }]
        )
        return GapEvidenceAnalysis.model_validate_json(message.content[0].text)
```

## 8.3 Prompts

```python
CAPABILITY_MODELLER_SYSTEM_PROMPT = """
You are the Capability Modeller for NEXUS, a human co-evolution system.

Your task is to build an evidence-based model of a person's current capabilities 
from their actual work behaviour — not from what they claim.

Input you will receive:
- Calendar metadata: meeting types, durations, recurrence, subjects (no content)
- Teams activity: message frequency, thread depth, channel types (no content)
- Document metadata: file types created, edit frequency, naming patterns
- Meeting participation: presenter vs attendee patterns, meeting type distribution
- Their stated role, seniority, and industry
- Their existing capability model if available (for incremental update)

Your output must be a CapabilityUpdateModel JSON object containing:
- Updated capability scores (0.0–1.0) for each relevant domain
- Evidence citations for each inference
- Confidence levels for each capability score
- Detected capability drift (declining signals)
- Latent capabilities (clearly present but unstated)

Critical rules:
- Never infer from job title alone — require behavioural evidence
- Be conservative: underestimating is safer than overestimating
- Cite specific signals for every inference
- Mark capabilities with thin evidence as low-confidence
- Consider the gap between stated and demonstrated capabilities
"""
```

---

# 9. Gemini Integration

## 9.1 Role in NEXUS

Google Gemini 1.5 Pro is the **Action Planner** — the agent that proposes specific interventions to close gaps. Gemini's 1 million token context window is the key differentiator: it allows the planner to consider the full picture (all gaps, full calendar, all available resources, complete action history, entire colleague graph) in a single inference call.

## 9.2 API Integration

```python
# services/gemini_service.py
import google.generativeai as genai

class GeminiService:
    def __init__(self):
        genai.configure(api_key=settings.gemini_api_key)
        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-pro",
            generation_config=genai.GenerationConfig(
                response_mime_type="application/json",
                temperature=0.3,  # Low temperature for consistent action proposals
                max_output_tokens=4096,
            ),
            system_instruction=ACTION_PLANNER_SYSTEM_PROMPT
        )
    
    async def plan_actions(
        self,
        gap_index: GapIndex,
        calendar_context: CalendarContext,
        action_history: List[AgentAction],
        colleague_graph: ColleagueGraph,
        available_resources: List[Resource],
        user_context: UserContext
    ) -> ActionBatch:
        
        # Build mega-context — this is why we use Gemini
        context = build_full_planning_context(
            gap_index=gap_index,
            calendar=calendar_context,
            history=action_history,
            colleagues=colleague_graph,
            resources=available_resources,
            user=user_context
        )
        
        response = await asyncio.to_thread(
            self.model.generate_content, context
        )
        
        actions = ActionBatch.model_validate_json(response.text)
        
        # GPT-4o validation pass — check for quality and safety
        validated = await self.validate_actions(actions, user_context)
        
        return validated
    
    async def validate_actions(
        self, 
        actions: ActionBatch, 
        user_context: UserContext
    ) -> ActionBatch:
        """GPT-4o second-pass validation for quality and appropriateness"""
        validation_prompt = f"""
        Review these proposed user actions for quality and appropriateness.
        
        For each action, verify:
        1. Is it specific enough to actually execute?
        2. Is it appropriate for this person's role and seniority?
        3. Is it respectful of their calendar and workload?
        4. Does it genuinely address the stated gap?
        
        Return the same ActionBatch JSON with a 'validationPassed' boolean 
        and 'validationNotes' string added to each action.
        
        Actions: {actions.model_dump_json()}
        User Context: {user_context.model_dump_json()}
        """
        
        response = await openai_client.chat.completions.create(
            model="gpt-4o",
            response_format={"type": "json_object"},
            messages=[{"role": "user", "content": validation_prompt}]
        )
        
        return ActionBatch.model_validate_json(response.choices[0].message.content)
```

## 9.3 Context Building

```python
def build_full_planning_context(
    gap_index: GapIndex,
    calendar: CalendarContext,
    history: List[AgentAction],
    colleagues: ColleagueGraph,
    resources: List[Resource],
    user: UserContext
) -> str:
    """
    Builds the ~50k token context that takes advantage of Gemini's long window.
    GPT-4o would require this to be chunked; Gemini handles it in one shot.
    """
    return f"""
    # NEXUS Action Planning Context
    
    ## User
    {user.model_dump_json(indent=2)}
    
    ## Current Gap Index (ranked by urgency)
    {gap_index.model_dump_json(indent=2)}
    
    ## Calendar Availability — Next 14 Days
    {calendar.model_dump_json(indent=2)}
    
    ## Action History — Last 30 Days
    {json.dumps([a.model_dump() for a in history], indent=2)}
    
    ## Colleague Capability Graph
    {colleagues.model_dump_json(indent=2)}
    
    ## Available Resources (matched to gaps)
    {json.dumps([r.model_dump() for r in resources], indent=2)}
    
    ## Task
    Propose exactly 3–5 specific actions that will most effectively close 
    the highest-urgency gaps for this user, given all the context above.
    
    Return a valid ActionBatch JSON object only. No other text.
    """
```

---

# 10. Design System Reference

## 10.1 Complete Token Reference

```css
/* === SPACING === */
--space-1: 4px;
--space-2: 8px;
--space-3: 12px;
--space-4: 16px;
--space-5: 20px;
--space-6: 24px;
--space-8: 32px;
--space-10: 40px;
--space-12: 48px;
--space-16: 64px;

/* === RADII === */
--radius-sm: 6px;
--radius-md: 8px;
--radius-lg: 12px;
--radius-xl: 16px;
--radius-full: 9999px;

/* === SHADOWS === */
--shadow-sm: 0 1px 2px rgba(26,23,19,0.04);
--shadow-md: 0 4px 12px rgba(26,23,19,0.06);
--shadow-lg: 0 8px 24px rgba(26,23,19,0.08);

/* === EASING === */
--ease-expo:   cubic-bezier(0.16, 1, 0.3, 1);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
--ease-smooth: cubic-bezier(0.25, 0.46, 0.45, 0.94);

/* === DURATIONS === */
--duration-fast:   150ms;
--duration-base:   250ms;
--duration-slow:   400ms;
--duration-slower: 700ms;

/* === BORDERS === */
--border-width: 0.5px;  /* Never 1px */
--border-color: #E2DDD6;
```

## 10.2 Component Variants

```typescript
// Button variants
type ButtonVariant = 
  | 'primary'     // bg: obsidian, text: parchment
  | 'secondary'   // bg: transparent, border: border, text: primary
  | 'ghost'       // bg: transparent, text: secondary
  | 'danger'      // bg: sienna-surface, text: sienna

// Tag variants  
type TagVariant = 
  | 'critical'    // bg: sienna-surface, text: sienna
  | 'watch'       // bg: ochre-surface, text: ochre
  | 'closing'     // bg: forest-surface, text: forest
  | 'insight'     // bg: prussian-surface, text: prussian
  | 'neutral'     // bg: stone, text: secondary

// Badge sizes
type BadgeSize = 'sm' | 'md'
// sm: 9px mono, 1px 6px padding
// md: 10px mono, 2px 8px padding
```

## 10.3 Three.js Performance Budget

```
Target: 60fps on a MacBook Pro M1 in Chrome
Particle count: 2,400 (outer) + 600 (inner) = 3,000 total
Geometry: BufferGeometry (not legacy Geometry)
Material: PointMaterial (not ShaderMaterial — avoid GPU overhead)
DPR: [1, 2] — cap at 2 for retina, no 3
Shadows: disabled
Post-processing: none (demo machine may not handle it)
Fallback: if < 45fps after 2s, halve particle count automatically
```

## 10.4 Accessibility Requirements

```
- All interactive elements: focus-visible with 2px obsidian outline
- Colour contrast: min 4.5:1 for body text, 3:1 for large text
- Reduced motion: @media (prefers-reduced-motion) disables GSAP + Three.js
- Custom cursor: falls back to default on touch devices
- Screen reader: aria-labels on all icon-only buttons
- Keyboard navigation: full tab order through sidebar and main content
```

---

*Document version 1.0 · Generated June 2026 · NEXUS by Shikhar*
