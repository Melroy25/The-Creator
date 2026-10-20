import React from 'react';
import { cn } from '@/lib/utils';

export interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  interactive?: boolean;
  elevation?: 1 | 2 | 3;
  glow?: 'none' | 'primary' | 'danger' | 'success';
}

export function GlassCard({
  children,
  interactive = false,
  elevation = 1,
  glow = 'none',
  className,
  ...props
}: GlassCardProps) {
  const glowClasses = {
    none: '',
    primary: 'border-accent shadow-card',
    danger: 'border-status-overdue-border shadow-card',
    success: 'border-status-done-border shadow-card',
  };

  const elevationClasses = {
    1: 'shadow-card',
    2: 'shadow-card-hover',
    3: 'shadow-drawer',
  };

  return (
    <div
      className={cn(
        'bg-surface border border-border rounded-3xl transition-all duration-150 text-text-primary p-6 relative overflow-hidden',
        elevationClasses[elevation],
        interactive && 'hover:-translate-y-0.5 hover:shadow-card-hover cursor-pointer active:scale-[0.97]',
        glowClasses[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
