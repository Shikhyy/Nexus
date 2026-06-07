'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Check, X, Zap, Sparkles } from 'lucide-react';
import { useState } from 'react';

interface Action {
  id: string;
  title: string;
  targetGap: string;
  impact: 'high' | 'medium' | 'low';
}

const IMPACT_CONFIG = {
  high:   { label: 'High',   color: 'var(--color-sienna)',   bg: 'var(--color-sienna-surface)', dot: 'bg-[var(--color-sienna)]' },
  medium: { label: 'Medium', color: 'var(--color-ochre)',    bg: '#fdf3dc',                     dot: 'bg-[var(--color-ochre)]' },
  low:    { label: 'Low',    color: 'var(--color-forest)',   bg: 'var(--color-forest-surface)', dot: 'bg-[var(--color-forest)]' },
};

function SkeletonAction() {
  return (
    <div className="p-4 border border-[var(--color-border)] bg-[var(--color-parchment)] rounded-xl animate-pulse space-y-2">
      <div className="h-3 bg-[var(--color-stone)] rounded w-3/4" />
      <div className="h-3 bg-[var(--color-stone)] rounded w-1/2" />
      <div className="flex justify-between items-center mt-2">
        <div className="h-4 bg-[var(--color-stone)] rounded w-16" />
        <div className="h-6 bg-[var(--color-stone)] rounded w-28" />
      </div>
    </div>
  );
}

export function ActionPanel({ actions, loading }: { actions: Action[]; loading?: boolean }) {
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());
  const [approved, setApproved] = useState<Set<string>>(new Set());

  const visible = actions.filter(a => !dismissed.has(a.id));
  const approvedCount = approved.size;

  return (
    <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-obsidian)]">AI Actions</h3>
          <p className="text-[10px] text-[var(--color-muted)] mt-0.5">
            {approvedCount > 0 ? `${approvedCount} approved · ` : ''}{visible.length} pending review
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-[var(--color-sienna-surface)] px-2 py-1 rounded-full">
          <Sparkles size={10} className="text-[var(--color-sienna)]" />
          <span className="text-[9px] font-mono text-[var(--color-sienna)] uppercase tracking-wider font-semibold">Groq</span>
        </div>
      </div>

      <div className="space-y-2.5">
        {loading ? (
          <>
            <SkeletonAction />
            <SkeletonAction />
          </>
        ) : (
          <AnimatePresence>
            {visible.map((action, i) => {
              // Ensure we don't crash if the LLM generates an unknown impact level
              const safeImpact = (action.impact?.toLowerCase() as keyof typeof IMPACT_CONFIG) || 'medium';
              const impact = IMPACT_CONFIG[safeImpact] || IMPACT_CONFIG.medium;
              const isApproved = approved.has(action.id);

              return (
                <motion.div
                  key={action.id}
                  layout
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: i * 0.06 } }}
                  exit={{ opacity: 0, scale: 0.95, height: 0 }}
                  className={`p-4 border rounded-xl transition-all ${
                    isApproved
                      ? 'border-[var(--color-forest)] bg-[var(--color-forest-surface)]'
                      : 'border-[var(--color-border)] bg-[var(--color-parchment)] hover:border-[var(--color-muted)] hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-start gap-2.5">
                    <div className="mt-1 shrink-0">
                      <Zap size={13} style={{ color: impact.color }} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-[var(--color-primary)] leading-snug mb-1 font-medium">
                        {action.title}
                      </p>
                      <p className="text-[10px] text-[var(--color-muted)] mb-3 font-mono">
                        → {action.targetGap}
                      </p>
                      <div className="flex items-center justify-between">
                        <span
                          className="text-[9px] font-mono uppercase px-2 py-0.5 rounded-md font-semibold flex items-center gap-1"
                          style={{ color: impact.color, backgroundColor: impact.bg }}
                        >
                          <span className={`w-1.5 h-1.5 rounded-full ${impact.dot}`} />
                          {impact.label} impact
                        </span>
                        {!isApproved ? (
                          <div className="flex gap-1">
                            <button
                              onClick={() => setApproved(s => new Set([...s, action.id]))}
                              className="flex items-center gap-1 bg-[var(--color-obsidian)] text-[var(--color-parchment)] text-[10px] font-semibold px-2.5 py-1.5 rounded-lg hover:bg-black transition-colors"
                            >
                              <Check size={10} /> Approve
                            </button>
                            <button
                              onClick={() => setDismissed(s => new Set([...s, action.id]))}
                              className="flex items-center gap-1 border border-[var(--color-border)] text-[var(--color-secondary)] text-[10px] font-medium px-2.5 py-1.5 rounded-lg hover:bg-[var(--color-stone)] transition-colors"
                            >
                              <X size={10} />
                            </button>
                          </div>
                        ) : (
                          <span className="text-[10px] text-[var(--color-forest)] font-semibold font-mono flex items-center gap-1">
                            <Check size={10} /> Approved
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        )}

        {!loading && visible.length === 0 && (
          <div className="text-center py-6 flex flex-col items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-[var(--color-forest-surface)] flex items-center justify-center">
              <Check size={14} className="text-[var(--color-forest)]" />
            </div>
            <p className="text-xs text-[var(--color-muted)]">All actions reviewed</p>
          </div>
        )}
      </div>
    </div>
  );
}
