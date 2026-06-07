'use client';
import { motion } from 'framer-motion';

const capabilities = [
  { name: 'Python engineering', level: 0.82, domain: 'technical' },
  { name: 'System design', level: 0.71, domain: 'technical' },
  { name: 'Strategic communication', level: 0.64, domain: 'leadership' },
  { name: 'Cross-functional leadership', level: 0.59, domain: 'leadership' },
  { name: 'Agentic AI design', level: 0.18, domain: 'technical' },
  { name: 'Multimodal ML', level: 0.31, domain: 'technical' },
];

const teams = [
  { name: 'Engineering', readiness: 68, members: 12 },
  { name: 'Product', readiness: 74, members: 8 },
  { name: 'Design', readiness: 71, members: 5 },
  { name: 'Data Science', readiness: 81, members: 9 },
  { name: 'Leadership', readiness: 55, members: 4 },
];

function ReadinessBar({ value, max = 100 }: { value: number; max?: number }) {
  const pct = (value / max) * 100;
  const color = pct >= 75 ? 'var(--color-forest)' : pct >= 50 ? 'var(--color-ochre)' : 'var(--color-sienna)';
  return (
    <div className="h-1.5 w-full bg-[var(--color-stone)] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </div>
  );
}

export default function OrgHeatmap() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <motion.header
        className="mb-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl text-[var(--color-obsidian)] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
          Org Heatmap
        </h1>
        <p className="text-[var(--color-secondary)] text-sm mt-1">
          Cross-functional capability distribution across the enterprise.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
        {/* Team Readiness */}
        <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6">
          <h2 className="text-lg font-medium text-[var(--color-obsidian)] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Team Readiness
          </h2>
          <div className="space-y-5">
            {teams.map((team, i) => (
              <motion.div
                key={team.name}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-end text-sm">
                  <div>
                    <span className="font-medium text-[var(--color-primary)]">{team.name}</span>
                    <span className="text-[var(--color-muted)] ml-2 text-xs">{team.members} members</span>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-muted)]">{team.readiness}%</span>
                </div>
                <ReadinessBar value={team.readiness} />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Capability Distribution */}
        <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6">
          <h2 className="text-lg font-medium text-[var(--color-obsidian)] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Capability Depth
          </h2>
          <div className="space-y-5">
            {capabilities.map((cap, i) => (
              <motion.div
                key={cap.name}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08, duration: 0.4 }}
                className="space-y-2"
              >
                <div className="flex justify-between items-end text-sm">
                  <div>
                    <span className="font-medium text-[var(--color-primary)]">{cap.name}</span>
                    <span className="text-[var(--color-muted)] ml-2 text-xs capitalize">{cap.domain}</span>
                  </div>
                  <span className="font-mono text-xs text-[var(--color-muted)]">{(cap.level * 100).toFixed(0)}%</span>
                </div>
                <ReadinessBar value={cap.level * 100} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
