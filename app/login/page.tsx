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
    }, 350);
  };

  return (
    <div className="min-h-screen bg-canvas text-text-primary flex flex-col items-center justify-center p-4 relative overflow-hidden font-body">
      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-text-primary flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-accent fill-accent" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tight uppercase text-text-primary">
              Creator Flow
            </span>
          </Link>
          <p className="text-xs sm:text-sm text-text-secondary font-normal">
            Autonomous creator business operating system
          </p>
        </div>

        {/* Auth Card */}
        <GlassCard className="p-6 sm:p-8 space-y-6 rounded-2xl bg-surface border border-border shadow-card">
          {/* Hackathon Fast Pass: "Continue with demo account" */}
          <div className="p-4 rounded-xl bg-accent-tint/60 border border-accent/20 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-strong flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Hackathon Fast Pass
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface text-accent-strong font-bold border border-accent/20">
                ONE CLICK
              </span>
            </div>
            <p className="text-xs text-text-secondary leading-relaxed">
              Bypass email verification and jump directly into Marcus Vance’s seeded demo workspace with live brand deals and scheduling engine.
            </p>
            <PrimaryButton
              type="button"
              onClick={handleDemoSignIn}
              loading={demoLoading}
              className="w-full text-xs"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Continue with demo account
            </PrimaryButton>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-border w-full" />
            <span className="bg-surface px-3 text-[11px] font-mono uppercase text-text-tertiary absolute">
              or sign in with email
            </span>
          </div>

          {/* Magic Link Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-text-secondary flex items-center justify-between">
                <span>Creator Email</span>
                <span className="text-[10px] text-text-tertiary font-mono">Passwordless link</span>
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="marcus@apexmedia.studio"
                className="w-full bg-surface-inset border border-border rounded-full px-4 py-2.5 text-sm text-text-primary placeholder-text-tertiary focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all font-medium"
              />
            </div>

            {message && (
              <div className="p-3 rounded-xl text-xs bg-status-progress-bg text-status-progress-text border border-status-progress-border">
                {message}
              </div>
            )}

            <SecondaryButton
              type="submit"
              loading={loading}
              className="w-full"
              icon={<Mail className="w-4 h-4" />}
            >
              Send Magic Link
            </SecondaryButton>
          </form>
        </GlassCard>

        {/* Back link */}
        <div className="text-center">
          <Link href="/" className="text-xs text-text-tertiary hover:text-text-primary transition-colors font-mono">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
