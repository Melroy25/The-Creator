import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';

export interface StatTileProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  variant?: 'cyan' | 'rose' | 'amber' | 'emerald' | 'indigo' | 'mint' | 'blue';
  className?: string;
  onClick?: () => void;
}

export function StatTile({
  title,
  value,
  description,
  icon,
  variant = 'amber',
  className,
  onClick,
}: StatTileProps) {
  const variantStyles: Record<string, { iconBg: string; iconColor: string }> = {
    amber: {
      iconBg: 'bg-[#FBEFC2] border border-[#F7E19D]',
      iconColor: 'text-[#875C05]',
    },
    cyan: {
      iconBg: 'bg-[#E5F0FC] border border-[#C5DCFA]',
      iconColor: 'text-[#1D6FB8]',
    },
    blue: {
      iconBg: 'bg-[#E5F0FC] border border-[#C5DCFA]',
      iconColor: 'text-[#1D6FB8]',
    },
    rose: {
      iconBg: 'bg-[#FBE7E9] border border-[#F8BAC1]',
      iconColor: 'text-[#9E2A2B]',
    },
    emerald: {
      iconBg: 'bg-[#E1F6EE] border border-[#C3E8DC]',
      iconColor: 'text-[#1E6B52]',
    },
    mint: {
      iconBg: 'bg-[#E1F6EE] border border-[#C3E8DC]',
      iconColor: 'text-[#1E6B52]',
    },
    indigo: {
      iconBg: 'bg-[#EDEAFB] border border-[#D9D2F5]',
      iconColor: 'text-[#544393]',
    },
  };

  const current = variantStyles[variant] || variantStyles.amber;

  return (
    <GlassCard
      interactive={!!onClick}
      onClick={onClick}
      className={cn('flex flex-col justify-between p-6 rounded-2xl min-h-[160px]', className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#6B6558]">{title}</span>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center p-2', current.iconBg, current.iconColor)}>
          {icon}
        </div>
      </div>

      <div className="my-3">
        <span className="font-headline text-[40px] lg:text-[44px] font-bold text-[#1F1F23] tracking-[-0.03em] leading-none">
          {value}
        </span>
      </div>

      <p className="text-xs text-[#6B6558] font-normal leading-relaxed">
        {description}
      </p>
    </GlassCard>
  );
}
