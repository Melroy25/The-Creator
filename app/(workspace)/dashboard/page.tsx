import React from 'react';
import {
  PageHeader,
  StatTile,
  GlassCard,
  PrimaryButton,
  StatusChip,
  RevenueChartCard,
} from '@/components/shared';
import { Calendar, AlertCircle, AlertTriangle, Play, Sparkles, ArrowRight, History } from 'lucide-react';
import { getDashboardMetrics } from '@/lib/data';
import Link from 'next/link';

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* 1. Greeting & One-Line Briefing */}
      <PageHeader
        title="Good morning, Marcus"
        purpose="Today: 3 tasks due, 1 approval overdue. Editor Maya has an overlap collision on Wednesday."
        badge="Command Center"
        phaseBadge="Phase A Foundation Shell"
        actions={
          <PrimaryButton icon={<Play className="w-4 h-4 fill-white" />}>
            Start Daily Focus
          </PrimaryButton>
        }
      />

      {/* 2. Three Big Metric Tiles (Matching Stitch Screen 0) */}
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

      {/* 3. Wharf Revenue Area Chart & Honest Money Strip */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8">
          <RevenueChartCard />
        </div>

        <div className="lg:col-span-4 space-y-4">
          <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-card">
            <h3 className="font-headline font-bold text-base text-text-primary">Honest Money Strip</h3>
            <p className="text-xs text-text-secondary">
              Strict separation: unreceived money is never counted as cash in hand.
            </p>

            <div className="space-y-3 pt-2">
              <div className="p-3 rounded-xl bg-surface-inset border border-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-text-secondary uppercase">Received</span>
                  <p className="font-mono text-xl font-bold text-status-done-text">$48,250</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-status-done-bg text-status-done-text border border-status-done-border font-bold">
                  SETTLED
                </span>
              </div>

              <div className="p-3 rounded-xl bg-surface-inset border border-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-text-secondary uppercase">Waiting</span>
                  <p className="font-mono text-xl font-bold text-accent-strong">$15,250</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-accent-tint text-accent-strong border border-accent/20 font-bold">
                  INVOICED
                </span>
              </div>

              <div className="p-3 rounded-xl bg-surface-inset border border-border flex items-center justify-between">
                <div>
                  <span className="text-[11px] font-mono text-text-secondary uppercase">Expected</span>
                  <p className="font-mono text-xl font-bold text-text-primary">$31,000</p>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-surface text-text-tertiary border border-border font-bold">
                  PROJECTED
                </span>
              </div>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* 4. Next 5 Deadlines Priority Queue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-headline font-bold text-text-primary tracking-tight">Next 5 Deadlines</h2>
          <span className="text-xs font-mono font-semibold text-text-tertiary uppercase tracking-wider">
            Priority Queue
          </span>
        </div>

        <GlassCard className="p-4 space-y-3 bg-surface border border-border shadow-card">
          {metrics.nextDeadlines.map((task) => (
            <div
              key={task.id}
              className="p-3.5 rounded-xl flex items-center justify-between bg-surface-inset border border-border hover:bg-surface-inset/80 transition-all"
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

      {/* 5. Top Recommendation Banner */}
      <GlassCard className="p-6 rounded-2xl border border-border bg-surface relative overflow-hidden shadow-card">
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
            <p className="text-base text-text-primary font-semibold leading-relaxed">
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

      {/* 6. Recent Changes & Undo History (Reserved Layout per Decision 1, wired in Phase D) */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <History className="w-4 h-4 text-text-secondary" />
            <h3 className="font-headline font-bold text-lg text-text-primary tracking-tight">Recent Changes & Audit History</h3>
          </div>
          <span className="text-[10px] font-mono text-text-tertiary bg-surface-inset px-2 py-0.5 rounded-full border border-border">
            Wired in Phase D
          </span>
        </div>

        <GlassCard className="p-6 rounded-2xl bg-surface border border-border text-center space-y-2 shadow-card">
          <p className="text-xs text-text-secondary max-w-md mx-auto">
            Audit trail records every approved timeline shift with one-click Undo capability. Full timeline diff drawer activates when changes occur in the Simulator.
          </p>
        </GlassCard>
      </section>
    </div>
  );
}
