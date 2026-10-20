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
    sm: 'px-3.5 py-1.5 text-xs rounded-xl gap-1.5',
    md: 'px-4 py-2.5 text-sm rounded-xl gap-2',
    lg: 'px-6 py-3 text-base rounded-2xl gap-2.5',
  };

  return (
    <button
      disabled={disabled || loading}
      className={cn(
        'silk-btn-secondary inline-flex items-center justify-center font-medium select-none cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {loading ? <Loader2 className="w-4 h-4 animate-spin text-[#64748B]" /> : icon}
      <span>{children}</span>
    </button>
  );
}
