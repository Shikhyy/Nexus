'use client';
import { OrbScene } from '@/components/3d/OrbScene';

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24 bg-[var(--color-parchment)] relative overflow-hidden">
      
      {/* 3D WebGL Orb */}
      <OrbScene />
      
      <div className="z-10 text-center space-y-6 max-w-2xl relative">
        <h1 className="text-6xl md:text-8xl tracking-tight text-[var(--color-obsidian)] font-serif">
          NEXUS
        </h1>
        <p className="text-xl md:text-2xl text-[var(--color-secondary)] font-light leading-relaxed">
          The Human-AI Co-Evolution Engine
        </p>
        
        <div className="pt-8">
          <button className="px-8 py-4 bg-[var(--color-obsidian)] text-[var(--color-parchment)] rounded-full text-lg font-medium hover:scale-105 transition-transform duration-300">
            Enter NEXUS
          </button>
        </div>
      </div>
      
      <div className="absolute bottom-12 flex gap-12 text-sm text-[var(--color-muted)] uppercase tracking-widest font-mono z-10">
        <div>Signal Engine Active</div>
        <div>Capability Mapping Running</div>
      </div>
      
    </main>
  );
}
