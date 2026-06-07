'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';

interface Gap {
  id: string;
  name: string;
  urgencyScore: number;
  status: 'critical' | 'watch' | 'closing';
}

const STATUS_COLORS: Record<string, string> = {
  critical: 'var(--color-sienna)',
  watch:    'var(--color-ochre)',
  closing:  'var(--color-forest)',
};

const STATUS_LABELS: Record<string, string> = {
  critical: 'Critical',
  watch:    'Watch',
  closing:  'Closing',
};

export function GapIndex({ gaps, loading }: { gaps: Gap[]; loading?: boolean }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current || gaps.length === 0) return;
    const bars = listRef.current.querySelectorAll<HTMLElement>('.gap-bar-fill');
    gsap.fromTo(
      bars,
      { scaleX: 0 },
      { scaleX: 1, duration: 1.1, ease: 'power3.out', stagger: 0.08, transformOrigin: 'left center', delay: 0.1 }
    );
  }, [gaps]);

  return (
    <div className="bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg text-[var(--color-obsidian)]" style={{ fontFamily: 'Georgia, serif' }}>
          Adaptation Gaps
        </h3>
        <span className="text-[10px] font-mono text-[var(--color-secondary)] uppercase tracking-widest">
          Ranked by Urgency
        </span>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="space-y-2 animate-pulse">
              <div className="h-3 bg-[var(--color-stone)] rounded w-3/4" />
              <div className="h-1.5 bg-[var(--color-stone)] rounded-full w-full" />
            </div>
          ))}
        </div>
      ) : gaps.length === 0 ? (
        <p className="text-xs text-[var(--color-muted)] text-center py-4">No gaps detected.</p>
      ) : (
        <div ref={listRef} className="space-y-5">
          {gaps.map(gap => (
            <motion.div
              key={gap.id}
              whileHover={{ x: 2 }}
              className="space-y-2 cursor-pointer group"
            >
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-obsidian)] transition-colors">
                  {gap.name}
                </span>
                <div className="flex items-center gap-2">
                  <span
                    className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded"
                    style={{
                      color: STATUS_COLORS[gap.status],
                      backgroundColor: STATUS_COLORS[gap.status] + '18',
                    }}
                  >
                    {STATUS_LABELS[gap.status]}
                  </span>
                  <span className="text-[10px] font-mono text-[var(--color-muted)]">
                    {(gap.urgencyScore * 100).toFixed(0)}%
                  </span>
                </div>
              </div>
              <div className="h-1.5 w-full bg-[var(--color-stone)] rounded-full overflow-hidden">
                <div
                  className="gap-bar-fill h-full rounded-full"
                  style={{
                    width: `${gap.urgencyScore * 100}%`,
                    backgroundColor: STATUS_COLORS[gap.status],
                  }}
                />
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
