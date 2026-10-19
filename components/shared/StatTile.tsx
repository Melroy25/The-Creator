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
      number: 'text-[#38BDF8]',
      iconBg: 'bg-sky-500/10 text-sky-400 border border-sky-500/20',
    },
    rose: {
      number: 'text-[#F43F5E]',
      iconBg: 'bg-rose-500/10 text-rose-400 border border-rose-500/20',
    },
    amber: {
      number: 'text-[#F59E0B]',
      iconBg: 'bg-amber-500/10 text-amber-400 border border-amber-500/20',
    },
    emerald: {
      number: 'text-[#10B981]',
      iconBg: 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
    },
    indigo: {
      number: 'text-[#818CF8]',
      iconBg: 'bg-indigo-500/10 text-indigo-400 border border-indigo-500/20',
    },
  };

  const current = variantStyles[variant];

  return (
    <GlassCard
      interactive={!!onClick}
      onClick={onClick}
      className={cn('flex flex-col justify-between p-6 rounded-2xl min-h-[160px]', className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm font-semibold text-slate-400 tracking-wide">{title}</span>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center p-2', current.iconBg)}>
          {icon}
        </div>
      </div>

      <div className="my-3">
        <span className={cn('font-mono text-5xl font-extrabold tracking-tight leading-none', current.number)}>
          {value}
        </span>
      </div>

      <p className="text-xs text-slate-400 font-medium leading-relaxed">
        {description}
      </p>
    </GlassCard>
  );
}
