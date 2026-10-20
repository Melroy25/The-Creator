'use client';

import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';
import { GlassCard } from './GlassCard';
import { SegmentedControl } from './SegmentedControl';
import { CountUp } from './motion/CountUp';
import { TrendingUp } from 'lucide-react';

interface DataPoint {
  date: string;
  amount: number;
}

const DATA_30_DAYS: DataPoint[] = [
  { date: 'Sep 25', amount: 3200 },
  { date: 'Sep 28', amount: 4800 },
  { date: 'Sep 30', amount: 2900 },
  { date: 'Oct 02', amount: 4100 },
  { date: 'Oct 05', amount: 3400 },
  { date: 'Oct 08', amount: 5200 },
  { date: 'Oct 10', amount: 3900 },
  { date: 'Oct 13', amount: 4600 },
  { date: 'Oct 15', amount: 5800 },
  { date: 'Oct 18', amount: 3100 },
  { date: 'Oct 20', amount: 5400 },
];

const DATA_7_DAYS: DataPoint[] = [
  { date: 'Oct 14', amount: 4200 },
  { date: 'Oct 15', amount: 5800 },
  { date: 'Oct 16', amount: 3900 },
  { date: 'Oct 17', amount: 4600 },
  { date: 'Oct 18', amount: 3100 },
  { date: 'Oct 19', amount: 4900 },
  { date: 'Oct 20', amount: 5400 },
];

const DATA_90_DAYS: DataPoint[] = [
  { date: 'Aug', amount: 18400 },
  { date: 'Sep', amount: 28900 },
  { date: 'Oct', amount: 36500 },
];

export function RevenueChartCard() {
  const [timeframe, setTimeframe] = useState<'7' | '30' | '90'>('30');

  const dataMap = {
    '7': DATA_7_DAYS,
    '30': DATA_30_DAYS,
    '90': DATA_90_DAYS,
  };

  const currentData = dataMap[timeframe];

  return (
    <GlassCard className="p-6 rounded-2xl bg-surface border border-border flex flex-col justify-between space-y-6">
      {/* Header with Title and Segmented Range Control */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <h3 className="font-headline font-bold text-lg text-text-primary tracking-tight">Revenue</h3>
            <span className="text-xs font-mono font-bold text-status-done-text bg-status-done-bg border border-status-done-border px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              +9.8% vs past 30d
            </span>
          </div>
          <p className="text-xs text-text-secondary font-normal">
            Verified deal receipts and recorded sponsor settlements.
          </p>
        </div>

        <SegmentedControl
          size="sm"
          options={[
            { value: '7', label: '7 days' },
            { value: '30', label: '30 days' },
            { value: '90', label: '90 days' },
          ]}
          value={timeframe}
          onChange={(v) => setTimeframe(v as '7' | '30' | '90')}
        />
      </div>

      {/* KPI Display */}
      <div>
        <span className="font-sans text-4xl sm:text-5xl font-bold text-text-primary tracking-tight leading-none">
          <CountUp value={107870} prefix="$" duration={900} />
        </span>
      </div>

      {/* Chart Canvas */}
      <div className="w-full h-56 -ml-2">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="accentGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--accent-base)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="var(--accent-base)" stopOpacity={0.0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              stroke="var(--text-tertiary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              fontFamily="var(--font-mono)"
            />
            <YAxis
              stroke="var(--text-tertiary)"
              fontSize={11}
              tickLine={false}
              axisLine={false}
              tickFormatter={(v) => `$${v / 1000}k`}
              fontFamily="var(--font-mono)"
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  return (
                    <div className="bg-text-primary text-text-inverse px-3 py-1.5 rounded-xl shadow-drawer text-xs font-mono font-bold">
                      ${Number(payload[0].value).toLocaleString()}
                    </div>
                  );
                }
                return null;
              }}
            />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="var(--text-primary)"
              strokeWidth={2.5}
              fillOpacity={1}
              fill="url(#accentGradient)"
              isAnimationActive={true}
              animationDuration={1000}
              animationEasing="ease-out"
              activeDot={{ r: 6, fill: 'var(--accent-base)', stroke: 'var(--text-primary)', strokeWidth: 2 }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </GlassCard>
  );
}
