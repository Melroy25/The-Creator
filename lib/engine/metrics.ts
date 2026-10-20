/**
 * CREATOR FLOW: Deterministic Metrics & Formulas Engine
 * Pure TypeScript. Calculates workload per person per week, brand reliability scores,
 * honest campaign profitability with missing-cost tagging, and money strip accounting.
 * Zero AI guessing; strict mathematical compliance with BRIEF.md Section 5.
 */

import { DateString, EngineInput, Schedule } from './types';
import { addCalendarDays, getIsoDayOfWeek } from './calendar';

export interface WeekWorkload {
  weekStart: DateString;
  resourceId: string;
  resourceName: string;
  plannedHours: number;
  availableHours: number;
  loadPercentage: number;
  status: 'healthy' | 'tight' | 'overloaded';
}

/**
 * Calculates per-person per-week workload.
 * Formula: load % = planned hours ÷ available hours × 100
 * Classification: < 80% = Healthy, 80-100% = Tight, > 100% = Overloaded
 */
export function calculateWorkloadByWeek(
  input: EngineInput,
  schedule: Schedule,
  weeksAhead: number = 4
): WeekWorkload[] {
  const results: WeekWorkload[] = [];

  // Find Monday of the current week as start
  const todayIsoDay = getIsoDayOfWeek(input.today); // 1 = Monday
  const daysSinceMonday = todayIsoDay - 1;
  const currentWeekMonday = addCalendarDays(input.today, -daysSinceMonday);

  for (const resource of input.resources) {
    for (let w = 0; w < weeksAhead; w++) {
      const weekStart = addCalendarDays(currentWeekMonday, w * 7);
      const weekEnd = addCalendarDays(weekStart, 6);

      // Calculate planned hours scheduled for this resource during this week
      let plannedHours = 0;
      for (const [taskId, sched] of Object.entries(schedule)) {
        if (sched.assigneeId === resource.id) {
          // Check overlap between [sched.start, sched.finish] and [weekStart, weekEnd]
          if (sched.finish >= weekStart && sched.start <= weekEnd) {
            // Task falls in this week - prorate effort or allocate hours
            const task = input.tasks.find(t => t.id === taskId);
            const effort = task?.estimatedHours || sched.hoursPerDay || 4;
            plannedHours += effort;
          }
        }
      }

      // Calculate available hours in this week considering working days and availability overrides
      let availableHours = 0;
      for (let d = 0; d < 7; d++) {
        const dateStr = addCalendarDays(weekStart, d);
        const isoDay = getIsoDayOfWeek(dateStr);

        if (resource.workingDays.includes(isoDay) && input.calendar.workingDaysOfWeek.includes(isoDay)) {
          // Check availability override
          let dailyCapacity = resource.hoursPerDay;
          for (const avail of input.availability) {
            if (avail.resourceId === resource.id && dateStr >= avail.dateFrom && dateStr <= avail.dateTo) {
              dailyCapacity = avail.hoursPerDay;
              break;
            }
          }
          availableHours += dailyCapacity;
        }
      }

      const loadPercentage =
        availableHours > 0 ? Math.round((plannedHours / availableHours) * 100) : plannedHours > 0 ? 150 : 0;

      let status: 'healthy' | 'tight' | 'overloaded' = 'healthy';
      if (loadPercentage > 100) {
        status = 'overloaded';
      } else if (loadPercentage >= 80) {
        status = 'tight';
      }

      results.push({
        weekStart,
        resourceId: resource.id,
        resourceName: resource.name,
        plannedHours,
        availableHours,
        loadPercentage,
        status,
      });
    }
  }

  return results;
}

export interface BrandApprovalRecord {
  turnaroundDays: number;
  expectedDays: number;
}

export interface BrandPaymentRecord {
  daysLate: number; // <= 0 is on-time, > 0 is late
}

export interface BrandReliabilityResult {
  score: number | null; // null if < 3 total events
  approvalOnTimeRate: number | null;
  paymentOnTimeRate: number | null;
  avgApprovalDelayDays: number;
  avgPaymentDelayDays: number;
  totalEvents: number;
  statusText: string;
}

/**
 * Calculates Brand Reliability Score strictly per BRIEF.md formula:
 * score = 100 × (0.5 × on-time approval rate + 0.5 × on-time payment rate)
 * Requires at least 3 recorded events; otherwise returns score: null ("Not enough data").
 */
export function calculateBrandReliability(
  approvals: BrandApprovalRecord[],
  payments: BrandPaymentRecord[]
): BrandReliabilityResult {
  const totalEvents = approvals.length + payments.length;

  if (totalEvents < 3) {
    return {
      score: null,
      approvalOnTimeRate: null,
      paymentOnTimeRate: null,
      avgApprovalDelayDays: 0,
      avgPaymentDelayDays: 0,
      totalEvents,
      statusText: 'Not enough data (minimum 3 completed events required)',
    };
  }

  // Approval on-time rate
  const onTimeApprovals = approvals.filter(a => a.turnaroundDays <= a.expectedDays).length;
  const approvalOnTimeRate = approvals.length > 0 ? onTimeApprovals / approvals.length : 1.0;
  const totalApprovalDelay = approvals.reduce(
    (acc, a) => acc + Math.max(0, a.turnaroundDays - a.expectedDays),
    0
  );
  const avgApprovalDelayDays = approvals.length > 0 ? Math.round((totalApprovalDelay / approvals.length) * 10) / 10 : 0;

  // Payment on-time rate
  const onTimePayments = payments.filter(p => p.daysLate <= 0).length;
  const paymentOnTimeRate = payments.length > 0 ? onTimePayments / payments.length : 1.0;
  const totalPaymentDelay = payments.reduce((acc, p) => acc + Math.max(0, p.daysLate), 0);
  const avgPaymentDelayDays = payments.length > 0 ? Math.round((totalPaymentDelay / payments.length) * 10) / 10 : 0;

  const score = Math.round(100 * (0.5 * approvalOnTimeRate + 0.5 * paymentOnTimeRate));

  let statusText = 'Excellent Reliability';
  if (score < 60) statusText = 'High Friction';
  else if (score < 80) statusText = 'Moderate Delays';

  return {
    score,
    approvalOnTimeRate: Math.round(approvalOnTimeRate * 100),
    paymentOnTimeRate: Math.round(paymentOnTimeRate * 100),
    avgApprovalDelayDays,
    avgPaymentDelayDays,
    totalEvents,
    statusText,
  };
}

export interface CampaignProfitResult {
  netProfit: number;
  profitPerHour: number;
  isEstimate: boolean;
  missingDataNotes: string[];
}

/**
 * Calculates campaign profitability strictly per BRIEF.md formula:
 * estimated net profit = recorded revenue − recorded expenses
 * profit per hour = estimated net profit ÷ estimated creator hours
 * Always labelled "Estimate" when any cost data or hour records are missing.
 */
export function calculateCampaignProfit(
  recordedRevenue: number,
  expenses: number[],
  estimatedCreatorHours: number,
  isCostDataComplete: boolean = true
): CampaignProfitResult {
  const totalExpenses = expenses.reduce((acc, e) => acc + e, 0);
  const netProfit = recordedRevenue - totalExpenses;
  const hours = estimatedCreatorHours > 0 ? estimatedCreatorHours : 1;
  const profitPerHour = Math.round((netProfit / hours) * 100) / 100;

  const missingDataNotes: string[] = [];
  let isEstimate = false;

  if (!isCostDataComplete) {
    isEstimate = true;
    missingDataNotes.push('Missing recorded vendor invoices or production receipts');
  }

  if (estimatedCreatorHours <= 0) {
    isEstimate = true;
    missingDataNotes.push('Creator production hours unlogged');
  }

  return {
    netProfit,
    profitPerHour,
    isEstimate,
    missingDataNotes,
  };
}

export interface MoneySummaryResult {
  received: number; // Confirmed cash received
  waiting: number;  // Invoiced but unpaid
  expected: number; // Contracted deals not yet invoiced
}

/**
 * Calculates honest money strip totals:
 * Never counts unpaid invoices as received.
 */
export function calculateMoneySummary(
  payments: Array<{ amount: number }>,
  invoices: Array<{ amount: number; status: string }>,
  contractedCampaigns: Array<{ paymentAmount: number; hasInvoice: boolean }>
): MoneySummaryResult {
  // Received: strictly confirmed received payments
  const received = payments.reduce((acc, p) => acc + p.amount, 0);

  // Waiting: sent or overdue invoices that have not been marked paid
  const waiting = invoices
    .filter(inv => inv.status === 'sent' || inv.status === 'overdue')
    .reduce((acc, inv) => acc + inv.amount, 0);

  // Expected: contracted campaigns that have not yet been invoiced
  const expected = contractedCampaigns
    .filter(c => !c.hasInvoice)
    .reduce((acc, c) => acc + c.paymentAmount, 0);

  return {
    received,
    waiting,
    expected,
  };
}
