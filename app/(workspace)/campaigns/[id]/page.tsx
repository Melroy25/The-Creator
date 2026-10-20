import React from 'react';
import { PageHeader, EmptyState, SecondaryButton, StepTracker } from '@/components/shared';
import { getCampaignById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowLeft, Layers, History, DollarSign, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

export default async function CampaignDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const campaign = await getCampaignById(params.id);

  if (!campaign) {
    return notFound();
  }

  return (
    <div className="space-y-8 pb-12 font-body">
      <div className="flex items-center gap-2">
        <Link href="/campaigns">
          <SecondaryButton size="sm" icon={<ArrowLeft className="w-3.5 h-3.5" />}>
            Back to Campaigns
          </SecondaryButton>
        </Link>
      </div>

      <PageHeader
        title={campaign.name}
        purpose={`Sponsor contract with ${campaign.brand?.name || 'Brand Partner'} for $${campaign.payment_amount.toLocaleString()}.`}
        badge={`Contract ID: #${campaign.id.substring(0, 8)}`}
        phaseBadge="Built in Phase D"
      />

      {/* Step Tracker Lifecycle */}
      <div className="p-6 rounded-2xl bg-surface border border-border shadow-card">
        <StepTracker currentStepIndex={2} />
      </div>

      {/* Tabs as per Lean Scope: Tasks, Approvals, Money, Activity */}
      <div className="border-b border-border flex items-center gap-6 text-sm font-semibold text-text-secondary overflow-x-auto">
        <span className="text-text-primary border-b-2 border-text-primary pb-3 font-bold cursor-pointer shrink-0">Overview & Deliverables</span>
        <span className="pb-3 hover:text-text-primary cursor-pointer shrink-0">Tasks & Templates</span>
        <span className="pb-3 hover:text-text-primary cursor-pointer shrink-0">Brand Approvals</span>
        <span className="pb-3 hover:text-text-primary cursor-pointer shrink-0">Money & Invoicing</span>
        <span className="pb-3 hover:text-text-primary cursor-pointer shrink-0">Activity & Undo</span>
      </div>

      <EmptyState
        title="Deliverable Checklist & Approval Stream"
        description="Auto-generated task templates from deliverable type (YouTube Integration / Reel), brand approval SLA logs, and money reconciliation are wired live in Phase D."
        icon={<Layers className="w-7 h-7 text-accent-strong" />}
      />
    </div>
  );
}
