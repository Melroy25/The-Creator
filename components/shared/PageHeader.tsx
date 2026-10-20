import React from 'react';
import { cn } from '@/lib/utils';

export interface PageHeaderProps {
  title: string;
  purpose: string;
  badge?: string;
  badgeVariant?: 'primary' | 'cyan' | 'amber' | 'emerald';
  actions?: React.ReactNode;
  className?: string;
}

export function PageHeader({
  title,
  purpose,
  badge,
  badgeVariant = 'primary',
  actions,
  className,
}: PageHeaderProps) {
  const badgeStyles = {
    primary: 'bg-indigo-50 text-indigo-600 border-indigo-200/80',
    cyan: 'bg-sky-50 text-sky-700 border-sky-200/80',
    amber: 'bg-amber-50 text-amber-800 border-amber-200/80',
    emerald: 'bg-emerald-50 text-emerald-700 border-emerald-200/80',
  };

  return (
    <header className={cn('flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 pt-1', className)}>
      <div className="space-y-1.5 max-w-2xl">
        {badge && (
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border shadow-sm', badgeStyles[badgeVariant])}>
              {badge}
            </span>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-[#1E2337]">
          {title}
        </h1>
        <p className="text-sm md:text-base text-[#64748B] font-medium leading-relaxed">
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
