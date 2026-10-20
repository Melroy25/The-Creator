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
      icon: <ShieldAlert className="w-3.5 h-3.5 text-[#A31F2A]" />,
      style: 'bg-[#FDE5E7] text-[#A31F2A] border-[#F8BAC1] font-bold',
    },
    high: {
      label: 'HIGH RISK',
      icon: <AlertCircle className="w-3.5 h-3.5 text-[#9C4221]" />,
      style: 'bg-[#FDECDA] text-[#9C4221] border-[#F8D2BA] font-semibold',
    },
    medium: {
      label: 'MEDIUM',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#875C05]" />,
      style: 'bg-[#FDF3D6] text-[#875C05] border-[#F7E19D] font-medium',
    },
    low: {
      label: 'LOW',
      icon: <Info className="w-3.5 h-3.5 text-[#6B6558]" />,
      style: 'bg-[#F4EFE0] text-[#6B6558] border-[#EDE6D3] font-normal',
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
        'inline-flex items-center font-mono rounded-full border uppercase tracking-wider select-none shadow-[0_1px_2px_rgba(60,50,30,0.03)]',
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
