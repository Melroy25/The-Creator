'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { AccentHue } from './ThemeProvider';

export interface AccentSwatchRowProps {
  value: AccentHue;
  onChange: (accent: AccentHue) => void;
  className?: string;
}

export function AccentSwatchRow({
  value,
  onChange,
  className,
}: AccentSwatchRowProps) {
  const swatches: Array<{ id: AccentHue; name: string; hex: string }> = [
    { id: 'amber', name: 'Warm Amber', hex: '#EDBE4B' },
    { id: 'mint', name: 'Studio Mint', hex: '#94E0D0' },
    { id: 'pink', name: 'Creative Pink', hex: '#F7B3CB' },
    { id: 'blue', name: 'Analytical Blue', hex: '#A0C9F2' },
  ];

  return (
    <div className={cn('flex items-center gap-4 sm:gap-6 pt-1', className)}>
      {swatches.map((swatch) => {
        const isSelected = value === swatch.id;
        return (
          <button
            key={swatch.id}
            type="button"
            aria-label={`Select ${swatch.name} accent`}
            aria-pressed={isSelected}
            onClick={() => onChange(swatch.id)}
            className="group relative flex items-center justify-center cursor-pointer outline-none transition-transform hover:scale-105 active:scale-95"
          >
            {/* 56px Round Swatch */}
            <div
              className={cn(
                'w-12 h-12 sm:w-14 sm:h-14 rounded-full transition-all duration-200 flex items-center justify-center relative shadow-sm',
                isSelected
                  ? 'ring-2 sm:ring-[3px] ring-text-primary ring-offset-2 sm:ring-offset-4 ring-offset-surface'
                  : 'hover:ring-2 hover:ring-border hover:ring-offset-2 hover:ring-offset-surface'
              )}
              style={{ backgroundColor: swatch.hex }}
            >
              {/* Selected indicator: Center Black Dot */}
              {isSelected && (
                <div className="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-text-primary shadow-sm" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
