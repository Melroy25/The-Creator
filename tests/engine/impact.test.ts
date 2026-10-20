import { describe, expect, it } from 'vitest';
import { analyzeChange } from '../../lib/engine/impact';
import { EngineInput, EngineResource, EngineTask, WorkCalendar } from '../../lib/engine/types';

describe('Engine: Change-Impact Analysis', () => {
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

  function createInput(): EngineInput {
    return {
      tasks: [
        {
          id: 't1',
          campaignId: 'c1',
          title: 'Filming A-Roll',
          status: 'not_started',
          priority: 'urgent',
          estimatedHours: 8,
          dueDate: '2026-04-13',
          deadlineType: 'fixed',
          assigneeId: creator.id,
        },
        {
          id: 't2',
          campaignId: 'c1',
          title: 'Rough Cut Editing',
          status: 'not_started',
          priority: 'urgent',
          estimatedHours: 8,
          dueDate: '2026-04-14',
          deadlineType: 'fixed',
          assigneeId: editor.id,
        },
        {
          id: 't3',
          campaignId: 'c1',
          title: 'Final Client Submission',
          status: 'not_started',
          priority: 'urgent',
          estimatedHours: 4,
          dueDate: '2026-04-16',
          deadlineType: 'fixed',
          assigneeId: creator.id,
        },
      ],
      dependencies: [
        { taskId: 't2', dependsOnTaskId: 't1' },
        { taskId: 't3', dependsOnTaskId: 't2' },
      ],
      resources: [creator, editor],
      availability: [],
      approvals: [],
      calendar,
      today: '2026-04-13',
    };
  }

  it('analyzes duration expansion and downstream delay propagation', () => {
    const input = createInput();
    const originalInputSnapshot = JSON.stringify(input);

    // Change: Filming takes 16h instead of 8h (spans Mon and Tue)
    const analysis = analyzeChange(input, {
      type: 'CHANGE_DURATION',
      taskId: 't1',
      newEstimatedHours: 16,
    });

    // 1. Immutability check: original input must not be mutated
    expect(JSON.stringify(input)).toBe(originalInputSnapshot);

    // 2. Baseline check
    expect(analysis.baseline.t1.finish).toBe('2026-04-13');
    expect(analysis.baseline.t2.finish).toBe('2026-04-14');
    expect(analysis.baseline.t3.finish).toBe('2026-04-15');

    // 3. Proposed check
    expect(analysis.proposed.t1.finish).toBe('2026-04-14'); // Extended by 1 day
    expect(analysis.proposed.t2.finish).toBe('2026-04-15'); // Pushed to Wed
    expect(analysis.proposed.t3.finish).toBe('2026-04-16'); // Pushed to Thu

    // 4. Downstream affected tracking
    expect(analysis.directlyAffected).toContain('t1');
    expect(analysis.downstreamAffected.map(d => d.taskId)).toEqual(['t2', 't3']);

    // 5. Moved tasks & plain-English reasons
    expect(analysis.moved.length).toBe(3);
    const movedT1 = analysis.moved.find(m => m.taskId === 't1')!;
    expect(movedT1.reasonCode).toBe('DURATION_CHANGED');
    expect(movedT1.reasonText).toContain('Task effort revised');

    const movedT2 = analysis.moved.find(m => m.taskId === 't2')!;
    expect(movedT2.reasonCode).toBe('DEPENDENCY_DELAYED');
    expect(movedT2.reasonText).toContain("upstream prerequisite 'Filming A-Roll' finished later");
  });

  it('detects conflict when deadline is moved too early', () => {
    const input = createInput();

    // Change: move final submission t3 to 2026-04-14 (Tuesday)
    // But t1 (Mon) -> t2 (Tue) -> t3 (Wed) mathematically needs until Wednesday 2026-04-15
    const analysis = analyzeChange(input, {
      type: 'MOVE_DEADLINE',
      taskId: 't3',
      newDueDate: '2026-04-14',
    });

    expect(analysis.conflicts.length).toBe(1);
    expect(analysis.conflicts[0].taskId).toBe('t3');
    expect(analysis.conflicts[0].type).toBe('DEADLINE_MISSED');
    expect(analysis.summary.fixedBrokenCount).toBe(1);
  });

  it('handles no-change input cleanly (zero moved tasks)', () => {
    const input = createInput();

    // Move deadline to the exact same date
    const analysis = analyzeChange(input, {
      type: 'MOVE_DEADLINE',
      taskId: 't3',
      newDueDate: '2026-04-16',
    });

    expect(analysis.moved.length).toBe(0);
    expect(analysis.conflicts.length).toBe(0);
    expect(analysis.summary.movedCount).toBe(0);
  });
});
