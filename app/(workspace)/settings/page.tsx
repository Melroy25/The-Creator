'use client';

import React, { useState } from 'react';
import {
  PageHeader,
  GlassCard,
  PrimaryButton,
  SecondaryButton,
  SegmentedControl,
  AccentSwatchRow,
  Toggle,
  ConfirmModal,
  useTheme,
  useToast,
} from '@/components/shared';
import {
  Sun,
  Monitor,
  Moon,
  RotateCcw,
  Clock,
  Bell,
  Plug,
  CheckCircle2,
  ShieldAlert,
} from 'lucide-react';
import { resetDemoStore } from '@/lib/data';

type SettingsTab = 'account' | 'billing' | 'integrations' | 'workspace';

export default function SettingsPage() {
  const { theme, accent, setTheme, setAccent } = useTheme();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<SettingsTab>('workspace');
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Workspace settings state
  const [businessName, setBusinessName] = useState('Apex Media Studio');
  const [currency, setCurrency] = useState('USD, US dollar');
  const [timeZone, setTimeZone] = useState('America/Los_Angeles');
  const [capacityThreshold, setCapacityThreshold] = useState('80% (Tight)');

  // Notification toggles
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [approvalAlerts, setApprovalAlerts] = useState(true);
  const [cashFlowDigest, setCashFlowDigest] = useState(false);

  const handleSaveWorkspace = () => {
    toast({
      type: 'success',
      title: 'Workspace Saved',
      description: 'Your studio preferences and display settings have been updated.',
    });
  };

  const handleResetDemo = () => {
    resetDemoStore();
    setResetModalOpen(false);
    toast({
      type: 'warning',
      title: 'Demo Data Reset',
      description: 'All 3 brand partnerships, 25 tasks, and editor schedules restored to day-zero baseline.',
    });
  };

  return (
    <div className="space-y-8 pb-12 font-body">
      <PageHeader
        title="Settings"
        purpose="Your account, your plan, your connections, and how Creator Flow looks."
        badge="System Configuration"
      />

      {/* Sub-tabs per Wharf Screenshot: Account, Billing, Integrations, Workspace */}
      <div className="border-b border-border flex items-center gap-8 text-sm font-semibold text-text-secondary">
        <button
          onClick={() => setActiveTab('account')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'account' ? 'text-text-primary border-b-2 border-text-primary font-bold' : 'hover:text-text-primary'
          }`}
        >
          Account
        </button>
        <button
          onClick={() => setActiveTab('billing')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'billing' ? 'text-text-primary border-b-2 border-text-primary font-bold' : 'hover:text-text-primary'
          }`}
        >
          Billing
        </button>
        <button
          onClick={() => setActiveTab('integrations')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'integrations' ? 'text-text-primary border-b-2 border-text-primary font-bold' : 'hover:text-text-primary'
          }`}
        >
          Integrations
        </button>
        <button
          onClick={() => setActiveTab('workspace')}
          className={`pb-3 transition-colors cursor-pointer ${
            activeTab === 'workspace' ? 'text-text-primary border-b-2 border-text-primary font-bold' : 'hover:text-text-primary'
          }`}
        >
          Workspace
        </button>
      </div>

      {activeTab === 'workspace' && (
        <div className="space-y-6">
          {/* Top Row: Appearance Card + Workspace Details Card (Matching Image 1) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            {/* 1. Appearance Card (Exact Wharf Reference Design) */}
            <GlassCard className="lg:col-span-5 p-6 rounded-2xl bg-surface border border-border space-y-6 shadow-card">
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-lg text-text-primary tracking-tight">Appearance</h3>
                <p className="text-xs text-text-secondary font-normal">Yours only; your team picks their own</p>
              </div>

              {/* Theme Segmented Control with Light, System, Dark icons */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-text-secondary block">Theme</label>
                <SegmentedControl
                  options={[
                    { value: 'light', label: 'Light', icon: <Sun className="w-4 h-4" /> },
                    { value: 'system', label: 'System', icon: <Monitor className="w-4 h-4" /> },
                    { value: 'dark', label: 'Dark', icon: <Moon className="w-4 h-4" /> },
                  ]}
                  value={theme}
                  onChange={(val) => setTheme(val as any)}
                />
              </div>

              {/* Accent Row with four 56px round swatches */}
              <div className="space-y-2 pt-2">
                <label className="text-xs font-semibold text-text-secondary block">Accent</label>
                <AccentSwatchRow value={accent} onChange={setAccent} />
              </div>
            </GlassCard>

            {/* 2. Workspace Details Form (Matching Image 1 right side) */}
            <GlassCard className="lg:col-span-7 p-6 rounded-2xl bg-surface border border-border space-y-5 shadow-card">
              <div className="space-y-1">
                <h3 className="font-headline font-bold text-lg text-text-primary tracking-tight">Workspace</h3>
                <p className="text-xs text-text-secondary font-normal">What everyone on the team sees</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-secondary">Business name</label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-surface-inset border border-border rounded-full px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-secondary">Currency</label>
                  <select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    className="w-full bg-surface-inset border border-border rounded-full px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="USD, US dollar">USD, US dollar</option>
                    <option value="EUR, Euro">EUR, Euro</option>
                    <option value="GBP, British pound">GBP, British pound</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-secondary">Time zone</label>
                  <select
                    value={timeZone}
                    onChange={(e) => setTimeZone(e.target.value)}
                    className="w-full bg-surface-inset border border-border rounded-full px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="America/Los_Angeles">America/Los_Angeles</option>
                    <option value="America/New_York">America/New_York</option>
                    <option value="Europe/London">Europe/London</option>
                  </select>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-text-secondary">Capacity warning</label>
                  <select
                    value={capacityThreshold}
                    onChange={(e) => setCapacityThreshold(e.target.value)}
                    className="w-full bg-surface-inset border border-border rounded-full px-4 py-2 text-sm text-text-primary focus:outline-none focus:border-accent cursor-pointer"
                  >
                    <option value="80% (Tight)">At 80% capacity</option>
                    <option value="90% (Urgent)">At 90% capacity</option>
                    <option value="100% (Overloaded)">At 100% capacity</option>
                  </select>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <PrimaryButton size="sm" onClick={handleSaveWorkspace}>
                  Save workspace
                </PrimaryButton>
              </div>
            </GlassCard>
          </div>

          {/* Working Hours & Capacity */}
          <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-card">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent-strong" />
              <h3 className="font-headline font-bold text-base text-text-primary">Working Hours & Capacity Rules</h3>
            </div>
            <p className="text-xs text-text-secondary">
              The deterministic scheduler uses these capacity ceilings to compute task durations, buffer slack, and resource collisions.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
              <div className="p-3.5 rounded-xl bg-surface-inset border border-border space-y-1">
                <span className="text-[11px] font-mono text-text-secondary uppercase">Creator Hours</span>
                <p className="text-lg font-bold font-headline text-text-primary">8.0 hrs / day</p>
                <span className="text-[10px] text-text-tertiary">Mon–Fri (40 hrs/wk)</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-inset border border-border space-y-1">
                <span className="text-[11px] font-mono text-text-secondary uppercase">Editor Maya</span>
                <p className="text-lg font-bold font-headline text-text-primary">8.0 hrs / day</p>
                <span className="text-[10px] text-status-done-text font-semibold">Full Availability</span>
              </div>
              <div className="p-3.5 rounded-xl bg-surface-inset border border-border space-y-1">
                <span className="text-[11px] font-mono text-text-secondary uppercase">Editor Sam</span>
                <p className="text-lg font-bold font-headline text-text-primary">4.0 hrs / day</p>
                <span className="text-[10px] text-status-risk-text font-semibold">Limited Next Week</span>
              </div>
            </div>
          </GlassCard>

          {/* Notifications Toggle List */}
          <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-card">
            <div className="flex items-center gap-2">
              <Bell className="w-4 h-4 text-accent-strong" />
              <h3 className="font-headline font-bold text-base text-text-primary">Notification Preferences</h3>
            </div>
            <div className="divide-y divide-border pt-1">
              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-text-primary">Deadline Approaching Reminders</h4>
                  <p className="text-xs text-text-secondary">Notify when deliverables are due within 48 hours.</p>
                </div>
                <Toggle checked={deadlineReminders} onChange={setDeadlineReminders} />
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-text-primary">Overdue Brand Approval Alerts</h4>
                  <p className="text-xs text-text-secondary">Alert when sponsor review exceeds agreed contract SLA turnaround.</p>
                </div>
                <Toggle checked={approvalAlerts} onChange={setApprovalAlerts} />
              </div>

              <div className="py-3 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold text-text-primary">Weekly Financial Cash Flow Digest</h4>
                  <p className="text-xs text-text-secondary">Summary of incoming payments, waiting invoices, and expected receivables.</p>
                </div>
                <Toggle checked={cashFlowDigest} onChange={setCashFlowDigest} />
              </div>
            </div>
          </GlassCard>

          {/* Reset Demo Data Card */}
          <GlassCard className="p-6 rounded-2xl bg-surface border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-card">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-status-risk-text" />
                <h3 className="font-headline font-bold text-base text-text-primary">Reset Demo Data</h3>
              </div>
              <p className="text-xs text-text-secondary">
                Restore Marcus Vance’s demo workspace to the initial benchmark scenario (Nova Audio, Pixel & Co, Lumen Skincare).
              </p>
            </div>

            <SecondaryButton
              size="sm"
              icon={<RotateCcw className="w-3.5 h-3.5" />}
              onClick={() => setResetModalOpen(true)}
            >
              Reset demo data
            </SecondaryButton>
          </GlassCard>
        </div>
      )}

      {activeTab === 'integrations' && (
        <div className="space-y-4">
          <GlassCard className="p-6 rounded-2xl bg-surface border border-border space-y-4 shadow-card">
            <div className="flex items-center gap-2">
              <Plug className="w-4 h-4 text-accent-strong" />
              <h3 className="font-headline font-bold text-base text-text-primary">Connected Integrations</h3>
            </div>
            <p className="text-xs text-text-secondary">
              Third-party APIs for automated invoice syncing and platform analytics.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              {['YouTube Partner API', 'Instagram Graph API', 'Stripe Payments', 'QuickBooks / Xero'].map((intg) => (
                <div key={intg} className="p-4 rounded-xl bg-surface-inset border border-border flex items-center justify-between">
                  <span className="text-xs font-bold text-text-primary">{intg}</span>
                  <span className="text-[10px] font-mono text-text-tertiary bg-surface px-2.5 py-0.5 rounded-full border border-border">
                    Not configured
                  </span>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      )}

      {(activeTab === 'account' || activeTab === 'billing') && (
        <GlassCard className="p-8 rounded-2xl bg-surface border border-border text-center space-y-2 shadow-card">
          <h3 className="font-headline font-bold text-base text-text-primary capitalize">{activeTab} Details</h3>
          <p className="text-xs text-text-secondary max-w-sm mx-auto">
            Marcus Vance • Executive Creator Account on Harbor Pro Tier ($49/month).
          </p>
        </GlassCard>
      )}

      {/* Confirm Modal for Demo Reset */}
      <ConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleResetDemo}
        title="Reset Demo Scenario?"
        description="This will restore all brand contracts, tasks, and editor schedules to the initial Code Meet 2026 hackathon demo state. Any simulated shifts will be reset."
        confirmLabel="Reset Everything"
        variant="warning"
      />
    </div>
  );
}
