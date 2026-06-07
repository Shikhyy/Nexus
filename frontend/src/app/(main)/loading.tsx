export default function Loading() {
  return (
    <div className="h-full flex flex-col items-center justify-center p-8 bg-[var(--color-parchment)] rounded-xl border border-[var(--color-border)] opacity-80">
      <div className="w-12 h-12 border-4 border-[var(--color-stone)] border-t-[var(--color-obsidian)] rounded-full animate-spin mb-4" />
      <p className="text-[11px] font-mono uppercase tracking-[0.2em] text-[var(--color-secondary)]">
        Synchronizing Agents...
      </p>
    </div>
  );
}
