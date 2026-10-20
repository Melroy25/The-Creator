'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Topbar() {
  const [whatIfActive, setWhatIfActive] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#FAF6EA]/90 backdrop-blur-md z-40 px-6 lg:px-8 flex items-center justify-between gap-4 border-b border-[#EDE6D3]">
      {/* Search Input with ⌘K Hint (Warm Editorial Studio capsule) */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full flex items-center bg-[#FCFBF7] rounded-full px-4 py-2 border border-[#EDE6D3] focus-within:border-[#EDBE4B] focus-within:ring-2 focus-within:ring-[#EDBE4B]/30 transition-all shadow-[0_1px_3px_rgba(60,50,30,0.03)]">
          <span className="text-[11px] font-mono uppercase text-[#9A9384] mr-2 font-bold tracking-wider">
            FIND
          </span>
          <input
            type="text"
            placeholder="Search campaigns, briefs, assets..."
            className="bg-transparent text-sm text-[#1F1F23] placeholder-[#9A9384] focus:outline-none w-full font-medium"
            readOnly
          />
          <kbd className="text-[11px] font-mono bg-[#F4EFE0] text-[#6B6558] px-2 py-0.5 rounded-full border border-[#EDE6D3] shrink-0 font-semibold">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls: What-if Simulation toggle, Notification Bell, User Avatar */}
      <div className="flex items-center gap-4 sm:gap-5">
        {/* What-if Toggle */}
        <Link
          href="/simulator"
          className={cn(
            'flex items-center gap-2.5 px-4 py-1.5 rounded-full transition-all text-xs font-semibold cursor-pointer border',
            whatIfActive
              ? 'bg-[#1F1F23] text-white border-[#1F1F23] shadow-sm'
              : 'bg-[#FCFBF7] text-[#6B6558] border-[#EDE6D3] hover:text-[#1F1F23] hover:bg-[#F4EFE0]'
          )}
          onClick={() => setWhatIfActive(!whatIfActive)}
        >
          <Sparkles className={cn('w-3.5 h-3.5', whatIfActive ? 'text-[#EDBE4B]' : 'text-[#875C05]')} />
          <span className="hidden sm:inline">What-if Simulation</span>
          <div
            className={cn(
              'w-8 h-4 rounded-full p-0.5 transition-colors',
              whatIfActive ? 'bg-[#EDBE4B]' : 'bg-[#E6E2D7]'
            )}
          >
            <div
              className={cn(
                'w-3 h-3 rounded-full bg-white shadow-sm transition-transform',
                whatIfActive ? 'translate-x-4' : 'translate-x-0'
              )}
            />
          </div>
        </Link>

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-full text-[#6B6558] hover:text-[#1F1F23] bg-[#FCFBF7] border border-[#EDE6D3] hover:bg-[#F4EFE0] transition-all shadow-[0_1px_2px_rgba(60,50,30,0.03)]"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-[#EDBE4B] ring-2 ring-[#FCFBF7]" />
        </button>

        {/* User Profile */}
        <Link href="/settings" className="flex items-center gap-3 pl-1 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-[#1F1F23] border-2 border-[#EDE6D3] shadow-sm flex items-center justify-center font-mono text-xs font-bold text-white">
              MV
            </div>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-[#1E6B52] ring-2 ring-[#FCFBF7]" />
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-[#1F1F23] leading-tight">Marcus Vance</span>
            <span className="text-[10px] text-[#9A9384] font-mono leading-none">Executive Creator</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
