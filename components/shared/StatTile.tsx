'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { GlassCard } from './GlassCard';
import { CountUp } from './motion/CountUp';

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
  // Parse numeric parts if value is string with formatting (e.g. "$24,500", "80%")
  let numericVal: number | null = null;
  let prefix = '';
  let suffix = '';

  if (typeof value === 'number') {
    numericVal = value;
  } else if (typeof value === 'string') {
    const match = value.match(/^([^0-9.-]*)([0-9,.-]+)(.*)$/);
    if (match) {
      prefix = match[1];
      const parsed = parseFloat(match[2].replace(/,/g, ''));
      suffix = match[3];
      if (!isNaN(parsed)) {
        numericVal = parsed;
      }
    }
  }

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
      className={cn(
        'flex flex-col justify-between p-6 rounded-3xl min-h-[160px] bg-surface border border-border shadow-card hover:-translate-y-0.5 transition-all duration-150',
        className
      )}
    >
      <div className="flex items-center justify-between">
        <span className="text-xs font-medium text-text-secondary">{title}</span>
        <div className={cn('w-9 h-9 rounded-xl flex items-center justify-center p-2 border shadow-sm', current.badge)}>
          {icon}
        </div>
      </div>

      <div className="my-3 flex items-baseline gap-2">
        <span className={cn('font-sans text-3xl sm:text-4xl font-bold tracking-tight leading-none', current.text)}>
          {numericVal !== null ? (
            <CountUp value={numericVal} prefix={prefix} suffix={suffix} duration={900} />
          ) : (
            value
          )}
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
