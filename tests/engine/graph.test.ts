import { describe, expect, it } from 'vitest';
import {
  buildGraph,
  detectCycles,
  findCriticalPath,
  getBlockedTasks,
  getDownstream,
  getUpstream,
  topologicalOrder,
} from '../../lib/engine/graph';
import { EngineApproval, EngineTask, Schedule } from '../../lib/engine/types';

describe('Engine: Graph Operations', () => {
  const dummyTask = (id: string, status: EngineTask['status'] = 'not_started'): EngineTask => ({
    id,
    campaignId: 'camp-1',
    title: `Task ${id}`,
    status,
    priority: 'medium',
    deadlineType: 'flexible',
  });

  it('builds adjacency and reverse adjacency maps', () => {
    const tasks = [dummyTask('A'), dummyTask('B'), dummyTask('C')];
    const deps = [
      { taskId: 'B', dependsOnTaskId: 'A' },
      { taskId: 'C', dependsOnTaskId: 'B' },
    ];

    const graph = buildGraph(tasks, deps);
    expect(graph.adj.get('A')).toEqual(['B']);
    expect(graph.adj.get('B')).toEqual(['C']);
    expect(graph.revAdj.get('C')).toEqual(['B']);
    expect(graph.revAdj.get('B')).toEqual(['A']);
  });

  it('detects cycles and returns the exact cycle path', () => {
    const tasks = [dummyTask('A'), dummyTask('B'), dummyTask('C')];
    // Cycle: A -> B -> C -> A
    const deps = [
      { taskId: 'B', dependsOnTaskId: 'A' },
      { taskId: 'C', dependsOnTaskId: 'B' },
      { taskId: 'A', dependsOnTaskId: 'C' },
    ];

    const graph = buildGraph(tasks, deps);
    const cycle = detectCycles(graph);
    expect(cycle.hasCycle).toBe(true);
    expect(cycle.cyclePath).toBeDefined();
    expect(cycle.cyclePath!.length).toBeGreaterThan(2);

    // Topological order must throw an explicit error naming the cycle
    expect(() => topologicalOrder(graph)).toThrowError(/Dependency cycle detected/);
  });

  it('computes topological order for diamond dependencies', () => {
    // Diamond:
    //      A
    //     / \
    //    B   C
    //     \ /
    //      D
    const tasks = [dummyTask('A'), dummyTask('B'), dummyTask('C'), dummyTask('D')];
    const deps = [
      { taskId: 'B', dependsOnTaskId: 'A' },
      { taskId: 'C', dependsOnTaskId: 'A' },
      { taskId: 'D', dependsOnTaskId: 'B' },
      { taskId: 'D', dependsOnTaskId: 'C' },
    ];

    const graph = buildGraph(tasks, deps);
    const order = topologicalOrder(graph);

    expect(order.indexOf('A')).toBeLessThan(order.indexOf('B'));
    expect(order.indexOf('A')).toBeLessThan(order.indexOf('C'));
    expect(order.indexOf('B')).toBeLessThan(order.indexOf('D'));
    expect(order.indexOf('C')).toBeLessThan(order.indexOf('D'));
  });

  it('traces transitive downstream tasks with exact paths', () => {
    const tasks = [dummyTask('A'), dummyTask('B'), dummyTask('C'), dummyTask('D')];
    const deps = [
      { taskId: 'B', dependsOnTaskId: 'A' },
      { taskId: 'C', dependsOnTaskId: 'B' },
      { taskId: 'D', dependsOnTaskId: 'C' },
    ];

    const graph = buildGraph(tasks, deps);
    const downstream = getDownstream('A', graph);

    expect(downstream.map(d => d.taskId)).toEqual(['B', 'C', 'D']);
    expect(downstream.find(d => d.taskId === 'D')?.path).toEqual(['A', 'B', 'C', 'D']);
  });

  it('traces transitive upstream prerequisites', () => {
    const tasks = [dummyTask('A'), dummyTask('B'), dummyTask('C')];
    const deps = [
      { taskId: 'B', dependsOnTaskId: 'A' },
      { taskId: 'C', dependsOnTaskId: 'B' },
    ];

    const graph = buildGraph(tasks, deps);
    const upstream = getUpstream('C', graph);
    expect(upstream).toContain('B');
    expect(upstream).toContain('A');
  });

  it('identifies blocked tasks accurately', () => {
    const tasks = [
      dummyTask('A', 'in_progress'),
      dummyTask('B', 'not_started'),
      dummyTask('C', 'not_started'),
    ];
    const deps = [{ taskId: 'B', dependsOnTaskId: 'A' }];
    const approvals: EngineApproval[] = [
      {
        id: 'app-1',
        taskId: 'C',
        status: 'pending',
        requestedAt: '2026-04-10',
        expectedTurnaroundDays: 2,
      },
    ];

    const blocked = getBlockedTasks(tasks, deps, approvals);
    // B is blocked because A is not done
    expect(blocked).toContain('B');
    // C is blocked because it has a pending approval
    expect(blocked).toContain('C');
    // A is in_progress and has no unfinished prereqs
    expect(blocked).not.toContain('A');
  });

  it('traces critical path from zero-slack and terminal finish dates', () => {
    const tasks = [dummyTask('A'), dummyTask('B'), dummyTask('C'), dummyTask('D')];
    const deps = [
      { taskId: 'B', dependsOnTaskId: 'A' },
      { taskId: 'C', dependsOnTaskId: 'B' },
    ];
    const graph = buildGraph(tasks, deps);

    const schedule: Schedule = {
      A: { taskId: 'A', start: '2026-04-13', finish: '2026-04-14', hoursPerDay: 8, slackDays: 0, isCritical: false, isConflict: false, assumptionNotes: [] },
      B: { taskId: 'B', start: '2026-04-15', finish: '2026-04-16', hoursPerDay: 8, slackDays: 0, isCritical: false, isConflict: false, assumptionNotes: [] },
      C: { taskId: 'C', start: '2026-04-17', finish: '2026-04-20', hoursPerDay: 8, slackDays: 0, isCritical: false, isConflict: false, assumptionNotes: [] },
      D: { taskId: 'D', start: '2026-04-13', finish: '2026-04-13', hoursPerDay: 4, slackDays: 5, isCritical: false, isConflict: false, assumptionNotes: [] },
    };

    const critical = findCriticalPath(schedule, graph);
    expect(critical).toContain('C');
    expect(critical).toContain('B');
    expect(critical).toContain('A');
    expect(critical).not.toContain('D');
  });
});
