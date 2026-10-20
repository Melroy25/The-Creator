import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        'skeleton-shimmer rounded-xl border border-border',
        className
      )}
    />
  );
}

export function StatTileSkeleton() {
  return (
    <div className="p-6 rounded-2xl space-y-4 bg-surface border border-border shadow-card">
      <div className="flex justify-between items-center">
        <div className="h-3 w-20 skeleton-shimmer rounded-full" />
        <div className="w-9 h-9 skeleton-shimmer rounded-xl" />
      </div>
      <div className="h-10 w-28 skeleton-shimmer rounded-xl my-3" />
      <div className="h-3 w-40 skeleton-shimmer rounded-full" />
    </div>
  );
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="p-6 rounded-2xl space-y-4 bg-surface border border-border shadow-card">
      <div className="h-4 w-1/3 skeleton-shimmer rounded-full" />
      <div className="space-y-2 pt-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 skeleton-shimmer rounded-full"
            style={{ width: `${100 - i * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}
