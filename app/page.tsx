import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { Zap, ArrowRight, ShieldCheck, Cpu, Network } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F0F2F8] text-[#1E2337] relative overflow-hidden flex flex-col justify-between font-body selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-indigo-500/10 via-violet-500/10 to-transparent rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#94A3B8_1px,transparent_1px)] [background-size:28px_28px] opacity-25" />
      </div>

      {/* Nav */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 to-violet-600 flex items-center justify-center shadow-md shadow-indigo-500/25">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-headline font-bold text-lg tracking-tight uppercase text-[#1E2337]">Creator Flow</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dev/components" className="text-xs font-mono font-semibold text-[#64748B] hover:text-[#1E2337] transition-colors">
            Dev Test Bench
          </Link>
          <Link href="/login">
            <SecondaryButton size="sm">Sign In</SecondaryButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-indigo-600 text-xs font-mono font-semibold">
          <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
          <span>CODE MEET 2026 // Problem Statement 4</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-extrabold tracking-tight text-[#1E2337]">
            Create More. <br />
            <span className="gradient-text">Manage Less. Stay Ahead.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#64748B] max-w-2xl mx-auto font-normal leading-relaxed">
            One workspace for a creator’s brand deals, deadlines and money, with a schedule that fixes itself when plans change. Pure TypeScript deterministic engine.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <Link href="/dashboard">
            <PrimaryButton size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              View Demo Workspace
            </PrimaryButton>
          </Link>
          <Link href="/simulator">
            <SecondaryButton size="lg" icon={<Cpu className="w-5 h-5" />}>
              Try What-If Simulator
            </SecondaryButton>
          </Link>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="silk-card p-6 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 border border-indigo-100">
              <Network className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-headline font-bold text-[#1E2337]">Dependency-Aware Adaptation</h2>
            <p className="text-xs text-[#64748B] leading-relaxed font-medium">
              Pure TypeScript engine detects collateral conflicts and recalculates feasible schedules deterministically.
            </p>
          </div>

          <div className="silk-card p-6 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3 border border-indigo-100">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-headline font-bold text-[#1E2337]">What-If Simulation</h2>
            <p className="text-xs text-[#64748B] leading-relaxed font-medium">
              Test disruptions, compare parallel before/after tracks, and rebalance workloads with one click.
            </p>
          </div>

          <div className="silk-card p-6 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-violet-50 text-violet-600 flex items-center justify-center mb-3 border border-violet-100">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-headline font-bold text-[#1E2337]">Honest AI & Money</h2>
            <p className="text-xs text-[#64748B] leading-relaxed font-medium">
              Explicit data provenance tags. AI only parses and drafts; it never calculates dates or finances.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#E2E6F0] py-6 text-center text-xs text-[#94A3B8] font-mono">
        Creator Flow © 2026 • Code Meet Hackathon
      </footer>
    </div>
  );
}
