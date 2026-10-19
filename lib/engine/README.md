# Deterministic Workflow Engine (`/lib/engine`)

## Overview
The core differentiator of **Creator Flow** is pure, dependency-aware workflow adaptation. 

### Non-Negotiable Architecture Constraints
1. **Pure TypeScript**: This directory contains zero dependencies on UI frameworks (React), databases (Supabase), or AI services (OpenAI/Anthropic).
2. **Deterministic & Mathematical**: All calculations (critical path forward/backward pass, resource leveling, slack, slack-variance, and dates) are deterministic algorithms.
3. **AI Boundary**: LLMs are never allowed into this directory. AI is an explainer and extractor; it never computes dates or money.
4. **Unit Tested**: The engine will be thoroughly tested via Vitest with 100% coverage across cyclic dependencies, parallel task pipelines, and resource overload scenarios in Phase 2.

### Module Plan (Phase 2 Implementation)
- `types.ts` - Schedule, Task, Dependency, Resource, and ChangeEvent definitions.
- `graph.ts` - Directed Acyclic Graph (DAG) construction, topological sorting, and cycle detection.
- `scheduler.ts` - Forward and backward scheduling, early/late start calculation, float/slack.
- `leveling.ts` - Working hour and resource availability leveling.
- `simulator.ts` - What-if simulation, conflict propagation, and least-disruptive remediation solver.
- `formulas.ts` - Workload percentage, brand reliability score, and net profit calculations.
