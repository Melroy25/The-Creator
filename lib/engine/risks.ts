/**
 * CREATOR FLOW: Deterministic Risk Radar Engine
 * Pure TypeScript. Rule-based risk evaluation based strictly on formulas from BRIEF.md Section 5.
 * Zero AI guessing; every alert is backed by explicit evidence.
 */

import {
  EngineFinancialData,
  EngineInput,
  RiskAlert,
  Schedule,
} from './types';
import { addCalendarDays, workingDaysBetween } from './calendar';
import { buildGraph, getBlockedTasks, getDownstream } from './graph';
import { computeSchedule } from './scheduler';

/**
 * Generates deterministic rule-based risk alerts across the entire workspace.
 * Evaluates schedule, approvals, tasks, and financial records.
 */
export function evaluateRisks(
  input: EngineInput,
  financialData?: EngineFinancialData,
  precomputedSchedule?: Schedule
): RiskAlert[] {
  const schedule = precomputedSchedule || computeSchedule(input);
  const alerts: RiskAlert[] = [];
  const graph = buildGraph(input.tasks, input.dependencies);
  const blockedTaskIds = new Set(getBlockedTasks(input.tasks, input.dependencies, input.approvals));

  // 1. Critical: Task Overdue (Confirmed Issue)
  for (const task of input.tasks) {
    if (task.status !== 'done' && task.dueDate && task.dueDate < input.today) {
      alerts.push({
        id: `risk-overdue-task-${task.id}`,
        ruleId: 'OVERDUE_TASK',
        title: `Task Overdue: ${task.title}`,
        severity: 'critical',
        kind: 'confirmed',
        campaignId: task.campaignId,
        taskId: task.id,
        relevantDate: task.dueDate,
        evidence: [
          { label: 'Due Date', value: task.dueDate },
          { label: 'Today', value: input.today },
          { label: 'Status', value: task.status },
        ],
        reason: `Task deadline passed on ${task.dueDate} but task status is still '${task.status}'.`,
        recommendedAction: 'Complete the task immediately or re-schedule with downstream notification.',
      });
    }
  }

  // 2. Critical: Fixed Deadline Missed in Calculated Schedule
  for (const task of input.tasks) {
    const sched = schedule[task.id];
    if (sched && sched.isConflict && task.deadlineType === 'fixed') {
      alerts.push({
        id: `risk-fixed-deadline-${task.id}`,
        ruleId: 'FIXED_DEADLINE_MISSED',
        title: `Fixed Commitment Missed: ${task.title}`,
        severity: 'critical',
        kind: 'confirmed',
        campaignId: task.campaignId,
        taskId: task.id,
        relevantDate: task.dueDate,
        evidence: [
          { label: 'Fixed Deadline', value: task.dueDate || 'N/A' },
          { label: 'Calculated Finish', value: sched.finish },
          { label: 'Shortfall', value: `${Math.abs(sched.slackDays)} working days` },
        ],
        reason: `Calculated finish date of ${sched.finish} violates contractual fixed deadline of ${task.dueDate}.`,
        recommendedAction: 'Renegotiate submission date or add editor capacity before client notice.',
      });
    }
  }

  // 3. Critical: Payment Overdue
  if (financialData) {
    for (const inv of financialData.invoices) {
      if (inv.status !== 'paid' && inv.dueDate < input.today) {
        alerts.push({
          id: `risk-payment-overdue-${inv.id}`,
          ruleId: 'OVERDUE_PAYMENT',
          title: `Overdue Payment: Invoice ${inv.id}`,
          severity: 'critical',
          kind: 'confirmed',
          campaignId: inv.campaignId,
          relevantDate: inv.dueDate,
          evidence: [
            { label: 'Amount Due', value: `$${inv.amount.toLocaleString()}` },
            { label: 'Due Date', value: inv.dueDate },
            { label: 'Status', value: inv.status },
          ],
          reason: `Invoice payment was expected by ${inv.dueDate} and is now overdue.`,
          recommendedAction: 'Send friendly payment reminder using Message Assistant template.',
        });
      }
    }
  }

  // 4. High: Blocked Task whose Downstream Deadline is within 48 hours
  const twoDaysOut = addCalendarDays(input.today, 2);
  for (const blockedId of blockedTaskIds) {
    const task = input.tasks.find(t => t.id === blockedId);
    if (!task) continue;

    const downstream = getDownstream(blockedId, graph);
    // Find closest downstream dueDate
    let closestDownstreamDate: string | null = null;
    let closestDownstreamTitle: string | null = null;

    for (const d of downstream) {
      const dt = input.tasks.find(t => t.id === d.taskId);
      if (dt && dt.dueDate) {
        if (!closestDownstreamDate || dt.dueDate < closestDownstreamDate) {
          closestDownstreamDate = dt.dueDate;
          closestDownstreamTitle = dt.title;
        }
      }
    }

    if (closestDownstreamDate && closestDownstreamDate <= twoDaysOut) {
      alerts.push({
        id: `risk-blocked-near-deadline-${task.id}`,
        ruleId: 'BLOCKED_NEAR_DEADLINE',
        title: `Blocked Task Near Deadline: ${task.title}`,
        severity: 'high',
        kind: 'potential',
        campaignId: task.campaignId,
        taskId: task.id,
        relevantDate: closestDownstreamDate,
        evidence: [
          { label: 'Blocked Task', value: task.title },
          { label: 'Impacting', value: closestDownstreamTitle || 'Downstream' },
          { label: 'Downstream Deadline', value: closestDownstreamDate },
        ],
        reason: `Task is blocked while dependent deliverable is due within 48 hours (${closestDownstreamDate}).`,
        recommendedAction: 'Unblock immediate prerequisites or request expedited approval.',
      });
    }
  }

  // 5. High: Negative Slack on a Flexible Deadline
  for (const task of input.tasks) {
    const sched = schedule[task.id];
    if (sched && task.deadlineType === 'flexible' && sched.slackDays < 0) {
      alerts.push({
        id: `risk-negative-slack-flex-${task.id}`,
        ruleId: 'NEGATIVE_SLACK_FLEXIBLE',
        title: `Flexible Deadline Slipping: ${task.title}`,
        severity: 'high',
        kind: 'potential',
        campaignId: task.campaignId,
        taskId: task.id,
        relevantDate: task.dueDate,
        evidence: [
          { label: 'Target Date', value: task.dueDate || 'N/A' },
          { label: 'Projected Finish', value: sched.finish },
          { label: 'Slack', value: `${sched.slackDays} days` },
        ],
        reason: `Task will finish ${Math.abs(sched.slackDays)} working day(s) after flexible target date.`,
        recommendedAction: 'Shift subsequent publishing dates or compress editing buffer.',
      });
    }
  }

  // 6. Medium: Low Slack (< 1 working day)
  for (const task of input.tasks) {
    const sched = schedule[task.id];
    if (sched && task.dueDate && sched.slackDays >= 0 && sched.slackDays < 1 && task.status !== 'done') {
      alerts.push({
        id: `risk-low-slack-${task.id}`,
        ruleId: 'LOW_SLACK',
        title: `Zero Buffer: ${task.title}`,
        severity: 'medium',
        kind: 'potential',
        campaignId: task.campaignId,
        taskId: task.id,
        relevantDate: task.dueDate,
        evidence: [
          { label: 'Due Date', value: task.dueDate },
          { label: 'Buffer Remaining', value: '< 1 day' },
        ],
        reason: `Task finishes on the exact deadline with no margin for revision or delays.`,
        recommendedAction: 'Monitor closely; any unexpected delay will immediately cause a missed deadline.',
      });
    }
  }

  // 7. Medium: Approval Pending Beyond Expected Turnaround
  for (const app of input.approvals) {
    if (app.status === 'pending') {
      const daysWaiting = workingDaysBetween(app.requestedAt, input.today, input.calendar);
      if (daysWaiting > app.expectedTurnaroundDays) {
        const task = input.tasks.find(t => t.id === app.taskId);
        alerts.push({
          id: `risk-approval-overdue-${app.id}`,
          ruleId: 'APPROVAL_OVERDUE',
          title: `Client Approval Overdue: ${task ? task.title : 'Sign-off'}`,
          severity: 'medium',
          kind: 'confirmed',
          campaignId: task?.campaignId,
          taskId: app.taskId,
          evidence: [
            { label: 'Days Waiting', value: `${daysWaiting} days` },
            { label: 'Expected Turnaround', value: `${app.expectedTurnaroundDays} days` },
            { label: 'Requested Date', value: app.requestedAt },
          ],
          reason: `Client turnaround window exceeded by ${daysWaiting - app.expectedTurnaroundDays} working day(s).`,
          recommendedAction: 'Send gentle approval nudge to prevent downstream production delays.',
        });
      }
    }
  }

  // 8. Low: Missing Estimates (Flag as Assumption)
  for (const task of input.tasks) {
    if (task.status !== 'done' && (task.estimatedHours === undefined || task.estimatedHours === null || task.estimatedHours <= 0)) {
      alerts.push({
        id: `risk-missing-estimate-${task.id}`,
        ruleId: 'MISSING_ESTIMATE',
        title: `Unestimated Task: ${task.title}`,
        severity: 'low',
        kind: 'potential',
        campaignId: task.campaignId,
        taskId: task.id,
        evidence: [
          { label: 'Recorded Effort', value: 'None (defaulted to 4h)' },
          { label: 'Assumed Value', value: '4 hours' },
        ],
        reason: 'Task lacks explicit estimated hours. Scheduling engine defaulted to 4 hours.',
        recommendedAction: 'Input expected hours in task details to improve schedule precision.',
      });
    }
  }

  return alerts;
}
