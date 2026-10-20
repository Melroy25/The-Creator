'use client';

import React from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-canvas text-text-primary relative overflow-x-hidden font-body">
      {/* Desktop Sidebar (Wharf Operations, Records, Account structure) */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="lg:pl-64 flex flex-col min-h-screen relative z-10">
        {/* Topbar with Search, Export, Primary CTA, Notifications */}
        <Topbar />

        {/* Viewport Canvas */}
        <main className="flex-1 pt-16 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full pt-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
