'use client';

import React, { useEffect, useState } from 'react';
import {
  PageHeader,
  PrimaryButton,
  SecondaryButton,
  StaggerContainer,
  StaggerItem,
  AnimatedCardGrid,
  AnimatedCard,
  CountUp,
} from '@/components/shared';
import { Download, FileSearch } from 'lucide-react';
import Link from 'next/link';
import { getCampaigns } from '@/lib/data';
import { Campaign } from '@/lib/types';

export default function CampaignsPage() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => {
    getCampaigns().then(setCampaigns);
  }, []);

  return (
    <StaggerContainer className="space-y-8 pb-12 font-sans">
      <StaggerItem>
        <PageHeader
          title="Campaigns & Deliverables"
          purpose="Track contracts, deliverable deadlines, review statuses, and payment reliability across all sponsor partnerships."
          badge="Deliverables Radar"
          actions={
            <div className="flex items-center gap-3">
              <SecondaryButton size="sm" icon={<Download className="w-3.5 h-3.5" />}>
                Export CSV
              </SecondaryButton>
              <Link href="/brief-analyzer">
                <PrimaryButton size="sm" icon={<FileSearch className="w-3.5 h-3.5" />}>
                  Analyze Brief
                </PrimaryButton>
              </Link>
            </div>
          }
        />
      </StaggerItem>

      {/* Campaigns Grid with 40ms stagger and 0.97 -> 1 scale */}
      <StaggerItem>
        <AnimatedCardGrid staggerDelay={0.04} className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {campaigns.map((camp) => (
            <AnimatedCard key={camp.id}>
              <Link
                href={`/campaigns/${camp.id}`}
                className="p-6 rounded-3xl space-y-4 group block bg-surface border border-border shadow-card hover:-translate-y-0.5 transition-all duration-150"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[11px] font-mono text-text-tertiary uppercase tracking-wider font-semibold">
                      {camp.brand?.name || 'Sponsor'}
                    </span>
                    <h3 className="text-base font-sans font-bold text-text-primary group-hover:text-accent-strong transition-colors">
                      {camp.name}
                    </h3>
                  </div>
                  <span className="text-xs font-mono font-bold text-accent-strong bg-accent-tint px-2.5 py-0.5 rounded-full border border-accent/20">
                    <CountUp value={camp.payment_amount} prefix="$" duration={900} />
                  </span>
                </div>

                <p className="text-xs text-text-secondary leading-relaxed line-clamp-2 font-normal">
                  Deliverables: {camp.deliverables?.map((d) => d.title).join(', ') || '1 Video Integration'}
                </p>

                <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-text-secondary font-mono">
                  <span className="uppercase">Platform: {camp.platform}</span>
                  <span className="text-accent-strong font-bold group-hover:underline">View details →</span>
                </div>
              </Link>
            </AnimatedCard>
          ))}
        </AnimatedCardGrid>
      </StaggerItem>
    </StaggerContainer>
  );
}
