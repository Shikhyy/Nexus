'use client';
import { Bell } from 'lucide-react';
import { MiniOrb } from '@/components/3d/MiniOrb';

export function TopBar() {
  return (
    <header className="h-16 border-b-[0.5px] border-[var(--color-border)] bg-[var(--color-parchment)] flex items-center justify-between px-8 sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <MiniOrb />
        <span className="font-mono text-xs text-[var(--color-secondary)] uppercase tracking-widest">Co-Evolution Active</span>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-[var(--color-secondary)] hover:text-[var(--color-obsidian)] transition-colors">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-[var(--color-sienna)] rounded-full" />
        </button>
        <div className="w-8 h-8 rounded-full bg-[var(--color-stone)] border-[0.5px] border-[var(--color-border)] flex items-center justify-center text-sm font-medium text-[var(--color-primary)]">
          AK
        </div>
      </div>
    </header>
  );
}
