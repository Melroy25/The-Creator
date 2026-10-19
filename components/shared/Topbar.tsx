'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Bell, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Topbar() {
  const [whatIfActive, setWhatIfActive] = useState(false);

  return (
    <header className="fixed top-0 left-0 lg:left-72 right-0 h-16 bg-[#0B0F1C]/80 backdrop-blur-xl z-40 px-6 lg:px-8 flex items-center justify-between gap-4 border-b border-white/[0.08]">
      {/* Search Input with ⌘K Hint */}
      <div className="flex items-center gap-4 flex-1 max-w-md">
        <div className="relative w-full flex items-center glass-inset px-3.5 py-1.5 focus-within:border-indigo-500/50 transition-all">
          <span className="text-[10px] font-mono uppercase text-slate-500 mr-2 font-bold tracking-wider">
            FIND
          </span>
          <input
            type="text"
            placeholder="Search campaigns, briefs, assets..."
            className="bg-transparent text-xs text-white placeholder-slate-500 focus:outline-none w-full font-medium"
            readOnly
          />
          <kbd className="text-[10px] font-mono bg-white/[0.08] text-slate-300 px-1.5 py-0.5 rounded border border-white/10 shrink-0">
            ⌘K
          </kbd>
        </div>
      </div>

      {/* Right Controls: What-if Simulation toggle, Notification Bell, User Avatar */}
      <div className="flex items-center gap-4">
        {/* What-if Toggle */}
        <Link
          href="/simulator"
          className={cn(
            'flex items-center gap-2.5 px-3 py-1.5 rounded-full border transition-all text-xs font-medium cursor-pointer',
            whatIfActive
              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
              : 'bg-white/[0.04] border-white/[0.08] text-slate-400 hover:text-white'
          )}
          onClick={(e) => {
            // Keep link navigation active while toggling visual indicator
            setWhatIfActive(!whatIfActive);
          }}
        >
          <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">What-if Simulation</span>
          <div
            className={cn(
              'w-7 h-4 rounded-full p-0.5 transition-colors',
              whatIfActive ? 'bg-indigo-600' : 'bg-white/20'
            )}
          >
            <div
              className={cn(
                'w-3 h-3 rounded-full bg-white transition-transform',
                whatIfActive ? 'translate-x-3' : 'translate-x-0'
              )}
            />
          </div>
        </Link>

        {/* Notification Bell */}
        <button
          className="relative p-2 rounded-xl text-slate-400 hover:text-white bg-white/[0.04] border border-white/[0.08] transition-all"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-indigo-500 ring-2 ring-[#0B0F1C]" />
        </button>

        {/* User Profile */}
        <Link href="/settings" className="flex items-center gap-3 pl-1 group">
          <div className="relative">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-violet-500 p-0.5 ring-2 ring-white/10 group-hover:ring-indigo-500/50 transition-all flex items-center justify-center font-mono text-xs font-bold text-white">
              MV
            </div>
            <span className="absolute bottom-0 right-0 h-2 w-2 rounded-full bg-emerald-500 ring-2 ring-[#0B0F1C]" />
          </div>
          <div className="hidden xl:flex flex-col text-left">
            <span className="text-xs font-bold text-white leading-tight">Marcus Vance</span>
            <span className="text-[10px] text-slate-400 font-mono leading-none">Executive Creator</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
