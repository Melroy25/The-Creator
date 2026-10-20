'use client';

import React, { useEffect, useState } from 'react';
import {
  PageHeader,
  StatTile,
  GlassCard,
  PrimaryButton,
  StatusChip,
  RevenueChartCard,
  StaggerContainer,
  StaggerItem,
  CountUp,
} from '@/components/shared';
import { Calendar, AlertCircle, AlertTriangle, Play, Sparkles, ArrowRight, History } from 'lucide-react';
import { getDashboardMetrics, getInitialDashboardMetrics } from '@/lib/data';
import Link from 'next/link';

export default function DashboardPage() {
  const [metrics, setMetrics] = useState<any>(getInitialDashboardMetrics);

  useEffect(() => {
    getDashboardMetrics().then(setMetrics);
  }, []);

  return (
    <StaggerContainer className="space-y-8 pb-12 font-sans">
      {/* 1. Greeting & One-Line Briefing */}
      <StaggerItem>
        <PageHeader
          title="Good morning, Noor"
          purpose="Today: 3 tasks due, 1 approval overdue. Editor Maya has an overlap collision on Wednesday."
          badge="Command Center"
          actions={
            <PrimaryButton icon={<Play className="w-3.5 h-3.5 fill-current" />}>
              Start Daily Focus
            </PrimaryButton>
          }
        />
      </StaggerItem>

      {/* 2. Three Big Metric Tiles (Matching Stitch Screen 0) */}
      <StaggerItem>
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatTile
            title="Due Today"
            value={metrics.dueTodayCount}
            variant="blue"
            description="2 script reviews and 1 sponsor invoice due today."
            icon={<Calendar className="w-5 h-5" />}
          />
          <StatTile
            title="Overdue"
            value={metrics.overdueCount}
            variant="rose"
            description="Pixel & Co script approval pending review (>48h)."
            icon={<AlertCircle className="w-5 h-5" />}
          />
          <StatTile
            title="At Risk"
            value={metrics.atRiskCount}
            variant="amber"
            description="Editor Maya schedule overlap on Wednesday afternoon."
            icon={<AlertTriangle className="w-5 h-5" />}
          />
        </section>
      </StaggerItem>

      {/* 3. Wharf Revenue Area Chart & Honest Money Strip */}
      <StaggerItem>
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8">
            <RevenueChartCard />
          </div>

          <div className="lg:col-span-4 space-y-4">
            <GlassCard className="p-6 rounded-3xl bg-surface border border-border space-y-4 shadow-card">
              <h3 className="font-sans font-bold text-base text-text-primary">Honest Money Strip</h3>
              <p className="text-xs text-text-secondary leading-relaxed">
                Strict separation: unreceived money is never counted as cash in hand.
              </p>

              <div className="space-y-3 pt-2">
                <div className="p-3.5 rounded-2xl bg-surface-inset border border-border flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-text-secondary uppercase">Received</span>
                    <p className="font-mono text-xl font-bold text-status-done-text">
                      <CountUp value={48250} prefix="$" duration={900} />
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-status-done-bg text-status-done-text border border-status-done-border font-bold">
                    SETTLED
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-inset border border-border flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-text-secondary uppercase">Waiting</span>
                    <p className="font-mono text-xl font-bold text-accent-strong">
                      <CountUp value={15250} prefix="$" duration={900} />
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-tint text-accent-strong border border-accent/20 font-bold">
                    INVOICED
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-surface-inset border border-border flex items-center justify-between">
                  <div>
                    <span className="text-[11px] font-mono text-text-secondary uppercase">Expected</span>
                    <p className="font-mono text-xl font-bold text-text-primary">
                      <CountUp value={31000} prefix="$" duration={900} />
                    </p>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface text-text-tertiary border border-border font-bold">
                    PROJECTED
                  </span>
                </div>
              </div>
            </GlassCard>
          </div>
        </section>
      </StaggerItem>

      {/* 4. Next 5 Deadlines Priority Queue */}
      <StaggerItem>
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-sans font-bold text-text-primary tracking-tight">Next 5 Deadlines</h2>
            <span className="text-xs font-mono font-semibold text-text-tertiary uppercase tracking-wider">
              Priority Queue
            </span>
          </div>

          <GlassCard className="p-4 space-y-3 bg-surface border border-border rounded-3xl shadow-card">
            {metrics.nextDeadlines.map((task: any) => (
              <div
                key={task.id}
                className="p-3.5 rounded-2xl flex items-center justify-between bg-surface-inset border border-border hover:bg-surface-inset/80 transition-all"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <StatusChip status={task.status as any} size="sm" />
                  <span className="text-sm font-semibold text-text-primary truncate">
                    {task.title}
                  </span>
                </div>
                <span className="text-xs font-mono text-text-secondary shrink-0 font-medium">
                  {task.due_date ? new Date(task.due_date).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Flexible'}
                </span>
              </div>
            ))}
          </GlassCard>
        </section>
      </StaggerItem>

      {/* 5. Top Recommendation Banner */}
      <StaggerItem>
        <GlassCard className="p-6 rounded-3xl border border-border bg-surface relative overflow-hidden shadow-card hover:-translate-y-0.5 transition-all duration-150">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-accent-tint flex items-center justify-center text-accent-strong border border-accent/20">
                  <Sparkles className="w-3.5 h-3.5" />
                </span>
                <span className="text-xs font-mono uppercase tracking-wider text-accent-strong font-bold">
                  Top Recommendation
                </span>
              </div>
              <p className="text-sm sm:text-base text-text-primary font-semibold leading-relaxed">
                {metrics.topRecommendation.text}
              </p>
            </div>
            <Link href="/simulator">
              <PrimaryButton size="md" icon={<ArrowRight className="w-4 h-4" />}>
                {metrics.topRecommendation.actionLabel}
              </PrimaryButton>
            </Link>
          </div>
        </GlassCard>
      </StaggerItem>

      {/* 6. Recent Changes & Audit History */}
      <StaggerItem>
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <History className="w-4 h-4 text-text-secondary" />
              <h3 className="font-sans font-bold text-base text-text-primary tracking-tight">Recent Changes & Audit History</h3>
            </div>
            <span className="text-[10px] font-mono text-text-tertiary bg-surface-inset px-2.5 py-0.5 rounded-full border border-border">
              Timeline Diff Engine
            </span>
          </div>

          <GlassCard className="p-6 rounded-3xl bg-surface border border-border text-center space-y-2 shadow-card">
            <p className="text-xs text-text-secondary max-w-md mx-auto leading-relaxed">
              Audit trail records every approved timeline shift with one-click Undo capability. Full timeline diff drawer activates when changes occur in the Simulator.
            </p>
          </GlassCard>
        </section>
      </StaggerItem>
    </StaggerContainer>
  );
}
