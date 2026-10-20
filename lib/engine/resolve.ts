/**
 * CREATOR FLOW: Deterministic Conflict Resolution Engine
 * Pure TypeScript. Evaluates scheduling conflicts against the 4-stage resolution hierarchy:
 * 1. Shift flexible tasks
 * 2. Parallelize independent tasks
 * 3. Absorb using buffer / slack
 * 4. Return INFEASIBLE with concrete calculated alternatives (renegotiate date, add hours, reduce scope)
 * Never silently violates or shifts fixed deadlines.
 */

import {
  Change,
  EngineInput,
  EngineTask,
  ResolutionAlternative,
  ResolutionResult,
} from './types';
import { analyzeChange, cloneEngineInput } from './impact';
import { addWorkingDays, workingDaysBetween } from './calendar';

/**
 * Resolves scheduling conflicts resulting from a change event.
 * Follows the strict resolution order defined in BRIEF.md Section 5.
 */
export function resolveConflicts(input: EngineInput, change: Change): ResolutionResult {
  const analysis = analyzeChange(input, change);

  // If no fixed conflicts exist, the schedule is feasible
  if (analysis.conflicts.length === 0) {
    if (analysis.moved.length > 0) {
      return {
        status: 'FEASIBLE_WITH_CHANGES',
        proposedSchedule: analysis.proposed,
        strategyUsed:
          'Shifted flexible tasks and absorbed adjustments within available slack, preserving all fixed commitments.',
        unresolvedConflicts: [],
      };
    }

    return {
      status: 'FEASIBLE',
      proposedSchedule: analysis.proposed,
      strategyUsed: 'All deliverables fit comfortably within available capacity and slack.',
      unresolvedConflicts: [],
    };
  }

  // Conflicts exist: at least one fixed deadline is mathematically impossible under current capacity.
  // Generate concrete, calculated alternatives instead of guessing or silently moving dates.
  const alternatives: ResolutionAlternative[] = [];
  const unresolvedConflicts = analysis.conflicts.map(c => ({
    taskId: c.taskId,
    message: c.message,
  }));

  const taskMap = new Map(input.tasks.map(t => [t.id, t]));

  for (const conflict of analysis.conflicts) {
    const task = taskMap.get(conflict.taskId);
    const sched = analysis.proposed[conflict.taskId];
    if (!task || !sched) continue;

    const daysShort = conflict.daysShort || Math.abs(sched.slackDays);

    // Alternative 1: Renegotiate deadline to the earliest calculated finish date
    alternatives.push({
      type: 'RENEGOTIATE_DEADLINE',
      description: `Renegotiate submission deadline for '${task.title}' to ${sched.finish} (+${daysShort} working day${daysShort === 1 ? '' : 's'}).`,
      calculatedDate: sched.finish,
    });

    // Alternative 2: Add additional working hours / freelance editor capacity
    const hoursPerDay = sched.hoursPerDay || 8;
    const extraHours = daysShort * hoursPerDay;
    alternatives.push({
      type: 'ADD_HOURS',
      description: `Authorize ${extraHours} additional hours (or freelance editing support) to complete '${task.title}' on schedule.`,
      extraHoursNeeded: [
        {
          date: task.dueDate || sched.finish,
          resourceId: task.assigneeId || 'UNASSIGNED',
          hours: extraHours,
        },
      ],
    });

    // Alternative 3: Reduce scope by dropping or postponing flexible tasks assigned to the same resource
    const flexibleCandidates = input.tasks.filter(
      t =>
        t.id !== task.id &&
        t.status !== 'done' &&
        t.deadlineType === 'flexible' &&
        t.assigneeId === task.assigneeId
    );

    if (flexibleCandidates.length > 0) {
      const candidatesToDrop = flexibleCandidates.map(fc => ({
        taskId: fc.id,
        daysSaved: Math.max(1, Math.ceil((fc.estimatedHours || 4) / 8)),
      }));

      alternatives.push({
        type: 'REDUCE_SCOPE',
        description: `Postpone ${candidatesToDrop.length} flexible task(s) on the same resource track to reclaim capacity.`,
        candidatesToDrop,
      });
    }
  }

  return {
    status: 'INFEASIBLE',
    proposedSchedule: analysis.proposed,
    strategyUsed: null,
    alternatives,
    unresolvedConflicts,
  };
}
