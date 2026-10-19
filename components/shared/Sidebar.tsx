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
  Bot,
  ChevronDown,
  FileSpreadsheet,
  FileSearch,
  History,
  Settings,
  Sparkles,
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
    {
      name: 'Copilot',
      subtitle: 'Autonomous pipeline reasoning',
      href: '/copilot',
      icon: <Bot className="w-4 h-4" />,
      badge: '06',
    },
  ];

  const moreNav: NavItem[] = [
    {
      name: 'Finances',
      subtitle: 'Ledger',
      href: '/finances',
      icon: <FileSpreadsheet className="w-4 h-4" />,
    },
    {
      name: 'Brief Analyzer',
      subtitle: 'AI Parser',
      href: '/brief-analyzer',
      icon: <FileSearch className="w-4 h-4" />,
    },
    {
      name: 'Audit Trail',
      subtitle: 'Logs',
      href: '/audit',
      icon: <History className="w-4 h-4" />,
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
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-[#0B0F1C]/90 backdrop-blur-2xl z-50 flex-col justify-between border-r border-white/[0.08] select-none">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Brand Logo Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-white/[0.08] bg-[#0E1324]/60">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-500 to-violet-500 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/25">
              <Zap className="w-4 h-4 text-white fill-white" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-sans font-bold text-sm tracking-tight text-white uppercase">
                Creator Flow
              </span>
              <span className="text-[10px] font-mono font-bold bg-indigo-500/20 text-indigo-300 px-1.5 py-0.2 rounded-full border border-indigo-500/30">
                PRO
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          <div>
            <div className="px-3 pb-2 text-slate-500 font-mono text-[11px] uppercase tracking-wider font-semibold">
              Primary Modules
            </div>
            <nav className="space-y-1">
              {primaryNav.map((item) => {
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'group relative flex items-center justify-between px-3.5 py-2.5 rounded-xl transition-all',
                      active
                        ? 'bg-gradient-to-r from-indigo-500/15 via-indigo-500/10 to-transparent border border-indigo-500/30 text-white shadow-[0_0_20px_rgba(99,102,241,0.15)]'
                        : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                    )}
                  >
                    {/* Active Gradient Indicator Bar */}
                    {active && (
                      <div className="absolute left-0 top-2 bottom-2 w-1 bg-gradient-to-b from-blue-400 to-indigo-500 rounded-r-full shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
                    )}

                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'p-1.5 rounded-lg transition-colors',
                          active ? 'text-indigo-400 bg-indigo-500/20' : 'text-slate-400 group-hover:text-slate-200'
                        )}
                      >
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={cn('text-sm leading-tight font-semibold', active ? 'text-white' : 'text-slate-300')}>
                          {item.name}
                        </span>
                        <span className="text-[11px] text-slate-500 leading-tight">
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          'text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md border',
                          active
                            ? 'bg-indigo-500/30 text-indigo-300 border-indigo-500/40'
                            : item.isDangerous
                            ? 'text-rose-400 border-rose-500/30 bg-rose-500/10'
                            : 'text-slate-500 border-transparent bg-white/[0.04]'
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
          <div className="pt-1">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="w-full flex items-center justify-between px-3.5 py-2 rounded-xl text-slate-400 hover:text-white transition-colors text-xs font-semibold"
            >
              <div className="flex items-center gap-2">
                <span>More Operations</span>
                <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/[0.06] text-slate-400">
                  4
                </span>
              </div>
              <ChevronDown
                className={cn('w-4 h-4 transition-transform duration-200', moreOpen ? 'rotate-180' : '')}
              />
            </button>

            {moreOpen && (
              <div className="mt-1 pl-2 space-y-1 border-l border-white/[0.06] ml-4">
                {moreNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition-all',
                        active
                          ? 'text-indigo-400 bg-indigo-500/10 font-semibold'
                          : 'text-slate-400 hover:text-white hover:bg-white/[0.04]'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <span className="text-[10px] font-mono text-slate-500">{item.subtitle}</span>
                    </Link>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Apex Media Studio HUD Card (From Stitch Design) */}
      <div className="p-3.5 m-3.5 glass-card rounded-2xl space-y-3 bg-[#0D1222]/90 border-white/[0.08]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold truncate text-white">Apex Media Studio</span>
          <span className="text-[10px] bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 px-1.5 py-0.5 rounded font-mono font-bold">
            PRO HUD
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span className="text-[11px] text-slate-400 leading-none truncate">
            Telemetry sync (0ms jitter)
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-slate-500">Bandwidth</span>
            <span className="text-indigo-400 font-bold font-mono">84% utilized</span>
          </div>
          <div className="w-full h-1.5 bg-[#090C15] rounded-full overflow-hidden p-[1px]">
            <div className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-violet-500 rounded-full w-[84%]" />
          </div>
        </div>
      </div>

      {/* Footer per BRIEF.md: "Demo workspace" */}
      <div className="px-6 py-3 border-t border-white/[0.06] text-center">
        <span className="text-[11px] font-mono uppercase tracking-wider text-slate-500">
          Demo workspace
        </span>
      </div>
    </aside>
  );
}
