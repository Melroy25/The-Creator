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
    { id: 'yellow', name: 'Yellow', hex: '#F5B93A' },
    { id: 'mint', name: 'Mint', hex: '#7FD8C3' },
    { id: 'pink', name: 'Pink', hex: '#F4A6C3' },
    { id: 'blue', name: 'Blue', hex: '#8DB8F0' },
  ];

  return (
    <div className={cn('flex items-center gap-3.5 sm:gap-4 pt-1', className)}>
      {swatches.map((swatch) => {
        const isSelected = value === swatch.id || (swatch.id === 'yellow' && value === 'amber');
        return (
          <button
            key={swatch.id}
            type="button"
            aria-label={`Select ${swatch.name} accent`}
            aria-pressed={isSelected}
            onClick={() => onChange(swatch.id)}
            className="group relative flex items-center justify-center cursor-pointer outline-none transition-transform hover:scale-105 active:scale-95"
          >
            {/* Swatch circle matching Wharf reference */}
            <div
              className="w-10 h-10 rounded-full transition-all duration-300 flex items-center justify-center relative"
              style={{
                backgroundColor: swatch.hex,
                boxShadow: isSelected
                  ? `0 0 0 2px var(--bg-surface-solid, #ffffff), 0 0 0 4.5px ${swatch.hex}`
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
