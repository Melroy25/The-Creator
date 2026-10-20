import { describe, expect, it } from 'vitest';
import { computeSchedule, DEFAULT_ESTIMATED_HOURS } from '../../lib/engine/scheduler';
import { EngineInput, EngineResource, EngineTask, WorkCalendar } from '../../lib/engine/types';

describe('Engine: Forward Scheduler and Leveling', () => {
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

  const editor: EngineResource = {
    id: 'res-editor',
    name: 'Leo Santos',
    role: 'editor',
    hoursPerDay: 8,
    workingDays: [1, 2, 3, 4, 5],
  };

  const baseInput = (tasks: EngineTask[], dependencies: Array<{ taskId: string; dependsOnTaskId: string }> = []): EngineInput => ({
    tasks,
    dependencies,
    resources: [creator, editor],
    availability: [],
    approvals: [],
    calendar,
    today: '2026-04-13', // Monday
  });

  it('schedules a simple linear dependency chain', () => {
    const tasks: EngineTask[] = [
      {
        id: 't1',
        campaignId: 'c1',
        title: 'Task 1',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 8,
        deadlineType: 'flexible',
        assigneeId: creator.id,
      },
      {
        id: 't2',
        campaignId: 'c1',
        title: 'Task 2',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 8,
        deadlineType: 'flexible',
        assigneeId: creator.id,
      },
    ];
    const deps = [{ taskId: 't2', dependsOnTaskId: 't1' }];

    const sched = computeSchedule(baseInput(tasks, deps));

    // t1 runs Mon 2026-04-13 (8 hours)
    expect(sched.t1.start).toBe('2026-04-13');
    expect(sched.t1.finish).toBe('2026-04-13');

    // t2 starts after t1 finishes -> Tue 2026-04-14 (8 hours)
    expect(sched.t2.start).toBe('2026-04-14');
    expect(sched.t2.finish).toBe('2026-04-14');
  });

  it('schedules independent tasks in parallel when assignees differ', () => {
    const tasks: EngineTask[] = [
      {
        id: 't-creator',
        campaignId: 'c1',
        title: 'Creator Task',
        status: 'not_started',
        priority: 'medium',
        estimatedHours: 8,
        deadlineType: 'flexible',
        assigneeId: creator.id,
      },
      {
        id: 't-editor',
        campaignId: 'c1',
        title: 'Editor Task',
        status: 'not_started',
        priority: 'medium',
        estimatedHours: 8,
        deadlineType: 'flexible',
        assigneeId: editor.id,
      },
    ];

    const sched = computeSchedule(baseInput(tasks));

    // Both can run on Monday simultaneously
    expect(sched['t-creator'].start).toBe('2026-04-13');
    expect(sched['t-creator'].finish).toBe('2026-04-13');
    expect(sched['t-editor'].start).toBe('2026-04-13');
    expect(sched['t-editor'].finish).toBe('2026-04-13');
  });

  it('levels resources when two tasks compete for the same assignee (priority tie-breaker)', () => {
    const tasks: EngineTask[] = [
      {
        id: 't-low',
        campaignId: 'c1',
        title: 'Low Priority Task',
        status: 'not_started',
        priority: 'low',
        estimatedHours: 8,
        dueDate: '2026-04-16',
        deadlineType: 'flexible',
        assigneeId: editor.id,
      },
      {
        id: 't-urgent',
        campaignId: 'c2',
        title: 'Urgent Priority Task',
        status: 'not_started',
        priority: 'urgent',
        estimatedHours: 8,
        dueDate: '2026-04-14',
        deadlineType: 'fixed',
        assigneeId: editor.id,
      },
    ];

    const sched = computeSchedule(baseInput(tasks));

    // Urgent task gets priority on Monday 2026-04-13
    expect(sched['t-urgent'].start).toBe('2026-04-13');
    expect(sched['t-urgent'].finish).toBe('2026-04-13');

    // Low priority task is pushed to Tuesday 2026-04-14
    expect(sched['t-low'].start).toBe('2026-04-14');
    expect(sched['t-low'].finish).toBe('2026-04-14');
  });

  it('respects resource availability overrides (reduced capacity stretches duration)', () => {
    const tasks: EngineTask[] = [
      {
        id: 't-edit',
        campaignId: 'c1',
        title: 'Long Edit',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 8, // Needs 8 hours
        deadlineType: 'flexible',
        assigneeId: editor.id,
      },
    ];

    const input = baseInput(tasks);
    // Editor only has 4h/day on Mon and Tue
    input.availability = [
      {
        resourceId: editor.id,
        dateFrom: '2026-04-13',
        dateTo: '2026-04-14',
        hoursPerDay: 4,
        note: 'Half days',
      },
    ];

    const sched = computeSchedule(input);

    // Stretches across Mon (4h) and Tue (4h) -> finishes on Tuesday
    expect(sched['t-edit'].start).toBe('2026-04-13');
    expect(sched['t-edit'].finish).toBe('2026-04-14');
  });

  it('detects fixed deadline conflict and calculates negative slack', () => {
    const tasks: EngineTask[] = [
      {
        id: 't-tight',
        campaignId: 'c1',
        title: 'Tight Fixed Task',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 16, // Needs 2 full 8-hour working days: Mon 13, Tue 14
        dueDate: '2026-04-13', // Target due date is Monday 13 (impossible)
        deadlineType: 'fixed',
        assigneeId: creator.id,
      },
    ];

    const sched = computeSchedule(baseInput(tasks));

    expect(sched['t-tight'].finish).toBe('2026-04-14');
    expect(sched['t-tight'].isConflict).toBe(true);
    expect(sched['t-tight'].slackDays).toBe(-1); // 1 working day late
    expect(sched['t-tight'].conflictReason).toContain('Misses fixed deadline');
  });

  it('handles missing estimated hours by defaulting to 4 hours with recorded assumption', () => {
    const tasks: EngineTask[] = [
      {
        id: 't-no-est',
        campaignId: 'c1',
        title: 'Unestimated Task',
        status: 'not_started',
        priority: 'medium',
        deadlineType: 'flexible',
        assigneeId: creator.id,
      },
    ];

    const sched = computeSchedule(baseInput(tasks));

    expect(sched['t-no-est'].start).toBe('2026-04-13');
    expect(sched['t-no-est'].finish).toBe('2026-04-13');
    expect(sched['t-no-est'].assumptionNotes.length).toBeGreaterThan(0);
    expect(sched['t-no-est'].assumptionNotes[0]).toContain(`default ${DEFAULT_ESTIMATED_HOURS} hours`);
  });

  it('preserves completed tasks without consuming future capacity', () => {
    const tasks: EngineTask[] = [
      {
        id: 't-done',
        campaignId: 'c1',
        title: 'Past Completed Task',
        status: 'done',
        priority: 'high',
        startDate: '2026-04-08',
        completedAt: '2026-04-10',
        deadlineType: 'fixed',
        assigneeId: creator.id,
      },
      {
        id: 't-new',
        campaignId: 'c1',
        title: 'New Monday Task',
        status: 'not_started',
        priority: 'high',
        estimatedHours: 8,
        deadlineType: 'flexible',
        assigneeId: creator.id,
      },
    ];

    const sched = computeSchedule(baseInput(tasks));

    expect(sched['t-done'].start).toBe('2026-04-08');
    expect(sched['t-done'].finish).toBe('2026-04-10');

    // New task gets full 8 hours on Monday without conflict from done task
    expect(sched['t-new'].start).toBe('2026-04-13');
    expect(sched['t-new'].finish).toBe('2026-04-13');
  });
});
