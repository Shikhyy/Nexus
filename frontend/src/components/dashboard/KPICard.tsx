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
  const valRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!valRef.current || value === 0) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.4,
      ease: 'expo.out',
      delay: 0.1,
      onUpdate: () => {
        if (valRef.current) {
          valRef.current.textContent = Math.round(obj.val) + suffix;
        }
      },
    });
  }, [value, suffix]);

  return (
    <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-5 flex flex-col gap-3 hover:-translate-y-0.5 transition-transform duration-300 cursor-default">
      <p className="text-[var(--color-secondary)] text-xs font-medium uppercase tracking-wide">{title}</p>
      <div className="flex items-end justify-between gap-2">
        <span ref={valRef} className="text-4xl text-[var(--color-obsidian)]" style={{ fontFamily: 'Georgia, serif' }}>
          0{suffix}
        </span>
        {trend && (
          <span
            className={`text-[10px] font-mono font-semibold px-2 py-1 rounded ${
              trendUp
                ? 'bg-[var(--color-forest-surface)] text-[var(--color-forest)]'
                : 'bg-[var(--color-sienna-surface)] text-[var(--color-sienna)]'
            }`}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
