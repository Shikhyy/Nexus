'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface Signal {
  id: string;
  domain: string;
  title: string;
  trendDelta: string;
  timeAgo: string;
  type: 'market' | 'research' | 'tech';
}

const TYPE_CONFIG = {
  market:   { label: 'Market', color: 'var(--color-sienna)', bg: 'var(--color-sienna-surface)' },
  tech:     { label: 'Tech',   color: 'var(--color-prussian)', bg: 'var(--color-prussian-surface)' },
  research: { label: 'Research', color: 'var(--color-forest)', bg: 'var(--color-forest-surface)' },
};

export function SignalFeed({ signals }: { signals: Signal[] }) {
  const [filter, setFilter] = useState<string>('all');

  const filtered = filter === 'all' ? signals : signals.filter(s => s.type === filter);

  return (
    <div className="bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-lg flex flex-col h-full">
      {/* Header */}
      <div className="p-6 border-b border-[var(--color-border)] flex items-center justify-between">
        <h3 className="text-lg text-[var(--color-obsidian)]" style={{ fontFamily: 'Georgia, serif' }}>
          Live Signals
        </h3>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-forest)] animate-pulse" />
            <span className="text-[10px] font-mono text-[var(--color-secondary)] uppercase tracking-wider">Streaming</span>
          </div>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="px-6 py-3 border-b border-[var(--color-border)] flex gap-2">
        {['all', 'market', 'tech', 'research'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded transition-colors ${
              filter === f
                ? 'bg-[var(--color-obsidian)] text-[var(--color-parchment)]'
                : 'text-[var(--color-secondary)] hover:bg-[var(--color-stone)]'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Signal list */}
      <div className="p-4 flex-1 overflow-y-auto space-y-3">
        <AnimatePresence>
          {filtered.map(signal => {
            const type = TYPE_CONFIG[signal.type];
            return (
              <motion.div
                key={signal.id}
                layout
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35 }}
                className="p-4 bg-[var(--color-linen)] border border-[var(--color-border)] rounded-md cursor-pointer hover:border-[var(--color-muted)] hover:shadow-sm transition-all"
              >
                <div className="flex justify-between items-start mb-2">
                  <span
                    className="text-[9px] font-mono uppercase tracking-wider px-2 py-0.5 rounded"
                    style={{ color: type.color, backgroundColor: type.bg }}
                  >
                    {signal.domain.replace(/_/g, ' ')}
                  </span>
                  <span className="text-[10px] text-[var(--color-muted)] font-mono">{signal.timeAgo}</span>
                </div>
                <p className="text-sm font-medium text-[var(--color-primary)] leading-snug mb-3">
                  {signal.title}
                </p>
                <div className="flex justify-between items-center">
                  <span
                    className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded"
                    style={{ color: type.color, backgroundColor: type.bg }}
                  >
                    {type.label}
                  </span>
                  <span
                    className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded"
                    style={{ color: type.color, backgroundColor: type.bg }}
                  >
                    {signal.trendDelta}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}
