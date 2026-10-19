import React from 'react';
import { PageHeader, EmptyState, PrimaryButton } from '@/components/shared';
import { FileSearch, UploadCloud } from 'lucide-react';

export default function BriefAnalyzerPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Smart Brief Analyzer"
        purpose="Upload PDF or text briefs. The LLM extracts terms, deadlines, and deliverables into a validated Zod review screen before any record is created."
        badge="AI Document Parser"
        badgeVariant="primary"
        actions={
          <PrimaryButton size="sm" icon={<UploadCloud className="w-4 h-4" />}>
            Upload Sponsor Brief
          </PrimaryButton>
        }
      />

      <EmptyState
        title="PDF & Text Brief Parser Coming in Phase 6"
        description="The multi-format brief intake, extraction review screen with uncertainty highlighting ('Please verify'), and auto task template generation will be implemented in Phase 6."
        icon={<FileSearch className="w-7 h-7 text-indigo-400" />}
      />
    </div>
  );
}
