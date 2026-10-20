/**
 * CREATOR FLOW: Deterministic Graph Operations
 * Directed Acyclic Graph (DAG) analysis, topological ordering, cycle detection with path extraction.
 */

import { EngineTask, Dependency, EngineApproval, Schedule } from './types';

export interface DependencyGraph {
  tasks: Map<string, EngineTask>;
  /**
   * adj: u -> v means u is prerequisite of v (u must finish before v starts).
   */
  adj: Map<string, string[]>;
  /**
   * revAdj: v -> u means v depends on u (u is upstream of v).
   */
  revAdj: Map<string, string[]>;
}

/**
 * Builds the forward and reverse adjacency maps for all tasks and dependencies.
 */
export function buildGraph(tasks: EngineTask[], dependencies: Dependency[]): DependencyGraph {
  const taskMap = new Map<string, EngineTask>();
  const adj = new Map<string, string[]>();
  const revAdj = new Map<string, string[]>();

  for (const t of tasks) {
    taskMap.set(t.id, t);
    adj.set(t.id, []);
    revAdj.set(t.id, []);
  }

  for (const dep of dependencies) {
    // Only register dependencies if both tasks exist
    if (taskMap.has(dep.dependsOnTaskId) && taskMap.has(dep.taskId)) {
      adj.get(dep.dependsOnTaskId)!.push(dep.taskId);
      revAdj.get(dep.taskId)!.push(dep.dependsOnTaskId);
    }
  }

  return { tasks: taskMap, adj, revAdj };
}

/**
 * Detects cycles in the dependency graph using Depth-First Search with coloring.
 * If a cycle is found, returns { hasCycle: true, cyclePath: [...] } showing the exact cycle.
 */
export function detectCycles(graph: DependencyGraph): { hasCycle: boolean; cyclePath?: string[] } {
  const visited = new Map<string, 0 | 1 | 2>(); // 0: unvisited, 1: visiting, 2: visited
  const parent = new Map<string, string>();
  let cyclePath: string[] | undefined;

  for (const taskId of graph.tasks.keys()) {
    visited.set(taskId, 0);
  }

  function dfs(u: string): boolean {
    visited.set(u, 1);

    const neighbors = graph.adj.get(u) || [];
    for (const v of neighbors) {
      if (visited.get(v) === 1) {
        // Cycle detected! Reconstruct path from u back to v
        const path: string[] = [v, u];
        let curr = u;
        while (curr !== v && parent.has(curr)) {
          curr = parent.get(curr)!;
          path.push(curr);
        }
        cyclePath = path.reverse();
        return true;
      }
      if (visited.get(v) === 0) {
        parent.set(v, u);
        if (dfs(v)) return true;
      }
    }

    visited.set(u, 2);
    return false;
  }

  for (const taskId of graph.tasks.keys()) {
    if (visited.get(taskId) === 0) {
      if (dfs(taskId)) {
        return { hasCycle: true, cyclePath };
      }
    }
  }

  return { hasCycle: false };
}

/**
 * Computes topological order using Kahn's algorithm (indegree-based).
 * Throws a descriptive error with the cycle path if graph is cyclic.
 */
export function topologicalOrder(graph: DependencyGraph): string[] {
  const cycleCheck = detectCycles(graph);
  if (cycleCheck.hasCycle) {
    const pathStr = cycleCheck.cyclePath ? cycleCheck.cyclePath.join(' -> ') : 'unknown';
    throw new Error(`Dependency cycle detected in workflow: ${pathStr}`);
  }

  const inDegree = new Map<string, number>();
  for (const taskId of graph.tasks.keys()) {
    inDegree.set(taskId, (graph.revAdj.get(taskId) || []).length);
  }

  const queue: string[] = [];
  for (const [taskId, deg] of inDegree.entries()) {
    if (deg === 0) {
      queue.push(taskId);
    }
  }

  const order: string[] = [];
  while (queue.length > 0) {
    // Deterministic tie-breaking: sort queue by taskId
    queue.sort();
    const u = queue.shift()!;
    order.push(u);

    const neighbors = graph.adj.get(u) || [];
    for (const v of neighbors) {
      const newDeg = inDegree.get(v)! - 1;
      inDegree.set(v, newDeg);
      if (newDeg === 0) {
        queue.push(v);
      }
    }
  }

  return order;
}

/**
 * Finds all transitive downstream tasks reachable from taskId, along with the dependency path.
 */
export function getDownstream(taskId: string, graph: DependencyGraph): Array<{ taskId: string; path: string[] }> {
  const results: Array<{ taskId: string; path: string[] }> = [];
  const visited = new Set<string>();

  function dfs(curr: string, currentPath: string[]) {
    const nextTasks = graph.adj.get(curr) || [];
    for (const nextId of nextTasks) {
      if (!visited.has(nextId)) {
        visited.add(nextId);
        const newPath = [...currentPath, nextId];
        results.push({ taskId: nextId, path: newPath });
        dfs(nextId, newPath);
      }
    }
  }

  dfs(taskId, [taskId]);
  return results;
}

/**
 * Finds all transitive upstream prerequisites of taskId.
 */
export function getUpstream(taskId: string, graph: DependencyGraph): string[] {
  const upstream = new Set<string>();

  function dfs(curr: string) {
    const prereqs = graph.revAdj.get(curr) || [];
    for (const p of prereqs) {
      if (!upstream.has(p)) {
        upstream.add(p);
        dfs(p);
      }
    }
  }

  dfs(taskId);
  return Array.from(upstream);
}

/**
 * Identifies blocked tasks: tasks that are not done, but have at least one unfinished upstream task
 * or an active pending approval.
 */
export function getBlockedTasks(
  tasks: EngineTask[],
  dependencies: Dependency[],
  approvals: EngineApproval[] = []
): string[] {
  const graph = buildGraph(tasks, dependencies);
  const taskMap = graph.tasks;
  const blocked: string[] = [];

  const pendingApprovalTaskIds = new Set(
    approvals.filter(a => a.status === 'pending').map(a => a.taskId)
  );

  for (const t of tasks) {
    if (t.status === 'done') continue;

    // Direct check: is approval pending on this task?
    if (pendingApprovalTaskIds.has(t.id)) {
      blocked.push(t.id);
      continue;
    }

    // Dependency check: are any prerequisites not done?
    const prereqs = graph.revAdj.get(t.id) || [];
    const hasUnfinishedPrereq = prereqs.some(pId => {
      const prereqTask = taskMap.get(pId);
      return !prereqTask || prereqTask.status !== 'done';
    });

    if (hasUnfinishedPrereq) {
      blocked.push(t.id);
    }
  }

  return blocked;
}

/**
 * Finds the critical path driving the project's latest finish date.
 */
export function findCriticalPath(schedule: Schedule, graph: DependencyGraph): string[] {
  const scheduledTasks = Object.values(schedule);
  if (scheduledTasks.length === 0) return [];

  // Find the overall latest finish date
  let latestFinish = '';
  for (const st of scheduledTasks) {
    if (st.finish > latestFinish) {
      latestFinish = st.finish;
    }
  }

  // Filter tasks that finish on the latest date or have slack <= 0
  const terminalTasks = scheduledTasks.filter(st => st.finish === latestFinish);
  if (terminalTasks.length === 0) return [];

  // Backward trace through zero-slack/driving dependencies
  const criticalSet = new Set<string>();

  function trace(taskId: string) {
    criticalSet.add(taskId);
    const prereqs = graph.revAdj.get(taskId) || [];
    for (const p of prereqs) {
      const pSched = schedule[p];
      const currSched = schedule[taskId];
      if (pSched && currSched) {
        // If pSched finish directly determines or is tight with currSched start
        if (pSched.slackDays <= 0 || pSched.finish >= currSched.start) {
          if (!criticalSet.has(p)) {
            trace(p);
          }
        }
      }
    }
  }

  for (const tt of terminalTasks) {
    trace(tt.taskId);
  }

  return Array.from(criticalSet);
}
