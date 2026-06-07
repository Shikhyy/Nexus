'use client';
import { SignalFeed } from '@/components/dashboard/SignalFeed';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface Signal {
  id: string;
  domain: string;
  title: string;
  trendDelta: string;
  timeAgo: string;
  type: 'market' | 'tech' | 'research';
}

const FALLBACK_SIGNALS: Signal[] = [
  { id: '1', domain: 'agentic_ai',     title: 'Agentic AI job postings spike 340% YoY', trendDelta: '+340%', timeAgo: '2m ago',  type: 'market' },
  { id: '2', domain: 'llm_engineering',title: 'AutoGen 0.4 ships multi-agent orchestration primitives', trendDelta: 'Hot', timeAgo: '14m ago', type: 'tech' },
  { id: '3', domain: 'multimodal',     title: 'GPT-4o Vision benchmarks outpace predictions by 82%', trendDelta: '+82%', timeAgo: '1h ago',  type: 'research' },
  { id: '4', domain: 'data_engineering','title': 'Vector DB enterprise adoption crosses 60% in Fortune 500', trendDelta: 'Rising', timeAgo: '3h ago',  type: 'market' },
  { id: '5', domain: 'agentic_ai',     title: 'Multi-agent orchestration frameworks maturity index — Gartner 2026', trendDelta: '+12%', timeAgo: '5h ago',  type: 'research' },
  { id: '6', domain: 'llm_engineering',title: 'Microsoft Phi-4 mini outperforms GPT-3.5 on reasoning benchmarks', trendDelta: 'New', timeAgo: '7h ago',  type: 'tech' },
  { id: '7', domain: 'multimodal',     title: 'Video understanding required in 34% of new AI role postings', trendDelta: '+34%', timeAgo: '9h ago',  type: 'market' },
];

const DOMAIN_COLORS: Record<string, string> = {
  agentic_ai:     'var(--color-sienna)',
  llm_engineering:'var(--color-prussian)',
  multimodal:     'var(--color-forest)',
  data_engineering:'var(--color-ochre)',
};

export default function SignalsPage() {
  const [signals, setSignals] = useState<Signal[]>(FALLBACK_SIGNALS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/signals/`)
      .then(res => res.json())
      .then(data => {
        if (data.signals?.length > 0) {
          setSignals(data.signals);
        }
      })
      .catch(() => { /* use fallback */ })
      .finally(() => setLoading(false));
  }, []);

  // Aggregate domain signal counts
  const domainCounts: Record<string, number> = {};
  signals.forEach(s => {
    domainCounts[s.domain] = (domainCounts[s.domain] || 0) + 1;
  });

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
          <SignalFeed signals={signals} />
        </div>

        <div className="flex flex-col gap-4">
          {/* Signal Stats from backend */}
          <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6">
            <h3 className="text-base font-medium text-[var(--color-obsidian)] mb-4" style={{ fontFamily: 'Georgia, serif' }}>
              Signal Distribution
            </h3>
            {loading ? (
              <div className="space-y-3 animate-pulse">
                {[1,2,3].map(i => <div key={i} className="h-4 bg-[var(--color-stone)] rounded w-full" />)}
              </div>
            ) : (
              <div className="space-y-3">
                {Object.entries(domainCounts).map(([domain, count]) => (
                  <div key={domain} className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOMAIN_COLORS[domain] || 'var(--color-muted)' }} />
                      <span className="text-[var(--color-primary)] capitalize">{domain.replace(/_/g, ' ')}</span>
                    </div>
                    <span className="font-mono text-xs text-[var(--color-muted)]">{count} signal{count > 1 ? 's' : ''}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Analysis Panel */}
          <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6 flex-1 flex flex-col">
            <h3 className="text-base font-medium text-[var(--color-obsidian)] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Analysis Engine
            </h3>
            <p className="text-xs text-[var(--color-secondary)] mb-4 leading-relaxed">
              Select a signal from the live feed to generate an AI analysis of its impact on your capability gaps.
            </p>
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-10 h-10 mx-auto mb-3 rounded-full border border-[var(--color-border)] flex items-center justify-center">
                  <div className="w-2 h-2 rounded-full bg-[var(--color-muted)] animate-pulse" />
                </div>
                <p className="font-mono text-[10px] text-[var(--color-muted)] uppercase tracking-wider">Awaiting Selection</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
