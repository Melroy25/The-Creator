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
  StepTracker,
  ConfirmModal,
  SegmentedControl,
  AccentSwatchRow,
  Toggle,
  WorkloadMeter,
  RevenueChartCard,
  DataTable,
  Avatar,
  EmptyState,
  LoadingSkeleton,
  useToast,
  useTheme,
} from '@/components/shared';
import {
  Calendar,
  AlertTriangle,
  Play,
  Sparkles,
  Clock,
  ArrowRight,
  Sun,
  Monitor,
  Moon,
  Layers,
} from 'lucide-react';
import Link from 'next/link';

export default function DevComponentsPage() {
  const { theme, accent, setTheme, setAccent } = useTheme();
  const { toast } = useToast();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [demoToggle, setDemoToggle] = useState(true);

  const sampleTableData = [
    { id: '1', title: 'Brand A: 90s YouTube Integration', brand: 'Nova Audio', amount: '$18,500', status: 'done' as const },
    { id: '2', title: 'Brand B: Dedicated Product Review', brand: 'Pixel & Co', amount: '$24,000', status: 'blocked' as const },
    { id: '3', title: 'Brand C: 60s Vertical Reel', brand: 'Lumen Skincare', amount: '$12,000', status: 'in_progress' as const },
  ];

  return (
    <div className="min-h-screen bg-canvas text-text-primary p-6 sm:p-10 space-y-12 max-w-6xl mx-auto font-body">
      {/* Dev Header & Live Theme / Accent Switcher */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 border-b border-border pb-6">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[10px] font-mono uppercase bg-accent-tint text-accent-strong px-2.5 py-0.5 rounded-full border border-accent/20 font-bold">
              DEVELOPER TEST BENCH
            </span>
            <span className="text-xs text-text-secondary">/ Live Token Verification</span>
          </div>
          <h1 className="text-3xl font-headline font-bold tracking-tight text-text-primary">
            Shared Component Library
          </h1>
          <p className="text-sm text-text-secondary mt-1 font-normal">
            Visual inspection test bench for every component in all states with live theme and accent switching.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 bg-surface p-4 rounded-2xl border border-border shadow-card">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-text-tertiary block font-semibold">Theme</span>
            <SegmentedControl
              size="sm"
              options={[
                { value: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
                { value: 'system', label: 'System', icon: <Monitor className="w-3.5 h-3.5" /> },
                { value: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
              ]}
              value={theme}
              onChange={(val) => setTheme(val as any)}
            />
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase text-text-tertiary block font-semibold">Accent</span>
            <AccentSwatchRow value={accent} onChange={setAccent} />
          </div>
        </div>
      </div>

      {/* 1. BUTTONS & TOGGLES */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-text-primary">
          1. Pill Buttons (Black Primary & Ivory Secondary) & Toggles
        </h2>
        <GlassCard className="space-y-6">
          <div className="flex flex-wrap items-center gap-4">
            <PrimaryButton size="lg" icon={<Play className="w-4 h-4 fill-white" />}>
              Large Primary CTA
            </PrimaryButton>
            <PrimaryButton size="md" icon={<Sparkles className="w-4 h-4" />}>
              Medium Primary
            </PrimaryButton>
            <PrimaryButton size="sm">
              Small CTA
            </PrimaryButton>
            <PrimaryButton loading>
              Loading...
            </PrimaryButton>
            <PrimaryButton disabled>
              Disabled
            </PrimaryButton>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
            <SecondaryButton size="lg">
              Large Secondary
            </SecondaryButton>
            <SecondaryButton size="md" icon={<Clock className="w-4 h-4" />}>
              Medium Secondary
            </SecondaryButton>
            <SecondaryButton size="sm">
              Small Secondary
            </SecondaryButton>
            <SecondaryButton loading>
              Loading...
            </SecondaryButton>
            <SecondaryButton disabled>
              Disabled
            </SecondaryButton>
          </div>

          <div className="pt-4 border-t border-border flex items-center gap-6">
            <Toggle checked={demoToggle} onChange={setDemoToggle} label="Toggle Control (Active)" />
            <Toggle checked={false} onChange={() => {}} label="Toggle Control (Inactive)" />
            <Toggle checked={true} onChange={() => {}} disabled label="Disabled Toggle" />
          </div>
        </GlassCard>
      </section>

      {/* 2. STAT TILES */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-text-primary">
          2. KPI Stat Tiles (Count-Up Animation & Accent Badge)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatTile
            title="Due Today"
            value={3}
            variant="blue"
            description="2 script reviews and 1 sponsor invoice."
            icon={<Calendar className="w-5 h-5" />}
          />
          <StatTile
            title="Overdue"
            value={1}
            variant="rose"
            description="Pixel & Co script approval pending review."
            icon={<AlertTriangle className="w-5 h-5" />}
          />
          <StatTile
            title="At Risk"
            value={2}
            variant="amber"
            description="Editor schedule overlaps on Wednesday afternoon."
            icon={<Clock className="w-5 h-5" />}
          />
        </div>
      </section>

      {/* 3. REVENUE CHART CARD */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-text-primary">
          3. Recharts Revenue Area Chart (Accent Gradient Fill & Range Filter)
        </h2>
        <RevenueChartCard />
      </section>

      {/* 4. STATUS CHIPS & SEVERITY BADGES */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-text-primary">
          4. Status Chips (Dot + Icon + Label) & Severity Badges
        </h2>
        <GlassCard className="space-y-5">
          <div>
            <span className="text-xs font-mono uppercase text-text-secondary mb-3 block font-semibold">
              Status Chips
            </span>
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

          <div className="pt-4 border-t border-border">
            <span className="text-xs font-mono uppercase text-text-secondary mb-3 block font-semibold">
              Dual-Channel Severity Badges
            </span>
            <div className="flex flex-wrap items-center gap-3">
              <SeverityBadge severity="critical" />
              <SeverityBadge severity="high" />
              <SeverityBadge severity="medium" />
              <SeverityBadge severity="low" />
            </div>
          </div>
        </GlassCard>
      </section>

      {/* 5. PROVENANCE CHIPS & STEP TRACKER */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-text-primary">
          5. Provenance Chips (Tooltip Verification) & Step Tracker
        </h2>
        <GlassCard className="space-y-6">
          <div>
            <span className="text-xs font-mono uppercase text-text-secondary mb-3 block font-semibold">
              Data Provenance Tags (Hover to verify tooltip)
            </span>
            <div className="flex flex-wrap items-center gap-4">
              <ProvenanceChip type="Confirmed" />
              <ProvenanceChip type="Assumption" />
              <ProvenanceChip type="Calculated" />
              <ProvenanceChip type="AI suggestion" />
            </div>
          </div>

          <div className="pt-4 border-t border-border">
            <StepTracker currentStepIndex={2} />
          </div>
        </GlassCard>
      </section>

      {/* 6. WORKLOAD METERS */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-text-primary">
          6. Workload Meter (Healthy &lt;80%, Tight 80-100%, Overloaded &gt;100%)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <WorkloadMeter personName="Marcus Vance" role="creator" allocatedHours={28} capacityHours={40} />
          <WorkloadMeter personName="Maya" role="editor" allocatedHours={36} capacityHours={40} />
          <WorkloadMeter personName="Sam" role="editor" allocatedHours={24} capacityHours={20} />
        </div>
      </section>

      {/* 7. DATA TABLE & AVATARS */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-text-primary">
          7. Data Table Shell & Initial Avatars
        </h2>
        <DataTable
          columns={[
            {
              header: 'Deliverable',
              cell: (item) => (
                <div className="flex items-center gap-3">
                  <Avatar name={item.brand} size="sm" />
                  <div>
                    <p className="font-bold text-xs text-text-primary">{item.title}</p>
                    <span className="text-[10px] text-text-tertiary font-mono">{item.brand}</span>
                  </div>
                </div>
              ),
            },
            {
              header: 'Amount',
              cell: (item) => <span className="font-mono text-xs font-bold text-text-primary">{item.amount}</span>,
            },
            {
              header: 'Status',
              cell: (item) => <StatusChip status={item.status} size="sm" />,
            },
          ]}
          data={sampleTableData}
          onRowClick={(item) => alert(`Row clicked: ${item.title}`)}
        />
      </section>

      {/* 8. DRAWERS, MODALS & TOAST TRIGGERS */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-text-primary">
          8. 460px Slide Drawer, Confirm Modal & Toast Triggers
        </h2>
        <GlassCard className="flex flex-wrap items-center gap-4">
          <PrimaryButton onClick={() => setDrawerOpen(true)}>
            Open 460px Flyout Drawer
          </PrimaryButton>
          <SecondaryButton onClick={() => setModalOpen(true)}>
            Open Confirm Modal
          </SecondaryButton>
          <SecondaryButton
            onClick={() =>
              toast({
                type: 'success',
                title: 'Schedule Feasible',
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
                description: 'Editor Maya is double-booked on Wednesday afternoon.',
              })
            }
          >
            Trigger Error Toast
          </SecondaryButton>
        </GlassCard>
      </section>

      {/* 9. SKELETONS & EMPTY STATE */}
      <section className="space-y-4">
        <h2 className="text-lg font-headline font-bold text-text-primary">
          9. Skeletons & Empty State
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <LoadingSkeleton className="h-44 w-full" />
          <EmptyState
            title="Clean Pipeline"
            description="No conflicts or delayed approvals detected across your active deals."
            action={<PrimaryButton size="sm">Run Diagnostics</PrimaryButton>}
          />
        </div>
      </section>

      {/* Side Drawer Instance */}
      <SideDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        title="Deliverable Inspector"
        subtitle="ID: del_nova_youtube_90s"
        stepTracker={<StepTracker currentStepIndex={2} />}
        footer={
          <div className="flex items-center justify-end gap-3">
            <SecondaryButton size="sm" onClick={() => setDrawerOpen(false)}>
              Cancel
            </SecondaryButton>
            <PrimaryButton size="sm" onClick={() => setDrawerOpen(false)}>
              Save Changes
            </PrimaryButton>
          </div>
        }
      >
        <div className="space-y-4 text-sm text-text-primary">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary">Task Title</label>
            <p className="font-semibold text-base">Record Sponsored Segment (60s)</p>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary">Assignee</label>
            <Avatar name="Marcus Vance" subtitle="Creator • 8h/day" size="sm" />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary">Provenance</label>
            <div>
              <ProvenanceChip type="Confirmed" />
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-text-secondary">Status</label>
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
            description: 'Nova Audio deadline moved 2 days earlier. Collateral tasks recalculated.',
          });
        }}
        title="Simulate Schedule Disruption?"
        description="This will test the deterministic scheduler by moving Brand A sponsor delivery from Friday to Wednesday. Downstream dependencies will be shifted without mutating live database records."
        confirmLabel="Run Impact Engine"
        variant="warning"
      />
    </div>
  );
}
