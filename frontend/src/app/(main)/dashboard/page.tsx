'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { KPICard } from '@/components/dashboard/KPICard';
import { GapIndex } from '@/components/dashboard/GapIndex';
import { SignalFeed } from '@/components/dashboard/SignalFeed';
import { ActionPanel } from '@/components/dashboard/ActionPanel';
import { api, getStoredUser } from '@/lib/api';
import { TrendingUp, Zap, Radio, Target } from 'lucide-react';

interface Gap {
  id: string;
  name: string;
  urgencyScore: number;
  status: 'critical' | 'watch' | 'closing';
}

interface Signal {
  id: string;
  domain: string;
  title: string;
  trendDelta: string;
  timeAgo: string;
  type: 'market' | 'research' | 'tech';
}

interface Action {
  id: string;
  title: string;
  targetGap: string;
  impact: 'high' | 'medium' | 'low';
}

const FALLBACK_GAPS: Gap[] = [
  { id: '1', name: 'Agentic AI design', urgencyScore: 0.94, status: 'critical' },
  { id: '2', name: 'Multimodal systems', urgencyScore: 0.72, status: 'watch' },
  { id: '3', name: 'Causal reasoning', urgencyScore: 0.45, status: 'watch' },
  { id: '4', name: 'Data engineering ops', urgencyScore: 0.28, status: 'closing' },
];

const FALLBACK_SIGNALS: Signal[] = [
  { id: '1', domain: 'agentic_ai', title: 'Agentic AI job postings spike 340% YoY — demand outpacing supply', trendDelta: '+340%', timeAgo: '2m ago', type: 'market' },
  { id: '2', domain: 'llm_engineering', title: 'AutoGen 0.4 ships multi-agent orchestration primitives', trendDelta: 'Hot', timeAgo: '14m ago', type: 'tech' },
  { id: '3', domain: 'multimodal', title: 'GPT-4o Vision benchmarks outpace industry predictions by 82%', trendDelta: '+82%', timeAgo: '1h ago', type: 'research' },
  { id: '4', domain: 'data_engineering', title: 'Vector DB enterprise adoption crosses 60% in Fortune 500', trendDelta: 'Rising', timeAgo: '3h ago', type: 'market' },
];

const FALLBACK_ACTIONS: Action[] = [
  { id: '1', title: '45-min learning block: AutoGen Orchestration Patterns', targetGap: 'Agentic AI design', impact: 'high' },
  { id: '2', title: 'Read: Multimodal Fusion paper (Chen et al, 2026)', targetGap: 'Multimodal systems', impact: 'medium' },
  { id: '3', title: 'Connect with Jane D. (ML lead) — offers mentorship', targetGap: 'Causal reasoning', impact: 'medium' },
];

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08 } },
};
const itemVariant = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } },
};

export default function Dashboard() {
  const [gaps, setGaps] = useState<Gap[]>(FALLBACK_GAPS);
  const [signals, setSignals] = useState<Signal[]>(FALLBACK_SIGNALS);
  const [actions, setActions] = useState<Action[]>(FALLBACK_ACTIONS);
  const [readiness, setReadiness] = useState(74);
  const [loading, setLoading] = useState(true);
  const user = getStoredUser();

  useEffect(() => {
    Promise.all([
      api.get<{ gaps: Gap[]; readinessScore: number }>('/gaps/').catch(() => null),
      api.get<{ signals: Signal[] }>('/signals/').catch(() => null),
      api.post<{ actions: Action[] }>('/agent/plan', { use_default_gaps: true }).catch(() => null),
    ]).then(([gapData, signalData, actionData]) => {
      if (gapData?.gaps?.length) {
        setGaps(gapData.gaps);
        setReadiness(gapData.readinessScore);
      }
      if (signalData?.signals?.length) setSignals(signalData.signals);
      if (actionData?.actions?.length) setActions(actionData.actions);
    }).finally(() => setLoading(false));
  }, []);

  const criticalGaps = gaps.filter(g => g.status === 'critical').length;
  const openGaps = gaps.filter(g => g.status !== 'closing').length;

  return (
    <motion.div
      className="flex flex-col gap-6 h-full"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {/* Header */}
      <motion.div variants={itemVariant} className="flex items-start justify-between">
        <div>
          <p className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-widest mb-1">Adaptation Map</p>
          <h1 className="text-2xl font-semibold text-[var(--color-obsidian)] tracking-tight">
            {user ? `Welcome back, ${user.name.split(' ')[0]}` : 'Dashboard'}
          </h1>
          <p className="text-sm text-[var(--color-secondary)] mt-0.5">
            Real-time co-evolution status — {user?.company ?? 'your organization'}
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-[var(--color-linen)] border border-[var(--color-border)] rounded-full px-3 py-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-forest)] animate-pulse" />
          <span className="text-[10px] font-mono text-[var(--color-secondary)] uppercase tracking-wider">Live · {new Date().toLocaleTimeString()}</span>
        </div>
      </motion.div>

      {/* KPI Row */}
      <motion.div variants={itemVariant} className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <KPICard
          title="Readiness Score"
          value={readiness}
          suffix="%"
          trend="+6 pts/mo"
          trendUp
          icon={<TrendingUp size={14} />}
          accent="forest"
        />
        <KPICard
          title="Open Gaps"
          value={openGaps}
          trend={`${criticalGaps} critical`}
          trendUp={false}
          icon={<Target size={14} />}
          accent="sienna"
        />
        <KPICard
          title="Live Signals"
          value={signals.length}
          suffix="+"
          trend="Streaming"
          trendUp
          icon={<Radio size={14} />}
          accent="prussian"
        />
        <KPICard
          title="AI Actions"
          value={actions.length}
          trend="Queued"
          trendUp
          icon={<Zap size={14} />}
          accent="ochre"
        />
      </motion.div>

      {/* Main Content Grid */}
      <motion.div variants={itemVariant} className="grid grid-cols-1 lg:grid-cols-3 gap-5 flex-1 min-h-0">
        <div className="col-span-1 flex flex-col gap-5 min-h-0">
          <GapIndex gaps={gaps} loading={loading} />
          <ActionPanel actions={actions} loading={loading} />
        </div>
        <div className="col-span-2 h-full min-h-[520px]">
          <SignalFeed signals={signals} loading={loading} />
        </div>
      </motion.div>
    </motion.div>
  );
}
