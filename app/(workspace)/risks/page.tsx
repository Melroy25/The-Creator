import React from 'react';
import { PageHeader, EmptyState, SecondaryButton } from '@/components/shared';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function RisksPage() {
  return (
    <div className="space-y-8 pb-12 font-body">
      <PageHeader
        title="Risk Radar"
        purpose="Rule-based alert matrix detecting overdue tasks, missed SLA turnarounds, payment delays, and team capacity constraints."
        badge="Bottlenecks & Critical Radar"
        badgeVariant="amber"
        actions={
          <SecondaryButton size="sm" icon={<RefreshCw className="w-4 h-4" />}>
            Re-evaluate Rules
          </SecondaryButton>
        }
      />

      <EmptyState
        title="Deterministic Rule-Based Risk Alerts"
        description="Every alert lists the explicit evidence that triggered it. Critical (confirmed), High, Medium, Low categories based strictly on calculated engine metrics."
        icon={<AlertTriangle className="w-7 h-7 text-[#875C05]" />}
      />
    </div>
  );
}
