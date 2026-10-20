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
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#F3F5FA]/95 backdrop-blur-xl border-t border-[#E2E6F0] z-50 flex items-center justify-around px-2 shadow-[0_-4px_16px_rgba(166,175,195,0.15)]">
      {navItems.map((item) => {
        const active = isActive(item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              'flex flex-col items-center justify-center gap-1 py-1 px-2.5 rounded-xl transition-all',
              active ? 'text-indigo-600 font-bold silk-inset' : 'text-[#64748B] hover:text-[#1E2337]'
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
