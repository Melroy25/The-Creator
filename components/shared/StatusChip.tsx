import React from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, Clock, AlertCircle, AlertTriangle, Lock, PlayCircle } from 'lucide-react';

export type StatusChipType = 'done' | 'in_progress' | 'overdue' | 'blocked' | 'at_risk' | 'up_next' | 'not_started';

export interface StatusChipProps {
  status: StatusChipType;
  label?: string;
  className?: string;
  size?: 'sm' | 'md';
}

export function StatusChip({ status, label, className, size = 'md' }: StatusChipProps) {
  const configs: Record<StatusChipType, { text: string; icon: React.ReactNode; dotColor: string; style: string }> = {
    done: {
      text: 'Done',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-[#1E6B52]" />,
      dotColor: 'bg-[#1E6B52]',
      style: 'bg-[#E1F6EE] text-[#1E6B52] border border-[#C3E8DC]',
    },
    in_progress: {
      text: 'In Progress',
      icon: <PlayCircle className="w-3.5 h-3.5 text-[#9C4221]" />,
      dotColor: 'bg-[#9C4221]',
      style: 'bg-[#FDECDA] text-[#9C4221] border border-[#F8D2BA]',
    },
    overdue: {
      text: 'Overdue',
      icon: <AlertCircle className="w-3.5 h-3.5 text-[#A31F2A]" />,
      dotColor: 'bg-[#A31F2A]',
      style: 'bg-[#FDE5E7] text-[#A31F2A] border border-[#F8BAC1]',
    },
    blocked: {
      text: 'Blocked',
      icon: <Lock className="w-3.5 h-3.5 text-[#A31F2A]" />,
      dotColor: 'bg-[#A31F2A]',
      style: 'bg-[#FDE5E7] text-[#A31F2A] border border-[#F8BAC1]',
    },
    at_risk: {
      text: 'At Risk',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-[#875C05]" />,
      dotColor: 'bg-[#875C05]',
      style: 'bg-[#FDF3D6] text-[#875C05] border border-[#F7E19D]',
    },
    up_next: {
      text: 'Up Next',
      icon: <Clock className="w-3.5 h-3.5 text-[#6B6558]" />,
      dotColor: 'bg-[#9A9384]',
      style: 'bg-[#F4EFE0] text-[#6B6558] border border-[#EDE6D3]',
    },
    not_started: {
      text: 'Not Started',
      icon: <Clock className="w-3.5 h-3.5 text-[#6B6558]" />,
      dotColor: 'bg-[#9A9384]',
      style: 'bg-[#F4EFE0] text-[#6B6558] border border-[#EDE6D3]',
    },
  };

  const current = configs[status] || configs.not_started;
  const displayText = label || current.text;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1.5',
    md: 'text-xs px-2.5 py-1 gap-2',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-semibold rounded-full select-none shadow-[0_1px_2px_rgba(60,50,30,0.03)]',
        current.style,
        sizeClasses[size],
        className
      )}
    >
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', current.dotColor)} />
      <span>{displayText}</span>
    </span>
  );
}
