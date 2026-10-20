'use client';

import React, { useEffect, useState } from 'react';
import { PageHeader, GlassCard, DataTable, StatusChip, Column } from '@/components/shared';
import { getInvoices } from '@/lib/data';
import { Invoice } from '@/lib/types';
import { Receipt, DollarSign, Clock, AlertTriangle } from 'lucide-react';

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);

  useEffect(() => {
    getInvoices().then(setInvoices);
  }, []);

  const receivedTotal = invoices
    .filter((i) => i.status === 'paid')
    .reduce((sum, i) => sum + i.amount, 0);

  const waitingTotal = invoices
    .filter((i) => i.status === 'sent')
    .reduce((sum, i) => sum + i.amount, 0);

  const overdueTotal = invoices
    .filter((i) => i.status === 'overdue')
    .reduce((sum, i) => sum + i.amount, 0);

  const columns: Column<Invoice>[] = [
    {
      header: 'Invoice #',
      accessorKey: 'invoice_number',
      cell: (inv) => (
        <span className="font-mono text-xs font-bold text-text-primary">
          {inv.invoice_number}
        </span>
      ),
    },
    {
      header: 'Campaign / Deal',
      cell: (inv) => (
        <div className="space-y-0.5">
          <p className="font-semibold text-xs text-text-primary">{inv.campaign?.name || 'Sponsor Deliverable'}</p>
          <span className="text-[10px] text-text-tertiary block font-mono">Terms: Net-30</span>
        </div>
      ),
    },
    {
      header: 'Amount',
      cell: (inv) => (
        <span className="font-mono text-xs font-bold text-text-primary">
          ${inv.amount.toLocaleString()}
        </span>
      ),
    },
    {
      header: 'Due Date',
      cell: (inv) => (
        <span className="font-mono text-xs text-text-secondary">
          {new Date(inv.due_date).toLocaleDateString([], { month: 'short', day: 'numeric', year: 'numeric' })}
        </span>
      ),
    },
    {
      header: 'Status',
      cell: (inv) => {
        const statusMap: Record<string, any> = {
          paid: 'done',
          sent: 'in_progress',
          overdue: 'overdue',
          draft: 'not_started',
        };
        return <StatusChip status={statusMap[inv.status] || 'up_next'} label={inv.status.toUpperCase()} size="sm" />;
      },
    },
    {
      header: 'Notes',
      cell: (inv) => (
        <span className="text-xs text-text-secondary font-normal truncate max-w-[200px] block">
          {inv.notes || 'Standard Net-30 terms'}
        </span>
      ),
    },
  ];

  return (
    <div className="space-y-8 pb-12 font-body">
      <PageHeader
        title="Invoices & Receivables"
        purpose="Honest tracking of sponsor billing milestones, verified bank deposits, and overdue accounts."
        badge="Records // Invoices"
        phaseBadge="Read-Only Seed Data"
      />

      {/* 3 Summary Cards: Received, Waiting, Expected/Overdue */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-2 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-text-secondary font-semibold">Received (Settled)</span>
            <div className="w-8 h-8 rounded-full bg-status-done-bg text-status-done-text flex items-center justify-center border border-status-done-border">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-status-done-text">
            ${receivedTotal.toLocaleString()}
          </p>
          <span className="text-[11px] text-text-tertiary block">Deposited in verified studio bank account</span>
        </GlassCard>

        <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-2 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-text-secondary font-semibold">Waiting (Sent)</span>
            <div className="w-8 h-8 rounded-full bg-accent-tint text-accent-strong flex items-center justify-center border border-accent/20">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-accent-strong">
            ${waitingTotal.toLocaleString()}
          </p>
          <span className="text-[11px] text-text-tertiary block">Invoiced milestones awaiting payment</span>
        </GlassCard>

        <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-2 shadow-card">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase text-text-secondary font-semibold">Overdue (Past SLA)</span>
            <div className="w-8 h-8 rounded-full bg-status-overdue-bg text-status-overdue-text flex items-center justify-center border border-status-overdue-border">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <p className="font-mono text-3xl font-bold text-status-overdue-text">
            ${overdueTotal.toLocaleString()}
          </p>
          <span className="text-[11px] text-status-overdue-text font-medium block">
            1 invoice overdue (Lumen Skincare past sprint)
          </span>
        </GlassCard>
      </div>

      {/* Invoices Data Table */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-headline font-bold text-lg text-text-primary tracking-tight">Invoice Ledger</h3>
          <span className="text-xs font-mono text-text-tertiary">3 records</span>
        </div>

        <DataTable columns={columns} data={invoices} />
      </div>
    </div>
  );
}
