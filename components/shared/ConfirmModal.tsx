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
      {/* Translucent Scrim */}
      <div
        className="fixed inset-0 bg-scrim backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-md bg-surface border border-border rounded-2xl shadow-drawer p-6 z-10 space-y-5 animate-in zoom-in-95 duration-150 text-text-primary">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center border',
              variant === 'danger' && 'bg-status-overdue-bg text-status-overdue-text border-status-overdue-border',
              variant === 'warning' && 'bg-status-risk-bg text-status-risk-text border-status-risk-border',
              variant === 'primary' && 'bg-accent-tint text-accent-strong border-accent/20'
            )}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-text-primary tracking-tight">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-inset transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-text-secondary font-normal leading-relaxed">
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
            className={cn(
              variant === 'danger' && 'bg-status-overdue-text hover:bg-status-overdue-text/90 text-white'
            )}
          >
            {confirmLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
