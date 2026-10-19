import Link from 'react';
import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { Zap, ArrowRight, ShieldCheck, Cpu, Network } from 'lucide-react';
import LinkComponent from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#090C15] text-[#F1F5F9] relative overflow-hidden flex flex-col justify-between">
      {/* Background ambient mesh */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-tr from-blue-600/15 via-indigo-500/15 to-violet-600/10 rounded-full blur-[160px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#1E2540_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
      </div>

      {/* Nav */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
            <Zap className="w-5 h-5 text-white fill-white" />
          </div>
          <span className="font-sans font-bold text-lg tracking-tight uppercase">Creator Flow</span>
        </div>

        <div className="flex items-center gap-4">
          <LinkComponent href="/dev/components" className="text-xs font-mono text-slate-400 hover:text-white transition-colors">
            Dev Test Bench
          </LinkComponent>
          <LinkComponent href="/login">
            <SecondaryButton size="sm">Sign In</SecondaryButton>
          </LinkComponent>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-20 text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/25 text-indigo-300 text-xs font-mono font-medium">
          <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
          <span>CODE MEET 2026 // Problem Statement 4</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight font-sans">
            Create More. <br />
            <span className="gradient-text">Manage Less. Stay Ahead.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto font-normal leading-relaxed">
            The AI-powered workflow intelligence system for digital creators. When deadlines shift or approvals stall, our deterministic engine recalculates your schedule before bottlenecks happen.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
          <LinkComponent href="/dashboard">
            <PrimaryButton size="lg" icon={<ArrowRight className="w-5 h-5" />}>
              View Demo Workspace
            </PrimaryButton>
          </LinkComponent>
          <LinkComponent href="/simulator">
            <SecondaryButton size="lg" icon={<Cpu className="w-5 h-5" />}>
              Try What-If Simulator
            </SecondaryButton>
          </LinkComponent>
        </div>

        {/* Feature Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-16 text-left">
          <div className="glass-card p-6 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-400 flex items-center justify-center mb-3">
              <Network className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-white">Dependency-Aware Adaptation</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Pure TypeScript engine detects collateral conflicts and recalculates feasible schedules deterministically.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center mb-3">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-white">What-If Simulation</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Test disruptions, compare parallel before/after tracks, and rebalance workloads with one click.
            </p>
          </div>

          <div className="glass-card p-6 rounded-2xl space-y-2">
            <div className="w-8 h-8 rounded-lg bg-violet-500/10 text-violet-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-semibold text-white">Honest AI & Money</h2>
            <p className="text-xs text-slate-400 leading-relaxed">
              Explicit data provenance tags. AI only parses and drafts; it never calculates dates or finances.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.06] py-6 text-center text-xs text-slate-500 font-mono">
        Creator Flow © 2026 • Code Meet Hackathon
      </footer>
    </div>
  );
}
