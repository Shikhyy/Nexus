'use client';
import { SignalFeed } from '@/components/dashboard/SignalFeed';

const mockSignals = [
  { id: '1', domain: 'agentic_ai', title: 'Agentic AI job postings spike 340% YoY', trendDelta: '+340%', timeAgo: '2m ago', type: 'market' as const },
  { id: '2', domain: 'llm_engineering', title: 'New AutoGen pattern library released', trendDelta: 'Hot', timeAgo: '14m ago', type: 'tech' as const },
  { id: '3', domain: 'multimodal', title: 'GPT-4o Vision benchmarks outpace predictions', trendDelta: '+82%', timeAgo: '1h ago', type: 'research' as const },
  { id: '4', domain: 'data_engineering', title: 'Vector DB adoption in enterprise reaches 60%', trendDelta: 'Rising', timeAgo: '3h ago', type: 'market' as const },
  { id: '5', domain: 'agentic_ai', title: 'Multi-agent orchestration frameworks maturity index published', trendDelta: '+12%', timeAgo: '5h ago', type: 'research' as const },
];

export default function SignalsPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="mb-4">
        <h1 className="text-3xl font-serif text-[var(--color-obsidian)] tracking-tight">Signal Feed</h1>
        <p className="text-[var(--color-secondary)] mt-1">Global capability demand signals stream.</p>
      </header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-0">
        <div className="h-full">
            <SignalFeed signals={mockSignals} />
        </div>
        <div className="h-full bg-[var(--color-parchment)] border-[0.5px] border-[var(--color-border)] rounded-lg p-6 flex flex-col items-center justify-center text-center">
            <h3 className="font-serif text-xl text-[var(--color-obsidian)] mb-2">Signal Analysis Engine</h3>
            <p className="text-sm text-[var(--color-secondary)] mb-6 max-w-sm">Select a signal from the live feed to generate a deep-dive analysis of its impact on your capability gaps.</p>
            <div className="px-4 py-2 border-[0.5px] border-[var(--color-border)] rounded-md text-xs font-mono text-[var(--color-muted)]">
                Awaiting Selection...
            </div>
        </div>
      </div>
    </div>
  );
}
