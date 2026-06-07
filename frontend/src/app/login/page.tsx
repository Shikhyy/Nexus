'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { AlertCircle } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isSsoLoading, setIsSsoLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [email, setEmail] = useState('test@nexus.ai');
  const [password, setPassword] = useState('password');

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.detail || 'Invalid credentials');
      }

      const data = await res.json();
      localStorage.setItem('nexus-token', data.token);
      localStorage.setItem('nexus-user', JSON.stringify(data.user));
      
      router.push('/dashboard');
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  };

  const handleSsoLogin = () => {
    setIsSsoLoading(true);
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[var(--color-parchment)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-stone) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[var(--color-linen)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="p-8 sm:p-10">
          <div className="w-16 h-16 mx-auto mb-6 shadow-inner rounded-2xl overflow-hidden border border-[var(--color-border)]">
            <Image src="/logo.png" alt="Nexus Logo" width={64} height={64} className="object-cover" />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-3xl tracking-tight text-[var(--color-obsidian)] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Welcome back
            </h1>
            <p className="text-sm text-[var(--color-secondary)]">
              Sign in to your enterprise workspace
            </p>
          </div>

          {error && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
              <AlertCircle size={16} />
              {error}
            </motion.div>
          )}

          <form onSubmit={handleEmailLogin} className="space-y-4 mb-6">
            <div>
              <label className="block text-xs font-medium text-[var(--color-secondary)] mb-1.5 uppercase tracking-wide">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm text-[var(--color-obsidian)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)] focus:border-transparent transition-all"
                placeholder="name@company.com"
              />
            </div>
            
            <div>
              <div className="flex justify-between mb-1.5">
                <label className="block text-xs font-medium text-[var(--color-secondary)] uppercase tracking-wide">Password</label>
                <Link href="#" className="text-xs text-[var(--color-sienna)] hover:underline">Forgot?</Link>
              </div>
              <input 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm text-[var(--color-obsidian)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)] focus:border-transparent transition-all"
                placeholder="••••••••"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || isSsoLoading}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--color-obsidian)] hover:bg-black text-[var(--color-parchment)] rounded-lg text-sm font-medium transition-colors disabled:opacity-80 disabled:cursor-wait mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-[var(--color-parchment)]/30 border-t-[var(--color-parchment)] rounded-full animate-spin" />
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[var(--color-border)]"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[var(--color-linen)] text-[var(--color-muted)] uppercase tracking-widest">Or continue with</span>
            </div>
          </div>

          <button
            onClick={handleSsoLogin}
            type="button"
            disabled={isLoading || isSsoLoading}
            className="w-full flex items-center justify-center gap-3 py-3 border border-[#0078D4]/20 hover:border-[#0078D4]/50 bg-[#0078D4]/5 hover:bg-[#0078D4]/10 text-[#0078D4] dark:text-[#3399FF] rounded-lg text-sm font-medium transition-colors disabled:opacity-80 disabled:cursor-wait"
          >
            {isSsoLoading ? (
              <div className="w-5 h-5 border-2 border-current/30 border-t-current rounded-full animate-spin" />
            ) : (
              <>
                <svg viewBox="0 0 21 21" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0H0V10H10V0Z" />
                  <path d="M21 0H11V10H21V0Z" />
                  <path d="M10 11H0V21H10V11Z" />
                  <path d="M21 11H11V21H21V11Z" />
                </svg>
                Microsoft Entra ID
              </>
            )}
          </button>
        </div>
        
        <div className="bg-[var(--color-parchment)] border-t border-[var(--color-border)] p-4 text-center">
          <p className="text-sm text-[var(--color-secondary)]">
            Don&apos;t have an account? <Link href="/signup" className="text-[var(--color-sienna)] font-medium hover:underline">Request access</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
