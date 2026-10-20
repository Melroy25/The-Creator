'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AnimatedProgressBarProps {
  value: number; // percentage (0 - 100)
  duration?: number; // default 0.7s (700ms)
  delay?: number;
  className?: string;
  barClassName?: string;
}

export function AnimatedProgressBar({
  value,
  duration = 0.7,
  delay = 0,
  className,
  barClassName,
}: AnimatedProgressBarProps) {
  const shouldReduceMotion = useReducedMotion();
  const clampedValue = Math.min(Math.max(value, 0), 100);

  return (
    <div className={cn('w-full h-1.5 rounded-full bg-border overflow-hidden', className)}>
      <motion.div
        initial={{ width: shouldReduceMotion ? `${clampedValue}%` : '0%' }}
        animate={{ width: `${clampedValue}%` }}
        transition={{
          duration: shouldReduceMotion ? 0 : duration,
          delay: shouldReduceMotion ? 0 : delay,
          ease: [0.22, 1, 0.36, 1] as const,
        }}
        className={cn('h-full bg-[var(--accent)] rounded-full transition-colors duration-400', barClassName)}
      />
    </div>
  );
}
