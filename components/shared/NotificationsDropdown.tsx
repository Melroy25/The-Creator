'use client';

import React, { useRef, useEffect } from 'react';
import { Bell, Clock, AlertTriangle, ShieldCheck, Check } from 'lucide-react';
import Link from 'next/link';

export interface NotificationItem {
  id: string;
  title: string;
  time: string;
  type: 'alert' | 'update' | 'approval';
  read: boolean;
}

export interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const notifications: NotificationItem[] = [
    {
      id: 'notif-1',
      title: 'Brand B: Script approval pending review (>48h SLA)',
      time: '6h ago',
      type: 'alert',
      read: false,
    },
    {
      id: 'notif-2',
      title: 'Editor Maya flagged schedule collision on Wednesday',
      time: '1d ago',
      type: 'update',
      read: false,
    },
    {
      id: 'notif-3',
      title: 'Nova Audio initial 50% deposit confirmed ($9,250)',
      time: '2d ago',
      type: 'approval',
      read: true,
    },
  ];

  return (
    <div
      ref={dropdownRef}
      className="absolute right-0 top-full mt-2 w-80 sm:w-96 bg-surface border border-border rounded-2xl shadow-drawer p-4 z-50 fade-drop-in text-text-primary"
    >
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bell className="w-4 h-4 text-accent-strong" />
          <span className="font-headline font-bold text-xs uppercase tracking-wider">Notifications</span>
        </div>
        <span className="text-[10px] font-mono font-bold bg-accent-tint text-accent-strong px-2 py-0.5 rounded-full border border-accent/20">
          2 Unread
        </span>
      </div>

      <div className="divide-y divide-border py-2">
        {notifications.map((item) => (
          <div
            key={item.id}
            className="py-2.5 px-2 rounded-xl hover:bg-surface-inset transition-colors flex items-start gap-3 cursor-pointer"
          >
            <div className="mt-0.5 shrink-0">
              {item.type === 'alert' && (
                <div className="w-6 h-6 rounded-full bg-status-risk-bg text-status-risk-text flex items-center justify-center border border-status-risk-border">
                  <AlertTriangle className="w-3.5 h-3.5" />
                </div>
              )}
              {item.type === 'update' && (
                <div className="w-6 h-6 rounded-full bg-accent-tint text-accent-strong flex items-center justify-center border border-accent/20">
                  <Clock className="w-3.5 h-3.5" />
                </div>
              )}
              {item.type === 'approval' && (
                <div className="w-6 h-6 rounded-full bg-status-done-bg text-status-done-text flex items-center justify-center border border-status-done-border">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
              )}
            </div>
            <div className="space-y-0.5 flex-1 min-w-0">
              <p className="text-xs font-semibold text-text-primary leading-snug">{item.title}</p>
              <span className="text-[10px] font-mono text-text-tertiary">{item.time}</span>
            </div>
            {!item.read && (
              <span className="w-2 h-2 rounded-full bg-accent shrink-0 mt-1.5" />
            )}
          </div>
        ))}
      </div>

      <div className="pt-2 border-t border-border text-center">
        <Link
          href="/risks"
          onClick={onClose}
          className="text-xs font-medium text-accent-strong hover:underline block py-1"
        >
          View all in Risk Radar →
        </Link>
      </div>
    </div>
  );
}
