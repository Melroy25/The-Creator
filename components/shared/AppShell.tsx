'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BackgroundGlow } from './BackgroundGlow';
import { PageTransition } from './motion/PageTransition';

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-text-primary relative overflow-x-hidden font-sans">
      {/* Desktop Sidebar (Wharf Operations, Records, Account structure - never animates) */}
      <Sidebar />

      {/* Background Glow (Behind content, not sidebar) */}
      <BackgroundGlow isWorkspace={true} />

      {/* Main Content Area */}
      <div className="lg:pl-60 flex flex-col min-h-screen relative z-10">
        {/* Mobile Topbar only (hidden on lg desktop) */}
        <Topbar />

        {/* Viewport Canvas matching Wharf with page-transition */}
        <main className="flex-1 px-4 sm:px-8 lg:px-10 py-6 sm:py-8 w-full flex flex-col">
          <PageTransition>
            {children}
          </PageTransition>
        </main>
      </div>
    </div>
  );
}
