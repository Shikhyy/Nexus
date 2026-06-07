'use client';

import { useEffect, useState } from 'react';
import { KPICard } from '@/components/dashboard/KPICard';
import { GapIndex } from '@/components/dashboard/GapIndex';
import { SignalFeed } from '@/components/dashboard/SignalFeed';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { motion } from 'framer-motion';

interface Gap {
  id: string;
  name: string;
  urgencyScore: number;
  status: 'critical' | 'watch' | 'closing';
}

const FALLBACK_GAPS: Gap[] = [
  { id: '1', name: 'Agentic AI design', urgencyScore: 0.94, status: 'critical' },
  { id: '2', name: 'Multimodal systems', urgencyScore: 0.72, status: 'watch' },
  { id: '3', name: 'Causal reasoning', urgencyScore: 0.45, status: 'watch' },
  { id: '4', name: 'Data engineering ops', urgencyScore: 0.28, status: 'closing' },
];

const MOCK_SIGNALS = [
  { id: '1', domain: 'agentic_ai', title: 'Agentic AI job postings spike 340% YoY — demand outpacing supply', trendDelta: '+340%', timeAgo: '2m ago', type: 'market' as const },
  { id: '2', domain: 'llm_engineering', title: 'AutoGen 0.4 ships multi-agent orchestration primitives', trendDelta: 'Hot', timeAgo: '14m ago', type: 'tech' as const },
  { id: '3', domain: 'multimodal', title: 'GPT-4o Vision benchmarks outpace industry predictions by 82%', trendDelta: '+82%', timeAgo: '1h ago', type: 'research' as const },
  { id: '4', domain: 'data_engineering', title: 'Vector DB enterprise adoption crosses 60% in Fortune 500', trendDelta: 'Rising', timeAgo: '3h ago', type: 'market' as const },
];

const MOCK_ACTIONS = [
  { id: '1', title: '45-min learning block: AutoGen Orchestration Patterns', targetGap: 'Agentic AI design', impact: 'high' as const },
  { id: '2', title: 'Read: Multimodal Fusion paper (Chen et al, 2026)', targetGap: 'Multimodal systems', impact: 'medium' as const },
  { id: '3', title: 'Connect with Jane D. (ML lead) — offers mentorship', targetGap: 'Causal reasoning', impact: 'medium' as const },
];

export default function Dashboard() {
  const [gaps, setGaps] = useState<Gap[]>(FALLBACK_GAPS);
  const [readiness, setReadiness] = useState(74);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/gaps/`)
      .then(res => res.json())
      .then(data => {
        if (data.gaps?.length > 0) {
          setGaps(data.gaps);
          setReadiness(data.readinessScore);
        }
      })
      .catch(() => {
        // Silently fall back to mock data when backend isn't running
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-8 h-full">
      <motion.header
        className="mb-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl text-[var(--color-obsidian)] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Adaptation Map
        </h1>
        <p className="text-[var(--color-secondary)] text-sm mt-1">
          Your real-time co-evolution status — powered by Azure AI &amp; AutoGen
        </p>
      </motion.header>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard title="Readiness Score" value={readiness} suffix="%" trend="+6 pts/mo" trendUp={true} />
        <KPICard title="Open Gaps" value={gaps.filter(g => g.status !== 'closing').length} trend="-2 this week" trendUp={true} />
        <KPICard title="Active Signals" value={847} suffix="+" />
        <KPICard title="Pending Actions" value={MOCK_ACTIONS.length} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 flex-1 min-h-0">
        <div className="col-span-1 flex flex-col gap-6">
          <GapIndex gaps={gaps} loading={loading} />
          <ActionPanel actions={MOCK_ACTIONS} />
        </div>
        <div className="col-span-2 h-full min-h-[500px]">
          <SignalFeed signals={MOCK_SIGNALS} />
        </div>
      </div>
    </div>
  );
}
