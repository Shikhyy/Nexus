'use client';

import { motion, AnimatePresence } from 'framer-motion';

interface Signal {
  id: string;
  domain: string;
  title: string;
  trendDelta: string;
  timeAgo: string;
  type: 'market' | 'research' | 'tech';
}

export function SignalFeed({ signals }: { signals: Signal[] }) {
  return (
    <div className="bg-[var(--color-parchment)] border-[0.5px] border-[var(--color-border)] rounded-lg shadow-sm flex flex-col h-full">
      <div className="p-6 border-b-[0.5px] border-[var(--color-border)] flex items-center justify-between">
        <h3 className="font-serif text-xl text-[var(--color-obsidian)]">Live Signals</h3>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[var(--color-forest)] animate-pulse" />
          <span className="text-xs font-mono text-[var(--color-secondary)] uppercase">Streaming</span>
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto space-y-3">
        <AnimatePresence>
          {signals.map((signal) => (
            <motion.div 
              key={signal.id}
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              className="p-4 bg-[var(--color-linen)] border-[0.5px] border-[var(--color-border)] rounded-md cursor-pointer hover:border-[var(--color-prussian)] hover:shadow-sm transition-all"
            >
              <div className="flex justify-between items-start mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-[var(--color-prussian)] bg-[var(--color-prussian-surface)] px-2 py-0.5 rounded-sm">
                  {signal.domain}
                </span>
                <span className="text-xs text-[var(--color-muted)] font-mono">{signal.timeAgo}</span>
              </div>
              <p className="text-sm font-medium text-[var(--color-primary)] leading-snug mb-3">
                {signal.title}
              </p>
              <div className="flex justify-between items-center text-xs">
                <span className="text-[var(--color-secondary)] capitalize">{signal.type}</span>
                <span className="font-mono text-[var(--color-sienna)] bg-[var(--color-sienna-surface)] px-1.5 py-0.5 rounded-sm">
                  {signal.trendDelta}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
