export * from './database';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface MetricTileData {
  title: string;
  value: number | string;
  subtitle: string;
  icon: string;
  trend?: string;
  color: 'emerald' | 'rose' | 'amber' | 'indigo' | 'cyan';
}

export interface CashFlowSummary {
  received: number;
  waiting: number;
  expected: number;
}
