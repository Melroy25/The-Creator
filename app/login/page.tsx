'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/shared/GlassCard';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { Zap, Mail, ArrowRight, UserCheck } from 'lucide-react';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [demoLoading, setDemoLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setMessage(null);

    try {
      // Set demo cookie for immediate judging entry
      document.cookie = 'creator_flow_demo=true; path=/; max-age=86400';
      router.push('/dashboard');
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : 'Error signing in';
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoSignIn = () => {
    setDemoLoading(true);
    // Instant 1-click bypass for hackathon judges
    document.cookie = 'creator_flow_demo=true; path=/; max-age=86400';
    setTimeout(() => {
      router.push('/dashboard');
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#090C15] text-[#F1F5F9] flex flex-col items-center justify-center p-4 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/15 rounded-full blur-[140px]" />
      </div>

      <div className="relative z-10 w-full max-w-md space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <Zap className="w-5 h-5 text-white fill-white" />
            </div>
            <span className="font-sans font-bold text-xl tracking-tight text-white uppercase">
              Creator Flow
            </span>
          </Link>
          <p className="text-sm text-slate-400">Sign in to your creator command center</p>
        </div>

        {/* Auth Card */}
        <GlassCard className="p-8 rounded-2xl space-y-6">
          {/* Quick Demo Access (1-Click for Judges) */}
          <div className="p-4 rounded-xl bg-indigo-500/10 border border-indigo-500/30 space-y-3">
            <div className="flex items-center gap-2 text-indigo-300 font-semibold text-xs">
              <UserCheck className="w-4 h-4 text-indigo-400" />
              <span>Hackathon Judge Quick-Start</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Enter the pre-seeded Marcus Vance scenario (3 brand deals, overdue approvals, editor overlaps) with one click.
            </p>
            <PrimaryButton
              type="button"
              onClick={handleDemoSignIn}
              loading={demoLoading}
              className="w-full"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue with Demo Account
            </PrimaryButton>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-white/10 w-full" />
            <span className="bg-[#0F1424] px-3 text-[11px] font-mono text-slate-500 uppercase tracking-wider relative">
              Or with email
            </span>
          </div>

          {/* Email Sign In */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-mono uppercase tracking-wider text-slate-400">
                Email Address
              </label>
              <div className="relative flex items-center glass-inset px-3.5 py-2.5">
                <Mail className="w-4 h-4 text-slate-500 mr-2.5" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@apexstudio.io"
                  className="bg-transparent text-sm text-white placeholder-slate-500 focus:outline-none w-full"
                />
              </div>
            </div>

            {message && (
              <p className="text-xs text-rose-400 font-medium">{message}</p>
            )}

            <SecondaryButton
              type="submit"
              disabled={loading}
              loading={loading}
              className="w-full"
            >
              Send Magic Link
            </SecondaryButton>
          </form>
        </GlassCard>

        {/* Back Link */}
        <div className="text-center">
          <Link href="/" className="text-xs font-mono text-slate-500 hover:text-slate-300 transition-colors">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
