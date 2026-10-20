/**
 * CREATOR FLOW: Deterministic Forward Scheduling & Resource Leveling Engine
 * Pure TypeScript. Implements forward-pass scheduling, daily resource leveling,
 * discrete work calendar math, slack calculation, and fixed deadline conflict detection.
 */

import {
  DateString,
  EngineInput,
  EngineResource,
  EngineTask,
  Schedule,
  ScheduledTask,
  WorkCalendar,
} from './types';
import {
  addCalendarDays,
  addWorkingDays,
  getIsoDayOfWeek,
  isWorkingDay,
  nextWorkingDay,
  workingDaysBetween,
} from './calendar';
import { buildGraph, findCriticalPath, topologicalOrder } from './graph';

export const DEFAULT_ESTIMATED_HOURS = 4;
export const DEFAULT_DAILY_CAPACITY = 8;

/**
 * Returns the maximum available working hours for a given resource on a specific date,
 * considering the work calendar, the resource's working days, and any availability overrides.
 */
export function getResourceCapacityOnDate(
  resource: EngineResource | undefined,
  date: DateString,
  calendar: WorkCalendar,
  input: EngineInput
): number {
  // If no resource assigned, use default creator calendar rules
  if (!resource) {
    if (!isWorkingDay(date, calendar)) return 0;
    return DEFAULT_DAILY_CAPACITY;
  }

  // Check general calendar working day and holiday
  if (!isWorkingDay(date, calendar)) return 0;

  // Check resource-specific working days
  const isoDay = getIsoDayOfWeek(date);
  if (!resource.workingDays.includes(isoDay)) return 0;

  // Check resource availability overrides (vacations, part-time, temporary capacity reduction)
  for (const avail of input.availability) {
    if (avail.resourceId === resource.id && date >= avail.dateFrom && date <= avail.dateTo) {
      return Math.max(0, avail.hoursPerDay);
    }
  }

  return Math.max(0, resource.hoursPerDay);
}

/**
 * Priority rank comparator for deterministic resource leveling.
 * 'urgent' (4) > 'high' (3) > 'medium' (2) > 'low' (1)
 */
function getPriorityWeight(priority: EngineTask['priority']): number {
  switch (priority) {
    case 'urgent':
      return 4;
    case 'high':
      return 3;
    case 'medium':
      return 2;
    case 'low':
      return 1;
    default:
      return 2;
  }
}

/**
 * Compares two ready tasks when competing for the same resource or scheduling slot.
 * Tie-breaker rule (as documented in BRIEF.md Section 5):
 * 1. Higher priority first ('urgent' > 'high' > 'medium' > 'low')
 * 2. Earlier deadline first (fixed or flexible)
 * 3. Lexicographical taskId for 100% deterministic reproducibility
 */
export function compareTaskUrgency(a: EngineTask, b: EngineTask): number {
  const pDiff = getPriorityWeight(b.priority) - getPriorityWeight(a.priority);
  if (pDiff !== 0) return pDiff;

  const dueA = a.dueDate || '9999-99-99';
  const dueB = b.dueDate || '9999-99-99';
  if (dueA !== dueB) return dueA.localeCompare(dueB);

  return a.id.localeCompare(b.id);
}

/**
 * Computes a deterministic forward schedule with resource leveling for the given input.
 * Does not mutate input.
 */
export function computeSchedule(input: EngineInput): Schedule {
  const graph = buildGraph(input.tasks, input.dependencies);
  
  // Verify DAG - throws clear cycle error if invalid
  topologicalOrder(graph);

  const resourceMap = new Map<string, EngineResource>();
  for (const r of input.resources) {
    resourceMap.set(r.id, r);
  }

  // Daily assigned hours tracking per resource: Map<resourceId, Map<date, assignedHours>>
  const resourceAllocations = new Map<string, Map<DateString, number>>();
  const getUsedHours = (resId: string, date: DateString): number => {
    return resourceAllocations.get(resId)?.get(date) || 0;
  };
  const addUsedHours = (resId: string, date: DateString, hours: number) => {
    let dateMap = resourceAllocations.get(resId);
    if (!dateMap) {
      dateMap = new Map<DateString, number>();
      resourceAllocations.set(resId, dateMap);
    }
    dateMap.set(date, (dateMap.get(date) || 0) + hours);
  };

  const schedule: Schedule = {};
  const assumptions: Array<{ taskId: string; note: string }> = [];

  // Track prerequisites for ready-pool leveling
  const remainingPrereqs = new Map<string, Set<string>>();
  for (const task of input.tasks) {
    remainingPrereqs.set(task.id, new Set(graph.revAdj.get(task.id) || []));
  }

  // Done tasks keep their recorded dates and do not consume future capacity
  for (const task of input.tasks) {
    if (task.status === 'done') {
      const start = task.startDate || task.completedAt || input.today;
      const finish = task.completedAt || task.dueDate || task.startDate || input.today;
      const slack = task.dueDate ? workingDaysBetween(finish, task.dueDate, input.calendar) : 0;

      schedule[task.id] = {
        taskId: task.id,
        start,
        finish,
        assigneeId: task.assigneeId,
        hoursPerDay: task.estimatedHours || DEFAULT_DAILY_CAPACITY,
        slackDays: slack,
        isCritical: false,
        isConflict: false,
        assumptionNotes: [],
      };

      // Mark as satisfied for any downstream tasks
      for (const [tId, prereqSet] of remainingPrereqs.entries()) {
        prereqSet.delete(task.id);
      }
    }
  }

  // Ready pool of uncompleted tasks whose dependencies are satisfied
  const readyQueue: EngineTask[] = [];
  for (const task of input.tasks) {
    if (task.status !== 'done' && (remainingPrereqs.get(task.id)?.size || 0) === 0) {
      readyQueue.push(task);
    }
  }

  const guardMaxDays = 500;

  while (readyQueue.length > 0) {
    // Sort ready tasks using tie-break rules: priority, then due date, then taskId
    readyQueue.sort(compareTaskUrgency);
    const currentTask = readyQueue.shift()!;

    const taskAssumptions: string[] = [];

    // Calculate effort hours
    let effortHours: number;
    if (currentTask.estimatedHours === undefined || currentTask.estimatedHours === null || currentTask.estimatedHours <= 0) {
      effortHours = DEFAULT_ESTIMATED_HOURS;
      const note = `Task '${currentTask.title}' has no estimated hours; assumed default ${DEFAULT_ESTIMATED_HOURS} hours.`;
      taskAssumptions.push(note);
      assumptions.push({ taskId: currentTask.id, note });
    } else {
      effortHours = currentTask.estimatedHours;
    }

    // Determine earliest allowable start date based on prerequisites, input.today, and task.startDate
    let earliestStart = input.today;

    if (currentTask.startDate && currentTask.startDate > earliestStart) {
      earliestStart = currentTask.startDate;
    }

    // In-progress tasks retain their actual start date if in the past
    if (currentTask.status === 'in_progress' && currentTask.startDate) {
      // Work continues from today or startDate, whichever is later
      earliestStart = currentTask.startDate > input.today ? currentTask.startDate : input.today;
    }

    // Must start after all upstream prerequisite tasks have finished
    const upstreamPrereqs = graph.revAdj.get(currentTask.id) || [];
    for (const prereqId of upstreamPrereqs) {
      const pSched = schedule[prereqId];
      if (pSched) {
        // Task starts on the next working day after prerequisite finishes
        const nextDayAfterFinish = nextWorkingDay(addCalendarDays(pSched.finish, 1), input.calendar);
        if (nextDayAfterFinish > earliestStart) {
          earliestStart = nextDayAfterFinish;
        }
      }
    }

    // Align earliest start to a working day
    earliestStart = nextWorkingDay(earliestStart, input.calendar);

    // Resource capacity & leveling
    const assignee = currentTask.assigneeId ? resourceMap.get(currentTask.assigneeId) : undefined;
    const resId = assignee ? assignee.id : 'UNASSIGNED_POOL';

    let remainingHours = effortHours;
    let scheduledStart: DateString | null = null;
    let scheduledFinish: DateString = earliestStart;
    let currentDate = earliestStart;
    let daysIterated = 0;
    let peakHoursPerDay = 0;

    while (remainingHours > 0 && daysIterated < guardMaxDays) {
      const capacity = getResourceCapacityOnDate(assignee, currentDate, input.calendar, input);
      const used = getUsedHours(resId, currentDate);
      const available = Math.max(0, capacity - used);

      if (available > 0) {
        if (!scheduledStart) {
          scheduledStart = currentDate;
        }
        const allocated = Math.min(remainingHours, available);
        addUsedHours(resId, currentDate, allocated);
        remainingHours -= allocated;
        scheduledFinish = currentDate;
        if (allocated > peakHoursPerDay) {
          peakHoursPerDay = allocated;
        }
      }

      if (remainingHours <= 0) break;

      currentDate = addWorkingDays(currentDate, 1, input.calendar);
      daysIterated++;
    }

    if (daysIterated >= guardMaxDays) {
      throw new Error(`Schedule calculation exceeded ${guardMaxDays} days for task ${currentTask.id} (${currentTask.title}). Resource overloaded.`);
    }

    const finalStart = scheduledStart || earliestStart;
    const finalFinish = scheduledFinish;

    // Slack and conflict detection
    let slackDays = 0;
    let isConflict = false;
    let conflictReason: string | undefined = undefined;

    if (currentTask.dueDate) {
      slackDays = workingDaysBetween(finalFinish, currentTask.dueDate, input.calendar);
      if (currentTask.deadlineType === 'fixed' && slackDays < 0) {
        isConflict = true;
        conflictReason = `Misses fixed deadline of ${currentTask.dueDate} by ${Math.abs(slackDays)} working day(s). Calculated finish is ${finalFinish}.`;
      }
    }

    schedule[currentTask.id] = {
      taskId: currentTask.id,
      start: finalStart,
      finish: finalFinish,
      assigneeId: currentTask.assigneeId,
      hoursPerDay: peakHoursPerDay || (assignee ? assignee.hoursPerDay : DEFAULT_DAILY_CAPACITY),
      slackDays,
      isCritical: false, // Calculated in post-pass
      isConflict,
      conflictReason,
      assumptionNotes: taskAssumptions,
    };

    // Update ready pool for downstream dependents
    const dependents = graph.adj.get(currentTask.id) || [];
    for (const depId of dependents) {
      const prereqs = remainingPrereqs.get(depId);
      if (prereqs) {
        prereqs.delete(currentTask.id);
        if (prereqs.size === 0) {
          const depTask = graph.tasks.get(depId);
          if (depTask && depTask.status !== 'done') {
            readyQueue.push(depTask);
          }
        }
      }
    }
  }

  // Compute critical path
  const criticalPathIds = new Set(findCriticalPath(schedule, graph));
  for (const taskId of criticalPathIds) {
    if (schedule[taskId]) {
      schedule[taskId].isCritical = true;
    }
  }

  return schedule;
}
