import React from 'react';
import { cn } from '@/lib/utils';
import { FileQuestion } from 'lucide-react';

export interface EmptyStateProps {
  title: string;
  description: string;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function EmptyState({
  title,
  description,
  icon,
  action,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'studio-card p-12 text-center flex flex-col items-center justify-center space-y-4 rounded-2xl border-dashed border-[#EDE6D3] bg-[#FCFBF7]',
        className
      )}
    >
      <div className="w-12 h-12 rounded-full bg-[#FBEFC2] border border-[#F7E19D] flex items-center justify-center text-[#875C05] shadow-sm">
        {icon || <FileQuestion className="w-6 h-6" />}
      </div>
      <div className="space-y-1 max-w-sm">
        <h3 className="font-headline font-bold text-base text-[#1F1F23]">{title}</h3>
        <p className="text-xs text-[#6B6558] font-normal leading-relaxed">{description}</p>
      </div>
      {action && <div className="pt-2">{action}</div>}
    </div>
  );
}
