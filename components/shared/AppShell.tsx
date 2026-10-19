'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { BottomNav } from './BottomNav';

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-[#090C15] text-[#F1F5F9] relative overflow-x-hidden">
      {/* Background radial ambient glow layers matching Stitch design */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-0 left-72 w-[600px] h-[600px] bg-indigo-600/[0.04] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-violet-600/[0.04] rounded-full blur-[140px]" />
      </div>

      {/* Fixed Desktop Sidebar */}
      <Sidebar />

      {/* Main Layout Area */}
      <div className="lg:pl-72 flex flex-col min-h-screen relative z-10">
        {/* Sticky Topbar */}
        <Topbar />

        {/* Page Content Viewport */}
        <main className="flex-1 pt-16 pb-20 lg:pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full pt-6">
            {children}
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <BottomNav />
      </div>
    </div>
  );
}
