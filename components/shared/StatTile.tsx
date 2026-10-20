'use client';

import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';

export interface StatTileProps {
  title: string;
  value: number | string;
  description: string;
  icon: React.ReactNode;
  variant?: 'amber' | 'mint' | 'pink' | 'blue' | 'rose';
  trend?: string;
  className?: string;
  onClick?: () => void;
}

export function StatTile({
  title,
  value,
  description,
  icon,
  variant = 'amber',
  trend,
  className,
  onClick,
}: StatTileProps) {
  const [displayValue, setDisplayValue] = useState<number | string>(
    typeof value === 'number' ? 0 : value
  );

  // Smooth Count-Up for Numeric KPIs
  useEffect(() => {
    if (typeof value !== 'number') {
      setDisplayValue(value);
      return;
    }

    const duration = 600; // ms
    const steps = 20;
    const stepDuration = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const current = Math.round((step / steps) * value);
      setDisplayValue(current);

      if (step >= steps) {
        clearInterval(timer);
        setDisplayValue(value);
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [value]);

  const variantStyles: Record<string, { badge: string; text: string }> = {
    amber: { badge: 'bg-accent-tint text-accent-strong border-accent/20', text: 'text-text-primary' },
    mint: { badge: 'bg-status-done-bg text-status-done-text border-status-done-border', text: 'text-text-primary' },
    rose: { badge: 'bg-status-overdue-bg text-status-overdue-text border-status-overdue-border', text: 'text-status-overdue-text' },
    blue: { badge: 'bg-accent-tint text-accent-strong border-accent/20', text: 'text-text-primary' },
    pink: { badge: 'bg-accent-tint text-accent-strong border-accent/20', text: 'text-text-primary' },
  };

  const current = variantStyles[variant] || variantStyles.amber;

  return (
    <GlassCard
      interactive={!!onClick}
      onClick={onClick}
      className={cn('flex flex-col justify-between p-6 rounded-2xl min-h-[160px] fade-rise', className)}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{title}</span>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center p-2 border shadow-sm', current.badge)}>
          {icon}
        </div>
      </div>

      <div className="my-3 flex items-baseline gap-2">
        <span className={cn('font-headline text-4xl lg:text-[44px] font-bold tracking-tight leading-none', current.text)}>
          {displayValue}
        </span>
        {trend && (
          <span className="text-xs font-mono font-semibold text-status-done-text">
            {trend}
          </span>
        )}
      </div>

      <p className="text-xs text-text-secondary font-normal leading-relaxed">
        {description}
      </p>
    </GlassCard>
  );
}
