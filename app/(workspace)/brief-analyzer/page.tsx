import React from 'react';
import { PageHeader, EmptyState, PrimaryButton } from '@/components/shared';
import { FileSearch, UploadCloud } from 'lucide-react';

export default function BriefAnalyzerPage() {
  return (
    <div className="space-y-8 pb-12 font-body">
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
        title="PDF & Text Brief Analyzer"
        description="Extract fields with Zod validation. The review screen flags uncertain (amber), conflicting (both values), and missing (dashed) fields. Nothing is saved until confirmed, with manual fallback always available."
        icon={<FileSearch className="w-7 h-7 text-[#875C05]" />}
      />
    </div>
  );
}
