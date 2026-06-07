'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function SettingsPage() {
  const [autonomy, setAutonomy] = useState('approve-all');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="flex flex-col gap-8 h-full max-w-3xl mx-auto w-full">
      <motion.header
        className="mb-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl text-[var(--color-obsidian)] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          System Settings
        </h1>
        <p className="text-[var(--color-secondary)] text-sm mt-1">
          Configure your NEXUS integrations and Agent behaviour.
        </p>
      </motion.header>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-8"
      >
        <h2 className="text-base font-medium text-[var(--color-obsidian)] mb-6 pb-3 border-b border-[var(--color-border)]" style={{ fontFamily: 'Georgia, serif' }}>
          Integrations
        </h2>
        <div className="space-y-6">
          {[
            {
              name: 'Microsoft 365 Graph API',
              desc: 'Required for Capability Modeller — reads calendar, Teams, and document metadata.',
              status: 'connected',
            },
            {
              name: 'Azure AI Foundry',
              desc: 'Powers embedding generation and AutoGen agent orchestration.',
              status: 'connected',
            },
            {
              name: 'Azure DevOps / GitHub',
              desc: 'Source code activity for technical capability parsing.',
              status: 'pending',
            },
            {
              name: 'Azure Cosmos DB',
              desc: 'Persistent storage for capability models and agent action logs.',
              status: 'pending',
            },
          ].map(({ name, desc, status }) => (
            <div key={name} className="flex items-start justify-between gap-6">
              <div className="flex-1">
                <p className="font-medium text-[var(--color-primary)] text-sm">{name}</p>
                <p className="text-xs text-[var(--color-secondary)] mt-0.5 leading-relaxed">{desc}</p>
              </div>
              {status === 'connected' ? (
                <span className="shrink-0 px-3 py-1 bg-[var(--color-forest-surface)] text-[var(--color-forest)] text-xs font-mono rounded-md border border-[var(--color-forest)] border-opacity-30">
                  Connected
                </span>
              ) : (
                <button className="shrink-0 px-3 py-1 bg-[var(--color-stone)] text-[var(--color-primary)] text-xs font-medium rounded-md border border-[var(--color-border)] hover:bg-[var(--color-parchment)] transition-colors">
                  Connect
                </button>
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-8"
      >
        <h2 className="text-base font-medium text-[var(--color-obsidian)] mb-6 pb-3 border-b border-[var(--color-border)]" style={{ fontFamily: 'Georgia, serif' }}>
          Agent Thresholds
        </h2>
        <div className="space-y-6">
          <div>
            <label className="block font-medium text-[var(--color-primary)] text-sm mb-1">
              Action Planner Autonomy
            </label>
            <p className="text-xs text-[var(--color-secondary)] mb-3">
              Controls when the Gemini Action Planner can execute actions without explicit user approval.
            </p>
            <select
              value={autonomy}
              onChange={e => setAutonomy(e.target.value)}
              className="w-full p-2.5 border border-[var(--color-border)] rounded-md bg-[var(--color-parchment)] text-[var(--color-primary)] text-sm outline-none focus:border-[var(--color-prussian)] transition-colors"
            >
              <option value="approve-all">Require Approval for All Actions</option>
              <option value="auto-low">Auto-Approve Low Impact Actions</option>
              <option value="auto-medium">Auto-Approve Low &amp; Medium Impact Actions</option>
            </select>
          </div>
        </div>
        <div className="mt-8 flex justify-end">
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-[var(--color-obsidian)] text-[var(--color-parchment)] text-sm font-medium rounded-md hover:bg-black transition-colors"
          >
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
        </div>
      </motion.div>
    </div>
  );
}
