'use client';

import React from 'react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  header: string;
  accessorKey?: keyof T;
  cell?: (item: T) => React.ReactNode;
  className?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
  className?: string;
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  onRowClick,
  emptyMessage = 'No records found.',
  className,
}: DataTableProps<T>) {
  return (
    <div className={cn('w-full overflow-x-auto rounded-2xl border border-border bg-surface shadow-card', className)}>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-border bg-surface-inset text-[11px] font-mono uppercase tracking-wider text-text-secondary">
            {columns.map((col, idx) => (
              <th key={idx} className={cn('py-3.5 px-4 font-semibold', col.className)}>
                {col.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-border text-sm text-text-primary">
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="py-8 text-center text-xs text-text-tertiary font-mono">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr
                key={row.id}
                onClick={() => onRowClick && onRowClick(row)}
                className={cn(
                  'transition-colors duration-150',
                  onRowClick
                    ? 'hover:bg-surface-inset cursor-pointer active:bg-surface-inset/80'
                    : 'hover:bg-surface-inset/40'
                )}
              >
                {columns.map((col, colIdx) => (
                  <td key={colIdx} className={cn('py-3.5 px-4', col.className)}>
                    {col.cell ? col.cell(row) : (row[col.accessorKey as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
