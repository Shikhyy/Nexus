'use client';

import { motion } from 'framer-motion';
import { Check, X, Calendar } from 'lucide-react';

interface Action {
  id: string;
  title: string;
  targetGap: string;
  impact: 'high' | 'medium' | 'low';
}

export function ActionPanel({ actions }: { actions: Action[] }) {
  return (
    <div className="bg-[var(--color-parchment)] border-[0.5px] border-[var(--color-border)] rounded-lg p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-serif text-xl text-[var(--color-obsidian)]">Agent Actions</h3>
        <span className="text-xs font-mono text-[var(--color-sienna)] uppercase tracking-widest">{actions.length} Pending</span>
      </div>

      <div className="space-y-4">
        {actions.map((action) => (
          <motion.div 
            key={action.id}
            whileHover={{ y: -2 }}
            className="p-4 border-[0.5px] border-[var(--color-border)] rounded-md flex gap-4 bg-[var(--color-linen)]"
          >
            <div className="mt-1 text-[var(--color-secondary)]">
              <Calendar size={18} />
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-[var(--color-primary)] mb-1">{action.title}</h4>
              <p className="text-xs text-[var(--color-secondary)] mb-3">Target: {action.targetGap}</p>
              
              <div className="flex gap-2">
                <button className="flex-1 flex items-center justify-center gap-1 bg-[var(--color-obsidian)] text-[var(--color-parchment)] text-xs font-medium py-1.5 rounded-sm hover:bg-black transition-colors">
                  <Check size={14} /> Approve
                </button>
                <button className="flex-1 flex items-center justify-center gap-1 bg-transparent border-[0.5px] border-[var(--color-border)] text-[var(--color-secondary)] text-xs font-medium py-1.5 rounded-sm hover:bg-[var(--color-stone)] transition-colors">
                  <X size={14} /> Reject
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
