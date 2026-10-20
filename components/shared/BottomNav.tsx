'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Megaphone,
  Network,
  Cpu,
  AlertTriangle,
  Settings,
} from 'lucide-react';

export function BottomNav() {
  const pathname = usePathname();

  const navItems = [
    { name: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" /> },
    { name: 'Campaigns', href: '/campaigns', icon: <Megaphone className="w-5 h-5" /> },
    { name: 'Workflow', href: '/workflow', icon: <Network className="w-5 h-5" /> },
    { name: 'Simulator', href: '/simulator', icon: <Cpu className="w-5 h-5" /> },
    { name: 'Risks', href: '/risks', icon: <AlertTriangle className="w-5 h-5" /> },
    { name: 'Settings', href: '/settings', icon: <Settings className="w-5 h-5" /> },
  ];

  const isActive = (href: string) => {
    if (href === '/dashboard' && (pathname === '/' || pathname === '/dashboard')) return true;
    return pathname.startsWith(href);
  };

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#FCFBF7]/95 backdrop-blur-md border-t border-[#EDE6D3] z-50 flex items-center justify-around px-2 shadow-[0_-2px_10px_rgba(60,50,30,0.05)]">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 py-1 px-3 rounded-full transition-all',
              active ? 'text-[#1F1F23] font-bold bg-[#F4EFE0]' : 'text-[#6B6558] hover:text-[#1F1F23]'
            )}
          >
            {item.icon}
            <span className="text-[10px] tracking-tight">{item.name}</span>
          </Link>
        );
      })}
    </nav>
  );
}
