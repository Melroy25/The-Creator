'use client';

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { cn } from '@/lib/utils';

export interface AnimatedCardGridProps {
  children: React.ReactNode;
  staggerDelay?: number;
  className?: string;
}

export function AnimatedCardGrid({
  children,
  staggerDelay = 0.04, // 40ms stagger per card
  className,
}: AnimatedCardGridProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    initial: { opacity: 0 },
    animate: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : 0.08,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      animate="animate"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export interface AnimatedCardProps {
  children: React.ReactNode;
  className?: string;
}

export function AnimatedCard({ children, className }: AnimatedCardProps) {
  const shouldReduceMotion = useReducedMotion();

  const cardVariants = {
    initial: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
      y: shouldReduceMotion ? 0 : 12,
    },
    animate: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
    hidden: {
      opacity: 0,
      scale: shouldReduceMotion ? 1 : 0.97,
      y: shouldReduceMotion ? 0 : 12,
    },
    show: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      whileHover={{ y: -2, transition: { duration: 0.15, ease: 'easeOut' } }}
      className={cn('transition-shadow', className)}
    >
      {children}
    </motion.div>
  );
}
