'use client';

import { Bell, Moon, Sun, LogOut, User } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import { useTheme } from '@/components/providers/ThemeProvider';
import { getStoredUser, logout } from '@/lib/api';

const MiniOrb = dynamic(
  () => import('@/components/3d/MiniOrb').then(m => ({ default: m.MiniOrb })),
  { ssr: false, loading: () => <span className="w-6 h-6 rounded-full bg-[var(--color-stone)] block" /> }
);

export function TopBar() {
  const { theme, toggleTheme } = useTheme();
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [user, setUser] = useState<{ name: string; email: string; company: string } | null>(null);

  useEffect(() => {
    setUser(getStoredUser());
  }, []);

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : '??';

  return (
    <header className="h-14 border-b border-[var(--color-border)] bg-[var(--color-parchment)]/80 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-10">
      <div className="flex items-center gap-3">
        <MiniOrb />
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-forest)] animate-pulse" />
          <span className="font-mono text-[10px] text-[var(--color-secondary)] uppercase tracking-widest">
            Co-Evolution Active
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={toggleTheme}
          className="w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-muted)] hover:text-[var(--color-primary)] hover:bg-[var(--color-stone)] transition-all"
          aria-label="Toggle Theme"
        >
          {theme === 'dark' ? <Sun size={15} /> : <Moon size={15} />}
        </button>

        <button
          onClick={() => setNotifOpen(!notifOpen)}
          className="relative w-8 h-8 rounded-lg flex items-center justify-center text-[var(--color-secondary)] hover:text-[var(--color-obsidian)] hover:bg-[var(--color-stone)] transition-all"
          aria-label="Notifications"
        >
          <Bell size={15} />
          <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-[var(--color-sienna)] rounded-full" />
        </button>

        {/* Profile button */}
        <div className="relative">
          <button
            onClick={() => setProfileOpen(!profileOpen)}
            className="flex items-center gap-2 pl-2 pr-3 py-1 rounded-full border border-[var(--color-border)] hover:bg-[var(--color-stone)] transition-all group"
          >
            <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[var(--color-sienna)] to-[var(--color-prussian)] flex items-center justify-center text-[10px] font-bold text-white">
              {initials}
            </div>
            <span className="text-xs font-medium text-[var(--color-primary)] max-w-[80px] truncate">
              {user?.name?.split(' ')[0] ?? 'User'}
            </span>
          </button>

          {profileOpen && (
            <div className="absolute right-0 mt-1 w-56 bg-[var(--color-linen)] border border-[var(--color-border)] rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-3 border-b border-[var(--color-border)]">
                <p className="text-xs font-semibold text-[var(--color-obsidian)]">{user?.name}</p>
                <p className="text-[10px] text-[var(--color-muted)] mt-0.5">{user?.email}</p>
                <p className="text-[10px] font-mono text-[var(--color-secondary)]">{user?.company}</p>
              </div>
              <div className="p-1">
                <button className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-[var(--color-secondary)] hover:bg-[var(--color-stone)] hover:text-[var(--color-obsidian)] rounded-lg transition-colors">
                  <User size={13} /> My Profile
                </button>
                <button
                  onClick={logout}
                  className="w-full flex items-center gap-2.5 px-3 py-2 text-xs text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <LogOut size={13} /> Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
