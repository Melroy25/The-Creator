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
  ShieldAlert,
} from 'lucide-react';
import Link from 'next/link';

export default function DevComponentsPage() {
  const { toast } = useToast();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#FAF6EA] text-[#1F1F23] p-8 space-y-12 max-w-6xl mx-auto font-body selection:bg-[#FBEFC2] selection:text-[#875C05]">
      {/* Dev Header */}
      <div className="flex items-center justify-between border-b border-[#EDE6D3] pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase bg-[#FBEFC2] text-[#875C05] px-2.5 py-0.5 rounded-full border border-[#F7E19D] font-bold">
              WARM EDITORIAL STUDIO
            </span>
            <span className="text-xs text-[#6B6558]">/ Token Verification & Test Bench</span>
          </div>
          <h1 className="text-3xl font-headline font-bold tracking-tight text-[#1F1F23]">Shared Component Library</h1>
          <p className="text-sm text-[#6B6558] mt-1 font-normal">
            Visual inspection test bench for every component rendered in Warm Editorial Studio style (warm cream foundations, ivory vellum surfaces, pill primitives).
          </p>
        </div>
        <Link
          href="/dashboard"
          className="text-xs font-mono font-bold text-[#1F1F23] hover:text-[#875C05] flex items-center gap-1.5 studio-btn-secondary px-4 py-2 rounded-full border border-[#EDE6D3]"
        >
          <span>Go to Dashboard</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* 1. BUTTONS */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-[#1F1F23] flex items-center gap-2">
          <span>1. Pill Buttons (Primary #1F1F23 & Secondary #FCFBF7)</span>
        </h2>
        <GlassCard className="space-y-6 bg-[#FCFBF7]">
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

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-[#EDE6D3]">
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
        <h2 className="text-lg font-headline font-bold text-[#1F1F23]">2. Metric Tiles (Multi-Accent Wash)</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatTile
            title="Due Today"
            value="3"
            variant="blue"
            description="2 script reviews and 1 sponsor invoice."
            icon={<Calendar className="w-5 h-5" />}
          />
          <StatTile
            title="Overdue"
            value="1"
            variant="rose"
            description="Brand B script approval pending review."
            icon={<AlertTriangle className="w-5 h-5" />}
          />
          <StatTile
            title="At Risk"
            value="2"
            variant="amber"
            description="Editor schedule overlaps on Wednesday afternoon."
            icon={<Clock className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* 3. STATUS CHIPS & SEVERITY BADGES */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-[#1F1F23]">3. Status Chips & Severity Badges (Pill Primitives)</h2>
        <GlassCard className="space-y-5 bg-[#FCFBF7]">
          <div>
            <div className="text-xs font-mono uppercase text-[#6B6558] mb-3 font-semibold">Status Chips (Solid Indicator Dot + Label)</div>
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

          <div className="pt-4 border-t border-[#EDE6D3]">
            <div className="text-xs font-mono uppercase text-[#6B6558] mb-3 font-semibold">Severity Badges (Dual-Channel)</div>
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
        <h2 className="text-lg font-headline font-bold text-[#1F1F23]">4. Provenance Chips (Hover/Focus to test tooltip)</h2>
        <GlassCard className="bg-[#FCFBF7]">
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
        <h2 className="text-lg font-headline font-bold text-[#1F1F23]">5. Drawers, Modals & Toast Triggers</h2>
        <GlassCard className="flex flex-wrap items-center gap-4 bg-[#FCFBF7]">
          <PrimaryButton onClick={() => setDrawerOpen(true)}>
            Open 460px Side Drawer
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

      {/* 6. SKELETON & EMPTY STATE */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-[#1F1F23]">6. Loading Skeleton & Empty State</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LoadingSkeleton className="h-44 w-full" />
          <EmptyState
            title="No Disruptions Detected"
            description="All brand deliverables and milestones are currently tracking on schedule with full resource availability."
            action={<PrimaryButton size="sm">Run Diagnostics</PrimaryButton>}
          />
        </div>
      </section>

      {/* Side Drawer Instance */}
      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Task Detail Inspector"
        subtitle="ID: tsk_youtube_sponsor_v1"
        footer={
          <div className="flex items-center justify-end gap-3">
            <SecondaryButton size="sm" onClick={() => setDrawerOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton size="sm" onClick={() => setDrawerOpen(false)}>
              Save Modifications
            </PrimaryButton>
          </div>
        }
      >
        <div className="space-y-4 text-sm text-[#1F1F23]">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#6B6558]">Task Title</label>
            <p className="font-semibold text-base">Record Sponsored Segment (60s)</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#6B6558]">Assignee</label>
            <p className="font-medium">Marcus Vance (Host)</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#6B6558]">Provenance</label>
            <div>
              <ProvenanceChip type="Confirmed" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#6B6558]">Status</label>
            <div>
              <StatusChip status="in_progress" />
            </div>
          </div>
        </div>
      </SideDrawer>

      {/* Confirm Modal Instance */}
      <ConfirmModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={() => {
          setModalOpen(false);
          toast({
            type: 'warning',
            title: 'Schedule Disrupted',
            description: 'Brand A deadline moved 2 days earlier. 3 collateral tasks recalculated.',
          });
        }}
        title="Simulate Brand Disruption?"
        description="This will test the deterministic scheduler by moving Brand A sponsor delivery from Friday to Wednesday. The engine will evaluate downstream bottlenecks without modifying live database records."
        confirmLabel="Run Impact Engine"
        variant="warning"
      />
    </div>
  );
}
