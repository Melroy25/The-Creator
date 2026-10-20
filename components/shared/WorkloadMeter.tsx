import React from 'react';
import { cn } from '@/lib/utils';

export interface WorkloadMeterProps {
  personName: string;
  role: string;
  allocatedHours: number;
  capacityHours: number;
  className?: string;
}

export function WorkloadMeter({
  personName,
  role,
  allocatedHours,
  capacityHours,
  className,
}: WorkloadMeterProps) {
  const percentage = Math.round((allocatedHours / (capacityHours || 1)) * 100);

  let band: 'healthy' | 'tight' | 'overloaded' = 'healthy';
  let badgeStyle = 'bg-status-done-bg text-status-done-text border-status-done-border';
  let barColor = 'bg-accent';

  if (percentage > 100) {
    band = 'overloaded';
    badgeStyle = 'bg-status-overdue-bg text-status-overdue-text border-status-overdue-border';
    barColor = 'bg-status-overdue-text';
  } else if (percentage >= 80) {
    band = 'tight';
    badgeStyle = 'bg-status-risk-bg text-status-risk-text border-status-risk-border';
    barColor = 'bg-accent';
  }

  const bandLabels = {
    healthy: 'Healthy (<80%)',
    tight: 'Tight (80–100%)',
    overloaded: 'Overloaded (>100%)',
  };

  return (
    <div className={cn('p-4 rounded-xl bg-surface border border-border space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="space-y-0.5">
          <h4 className="text-xs font-headline font-bold text-text-primary">{personName}</h4>
          <span className="text-[11px] text-text-secondary capitalize font-normal">{role}</span>
        </div>
        <span className={cn('text-[10px] font-mono font-bold px-2 py-0.5 rounded-full border shadow-sm', badgeStyle)}>
          {percentage}% • {bandLabels[band]}
        </span>
      </div>

      <div className="space-y-1">
        <div className="flex items-center justify-between text-[11px] font-mono text-text-secondary">
          <span>{allocatedHours}h allocated</span>
          <span>{capacityHours}h capacity</span>
        </div>
        <div className="w-full h-2 rounded-full bg-surface-inset border border-border overflow-hidden p-0.5 shadow-inset">
          <div
            className={cn('h-full rounded-full transition-all duration-300', barColor)}
            style={{ width: `${Math.min(percentage, 100)}%` }}
          />
        </div>
      </div>
    </div>
  );
}
