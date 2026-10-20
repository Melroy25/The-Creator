import React from 'react';
import {
  PageHeader,
  StatTile,
  GlassCard,
  PrimaryButton,
  StatusChip,
} from '@/components/shared';
import { Calendar, AlertCircle, AlertTriangle, Play, Sparkles, ArrowRight } from 'lucide-react';
import { getDashboardMetrics } from '@/lib/data';
import Link from 'next/link';

export default async function DashboardPage() {
  const metrics = await getDashboardMetrics();

  return (
    <div className="space-y-8 pb-12 font-body">
      {/* 1. Greeting & One-Line Briefing */}
      <PageHeader
        title="Good morning, Marcus"
        purpose="Today: 3 tasks, 1 approval overdue. Editor Leo has an overlap risk on Wednesday."
        badge="Command Center"
        badgeVariant="primary"
        actions={
          <PrimaryButton icon={<Play className="w-4 h-4 fill-white" />}>
            Start Daily Focus
          </PrimaryButton>
        }
      />

      {/* 2. Three Big Metric Tiles Only (From Stitch Design) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatTile
          title="Due Today"
          value={metrics.dueTodayCount}
          variant="cyan"
          description="2 script reviews and 1 sponsor invoice."
          icon={<Calendar className="w-5 h-5 text-[#0284C7]" />}
        />
        <StatTile
          title="Overdue"
          value={metrics.overdueCount}
          variant="rose"
          description="Brand B script approval pending review."
          icon={<AlertCircle className="w-5 h-5 text-[#EF4444]" />}
        />
        <StatTile
          title="At Risk"
          value={metrics.atRiskCount}
          variant="amber"
          description="Editor schedule overlaps on Wednesday afternoon."
          icon={<AlertTriangle className="w-5 h-5 text-[#D97706]" />}
        />
      </section>

      {/* 3. Next 5 Deadlines Priority Queue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-headline font-bold text-[#1E2337] tracking-tight">Next 5 Deadlines</h2>
          <span className="text-xs font-mono font-semibold text-[#94A3B8] uppercase tracking-wider">
            Priority Queue
          </span>
        </div>

        <GlassCard className="p-4 space-y-3">
          {metrics.nextDeadlines.map((task) => (
            <div
              key={task.id}
              className="silk-inset p-3.5 rounded-xl flex items-center justify-between hover:bg-white/80 transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <StatusChip status={task.status as any} size="sm" />
                <span className="text-sm font-semibold text-[#1E2337] truncate">
                  {task.title}
                </span>
              </div>
              <span className="text-xs font-mono text-[#64748B] shrink-0 font-medium">
                {task.due_date ? new Date(task.due_date).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Flexible'}
              </span>
            </div>
          ))}
        </GlassCard>
      </section>

      {/* 4. Top Recommendation Banner */}
      <GlassCard className="p-6 rounded-2xl border-indigo-200/80 relative overflow-hidden bg-gradient-to-r from-indigo-50/40 to-transparent">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1 max-w-2xl">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-600" />
              <span className="text-xs font-mono uppercase tracking-wider text-indigo-600 font-bold">
                Top Recommendation
              </span>
            </div>
            <p className="text-base text-[#1E2337] font-semibold leading-relaxed">
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

      {/* 5. Honest Money Strip */}
      <GlassCard className="p-6 rounded-2xl">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#E2E6F0]">
          <div className="flex flex-col sm:items-center pt-2 sm:pt-0">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Received</span>
            <span className="font-mono text-2xl text-[#10B981] font-extrabold mt-1">$48,250</span>
          </div>
          <div className="flex flex-col sm:items-center pt-4 sm:pt-0">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Waiting</span>
            <span className="font-mono text-2xl text-[#D97706] font-extrabold mt-1">$16,500</span>
          </div>
          <div className="flex flex-col sm:items-center pt-4 sm:pt-0">
            <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">Expected</span>
            <span className="font-mono text-2xl text-[#0284C7] font-extrabold mt-1">$24,000</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
