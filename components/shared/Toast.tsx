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
            success: <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />,
            error: <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />,
            warning: <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />,
            info: <Info className="w-4 h-4 text-sky-400 shrink-0" />,
          };

          return (
            <div
              key={t.id}
              className={cn(
                'pointer-events-auto p-4 rounded-xl border backdrop-blur-xl shadow-2xl flex items-start justify-between gap-3 animate-in slide-in-from-bottom duration-200',
                t.type === 'success' && 'bg-[#0F1D1A]/95 border-emerald-500/40 text-emerald-100',
                t.type === 'error' && 'bg-[#220F16]/95 border-rose-500/40 text-rose-100',
                t.type === 'warning' && 'bg-[#221A0F]/95 border-amber-500/40 text-amber-100',
                t.type === 'info' && 'bg-[#0F1728]/95 border-sky-500/40 text-sky-100'
              )}
            >
              <div className="flex items-start gap-2.5">
                {icons[t.type]}
                <div className="space-y-0.5">
                  <h4 className="text-xs font-semibold leading-tight">{t.title}</h4>
                  {t.description && <p className="text-[11px] opacity-80 leading-normal">{t.description}</p>}
                </div>
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="opacity-70 hover:opacity-100 p-0.5 rounded transition-opacity"
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
