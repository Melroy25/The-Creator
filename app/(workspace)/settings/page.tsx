'use client';

import React, { useState } from 'react';
import {
  PageHeader,
  SegmentedControl,
  AccentSwatchRow,
  Toggle,
  ConfirmModal,
  StaggerContainer,
  StaggerItem,
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
  ChevronDown,
} from 'lucide-react';
import { resetDemoStore } from '@/lib/data';

type SettingsTab = 'account' | 'billing' | 'integrations' | 'workspace';

export default function SettingsPage() {
  const { theme, accent, setTheme, setAccent } = useTheme();
  const { toast } = useToast();

  const [activeTab, setActiveTab] = useState<SettingsTab>('workspace');
  const [resetModalOpen, setResetModalOpen] = useState(false);

  // Workspace settings state matching Wharf Screenshot
  const [businessName, setBusinessName] = useState('Northlane Roasters');
  const [currency, setCurrency] = useState('USD, US dollar');
  const [timeZone, setTimeZone] = useState('America/New_York');
  const [warningThreshold, setWarningThreshold] = useState('At the par level');

  // Account tab notification toggles
  const [deadlineReminders, setDeadlineReminders] = useState(true);
  const [approvalAlerts, setApprovalAlerts] = useState(true);

  const handleSaveWorkspace = () => {
    toast({
      type: 'success',
      title: 'Workspace Saved',
      description: 'Your workspace settings and display appearance have been updated.',
    });
  };

  const handleResetDemo = () => {
    resetDemoStore();
    setResetModalOpen(false);
    toast({
      type: 'warning',
      title: 'Demo Data Reset',
      description: 'All brand partnerships, tasks, and editor schedules restored to day-zero baseline.',
    });
  };

  return (
    <StaggerContainer className="space-y-6 pb-12 font-sans">
      {/* Wharf Header: Settings title, subtitle, circular notification bell on right */}
      <StaggerItem>
        <PageHeader
          title="Settings"
          purpose="Your account, your plan, your connections, and how Wharf looks."
        />
      </StaggerItem>

      {/* Sub-tabs matching Wharf Image 1, 2, 3: Account, Billing, Integrations, Workspace */}
      <StaggerItem>
        <div className="border-b border-border flex items-center gap-7 sm:gap-9 text-xs sm:text-sm text-text-secondary font-medium">
          <button
            onClick={() => setActiveTab('account')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'account'
                ? 'text-text-primary border-b-2 border-text-primary font-semibold'
                : 'hover:text-text-primary'
            }`}
          >
            Account
          </button>
          <button
            onClick={() => setActiveTab('billing')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'billing'
                ? 'text-text-primary border-b-2 border-text-primary font-semibold'
                : 'hover:text-text-primary'
            }`}
          >
            Billing
          </button>
          <button
            onClick={() => setActiveTab('integrations')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'integrations'
                ? 'text-text-primary border-b-2 border-text-primary font-semibold'
                : 'hover:text-text-primary'
            }`}
          >
            Integrations
          </button>
          <button
            onClick={() => setActiveTab('workspace')}
            className={`pb-3 transition-colors cursor-pointer ${
              activeTab === 'workspace'
                ? 'text-text-primary border-b-2 border-text-primary font-semibold'
                : 'hover:text-text-primary'
            }`}
          >
            Workspace
          </button>
        </div>
      </StaggerItem>

      {/* TAB 1: WORKSPACE (Matches Wharf Image 1, 2, 3) */}
      {activeTab === 'workspace' && (
        <StaggerItem>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-start pt-1">
            {/* 1. Appearance Card */}
            <div className="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-card space-y-6 hover:-translate-y-0.5 transition-all duration-150">
              <div className="space-y-0.5">
                <h3 className="font-sans font-bold text-base sm:text-lg text-text-primary tracking-tight">
                  Appearance
                </h3>
                <p className="text-xs text-text-secondary font-normal">
                  Yours only; your team picks their own
                </p>
              </div>

              {/* Theme Segmented Control */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-text-secondary block">
                  Theme
                </label>
                <SegmentedControl
                  options={[
                    { value: 'light', label: 'Light', icon: <Sun className="w-3.5 h-3.5" /> },
                    { value: 'system', label: 'System', icon: <Monitor className="w-3.5 h-3.5" /> },
                    { value: 'dark', label: 'Dark', icon: <Moon className="w-3.5 h-3.5" /> },
                  ]}
                  value={theme}
                  onChange={(val) => setTheme(val as any)}
                />
              </div>

              {/* Accent Swatch Row */}
              <div className="space-y-2 pt-1">
                <label className="text-xs font-medium text-text-secondary block">
                  Accent
                </label>
                <AccentSwatchRow value={accent} onChange={setAccent} />
              </div>
            </div>

            {/* 2. Workspace Form Card */}
            <div className="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-card space-y-6 hover:-translate-y-0.5 transition-all duration-150">
              <div className="space-y-0.5">
                <h3 className="font-sans font-bold text-base sm:text-lg text-text-primary tracking-tight">
                  Workspace
                </h3>
                <p className="text-xs text-text-secondary font-normal">
                  What everyone on the team sees
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary block">
                    Business name
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="w-full bg-surface-inset border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-text-secondary transition-colors"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary block">
                    Currency
                  </label>
                  <div className="relative">
                    <select
                      value={currency}
                      onChange={(e) => setCurrency(e.target.value)}
                      className="w-full bg-surface-inset border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-text-secondary transition-colors appearance-none cursor-pointer pr-8"
                    >
                      <option value="USD, US dollar">USD, US dollar</option>
                      <option value="EUR, Euro">EUR, Euro</option>
                      <option value="GBP, British pound">GBP, British pound</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-text-tertiary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary block">
                    Time zone
                  </label>
                  <div className="relative">
                    <select
                      value={timeZone}
                      onChange={(e) => setTimeZone(e.target.value)}
                      className="w-full bg-surface-inset border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-text-secondary transition-colors appearance-none cursor-pointer pr-8"
                    >
                      <option value="America/New_York">America/New_York</option>
                      <option value="America/Los_Angeles">America/Los_Angeles</option>
                      <option value="Europe/London">Europe/London</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-text-tertiary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-medium text-text-secondary block">
                    Low-stock warning
                  </label>
                  <div className="relative">
                    <select
                      value={warningThreshold}
                      onChange={(e) => setWarningThreshold(e.target.value)}
                      className="w-full bg-surface-inset border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none focus:border-text-secondary transition-colors appearance-none cursor-pointer pr-8"
                    >
                      <option value="At the par level">At the par level</option>
                      <option value="At 80% capacity">At 80% capacity</option>
                      <option value="At 90% capacity">At 90% capacity</option>
                    </select>
                    <ChevronDown className="w-3.5 h-3.5 text-text-tertiary absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveWorkspace}
                  className="bg-text-primary text-text-inverse font-semibold text-xs px-5 py-2.5 rounded-full hover:opacity-90 transition-opacity shadow-sm cursor-pointer"
                >
                  Save workspace
                </button>
              </div>
            </div>
          </div>
        </StaggerItem>
      )}

      {/* TAB 2: ACCOUNT */}
      {activeTab === 'account' && (
        <div className="max-w-2xl space-y-6 pt-1">
          <div className="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-card space-y-5">
            <h3 className="font-sans font-bold text-base text-text-primary">
              Account Profile
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs text-text-secondary">Creator Name</label>
                <input
                  type="text"
                  defaultValue="Marcus Vance"
                  className="w-full bg-surface-inset border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none"
                />
              </div>
              <div className="space-y-1">
                <label className="text-xs text-text-secondary">Email</label>
                <input
                  type="email"
                  defaultValue="marcus@apexcreators.com"
                  className="w-full bg-surface-inset border border-border rounded-xl px-3.5 py-2 text-xs text-text-primary focus:outline-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-card space-y-3">
            <h3 className="font-sans font-bold text-base text-text-primary">
              Reset Demo Sandbox
            </h3>
            <p className="text-xs text-text-secondary leading-relaxed">
              Restore all campaigns, tasks, and editor schedules back to day-zero baseline.
            </p>
            <button
              type="button"
              onClick={() => setResetModalOpen(true)}
              className="bg-surface-inset text-status-overdue-text border border-status-overdue-border hover:bg-status-overdue-bg px-4 py-2 rounded-full text-xs font-semibold transition-colors cursor-pointer flex items-center gap-2"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Reset Demo Data
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: BILLING */}
      {activeTab === 'billing' && (
        <div className="max-w-2xl space-y-6 pt-1">
          <div className="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-card space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans font-bold text-base text-text-primary">Harbor Plan</h3>
                <p className="text-xs text-text-secondary">Professional Creator Tier</p>
              </div>
              <span className="text-xs font-bold text-accent-strong bg-accent-tint px-3 py-1 rounded-full border border-accent/20">
                ACTIVE
              </span>
            </div>
            <div className="p-4 rounded-2xl bg-surface-inset border border-border space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-text-secondary">Monthly Orders / Deals</span>
                <span className="font-mono font-semibold text-text-primary">1,284 / 2,000</span>
              </div>
              <div className="w-full h-2 rounded-full bg-border overflow-hidden">
                <div className="h-full bg-accent rounded-full w-[64%]" />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: INTEGRATIONS */}
      {activeTab === 'integrations' && (
        <div className="max-w-2xl space-y-4 pt-1">
          <div className="bg-surface border border-border rounded-3xl p-6 sm:p-7 shadow-card space-y-4">
            <h3 className="font-sans font-bold text-base text-text-primary">
              External Connections
            </h3>
            <div className="space-y-3">
              {[
                { name: 'YouTube Studio API', desc: 'Auto-detect uploaded sponsor videos', status: 'Connected' },
                { name: 'Instagram Creator Graph', desc: 'Sync Reels & Story analytics', status: 'Not configured' },
                { name: 'QuickBooks Online', desc: 'Export sponsor invoices & track payouts', status: 'Not configured' },
              ].map((integ) => (
                <div key={integ.name} className="p-3.5 rounded-2xl bg-surface-inset border border-border flex items-center justify-between">
                  <div>
                    <p className="text-xs font-semibold text-text-primary">{integ.name}</p>
                    <p className="text-[11px] text-text-secondary">{integ.desc}</p>
                  </div>
                  <span className={`text-[10px] font-mono px-2.5 py-0.5 rounded-full border ${
                    integ.status === 'Connected'
                      ? 'bg-status-done-bg text-status-done-text border-status-done-border font-semibold'
                      : 'bg-surface text-text-tertiary border-border'
                  }`}>
                    {integ.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Reset Demo Confirmation Modal */}
      <ConfirmModal
        isOpen={resetModalOpen}
        onClose={() => setResetModalOpen(false)}
        onConfirm={handleResetDemo}
        title="Reset Demo Data?"
        description="Are you sure you want to reset all brands, tasks, and editor schedules back to baseline?"
        confirmLabel="Reset Everything"
        cancelLabel="Cancel"
        variant="danger"
      />
    </StaggerContainer>
  );
}