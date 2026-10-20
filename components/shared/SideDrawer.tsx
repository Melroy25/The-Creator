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

  // Fixed 460px per Warm Editorial Studio spec (or wider when requested)
  const widthClasses = {
    md: 'w-full sm:max-w-[460px]',
    lg: 'w-full sm:max-w-[540px]',
    xl: 'w-full sm:max-w-[640px]',
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Ultra-soft translucent scrim per spec: rgba(31, 31, 35, 0.18) with backdrop-filter: blur(4px) */}
      <div
        className="fixed inset-0 bg-[#1F1F23]/20 backdrop-blur-[4px] transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Drawer Surface: #FCFBF7 with 1px #EDE6D3 border and Level 3 shadow */}
      <aside
        className={cn(
          'relative w-full h-full bg-[#FCFBF7] border-l border-[#EDE6D3] shadow-[0_16px_40px_-8px_rgba(31,31,35,0.14)] flex flex-col z-10 animate-in slide-in-from-right duration-200 text-[#1F1F23]',
          widthClasses[width]
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-[#EDE6D3] bg-[#FAF6EA]">
          <div className="space-y-1">
            <h3 className="text-lg font-headline font-bold text-[#1F1F23] tracking-tight">{title}</h3>
            {subtitle && <p className="text-xs text-[#6B6558] font-mono">{subtitle}</p>}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#6B6558] hover:text-[#1F1F23] hover:bg-[#F4EFE0] transition-colors"
            title="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {children}
        </div>

        {/* Footer (if provided) */}
        {footer && (
          <div className="p-6 border-t border-[#EDE6D3] bg-[#FAF6EA]">
            {footer}
          </div>
        )}
      </aside>
    </div>
  );
}
