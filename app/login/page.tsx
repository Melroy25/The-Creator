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
    <div className="min-h-screen bg-[#FAF6EA] text-[#1F1F23] flex flex-col items-center justify-center p-4 relative overflow-hidden font-body selection:bg-[#FBEFC2] selection:text-[#875C05]">
      {/* Background ambient light washes */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#FDF2C7]/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#FBE6DC]/60 rounded-full blur-[120px]" />
      </div>

      <div className="w-full max-w-md relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-full bg-[#1F1F23] flex items-center justify-center shadow-sm">
              <Zap className="w-5 h-5 text-[#EDBE4B] fill-[#EDBE4B]" />
            </div>
            <span className="font-headline font-bold text-2xl tracking-tight uppercase text-[#1F1F23]">
              Creator Flow
            </span>
          </Link>
          <p className="text-sm text-[#6B6558] font-normal">
            Deterministic workflow intelligence for creators & studios
          </p>
        </div>

        {/* Auth Card */}
        <GlassCard className="p-8 space-y-6 rounded-2xl bg-[#FCFBF7]">
          {/* Hackathon Judge 1-Click Fast Pass */}
          <div className="p-4 rounded-xl bg-[#FBEFC2]/60 border border-[#F7E19D] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-[#875C05] flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" />
                Hackathon Fast Pass
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-white text-[#875C05] font-bold border border-[#F7E19D]">
                DEMO USER
              </span>
            </div>
            <p className="text-xs text-[#6B6558] leading-relaxed">
              Bypass email verification and jump directly into Marcus Vance’s demo workspace with pre-loaded mock deliverables and engine state.
            </p>
            <PrimaryButton
              type="button"
              onClick={handleDemoSignIn}
              loading={demoLoading}
              className="w-full text-xs"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Enter Marcus Vance Workspace
            </PrimaryButton>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#EDE6D3] w-full" />
            <span className="bg-[#FCFBF7] px-3 text-[11px] font-mono uppercase text-[#9A9384] absolute">
              or sign in with email
            </span>
          </div>

          {/* Magic Link Form */}
          <form onSubmit={handleEmailSignIn} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-[#6B6558] flex items-center justify-between">
                <span>Creator Email</span>
                <span className="text-[10px] text-[#9A9384] font-mono">Passwordless link</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="marcus@apexmedia.studio"
                  className="w-full bg-[#FAF6EA] border border-[#EDE6D3] rounded-full px-4 py-2.5 text-sm text-[#1F1F23] placeholder-[#9A9384] focus:outline-none focus:border-[#EDBE4B] focus:ring-2 focus:ring-[#EDBE4B]/30 transition-all font-medium"
                />
              </div>
            </div>

            {message && (
              <div className="p-3 rounded-xl text-xs bg-[#FDECDA] text-[#9C4221] border border-[#F8D2BA]">
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
          <Link href="/" className="text-xs text-[#9A9384] hover:text-[#1F1F23] transition-colors font-mono">
            ← Back to Homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
