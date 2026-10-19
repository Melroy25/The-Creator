import React from 'react';
import { PageHeader, EmptyState, SecondaryButton } from '@/components/shared';
import { Network, Filter, Maximize2 } from 'lucide-react';

export default function WorkflowPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Workflow Graph"
        purpose="Visual dependency map showing how briefs, scripts, shoots, edits, approvals, and invoices link together across all deals."
        badge="Live Pipeline"
        badgeVariant="cyan"
        actions={
          <div className="flex items-center gap-2">
            <SecondaryButton size="sm" icon={<Filter className="w-4 h-4" />}>
              Critical Path Only
            </SecondaryButton>
            <SecondaryButton size="sm" icon={<Maximize2 className="w-4 h-4" />}>
              Fit Canvas
            </SecondaryButton>
          </div>
        }
      />

      <EmptyState
        title="Interactive Node Graph Coming in Phase 3"
        description="The full React Flow vector canvas with curved animated gradient conduits, tactile minimap, and the right-hand Node Inspector drawer will be mounted in Phase 3."
        icon={<Network className="w-7 h-7 text-indigo-400" />}
      />
    </div>
  );
}
