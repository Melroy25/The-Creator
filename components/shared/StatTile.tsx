import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';

export interface StatTileProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  variant?: 'cyan' | 'rose' | 'amber' | 'emerald' | 'indigo';
  className?: string;
  onClick?: () => void;
}

export function StatTile({
  title,
  value,
  description,
  icon,
  variant = 'indigo',
  className,
  onClick,
}: StatTileProps) {
  const variantStyles = {
    cyan: {
      number: 'text-[#0284C7]',
      iconBg: 'bg-sky-50 text-[#0284C7] silk-inset-deep',
    },
    rose: {
      number: 'text-[#EF4444]',
      iconBg: 'bg-rose-50 text-[#EF4444] silk-inset-deep',
    },
    amber: {
      number: 'text-[#D97706]',
      iconBg: 'bg-amber-50 text-[#D97706] silk-inset-deep',
    },
    emerald: {
      number: 'text-[#10B981]',
      iconBg: 'bg-emerald-50 text-[#10B981] silk-inset-deep',
    },
    indigo: {
      number: 'text-[#6366F1]',
      iconBg: 'bg-indigo-50 text-[#6366F1] silk-inset-deep',
    },
  };

  const current = variantStyles[variant];

  return (
    <GlassCard
      interactive={!!onClick}
      onClick={onClick}
      className={cn('flex flex-col justify-between p-7 rounded-2xl min-h-[170px]', className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-[#64748B]">{title}</span>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center p-2', current.iconBg)}>
          {icon}
        </div>
      </div>

      <div className="my-4">
        <span className={cn('font-headline text-[54px] font-extrabold tracking-tight leading-none', current.number)}>
          {value}
        </span>
      </div>

      <p className="text-xs text-[#64748B] font-medium leading-relaxed">
        {description}
      </p>
    </GlassCard>
  );
}
