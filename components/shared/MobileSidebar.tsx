'use client';

import React, { useEffect } from 'react';
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
  X,
  Zap,
} from 'lucide-react';
import { Avatar } from './Avatar';

export interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenHelp: () => void;
}

export function MobileSidebar({ isOpen, onClose, onOpenHelp }: MobileSidebarProps) {
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isActive = (href: string) => {
    if (href === '/dashboard' && (pathname === '/' || pathname === '/dashboard')) return true;
    return pathname.startsWith(href);
  };

  const operationsNav = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: 'Campaigns', href: '/campaigns', icon: <Megaphone className="w-4 h-4" /> },
    { name: 'Workflow', href: '/workflow', icon: <Network className="w-4 h-4" /> },
    { name: 'Simulator', href: '/simulator', icon: <Cpu className="w-4 h-4" /> },
    { name: 'Risks', href: '/risks', icon: <AlertTriangle className="w-4 h-4" /> },
  ];

  const recordsNav = [
    { name: 'Brands', href: '/brands', icon: <Building2 className="w-4 h-4" /> },
    { name: 'Invoices', href: '/invoices', icon: <Receipt className="w-4 h-4" /> },
    { name: 'Team', href: '/team', icon: <Users className="w-4 h-4" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Translucent Scrim */}
      <div
        className="fixed inset-0 bg-scrim backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Surface */}
      <aside className="relative w-72 max-w-[80vw] h-full bg-surface border-r border-border shadow-drawer flex flex-col justify-between p-5 drawer-slide-in">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-border">
            <Link href="/dashboard" onClick={onClose} className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-text-primary flex items-center justify-center shadow-sm">
                <Zap className="w-4 h-4 text-accent fill-accent" />
              </div>
              <span className="font-headline font-bold text-base tracking-tight text-text-primary uppercase">
                Creator Flow
              </span>
            </Link>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-text-secondary hover:text-text-primary"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Operations */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] px-3">
              Operations
            </span>
            <nav className="space-y-1 pt-1">
              {operationsNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-full text-xs font-bold transition-colors',
                    isActive(item.href)
                      ? 'bg-text-primary text-text-inverse shadow-sm'
                      : 'text-[#27272A] dark:text-[#F4F4F5] hover:text-[#09090B] dark:hover:text-white hover:bg-surface-inset'
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Records */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] px-3">
              Records
            </span>
            <nav className="space-y-1 pt-1">
              {recordsNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={onClose}
                  className={cn(
                    'flex items-center gap-3 px-3 py-2 rounded-full text-xs font-bold transition-colors',
                    isActive(item.href)
                      ? 'bg-text-primary text-text-inverse shadow-sm'
                      : 'text-[#27272A] dark:text-[#F4F4F5] hover:text-[#09090B] dark:hover:text-white hover:bg-surface-inset'
                  )}
                >
                  {item.icon}
                  <span>{item.name}</span>
                </Link>
              ))}
            </nav>
          </div>

          {/* Account */}
          <div className="space-y-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#71717A] dark:text-[#A1A1AA] px-3">
              Account
            </span>
            <nav className="space-y-1 pt-1">
              <Link
                href="/settings"
                onClick={onClose}
                className={cn(
                  'flex items-center gap-3 px-3 py-2 rounded-full text-xs font-bold transition-colors',
                  isActive('/settings')
                    ? 'bg-text-primary text-text-inverse shadow-sm'
                    : 'text-[#27272A] dark:text-[#F4F4F5] hover:text-[#09090B] dark:hover:text-white hover:bg-surface-inset'
                )}
              >
                <Settings className="w-4 h-4" />
                <span>Settings</span>
              </Link>
              <button
                onClick={() => {
                  onClose();
                  onOpenHelp();
                }}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-full text-xs font-bold text-[#27272A] dark:text-[#F4F4F5] hover:text-[#09090B] dark:hover:text-white hover:bg-surface-inset transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
                <span>Help & Guides</span>
              </button>
            </nav>
          </div>
        </div>

        {/* User profile footer */}
        <div className="pt-4 border-t border-border">
          <Avatar name="Marcus Vance" subtitle="Executive Creator" />
        </div>
      </aside>
    </div>
  );
}
