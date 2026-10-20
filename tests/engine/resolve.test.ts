import { describe, expect, it } from 'vitest';
import { resolveConflicts } from '../../lib/engine/resolve';
import { EngineInput, EngineResource, EngineTask, WorkCalendar } from '../../lib/engine/types';

describe('Engine: Conflict Resolution Engine', () => {
  const calendar: WorkCalendar = {
    workingDaysOfWeek: [1, 2, 3, 4, 5],
    holidays: [],
  };

  const creator: EngineResource = {
    id: 'res-creator',
    name: 'Marcus Vance',
    role: 'creator',
    hoursPerDay: 8,
    workingDays: [1, 2, 3, 4, 5],
  };

  it('returns FEASIBLE when proposed changes fit within capacity with zero schedule shifts', () => {
    const input: EngineInput = {
      tasks: [
        {
          id: 't1',
          campaignId: 'c1',
          title: 'Drafting Script',
          status: 'not_started',
          priority: 'medium',
          estimatedHours: 4,
          dueDate: '2026-04-14',
          deadlineType: 'fixed',
          assigneeId: creator.id,
        },
      ],
      dependencies: [],
      resources: [creator],
      availability: [],
      approvals: [],
      calendar,
      today: '2026-04-13',
    };

    const res = resolveConflicts(input, {
      type: 'CHANGE_DURATION',
      taskId: 't1',
      newEstimatedHours: 6, // Still fits in Monday (8h capacity)
    });

    expect(res.status).toBe('FEASIBLE');
    expect(res.unresolvedConflicts.length).toBe(0);
    expect(res.strategyUsed).toBeTruthy();
  });

  it('returns FEASIBLE_WITH_CHANGES when flexible tasks shift to accommodate changes', () => {
    const input: EngineInput = {
      tasks: [
        {
          id: 't1',
          campaignId: 'c1',
          title: 'Drafting Script',
          status: 'not_started',
          priority: 'medium',
          estimatedHours: 4,
          dueDate: '2026-04-16',
          deadlineType: 'flexible',
          assigneeId: creator.id,
        },
      ],
      dependencies: [],
      resources: [creator],
      availability: [],
      approvals: [],
      calendar,
      today: '2026-04-13',
    };

    const res = resolveConflicts(input, {
      type: 'CHANGE_DURATION',
      taskId: 't1',
      newEstimatedHours: 16, // Stretches to Tuesday (finish: 2026-04-14)
    });

    expect(res.status).toBe('FEASIBLE_WITH_CHANGES');
    expect(res.unresolvedConflicts.length).toBe(0);
  });

  it('returns INFEASIBLE with concrete calculated alternatives when fixed deadline cannot be met', () => {
    const input: EngineInput = {
      tasks: [
        {
          id: 't-fixed',
          campaignId: 'c1',
          title: 'Fixed Contractual Delivery',
          status: 'not_started',
          priority: 'urgent',
          estimatedHours: 16, // Needs Mon 13 and Tue 14 (16 hours)
          dueDate: '2026-04-13', // Due on Mon 13 -> mathematically 1 working day late!
          deadlineType: 'fixed',
          assigneeId: creator.id,
        },
        {
          id: 't-flex',
          campaignId: 'c2',
          title: 'Flexible Newsletter Draft',
          status: 'not_started',
          priority: 'low',
          estimatedHours: 4,
          deadlineType: 'flexible',
          assigneeId: creator.id,
        },
      ],
      dependencies: [],
      resources: [creator],
      availability: [],
      approvals: [],
      calendar,
      today: '2026-04-13',
    };

    const res = resolveConflicts(input, {
      type: 'CHANGE_DURATION',
      taskId: 't-fixed',
      newEstimatedHours: 24, // 3 days needed -> finishes Wednesday 2026-04-15
    });

    expect(res.status).toBe('INFEASIBLE');
    expect(res.unresolvedConflicts.length).toBe(1);
    expect(res.unresolvedConflicts[0].taskId).toBe('t-fixed');

    expect(res.alternatives).toBeDefined();
    expect(res.alternatives!.length).toBeGreaterThanOrEqual(2);

    // Alternative 1: RENEGOTIATE_DEADLINE
    const renegotiate = res.alternatives!.find(a => a.type === 'RENEGOTIATE_DEADLINE');
    expect(renegotiate).toBeDefined();
    expect(renegotiate!.calculatedDate).toBe('2026-04-15');
    expect(renegotiate!.description).toContain('Renegotiate submission deadline');

    // Alternative 2: ADD_HOURS
    const addHours = res.alternatives!.find(a => a.type === 'ADD_HOURS');
    expect(addHours).toBeDefined();
    expect(addHours!.extraHoursNeeded).toBeDefined();
    expect(addHours!.extraHoursNeeded![0].hours).toBeGreaterThan(0);

    // Alternative 3: REDUCE_SCOPE
    const reduceScope = res.alternatives!.find(a => a.type === 'REDUCE_SCOPE');
    expect(reduceScope).toBeDefined();
    expect(reduceScope!.candidatesToDrop?.some(c => c.taskId === 't-flex')).toBe(true);
  });
});
