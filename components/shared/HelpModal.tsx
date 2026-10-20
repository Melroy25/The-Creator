'use client';

import React, { useEffect } from 'react';
import { X, Lightbulb, ArrowRight, ShieldCheck, Cpu, Clock } from 'lucide-react';
import { PrimaryButton } from './PrimaryButton';

export interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
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

  const tips = [
    {
      icon: <Cpu className="w-4 h-4 text-accent-strong" />,
      title: 'Deterministic Workflow Engine',
      text: 'Calculates all dates, slack, and schedule shifts with pure code—never guessing or relying on AI hallucinations.',
    },
    {
      icon: <Clock className="w-4 h-4 text-accent-strong" />,
      title: 'Schedule Disruption Simulation',
      text: 'Test deadline shifts and editor shortages in the Simulator before approving them into active client pipelines.',
    },
    {
      icon: <ShieldCheck className="w-4 h-4 text-accent-strong" />,
      title: 'Explicit Data Provenance',
      text: 'Every date and figure is stamped as Confirmed, Assumption, Calculated, or AI suggestion.',
    },
    {
      icon: <Lightbulb className="w-4 h-4 text-accent-strong" />,
      title: 'Honest Financial Tracking',
      text: 'Unpaid invoices stay in Waiting; only verified bank settlements count as Received cash.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Translucent Scrim */}
      <div
        className="fixed inset-0 bg-scrim backdrop-blur-sm transition-opacity duration-200"
        onClick={onClose}
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-lg bg-surface border border-border rounded-2xl shadow-drawer p-6 z-10 space-y-5 animate-in zoom-in-95 duration-150 text-text-primary">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-full bg-accent-tint text-accent-strong flex items-center justify-center border border-accent/20">
                <Lightbulb className="w-4 h-4" />
              </span>
              <h3 className="font-headline font-bold text-lg tracking-tight">Creator Flow Quick Guide</h3>
            </div>
            <p className="text-xs text-text-secondary">4 key principles to help you navigate your creator business OS.</p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-inset transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="space-y-3 pt-1">
          {tips.map((tip, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-surface-inset border border-border flex items-start gap-3">
              <div className="p-1.5 rounded-lg bg-surface shrink-0 mt-0.5 border border-border/80">
                {tip.icon}
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-headline font-bold text-text-primary">{tip.title}</h4>
                <p className="text-xs text-text-secondary leading-relaxed font-normal">{tip.text}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <PrimaryButton size="sm" onClick={onClose} icon={<ArrowRight className="w-4 h-4" />}>
            Got It
          </PrimaryButton>
        </div>
      </div>
    </div>
  );
}
