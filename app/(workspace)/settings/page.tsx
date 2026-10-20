import React from 'react';
import { PageHeader, EmptyState, SecondaryButton, PrimaryButton, GlassCard } from '@/components/shared';
import { Settings as SettingsIcon, RotateCcw, Save, Shield, Palette, Check } from 'lucide-react';

export default function SettingsPage() {
  const accents = [
    { name: 'Warm Amber', code: '#EDBE4B', tint: '#FBEFC2', desc: 'Editorial, grounded (Default)', active: true },
    { name: 'Mint', code: '#94E0D0', tint: '#E2F7F2', desc: 'Fresh, balanced, energetic', active: false },
    { name: 'Pink', code: '#F7B3CB', tint: '#FDE8F0', desc: 'Creative, playful, vibrant', active: false },
    { name: 'Blue', code: '#A0C9F2', tint: '#E5F0FC', desc: 'Calm, analytical, focused', active: false },
  ];

  return (
    <div className="space-y-8 pb-12 font-body">
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

      {/* Tabs navigation from Warm Editorial Studio design */}
      <div className="border-b border-[#EDE6D3] flex items-center gap-6 text-sm font-semibold text-[#6B6558] overflow-x-auto pb-1">
        <span className="text-[#1F1F23] border-b-2 border-[#1F1F23] pb-3 font-bold shrink-0 cursor-pointer">Appearance & Multi-Accent</span>
        <span className="pb-3 hover:text-[#1F1F23] cursor-pointer shrink-0">Profile & Studio</span>
        <span className="pb-3 hover:text-[#1F1F23] cursor-pointer shrink-0">Working Hours & Capacity</span>
        <span className="pb-3 hover:text-[#1F1F23] cursor-pointer shrink-0">Integrations</span>
        <span className="pb-3 hover:text-[#1F1F23] cursor-pointer shrink-0">Notifications</span>
      </div>

      {/* Multi-Accent Hierarchy Showcase */}
      <GlassCard className="p-6 rounded-2xl bg-[#FCFBF7] space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-[#875C05]" />
          <h3 className="text-sm font-headline font-bold text-[#1F1F23]">Multi-Accent Studio Palette</h3>
        </div>
        <p className="text-xs text-[#6B6558]">
          Warm Editorial Studio supports 4 curated studio accent washes that tint badges, progress meters, and chart fills across your workspace.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-2">
          {accents.map((accent) => (
            <div
              key={accent.name}
              className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                accent.active
                  ? 'bg-[#FCFBF7] border-[#EDBE4B] ring-2 ring-[#EDBE4B]/30 shadow-sm'
                  : 'bg-[#FAF6EA] border-[#EDE6D3] hover:border-[#C8C5CB]'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                    style={{ backgroundColor: accent.code }}
                  />
                  <span className="text-xs font-bold text-[#1F1F23]">{accent.name}</span>
                </div>
                {accent.active && <Check className="w-4 h-4 text-[#875C05]" />}
              </div>
              <p className="text-[11px] text-[#6B6558] font-normal leading-tight">
                {accent.desc}
              </p>
            </div>
          ))}
        </div>
      </GlassCard>

      {/* Demo Controls Callout */}
      <GlassCard className="p-6 rounded-2xl bg-[#FCFBF7] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-[#875C05] font-bold text-xs">
            <Shield className="w-4 h-4" />
            <span>Hackathon Demonstration Controls</span>
          </div>
          <p className="text-sm text-[#6B6558] font-normal">
            Current scenario: Marcus Vance (Brand A fixed deadline, Brand B pending approval, Brand C flexible).
          </p>
        </div>
        <SecondaryButton size="sm" icon={<RotateCcw className="w-3.5 h-3.5" />}>
          Restore Initial Demo State
        </SecondaryButton>
      </GlassCard>

      <EmptyState
        title="Settings & Governance Controls"
        description="Theme contrast preferences, creator working capacity rules (8h/day, Mon-Fri), and team availability ceilings."
        icon={<SettingsIcon className="w-7 h-7 text-[#875C05]" />}
      />
    </div>
  );
}
