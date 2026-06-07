'use client';

import { motion } from 'framer-motion';
import { Check, X, Calendar } from 'lucide-react';
import { useState } from 'react';

interface Action {
  id: string;
  title: string;
  targetGap: string;
  impact: 'high' | 'medium' | 'low';
}

const IMPACT_CONFIG = {
  high:   { label: 'High impact',   color: 'var(--color-sienna)',   bg: 'var(--color-sienna-surface)' },
  medium: { label: 'Medium impact', color: 'var(--color-ochre)',    bg: 'var(--color-ochre-surface)' },
  low:    { label: 'Low impact',    color: 'var(--color-forest)',   bg: 'var(--color-forest-surface)' },
};

export function ActionPanel({ actions }: { actions: Action[] }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [approved, setApproved] = useState<Set<string>>(new Set());

  const visible = actions.filter(a => !dismissed.has(a.id));

  return (
    <div className="bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg text-[var(--color-obsidian)]" style={{ fontFamily: 'Georgia, serif' }}>
          Agent Actions
        </h3>
        <span className="text-[10px] font-mono text-[var(--color-sienna)] bg-[var(--color-sienna-surface)] px-2 py-0.5 rounded uppercase tracking-wider">
          {visible.length} pending
        </span>
      </div>

      <div className="space-y-3">
        {visible.map(action => {
          const impact = IMPACT_CONFIG[action.impact];
          const isApproved = approved.has(action.id);

          return (
            <motion.div
              key={action.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              className={`p-4 border rounded-md transition-colors ${
                isApproved
                  ? 'border-[var(--color-forest)] bg-[var(--color-forest-surface)]'
                  : 'border-[var(--color-border)] bg-[var(--color-linen)] hover:border-[var(--color-muted)]'
              }`}
            >
              <div className="flex items-start gap-3">
                <Calendar size={14} className="text-[var(--color-secondary)] mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-[var(--color-primary)] leading-snug mb-1">
                    {action.title}
                  </p>
                  <p className="text-[10px] text-[var(--color-secondary)] mb-3">
                    Gap: {action.targetGap}
                  </p>
                  <div className="flex items-center justify-between">
                    <span
                      className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded"
                      style={{ color: impact.color, backgroundColor: impact.bg }}
                    >
                      {impact.label}
                    </span>
                    {!isApproved ? (
                      <div className="flex gap-1.5">
                        <button
                          onClick={() => setApproved(s => new Set([...s, action.id]))}
                          className="flex items-center gap-1 bg-[var(--color-obsidian)] text-[var(--color-parchment)] text-[10px] font-medium px-2.5 py-1 rounded hover:bg-black transition-colors"
                        >
                          <Check size={10} /> Approve
                        </button>
                        <button
                          onClick={() => setDismissed(s => new Set([...s, action.id]))}
                          className="flex items-center gap-1 border border-[var(--color-border)] text-[var(--color-secondary)] text-[10px] font-medium px-2.5 py-1 rounded hover:bg-[var(--color-stone)] transition-colors"
                        >
                          <X size={10} /> Dismiss
                        </button>
                      </div>
                    ) : (
                      <span className="text-[10px] text-[var(--color-forest)] font-mono">✓ Approved</span>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}

        {visible.length === 0 && (
          <div className="text-center py-6">
            <p className="text-xs text-[var(--color-muted)]">All actions reviewed.</p>
          </div>
        )}
      </div>
    </div>
  );
}
