'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  stepTracker?: React.ReactNode;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'md' | 'lg' | 'xl';
}

export function SideDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
  stepTracker,
  children,
  footer,
  width = 'md',
}: SideDrawerProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // 460px fixed width per Stitch/Wharf spec
  const widthClasses = {
    md: 'w-full sm:max-w-[460px]',
    lg: 'w-full sm:max-w-[540px]',
    xl: 'w-full sm:max-w-[640px]',
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Translucent Scrim with 4px backdrop blur */}
      <div
        className="fixed inset-0 bg-scrim backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Drawer Surface */}
      <aside
        className={cn(
          'relative w-full h-full bg-surface border-l border-border shadow-drawer flex flex-col z-10 drawer-slide-in text-text-primary',
          widthClasses[width]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-surface">
          <div className="space-y-1">
            <h3 className="text-lg font-headline font-bold text-text-primary tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-text-secondary font-mono">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-inset transition-colors"
            title="Close drawer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Optional StepTracker Slot */}
        {stepTracker && (
          <div className="px-6 border-b border-border bg-surface-inset/50">
            {stepTracker}
          </div>
        )}

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="p-6 border-t border-border bg-surface">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}
