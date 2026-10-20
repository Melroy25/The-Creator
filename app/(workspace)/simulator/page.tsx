'use client';

import React from 'react';
import { PageHeader, EmptyState, SecondaryButton, PrimaryButton, StaggerContainer, StaggerItem } from '@/components/shared';
import { Cpu, RotateCcw, Play } from 'lucide-react';

export default function SimulatorPage() {
  return (
    <StaggerContainer className="space-y-8 pb-12 font-sans">
      <StaggerItem>
        <PageHeader
          title="Change-Impact Simulator"
          purpose="Test schedule disruptions, simulate collateral task shifts, and neutralize creator bottlenecks before they touch active client pipelines."
          badge="Flagship Engine"
          phaseBadge="Built in Phase C"
          actions={
            <div className="flex items-center gap-2">
              <SecondaryButton size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />}>
                Reset Plan
              </SecondaryButton>
              <PrimaryButton size="sm" icon={<Play className="w-3.5 h-3.5 fill-current" />}>
                Run Simulation
              </PrimaryButton>
            </div>
          }
        />
      </StaggerItem>

      <StaggerItem>
        <EmptyState
          title="Predictive Change-Impact Simulator"
          description="3-Step Simulator: (1) What changed? (2) Now vs New plan parallel timeline diff with shifted tasks highlighted (3) Short summary with plain reason codes, calculated alternatives (renegotiate, add hours, drop flexible task), 'Can I take this deal?' check, and Approve/Reject controls. Wired to pure TypeScript engine in Phase C."
          icon={<Cpu className="w-7 h-7 text-accent-strong" />}
        />
      </StaggerItem>
    </StaggerContainer>
  );
}
