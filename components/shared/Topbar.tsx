'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Sparkles, Download, Plus, Menu } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { NotificationsDropdown } from './NotificationsDropdown';
import { MobileSidebar } from './MobileSidebar';
import { HelpModal } from './HelpModal';

export function Topbar() {
  const [notifOpen, setNotifOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      <header className="fixed top-0 left-0 lg:left-64 right-0 h-16 bg-surface/90 backdrop-blur-md z-40 px-4 sm:px-8 flex items-center justify-between gap-4 border-b border-border shadow-sm">
        {/* Mobile Hamburger & Search Input */}
        <div className="flex items-center gap-3 flex-1 max-w-md">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="lg:hidden p-2 rounded-full text-text-secondary hover:text-text-primary hover:bg-surface-inset border border-border"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="relative w-full flex items-center bg-surface rounded-full px-4 py-2 border border-border focus-within:border-accent focus-within:ring-2 focus-within:ring-accent/20 transition-all shadow-inset">
            <span className="text-[11px] font-mono uppercase text-text-tertiary mr-2 font-bold tracking-wider">
              FIND
            </span>
            <input
              type="text"
              placeholder="Search campaigns, deliverables, assets..."
              className="bg-transparent text-xs sm:text-sm text-text-primary placeholder-text-tertiary focus:outline-none w-full font-medium"
              readOnly
            />
            <kbd className="hidden sm:inline-block text-[10px] font-mono bg-surface-inset text-text-secondary px-2 py-0.5 rounded-full border border-border shrink-0 font-semibold">
              CtrlK
            </kbd>
          </div>
        </div>

        {/* Right Actions: Export Button, Primary New Action, Notification Bell with red dot */}
        <div className="flex items-center gap-2.5 sm:gap-4 shrink-0">
          {/* Export Button per Wharf Topbar */}
          <SecondaryButton
            size="sm"
            icon={<Download className="w-3.5 h-3.5" />}
            className="hidden sm:inline-flex"
            onClick={() => alert('Data export prepared as CSV snapshot.')}
          >
            Export
          </SecondaryButton>

          {/* Primary Action Button: Link to Brief Analyzer / New Campaign */}
          <Link href="/brief-analyzer">
            <PrimaryButton size="sm" icon={<Plus className="w-3.5 h-3.5" />}>
              <span className="hidden xs:inline">Analyze</span> Brief
            </PrimaryButton>
          </Link>

          {/* Notification Bell with Red Dot */}
          <div className="relative">
            <button
              type="button"
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-full text-text-secondary hover:text-text-primary bg-surface border border-border hover:bg-surface-inset transition-all shadow-sm cursor-pointer"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              {/* Saturated red indicator dot */}
              <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-status-overdue-text ring-2 ring-surface" />
            </button>

            <NotificationsDropdown isOpen={notifOpen} onClose={() => setNotifOpen(false)} />
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      <MobileSidebar
        isOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
        onOpenHelp={() => setHelpOpen(true)}
      />

      {/* Help Modal triggered from mobile menu */}
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
