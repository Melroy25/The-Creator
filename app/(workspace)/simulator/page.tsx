import React from 'react';
import { PageHeader, EmptyState, SecondaryButton, PrimaryButton } from '@/components/shared';
import { Cpu, RotateCcw, Play } from 'lucide-react';

export default function SimulatorPage() {
  return (
    <div className="space-y-8 pb-12 font-body">
      <PageHeader
        title="Change-Impact Simulator"
        purpose="Test schedule disruptions, simulate collateral task shifts, and neutralize creator bottlenecks before they touch active client pipelines."
        badge="Module 04 // Predictive Dispatch"
        badgeVariant="primary"
        actions={
          <div className="flex items-center gap-2">
            <SecondaryButton size="sm" icon={<RotateCcw className="w-4 h-4" />}>
              Reset Plan
            </SecondaryButton>
            <PrimaryButton size="sm" icon={<Play className="w-4 h-4 fill-white" />}>
              Run Simulation
            </PrimaryButton>
          </div>
        }
      />

      <EmptyState
        title="Predictive Change-Impact Simulator"
        description="3-Step Simulator: (a) What changed? (b) Now vs New plan timelines with moved tasks highlighted (c) Short summary with plain reasons, Approve or Reject, and calculated alternatives."
        icon={<Cpu className="w-7 h-7 text-[#875C05]" />}
      />
    </div>
  );
}
