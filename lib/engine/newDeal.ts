/**
 * CREATOR FLOW: Deterministic New-Deal Capacity Engine
 * Pure TypeScript. Evaluates "Can I take this deal?" by simulating proposed deal deliverables
 * on top of the live schedule, detecting which existing tasks slip and identifying newly overloaded weeks.
 */

import {
  DateString,
  Dependency,
  EngineInput,
  EngineTask,
  Schedule,
} from './types';
import { workingDaysBetween } from './calendar';
import { cloneEngineInput } from './impact';
import { computeSchedule } from './scheduler';
import { calculateWorkloadByWeek } from './metrics';

export interface NewDealProposal {
  campaignName: string;
  tasks: EngineTask[];
  dependencies: Dependency[];
}

export interface SlippingTask {
  taskId: string;
  title: string;
  campaignId: string;
  previousFinish: DateString;
  newFinish: DateString;
  dueDate?: DateString;
  deadlineType: 'fixed' | 'flexible';
  delayDays: number;
  isConflict: boolean;
}

export interface OverloadWeek {
  weekStart: DateString;
  resourceName: string;
  previousLoad: number;
  newLoad: number;
}

export interface NewDealAnalysis {
  canAccept: boolean;
  slippingExistingTasks: SlippingTask[];
  createdOverloadWeeks: OverloadWeek[];
  proposedSchedule: Schedule;
  summary: string;
}

/**
 * Evaluates whether a creator and their team have capacity to accept a new brand deal.
 * Pure function: does NOT mutate baselineInput.
 */
export function checkNewDealCapacity(
  baselineInput: EngineInput,
  proposal: NewDealProposal
): NewDealAnalysis {
  // 1. Calculate baseline schedule & workload
  const baselineSchedule = computeSchedule(baselineInput);
  const baselineWorkloads = calculateWorkloadByWeek(baselineInput, baselineSchedule);

  // 2. Clone input and append new deal tasks
  const proposedInput = cloneEngineInput(baselineInput);
  proposedInput.tasks.push(...proposal.tasks);
  proposedInput.dependencies.push(...proposal.dependencies);

  // 3. Compute proposed schedule & workload
  const proposedSchedule = computeSchedule(proposedInput);
  const proposedWorkloads = calculateWorkloadByWeek(proposedInput, proposedSchedule);

  // 4. Identify existing tasks that slip
  const baselineTaskMap = new Map(baselineInput.tasks.map(t => [t.id, t]));
  const slippingExistingTasks: SlippingTask[] = [];

  for (const task of baselineInput.tasks) {
    if (task.status === 'done') continue;

    const baseSched = baselineSchedule[task.id];
    const propSched = proposedSchedule[task.id];
    if (!baseSched || !propSched) continue;

    if (propSched.finish > baseSched.finish) {
      const delayDays = workingDaysBetween(baseSched.finish, propSched.finish, baselineInput.calendar);
      slippingExistingTasks.push({
        taskId: task.id,
        title: task.title,
        campaignId: task.campaignId,
        previousFinish: baseSched.finish,
        newFinish: propSched.finish,
        dueDate: task.dueDate,
        deadlineType: task.deadlineType,
        delayDays,
        isConflict: propSched.isConflict,
      });
    }
  }

  // 5. Identify weeks where workload becomes overloaded (>100%)
  const baselineLoadMap = new Map(
    baselineWorkloads.map(w => [`${w.resourceId}:${w.weekStart}`, w.loadPercentage])
  );

  const createdOverloadWeeks: OverloadWeek[] = [];
  for (const pw of proposedWorkloads) {
    const key = `${pw.resourceId}:${pw.weekStart}`;
    const prevLoad = baselineLoadMap.get(key) || 0;

    if (pw.loadPercentage > 100 && prevLoad <= 100) {
      createdOverloadWeeks.push({
        weekStart: pw.weekStart,
        resourceName: pw.resourceName,
        previousLoad: prevLoad,
        newLoad: pw.loadPercentage,
      });
    }
  }

  // 6. Verdict: can accept if no fixed commitments are broken
  const brokenFixedCommitments = slippingExistingTasks.filter(t => t.isConflict && t.deadlineType === 'fixed');
  const canAccept = brokenFixedCommitments.length === 0;

  let summary: string;
  if (canAccept) {
    if (slippingExistingTasks.length === 0) {
      summary = `Capacity Available: '${proposal.campaignName}' can be accepted without shifting any existing deliverables.`;
    } else {
      summary = `Acceptable with Adjustments: '${proposal.campaignName}' can fit, but will shift ${slippingExistingTasks.length} flexible task(s). All fixed deadlines remain protected.`;
    }
  } else {
    summary = `Capacity Shortfall: Accepting '${proposal.campaignName}' would cause ${brokenFixedCommitments.length} fixed contractual deadline(s) to fail.`;
  }

  return {
    canAccept,
    slippingExistingTasks,
    createdOverloadWeeks,
    proposedSchedule,
    summary,
  };
}
