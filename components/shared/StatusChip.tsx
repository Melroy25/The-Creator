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
  const configs: Record<StatusChipType, { text: string; icon: React.ReactNode; style: string }> = {
    done: {
      text: 'Done',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />,
      style: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
    },
    in_progress: {
      text: 'In Progress',
      icon: <PlayCircle className="w-3.5 h-3.5 text-indigo-600" />,
      style: 'bg-indigo-50 text-indigo-700 border-indigo-200/80',
    },
    overdue: {
      text: 'Overdue',
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-600 animate-pulse" />,
      style: 'bg-rose-50 text-rose-700 border-rose-200/80',
    },
    blocked: {
      text: 'Blocked',
      icon: <Lock className="w-3.5 h-3.5 text-red-600" />,
      style: 'bg-red-50 text-red-700 border-red-200/80',
    },
    at_risk: {
      text: 'At Risk',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />,
      style: 'bg-amber-50 text-amber-800 border-amber-200/80',
    },
    up_next: {
      text: 'Up Next',
      icon: <Clock className="w-3.5 h-3.5 text-slate-600" />,
      style: 'bg-slate-100 text-slate-700 border-slate-200/80',
    },
    not_started: {
      text: 'Not Started',
      icon: <Clock className="w-3.5 h-3.5 text-slate-500" />,
      style: 'bg-slate-100 text-slate-600 border-slate-200/80',
    },
  };

  const current = configs[status] || configs.not_started;
  const displayText = label || current.text;

  const sizeClasses = {
    sm: 'text-[11px] px-2 py-0.5 gap-1',
    md: 'text-xs px-3 py-1 gap-1.5',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-full border shadow-sm select-none',
        current.style,
        sizeClasses[size],
        className
      )}
    >
      {current.icon}
      <span>{displayText}</span>
    </span>
  );
}
