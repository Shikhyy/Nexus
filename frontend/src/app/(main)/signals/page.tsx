'use client';
import { SignalFeed } from '@/components/dashboard/SignalFeed';
import { motion } from 'framer-motion';

const ALL_SIGNALS = [
  { id: '1', domain: 'agentic_ai', title: 'Agentic AI job postings spike 340% YoY — demand outpacing supply significantly', trendDelta: '+340%', timeAgo: '2m ago', type: 'market' as const },
  { id: '2', domain: 'llm_engineering', title: 'AutoGen 0.4 ships multi-agent orchestration primitives and A2A protocol', trendDelta: 'Hot', timeAgo: '14m ago', type: 'tech' as const },
  { id: '3', domain: 'multimodal', title: 'GPT-4o Vision benchmarks outpace industry predictions by 82%', trendDelta: '+82%', timeAgo: '1h ago', type: 'research' as const },
  { id: '4', domain: 'data_engineering', title: 'Vector DB enterprise adoption crosses 60% threshold in Fortune 500', trendDelta: 'Rising', timeAgo: '3h ago', type: 'market' as const },
  { id: '5', domain: 'agentic_ai', title: 'Multi-agent orchestration frameworks maturity index published by Gartner', trendDelta: '+12%', timeAgo: '5h ago', type: 'research' as const },
  { id: '6', domain: 'llm_engineering', title: 'Microsoft Phi-4 mini outperforms GPT-3.5 on reasoning benchmarks', trendDelta: 'New', timeAgo: '7h ago', type: 'tech' as const },
  { id: '7', domain: 'multimodal', title: 'Video understanding capabilities now required in 34% of AI roles', trendDelta: '+34%', timeAgo: '9h ago', type: 'market' as const },
];

export default function SignalsPage() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <motion.header
        className="mb-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl text-[var(--color-obsidian)] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Signal Feed
        </h1>
        <p className="text-[var(--color-secondary)] text-sm mt-1">
          Global capability demand signals — streaming via Azure SignalR
        </p>
      </motion.header>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-8 min-h-0">
        <div className="lg:col-span-2 h-full min-h-[500px]">
          <SignalFeed signals={ALL_SIGNALS} />
        </div>

        <div className="flex flex-col gap-4">
          {/* Signal Stats */}
          <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-base font-medium text-[var(--color-obsidian)] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Signal Summary
            </h3>
            <div className="space-y-3">
              {[
                { label: 'Agentic AI', count: 3, color: 'var(--color-sienna)' },
                { label: 'LLM Engineering', count: 2, color: 'var(--color-prussian)' },
                { label: 'Multimodal', count: 2, color: 'var(--color-forest)' },
                { label: 'Data Engineering', count: 1, color: 'var(--color-ochre)' },
              ].map(({ label, count, color }) => (
                <div key={label} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                    <span className="text-[var(--color-primary)]">{label}</span>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-muted)]">{count} signals</span>
                </div>
              ))}
            </div>
          </div>

          {/* Signal Analysis Panel */}
          <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6 flex-1 flex flex-col">
            <h3 className="text-base font-medium text-[var(--color-obsidian)] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Analysis Engine
            </h3>
            <p className="text-xs text-[var(--color-secondary)] mb-4 leading-relaxed">
              Select a signal from the live feed to generate a deep-dive analysis of its impact on your capability gaps.
            </p>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-[var(--color-border)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-muted)] animate-pulse" />
                </div>
                <p className="font-mono text-xs text-[var(--color-muted)] uppercase tracking-wider">Awaiting Selection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
