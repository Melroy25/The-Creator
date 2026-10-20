import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { GlassCard } from '@/components/shared/GlassCard';
import { Zap, ArrowRight, ShieldCheck, Cpu, Network, Check, Calendar, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas text-text-primary relative overflow-hidden flex flex-col justify-between font-body">
      {/* Top Header */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-text-primary flex items-center justify-center shadow-sm">
            <Zap className="w-5 h-5 text-accent fill-accent" />
          </div>
          <span className="font-headline font-bold text-lg tracking-tight uppercase text-text-primary">Creator Flow</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dev/components" className="text-xs font-mono font-semibold text-text-secondary hover:text-text-primary transition-colors">
            Component Test Bench
          </Link>
          <Link href="/login">
            <SecondaryButton size="sm">Sign In</SecondaryButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-5xl mx-auto px-6 py-12 text-center space-y-12 my-auto">
        <div className="space-y-6 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface border border-border shadow-card text-accent-strong text-xs font-mono font-semibold">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>CODE MEET 2026 // Problem Statement 4</span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-bold tracking-tight text-text-primary leading-[1.08]">
            Create More. <br />
            <span className="text-accent-strong">Manage Less. Stay Ahead.</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto font-normal leading-relaxed">
            One workspace for a creator’s brand deals, deadlines and money, with a schedule that fixes itself when plans change. Powered by a deterministic engine.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
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
        </div>

        {/* Floating Dashboard Preview Card over Gradient Glow */}
        <div className="relative pt-6">
          <div className="relative mx-auto max-w-4xl bg-surface border border-border rounded-3xl shadow-drawer p-6 sm:p-8 text-left space-y-6">
            <div className="flex items-center justify-between border-b border-border pb-4">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-status-overdue-dot" />
                <span className="w-3 h-3 rounded-full bg-status-risk-dot" />
                <span className="w-3 h-3 rounded-full bg-status-done-dot" />
                <span className="text-xs font-mono font-semibold text-text-tertiary ml-2">apexmedia.studio / dashboard</span>
              </div>
              <span className="text-[10px] font-mono bg-accent-tint text-accent-strong px-2.5 py-0.5 rounded-full border border-accent/20 font-bold">
                LIVE DEMO PREVIEW
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 rounded-xl bg-surface-inset border border-border space-y-1">
                <span className="text-xs font-mono uppercase text-text-secondary">Due Today</span>
                <p className="text-3xl font-headline font-bold text-text-primary">3</p>
                <span className="text-[11px] text-text-tertiary">2 script reviews, 1 invoice</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-inset border border-border space-y-1">
                <span className="text-xs font-mono uppercase text-text-secondary">Overdue</span>
                <p className="text-3xl font-headline font-bold text-status-overdue-text">1</p>
                <span className="text-[11px] text-text-tertiary">Pixel & Co script approval</span>
              </div>
              <div className="p-4 rounded-xl bg-surface-inset border border-border space-y-1">
                <span className="text-xs font-mono uppercase text-text-secondary">At Risk</span>
                <p className="text-3xl font-headline font-bold text-status-risk-text">2</p>
                <span className="text-[11px] text-text-tertiary">Editor schedule overlap</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3-Step Strip: Add a deal, See the impact, Approve */}
        <div className="pt-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-2">
              <div className="w-8 h-8 rounded-full bg-accent-tint text-accent-strong flex items-center justify-center font-mono font-bold text-xs border border-accent/20">
                1
              </div>
              <h3 className="text-base font-headline font-bold text-text-primary">Add a Deal</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">
                Upload a brand brief or paste contract terms. Deliverable milestones and dependencies are automatically structured.
              </p>
            </GlassCard>

            <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-2">
              <div className="w-8 h-8 rounded-full bg-accent-tint text-accent-strong flex items-center justify-center font-mono font-bold text-xs border border-accent/20">
                2
              </div>
              <h3 className="text-base font-headline font-bold text-text-primary">See the Impact</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">
                When a sponsor shifts a deadline or approval delays occur, the engine recalculates all downstream tasks deterministically.
              </p>
            </GlassCard>

            <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-2">
              <div className="w-8 h-8 rounded-full bg-accent-tint text-accent-strong flex items-center justify-center font-mono font-bold text-xs border border-accent/20">
                3
              </div>
              <h3 className="text-base font-headline font-bold text-text-primary">Approve with Confidence</h3>
              <p className="text-xs text-text-secondary leading-relaxed font-normal">
                Review the proposed timeline diff and plain-English reasons. Changes are only applied when you click Approve.
              </p>
            </GlassCard>
          </div>
        </div>

        {/* Differentiator Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 text-left">
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 shadow-card">
            <div className="w-9 h-9 rounded-xl bg-accent-tint text-accent-strong flex items-center justify-center mb-3 border border-accent/20">
              <Network className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-headline font-bold text-text-primary">Dependency-Aware Adaptation</h4>
            <p className="text-xs text-text-secondary leading-relaxed font-normal">
              Directed acyclic graph scheduling automatically prevents silent deadline misses and resource over-allocation.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 shadow-card">
            <div className="w-9 h-9 rounded-xl bg-status-done-bg text-status-done-text flex items-center justify-center mb-3 border border-status-done-border">
              <Cpu className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-headline font-bold text-text-primary">What-If Simulation Engine</h4>
            <p className="text-xs text-text-secondary leading-relaxed font-normal">
              Test disruptions and parallel schedule tracks safely in sandbox mode without mutating live contract records.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-surface border border-border space-y-2 shadow-card">
            <div className="w-9 h-9 rounded-xl bg-accent-tint text-accent-strong flex items-center justify-center mb-3 border border-accent/20">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h4 className="text-sm font-headline font-bold text-text-primary">Honest AI & Money</h4>
            <p className="text-xs text-text-secondary leading-relaxed font-normal">
              Every value is explicitly tagged as Confirmed, Assumption, or Calculated. Unpaid invoices are never counted as received.
            </p>
          </div>
        </div>

        {/* Final CTA */}
        <div className="pt-8 pb-4">
          <div className="p-8 rounded-3xl bg-surface border border-border shadow-card flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="space-y-1">
              <h3 className="font-headline font-bold text-xl text-text-primary">Ready to run your studio on autopilot?</h3>
              <p className="text-xs sm:text-sm text-text-secondary">Jump directly into Marcus Vance’s demo workspace with pre-seeded brand deals.</p>
            </div>
            <Link href="/login">
              <PrimaryButton size="md" icon={<ArrowRight className="w-4 h-4" />}>
                Continue with Demo Account
              </PrimaryButton>
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-border py-6 text-center text-xs text-text-tertiary font-mono">
        Creator Flow © 2026 • Code Meet Hackathon (Problem Statement 4: Creator Economy Tech)
      </footer>
    </div>
  );
}
