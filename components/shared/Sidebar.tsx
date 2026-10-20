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
    <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-72 bg-[#FCFBF7] z-50 flex-col justify-between border-r border-[#EDE6D3] shadow-[0_2px_8px_-2px_rgba(60,50,30,0.04)] select-none">
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Brand Logo Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-[#EDE6D3] bg-[#FCFBF7]">
          <Link href="/dashboard" className="flex items-center gap-3 group">
            <div className="w-8 h-8 rounded-full bg-[#1F1F23] flex items-center justify-center shadow-sm">
              <Zap className="w-4 h-4 text-[#EDBE4B] fill-[#EDBE4B]" />
            </div>
            <div className="flex items-center gap-1.5">
              <span className="font-headline font-bold text-[15px] tracking-tight text-[#1F1F23] uppercase">
                Creator Flow
              </span>
              <span className="text-[10px] font-mono font-bold bg-[#FBEFC2] text-[#875C05] px-2 py-0.5 rounded-full uppercase tracking-wider border border-[#F7E19D]">
                STUDIO
              </span>
            </div>
          </Link>
        </div>

        {/* Navigation Scroll Area */}
        <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
          <div>
            <div className="px-3 pb-2 text-[#9A9384] font-mono text-[11px] uppercase tracking-wider font-semibold">
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
                      'group relative flex items-center justify-between px-3.5 py-2.5 rounded-full transition-all',
                      active
                        ? 'bg-[#1F1F23] text-white shadow-sm font-semibold'
                        : 'text-[#6B6558] hover:text-[#1F1F23] hover:bg-[#F4EFE0]'
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          'p-1.5 rounded-full transition-colors',
                          active ? 'text-[#EDBE4B]' : 'text-[#6B6558] group-hover:text-[#1F1F23]'
                        )}
                      >
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={cn('text-sm leading-tight', active ? 'text-white font-bold' : 'text-[#1F1F23] font-medium')}>
                          {item.name}
                        </span>
                        <span className={cn('text-[11px] leading-tight font-normal', active ? 'text-[#C8C5CB]' : 'text-[#9A9384]')}>
                          {item.subtitle}
                        </span>
                      </div>
                    </div>

                    {item.badge && (
                      <span
                        className={cn(
                          'text-[11px] font-mono font-bold px-2 py-0.5 rounded-full',
                          active
                            ? 'bg-[#2E2E36] text-[#EDBE4B]'
                            : item.isDangerous
                            ? 'text-[#A31F2A] bg-[#FDE5E7] border border-[#F8BAC1]'
                            : 'text-[#9A9384] bg-transparent'
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
              className="group studio-card-sm rounded-2xl overflow-hidden"
            >
              <summary className="flex items-center justify-between px-3.5 py-2.5 cursor-pointer list-none text-[#6B6558] hover:text-[#1F1F23] transition-colors">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold">More Operations</span>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-full bg-[#F4EFE0] text-[#6B6558] font-bold border border-[#EDE6D3]">
                    2
                  </span>
                </div>
                <ChevronDown
                  className={cn('w-3.5 h-3.5 text-[#9A9384] transition-transform duration-200 group-open:rotate-180')}
                />
              </summary>

              <div className="px-2 py-2 space-y-1 bg-[#FAF6EA] border-t border-[#EDE6D3]">
                {moreNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'flex items-center justify-between px-3 py-2 rounded-full text-xs font-medium transition-all',
                        active
                          ? 'bg-[#1F1F23] text-white shadow-sm font-semibold'
                          : 'text-[#6B6558] hover:text-[#1F1F23] hover:bg-[#F4EFE0]'
                      )}
                    >
                      <div className="flex items-center gap-2">
                        {item.icon}
                        <span>{item.name}</span>
                      </div>
                      <span className={cn('text-[10px] font-mono', active ? 'text-[#C8C5CB]' : 'text-[#9A9384]')}>
                        {item.subtitle}
                      </span>
                    </Link>
                  );
                })}
              </div>
            </details>
          </div>
        </div>
      </div>

      {/* Apex Media Studio HUD Card (Warm Editorial Studio) */}
      <div className="p-4 m-3.5 studio-card rounded-2xl space-y-3 bg-[#FCFBF7]">
        <div className="flex items-center justify-between">
          <span className="text-xs font-bold truncate text-[#1F1F23]">Apex Media Studio</span>
          <span className="text-[10px] bg-[#FBEFC2] text-[#875C05] border border-[#F7E19D] px-2 py-0.5 rounded-full font-mono font-bold">
            PRO HUD
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#94E0D0] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#1E6B52]" />
          </span>
          <span className="text-[11px] text-[#6B6558] leading-none truncate font-medium">
            Telemetry sync (0ms jitter)
          </span>
        </div>
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[11px]">
            <span className="text-[#9A9384]">Bandwidth</span>
            <span className="text-[#1F1F23] font-bold font-mono">84% utilized</span>
          </div>
          <div className="w-full h-2 bg-[#F4EFE0] rounded-full overflow-hidden border border-[#EDE6D3] p-0.5">
            <div className="h-full bg-[#EDBE4B] rounded-full w-[84%]" />
          </div>
        </div>
      </div>

      {/* Footer per BRIEF.md: "Demo workspace" */}
      <div className="px-6 py-3 border-t border-[#EDE6D3] text-center bg-[#FCFBF7]">
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#9A9384] font-semibold">
          Demo workspace
        </span>
      </div>
    </aside>
  );
}
