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
    primary: 'glow-primary',
    danger: 'glow-danger',
    success: 'glow-success',
  };

  const elevationClasses = {
    1: 'bg-[#0F1424]/80 border-white/[0.08]',
    2: 'bg-[#151B30]/85 border-white/[0.12] shadow-2xl',
    3: 'bg-[#1C2442]/90 border-white/[0.16] shadow-[0_16px_48px_rgba(0,0,0,0.6)]',
  };

  return (
    <div
      className={cn(
        interactive ? 'glass-card-interactive cursor-pointer' : 'glass-card',
        elevationClasses[elevation],
        glowClasses[glow],
        'p-6 relative overflow-hidden',
        className
      )}
      {...props}
    >
      {/* Subtle top specular specular edge trace */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none" />
      {children}
    </div>
  );
}
