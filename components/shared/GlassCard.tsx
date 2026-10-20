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
    primary: 'border-indigo-300 shadow-[0_0_16px_rgba(99,102,241,0.18)]',
    danger: 'border-rose-300 shadow-[0_0_16px_rgba(239,68,68,0.18)]',
    success: 'border-emerald-300 shadow-[0_0_16px_rgba(16,185,129,0.18)]',
  };

  const elevationClasses = {
    1: 'silk-card',
    2: 'silk-card shadow-[8px_8px_18px_rgba(166,175,195,0.5),-8px_-8px_18px_rgba(255,255,255,0.95)]',
    3: 'silk-card shadow-[12px_12px_24px_rgba(166,175,195,0.55),-12px_-12px_24px_rgba(255,255,255,1)]',
  };

  return (
    <div
      className={cn(
        elevationClasses[elevation],
        interactive && 'hover:-translate-y-0.5 hover:shadow-silk-card-hover cursor-pointer active:scale-[0.99]',
        glowClasses[glow],
        'p-6 relative overflow-hidden text-[#1E2337]',
        className
      )}
      {...props}
    >
      {/* Top subtle specular edge trace */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/80 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}
