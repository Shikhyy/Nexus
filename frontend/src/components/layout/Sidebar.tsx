'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Activity, Users, Settings, LogOut, Zap } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { name: 'Dashboard',   icon: LayoutDashboard, path: '/dashboard' },
  { name: 'Signals',     icon: Activity,        path: '/signals'   },
  { name: 'Org Heatmap', icon: Users,           path: '/org'       },
  { name: 'Settings',    icon: Settings,        path: '/settings'  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <motion.aside
      className="h-screen w-60 border-r border-[var(--color-border)] bg-[var(--color-linen)] flex flex-col fixed left-0 top-0 z-20"
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* Brand */}
      <div className="px-6 py-5 border-b border-[var(--color-border)] flex items-center gap-2">
        <Zap size={16} className="text-[var(--color-sienna)]" />
        <h2 className="text-xl text-[var(--color-obsidian)] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          NEXUS
        </h2>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 flex flex-col gap-1 px-3">
        {navItems.map(item => {
          const isActive = pathname.startsWith(item.path);
          return (
            <Link key={item.path} href={item.path}>
              <div
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-[var(--color-stone)] text-[var(--color-obsidian)] font-medium'
                    : 'text-[var(--color-secondary)] hover:bg-[var(--color-stone)] hover:text-[var(--color-primary)]'
                }`}
              >
                <item.icon size={16} />
                {item.name}
                {isActive && (
                  <motion.span
                    layoutId="nav-indicator"
                    className="ml-auto w-1.5 h-1.5 rounded-full bg-[var(--color-sienna)]"
                  />
                )}
              </div>
            </Link>
          );
        })}
      </nav>

      {/* Agent Status */}
      <div className="px-4 pb-4">
        <div className="rounded-md border border-[var(--color-border)] bg-[var(--color-parchment)] p-3 space-y-2">
          <p className="text-[10px] font-mono uppercase tracking-widest text-[var(--color-muted)]">Agent Status</p>
          {[
            { name: 'Signal Fuser',         active: true  },
            { name: 'Capability Modeller',  active: true  },
            { name: 'Gap Analyser',         active: true  },
            { name: 'Action Planner',       active: false },
          ].map(agent => (
            <div key={agent.name} className="flex items-center justify-between">
              <span className="text-[10px] text-[var(--color-secondary)]">{agent.name}</span>
              <span className={`w-1.5 h-1.5 rounded-full ${agent.active ? 'bg-[var(--color-forest)] animate-pulse' : 'bg-[var(--color-muted)]'}`} />
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="px-4 pb-5 border-t border-[var(--color-border)] pt-4">
        <button className="flex items-center gap-2.5 text-[var(--color-secondary)] hover:text-[var(--color-obsidian)] transition-colors text-sm w-full">
          <LogOut size={15} />
          Sign Out
        </button>
      </div>
    </motion.aside>
  );
}
