'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface SegmentedOption<T extends string = string> {
  value: T;
  label: string;
  icon?: React.ReactNode;
}

export interface SegmentedControlProps<T extends string = string> {
  options: SegmentedOption<T>[];
  value: T;
  onChange: (value: T) => void;
  className?: string;
  size?: 'sm' | 'md';
}

export function SegmentedControl<T extends string = string>({
  options,
  value,
  onChange,
  className,
  size = 'md',
}: SegmentedControlProps<T>) {
  return (
    <div
      role="radiogroup"
      className={cn(
        'inline-flex items-center p-1 bg-surface-inset border border-border rounded-full select-none shadow-inset relative',
        className
      )}
    >
      {options.map((option) => {
        const isSelected = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(option.value)}
            className={cn(
              'relative z-10 flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-200 cursor-pointer text-center',
              size === 'sm' ? 'px-3 py-1 text-xs' : 'px-4 py-1.5 text-xs sm:text-sm',
              isSelected
                ? 'bg-text-primary text-text-inverse shadow-sm font-semibold'
                : 'text-text-secondary hover:text-text-primary'
            )}
          >
            {option.icon}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}
