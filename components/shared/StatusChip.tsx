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
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />,
      style: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30',
    },
    in_progress: {
      text: 'In Progress',
      icon: <PlayCircle className="w-3.5 h-3.5 text-sky-400" />,
      style: 'bg-sky-500/10 text-sky-300 border-sky-500/30',
    },
    overdue: {
      text: 'Overdue',
      icon: <AlertCircle className="w-3.5 h-3.5 text-rose-400 animate-pulse" />,
      style: 'bg-rose-500/15 text-rose-300 border-rose-500/40',
    },
    blocked: {
      text: 'Blocked',
      icon: <Lock className="w-3.5 h-3.5 text-red-400" />,
      style: 'bg-red-500/15 text-red-300 border-red-500/40',
    },
    at_risk: {
      text: 'At Risk',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />,
      style: 'bg-amber-500/15 text-amber-300 border-amber-500/35',
    },
    up_next: {
      text: 'Up Next',
      icon: <Clock className="w-3.5 h-3.5 text-slate-400" />,
      style: 'bg-slate-500/15 text-slate-300 border-slate-500/30',
    },
    not_started: {
      text: 'Not Started',
      icon: <Clock className="w-3.5 h-3.5 text-slate-400" />,
      style: 'bg-slate-800/60 text-slate-400 border-slate-700/50',
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
