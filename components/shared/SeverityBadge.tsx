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
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-400" />,
      style: 'bg-rose-500/20 text-rose-300 border-rose-500/40 font-bold',
    },
    high: {
      label: 'HIGH RISK',
      icon: <AlertCircle className="w-3.5 h-3.5 text-orange-400" />,
      style: 'bg-orange-500/15 text-orange-300 border-orange-500/35 font-semibold',
    },
    medium: {
      label: 'MEDIUM',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,
      style: 'bg-amber-500/15 text-amber-300 border-amber-500/30 font-medium',
    },
    low: {
      label: 'LOW',
      icon: <Info className="w-3.5 h-3.5 text-slate-400" />,
      style: 'bg-slate-500/15 text-slate-300 border-slate-500/25 font-normal',
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
        'inline-flex items-center font-mono rounded-full border uppercase tracking-wider select-none',
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
