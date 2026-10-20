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
              className="flex items-center justify-between px-3.5 py-2 rounded-xl bg-[#F5F2EB] dark:bg-[#1E1E24] border border-[#E5DFD3] dark:border-[#2C2C34] text-[13px] text-[#52525B] dark:text-[#A1A1AA] hover:border-[#C5BFB0] transition-colors cursor-pointer shadow-xs"
            >
              <div className="flex items-center gap-2.5">
                <Search className="w-4 h-4 text-[#71717A] shrink-0" />
                <span className="font-normal text-[#52525B] dark:text-[#A1A1AA]">Search orders</span>
              </div>
              <kbd className="text-[10px] font-mono font-medium bg-white/90 dark:bg-[#2A2A30] border border-[#E0D9CC] dark:border-[#383842] px-1.5 py-0.5 rounded-md text-[#71717A]">
                CtrlK
              </kbd>
            </div>
          </div>

          {/* Navigation Scroll Area */}
          <div className="flex-1 overflow-y-auto px-3 py-1 space-y-6">
            {/* OPERATIONS */}
            <div>
              <div className="px-3.5 pb-2 text-[#8E8E93] dark:text-[#71717A] text-[11px] font-semibold tracking-normal uppercase">
                Operations
              </div>
              <nav className="space-y-1">
                {operationsNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-colors text-[13px] font-medium',
                        active
                          ? 'text-white font-semibold'
                          : 'text-[#27272A] dark:text-[#D4D4D8] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F3EFE6] dark:hover:bg-[#26262B]'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="active-sidebar-pill"
                          className="absolute inset-0 bg-[#18181B] rounded-2xl shadow-sm z-0"
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-2.5">
                        <div className={cn(active ? 'text-white' : 'text-[#52525B] dark:text-[#A1A1AA] group-hover:text-[#09090B] dark:group-hover:text-white transition-colors')}>
                          {item.icon}
                        </div>
                        <span>{item.name}</span>
                      </div>

                      {item.badge && (
                        <span
                          className={cn(
                            'relative z-10 text-[11px] font-bold px-2 py-0.5 rounded-full min-w-[20px] text-center transition-colors duration-400 shadow-xs',
                            item.name === 'Stock'
                              ? 'bg-[#FEF3C7] text-[#92400E] dark:bg-[#78350F]/40 dark:text-[#FCD34D]'
                              : ''
                          )}
                          style={
                            item.name !== 'Stock'
                              ? {
                                  backgroundColor: 'var(--accent-soft)',
                                  color: 'var(--accent-text)',
                                }
                              : undefined
                          }
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
              <div className="px-3.5 pb-2 text-[#8E8E93] dark:text-[#71717A] text-[11px] font-semibold tracking-normal uppercase">
                Records
              </div>
              <nav className="space-y-1">
                {recordsNav.map((item) => {
                  const active = isActive(item.href);
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={cn(
                        'group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-colors text-[13px] font-medium',
                        active
                          ? 'text-white font-semibold'
                          : 'text-[#27272A] dark:text-[#D4D4D8] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F3EFE6] dark:hover:bg-[#26262B]'
                      )}
                    >
                      {active && (
                        <motion.div
                          layoutId="active-sidebar-pill"
                          className="absolute inset-0 bg-[#18181B] rounded-2xl shadow-sm z-0"
                          transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                        />
                      )}
                      <div className="relative z-10 flex items-center gap-2.5">
                        <div className={cn(active ? 'text-white' : 'text-[#52525B] dark:text-[#A1A1AA] group-hover:text-[#09090B] dark:group-hover:text-white transition-colors')}>
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
              <div className="px-3.5 pb-2 text-[#8E8E93] dark:text-[#71717A] text-[11px] font-semibold tracking-normal uppercase">
                Account
              </div>
              <nav className="space-y-1">
                <Link
                  href="/settings"
                  className={cn(
                    'group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-colors text-[13px] font-medium',
                    isActive('/settings')
                      ? 'text-white font-semibold'
                      : 'text-[#27272A] dark:text-[#D4D4D8] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F3EFE6] dark:hover:bg-[#26262B]'
                  )}
                >
                  {isActive('/settings') && (
                    <motion.div
                      layoutId="active-sidebar-pill"
                      className="absolute inset-0 bg-[#18181B] rounded-2xl shadow-sm z-0"
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
                  className="w-full group relative flex items-center justify-between px-3.5 py-2.5 rounded-2xl transition-all text-[13px] font-medium text-[#27272A] dark:text-[#D4D4D8] hover:text-[#09090B] dark:hover:text-white hover:bg-[#F3EFE6] dark:hover:bg-[#26262B] cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-[#52525B] dark:text-[#A1A1AA] group-hover:text-[#09090B] dark:group-hover:text-white transition-colors" />
                    <span>Help</span>
                  </div>
                  <span className="text-xs text-[#71717A]">4 tips</span>
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
              <span className="text-[13px] font-bold text-[#09090B] dark:text-white">Harbor plan</span>
              <button
                type="button"
                onClick={() => alert('Plan management')}
                className="text-xs text-[#52525B] dark:text-[#A1A1AA] hover:text-[#09090B] dark:hover:text-white transition-colors cursor-pointer font-semibold"
              >
                Manage
              </button>
            </div>
            <div className="space-y-1.5">
              <AnimatedProgressBar value={64} duration={0.7} barClassName="bg-[var(--accent)]" />
              <span className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] block">
                1,284 of 2,000 orders this month
              </span>
            </div>
          </div>

          {/* User Row per Wharf Image: Noor Haddad, Operations lead */}
          <Link
            href="/settings"
            className="flex items-center justify-between p-2 rounded-xl hover:bg-[#F3EFE6] dark:hover:bg-[#26262B] transition-colors group cursor-pointer"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full bg-white dark:bg-[#2A2A30] border border-border flex items-center justify-center font-bold text-xs text-[#09090B] dark:text-white shadow-xs">
                NH
              </div>
              <div className="space-y-0.5">
                <p className="text-[13px] font-bold text-[#09090B] dark:text-white leading-none">Noor Haddad</p>
                <p className="text-[11px] text-[#71717A] dark:text-[#A1A1AA] leading-none">Operations lead</p>
              </div>
            </div>
            <span className="text-[#A1A1AA] group-hover:text-[#09090B] dark:group-hover:text-white text-sm font-mono">
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
