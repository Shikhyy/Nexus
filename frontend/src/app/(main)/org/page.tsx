'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface TeamReadiness {
  team: string;
  readinessScore: number;
  memberCount: number;
}

const FALLBACK_TEAMS: TeamReadiness[] = [
  { team: 'Engineering',  readinessScore: 68, memberCount: 12 },
  { team: 'Product',      readinessScore: 74, memberCount: 8  },
  { team: 'Design',       readinessScore: 71, memberCount: 5  },
  { team: 'Data Science', readinessScore: 81, memberCount: 9  },
  { team: 'Leadership',   readinessScore: 55, memberCount: 4  },
];

const FALLBACK_CAPABILITIES = [
  { name: 'Python engineering',       level: 0.82, domain: 'technical'   },
  { name: 'System design',            level: 0.71, domain: 'technical'   },
  { name: 'Strategic communication',  level: 0.64, domain: 'leadership'  },
  { name: 'Cross-functional leadership', level: 0.59, domain: 'leadership' },
  { name: 'Agentic AI design',        level: 0.18, domain: 'technical'   },
  { name: 'Multimodal ML',            level: 0.31, domain: 'technical'   },
];

function ReadinessBar({ value }: { value: number }) {
  const color = value >= 75 ? 'var(--color-forest)' : value >= 50 ? 'var(--color-ochre)' : 'var(--color-sienna)';
  return (
    <div className="h-1.5 w-full bg-[var(--color-stone)] rounded-full overflow-hidden">
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: color }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
      />
    </div>
  );
}

export default function OrgHeatmap() {
  const [teams, setTeams] = useState<TeamReadiness[]>(FALLBACK_TEAMS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    fetch(`${apiUrl}/org/readiness`)
      .then(res => res.json())
      .then(data => {
        if (data.teams?.length > 0) setTeams(data.teams);
      })
      .catch(() => { /* use fallback */ })
      .finally(() => setLoading(false));
  }, []);

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
        {/* Team Readiness — from /org/readiness */}
        <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6">
          <h2 className="text-lg font-medium text-[var(--color-obsidian)] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Team Readiness
          </h2>
          {loading ? (
            <div className="space-y-5 animate-pulse">
              {[1,2,3,4,5].map(i => (
                <div key={i} className="space-y-2">
                  <div className="h-3 bg-[var(--color-stone)] rounded w-1/2" />
                  <div className="h-1.5 bg-[var(--color-stone)] rounded-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-5">
              {teams.map((team, i) => (
                <motion.div
                  key={team.team}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="space-y-2"
                >
                  <div className="flex justify-between items-end text-sm">
                    <div>
                      <span className="font-medium text-[var(--color-primary)]">{team.team}</span>
                      <span className="text-[var(--color-muted)] ml-2 text-xs">{team.memberCount} members</span>
                    </div>
                    <span className="font-mono text-xs text-[var(--color-muted)]">{team.readinessScore}%</span>
                  </div>
                  <ReadinessBar value={team.readinessScore} />
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Capability Depth — static from CapabilityModeller output */}
        <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6">
          <h2 className="text-lg font-medium text-[var(--color-obsidian)] mb-6" style={{ fontFamily: 'Georgia, serif' }}>
            Capability Depth
          </h2>
          <div className="space-y-5">
            {FALLBACK_CAPABILITIES.map((cap, i) => (
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
