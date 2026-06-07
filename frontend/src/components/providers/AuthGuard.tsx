'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * AuthGuard — wraps protected pages and redirects to /login if no valid JWT is found.
 * Usage: Wrap the (main) layout with this component.
 */
export function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('nexus-token');
    if (!token) {
      router.replace('/login');
    } else {
      setAuthorized(true);
    }
  }, [router]);

  if (!authorized) {
    return (
      <div className="min-h-screen bg-[var(--color-parchment)] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-2 border-[var(--color-border)] border-t-[var(--color-sienna)] rounded-full animate-spin" />
          <p className="text-xs font-mono text-[var(--color-muted)] uppercase tracking-widest">Authenticating…</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
