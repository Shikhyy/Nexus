'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle, Eye, EyeOff, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await api.post<{ token: string; user: { id: number; name: string; email: string; company: string } }>(
        '/auth/login',
        { email, password },
        { skipAuth: true }
      );
      localStorage.setItem('nexus-token', data.token);
      localStorage.setItem('nexus-user', JSON.stringify(data.user));
      router.replace('/dashboard');
    } catch (err) {
      setError((err as Error).message || 'Invalid credentials');
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[var(--color-parchment)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background grid pattern */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(circle, var(--color-stone) 1px, transparent 1px)',
          backgroundSize: '24px 24px',
          opacity: 0.6
        }}
      />
      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-[var(--color-sienna)] rounded-full blur-[120px] opacity-[0.06] pointer-events-none" />
      <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-[var(--color-prussian)] rounded-full blur-[140px] opacity-[0.05] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-sm z-10"
      >
        {/* Card */}
        <div className="bg-[var(--color-linen)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden">
          <div className="p-8">
            {/* Logo + Brand */}
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl overflow-hidden border border-[var(--color-border)] shadow-sm shrink-0">
                <Image src="/logo.png" alt="Nexus Logo" width={40} height={40} className="object-cover" />
              </div>
              <div>
                <h2 className="text-base font-semibold text-[var(--color-obsidian)] tracking-tight">NEXUS</h2>
                <p className="text-[10px] font-mono text-[var(--color-muted)] uppercase tracking-widest">Human-AI Co-Evolution</p>
              </div>
            </div>

            <h1 className="text-2xl font-semibold text-[var(--color-obsidian)] tracking-tight mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-[var(--color-secondary)] mb-6">
              Sign in to your enterprise workspace
            </p>

            {/* Error */}
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mb-5 p-3 bg-red-500/8 border border-red-500/20 rounded-xl flex items-center gap-2 text-sm text-red-600"
              >
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </motion.div>
            )}

            <form onSubmit={handleEmailLogin} className="space-y-4">
              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-[var(--color-secondary)] mb-1.5 uppercase tracking-wide">
                  Work Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  className="w-full bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-xl px-4 py-3 text-sm text-[var(--color-obsidian)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/40 focus:border-[var(--color-sienna)] transition-all placeholder:text-[var(--color-muted)]"
                  placeholder="name@company.com"
                />
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between mb-1.5">
                  <label className="block text-xs font-semibold text-[var(--color-secondary)] uppercase tracking-wide">
                    Password
                  </label>
                  <Link href="#" className="text-xs text-[var(--color-sienna)] hover:underline font-medium">
                    Forgot?
                  </Link>
                </div>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    className="w-full bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-xl px-4 py-3 pr-12 text-sm text-[var(--color-obsidian)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)]/40 focus:border-[var(--color-sienna)] transition-all placeholder:text-[var(--color-muted)]"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-secondary)] transition-colors"
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--color-obsidian)] hover:bg-black text-[var(--color-parchment)] rounded-xl text-sm font-semibold transition-all disabled:opacity-60 disabled:cursor-wait mt-2 shadow-md hover:shadow-lg"
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={14} />
                  </>
                )}
              </button>
            </form>
          </div>

          <div className="bg-[var(--color-parchment)] border-t border-[var(--color-border)] px-8 py-4 text-center">
            <p className="text-sm text-[var(--color-secondary)]">
              No account?{' '}
              <Link href="/signup" className="text-[var(--color-sienna)] font-semibold hover:underline">
                Request access
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-[10px] text-[var(--color-muted)] mt-5 font-mono uppercase tracking-widest">
          Secured with JWT · Bcrypt hashing
        </p>
      </motion.div>
    </main>
  );
}
