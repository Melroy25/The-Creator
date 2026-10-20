'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { X } from 'lucide-react';

export interface SideDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  width?: 'md' | 'lg' | 'xl';
}

export function SideDrawer({
  isOpen,
  onClose,
  title,
  subtitle,
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

  const widthClasses = {
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-2xl',
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/30 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Surface */}
      <aside
        className={cn(
          'relative w-full h-full bg-[#F5F7FB] border-l border-[#E2E6F0] shadow-[0_0_40px_rgba(166,175,195,0.4)] flex flex-col z-10 animate-in slide-in-from-right duration-200 text-[#1E2337]',
          widthClasses[width]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#E2E6F0] bg-[#F5F7FC]">
          <div className="space-y-1">
            <h3 className="text-lg font-headline font-bold text-[#1E2337] tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-[#64748B] font-mono">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl text-[#64748B] hover:text-[#1E2337] silk-card-sm transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </div>

        {/* Optional Footer */}
        {footer && (
          <div className="p-6 border-t border-[#E2E6F0] bg-[#EEF1F8]">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}
