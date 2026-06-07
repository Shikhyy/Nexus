'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { motion } from 'framer-motion';
import { AlertCircle, Eye, CheckCircle, ArrowRight } from 'lucide-react';

interface Gap {
  id: string;
  name: string;
  urgencyScore: number;
  status: 'critical' | 'watch' | 'closing';
}

const STATUS_CONFIG: Record<string, { color: string; bg: string; label: string; icon: React.ReactNode }> = {
  critical: { color: 'var(--color-sienna)', bg: 'var(--color-sienna-surface)', label: 'Critical', icon: <AlertCircle size={10} /> },
  watch:    { color: 'var(--color-ochre)', bg: '#fdf3dc', label: 'Watch', icon: <Eye size={10} /> },
  closing:  { color: 'var(--color-forest)', bg: 'var(--color-forest-surface)', label: 'Closing', icon: <CheckCircle size={10} /> },
};

function SkeletonRow() {
  return (
    <div className="space-y-2 animate-pulse">
      <div className="flex justify-between">
        <div className="h-3.5 bg-[var(--color-stone)] rounded w-2/3" />
        <div className="h-3.5 bg-[var(--color-stone)] rounded w-14" />
      </div>
      <div className="h-2 bg-[var(--color-stone)] rounded-full w-full" />
    </div>
  );
}

export function GapIndex({ gaps, loading }: { gaps: Gap[]; loading?: boolean }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!listRef.current || gaps.length === 0) return;
    const bars = listRef.current.querySelectorAll<HTMLElement>('.gap-bar-fill');
    gsap.fromTo(bars, { scaleX: 0 }, {
      scaleX: 1, duration: 1.2, ease: 'power3.out', stagger: 0.1, transformOrigin: 'left center', delay: 0.2
    });
  }, [gaps, loading]);

  return (
    <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-sm font-semibold text-[var(--color-obsidian)]">Adaptation Gaps</h3>
          <p className="text-[10px] text-[var(--color-muted)] mt-0.5">Ranked by urgency · live</p>
        </div>
        <button className="flex items-center gap-1 text-[10px] font-mono text-[var(--color-secondary)] hover:text-[var(--color-obsidian)] transition-colors uppercase tracking-wider">
          View All <ArrowRight size={10} />
        </button>
      </div>

      {loading ? (
        <div className="space-y-5">
          {[1, 2, 3].map(i => <SkeletonRow key={i} />)}
        </div>
      ) : gaps.length === 0 ? (
        <div className="flex flex-col items-center py-8 gap-2">
          <CheckCircle size={24} className="text-[var(--color-forest)]" />
          <p className="text-xs text-[var(--color-muted)]">No capability gaps detected</p>
        </div>
      ) : (
        <div ref={listRef} className="space-y-4">
          {gaps.map((gap, i) => {
            const cfg = STATUS_CONFIG[gap.status];
            return (
              <motion.div
                key={gap.id}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ x: 3 }}
                className="space-y-2 cursor-pointer group"
              >
                <div className="flex justify-between items-center">
                  <span className="text-sm text-[var(--color-primary)] group-hover:text-[var(--color-obsidian)] font-medium transition-colors">
                    {gap.name}
                  </span>
                  <div className="flex items-center gap-1.5">
                    <span
                      className="text-[9px] font-mono uppercase px-1.5 py-0.5 rounded-md flex items-center gap-1 font-semibold"
                      style={{ color: cfg.color, backgroundColor: cfg.bg }}
                    >
                      {cfg.icon}
                      {cfg.label}
                    </span>
                    <span className="text-[10px] font-mono text-[var(--color-muted)] tabular-nums w-8 text-right">
                      {(gap.urgencyScore * 100).toFixed(0)}%
                    </span>
                  </div>
                </div>
                <div className="h-1.5 w-full bg-[var(--color-stone)] rounded-full overflow-hidden">
                  <div
                    className="gap-bar-fill h-full rounded-full transition-all"
                    style={{ width: `${gap.urgencyScore * 100}%`, backgroundColor: cfg.color }}
                  />
                </div>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
