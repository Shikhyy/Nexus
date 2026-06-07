'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface Gap {
  id: string;
  name: string;
  urgency: number;
  status: 'critical' | 'watch' | 'closing';
}

export function GapIndex({ gaps }: { gaps: Gap[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (listRef.current) {
      const bars = listRef.current.querySelectorAll('.gap-bar-fill');
      gsap.fromTo(bars, 
        { scaleX: 0 }, 
        { scaleX: 1, duration: 1.1, ease: 'power3.out', stagger: 0.07, transformOrigin: 'left center', delay: 0.2 }
      );
    }
  }, [gaps]);

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'critical': return 'bg-[var(--color-sienna)]';
      case 'watch': return 'bg-[var(--color-ochre)]';
      case 'closing': return 'bg-[var(--color-forest)]';
      default: return 'bg-[var(--color-primary)]';
    }
  };

  return (
    <div className="bg-[var(--color-parchment)] border-[0.5px] border-[var(--color-border)] rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-[var(--color-obsidian)]">Adaptation Gaps</h3>
        <span className="text-xs font-mono text-[var(--color-secondary)] uppercase tracking-widest">Ranked by Urgency</span>
      </div>

      <div ref={listRef} className="space-y-5">
        {gaps.map(gap => (
          <div key={gap.id} className="space-y-2 cursor-pointer group">
            <div className="flex justify-between items-end">
              <span className="text-sm font-medium text-[var(--color-primary)] group-hover:text-[var(--color-obsidian)] transition-colors">{gap.name}</span>
              <span className="text-xs font-mono text-[var(--color-muted)]">{(gap.urgency * 100).toFixed(0)}%</span>
            </div>
            <div className="h-1.5 w-full bg-[var(--color-stone)] rounded-full overflow-hidden">
              <div 
                className={`gap-bar-fill h-full ${getStatusColor(gap.status)} rounded-full`} 
                style={{ width: \`\${gap.urgency * 100}%\` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
