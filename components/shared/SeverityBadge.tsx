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
      icon: <ShieldAlert className="w-3.5 h-3.5 text-rose-600" />,
      style: 'bg-rose-50 text-rose-700 border-rose-200 font-bold',
    },
    high: {
      label: 'HIGH RISK',
      icon: <AlertCircle className="w-3.5 h-3.5 text-orange-600" />,
      style: 'bg-orange-50 text-orange-800 border-orange-200 font-semibold',
    },
    medium: {
      label: 'MEDIUM',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
      style: 'bg-amber-50 text-amber-800 border-amber-200 font-medium',
    },
    low: {
      label: 'LOW',
      icon: <Info className="w-3.5 h-3.5 text-slate-500" />,
      style: 'bg-slate-100 text-slate-700 border-slate-200 font-normal',
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
