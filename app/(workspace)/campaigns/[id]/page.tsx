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
    <div className="space-y-8 pb-12">
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

      {/* 5 Tabs placeholder as per BRIEF.md: Overview, Tasks, Approvals, Finance, Activity */}
      <div className="border-b border-white/[0.08] flex items-center gap-6 text-sm font-semibold text-slate-400">
        <span className="text-white border-b-2 border-indigo-500 pb-3 font-bold">Overview</span>
        <span className="pb-3 hover:text-slate-200 cursor-pointer">Tasks</span>
        <span className="pb-3 hover:text-slate-200 cursor-pointer">Approvals</span>
        <span className="pb-3 hover:text-slate-200 cursor-pointer">Finance</span>
        <span className="pb-3 hover:text-slate-200 cursor-pointer">Activity</span>
      </div>

      <EmptyState
        title="Campaign Details & 5 Tabs Coming in Phase 5"
        description="The full contract breakdown, milestone escrow splits, task progression checklist, and sponsor update drafter will plug in directly here in Phase 5."
        icon={<Layers className="w-7 h-7" />}
      />
    </div>
  );
}
