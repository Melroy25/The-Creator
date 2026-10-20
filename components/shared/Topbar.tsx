'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, Waves, Settings } from 'lucide-react';
import { MobileSidebar } from './MobileSidebar';
import { HelpModal } from './HelpModal';

export function Topbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <>
      {/* Mobile Topbar only - Hidden on Desktop (lg:hidden) */}
      <header className="lg:hidden h-14 bg-surface border-b border-border px-4 flex items-center justify-between z-40 sticky top-0 shadow-sm">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="p-1.5 rounded-lg text-text-secondary hover:text-text-primary hover:bg-surface-inset border border-border cursor-pointer"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <Link href="/dashboard" className="flex items-center gap-2">
            <Waves className="w-5 h-5 text-accent" />
            <span className="font-sans font-bold text-base tracking-tight text-text-primary">Wharf</span>
          </Link>
        </div>

        <Link
          href="/settings"
          className="p-2 rounded-full hover:bg-surface-inset text-text-secondary hover:text-text-primary transition-colors cursor-pointer"
          aria-label="Settings"
        >
          <Settings className="w-4 h-4" />
        </Link>
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
