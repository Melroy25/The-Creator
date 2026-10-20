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

      {/* 2. Three Big Metric Tiles (Warm Editorial Studio) */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatTile
          title="Due Today"
          value={metrics.dueTodayCount}
          variant="blue"
          description="2 script reviews and 1 sponsor invoice."
          icon={<Calendar className="w-5 h-5" />}
        />
        <StatTile
          title="Overdue"
          value={metrics.overdueCount}
          variant="rose"
          description="Brand B script approval pending review."
          icon={<AlertCircle className="w-5 h-5" />}
        />
        <StatTile
          title="At Risk"
          value={metrics.atRiskCount}
          variant="amber"
          description="Editor schedule overlaps on Wednesday afternoon."
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </section>

      {/* 3. Next 5 Deadlines Priority Queue */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-headline font-bold text-[#1F1F23] tracking-tight">Next 5 Deadlines</h2>
          <span className="text-xs font-mono font-semibold text-[#9A9384] uppercase tracking-wider">
            Priority Queue
          </span>
        </div>

        <GlassCard className="p-4 space-y-3 bg-[#FCFBF7]">
          {metrics.nextDeadlines.map((task) => (
            <div
              key={task.id}
              className="p-3.5 rounded-xl flex items-center justify-between bg-[#FAF6EA] border border-[#EDE6D3] hover:bg-[#F4EFE0] transition-all"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <StatusChip status={task.status as any} size="sm" />
                <span className="text-sm font-semibold text-[#1F1F23] truncate">
                  {task.title}
                </span>
              </div>
              <span className="text-xs font-mono text-[#6B6558] shrink-0 font-medium">
                {task.due_date ? new Date(task.due_date).toLocaleDateString([], { month: 'short', day: 'numeric' }) : 'Flexible'}
              </span>
            </div>
          ))}
        </GlassCard>
      </section>

      {/* 4. Top Recommendation Banner */}
      <GlassCard className="p-6 rounded-2xl border-[#EDE6D3] bg-[#FCFBF7] relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#FBEFC2] flex items-center justify-center text-[#875C05] border border-[#F7E19D]">
                <Sparkles className="w-3.5 h-3.5" />
              </span>
              <span className="text-xs font-mono uppercase tracking-wider text-[#875C05] font-bold">
                Top Recommendation
              </span>
            </div>
            <p className="text-base text-[#1F1F23] font-semibold leading-relaxed">
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
      <GlassCard className="p-6 rounded-2xl bg-[#FCFBF7]">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 divide-y sm:divide-y-0 sm:divide-x divide-[#EDE6D3]">
          <div className="flex flex-col sm:items-center pt-2 sm:pt-0">
            <span className="text-xs font-semibold text-[#6B6558] uppercase tracking-wider">Received</span>
            <span className="font-mono text-2xl text-[#1E6B52] font-bold mt-1">$48,250</span>
          </div>
          <div className="flex flex-col sm:items-center pt-4 sm:pt-0">
            <span className="text-xs font-semibold text-[#6B6558] uppercase tracking-wider">Waiting</span>
            <span className="font-mono text-2xl text-[#875C05] font-bold mt-1">$16,500</span>
          </div>
          <div className="flex flex-col sm:items-center pt-4 sm:pt-0">
            <span className="text-xs font-semibold text-[#6B6558] uppercase tracking-wider">Expected</span>
            <span className="font-mono text-2xl text-[#1D6FB8] font-bold mt-1">$24,000</span>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
