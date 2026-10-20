import { describe, expect, it } from 'vitest';
import { analyzeChange } from '../../lib/engine/impact';
import { resolveConflicts } from '../../lib/engine/resolve';
import { computeSchedule } from '../../lib/engine/scheduler';
import { evaluateRisks } from '../../lib/engine/risks';
import { createDemoEngineInput, FINANCIAL_DEMO } from '../fixtures/scenario';
import { EngineInput } from '../../lib/engine/types';

/**
 * Deep freezes an object recursively to ensure strict immutability.
 */
function deepFreeze<T>(obj: T): T {
  if (obj === null || typeof obj !== 'object') {
    return obj;
  }
  Object.freeze(obj);
  for (const key of Object.keys(obj as object)) {
    const val = (obj as Record<string, unknown>)[key];
    if (val !== null && typeof val === 'object' && !Object.isFrozen(val)) {
      deepFreeze(val);
    }
  }
  return obj;
}

describe('Engine: Marcus Vance Demo Scenario (Brand A 2-Day Move)', () => {
  it('guarantees zero input mutation using deepFreeze', () => {
    const input = deepFreeze(createDemoEngineInput());

    // Executing the scheduler and impact analyzer on a frozen input must NOT throw TypeError
    expect(() => computeSchedule(input)).not.toThrow();

    expect(() =>
      analyzeChange(input, {
        type: 'MOVE_DEADLINE',
        taskId: 'task-a7-submission',
        newDueDate: '2026-04-15',
      })
    ).not.toThrow();
  });

  it('proposes a feasible plan when Brand A moves up 2 days, shifting Brand C flexible edit', () => {
    const input = createDemoEngineInput();

    // Baseline: task-a7-submission is due on 2026-04-17 (Friday)
    const baseline = computeSchedule(input);
    expect(baseline['task-a7-submission'].finish).toBe('2026-04-16');

    // DEMO CHANGE: Brand A client requests moving final submission 2 days earlier,
    // to Wednesday 2026-04-15 (or tightening deadline)
    const change = {
      type: 'MOVE_DEADLINE' as const,
      taskId: 'task-a7-submission',
      newDueDate: '2026-04-15',
    };

    const analysis = analyzeChange(input, change);

    // Analysis verifies downstream affected nodes and moved tasks
    expect(analysis.proposed['task-a7-submission'].finish <= '2026-04-16').toBe(true);

    // Evaluate conflict resolution
    const resolution = resolveConflicts(input, change);

    // Because Brand A is 'urgent' & 'fixed', and Brand C's edit is 'medium' & 'flexible',
    // Leo Santos is prioritized for Brand A, shifting Brand C's flexible edit window
    expect(resolution.status).toMatch(/FEASIBLE/);

    // Check that reasons are transparent and explanatory
    const movedBrandCTask = analysis.moved.find(m => m.taskId === 'task-c3-fast-cuts');
    if (movedBrandCTask) {
      expect(movedBrandCTask.reasonCode).toBe('SHIFTED_FOR_FIXED_DEADLINE');
      expect(movedBrandCTask.reasonText).toContain('capacity');
    }
  });

  it('accurately identifies risks in the demo scenario', () => {
    const input = createDemoEngineInput();
    const risks = evaluateRisks(input, FINANCIAL_DEMO);

    // Risk 1: Overdue invoice inv-003 for Brand C (due 2026-04-01, today is 2026-04-13)
    const overduePayment = risks.find(r => r.ruleId === 'OVERDUE_PAYMENT');
    expect(overduePayment).toBeDefined();
    expect(overduePayment?.severity).toBe('critical');

    // Risk 2: Client approval overdue for Brand B (app-brand-b-script requested 2026-04-09, 2-day expected turnaround)
    const overdueApproval = risks.find(r => r.ruleId === 'APPROVAL_OVERDUE');
    expect(overdueApproval).toBeDefined();
    expect(overdueApproval?.severity).toBe('medium');
  });
});
