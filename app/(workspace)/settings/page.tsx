import React from 'react';
import { PageHeader, EmptyState, SecondaryButton, PrimaryButton, GlassCard } from '@/components/shared';
import { Settings as SettingsIcon, RotateCcw, Save, Shield } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8 pb-12">
      <PageHeader
        title="Settings & Workspace Configuration"
        purpose="Manage workspace preferences, team capacity ceilings, buffer rules, and demo data controls."
        badge="System Config // v3.4.1"
        badgeVariant="primary"
        actions={
          <div className="flex items-center gap-2">
            <SecondaryButton size="sm" icon={<RotateCcw className="w-4 h-4" />}>
              Reset Demo Data
            </SecondaryButton>
            <PrimaryButton size="sm" icon={<Save className="w-4 h-4" />}>
              Save Changes
            </PrimaryButton>
          </div>
        }
      />

      {/* Tabs navigation from Stitch design */}
      <div className="border-b border-white/[0.08] flex items-center gap-6 text-sm font-semibold text-slate-400 overflow-x-auto pb-1">
        <span className="text-white border-b-2 border-indigo-500 pb-3 font-bold shrink-0">Appearance & Display</span>
        <span className="pb-3 hover:text-slate-200 cursor-pointer shrink-0">Profile & Account</span>
        <span className="pb-3 hover:text-slate-200 cursor-pointer shrink-0">Working Hours & Capacity</span>
        <span className="pb-3 hover:text-slate-200 cursor-pointer shrink-0">Integrations</span>
        <span className="pb-3 hover:text-slate-200 cursor-pointer shrink-0">Notifications</span>
      </div>

      {/* Demo Controls Callout */}
      <GlassCard className="p-6 rounded-2xl border-indigo-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-indigo-400 font-semibold text-xs">
            <Shield className="w-4 h-4" />
            <span>Hackathon Demonstration Controls</span>
          </div>
          <p className="text-sm text-slate-300">
            Current scenario: Marcus Vance (Brand A fixed deadline, Brand B pending approval, Brand C flexible).
          </p>
        </div>
        <SecondaryButton size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />}>
          Restore Initial Demo State
        </SecondaryButton>
      </GlassCard>

      <EmptyState
        title="Settings & Governance Controls Finalizing in Phase 10"
        description="The full theme contrast toggles, working capacity slider (20h-60h), and integration tokens will be finalized in Phase 10."
        icon={<SettingsIcon className="w-7 h-7 text-indigo-400" />}
      />
    </div>
  );
}
