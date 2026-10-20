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
  Building2,
  Receipt,
  Users,
  Settings,
  HelpCircle,
  Zap,
} from 'lucide-react';
import { Avatar } from './Avatar';
import { HelpModal } from './HelpModal';

export function Sidebar() {
  const pathname = usePathname();
  const [helpOpen, setHelpOpen] = useState(false);

  const isActive = (href: string) => {
    if (href === '/dashboard' && (pathname === '/' || pathname === '/dashboard')) return true;
    return pathname.startsWith(href);
  };

  // 1. Operations
  const operationsNav = [
    {
      name: 'Dashboard',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
      badge: '3', // Due today
    },
    {
      name: 'Campaigns',
      href: '/campaigns',
      icon: <Megaphone className="w-4 h-4" />,
      badge: '3', // 3 Active
    },
    {
      name: 'Workflow',
      href: '/workflow',
      icon: <Network className="w-4 h-4" />,
    },
    {
      name: 'Simulator',
      href: '/simulator',
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      name: 'Risks',
      href: '/risks',
      icon: <AlertTriangle className="w-4 h-4" />,
      badge: '2', // 2 Risks
      isAlert: true,
    },
  ];

  // 2. Records
  const recordsNav = [
    {
      name: 'Brands',
      href: '/brands',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      name: 'Invoices',
      href: '/invoices',
      icon: <Receipt className="w-4 h-4" />,
      badge: '1', // 1 Overdue
      isAlert: true,
    },
    {
      name: 'Team',
      href: '/team',
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-64 bg-surface z-50 flex-col justify-between border-r border-border shadow-card select-none">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Wharf-style Brand Logo */}
          <div className="h-16 px-6 flex items-center justify-between border-b border-border bg-surface">
            <Link href="/dashboard" className="flex items-center gap-3 group">
              <div className="w-8 h-8 rounded-full bg-text-primary flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-accent fill-accent" />
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-headline font-bold text-base tracking-tight text-text-primary uppercase">
                  Creator Flow
                </span>
              </div>
            </Link>
          </div>

          {/* Navigation Scroll Area */}
          <div className="flex-1 overflow-y-auto px-4 py-5 space-y-6">
            {/* OPERATIONS */}
            <div>
              <div className="px-3 pb-2 text-text-tertiary font-mono text-[11px] uppercase tracking-wider font-semibold">
                Operations
              </div>
              <nav className="space-y-1">
                {operationsNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group relative flex items-center justify-between px-3.5 py-2 rounded-full transition-all text-xs font-semibold',
                        active
                          ? 'bg-text-primary text-text-inverse shadow-sm'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-inset'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={cn(active ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary')}>
                          {item.icon}
                        </div>
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            'text-[10px] font-mono font-bold px-2 py-0.5 rounded-full',
                            active
                              ? 'bg-text-primary text-accent border border-accent/30'
                              : item.isAlert
                              ? 'text-status-risk-text bg-status-risk-bg border border-status-risk-border'
                              : 'text-text-secondary bg-surface-inset border border-border'
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

            {/* RECORDS */}
            <div>
              <div className="px-3 pb-2 text-text-tertiary font-mono text-[11px] uppercase tracking-wider font-semibold">
                Records
              </div>
              <nav className="space-y-1">
                {recordsNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={cn(
                        'group relative flex items-center justify-between px-3.5 py-2 rounded-full transition-all text-xs font-semibold',
                        active
                          ? 'bg-text-primary text-text-inverse shadow-sm'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-inset'
                      )}
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={cn(active ? 'text-accent' : 'text-text-secondary group-hover:text-text-primary')}>
                          {item.icon}
                        </div>
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            'text-[10px] font-mono font-bold px-2 py-0.5 rounded-full',
                            active
                              ? 'bg-text-primary text-accent border border-accent/30'
                              : item.isAlert
                              ? 'text-status-overdue-text bg-status-overdue-bg border border-status-overdue-border'
                              : 'text-text-secondary bg-surface-inset border border-border'
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

            {/* ACCOUNT */}
            <div>
              <div className="px-3 pb-2 text-text-tertiary font-mono text-[11px] uppercase tracking-wider font-semibold">
                Account
              </div>
              <nav className="space-y-1">
                <Link
                  href="/settings"
                  className={cn(
                    'group relative flex items-center justify-between px-3.5 py-2 rounded-full transition-all text-xs font-semibold',
                    isActive('/settings')
                      ? 'bg-text-primary text-text-inverse shadow-sm'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-inset'
                  )}
                >
                  <div className="flex items-center gap-2.5">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setHelpOpen(true)}
                  className="w-full group relative flex items-center justify-between px-3.5 py-2 rounded-full transition-all text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-surface-inset cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help</span>
                  </div>
                  <span className="text-[10px] font-mono text-text-tertiary">4 tips</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-3 space-y-3 border-t border-border bg-surface">
          {/* Plan Card per Wharf Image: "Demo workspace" with Progress Bar */}
          <div className="p-3.5 rounded-2xl bg-surface-inset border border-border space-y-2.5 shadow-inset">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-text-primary">Demo workspace</span>
              <span className="text-[10px] font-mono font-semibold text-accent-strong bg-accent-tint px-2 py-0.5 rounded-full border border-accent/20">
                PRO ACTIVE
              </span>
            </div>
            <div className="space-y-1">
              <div className="w-full h-1.5 rounded-full bg-border overflow-hidden">
                <div className="h-full bg-accent rounded-full w-[65%]" />
              </div>
              <span className="text-[10px] font-mono text-text-tertiary block">
                22 of 25 tasks tracked this sprint
              </span>
            </div>
          </div>

          {/* User Row per Wharf Image */}
          <Link
            href="/settings"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-inset transition-colors group cursor-pointer"
          >
            <Avatar name="Marcus Vance" subtitle="Executive Creator" size="md" />
            <span className="text-text-tertiary group-hover:text-text-primary text-sm font-mono">
              ›
            </span>
          </Link>
        </div>
      </aside>

      {/* Help Modal */}
      <HelpModal isOpen={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
  );
}
