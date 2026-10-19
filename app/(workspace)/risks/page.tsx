import React from 'react';
import { PageHeader, EmptyState, SecondaryButton } from '@/components/shared';
import { AlertTriangle, RefreshCw } from 'lucide-react';

export default function RisksPage() {
  return (
    <div className="space-y-8 pb-12">
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
        title="Rule-Based Alert Matrix Coming in Phase 4"
        description="The full Risk Radar with severity ranking (Critical, High, Medium, Low), JSON evidence inspector, and direct resolution CTAs will be wired in Phase 4."
        icon={<AlertTriangle className="w-7 h-7 text-amber-400" />}
      />
    </div>
  );
}
