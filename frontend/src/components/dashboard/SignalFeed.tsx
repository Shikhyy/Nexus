'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { TrendingUp, FlaskConical, Cpu, Radio } from 'lucide-react';

interface Signal {
  id: string;
  domain: string;
  title: string;
  trendDelta: string;
  timeAgo: string;
  type: 'market' | 'research' | 'tech';
}

const TYPE_CONFIG = {
  market:   { label: 'Market',   color: 'var(--color-sienna)',   bg: 'var(--color-sienna-surface)', icon: <TrendingUp size={12} /> },
  tech:     { label: 'Tech',     color: 'var(--color-prussian)', bg: 'var(--color-prussian-surface)', icon: <Cpu size={12} /> },
  research: { label: 'Research', color: 'var(--color-forest)',   bg: 'var(--color-forest-surface)', icon: <FlaskConical size={12} /> },
};

const FILTERS = ['all', 'market', 'tech', 'research'] as const;

function SkeletonCard() {
  return (
    <div className="p-4 bg-[var(--color-linen)] border border-[var(--color-border)] rounded-xl animate-pulse space-y-3">
      <div className="flex justify-between">
        <div className="h-3 bg-[var(--color-stone)] rounded w-20" />
        <div className="h-3 bg-[var(--color-stone)] rounded w-12" />
      </div>
      <div className="h-4 bg-[var(--color-stone)] rounded w-full" />
      <div className="h-4 bg-[var(--color-stone)] rounded w-3/4" />
    </div>
  );
}

export function SignalFeed({ signals, loading }: { signals: Signal[]; loading?: boolean }) {
  const [filter, setFilter] = useState<string>('all');
  const filtered = filter === 'all' ? signals : signals.filter(s => s.type === filter);

  return (
    <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-xl flex flex-col h-full">
      {/* Header */}
      <div className="px-5 pt-5 pb-4 border-b border-[var(--color-border)]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-semibold text-[var(--color-obsidian)]">Live Intelligence Feed</h3>
            <p className="text-[10px] text-[var(--color-muted)] mt-0.5">{signals.length} signals · Real-time</p>
          </div>
          <div className="flex items-center gap-1.5 bg-[var(--color-forest-surface)] px-2.5 py-1 rounded-full">
            <Radio size={10} className="text-[var(--color-forest)]" />
            <span className="text-[10px] font-mono text-[var(--color-forest)] uppercase tracking-wider font-semibold">Streaming</span>
          </div>
        </div>

        {/* Filter tabs */}
        <div className="flex gap-1">
          {FILTERS.map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`text-[10px] font-mono uppercase tracking-wider px-3 py-1.5 rounded-lg transition-all ${
                filter === f
                  ? 'bg-[var(--color-obsidian)] text-[var(--color-parchment)] shadow-sm'
                  : 'text-[var(--color-secondary)] hover:bg-[var(--color-stone)] hover:text-[var(--color-primary)]'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Signal list */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3 scrollbar-thin">
        {loading ? (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        ) : (
          <AnimatePresence mode="popLayout">
            {filtered.map((signal, i) => {
              const safeType = (signal.type?.toLowerCase() as keyof typeof TYPE_CONFIG) || 'tech';
              const type = TYPE_CONFIG[safeType] || TYPE_CONFIG.tech;
              return (
                <motion.div
                  key={signal.id}
                  layout
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }}
                  exit={{ opacity: 0, height: 0 }}
                  whileHover={{ scale: 1.005, y: -1 }}
                  className="p-4 bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-xl cursor-pointer hover:border-[var(--color-muted)] hover:shadow-sm transition-all group"
                >
                  <div className="flex justify-between items-start mb-2.5">
                    <span
                      className="text-[9px] font-mono uppercase tracking-wider px-2 py-1 rounded-lg flex items-center gap-1 font-semibold"
                      style={{ color: type.color, backgroundColor: type.bg }}
                    >
                      {type.icon}
                      {signal.domain.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] text-[var(--color-muted)] font-mono">{signal.timeAgo}</span>
                  </div>
                  <p className="text-sm font-medium text-[var(--color-primary)] leading-snug mb-3 group-hover:text-[var(--color-obsidian)] transition-colors">
                    {signal.title}
                  </p>
                  <div className="flex justify-between items-center">
                    <span
                      className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md"
                      style={{ color: type.color, backgroundColor: type.bg }}
                    >
                      {type.label}
                    </span>
                    <span
                      className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-md"
                      style={{ color: type.color, backgroundColor: type.bg }}
                    >
                      {signal.trendDelta}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
}
