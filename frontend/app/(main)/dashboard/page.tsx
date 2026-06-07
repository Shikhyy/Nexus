'use client';

import { KPICard } from '@/components/dashboard/KPICard';
import { GapIndex } from '@/components/dashboard/GapIndex';
import { SignalFeed } from '@/components/dashboard/SignalFeed';
import { ActionPanel } from '@/components/dashboard/ActionPanel';

// Mock data matching the PRD schemas
const mockGaps = [
  { id: '1', name: 'Agentic AI design', urgency: 0.94, status: 'critical' as const },
  { id: '2', name: 'Multimodal systems', urgency: 0.72, status: 'watch' as const },
  { id: '3', name: 'Causal reasoning', urgency: 0.45, status: 'watch' as const },
  { id: '4', name: 'Data engineering', urgency: 0.28, status: 'closing' as const },
];

const mockSignals = [
  { id: '1', domain: 'agentic_ai', title: 'Agentic AI job postings spike 340% YoY', trendDelta: '+340%', timeAgo: '2m ago', type: 'market' as const },
  { id: '2', domain: 'llm_engineering', title: 'New AutoGen pattern library released', trendDelta: 'Hot', timeAgo: '14m ago', type: 'tech' as const },
  { id: '3', domain: 'multimodal', title: 'GPT-4o Vision benchmarks outpace predictions', trendDelta: '+82%', timeAgo: '1h ago', type: 'research' as const },
];

const mockActions = [
  { id: '1', title: 'Micro-learning block: AutoGen Orchestration', targetGap: 'Agentic AI design', impact: 'high' as const },
  { id: '2', title: 'Review Paper: Multimodal Fusion', targetGap: 'Multimodal systems', impact: 'medium' as const },
];

export default function Dashboard() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="mb-4">
        <h1 className="text-3xl font-serif text-[var(--color-obsidian)] tracking-tight">Adaptation Map</h1>
        <p className="text-[var(--color-secondary)] mt-1">Your real-time co-evolution status.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <KPICard title="Readiness Score" value={74} trend="+6 pts/mo" trendUp={true} />
        <KPICard title="Total Gaps" value={8} trend="-2" trendUp={true} />
        <KPICard title="Active Signals" value={847} suffix="+" />
        <KPICard title="Agent Actions" value={5} suffix=" pend" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="col-span-1 flex flex-col gap-6">
          <GapIndex gaps={mockGaps} />
          <ActionPanel actions={mockActions} />
        </div>
        
        <div className="col-span-2 h-full">
          <SignalFeed signals={mockSignals} />
        </div>
      </div>
    </div>
  );
}
