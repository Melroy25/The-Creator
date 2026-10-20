'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
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
  Waves,
  Search,
} from 'lucide-react';
import { Avatar } from './Avatar';
import { HelpModal } from './HelpModal';
import { AnimatedProgressBar } from './motion/AnimatedProgressBar';

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
      name: 'Overview',
      href: '/dashboard',
      icon: <LayoutDashboard className="w-4 h-4" />,
    },
    {
      name: 'Orders',
      href: '/campaigns',
      icon: <Megaphone className="w-4 h-4" />,
      badge: '2',
    },
    {
      name: 'Stock',
      href: '/workflow',
      icon: <Network className="w-4 h-4" />,
      badge: '4',
    },
    {
      name: 'Reports',
      href: '/simulator',
      icon: <Cpu className="w-4 h-4" />,
    },
    {
      name: 'Risks',
      href: '/risks',
      icon: <AlertTriangle className="w-4 h-4" />,
    },
  ];

  // 2. Records
  const recordsNav = [
    {
      name: 'Products',
      href: '/brands',
      icon: <Building2 className="w-4 h-4" />,
    },
    {
      name: 'Suppliers',
      href: '/invoices',
      icon: <Receipt className="w-4 h-4" />,
    },
    {
      name: 'Customers',
      href: '/team',
      icon: <Users className="w-4 h-4" />,
    },
    {
      name: 'Team & roles',
      href: '/team',
      icon: <Users className="w-4 h-4" />,
    },
  ];

  return (
    <>
      <aside className="hidden lg:flex fixed left-0 top-0 bottom-0 w-60 bg-surface-elevated z-50 flex-col justify-between border-r border-border select-none transition-colors duration-400">
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* Wharf Brand Logo */}
          <div className="pt-5 px-5 pb-4 flex items-center justify-between">
            <Link href="/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center text-text-primary">
                <Waves className="w-5 h-5 text-[var(--accent)] transition-colors duration-400" />
              </div>
              <span className="font-sans font-bold text-lg tracking-tight text-text-primary">
                Wharf
              </span>
            </Link>
          </div>

          {/* Search Input inside Sidebar per Wharf reference */}
          <div className="px-4 pb-4">
            <div
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true });
                window.dispatchEvent(event);
              }}
              className="flex items-center justify-between px-3 py-1.5 rounded-xl bg-surface-inset border border-border text-xs text-text-secondary hover:border-text-tertiary transition-colors cursor-pointer shadow-inset"
            >
              <div className="flex items-center gap-2">
                <Search className="w-3.5 h-3.5 text-text-tertiary shrink-0" />
                <span className="text-text-tertiary font-normal">Search orders</span>
              </div>
              <kbd className="text-[10px] font-mono bg-surface border border-border px-1.5 py-0.2 rounded text-text-tertiary">
                CtrlK
              </kbd>
            </div>
          </div>

          {/* Navigation Scroll Area */}
          <div className="flex-1 overflow-y-auto px-3 py-1 space-y-5">
            {/* OPERATIONS */}
            <div>
              <div className="px-3 pb-1.5 text-text-tertiary text-[11px] font-medium tracking-normal">
                Operations
              </div>
              <nav className="space-y-0.5">
                {operationsNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'group relative flex items-center justify-between px-3.5 py-2 rounded-2xl transition-colors text-xs font-medium',
                        active
                          ? 'text-text-inverse font-semibold'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-inset'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="active-sidebar-pill"
                          className="absolute inset-0 bg-text-primary rounded-2xl shadow-sm z-0"
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-2.5">
                        <div className={cn(active ? 'text-text-inverse' : 'text-text-secondary group-hover:text-text-primary')}>
                          {item.icon}
                        </div>
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span
                          className="relative z-10 text-[10px] font-bold px-2 py-0.5 rounded-full min-w-[18px] text-center transition-colors duration-400 shadow-xs"
                          style={{
                            backgroundColor: 'var(--accent-soft)',
                            color: 'var(--accent-text)',
                          }}
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
              <div className="px-3 pb-1.5 text-text-tertiary text-[11px] font-medium tracking-normal">
                Records
              </div>
              <nav className="space-y-0.5">
                {recordsNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'group relative flex items-center justify-between px-3.5 py-2 rounded-2xl transition-colors text-xs font-medium',
                        active
                          ? 'text-text-inverse font-semibold'
                          : 'text-text-secondary hover:text-text-primary hover:bg-surface-inset'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="active-sidebar-pill"
                          className="absolute inset-0 bg-text-primary rounded-2xl shadow-sm z-0"
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-2.5">
                        <div className={cn(active ? 'text-text-inverse' : 'text-text-secondary group-hover:text-text-primary')}>
                          {item.icon}
                        </div>
                        <span>{item.name}</span>
                      </div>
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* ACCOUNT */}
            <div>
              <div className="px-3 pb-1.5 text-text-tertiary text-[11px] font-medium tracking-normal">
                Account
              </div>
              <nav className="space-y-0.5">
                <Link
                  href="/settings"
                  className={cn(
                    'group relative flex items-center justify-between px-3.5 py-2 rounded-2xl transition-colors text-xs font-medium',
                    isActive('/settings')
                      ? 'text-text-inverse font-semibold'
                      : 'text-text-secondary hover:text-text-primary hover:bg-surface-inset'
                  )}
                >
                  {isActive('/settings') && (
                    <motion.div
                      layoutId="active-sidebar-pill"
                      className="absolute inset-0 bg-text-primary rounded-2xl shadow-sm z-0"
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                    />
                  )}
                  <div className="relative z-10 flex items-center gap-2.5">
                    <Settings className="w-4 h-4" />
                    <span>Settings</span>
                  </div>
                </Link>

                <button
                  type="button"
                  onClick={() => setHelpOpen(true)}
                  className="w-full group relative flex items-center justify-between px-3.5 py-2 rounded-2xl transition-all text-xs font-medium text-text-secondary hover:text-text-primary hover:bg-surface-inset cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4" />
                    <span>Help</span>
                  </div>
                  <span className="text-[10px] text-text-tertiary">4 tips</span>
                </button>
              </nav>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="p-3 space-y-2.5 bg-surface-elevated transition-colors duration-400">
          {/* Plan Card per Wharf Image: "Harbor plan" with accent progress fill */}
          <div 
            className="p-3.5 rounded-2xl space-y-2 border border-black/[0.04] dark:border-white/[0.06] shadow-xs transition-colors duration-400"
            style={{ backgroundColor: 'var(--accent-soft)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-text-primary">Harbor plan</span>
              <button
                type="button"
                onClick={() => alert('Plan management')}
                className="text-[11px] text-text-secondary hover:text-text-primary transition-colors cursor-pointer font-medium"
              >
                Manage
              </button>
            </div>
            <div className="space-y-1.5">
              <AnimatedProgressBar value={64} duration={0.7} barClassName="bg-[var(--accent)]" />
              <span className="text-[10px] text-text-tertiary block">
                1,284 of 2,000 orders this month
              </span>
            </div>
          </div>

          {/* User Row per Wharf Image: Noor Haddad, Operations lead */}
          <Link
            href="/settings"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-surface-inset transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-surface-inset border border-border flex items-center justify-center font-bold text-xs text-text-primary">
                NH
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-semibold text-text-primary leading-none">Noor Haddad</p>
                <p className="text-[10px] text-text-tertiary leading-none">Operations lead</p>
              </div>
            </div>
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
