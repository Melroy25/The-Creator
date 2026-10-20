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
  const configs: Record<StatusChipType, { text: string; icon: React.ReactNode; style: string; dot: string }> = {
    done: {
      text: 'Done',
      icon: <CheckCircle2 className="w-3 h-3 text-status-done-text" />,
      style: 'bg-status-done-bg text-status-done-text border-status-done-border',
      dot: 'bg-status-done-dot',
    },
    in_progress: {
      text: 'In Progress',
      icon: <PlayCircle className="w-3 h-3 text-status-progress-text" />,
      style: 'bg-status-progress-bg text-status-progress-text border-status-progress-border',
      dot: 'bg-status-progress-dot',
    },
    overdue: {
      text: 'Overdue',
      icon: <AlertCircle className="w-3 h-3 text-status-overdue-text" />,
      style: 'bg-status-overdue-bg text-status-overdue-text border-status-overdue-border',
      dot: 'bg-status-overdue-dot',
    },
    blocked: {
      text: 'Blocked',
      icon: <Lock className="w-3 h-3 text-status-overdue-text" />,
      style: 'bg-status-overdue-bg text-status-overdue-text border-status-overdue-border',
      dot: 'bg-status-overdue-dot',
    },
    at_risk: {
      text: 'At Risk',
      icon: <AlertTriangle className="w-3 h-3 text-status-risk-text" />,
      style: 'bg-status-risk-bg text-status-risk-text border-status-risk-border',
      dot: 'bg-status-risk-dot',
    },
    up_next: {
      text: 'Up Next',
      icon: <Clock className="w-3 h-3 text-status-idle-text" />,
      style: 'bg-status-idle-bg text-status-idle-text border-status-idle-border',
      dot: 'bg-status-idle-dot',
    },
    not_started: {
      text: 'Not Started',
      icon: <Clock className="w-3 h-3 text-status-idle-text" />,
      style: 'bg-status-idle-bg text-status-idle-text border-status-idle-border',
      dot: 'bg-status-idle-dot',
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
        'inline-flex items-center font-semibold rounded-full select-none border shadow-sm',
        current.style,
        sizeClasses[size],
        className
      )}
    >
      {current.icon}
      <span className={cn('w-1.5 h-1.5 rounded-full shrink-0', current.dot)} />
      <span>{displayText}</span>
    </span>
  );
}
