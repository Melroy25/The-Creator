import React from 'react';
import { PageHeader, EmptyState, SecondaryButton } from '@/components/shared';
import { getCampaignById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { ArrowLeft, Layers } from 'lucide-react';
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
        badgeVariant="primary"
      />

      {/* Tabs as per Lean Scope: Tasks, Approvals, Money, History */}
      <div className="border-b border-[#E2E6F0] flex items-center gap-6 text-sm font-semibold text-[#64748B]">
        <span className="text-indigo-600 border-b-2 border-indigo-600 pb-3 font-bold cursor-pointer">Overview</span>
        <span className="pb-3 hover:text-[#1E2337] cursor-pointer">Tasks</span>
        <span className="pb-3 hover:text-[#1E2337] cursor-pointer">Approvals</span>
        <span className="pb-3 hover:text-[#1E2337] cursor-pointer">Money</span>
        <span className="pb-3 hover:text-[#1E2337] cursor-pointer">History</span>
      </div>

      <EmptyState
        title="Campaign Workspace Details"
        description="The detailed deliverable checklist, brand approval logs, and money reconciliation are connected live to your campaign records."
        icon={<Layers className="w-7 h-7" />}
      />
    </div>
  );
}
