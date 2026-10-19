'use client';

import React, { useState } from 'react';
import {
  PrimaryButton,
  SecondaryButton,
  GlassCard,
  StatTile,
  StatusChip,
  SeverityBadge,
  ProvenanceChip,
  SideDrawer,
  ConfirmModal,
  EmptyState,
  LoadingSkeleton,
  useToast,
  PageHeader,
} from '@/components/shared';
import {
  Calendar,
  AlertTriangle,
  Play,
  Sparkles,
  Inbox,
  CheckCircle,
  Clock,
  Layers,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DevComponentsPage() {
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#090C15] text-[#F1F5F9] p-8 space-y-12 max-w-6xl mx-auto">
      {/* Dev Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-500/30">
              DEVELOPER TEST BENCH
            </span>
            <span className="text-xs text-slate-500">/ Stitch Token Verification</span>
          </div>
          <h1 className="text-3xl font-bold font-sans tracking-tight">Shared Component Library</h1>
          <p className="text-sm text-slate-400 mt-1">
            Visual inspection test bench for every Phase 1 shared component across all variants and states.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-xs font-mono text-indigo-400 hover:text-indigo-300 flex items-center gap-1.5"
        >
          <span>Go to Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 1. BUTTONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-300 flex items-center gap-2">
          <span>1. Primary & Secondary Buttons</span>
        </h2>
        <GlassCard className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <PrimaryButton size="lg" icon={<Play className="w-4 h-4 fill-white" />}>
              Start Daily Focus (lg)
            </PrimaryButton>
            <PrimaryButton size="md" icon={<Sparkles className="w-4 h-4" />}>
              Fix With One Click (md)
            </PrimaryButton>
            <PrimaryButton size="sm">
              Small CTA
            </PrimaryButton>
            <PrimaryButton loading>
              Simulating...
            </PrimaryButton>
            <PrimaryButton disabled>
              Disabled State
            </PrimaryButton>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.06]">
            <SecondaryButton size="lg">
              Export CSV (lg)
            </SecondaryButton>
            <SecondaryButton size="md" icon={<Clock className="w-4 h-4" />}>
              View Timeline (md)
            </SecondaryButton>
            <SecondaryButton size="sm">
              Inspect (sm)
            </SecondaryButton>
            <SecondaryButton loading>
              Saving...
            </SecondaryButton>
            <SecondaryButton disabled>
              Disabled Secondary
            </SecondaryButton>
          </div>
        </GlassCard>
      </section>

      {/* 2. STAT TILES */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-300">2. Hero Stat Tiles (From Stitch Dashboard)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatTile
            title="Due Today"
            value="3"
            variant="cyan"
            description="2 script reviews and 1 sponsor invoice."
            icon={<Calendar className="w-5 h-5 text-sky-400" />}
          />
          <StatTile
            title="Overdue"
            value="1"
            variant="rose"
            description="Brand B script approval pending review."
            icon={<AlertTriangle className="w-5 h-5 text-rose-400" />}
          />
          <StatTile
            title="At Risk"
            value="2"
            variant="amber"
            description="Editor schedule overlaps on Wednesday afternoon."
            icon={<Clock className="w-5 h-5 text-amber-400" />}
          />
        </div>
      </section>

      {/* 3. STATUS CHIPS & SEVERITY BADGES */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-300">3. Status Chips & Severity Badges</h2>
        <GlassCard className="space-y-5">
          <div>
            <div className="text-xs font-mono uppercase text-slate-400 mb-3">Status Chips (Icon + Label, Never Color Alone)</div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusChip status="done" />
              <StatusChip status="in_progress" />
              <StatusChip status="overdue" />
              <StatusChip status="blocked" />
              <StatusChip status="at_risk" />
              <StatusChip status="up_next" />
              <StatusChip status="not_started" />
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <div className="text-xs font-mono uppercase text-slate-400 mb-3">Severity Badges (Dual-Channel)</div>
            <div className="flex flex-wrap items-center gap-3">
              <SeverityBadge severity="critical" />
              <SeverityBadge severity="high" />
              <SeverityBadge severity="medium" />
              <SeverityBadge severity="low" />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 4. PROVENANCE CHIPS */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-300">4. Provenance Chips (Hover/Focus to test tooltip)</h2>
        <GlassCard>
          <div className="flex flex-wrap items-center gap-4">
            <ProvenanceChip type="Confirmed" />
            <ProvenanceChip type="Assumption" />
            <ProvenanceChip type="Calculated" />
            <ProvenanceChip type="AI suggestion" />
          </div>
        </GlassCard>
      </section>

      {/* 5. INTERACTIVE DRAWERS & MODALS */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-300">5. Drawers, Modals & Toast Triggers</h2>
        <GlassCard className="flex flex-wrap items-center gap-4">
          <PrimaryButton onClick={() => setDrawerOpen(true)}>
            Open Side Drawer
          </PrimaryButton>
          <SecondaryButton onClick={() => setModalOpen(true)}>
            Open Confirm Modal
          </SecondaryButton>
          <SecondaryButton
            onClick={() =>
              toast({
                type: 'success',
                title: 'Schedule Recalculated',
                description: 'Deterministic engine shifted 2 tasks with 0 conflicts.',
              })
            }
          >
            Trigger Success Toast
          </SecondaryButton>
          <SecondaryButton
            onClick={() =>
              toast({
                type: 'error',
                title: 'Conflict Detected',
                description: 'Editor Leo is double-booked on Wednesday.',
              })
            }
          >
            Trigger Error Toast
          </SecondaryButton>
        </GlassCard>
      </section>

      {/* 6. EMPTY STATE */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-300">6. Empty State</h2>
        <EmptyState
          title="No Active Deliverable Conflicts"
          description="Your current workflow graph has room to spare. All deliverable milestones are feasible within team capacity."
          actionLabel="Simulate New Deal"
          onAction={() => alert('Simulate triggered')}
        />
      </section>

      {/* 7. LOADING SKELETONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-semibold text-slate-300">7. Loading Skeletons</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LoadingSkeleton variant="tile" count={1} />
          <LoadingSkeleton variant="card" count={1} />
        </div>
      </section>

      {/* Interactive Drawer Instance */}
      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Video Shoot & Edit"
        subtitle="Node 04 Inspection // Stage 3 of 5"
        footer={
          <div className="flex items-center justify-end gap-3">
            <SecondaryButton size="sm" onClick={() => setDrawerOpen(false)}>
              Close
            </SecondaryButton>
            <PrimaryButton size="sm" onClick={() => setDrawerOpen(false)}>
              Save Adjustments
            </PrimaryButton>
          </div>
        }
      >
        <div className="space-y-4 text-sm text-slate-300">
          <div className="p-4 rounded-xl glass-inset space-y-2">
            <div className="text-xs font-mono uppercase text-slate-400">Assigned Owners</div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 font-mono text-xs font-bold">
                MV (Marcus)
              </span>
              <span className="px-2 py-1 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold">
                LS (Leo)
              </span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-400 font-semibold text-xs">
              <AlertTriangle className="w-4 h-4" />
              <span>Waiting on Pre-requisite</span>
            </div>
            <p className="text-xs text-rose-200">
              Brand Sign-off from Sarah Lin is overdue by 6 hours.
            </p>
          </div>
        </div>
      </SideDrawer>

      {/* Interactive Modal Instance */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          toast({ type: 'info', title: 'Schedule Approved', description: 'Changes locked into records.' });
        }}
        title="Approve Schedule Adjustment"
        description="The deterministic engine will shift 3 flexible editing tasks to accommodate Brand A's earlier submission. This will be recorded in the audit log."
        confirmLabel="Approve Schedule"
      />
    </div>
  );
}
