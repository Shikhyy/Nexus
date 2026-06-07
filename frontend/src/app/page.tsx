'use client';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { motion } from 'framer-motion';

// Dynamic imports to avoid SSR issues with WebGL
const OrbScene = dynamic(() => import('@/components/3d/OrbScene').then(m => ({ default: m.OrbScene })), { ssr: false });
const SignalNetwork = dynamic(() => import('@/components/3d/SignalNetwork').then(m => ({ default: m.SignalNetwork })), { ssr: false });
const CapabilityGraph = dynamic(() => import('@/components/3d/CapabilityGraph').then(m => ({ default: m.CapabilityGraph })), { ssr: false });
const TalentConnection = dynamic(() => import('@/components/3d/TalentConnection').then(m => ({ default: m.TalentConnection })), { ssr: false });

export default function Home() {
  return (
    <main className="bg-[var(--color-parchment)] text-[var(--color-obsidian)] overflow-x-hidden">
      
      {/* SECTION 1: HERO */}
      <section className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
        <OrbScene />
        
        <div className="z-10 text-center space-y-6 max-w-3xl relative px-8 pointer-events-none">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--color-muted)] mb-6">
              Microsoft Build AI 2026
            </p>
            <h1 className="text-7xl md:text-9xl tracking-tight" style={{ fontFamily: 'Georgia, serif' }}>
              NEXUS
            </h1>
            <p className="text-xl md:text-2xl text-[var(--color-secondary)] font-light leading-relaxed mt-4">
              The Human-AI Co-Evolution Engine
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="pt-6 flex gap-4 justify-center pointer-events-auto"
          >
            <Link
              href="/dashboard"
              className="px-8 py-4 bg-[var(--color-obsidian)] text-[var(--color-parchment)] rounded-full text-sm font-medium tracking-wide hover:scale-105 hover:bg-black transition-all duration-300 shadow-xl"
            >
              Enter NEXUS
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[var(--color-secondary)]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          <span className="text-[10px] uppercase tracking-widest font-mono">Discover Architecture</span>
          <div className="w-px h-12 bg-gradient-to-b from-[var(--color-secondary)] to-transparent" />
        </motion.div>
      </section>

      {/* SECTION 2: SIGNAL FUSER */}
      <section className="relative h-screen flex items-center px-8 md:px-24 border-t border-[var(--color-border)]">
        <SignalNetwork />
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-xl bg-[var(--color-parchment)]/80 backdrop-blur-md p-8 rounded-2xl border border-[var(--color-border)]"
        >
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>1. The Signal Fuser</h2>
          <p className="text-[var(--color-secondary)] leading-relaxed mb-6">
            Powered by Azure OpenAI embeddings, the Signal Fuser constantly scans the global market—GitHub releases, arXiv papers, and tech blogs. It aggregates this noise into a clean, actionable <strong>Demand Vector</strong> representing the skills your company needs tomorrow.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--color-sienna)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-sienna)] animate-pulse" />
            Azure AI Search Active
          </div>
        </motion.div>
      </section>

      {/* SECTION 3: CAPABILITY MODELLER */}
      <section className="relative h-screen flex items-center justify-end px-8 md:px-24 border-t border-[var(--color-border)] bg-[var(--color-linen)]">
        <CapabilityGraph />
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-xl bg-[var(--color-parchment)]/80 backdrop-blur-md p-8 rounded-2xl border border-[var(--color-border)]"
        >
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>2. The Capability Modeller</h2>
          <p className="text-[var(--color-secondary)] leading-relaxed mb-6">
            Integrating directly with the <strong>Microsoft 365 Graph API</strong>, the Modeller autonomously analyzes Teams messages, calendar schedules, and SharePoint documents. It builds a hyper-accurate, real-time map of your organization's latent skills without requiring manual employee surveys.
          </p>
          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[var(--color-forest)]">
            <span className="w-2 h-2 rounded-full bg-[var(--color-forest)] animate-pulse" />
            MS Graph Connected
          </div>
        </motion.div>
      </section>

      {/* SECTION 4: TALent BROKER */}
      <section className="relative h-screen flex items-center px-8 md:px-24 border-t border-[var(--color-border)]">
        <TalentConnection />
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-20%" }}
          transition={{ duration: 0.8 }}
          className="z-10 max-w-xl bg-[var(--color-parchment)]/80 backdrop-blur-md p-8 rounded-2xl border border-[var(--color-border)]"
        >
          <h2 className="text-4xl mb-4" style={{ fontFamily: 'Georgia, serif' }}>3. The AI Talent Broker</h2>
          <p className="text-[var(--color-secondary)] leading-relaxed mb-6">
            When the Gap Analyser detects a critical shortfall between market demand and internal capability, the Talent Broker takes action. Using Semantic Kernel memory, it auto-assembles strike teams and schedules 1:1 mentorship sessions via MS Graph—drastically reducing external hiring costs.
          </p>
          <Link
            href="/routing"
            className="inline-flex px-6 py-3 bg-[var(--color-obsidian)] text-[var(--color-parchment)] rounded-full text-sm font-medium tracking-wide hover:bg-black transition-colors"
          >
            View Talent Routing UI
          </Link>
        </motion.div>
      </section>
      
    </main>
  );
}
