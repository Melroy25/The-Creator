# Deterministic Workflow & Scheduling Engine (`/lib/engine`)

## Overview
The core technical innovation of **Creator Flow** is **dependency-aware, deterministic workflow adaptation**. 

Creators operate like small multi-client production studios with complex deliverables (video editing, script approvals, filming, audio mastering) scattered across multiple brands. When any variable changes (e.g. Brand A moves its submission deadline 2 days earlier, Brand B delays a script approval, or an editor has part-time availability), the engine:
1. Simulates the change on an isolated deep copy of the schedule.
2. Traverses the dependency Directed Acyclic Graph (DAG) to find downstream affected tasks.
3. Performs deterministic forward scheduling and resource leveling.
4. Calculates slack ($slack = deadline - calculated\_finish$) and flags any negative slack on fixed commitments as a hard conflict.
5. Employs a 4-stage resolution hierarchy (shift flexible tasks, parallelize, use buffer, or report infeasible with concrete alternatives).
6. Explains every date shift in plain English with a stable reason code.

---

## Non-Negotiable Architecture Constraints
1. **Pure TypeScript**: Zero imports from React, Next.js, Supabase, or AI SDKs.
2. **Deterministic & Mathematical**: Given identical inputs ($tasks, dependencies, resources, calendar, today$), the engine yields identical outputs.
3. **No System Clock Access**: `today` is always passed explicitly as a `YYYY-MM-DD` date string.
4. **Timezone-Safe Arithmetic**: All date calculations are executed in discrete UTC at 12:00:00 to prevent daylight saving time or regional timezone drift.
5. **Input Immutability**: All calculations run on deep-cloned copies. Inputs are never mutated in place.
6. **Honesty Rules**:
   - Fixed deadlines are **never** silently moved.
   - Infeasible schedules are reported plainly with calculated trade-offs (renegotiate date, add overtime hours, or drop scope).
   - Incomplete estimates are clearly flagged with provenance (`assumption`).

---

## Module Breakdown

| Module | Purpose |
|---|---|
| `types.ts` | Domain types: `EngineTask`, `Dependency`, `EngineResource`, `ResourceAvailability`, `Schedule`, `Change`, `ChangeAnalysis`, `ResolutionResult`, `RiskAlert`. |
| `calendar.ts` | Timezone-safe calendar math: `isWorkingDay`, `nextWorkingDay`, `addWorkingDays`, `workingDaysBetween`, `minDate`, `maxDate`. |
| `graph.ts` | DAG construction, cycle detection with exact cycle path extraction, topological sort (Kahn's algorithm), transitive downstream/upstream traversal, critical path detection. |
| `scheduler.ts` | Topological forward pass with priority-based daily resource leveling, discrete capacity allocation, availability overrides, and fixed deadline conflict detection. |
| `impact.ts` | Change simulation, baseline vs proposed diff comparison, path tracing, and plain-English explanation generation. |
| `resolve.ts` | 4-stage conflict resolution solver. Generates computed alternatives (`RENEGOTIATE_DEADLINE`, `ADD_HOURS`, `REDUCE_SCOPE`) for infeasible plans. |
| `risks.ts` | Rule-based Risk Radar alerts (`critical`, `high`, `medium`, `low`) with explicit evidence. |
| `metrics.ts` | Defined formulas: workload by week, brand reliability score (min 3 events), honest campaign profit (with missing-data tags), and money strip accounting. |
| `newDeal.ts` | New-deal what-if simulator testing capacity and reporting slipping existing tasks and newly overloaded weeks. |
| `templates.ts` | Auto-generated workflow DAGs for `long_video`, `reel`/`short_video`, and `post`. |

---

## Resource Leveling Tie-Breaker Rule

When multiple ready tasks compete for the same resource on the same working day, capacity is awarded in the following order:
1. **Higher Priority First**: `urgent` > `high` > `medium` > `low`
2. **Earlier Deadline First**: Tasks with closer due dates take precedence.
3. **Deterministic Lexicographical Order**: Stable sort by `taskId`.

Deferred tasks are pushed to the next working day where the resource has remaining hours.

---

## Conflict Resolution Hierarchy

When a proposed schedule violates one or more deadlines:
1. **Shift Flexible Tasks**: Lower priority or flexible deliverables are deferred.
2. **Parallelize Independent Tasks**: Independent tasks run concurrently where resource capacity allows.
3. **Absorb Using Slack**: Available buffer absorbs minor schedule variances.
4. **Return INFEASIBLE with Calculated Alternatives**:
   - **Renegotiate Deadline**: Suggests the earliest mathematically feasible date.
   - **Add Hours**: Calculates exact editor/freelance hours required to hit the deadline.
   - **Reduce Scope**: Recommends candidate flexible tasks that could be postponed.

---

## Worked Example: Marcus Vance Scenario

- **Context**: 3 active campaigns (Brand A YouTube, Brand B Review, Brand C Reel). Editor Leo Santos is shared between Brand A and Brand C.
- **Change Event**: Brand A client requests moving the fixed submission deadline up by 2 working days.
- **Engine Analysis**:
  1. Downstream tasks (A-Roll filming, rough cut editing, audio mastering) are compressed.
  2. Rough Cut requires Leo Santos immediately.
  3. Leo Santos was previously scheduled to edit Brand C's Instagram Reel.
  4. Brand A is marked `fixed` and `priority: urgent`. Brand C is marked `flexible` and `priority: medium`.
  5. The leveling engine grants Leo's hours to Brand A, shifting Brand C's editing window back by 2 days.
  6. **Verdict**: `FEASIBLE_WITH_CHANGES`. Brand A's fixed deadline is preserved; Brand C shifts within its flexible publication window. Plain-English explanation generated for the creator.
