'use client';

import React, { useEffect, useState } from 'react';
import { PageHeader, DataTable, Column, StaggerContainer, StaggerItem } from '@/components/shared';
import { getBrands, getInitialBrands } from '@/lib/data';
import { Brand } from '@/lib/types';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>(getInitialBrands);

  useEffect(() => {
    getBrands().then(setBrands);
  }, []);

  const columns: Column<Brand>[] = [
    {
      header: 'Brand / Sponsor',
      accessorKey: 'name',
      cell: (b) => (
        <div className="space-y-0.5">
          <p className="font-semibold text-xs text-text-primary">{b.name}</p>
          <span className="text-[10px] text-text-tertiary block font-mono">ID: #{b.id.substring(0, 8)}</span>
        </div>
      ),
    },
    {
      header: 'Key Contact',
      cell: (b) => (
        <div className="space-y-0.5">
          <p className="text-xs font-medium text-text-primary">{b.contact_name || 'Brand Representative'}</p>
          <span className="text-[11px] text-text-tertiary">{b.contact_email || '—'}</span>
        </div>
      ),
    },
    {
      header: 'Partnership Notes & SLA',
      cell: (b) => (
        <p className="text-xs text-text-secondary leading-relaxed max-w-md font-normal">
          {b.notes || 'Active creator economy sponsor.'}
        </p>
      ),
    },
  ];

  return (
    <StaggerContainer className="space-y-8 pb-12 font-sans">
      <StaggerItem>
        <PageHeader
          title="Brand Partners"
          purpose="Directory of sponsor relationships, direct brand contacts, and contractual agreements."
          badge="Records // Brands"
        />
      </StaggerItem>

      <StaggerItem>
        <DataTable columns={columns} data={brands} />
      </StaggerItem>
    </StaggerContainer>
  );
}
