'use client';

import { motion } from 'framer-motion';
import { LayoutDashboard, Activity, Users, Settings, LogOut } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
    { name: 'Signals', icon: Activity, path: '/signals' },
    { name: 'Org Heatmap', icon: Users, path: '/org' },
    { name: 'Settings', icon: Settings, path: '/settings' },
  ];

  return (
    <motion.aside 
      className="h-screen w-64 border-r-[0.5px] border-[var(--color-border)] bg-[var(--color-linen)] flex flex-col fixed left-0 top-0"
      initial={{ x: -240 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="p-6 border-b-[0.5px] border-[var(--color-border)]">
        <h2 className="font-serif text-2xl text-[var(--color-obsidian)] tracking-tight">NEXUS</h2>
      </div>

      <nav className="flex-1 py-6 flex flex-col gap-2 px-4">
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          return (
            <Link key={item.name} href={item.path}>
              <div className={`flex items-center gap-3 px-4 py-3 rounded-md transition-colors ${isActive ? 'bg-[var(--color-stone)] text-[var(--color-obsidian)]' : 'text-[var(--color-secondary)] hover:bg-[var(--color-stone)] hover:text-[var(--color-primary)]'}`}>
                <item.icon size={18} />
                <span className="font-medium text-sm">{item.name}</span>
              </div>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t-[0.5px] border-[var(--color-border)]">
        <div className="flex items-center gap-3 text-[var(--color-secondary)] hover:text-[var(--color-obsidian)] cursor-pointer transition-colors">
          <LogOut size={18} />
          <span className="font-medium text-sm">Sign Out</span>
        </div>
      </div>
    </motion.aside>
  );
}
