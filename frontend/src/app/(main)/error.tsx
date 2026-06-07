'use client';

import { useEffect } from 'react';
import { AlertTriangle, RefreshCcw } from 'lucide-react';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service like Crashlytics
    console.error("NEXUS Dashboard Error:", error);
  }, [error]);

  return (
    <div className="h-full flex flex-col items-center justify-center p-8 text-center bg-[var(--color-parchment)] rounded-xl border border-[var(--color-border)]">
      <div className="w-16 h-16 bg-[var(--color-sienna-surface)] text-[var(--color-sienna)] rounded-full flex items-center justify-center mb-4">
        <AlertTriangle size={32} />
      </div>
      <h2 className="text-2xl font-medium text-[var(--color-obsidian)] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
        Agent Connection Lost
      </h2>
      <p className="text-[var(--color-secondary)] max-w-md mb-6">
        The application encountered an unexpected error while communicating with the AI services. 
        Please verify your API keys and try again.
      </p>
      <button
        onClick={() => reset()}
        className="flex items-center gap-2 px-6 py-3 bg-[var(--color-obsidian)] text-[var(--color-parchment)] rounded-full text-sm hover:bg-black transition-colors shadow-lg"
      >
        <RefreshCcw size={16} />
        Retry Connection
      </button>
    </div>
  );
}
