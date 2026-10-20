'use client';

import React from 'react';
import { PageHeader, EmptyState, PrimaryButton, StaggerContainer, StaggerItem } from '@/components/shared';
import { FileSearch, UploadCloud } from 'lucide-react';

export default function BriefAnalyzerPage() {
  return (
    <StaggerContainer className="space-y-8 pb-12 font-sans">
      <StaggerItem>
        <PageHeader
          title="Smart Brief Analyzer"
          purpose="Upload PDF or text briefs. The LLM extracts terms, deadlines, and deliverables into a validated Zod review screen before any record is created."
          badge="AI Document Parser"
          phaseBadge="Built in Phase E"
          actions={
            <PrimaryButton size="sm" icon={<UploadCloud className="w-3.5 h-3.5" />}>
              Upload Sponsor Brief
            </PrimaryButton>
          }
        />
      </StaggerItem>

      <StaggerItem>
        <EmptyState
          title="PDF & Text Brief Analyzer"
          description="Extract fields with Zod validation. The review screen flags uncertain (amber), conflicting (both values), and missing (dashed) fields. Nothing is saved until confirmed, with manual form fallback always available. Wired in Phase E."
          icon={<FileSearch className="w-7 h-7 text-accent-strong" />}
        />
      </StaggerItem>
    </StaggerContainer>
  );
}
