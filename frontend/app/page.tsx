export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-24 bg-[var(--color-parchment)] relative overflow-hidden">
      
      {/* Abstract particle orb placeholder */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[var(--color-obsidian)] rounded-full blur-[100px] opacity-10"></div>
      
      <div className="z-10 text-center space-y-6 max-w-2xl">
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
      
      <div className="absolute bottom-12 flex gap-12 text-sm text-[var(--color-muted)] uppercase tracking-widest font-mono">
        <div>Signal Engine Active</div>
        <div>Capability Mapping Running</div>
      </div>
      
    </main>
  );
}
