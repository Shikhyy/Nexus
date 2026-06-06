'use client';
export default function OrgHeatmap() {
  return (
    <div className="flex flex-col gap-8 h-full">
      <header className="mb-4">
        <h1 className="text-3xl font-serif text-[var(--color-obsidian)] tracking-tight">Org Heatmap</h1>
        <p className="text-[var(--color-secondary)] mt-1">Cross-functional capability distribution across the enterprise.</p>
      </header>

      <div className="flex-1 bg-[var(--color-linen)] border-[0.5px] border-[var(--color-border)] rounded-lg p-8 flex items-center justify-center relative overflow-hidden">
        {/* Placeholder for complex D3/Canvas Heatmap */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-[var(--color-stone)] opacity-50 pointer-events-none" />
        
        <div className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto rounded-full border border-[var(--color-border)] bg-[var(--color-parchment)] flex items-center justify-center animate-pulse">
            <span className="w-8 h-8 rounded-full bg-[var(--color-prussian)] opacity-20" />
          </div>
          <p className="font-mono text-sm uppercase tracking-widest text-[var(--color-primary)]">Aggregating Team Signals</p>
          <p className="text-xs text-[var(--color-secondary)]">Awaiting Azure Cosmos DB sync</p>
        </div>
      </div>
    </div>
  );
}
