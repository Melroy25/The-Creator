import React from 'react';
import { PageHeader, EmptyState, SecondaryButton } from '@/components/shared';
import { FileSpreadsheet, Download } from 'lucide-react';

export default function FinancesPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Finances & Cash Flow"
        purpose="Track received vs waiting vs expected revenue, invoice automations, Net-D terms, campaign profit margins, and brand reliability scores."
        badge="Honest Money Ledger"
        badgeVariant="emerald"
        actions={
          <SecondaryButton size="sm" icon={<Download className="w-4 h-4" />}>
            Export Financial Report
          </SecondaryButton>
        }
      />

      <EmptyState
        title="Financial Ledger & Automation Coming in Phase 7"
        description="Invoice automation triggered on publish, brand reliability index calculations, and transparent cost-estimation logic will be wired in Phase 7."
        icon={<FileSpreadsheet className="w-7 h-7 text-emerald-400" />}
      />
    </div>
  );
}
