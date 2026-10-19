import React from 'react';
import { cn } from '@/lib/utils';
import { PrimaryButton } from './PrimaryButton';
import { Inbox } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  actionLabel,
  onAction,
  className,
}: EmptyStateProps) {
  return (
    <div className={cn('glass-card p-12 rounded-2xl flex flex-col items-center justify-center text-center max-w-lg mx-auto space-y-5', className)}>
      <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400 shadow-inner">
        {icon || <Inbox className="w-7 h-7" />}
      </div>

      <div className="space-y-1.5 max-w-md">
        <h3 className="text-lg font-semibold text-white tracking-tight">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed font-normal">
          {description}
        </p>
      </div>

      {actionLabel && onAction && (
        <PrimaryButton size="sm" onClick={onAction}>
          {actionLabel}
        </PrimaryButton>
      )}
    </div>
  );
}
