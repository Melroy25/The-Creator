/**
 * CREATOR FLOW: Deterministic Change-Impact Engine
 * Pure TypeScript. Applies simulated changes on deep-copied data, compares baseline vs proposed,
 * tracks transitive downstream impact paths, detects conflicts, and outputs plain-English explanations.
 */

import {
  Change,
  ChangeAnalysis,
  ConflictEntry,
  Dependency,
  EngineApproval,
  EngineInput,
  EngineResource,
  EngineTask,
  MovedTask,
  ReasonCode,
  ResourceAvailability,
  WorkCalendar,
} from './types';
import { workingDaysBetween } from './calendar';
import { buildGraph, getDownstream } from './graph';
import { computeSchedule } from './scheduler';

/**
 * Deep-clones an EngineInput to ensure 100% input immutability.
 */
export function cloneEngineInput(input: EngineInput): EngineInput {
  return {
    tasks: input.tasks.map(t => ({ ...t })),
    dependencies: input.dependencies.map(d => ({ ...d })),
    resources: input.resources.map(r => ({
      ...r,
      workingDays: [...r.workingDays],
    })),
    availability: input.availability.map(a => ({ ...a })),
    approvals: input.approvals.map(a => ({ ...a })),
    calendar: {
      workingDaysOfWeek: [...input.calendar.workingDaysOfWeek],
      holidays: [...input.calendar.holidays],
    },
    today: input.today,
  };
}

/**
 * Applies a simulated change to a mutable cloned input copy.
 */
export function applyChange(input: EngineInput, change: Change): { directlyAffectedIds: string[] } {
  const directlyAffectedIds: string[] = [];

  switch (change.type) {
    case 'MOVE_DEADLINE': {
      const task = input.tasks.find(t => t.id === change.taskId);
      if (task) {
        task.dueDate = change.newDueDate;
        directlyAffectedIds.push(task.id);
      }
      break;
    }
    case 'DELAY_APPROVAL': {
      const approval = input.approvals.find(a => a.id === change.approvalId);
      if (approval) {
        approval.expectedTurnaroundDays += change.extraDays;
        directlyAffectedIds.push(approval.taskId);
      }
      break;
    }
    case 'APPROVE': {
      const approval = input.approvals.find(a => a.id === change.approvalId);
      if (approval) {
        approval.status = 'approved';
        approval.respondedAt = change.approvedDate;
        const task = input.tasks.find(t => t.id === approval.taskId);
        if (task && task.status === 'blocked') {
          task.status = 'not_started';
        }
        directlyAffectedIds.push(approval.taskId);
      }
      break;
    }
    case 'CHANGE_DURATION': {
      const task = input.tasks.find(t => t.id === change.taskId);
      if (task) {
        task.estimatedHours = change.newEstimatedHours;
        directlyAffectedIds.push(task.id);
      }
      break;
    }
    case 'RESOURCE_UNAVAILABLE': {
      input.availability.push({
        resourceId: change.resourceId,
        dateFrom: change.dateFrom,
        dateTo: change.dateTo,
        hoursPerDay: change.hoursPerDay,
        note: change.note,
      });
      // All tasks assigned to this resource could be affected
      const affected = input.tasks.filter(t => t.assigneeId === change.resourceId).map(t => t.id);
      directlyAffectedIds.push(...affected);
      break;
    }
    case 'COMPLETE_TASK': {
      const task = input.tasks.find(t => t.id === change.taskId);
      if (task) {
        task.status = 'done';
        task.completedAt = change.completedAt;
        directlyAffectedIds.push(task.id);
      }
      break;
    }
    case 'ADD_DEPENDENCY': {
      const exists = input.dependencies.some(
        d => d.taskId === change.taskId && d.dependsOnTaskId === change.dependsOnTaskId
      );
      if (!exists) {
        input.dependencies.push({
          taskId: change.taskId,
          dependsOnTaskId: change.dependsOnTaskId,
        });
      }
      directlyAffectedIds.push(change.taskId);
      break;
    }
    case 'REMOVE_DEPENDENCY': {
      input.dependencies = input.dependencies.filter(
        d => !(d.taskId === change.taskId && d.dependsOnTaskId === change.dependsOnTaskId)
      );
      directlyAffectedIds.push(change.taskId);
      break;
    }
    case 'ADD_NEW_DEAL': {
      input.tasks.push(...change.tasks);
      input.dependencies.push(...change.dependencies);
      directlyAffectedIds.push(...change.tasks.map(t => t.id));
      break;
    }
  }

  return { directlyAffectedIds };
}

/**
 * Formats a plain-English explanation for why a task was moved.
 */
function describeMoveReason(
  task: EngineTask,
  shiftDays: number,
  reasonCode: ReasonCode,
  triggerTaskTitle?: string
): string {
  const direction = shiftDays > 0 ? `pushed back by ${shiftDays}` : `advanced by ${Math.abs(shiftDays)}`;
  const daysText = `${direction} working day${Math.abs(shiftDays) === 1 ? '' : 's'}`;

  switch (reasonCode) {
    case 'DEADLINE_MOVED':
      return `Target deadline adjusted. Work window rescheduled accordingly (${daysText}).`;
    case 'DURATION_CHANGED':
      return `Task effort revised, shifting timeline by ${daysText}.`;
    case 'RESOURCE_OVERLOAD':
      return `Shifted by ${daysText} to resolve editor capacity competition and avoid overload.`;
    case 'RESOURCE_UNAVAILABLE':
      return `Shifted by ${daysText} because assignee has scheduled unavailability or reduced capacity during this period.`;
    case 'DEPENDENCY_DELAYED':
      return triggerTaskTitle
        ? `Shifted by ${daysText} because upstream prerequisite '${triggerTaskTitle}' finished later.`
        : `Shifted by ${daysText} due to delay in upstream prerequisite tasks.`;
    case 'SHIFTED_FOR_FIXED_DEADLINE':
      return `Flexible task rescheduled by ${daysText} to grant editor capacity to higher-priority fixed deadline.`;
    default:
      return `Scheduled timeline moved by ${daysText}.`;
  }
}

/**
 * Analyzes the impact of a proposed change against a baseline schedule.
 * Pure function: does NOT mutate baselineInput.
 */
export function analyzeChange(baselineInput: EngineInput, change: Change): ChangeAnalysis {
  // 1. Calculate baseline schedule
  const baseline = computeSchedule(baselineInput);

  // 2. Clone input and apply change
  const proposedInput = cloneEngineInput(baselineInput);
  const { directlyAffectedIds } = applyChange(proposedInput, change);

  // 3. Compute proposed schedule
  const proposed = computeSchedule(proposedInput);

  // 4. Trace downstream affected graph nodes
  const proposedGraph = buildGraph(proposedInput.tasks, proposedInput.dependencies);
  const downstreamMap = new Map<string, string[]>();

  for (const directId of directlyAffectedIds) {
    const downstream = getDownstream(directId, proposedGraph);
    for (const d of downstream) {
      if (!downstreamMap.has(d.taskId) || downstreamMap.get(d.taskId)!.length > d.path.length) {
        downstreamMap.set(d.taskId, d.path);
      }
    }
  }

  const downstreamAffected: Array<{ taskId: string; path: string[] }> = [];
  for (const [taskId, path] of downstreamMap.entries()) {
    downstreamAffected.push({ taskId, path });
  }

  // 5. Compare baseline vs proposed to detect moved tasks
  const moved: MovedTask[] = [];
  const baselineTaskMap = new Map(baselineInput.tasks.map(t => [t.id, t]));
  const proposedTaskMap = new Map(proposedInput.tasks.map(t => [t.id, t]));

  for (const [taskId, proposedSched] of Object.entries(proposed)) {
    const baseSched = baseline[taskId];
    const proposedTask = proposedTaskMap.get(taskId);
    if (!proposedTask) continue;

    if (!baseSched) {
      // Brand new task (e.g. from ADD_NEW_DEAL)
      continue;
    }

    if (baseSched.start !== proposedSched.start || baseSched.finish !== proposedSched.finish) {
      const shiftDays = workingDaysBetween(baseSched.finish, proposedSched.finish, proposedInput.calendar);
      
      let reasonCode: ReasonCode = 'DEPENDENCY_DELAYED';
      let triggerTitle: string | undefined;

      if (directlyAffectedIds.includes(taskId)) {
        if (change.type === 'MOVE_DEADLINE') reasonCode = 'DEADLINE_MOVED';
        else if (change.type === 'CHANGE_DURATION') reasonCode = 'DURATION_CHANGED';
        else if (change.type === 'RESOURCE_UNAVAILABLE') reasonCode = 'RESOURCE_UNAVAILABLE';
      } else if (downstreamMap.has(taskId)) {
        reasonCode = 'DEPENDENCY_DELAYED';
        const path = downstreamMap.get(taskId)!;
        if (path.length > 1) {
          const directPrereq = proposedTaskMap.get(path[path.length - 2]);
          if (directPrereq) triggerTitle = directPrereq.title;
        }
      } else {
        // Task shifted due to resource leveling contention
        reasonCode = 'SHIFTED_FOR_FIXED_DEADLINE';
      }

      moved.push({
        taskId,
        fromStart: baseSched.start,
        toStart: proposedSched.start,
        fromFinish: baseSched.finish,
        toFinish: proposedSched.finish,
        shiftDays,
        reasonCode,
        reasonText: describeMoveReason(proposedTask, shiftDays, reasonCode, triggerTitle),
        provenance: 'calculated',
      });
    }
  }

  // 6. Conflicts & Preserved Fixed Deadlines
  const conflicts: ConflictEntry[] = [];
  const preservedFixed: string[] = [];

  for (const task of proposedInput.tasks) {
    const sched = proposed[task.id];
    if (!sched) continue;

    if (task.deadlineType === 'fixed') {
      if (sched.isConflict) {
        conflicts.push({
          taskId: task.id,
          type: 'DEADLINE_MISSED',
          daysShort: Math.abs(sched.slackDays),
          message: sched.conflictReason || `Task '${task.title}' misses fixed deadline of ${task.dueDate} by ${Math.abs(sched.slackDays)} working days.`,
        });
      } else {
        preservedFixed.push(task.id);
      }
    }
  }

  // 7. Constraints Considered & Assumptions Used
  const constraintsConsidered: string[] = [
    `Calendar: ${proposedInput.calendar.workingDaysOfWeek.length} working days per week`,
    `Resource availability checked for ${proposedInput.resources.length} active resources`,
    `Fixed commitments evaluated: ${proposedInput.tasks.filter(t => t.deadlineType === 'fixed').length} fixed tasks`,
  ];

  const assumptionsUsed: Array<{ taskId?: string; assumption: string }> = [];
  for (const sched of Object.values(proposed)) {
    for (const note of sched.assumptionNotes) {
      assumptionsUsed.push({ taskId: sched.taskId, assumption: note });
    }
  }

  return {
    baseline,
    proposed,
    directlyAffected: directlyAffectedIds,
    downstreamAffected,
    moved,
    conflicts,
    preservedFixed,
    constraintsConsidered,
    assumptionsUsed,
    summary: {
      affectedCount: directlyAffectedIds.length + downstreamAffected.length,
      movedCount: moved.length,
      conflictCount: conflicts.length,
      fixedBrokenCount: conflicts.filter(c => c.type === 'DEADLINE_MISSED').length,
    },
  };
}
