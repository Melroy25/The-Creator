import React from 'react';
import { PageHeader, PrimaryButton, SecondaryButton, EmptyState } from '@/components/shared';
import { Megaphone, Plus, Download } from 'lucide-react';
import Link from 'next/link';
import { getCampaigns } from '@/lib/data';

export default async function CampaignsPage() {
  const campaigns = await getCampaigns();

  return (
    <div className="space-y-8 pb-12">
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
            className="glass-card-interactive p-6 rounded-2xl space-y-4 group block"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-slate-500 uppercase tracking-wider">
                  {camp.brand?.name || 'Sponsor'}
                </span>
                <h3 className="text-base font-bold text-white group-hover:text-indigo-400 transition-colors">
                  {camp.name}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded-full border border-indigo-500/20">
                ${camp.payment_amount.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed line-clamp-2">
              Deliverables: {camp.deliverables?.map(d => d.title).join(', ') || '1 Video Integration'}
            </p>

            <div className="pt-2 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-500 font-mono">
              <span>Platform: {camp.platform}</span>
              <span className="text-indigo-400 font-semibold group-hover:underline">View details →</span>
            </div>
          </Link>
        ))}
      </div>

      {/* Phase 5 Placeholder notice */}
      <EmptyState
        title="Full Campaign Matrix Coming in Phase 5"
        description="The multi-track deliverable inspector, SLA timeline variance alerts, and auto task templates will be fully populated in Phase 5."
        icon={<Megaphone className="w-7 h-7" />}
      />
    </div>
  );
}
