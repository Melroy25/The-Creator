import React from 'react';
import { PageHeader, PrimaryButton, SecondaryButton } from '@/components/shared';
import { Plus, Download, FileSearch } from 'lucide-react';
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
        phaseBadge="Built in Phase D"
        actions={
          <div className="flex items-center gap-3">
            <SecondaryButton size="sm" icon={<Download className="w-4 h-4" />}>
              Export CSV
            </SecondaryButton>
            <Link href="/brief-analyzer">
              <PrimaryButton size="sm" icon={<FileSearch className="w-4 h-4" />}>
                Analyze Brief
              </PrimaryButton>
            </Link>
          </div>
        }
      />

      {/* Campaigns Overview List Preview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {campaigns.map((camp) => (
          <Link
            key={camp.id}
            href={`/campaigns/${camp.id}`}
            className="p-6 rounded-2xl space-y-4 group block hover:-translate-y-0.5 transition-all bg-surface border border-border shadow-card"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider font-semibold">
                  {camp.brand?.name || 'Sponsor'}
                </span>
                <h3 className="text-base font-headline font-bold text-text-primary group-hover:text-accent-strong transition-colors">
                  {camp.name}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-accent-strong bg-accent-tint px-2.5 py-0.5 rounded-full border border-accent/20">
                ${camp.payment_amount.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 font-normal">
              Deliverables: {camp.deliverables?.map(d => d.title).join(', ') || '1 Video Integration'}
            </p>

            <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-secondary font-mono">
              <span className="uppercase">Platform: {camp.platform}</span>
              <span className="text-accent-strong font-bold group-hover:underline">View details →</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
