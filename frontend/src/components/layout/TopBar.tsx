'use client';

import { Bell, Search, Moon, Sun } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';

// SSR-safe dynamic import for the WebGL MiniOrb
const MiniOrb = dynamic(
  () => import('@/components/3d/MiniOrb').then(m => ({ default: m.MiniOrb })),
  { ssr: false, loading: () => <span className="w-6 h-6 rounded-full bg-[var(--color-stone)] block" /> }
);

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);

  return (
    <header className="h-14 border-b border-[var(--color-border)] bg-[var(--color-parchment)] bg-opacity-80 backdrop-blur-sm flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <MiniOrb />
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-forest)] animate-pulse" />
          <span className="font-mono text-[10px] text-[var(--color-secondary)] uppercase tracking-widest">
            Co-Evolution Active
          </span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors mr-2"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
        </button>
        <button className="text-[var(--color-muted)] hover:text-[var(--color-primary)] transition-colors">
          <Search size={16} />
        </button>
        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative text-[var(--color-secondary)] hover:text-[var(--color-obsidian)] transition-colors"
          aria-label="Notifications"
        >
          <Bell size={17} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[var(--color-sienna)] rounded-full" />
        </button>
        <div className="w-7 h-7 rounded-full bg-[var(--color-stone)] border border-[var(--color-border)] flex items-center justify-center text-[11px] font-medium text-[var(--color-primary)] cursor-pointer hover:bg-[var(--color-parchment)] transition-colors">
          AK
        </div>
      </div>
    </header>
  );
}
