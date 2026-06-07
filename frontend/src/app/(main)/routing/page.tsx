'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { UserPlus, Sparkles, Check } from 'lucide-react';
import { api } from '@/lib/api';

interface Mentorship {
  id: string;
  mentor: string;
  mentorRole: string;
  mentee: string;
  menteeRole: string;
  topic: string;
  status: string;
  matchScore: number;
}

interface StrikeTeam {
  id: string;
  objective: string;
  teamName: string;
  readinessScore: number;
  members: { name: string; role: string; reason: string }[];
}

export default function TalentRoutingPage() {
  const [mentorships, setMentorships] = useState<Mentorship[]>([]);
  const [teams, setTeams] = useState<StrikeTeam[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get<{ mentorships: Mentorship[] }>('/routing/mentorships'),
      api.get<{ teams: StrikeTeam[] }>('/routing/teams')
    ]).then(([mentorData, teamData]) => {
      if (mentorData.mentorships) setMentorships(mentorData.mentorships);
      if (teamData.teams) setTeams(teamData.teams);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  return (
    <div className="flex flex-col gap-8 h-full">
      <motion.header
        className="mb-2"
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-3">
          <h1 className="text-3xl text-[var(--color-obsidian)] tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
            AI Talent Routing
          </h1>
          <span className="text-[10px] font-mono text-[var(--color-sienna)] bg-[var(--color-sienna-surface)] px-2 py-0.5 rounded uppercase tracking-wider">
            Semantic Kernel Match
          </span>
        </div>
        <p className="text-[var(--color-secondary)] text-sm mt-1">
          Auto-assemble cross-functional project teams and mentorship pairs based on M365 activity graph.
        </p>
      </motion.header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 flex-1">
        {/* Teams Section */}
        <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6 flex flex-col h-full">
          <h2 className="text-lg font-medium text-[var(--color-obsidian)] mb-6 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <Sparkles size={16} className="text-[var(--color-forest)]" /> Auto-Assembled Strike Teams
          </h2>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-32 bg-[var(--color-stone)] rounded-lg w-full" />
            </div>
          ) : teams.map(team => (
            <motion.div key={team.id} className="border border-[var(--color-border)] bg-[var(--color-parchment)] p-5 rounded-lg">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-medium text-[var(--color-primary)]">{team.teamName}</h3>
                  <p className="text-xs text-[var(--color-secondary)] mt-0.5">Objective: {team.objective}</p>
                </div>
                <div className="text-[10px] font-mono text-[var(--color-forest)] bg-[var(--color-forest-surface)] px-2 py-1 rounded">
                  Readiness: {team.readinessScore}%
                </div>
              </div>
              <div className="space-y-3">
                {team.members.map((member, idx) => (
                  <div key={idx} className="bg-[var(--color-linen)] p-3 rounded border border-[var(--color-stone)]">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium text-[var(--color-obsidian)]">{member.name}</span>
                      <span className="text-xs text-[var(--color-muted)]">{member.role}</span>
                    </div>
                    <p className="text-[11px] text-[var(--color-secondary)]">{member.reason}</p>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full py-2 bg-[var(--color-obsidian)] text-[var(--color-parchment)] text-xs font-medium rounded hover:bg-black transition-colors flex justify-center items-center gap-2">
                <Check size={14} /> Approve & Provision Teams Channel
              </button>
            </motion.div>
          ))}
        </div>

        {/* Mentorship Section */}
        <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-lg p-6 flex flex-col h-full">
          <h2 className="text-lg font-medium text-[var(--color-obsidian)] mb-6 flex items-center gap-2" style={{ fontFamily: 'Georgia, serif' }}>
            <UserPlus size={16} className="text-[var(--color-sienna)]" /> Mentorship Pairings
          </h2>
          {loading ? (
            <div className="animate-pulse space-y-4">
              <div className="h-24 bg-[var(--color-stone)] rounded-lg w-full" />
              <div className="h-24 bg-[var(--color-stone)] rounded-lg w-full" />
            </div>
          ) : (
            <div className="space-y-4">
              {mentorships.map(match => (
                <motion.div key={match.id} className="border border-[var(--color-border)] bg-[var(--color-parchment)] p-4 rounded-lg flex gap-4">
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs font-mono uppercase text-[var(--color-sienna)] tracking-wider">
                        Gap: {match.topic}
                      </span>
                      <span className="text-[10px] bg-[var(--color-stone)] px-2 py-0.5 rounded text-[var(--color-secondary)]">
                        {match.matchScore}% Match
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-sm mt-3">
                      <div className="flex-1">
                        <p className="font-medium text-[var(--color-obsidian)]">{match.mentor}</p>
                        <p className="text-xs text-[var(--color-muted)]">{match.mentorRole}</p>
                      </div>
                      <div className="w-px h-8 bg-[var(--color-border)] mx-2" />
                      <div className="flex-1">
                        <p className="font-medium text-[var(--color-obsidian)]">{match.mentee}</p>
                        <p className="text-xs text-[var(--color-muted)]">{match.menteeRole}</p>
                      </div>
                    </div>
                    <button className="mt-4 w-full py-1.5 border border-[var(--color-border)] text-[var(--color-primary)] text-xs font-medium rounded hover:bg-[var(--color-stone)] transition-colors">
                      Schedule 1:1 via MS Graph
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
