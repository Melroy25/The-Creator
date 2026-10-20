'use client';

import React, { useEffect, useState } from 'react';
import { PageHeader, DataTable, Column, Avatar, StaggerContainer, StaggerItem } from '@/components/shared';
import { getResources, getInitialResources } from '@/lib/data';
import { Resource } from '@/lib/types';

export default function TeamPage() {
  const [team, setTeam] = useState<Resource[]>(getInitialResources);

  useEffect(() => {
    getResources().then(setTeam);
  }, []);

  const columns: Column<Resource>[] = [
    {
      header: 'Team Member',
      accessorKey: 'name',
      cell: (r) => (
        <Avatar name={r.name} subtitle={r.role.toUpperCase()} size="md" />
      ),
    },
    {
      header: 'Role',
      cell: (r) => (
        <span className="capitalize text-xs font-semibold text-text-primary">
          {r.role}
        </span>
      ),
    },
    {
      header: 'Capacity (Per Day)',
      cell: (r) => (
        <span className="font-mono text-xs font-semibold text-text-primary">
          {r.hours_per_day} hrs / day
        </span>
      ),
    },
    {
      header: 'Working Days',
      cell: (r) => (
        <span className="text-xs text-text-secondary font-mono">
          Mon–Fri (5 days)
        </span>
      ),
    },
    {
      header: 'Availability Status',
      cell: (r) => {
        if (r.name.includes('Sam')) {
          return (
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-status-risk-bg text-status-risk-text border border-status-risk-border font-semibold">
              Half-Days Next Week (4h/day)
            </span>
          );
        }
        return (
          <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-status-done-bg text-status-done-text border border-status-done-border font-semibold">
            Full Availability (8h/day)
          </span>
        );
      },
    },
  ];

  return (
    <StaggerContainer className="space-y-8 pb-12 font-sans">
      <StaggerItem>
        <PageHeader
          title="Studio Team & Capacity"
          purpose="Crew roster, daily working allocations, and editor availability schedules."
          badge="Records // Team"
        />
      </StaggerItem>

      <StaggerItem>
        <DataTable columns={columns} data={team} />
      </StaggerItem>
    </StaggerContainer>
  );
}
