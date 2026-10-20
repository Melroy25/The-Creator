import { PrimaryButton } from '@/components/shared/PrimaryButton';
import { SecondaryButton } from '@/components/shared/SecondaryButton';
import { Zap, ArrowRight, ShieldCheck, Cpu, Network } from 'lucide-react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#FAF6EA] text-[#1F1F23] relative overflow-hidden flex flex-col justify-between font-body selection:bg-[#FBEFC2] selection:text-[#875C05]">
      {/* Background ambient light washes per spec */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#FDF2C7]/60 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-[550px] h-[550px] bg-[#FBE6DC]/60 rounded-full blur-[120px]" />
      </div>

      {/* Nav */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-[#1F1F23] flex items-center justify-center shadow-sm">
            <Zap className="w-5 h-5 text-[#EDBE4B] fill-[#EDBE4B]" />
          </div>
          <span className="font-headline font-bold text-lg tracking-tight uppercase text-[#1F1F23]">Creator Flow</span>
        </div>

        <div className="flex items-center gap-4">
          <Link href="/dev/components" className="text-xs font-mono font-semibold text-[#6B6558] hover:text-[#1F1F23] transition-colors">
            Dev Test Bench
          </Link>
          <Link href="/login">
            <SecondaryButton size="sm">Sign In</SecondaryButton>
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="relative z-10 max-w-4xl mx-auto px-6 py-16 text-center space-y-8 my-auto">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCFBF7] border border-[#EDE6D3] shadow-sm text-[#875C05] text-xs font-mono font-semibold">
          <span className="w-2 h-2 rounded-full bg-[#EDBE4B]" />
          <span>CODE MEET 2026 // Problem Statement 4</span>
        </div>

        <div className="space-y-4">
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-headline font-bold tracking-tight text-[#1F1F23]">
            Create More. <br />
            <span className="text-[#875C05]">Manage Less. Stay Ahead.</span>
          </h1>
          <p className="text-lg md:text-xl text-[#6B6558] max-w-2xl mx-auto font-normal leading-relaxed">
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
          <div className="studio-card p-6 rounded-2xl space-y-2 bg-[#FCFBF7]">
            <div className="w-9 h-9 rounded-xl bg-[#FBEFC2] text-[#875C05] flex items-center justify-center mb-3 border border-[#F7E19D]">
              <Network className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-headline font-bold text-[#1F1F23]">Dependency-Aware Adaptation</h2>
            <p className="text-xs text-[#6B6558] leading-relaxed font-normal">
              Pure TypeScript engine detects collateral conflicts and recalculates feasible schedules deterministically.
            </p>
          </div>

          <div className="studio-card p-6 rounded-2xl space-y-2 bg-[#FCFBF7]">
            <div className="w-9 h-9 rounded-xl bg-[#E2F7F2] text-[#1E6B52] flex items-center justify-center mb-3 border border-[#C3E8DC]">
              <Cpu className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-headline font-bold text-[#1F1F23]">What-If Simulation</h2>
            <p className="text-xs text-[#6B6558] leading-relaxed font-normal">
              Test disruptions, compare parallel before/after tracks, and rebalance workloads with one click.
            </p>
          </div>

          <div className="studio-card p-6 rounded-2xl space-y-2 bg-[#FCFBF7]">
            <div className="w-9 h-9 rounded-xl bg-[#EDEAFB] text-[#544393] flex items-center justify-center mb-3 border border-[#D9D2F5]">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h2 className="text-sm font-headline font-bold text-[#1F1F23]">Honest AI & Money</h2>
            <p className="text-xs text-[#6B6558] leading-relaxed font-normal">
              Explicit data provenance tags. AI only parses and drafts; it never calculates dates or finances.
            </p>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 border-t border-[#EDE6D3] py-6 text-center text-xs text-[#9A9384] font-mono">
        Creator Flow © 2026 • Code Meet Hackathon
      </footer>
    </div>
  );
}
