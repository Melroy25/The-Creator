import React from 'react';
import { cn } from '@/lib/utils';

export interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        'animate-pulse bg-[#F4EFE0] rounded-xl border border-[#EDE6D3]',
        className
      )}
    />
  );
}

export function StatTileSkeleton() {
  return (
    <div className="studio-card p-6 rounded-2xl space-y-4 animate-pulse bg-[#FCFBF7]">
      <div className="flex justify-between items-center">
        <div className="h-3 w-20 bg-[#F4EFE0] rounded-full" />
        <div className="w-9 h-9 bg-[#F4EFE0] rounded-xl" />
      </div>
      <div className="h-10 w-28 bg-[#F4EFE0] rounded-xl my-3" />
      <div className="h-3 w-40 bg-[#F4EFE0] rounded-full" />
    </div>
  );
}

export function CardSkeleton({ lines = 3 }: { lines?: number }) {
  return (
    <div className="studio-card p-6 rounded-2xl space-y-4 animate-pulse bg-[#FCFBF7]">
      <div className="h-4 w-1/3 bg-[#F4EFE0] rounded-full" />
      <div className="space-y-2 pt-2">
        {Array.from({ length: lines }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-[#F4EFE0] rounded-full"
            style={{ width: `${100 - i * 15}%` }}
          />
        ))}
      </div>
    </div>
  );
}

export function TableRowSkeleton() {
  return (
    <div className="flex items-center justify-between p-4 bg-[#F4EFE0]/50 rounded-xl animate-pulse">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-[#F4EFE0]" />
        <div className="space-y-1">
          <div className="h-3 w-32 bg-[#F4EFE0] rounded-full" />
          <div className="h-2 w-20 bg-[#F4EFE0] rounded-full" />
        </div>
      </div>
      <div className="h-4 w-16 bg-[#F4EFE0] rounded-full" />
    </div>
  );
}
