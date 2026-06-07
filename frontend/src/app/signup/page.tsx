'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertCircle, CheckCircle2, ArrowRight, Eye, EyeOff } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/lib/api';

export default function SignupPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const data = await api.post<{ token: string; user: { id: number; name: string; email: string; company: string } }>(
        '/auth/signup',
        { name, company, email, password },
        { skipAuth: true }
      );
      localStorage.setItem('nexus-token', data.token);
      localStorage.setItem('nexus-user', JSON.stringify(data.user));
      setSuccess(true);
      setTimeout(() => router.replace('/dashboard'), 1500);
    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
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
          <div className="flex justify-center mb-6">
            <Image src="/logo.png" alt="Nexus Logo" width={48} height={48} className="rounded-xl shadow-sm border border-[var(--color-border)]" />
          </div>
          
          <div className="text-center mb-8">
            <h1 className="text-2xl tracking-tight text-[var(--color-obsidian)] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
              Request Access
            </h1>
            <p className="text-sm text-[var(--color-secondary)]">
              Provision a new Nexus workspace
            </p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="mb-6 p-3 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-sm text-red-600 dark:text-red-400">
                <AlertCircle size={16} className="flex-shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {success && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mb-6 p-3 bg-green-500/10 border border-green-500/20 rounded-md flex items-center gap-2 text-sm text-green-700 dark:text-green-400">
                <CheckCircle2 size={16} className="flex-shrink-0" />
                <span>Workspace provisioned! Redirecting...</span>
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSignup} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-[var(--color-secondary)] mb-1.5 uppercase tracking-wide">Full Name</label>
                <input 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  disabled={isLoading || success}
                  className="w-full bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm text-[var(--color-obsidian)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)] focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="Jane Doe"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-[var(--color-secondary)] mb-1.5 uppercase tracking-wide">Company</label>
                <input 
                  type="text" 
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  required
                  disabled={isLoading || success}
                  className="w-full bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm text-[var(--color-obsidian)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)] focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="Acme Corp"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[var(--color-secondary)] mb-1.5 uppercase tracking-wide">Work Email</label>
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={isLoading || success}
                className="w-full bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-lg px-4 py-3 text-sm text-[var(--color-obsidian)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)] focus:border-transparent transition-all disabled:opacity-50"
                placeholder="name@company.com"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-[var(--color-secondary)] mb-1.5 uppercase tracking-wide">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  disabled={isLoading || success}
                  minLength={6}
                  className="w-full bg-[var(--color-parchment)] border border-[var(--color-border)] rounded-lg px-4 py-3 pr-12 text-sm text-[var(--color-obsidian)] focus:outline-none focus:ring-2 focus:ring-[var(--color-sienna)] focus:border-transparent transition-all disabled:opacity-50"
                  placeholder="••••••••"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--color-muted)] hover:text-[var(--color-secondary)] transition-colors">
                  {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--color-obsidian)] hover:bg-black text-[var(--color-parchment)] rounded-lg text-sm font-medium transition-colors disabled:opacity-80 disabled:cursor-not-allowed mt-4 group"
            >
              {isLoading && !success ? (
                <div className="w-5 h-5 border-2 border-[var(--color-parchment)]/30 border-t-[var(--color-parchment)] rounded-full animate-spin" />
              ) : success ? (
                <CheckCircle2 size={18} />
              ) : (
                <>
                  Create Workspace
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-6 text-center text-xs text-[var(--color-secondary)]">
            By creating an account, you agree to our <a href="#" className="underline hover:text-[var(--color-obsidian)]">Terms of Service</a> and <a href="#" className="underline hover:text-[var(--color-obsidian)]">Privacy Policy</a>.
          </p>
        </div>
        
        <div className="bg-[var(--color-parchment)] border-t border-[var(--color-border)] p-4 text-center">
          <p className="text-sm text-[var(--color-secondary)]">
            Already have an account? <Link href="/login" className="text-[var(--color-sienna)] font-medium hover:underline">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </main>
  );
}
