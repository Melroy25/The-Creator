import React from 'react';
import { PageHeader, EmptyState, SecondaryButton } from '@/components/shared';
import { History, RotateCcw } from 'lucide-react';

export default function AuditPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Audit Trail & Version History"
        purpose="Every schedule change, engine rebalance, and user approval is recorded chronologically with one-click undo capability."
        badge="Deterministic Change Ledger"
        badgeVariant="cyan"
        actions={
          <SecondaryButton size="sm" icon={<RotateCcw className="w-4 h-4" />}>
            Undo Last Approved Shift
          </SecondaryButton>
        }
      />

      <EmptyState
        title="Audit Trail & Schedule Undo Coming in Phase 4"
        description="The deterministic diff viewer with before/after state snapshots, constraints considered, and instant rollback triggers will be wired in Phase 4."
        icon={<History className="w-7 h-7 text-cyan-400" />}
      />
    </div>
  );
}
