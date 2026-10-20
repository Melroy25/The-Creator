'use client';

import React, { useEffect, useState } from 'react';
import { PageHeader, DataTable, Column, Avatar, StaggerContainer, StaggerItem, GlassCard, CountUp } from '@/components/shared';
import { getCustomers, getInitialCustomers } from '@/lib/data';
import { Customer } from '@/lib/types';
import { Users, Mail, DollarSign, Sparkles } from 'lucide-react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<Customer[]>(getInitialCustomers);

  useEffect(() => {
    getCustomers().then(setCustomers);
  }, []);

  const totalValue = customers.reduce((sum, c) => sum + c.total_deal_value, 0);
  const activeCount = customers.filter(c => c.status === 'active').length;
  const pipelineCount = customers.filter(c => c.status === 'in_negotiation').length;

  const columns: Column<Customer>[] = [
    {
      header: 'Customer / Client Contact',
      accessorKey: 'name',
      cell: (c) => (
        <div className="flex items-center gap-3">
          <Avatar name={c.name} subtitle={c.company} size="md" />
        </div>
      ),
    },
    {
      header: 'Company & Role',
      cell: (c) => (
        <div className="space-y-0.5">
          <p className="font-semibold text-xs text-text-primary">{c.company}</p>
          <span className="text-[11px] text-text-secondary block">{c.role}</span>
        </div>
      ),
    },
    {
      header: 'Target Channel',
      cell: (c) => (
        <span className="font-mono text-xs text-text-primary font-medium">
          {c.platform}
        </span>
      ),
    },
    {
      header: 'Relationship Status',
      cell: (c) => {
        if (c.status === 'active') {
          return (
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-status-done-bg text-status-done-text border border-status-done-border font-semibold">
              Active Sponsor
            </span>
          );
        }
        if (c.status === 'in_negotiation') {
          return (
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-accent-tint text-accent-strong border border-accent/20 font-semibold">
              In Negotiation
            </span>
          );
        }
        return (
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-surface-inset text-text-tertiary border border-border font-semibold">
            Past Client
          </span>
        );
      },
    },
    {
      header: 'Portfolio Value',
      cell: (c) => (
        <span className="font-mono text-xs font-bold text-text-primary">
          ${c.total_deal_value.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Direct Email',
      cell: (c) => (
        <a
          href={`mailto:${c.email}`}
          className="inline-flex items-center gap-1.5 text-xs text-text-secondary hover:text-[var(--accent)] font-mono transition-colors"
        >
          <Mail className="w-3.5 h-3.5 text-text-tertiary" />
          <span>{c.email}</span>
        </a>
      ),
    },
  ];

  return (
    <StaggerContainer className="space-y-8 pb-12 font-sans">
      <StaggerItem>
        <PageHeader
          title="Customers & Client Directory"
          purpose="Directory of sponsor relationships, agency contacts, and brand representatives across your creative portfolio."
          badge="Records // Customers"
        />
      </StaggerItem>

      {/* Summary KPI Strip */}
      <StaggerItem>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <GlassCard className="p-4 sm:p-5 rounded-2xl border border-border bg-surface flex items-center justify-between shadow-card">
            <div>
              <span className="text-[11px] font-mono text-text-secondary uppercase">Active Brand Partners</span>
              <p className="font-mono text-2xl font-bold text-text-primary mt-1">
                <CountUp value={activeCount} duration={900} />
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-status-done-bg border border-status-done-border flex items-center justify-center text-status-done-text">
              <Users className="w-5 h-5" />
            </div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5 rounded-2xl border border-border bg-surface flex items-center justify-between shadow-card">
            <div>
              <span className="text-[11px] font-mono text-text-secondary uppercase">In Pipeline / Deals</span>
              <p className="font-mono text-2xl font-bold text-accent-strong mt-1">
                <CountUp value={pipelineCount} duration={900} />
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-accent-tint border border-accent/20 flex items-center justify-center text-accent-strong">
              <Sparkles className="w-5 h-5" />
            </div>
          </GlassCard>

          <GlassCard className="p-4 sm:p-5 rounded-2xl border border-border bg-surface flex items-center justify-between shadow-card">
            <div>
              <span className="text-[11px] font-mono text-text-secondary uppercase">Total Pipeline Value</span>
              <p className="font-mono text-2xl font-bold text-text-primary mt-1">
                <CountUp value={totalValue} prefix="$" duration={900} />
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-surface-inset border border-border flex items-center justify-center text-text-primary">
              <DollarSign className="w-5 h-5" />
            </div>
          </GlassCard>
        </div>
      </StaggerItem>

      {/* Main Customers Table */}
      <StaggerItem>
        <DataTable columns={columns} data={customers} emptyMessage="No customer records found." />
      </StaggerItem>
    </StaggerContainer>
  );
}
