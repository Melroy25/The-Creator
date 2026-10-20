import React from 'react';
import { cn } from '@/lib/utils';

export interface AvatarProps {
  name: string;
  subtitle?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Avatar({ name, subtitle, size = 'md', className }: AvatarProps) {
  const initials = name
    .split(' ')
    .map((n) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  };

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={cn(
          'rounded-full bg-accent-tint text-accent-strong border border-accent/20 flex items-center justify-center font-mono font-bold select-none shrink-0 shadow-sm',
          sizeClasses[size],
          className
        )}
      >
        {initials}
      </div>
      {subtitle !== undefined && (
        <div className="flex flex-col min-w-0">
          <span className="text-xs font-bold text-text-primary leading-tight truncate">{name}</span>
          <span className="text-[10px] font-mono text-text-tertiary leading-none truncate">{subtitle}</span>
        </div>
      )}
    </div>
  );
}
