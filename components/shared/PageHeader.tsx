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
    primary: 'bg-primary/10 text-primary border-primary/25',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
    amber: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    emerald: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
  };

  return (
    <header className={cn('flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 pt-1', className)}>
      <div className="space-y-1.5 max-w-2xl">
        {badge && (
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-[10px] font-mono font-bold tracking-widest uppercase px-2.5 py-0.5 rounded-full border', badgeStyles[badgeVariant])}>
              {badge}
            </span>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white font-sans">
          {title}
        </h1>
        <p className="text-sm md:text-base text-slate-400 font-normal leading-relaxed">
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
