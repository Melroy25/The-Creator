import React from 'react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  purpose: string;
  badge?: string;
  badgeVariant?: 'primary' | 'cyan' | 'amber' | 'emerald';
  phaseBadge?: string;
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  purpose,
  badge,
  badgeVariant = 'primary',
  phaseBadge,
  actions,
  className,
}: PageHeaderProps) {
  const badgeStyles = {
    primary: 'bg-accent-tint text-accent-strong border-accent/20',
    cyan: 'bg-accent-tint text-accent-strong border-accent/20',
    amber: 'bg-status-risk-bg text-status-risk-text border-status-risk-border',
    emerald: 'bg-status-done-bg text-status-done-text border-status-done-border',
  };

  return (
    <header className={cn('flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 pt-1', className)}>
      <div className="space-y-1.5 max-w-2xl">
        <div className="flex items-center gap-2 mb-1">
          {badge && (
            <span className={cn('text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-0.5 rounded-full border shadow-sm', badgeStyles[badgeVariant])}>
              {badge}
            </span>
          )}
          {phaseBadge && (
            <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full border border-border bg-surface-inset text-text-secondary">
              {phaseBadge}
            </span>
          )}
        </div>
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-text-primary">
          {title}
        </h1>
        <p className="text-sm md:text-base text-text-secondary font-normal leading-relaxed">
          {purpose}
        </p>
      </div>

      {actions && (
        <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
          {actions}
        </div>
      )}
    </header>
  );
}
