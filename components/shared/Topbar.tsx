'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Bell, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Topbar() {
  const [whatIfActive, setWhatIfActive] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#F3F5FA]/90 backdrop-blur-xl z-40 px-6 lg:px-8 flex items-center justify-between gap-4 border-b border-[#E2E6F0] shadow-[0_4px_16px_rgba(166,175,195,0.15)]">
      {/* Search Input with ⌘K Hint (Stitch Light design) */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full flex items-center silk-inset px-3.5 py-2 focus-within:border-indigo-400 border border-transparent transition-all">
          <span className="text-[11px] font-mono uppercase text-[#94A3B8] mr-2 font-bold tracking-wider">
            FIND
          </span>
          <input
            type="text"
            placeholder="Search campaigns, briefs, assets..."
            className="bg-transparent text-sm text-[#1E2337] placeholder-[#94A3B8] focus:outline-none w-full font-medium"
            readOnly
          />
          <kbd className="text-[11px] font-mono bg-white text-[#64748B] px-1.5 py-0.5 rounded-md shadow-sm border border-slate-200 shrink-0">
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
            'flex items-center gap-2.5 silk-card-sm px-3.5 py-1.5 rounded-full transition-all text-xs font-medium cursor-pointer',
            whatIfActive ? 'text-indigo-600 bg-indigo-50 border-indigo-200' : 'text-[#64748B] hover:text-[#1E2337]'
          )}
          onClick={() => setWhatIfActive(!whatIfActive)}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
          <span className="hidden sm:inline">What-if Simulation</span>
          <div
            className={cn(
              'w-8 h-4 rounded-full p-0.5 transition-colors',
              whatIfActive ? 'bg-indigo-600' : 'bg-slate-300'
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
          className="relative p-2 rounded-xl text-[#64748B] hover:text-[#1E2337] silk-card-sm transition-all"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-white" />
        </button>

        {/* User Profile */}
        <Link href="/settings" className="flex items-center gap-3 pl-1 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 p-0.5 ring-2 ring-white shadow-sm flex items-center justify-center font-mono text-xs font-bold text-white">
              MV
            </div>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-white" />
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-[#1E2337] leading-tight">Marcus Vance</span>
            <span className="text-[10px] text-[#94A3B8] font-mono leading-none">Executive Creator</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
