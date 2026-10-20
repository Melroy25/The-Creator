'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Megaphone,
  Network,
  Cpu,
  AlertTriangle,
  ChevronDown,
  FileSearch,
  Settings,
  Zap,
} from 'lucide-react';

interface NavItem {
  name: string;
  subtitle: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  isDangerous?: boolean;
}

export function Sidebar() {
  const pathname = usePathname();
  const [moreOpen, setMoreOpen] = useState(true);

  // 5 Primary Modules for Lean Scope
  const primaryNav: NavItem[] = [
    {
      name: 'Dashboard',
      subtitle: 'Command center telemetry',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: '01',
    },
    {
      name: 'Campaigns',
      subtitle: 'Brand deals & deliverables',
      href: '/campaigns',
      icon: <Megaphone className="w-4 h-4" />,
      badge: '02',
    },
    {
      name: 'Workflow',
      subtitle: 'Interactive node graph',
      href: '/workflow',
      icon: <Network className="w-4 h-4" />,
      badge: '03',
    },
    {
      name: 'Simulator',
      subtitle: 'What-if impact engine',
      href: '/simulator',
      icon: <Cpu className="w-4 h-4" />,
      badge: '04',
    },
    {
      name: 'Risks',
      subtitle: 'Bottlenecks & critical radar',
      href: '/risks',
      icon: <AlertTriangle className="w-4 h-4" />,
      badge: '05',
      isDangerous: true,
    },
  ];

  // More Operations (Brief Analyzer & Settings)
  const moreNav: NavItem[] = [
    {
      name: 'Brief Analyzer',
      subtitle: 'AI Parser',
      href: '/brief-analyzer',
      icon: <FileSearch className="w-4 h-4" />,
    },
    {
      name: 'Settings',
      subtitle: 'System',
      href: '/settings',
      icon: <Settings className="w-4 h-4" />,
    },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard' && (pathname === '/' || pathname === '/dashboard')) return true;
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-[#F3F5FA] z-50 flex-col justify-between border-r border-[#E2E6F0] shadow-[4px_0_20px_rgba(166,175,195,0.2)] select-none">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Brand Logo Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#E2E6F0]/80 bg-[#F5F7FC]">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 p-0.5 flex items-center justify-center shadow-md shadow-indigo-500/25">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-bold text-[15px] tracking-tight text-[#1E2337] uppercase">
                Creator Flow
              </span>
              <span className="text-[11px] font-semibold bg-[#E8EBF5] text-indigo-600 px-2 py-0.5 rounded-full uppercase tracking-wider border border-white/80 shadow-[inset_1px_1px_2px_rgba(166,175,195,0.3)]">
                PRO
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          <div>
            <div className="px-3 pb-2 text-[#94A3B8] font-mono text-[11px] uppercase tracking-wider font-semibold">
              Primary Modules
            </div>
            <nav className="space-y-1.5">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all',
                      active
                        ? 'text-[#1E2337] font-semibold silk-inset'
                        : 'text-[#64748B] hover:text-[#1E2337] hover:bg-white/70'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'p-1.5 rounded-lg transition-colors',
                          active ? 'text-indigo-600 bg-white shadow-sm' : 'text-[#64748B] group-hover:text-[#1E2337]'
                        )}
                      >
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={cn('text-sm leading-tight font-semibold', active ? 'text-indigo-600 font-bold' : 'text-[#1E2337]')}>
                          {item.name}
                        </span>
                        <span className="text-[11px] text-[#64748B] leading-tight font-normal">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          'text-[11px] font-mono font-bold px-2 py-0.5 rounded-md shadow-sm',
                          active
                            ? 'bg-white/90 text-indigo-600'
                            : item.isDangerous
                            ? 'text-rose-500 bg-rose-50 border border-rose-200'
                            : 'text-[#94A3B8] bg-transparent'
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* More Operations Menu */}
          <div className="px-1">
            <details
              open={moreOpen}
              onToggle={(e) => setMoreOpen(e.currentTarget.open)}
              className="group silk-card-sm rounded-xl overflow-hidden"
            >
              <summary className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer list-none text-[#64748B] hover:text-[#1E2337] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">More Operations</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-[#E8EBF5] text-[#64748B] font-bold">
                    2
                  </span>
                </div>
                <ChevronDown
                  className={cn('w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 group-open:rotate-180')}
                />
              </summary>

              <div className="px-2 py-2 space-y-1 bg-[#EEF1F8] border-t border-[#E2E6F0]">
                {moreNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all',
                        active
                          ? 'text-indigo-600 bg-white shadow-sm font-semibold'
                          : 'text-[#64748B] hover:text-[#1E2337] hover:bg-white/70'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-[#94A3B8]">{item.subtitle}</span>
                    </Link>
                  );
                })}
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Apex Media Studio HUD Card (Silk Light) */}
      <div className="p-3.5 m-3.5 silk-card rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold truncate text-[#1E2337]">Apex Media Studio</span>
          <span className="text-[10px] bg-indigo-50 text-indigo-600 border border-indigo-200/60 px-1.5 py-0.5 rounded font-mono font-bold">
            PRO HUD
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] text-[#64748B] leading-none truncate font-medium">
            Telemetry sync (0ms jitter)
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#94A3B8]">Bandwidth</span>
            <span className="text-indigo-600 font-bold font-mono">84% utilized</span>
          </div>
          <div className="w-full h-2 bg-[#E2E6F2] rounded-full overflow-hidden silk-inset p-0.5">
            <div className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full w-[84%]" />
          </div>
        </div>
      </div>

      {/* Footer per BRIEF.md: "Demo workspace" */}
      <div className="px-6 py-3 border-t border-[#E2E6F0] text-center bg-[#F5F7FC]">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#94A3B8] font-semibold">
          Demo workspace
        </span>
      </div>
    </aside>
  );
}
