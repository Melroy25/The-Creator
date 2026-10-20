import React from 'react';
import { cn } from '@/lib/utils';
import { ShieldAlert, AlertTriangle, AlertCircle, Info } from 'lucide-react';
import { RiskSeverity } from '@/lib/types';

export interface SeverityBadgeProps {
  severity: RiskSeverity;
  className?: string;
  size?: 'sm' | 'md';
}

export function SeverityBadge({ severity, className, size = 'md' }: SeverityBadgeProps) {
  const configs: Record<RiskSeverity, { label: string; icon: React.ReactNode; style: string }> = {
    critical: {
      label: 'CRITICAL',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-status-overdue-text" />,
      style: 'bg-status-overdue-bg text-status-overdue-text border-status-overdue-border font-bold',
    },
    high: {
      label: 'HIGH RISK',
      icon: <AlertCircle className="w-3.5 h-3.5 text-status-progress-text" />,
      style: 'bg-status-progress-bg text-status-progress-text border-status-progress-border font-semibold',
    },
    medium: {
      label: 'MEDIUM',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-status-risk-text" />,
      style: 'bg-status-risk-bg text-status-risk-text border-status-risk-border font-medium',
    },
    low: {
      label: 'LOW',
      icon: <Info className="w-3.5 h-3.5 text-status-idle-text" />,
      style: 'bg-status-idle-bg text-status-idle-text border-status-idle-border font-normal',
    },
  };

  const current = configs[severity] || configs.low;

  const sizeClasses = {
    sm: 'text-[10px] px-2 py-0.5 gap-1',
    md: 'text-xs px-2.5 py-1 gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-mono rounded-full border uppercase tracking-wider select-none shadow-sm',
        current.style,
        sizeClasses[size],
        className
      )}
    >
      {current.icon}
      <span>{current.label}</span>
    </span>
  );
}
