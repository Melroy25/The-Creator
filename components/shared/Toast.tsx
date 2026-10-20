'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { cn } from '@/lib/utils';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface ToastMessage {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
}

interface ToastContextType {
  toast: (options: { type: ToastType; title: string; description?: string }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const toast = useCallback(({ type, title, description }: { type: ToastType; title: string; description?: string }) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const icons = {
            success: <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />,
            error: <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />,
            warning: <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />,
            info: <Info className="w-4 h-4 text-indigo-600 shrink-0" />,
          };

          return (
            <div
              key={t.id}
              className={cn(
                'pointer-events-auto p-4 rounded-xl border bg-white shadow-[0_8px_30px_rgba(166,175,195,0.4)] flex items-start justify-between gap-3 animate-in slide-in-from-bottom duration-200 text-[#1E2337]',
                t.type === 'success' && 'border-emerald-200/80',
                t.type === 'error' && 'border-rose-200/80',
                t.type === 'warning' && 'border-amber-200/80',
                t.type === 'info' && 'border-indigo-200/80'
              )}
            >
              <div className="flex items-start gap-2.5">
                {icons[t.type]}
                <div className="space-y-0.5">
                  <h4 className="text-xs font-headline font-bold text-[#1E2337] leading-tight">{t.title}</h4>
                  {t.description && <p className="text-[11px] text-[#64748B] leading-normal font-medium">{t.description}</p>}
                </div>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-[#94A3B8] hover:text-[#1E2337] p-0.5 rounded transition-colors"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}
