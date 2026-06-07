'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Fingerprint } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    setIsLoading(true);
    // Simulate OAuth / Microsoft Entra ID latency
    setTimeout(() => {
      router.push('/dashboard');
    }, 1500);
  };

  return (
    <main className="min-h-screen bg-[var(--color-parchment)] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none opacity-20" 
           style={{ backgroundImage: 'radial-gradient(circle at 50% 50%, var(--color-stone) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-[var(--color-linen)] border border-[var(--color-border)] rounded-2xl shadow-2xl overflow-hidden relative z-10"
      >
        <div className="p-10 text-center">
          <div className="w-16 h-16 mx-auto mb-8 shadow-inner rounded-2xl overflow-hidden border border-[var(--color-border)]">
            <Image src="/logo.png" alt="Nexus Logo" width={64} height={64} className="object-cover" />
          </div>
          
          <h1 className="text-3xl tracking-tight text-[var(--color-obsidian)] mb-2" style={{ fontFamily: 'Georgia, serif' }}>
            Enter NEXUS
          </h1>
          <p className="text-sm text-[var(--color-secondary)] mb-10">
            Secure enterprise access via Microsoft Entra ID
          </p>

          <button
            onClick={handleLogin}
            disabled={isLoading}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-[#0078D4] hover:bg-[#006CBE] text-white rounded-lg font-medium transition-colors disabled:opacity-80 disabled:cursor-wait"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <svg viewBox="0 0 21 21" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0H0V10H10V0Z" />
                  <path d="M21 0H11V10H21V0Z" />
                  <path d="M10 11H0V21H10V11Z" />
                  <path d="M21 11H11V21H21V11Z" />
                </svg>
                Sign in with Microsoft
              </>
            )}
          </button>

          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-[var(--color-muted)] font-mono uppercase tracking-widest">
            <Fingerprint size={12} />
            SSO Enforced
          </div>
        </div>
      </motion.div>
    </main>
  );
}
