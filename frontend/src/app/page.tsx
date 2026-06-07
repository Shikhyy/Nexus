'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Dynamic import to avoid SSR issues with WebGL
const OrbScene = dynamic(
  () => import('@/components/3d/OrbScene').then(m => ({ default: m.OrbScene })),
  { ssr: false }
);

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-parchment)] relative overflow-hidden">
      
      {/* 3D WebGL Orb Background */}
      <OrbScene />
      
      {/* Hero Content */}
      <div className="z-10 text-center space-y-6 max-w-3xl relative px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-muted)] mb-6">
            Microsoft Build AI 2026
          </p>
          <h1 className="text-7xl md:text-9xl tracking-tight text-[var(--color-obsidian)]" style={{ fontFamily: 'Georgia, serif' }}>
            NEXUS
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-secondary)] font-light leading-relaxed mt-4">
            The Human-AI Co-Evolution Engine
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-base text-[var(--color-secondary)] max-w-xl mx-auto leading-relaxed"
        >
          Continuously maps, analyzes, and closes the gap between your workforce capabilities 
          and the accelerating demands of the AI market.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          className="pt-6 flex gap-4 justify-center"
        >
          <Link
            href="/dashboard"
            className="px-8 py-4 bg-[var(--color-obsidian)] text-[var(--color-parchment)] rounded-full text-sm font-medium tracking-wide hover:scale-105 hover:bg-black transition-all duration-300"
          >
            Enter NEXUS
          </Link>
          <Link
            href="/signals"
            className="px-8 py-4 border border-[var(--color-border)] text-[var(--color-primary)] rounded-full text-sm font-medium tracking-wide hover:bg-[var(--color-linen)] transition-all duration-300"
          >
            View Signals
          </Link>
        </motion.div>
      </div>

      {/* Bottom Status Bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2, delay: 0.6 }}
        className="absolute bottom-12 flex gap-12 text-[11px] text-[var(--color-muted)] uppercase tracking-[0.2em] font-mono z-10"
      >
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-forest)] animate-pulse" />
          Signal Engine Active
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-prussian)] animate-pulse" />
          Capability Mapping Running
        </div>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[var(--color-sienna)] animate-pulse" />
          4 Agents Active
        </div>
      </motion.div>
      
    </main>
  );
}
