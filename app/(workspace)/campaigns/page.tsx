import React from 'react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/shared';
import { Plus, Download } from 'lucide-react';
import Link from 'next/link';
import { getCampaigns } from '@/lib/data';

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <div className="space-y-8 pb-12 font-body">
      <PageHeader
        title="Campaigns & Deliverables"
        purpose="Track contracts, deliverable deadlines, review statuses, and payment reliability across all sponsor partnerships."
        badge="Deliverables Radar"
        badgeVariant="primary"
        actions={
          <div className="flex items-center gap-3">
            <SecondaryButton size="sm" icon={<Download className="w-4 h-4" />}>
              Export CSV
            </SecondaryButton>
            <PrimaryButton size="sm" icon={<Plus className="w-4 h-4" />}>
              New Campaign
            </PrimaryButton>
          </div>
        }
      />

      {/* Campaigns Overview List Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <Link
            key={camp.id}
            href={`/campaigns/${camp.id}`}
            className="silk-card p-6 rounded-2xl space-y-4 group block hover:-translate-y-0.5 transition-all"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-[#94A3B8] uppercase tracking-wider font-semibold">
                  {camp.brand?.name || 'Sponsor'}
                </span>
                <h3 className="text-base font-headline font-bold text-[#1E2337] group-hover:text-indigo-600 transition-colors">
                  {camp.name}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full border border-indigo-200">
                ${camp.payment_amount.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-[#64748B] leading-relaxed line-clamp-2 font-medium">
              Deliverables: {camp.deliverables?.map(d => d.title).join(', ') || '1 Video Integration'}
            </p>

            <div className="pt-2 border-t border-[#E2E6F0] flex items-center justify-between text-xs text-[#64748B] font-mono">
              <span className="uppercase">Platform: {camp.platform}</span>
              <span className="text-indigo-600 font-bold group-hover:underline">View details →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
