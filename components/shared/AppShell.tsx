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
    <div className="min-h-screen bg-[#F0F2F8] text-[#1E2337] relative overflow-x-hidden font-body selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background radial ambient glow layers matching Stitch Light design */}
      <div className="fixed inset-0 pointer-events-none z-0 bg-[radial-gradient(circle_at_top_left,rgba(99,102,241,0.06),transparent_40%),radial-gradient(circle_at_bottom_right,rgba(167,139,250,0.06),transparent_40%)]" />

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
