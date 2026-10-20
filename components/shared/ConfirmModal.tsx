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
        className="fixed inset-0 bg-[#1F1F23]/20 backdrop-blur-[4px] transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog Tile */}
      <div className="relative w-full max-w-md bg-[#FCFBF7] border border-[#EDE6D3] rounded-2xl shadow-[0_16px_40px_-8px_rgba(31,31,35,0.14)] p-6 z-10 space-y-5 animate-in zoom-in-95 duration-150 text-[#1F1F23]">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={cn(
              'w-10 h-10 rounded-full flex items-center justify-center border',
              variant === 'danger' && 'bg-[#FDE5E7] text-[#A31F2A] border-[#F8BAC1]',
              variant === 'warning' && 'bg-[#FDF3D6] text-[#875C05] border-[#F7E19D]',
              variant === 'primary' && 'bg-[#FBEFC2] text-[#875C05] border-[#F7E19D]'
            )}>
              <AlertTriangle className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-headline font-bold text-lg text-[#1F1F23] tracking-tight">{title}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#6B6558] hover:text-[#1F1F23] hover:bg-[#F4EFE0] transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <p className="text-sm text-[#6B6558] font-normal leading-relaxed">
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
              variant === 'danger' && 'bg-[#A31F2A] hover:bg-[#8A1A23] border-[#A31F2A]'
            )}
          >
            {confirmLabel}
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
