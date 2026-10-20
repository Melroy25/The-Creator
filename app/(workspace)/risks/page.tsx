'use client';

import React from 'react';
import { PageHeader, EmptyState, SecondaryButton, StaggerContainer, StaggerItem } from '@/components/shared';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function RisksPage() {
  return (
    <StaggerContainer className="space-y-8 pb-12 font-sans">
      <StaggerItem>
        <PageHeader
          title="Risk Radar"
          purpose="Rule-based alert matrix detecting overdue tasks, missed SLA turnarounds, payment delays, and team capacity constraints."
          badge="Bottlenecks & Critical Radar"
          phaseBadge="Built in Phase D"
          actions={
            <SecondaryButton size="sm" icon={<RefreshCw className="w-3.5 h-3.5" />}>
              Re-evaluate Rules
            </SecondaryButton>
          }
        />
      </StaggerItem>

      <StaggerItem>
        <EmptyState
          title="Deterministic Rule-Based Risk Alerts"
          description="Every alert lists the explicit evidence that triggered it. Critical (confirmed), High, Medium, Low categories based strictly on calculated engine metrics with recommended next actions. Wired in Phase D."
          icon={<AlertTriangle className="w-7 h-7 text-accent-strong" />}
        />
      </StaggerItem>
    </StaggerContainer>
  );
}
