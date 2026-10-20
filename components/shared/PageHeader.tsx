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
    primary: 'bg-[#FBEFC2] text-[#875C05] border-[#F7E19D]',
    cyan: 'bg-[#E5F0FC] text-[#1D6FB8] border-[#C5DCFA]',
    amber: 'bg-[#FDF3D6] text-[#875C05] border-[#F7E19D]',
    emerald: 'bg-[#E1F6EE] text-[#1E6B52] border-[#C3E8DC]',
  };

  return (
    <header className={cn('flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 pt-1', className)}>
      <div className="space-y-1.5 max-w-2xl">
        {badge && (
          <div className="flex items-center gap-2 mb-1">
            <span className={cn('text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-0.5 rounded-full border shadow-[0_1px_2px_rgba(60,50,30,0.03)]', badgeStyles[badgeVariant])}>
              {badge}
            </span>
          </div>
        )}
        <h1 className="text-3xl md:text-4xl font-headline font-bold tracking-tight text-[#1F1F23]">
          {title}
        </h1>
        <p className="text-sm md:text-base text-[#6B6558] font-normal leading-relaxed">
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
