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

export interface Customer {
  id: string;
  name: string;
  company: string;
  role: string;
  email: string;
  platform: string;
  status: 'active' | 'in_negotiation' | 'past';
  total_deal_value: number;
}
