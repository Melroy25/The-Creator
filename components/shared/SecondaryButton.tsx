import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function SecondaryButton({
  children,
  icon,
  loading = false,
  size = 'md',
  className,
  disabled,
  ...props
}: SecondaryButtonProps) {
  const sizeClasses = {
    sm: 'px-3.5 py-1.5 text-xs rounded-full gap-1.5',
    md: 'px-4 py-2 text-sm rounded-full gap-2',
    lg: 'px-6 py-2.5 text-base rounded-full gap-2.5',
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'bg-surface text-text-primary border border-border font-medium select-none cursor-pointer',
        'tactile-btn inline-flex items-center justify-center shadow-sm hover:bg-surface-inset',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin text-text-secondary" /> : icon}
      <span>{children}</span>
    </button>
  );
}
