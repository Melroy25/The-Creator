import React from 'react';
import { PageHeader, EmptyState, SecondaryButton } from '@/components/shared';
import { Network, Filter, Maximize2 } from 'lucide-react';

export default function WorkflowPage() {
  return (
    <div className="space-y-8 pb-12 font-body">
      <PageHeader
        title="Workflow Graph"
        purpose="Visual dependency map showing how briefs, scripts, shoots, edits, approvals, and invoices link together across all deals."
        badge="Live Pipeline"
        phaseBadge="Built in Phase C"
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
        title="Interactive React Flow Vector Graph"
        description="Directed acyclic graph linking tasks, dependencies, and critical path chains. Clicking any node opens the 460px inspector drawer showing owner, due date, 'waiting on' and 'blocks'. Connected to engine in Phase C."
        icon={<Network className="w-7 h-7 text-accent-strong" />}
      />
    </div>
  );
}
