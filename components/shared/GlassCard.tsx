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
    primary: 'border-[#EDBE4B] shadow-[0_0_16px_rgba(237,190,75,0.2)]',
    danger: 'border-[#F8BAC1] shadow-[0_0_16px_rgba(163,31,42,0.15)]',
    success: 'border-[#C3E8DC] shadow-[0_0_16px_rgba(30,107,82,0.15)]',
  };

  const elevationClasses = {
    1: 'studio-card',
    2: 'studio-card shadow-[0_4px_12px_-2px_rgba(60,50,30,0.06),0_12px_28px_-4px_rgba(60,50,30,0.08)]',
    3: 'studio-card shadow-[0_16px_40px_-8px_rgba(31,31,35,0.14)]',
  };

  return (
    <div
      className={cn(
        elevationClasses[elevation],
        interactive && 'hover:-translate-y-0.5 hover:shadow-[0_4px_12px_-2px_rgba(60,50,30,0.06),0_12px_28px_-4px_rgba(60,50,30,0.08)] cursor-pointer active:scale-[0.99]',
        glowClasses[glow],
        'p-6 relative overflow-hidden text-[#1F1F23]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
