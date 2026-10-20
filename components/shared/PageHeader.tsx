'use client';

import React, { useState } from 'react';
import { cn } from '@/lib/utils';
import { Bell } from 'lucide-react';
import { NotificationsDropdown } from './NotificationsDropdown';

export interface PageHeaderProps {
  title: string;
  purpose: string;
  badge?: string;
  badgeVariant?: 'primary' | 'cyan' | 'amber' | 'emerald';
  phaseBadge?: string;
  actions?: React.ReactNode;
  showBell?: boolean;
  className?: string;
}

export function PageHeader({
  title,
  purpose,
  badge,
  badgeVariant = 'primary',
  phaseBadge,
  actions,
  showBell = true,
  className,
}: PageHeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);

  const badgeStyles = {
    primary: 'bg-accent-tint text-accent-strong border-accent/20',
    cyan: 'bg-accent-tint text-accent-strong border-accent/20',
    amber: 'bg-status-risk-bg text-status-risk-text border-status-risk-border',
    emerald: 'bg-status-done-bg text-status-done-text border-status-done-border',
  };

  return (
    <header className={cn('flex flex-col sm:flex-row sm:items-start justify-between gap-4 pb-4 pt-1', className)}>
      <div className="space-y-1 max-w-2xl">
        {(badge || phaseBadge) && (
          <div className="flex items-center gap-2 mb-1.5">
            {badge && (
              <span className={cn('text-[10px] font-mono font-bold tracking-widest uppercase px-3 py-0.5 rounded-full border shadow-sm', badgeStyles[badgeVariant])}>
                {badge}
              </span>
            )}
            {phaseBadge && (
              <span className="text-[10px] font-mono font-semibold uppercase px-2.5 py-0.5 rounded-full border border-border bg-surface-inset text-text-secondary">
                {phaseBadge}
              </span>
            )}
          </div>
        )}
        <h1 className="text-3xl font-sans font-bold tracking-tight text-text-primary">
          {title}
        </h1>
        <p className="text-xs sm:text-sm text-text-secondary font-normal leading-relaxed">
          {purpose}
        </p>
      </div>

      <div className="flex items-center gap-3 shrink-0 self-start sm:self-auto pt-1">
        {actions}

        {showBell && (
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="w-9 h-9 rounded-full bg-surface border border-border flex items-center justify-center text-text-primary hover:bg-surface-inset transition-colors relative shadow-sm cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4 text-text-secondary hover:text-text-primary" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-status-overdue-text ring-2 ring-surface" />
            </button>
            <NotificationsDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
          </div>
        )}
      </div>
    </header>
  );
}
