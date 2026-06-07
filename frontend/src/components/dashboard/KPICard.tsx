'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

interface KPICardProps {
  title: string;
  value: number;
  suffix?: string;
  trend?: string;
  trendUp?: boolean;
  icon?: React.ReactNode;
  accent?: 'forest' | 'sienna' | 'prussian' | 'ochre';
}

const ACCENT_MAP = {
  forest:   { color: 'var(--color-forest)',   bg: 'var(--color-forest-surface)' },
  sienna:   { color: 'var(--color-sienna)',   bg: 'var(--color-sienna-surface)' },
  prussian: { color: 'var(--color-prussian)', bg: 'var(--color-prussian-surface)' },
  ochre:    { color: 'var(--color-ochre)',    bg: '#fdf3dc' },
};

export function KPICard({ title, value, suffix = '', trend, trendUp, icon, accent = 'forest' }: KPICardProps) {
  const valRef = useRef<HTMLSpanElement>(null);
  const { color, bg } = ACCENT_MAP[accent];

  useEffect(() => {
    if (!valRef.current || value === 0) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: value,
      duration: 1.4,
      ease: 'expo.out',
      delay: 0.2,
      onUpdate: () => {
        if (valRef.current) valRef.current.textContent = Math.round(obj.val) + suffix;
      },
    });
  }, [value, suffix]);

  return (
    <div
      className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-xl p-5 flex flex-col gap-4 hover:-translate-y-0.5 hover:shadow-md transition-all duration-300 cursor-default relative overflow-hidden group"
    >
      {/* Accent strip */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 rounded-t-xl opacity-70 group-hover:opacity-100 transition-opacity"
        style={{ backgroundColor: color }}
      />

      <div className="flex items-center justify-between">
        <p className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-widest">{title}</p>
        {icon && (
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center"
            style={{ color, backgroundColor: bg }}
          >
            {icon}
          </div>
        )}
      </div>

      <div className="flex items-end justify-between gap-2">
        <span
          ref={valRef}
          className="text-3xl font-semibold text-[var(--color-obsidian)] tabular-nums"
        >
          0{suffix}
        </span>
        {trend && (
          <span
            className="text-[10px] font-mono font-semibold px-2 py-1 rounded-md mb-0.5"
            style={{ color, backgroundColor: bg }}
          >
            {trend}
          </span>
        )}
      </div>
    </div>
  );
}
