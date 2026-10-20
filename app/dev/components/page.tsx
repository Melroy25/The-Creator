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
  Clock,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';

export default function DevComponentsPage() {
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#F0F2F8] text-[#1E2337] p-8 space-y-12 max-w-6xl mx-auto font-body">
      {/* Dev Header */}
      <div className="flex items-center justify-between border-b border-[#E2E6F0] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase bg-[#E8EBF5] text-indigo-600 px-2 py-0.5 rounded-full border border-indigo-200 font-bold">
              DEVELOPER TEST BENCH
            </span>
            <span className="text-xs text-[#64748B]">/ Stitch Silk Light Token Verification</span>
          </div>
          <h1 className="text-3xl font-headline font-bold tracking-tight text-[#1E2337]">Shared Component Library</h1>
          <p className="text-sm text-[#64748B] mt-1 font-medium">
            Visual inspection test bench for every Phase A shared component rendered in Silk Light Neomorphic style.
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-xs font-mono font-bold text-indigo-600 hover:text-indigo-700 flex items-center gap-1.5 silk-card-sm px-3 py-1.5 rounded-xl"
        >
          <span>Go to Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 1. BUTTONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-semibold text-[#1E2337] flex items-center gap-2">
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

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#E2E6F0]">
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
        <h2 className="text-lg font-headline font-semibold text-[#1E2337]">2. Hero Stat Tiles (From Stitch Dashboard)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatTile
            title="Due Today"
            value="3"
            variant="cyan"
            description="2 script reviews and 1 sponsor invoice."
            icon={<Calendar className="w-5 h-5 text-[#0284C7]" />}
          />
          <StatTile
            title="Overdue"
            value="1"
            variant="rose"
            description="Brand B script approval pending review."
            icon={<AlertTriangle className="w-5 h-5 text-[#EF4444]" />}
          />
          <StatTile
            title="At Risk"
            value="2"
            variant="amber"
            description="Editor schedule overlaps on Wednesday afternoon."
            icon={<Clock className="w-5 h-5 text-[#D97706]" />}
          />
        </div>
      </section>

      {/* 3. STATUS CHIPS & SEVERITY BADGES */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-semibold text-[#1E2337]">3. Status Chips & Severity Badges</h2>
        <GlassCard className="space-y-5">
          <div>
            <div className="text-xs font-mono uppercase text-[#64748B] mb-3 font-semibold">Status Chips (Icon + Label, Never Color Alone)</div>
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

          <div className="pt-4 border-t border-[#E2E6F0]">
            <div className="text-xs font-mono uppercase text-[#64748B] mb-3 font-semibold">Severity Badges (Dual-Channel)</div>
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
        <h2 className="text-lg font-headline font-semibold text-[#1E2337]">4. Provenance Chips (Hover/Focus to test tooltip)</h2>
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
        <h2 className="text-lg font-headline font-semibold text-[#1E2337]">5. Drawers, Modals & Toast Triggers</h2>
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
        <h2 className="text-lg font-headline font-semibold text-[#1E2337]">6. Empty State</h2>
        <EmptyState
          title="No Active Deliverable Conflicts"
          description="Your current workflow graph has room to spare. All deliverable milestones are feasible within team capacity."
          actionLabel="Simulate New Deal"
          onAction={() => alert('Simulate triggered')}
        />
      </section>

      {/* 7. LOADING SKELETONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-semibold text-[#1E2337]">7. Loading Skeletons</h2>
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
        <div className="space-y-4 text-sm text-[#1E2337]">
          <div className="p-4 rounded-xl silk-inset space-y-2">
            <div className="text-xs font-mono uppercase text-[#64748B] font-semibold">Assigned Owners</div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-1 rounded bg-white shadow-sm text-indigo-600 font-mono text-xs font-bold border border-slate-200">
                MV (Marcus)
              </span>
              <span className="px-2 py-1 rounded bg-white shadow-sm text-sky-600 font-mono text-xs font-bold border border-slate-200">
                LS (Leo)
              </span>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 space-y-2">
            <div className="flex items-center gap-1.5 text-rose-700 font-semibold text-xs">
              <AlertTriangle className="w-4 h-4 text-rose-600" />
              <span>Waiting on Pre-requisite</span>
            </div>
            <p className="text-xs text-rose-700 font-medium">
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
