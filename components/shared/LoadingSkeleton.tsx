import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'card' | 'tile' | 'row' | 'text';
  count?: number;
}

export function LoadingSkeleton({ variant = 'text', count = 1, className, ...props }: LoadingSkeletonProps) {
  const items = Array.from({ length: count });

  if (variant === 'card') {
    return (
      <div className="space-y-4 w-full">
        {items.map((_, i) => (
          <div
            key={i}
            className={cn('glass-card p-6 rounded-2xl animate-pulse space-y-4', className)}
            {...props}
          >
            <div className="flex items-center justify-between">
              <div className="h-5 bg-white/10 rounded-lg w-1/3" />
              <div className="h-6 bg-white/10 rounded-full w-20" />
            </div>
            <div className="h-4 bg-white/5 rounded-lg w-3/4" />
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="h-10 bg-white/5 rounded-xl" />
              <div className="h-10 bg-white/5 rounded-xl" />
              <div className="h-10 bg-white/5 rounded-xl" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'tile') {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
        {items.map((_, i) => (
          <div key={i} className="glass-card p-6 rounded-2xl animate-pulse space-y-3">
            <div className="flex justify-between items-center">
              <div className="h-4 bg-white/10 rounded w-24" />
              <div className="w-8 h-8 rounded-xl bg-white/10" />
            </div>
            <div className="h-12 bg-white/15 rounded-lg w-16 my-2" />
            <div className="h-3 bg-white/5 rounded w-full" />
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'row') {
    return (
      <div className="space-y-3 w-full">
        {items.map((_, i) => (
          <div key={i} className="glass-card p-4 rounded-xl animate-pulse flex items-center justify-between">
            <div className="flex items-center gap-3 w-2/3">
              <div className="h-6 w-20 bg-white/10 rounded-full" />
              <div className="h-4 bg-white/10 rounded w-1/2" />
            </div>
            <div className="h-4 w-24 bg-white/10 rounded" />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={cn('space-y-2', className)}>
      {items.map((_, i) => (
        <div key={i} className="h-4 bg-white/10 rounded animate-pulse w-full" />
      ))}
    </div>
  );
}
