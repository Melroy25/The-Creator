'use client';

import React, { useEffect } from 'react';
import { cn } from '@/lib/utils';
import { AlertTriangle, X } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';

export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: 'danger' | 'primary' | 'warning';
  loading?: boolean;
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  variant = 'primary',
  loading = false,
}: ConfirmModalProps) {
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/35 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md silk-card rounded-2xl shadow-[8px_8px_24px_rgba(166,175,195,0.5),-8px_-8px_24px_rgba(255,255,255,0.95)] p-6 z-10 space-y-5 animate-in zoom-in-95 duration-150 text-[#1E2337]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-xl flex items-center justify-center',
              variant === 'danger' ? 'bg-rose-50 text-rose-600 border border-rose-200' :
              variant === 'warning' ? 'bg-amber-50 text-amber-600 border border-amber-200' :
              'bg-indigo-50 text-indigo-600 border border-indigo-200'
            )}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h3 className="text-lg font-headline font-bold text-[#1E2337] tracking-tight">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#64748B] hover:text-[#1E2337] silk-card-sm transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-[#64748B] leading-relaxed font-medium">
          {description}
        </p>

        <div className="flex items-center justify-end gap-3 pt-2">
          <SecondaryButton size="sm" onClick={onClose} disabled={loading}>
            {cancelLabel}
          </SecondaryButton>
          <PrimaryButton
            size="sm"
            onClick={onConfirm}
            loading={loading}
            className={variant === 'danger' ? 'bg-gradient-to-r from-rose-600 to-red-600 border-rose-400' : ''}
          >
            {confirmLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
