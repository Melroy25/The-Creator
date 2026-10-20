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
    { id: 'amber', name: 'Warm Amber', hex: '#F4C24A' },
    { id: 'mint', name: 'Studio Mint', hex: '#8FE0CF' },
    { id: 'pink', name: 'Creative Pink', hex: '#F7B1C9' },
    { id: 'blue', name: 'Analytical Blue', hex: '#9FC9F3' },
  ];

  return (
    <div className={cn('flex items-center gap-3.5 sm:gap-4.5 pt-1', className)}>
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
            {/* Swatch circle matching Wharf Image 1, 2, 3 */}
            <div
              className={cn(
                'w-10 h-10 rounded-full transition-all duration-200 flex items-center justify-center relative'
              )}
              style={{
                backgroundColor: swatch.hex,
                boxShadow: isSelected
                  ? `0 0 0 2px var(--bg-surface), 0 0 0 4px ${swatch.hex}`
                  : 'none',
              }}
            >
              {/* Selected indicator: Solid Center Black Dot */}
              {isSelected && (
                <div className="w-2.5 h-2.5 rounded-full bg-black shadow-sm" />
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}
