import React from 'react';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  icon?: React.ReactNode;
  loading?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export function PrimaryButton({
  children,
  icon,
  loading = false,
  size = 'md',
  className,
  disabled,
  ...props
}: PrimaryButtonProps) {
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs rounded-lg gap-1.5',
    md: 'px-5 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-7 py-3.5 text-base rounded-2xl gap-2.5',
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'btn-gradient inline-flex items-center justify-center font-semibold tracking-wide select-none',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin text-white" /> : icon}
      <span>{children}</span>
    </button>
  );
}
