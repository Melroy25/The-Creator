'use client';

import React, { useEffect, useState } from 'react';
import { useTheme, AccentHue } from './ThemeProvider';
import { cn } from '@/lib/utils';

export interface BackgroundGlowProps {
  isWorkspace?: boolean;
  className?: string;
}

export function BackgroundGlow({ isWorkspace = true, className }: BackgroundGlowProps) {
  const { accent } = useTheme();
  const [currentAccent, setCurrentAccent] = useState<AccentHue>(accent);
  const [previousAccent, setPreviousAccent] = useState<AccentHue | null>(null);
  const [isCrossfading, setIsCrossfading] = useState(false);

  useEffect(() => {
    if (accent !== currentAccent) {
      setPreviousAccent(currentAccent);
      setCurrentAccent(accent);
      setIsCrossfading(true);
      const timer = setTimeout(() => {
        setIsCrossfading(false);
        setPreviousAccent(null);
      }, 600);
      return () => clearTimeout(timer);
    }
  }, [accent, currentAccent]);

  return (
    <div
      className={cn(
        'fixed inset-0 pointer-events-none z-0 overflow-hidden',
        isWorkspace && 'lg:left-60',
        className
      )}
      aria-hidden="true"
    >
      {/* Current Accent Glow Layer */}
      <div className="absolute inset-0 transition-opacity duration-600 opacity-100">
        <div className="glow-orb glow-orb-tr" />
        <div className="glow-orb glow-orb-bl" />
      </div>

      {/* Crossfading Previous Accent Layer for seamless 600ms transition */}
      {previousAccent && (
        <div
          data-accent={previousAccent}
          className={cn(
            'absolute inset-0 transition-opacity duration-600',
            isCrossfading ? 'opacity-0' : 'opacity-100'
          )}
        >
          <div className="glow-orb glow-orb-tr" />
          <div className="glow-orb glow-orb-bl" />
        </div>
      )}
    </div>
  );
}
