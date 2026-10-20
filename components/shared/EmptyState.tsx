import React from 'react';
import { cn } from '@/lib/utils';
import { FileQuestion } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'p-12 text-center flex flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed border-border bg-surface shadow-card',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-accent-tint border border-accent/20 flex items-center justify-center text-accent-strong shadow-sm">
        {icon || <FileQuestion className="w-6 h-6" />}
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="font-headline font-bold text-base text-text-primary">{title}</h3>
        <p className="text-xs text-text-secondary font-normal leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
