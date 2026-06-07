'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  trend?: string;
  trendUp?: boolean;
}

export function KPICard({ title, value, suffix = '', trend, trendUp }: KPICardProps) {
  const valRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (valRef.current) {
      gsap.fromTo(valRef.current, 
        { textContent: 0 }, 
        { 
          textContent: value, 
          duration: 1.4, 
          ease: 'expo.out', 
          snap: { textContent: 1 }, 
          delay: 0.1,
          onUpdate: function() {
            if (valRef.current) {
              valRef.current.innerHTML = Math.round(Number(valRef.current.textContent)) + suffix;
            }
          }
        }
      );
    }
  }, [value, suffix]);

  return (
    <div className="bg-[var(--color-linen)] border-[0.5px] border-[var(--color-border)] rounded-lg p-5 flex flex-col gap-2 shadow-sm hover:-translate-y-1 transition-transform duration-300">
      <h3 className="text-[var(--color-secondary)] text-sm font-medium">{title}</h3>
      <div className="flex items-end justify-between">
        <div ref={valRef} className="text-4xl font-serif text-[var(--color-obsidian)]">
          0{suffix}
        </div>
        {trend && (
          <div className={`text-xs font-mono font-medium px-2 py-1 rounded-sm ${trendUp ? 'bg-[var(--color-forest-surface)] text-[var(--color-forest)]' : 'bg-[var(--color-sienna-surface)] text-[var(--color-sienna)]'}`}>
            {trend}
          </div>
        )}
      </div>
    </div>
  );
}
