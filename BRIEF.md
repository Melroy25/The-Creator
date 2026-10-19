# CREATOR FLOW: Project Brief (BRIEF.md)

AI-Powered Workflow Intelligence System for the Creator Economy
Tagline: **Create More. Manage Less. Stay Ahead.**
Event: CODE MEET 2026 Hackathon (Srinivas University, Institute of Engineering & Technology, with the Webflow Community)
Problem Statement 4: **Creator Economy Tech**

This file is the single source of truth for the project. Follow it. If something is unclear, ask before guessing.

---

## 1. Problem Statement

Today's creators operate like small businesses. They create content while managing multiple platforms, communities, collaborations, brand deals, analytics, finances, schedules and distribution. These workflows are scattered across different tools, forcing creators to spend more time managing their work than actually creating.

**Question:** How can technology bring the creator's fragmented workflow together, automate repetitive tasks, and help creators spend more time creating while still managing the business behind their work?

Two explicit asks:
1. **Unify** the fragmented workflow.
2. **Automate** repetitive tasks.

Do not turn the project into a generic task manager, CRM or social analytics app.

### Example scenario (used for the demo)
A YouTuber has three brand deals:
- **Brand A:** sponsored video due Monday.
- **Brand B:** product review on Wednesday, script not yet approved.
- **Brand C:** Instagram Reel to publish Friday.

Then: Brand A moves its deadline forward 2 days, Brand B's approval is delayed, the editor has limited availability, one payment is pending, one campaign needs revisions. A normal task manager only displays these. CREATOR FLOW works out the consequences.

---

## 2. Solution Summary

One connected system with a single shared data model. When something changes (deadline moved, approval delayed, editor unavailable, duration changed), a **deterministic engine**:

1. Understands what changed.
2. Finds affected campaigns and tasks.
3. Propagates impact through dependencies.
4. Detects conflicts and blocked work.
5. Calculates a feasible revised schedule.
6. Explains why it changed.
7. Recommends prioritized actions.
8. Waits for the creator to approve.
9. Applies approved changes to internal records.
10. Prepares external actions (messages, calendar updates) as drafts for approval.

**Core differentiator: dependency-aware workflow adaptation.**
Do not claim no one else does similar things. Our innovation is the specific combination of dependency analysis, change-impact reasoning, resource-aware scheduling, risk detection and creator-focused financial context.

### Three layers
1. **Creator Data:** campaigns, deliverables, tasks, dependencies, deadlines, approvals, resources, expenses, invoices, payments.
2. **Workflow Intelligence:** extraction, dependency analysis, impact propagation, scheduling, risk detection, recommendations.
3. **Creator Command Center:** the UI where the creator reviews and acts.

Every feature uses shared data. A change must appear consistently in campaign details, task list, workflow graph, risk alerts, schedule, finances and audit log. No disconnected mock interactions.

---

## 3. Non-Negotiable Principles

1. **Deterministic engine, AI as explainer.** Dates, dependency traversal, constraints, severity and money are calculated by code. The LLM only extracts from documents, explains engine output, drafts messages and powers copilot conversation. The LLM may never add dates or facts not present in engine output.
2. **Never invent certainty.** If information is missing, say so. If no feasible schedule exists, report the conflict and offer alternatives (renegotiate deadline, add editor hours, drop a flexible task).
3. **Provenance on important values.** Tag as: **Confirmed** (user-verified record), **Assumption** (user-provided or default), **Calculated** (engine output), **AI suggestion** (LLM output).
4. **Propose, review, approve, audit.** Every automated change is a proposal. Nothing is applied without approval. Nothing is sent externally without approval.
5. **Honest money.** Unpaid invoices are never counted as received. Projected revenue is always separate from recorded revenue. Profit is not revenue. Profit and profit per hour are labelled "Estimate" when cost or time data is missing.
6. **Drafts are drafts.** Message drafts are labelled "Draft, not sent". Never claim something was sent unless an integration actually sent it.
7. **Security.** API keys and the Supabase service-role key stay server-side only. Never in client code or committed files. Provide `.env.example`.
8. **Demo-proof.** Seeded demo data and a no-API-key fallback (manual brief entry, template-based explanations) so the demo never breaks.
9. **Simple UI.** Few sections per screen, large readable text, details in side drawers.

---

## 4. Features

### Core
1. **Smart Brief Analyzer** (`/brief-analyzer`): upload PDF or TXT; LLM extracts brand, campaign, deliverables, formats, submission and publication dates, approval requirements, revision limits, payment amount and conditions, key contract terms. Output validated by Zod. A **review screen** highlights uncertain (amber, "Please verify"), conflicting (both values shown) and missing fields before any record is created. Never treat uncertain extraction as fact. Manual entry option always available.
2. **Workflow Graph** (`/workflow`): interactive graph (React Flow) of tasks and dependencies. Not forced linear; parallel tasks allowed. Task fields: status, planned duration, estimated effort, start and due dates, assignee, priority, fixed or flexible deadline, blocking relationships, completion, overdue detection. Critical path highlighted. Click opens a drawer.
3. **Change-Impact Engine and Simulator** (`/simulator`): the most important feature. Changeable: campaign deadline, approval status, task duration, editor availability, task completion, task dependency, or adding a new deal. Shows Current vs Proposed plan, affected tasks, conflicts, reasons, and Approve / Reject. Nothing saved until Approve.
4. **Risk Radar** (`/risks`): rule-based alerts. Each has title, severity, campaign, evidence, reason, recommended next action, deadline, link to task, and a label "Potential risk" or "Confirmed issue".
5. **Command Center** (`/dashboard`): daily briefing line, Due Today, Overdue, At Risk, next 5 deadlines, top recommendation, money strip (Received, Waiting, Expected).

### Added features (all included)
6. **New-deal what-if:** "Can I take this deal?" Runs the engine on a copy of the schedule with the proposed tasks and shows what would slip.
7. **Workload meter:** per person per week load.
8. **Brand reliability score:** per brand, with a visible formula.
9. **Audit trail with undo:** every approved change is recorded and reversible.
10. **Auto-generated task templates:** new campaign gets a workflow based on deliverable type.
11. **Invoice automation:** when a post is marked Published, draft an invoice from payment terms and set a reminder at the due date. Stays a draft until the creator confirms.
12. **Daily briefing:** generated from calculated data; LLM only phrases it.
13. **Creator Copilot** (`/copilot`): chat grounded in real data via tool-calling into the engine and database. Never invents dates.
14. **Message Assistant:** drafts for approval requests, deadline negotiation, invoice follow-up, editor updates. Copyable.

---

## 5. Engine Specification (`/lib/engine`)

Pure TypeScript. **No imports from UI, database or AI code.** Fully unit-tested with Vitest.

**Inputs:** tasks, dependencies, deadlines (fixed or flexible), resources with availability, working-hour settings, a change event, and "today".

**Algorithm:**
1. Apply the change to a **copy** of the data.
2. **Impact analysis:** graph traversal finds downstream tasks of the changed task.
3. **Forward scheduling:** earliest feasible start and finish per task (critical-path style) respecting dependencies.
4. **Resource leveling:** respect each person's daily capacity and unavailability; overloaded days push work later.
5. **Slack:** `slack = deadline − calculated finish` (in working days). Negative slack on a fixed deadline is a **conflict** and is always reported.
6. **Resolution order (least disruptive first):** shift flexible tasks, parallelize where dependencies allow, use buffer, then suggest renegotiating the deadline, adding hours or reducing scope. Fixed commitments are never moved silently.
7. **Output (JSON):** baseline vs proposed schedule diff, a reason code per change, unresolved conflicts, constraints considered, assumptions used.
8. Detect cycles in dependencies and reject them with a clear error.

**Edge cases that need tests:** simple chain, parallel branches, fixed-deadline conflict, infeasible plan, editor overload, no-change input, dependency cycle, completed tasks, weekends and non-working days, missing estimates (flag as assumption).

### Defined formulas

**Risk severity (rule-based):**
- **Critical (confirmed issue):** task overdue, or fixed deadline missed in calculated schedule, or payment overdue.
- **High:** blocked task whose downstream deadline is within 48 hours, or negative slack on a flexible deadline.
- **Medium:** slack under 1 working day, or approval pending beyond expected turnaround.
- **Low:** incomplete records or unclear requirements with no immediate date impact.
Each alert lists the evidence that triggered the rule.

**Workload per person per week:**
`load % = planned hours ÷ available hours × 100`
Under 80% = Healthy, 80 to 100% = Tight, over 100% = Overloaded.

**Brand reliability score:**
`score = 100 × (0.5 × on-time approval rate + 0.5 × on-time payment rate)`
Also show average delay in days for each. Requires at least 3 recorded events, otherwise show "Not enough data".

**Profitability:**
`estimated net profit = recorded revenue − recorded expenses`
`profit per hour = estimated net profit ÷ estimated creator hours`
Always labelled "Estimate"; show what data is missing.

**New-deal capacity check:** add proposed tasks to a copy of the schedule, run the engine, report each existing task that now misses its deadline and each overload week created.

---

## 6. Tech Stack

| Area | Choice |
|---|---|
| Frontend | Next.js (App Router), TypeScript, React |
| UI | Tailwind CSS, shadcn/ui, Lucide icons |
| Graph | React Flow |
| Charts | Recharts (only where useful) |
| Backend | Next.js server actions and route handlers |
| Engine | Pure TypeScript module, Vitest |
| Database | PostgreSQL on Supabase |
| Auth | Supabase Auth |
| Storage | Supabase Storage |
| Validation | Zod |
| AI | LLM API, server-side only, provider set by env var, structured output |
| Deploy | Vercel |

Do **not** use FastAPI, Redis, queues or microservices unless clearly justified.

---

## 7. Data Model

Core tables (all with `id` uuid PK, `owner_id` referencing the user, `created_at`, `updated_at`):

- `creator_profiles`: display name, timezone, working hours, working days.
- `brands`: name, contact, notes.
- `campaigns`: brand_id, name, status, platform, submission_deadline, publish_date, payment_amount, currency, payment_terms_days, revision_limit, source (manual or brief).
- `deliverables`: campaign_id, type (long_video, short_video, reel, post, other), title, due_date.
- `tasks`: campaign_id, deliverable_id, title, status (not_started, in_progress, blocked, done), priority, estimated_hours, duration_days, start_date, due_date, deadline_type (fixed or flexible), assignee_resource_id, completed_at.
- `task_dependencies`: task_id, depends_on_task_id (no self reference, no cycles).
- `approvals`: campaign_id, task_id, type (script, final), status (pending, approved, rejected), requested_at, responded_at, expected_turnaround_days.
- `resources`: name, role (creator, editor, other), hours_per_day, working_days.
- `resource_availability`: resource_id, date_from, date_to, available_hours_per_day, note.
- `invoices`: campaign_id, amount, status (draft, sent, paid, overdue), issued_at, due_date.
- `payments`: invoice_id, amount, received_at.
- `expenses`: campaign_id, category, amount, incurred_at, note.
- `change_events`: type, description, before (jsonb), after (jsonb), affected_task_ids, constraints (jsonb), assumptions (jsonb), status (proposed, approved, rejected, undone), approved_at, undone_at. Also serves as the **audit log**.
- `risk_alerts`: campaign_id, task_id, title, severity, kind (potential or confirmed), evidence (jsonb), reason, recommended_action, relevant_date, resolved_at.
- `message_drafts`: campaign_id, type, recipient, subject, body, status (draft, copied). Never "sent" unless an integration sends it.

Requirements: foreign keys, indexes on foreign keys and dates, enums or check constraints, **Row Level Security on every table** (users access only their own rows), service-role key server-side only. Design so multi-creator and agency support is possible later, but do not build it now.

---

## 8. Routes

| Route | Purpose |
|---|---|
| `/` | Landing page |
| `/dashboard` | Command Center |
| `/campaigns` | Campaign list and create |
| `/campaigns/[id]` | Campaign details (Overview, Tasks, Approvals, Finance, Activity) |
| `/workflow` | Workflow graph |
| `/simulator` | Change-impact simulator and new-deal what-if |
| `/risks` | Risk Radar |
| `/brief-analyzer` | Upload, extract, review, import |
| `/finances` | Received, Waiting, Expected, invoices, expenses, profit, brand reliability |
| `/copilot` | Chat |
| `/audit` | Audit trail with undo |
| `/settings` | Profile, working hours, team, integrations status, demo data controls |

Sidebar: Dashboard, Campaigns, Workflow, Simulator, Risks, Copilot, and a "More" menu (Finances, Brief Analyzer, Audit Trail, Settings). Topbar: search, What-if toggle, notifications, avatar. Mobile: bottom tab bar.

---

## 9. Design

**Source of truth for visuals: the Stitch export in `/design/stitch/`.** Match its colors, typography, spacing, glass-card style, layouts and navigation. Rebuild screens as clean reusable React components with shared tokens. Do not copy markup blindly. If a Stitch screen conflicts with this brief, keep the Stitch look and the brief's behavior.

Direction: futuristic, clean, calm, dark mode. Deep navy-black background, electric blue and violet accents, blue-to-violet gradient for primary buttons, active nav and key highlights (used sparingly), glass cards, soft depth. 3D-style visuals only for the landing hero, workflow nodes and simulator layers.

Reference tokens (verify against the Stitch export and use its exact values):
- Background ~#060812, glass cards ~#0D1225 at 80% with blur, borders ~#1E2540
- Blue ~#4D7CFF, violet ~#8B5CF6
- Cyan for Calculated, light violet for AI suggestion
- Status: critical rose, at-risk amber, on-track green, in-progress sky blue, not-started gray
- Fonts: Geist or Inter for UI; JetBrains Mono for numbers, dates and IDs

UX rules:
- One main goal and one primary button per screen. Maximum 4 to 5 sections per screen.
- Body text at least 16px. Plain words ("Blocked by", "Room to spare").
- Status is never color alone: always icon plus label.
- Details live in side drawers, not on the main view. Provenance chips appear inside drawers.
- Friendly empty, loading, error and success states.
- Responsive: sidebar on desktop, rail on tablet, bottom tabs on mobile.
- Motion is subtle and respects `prefers-reduced-motion`.
- No fake statistics, no dead buttons, no lorem ipsum.

---

## 10. Seed Data (demo scenario)

- Creator with 8-hour working days, Monday to Friday.
- Resources: the Creator, **Editor 1** (full availability), **Editor 2** (limited availability next week).
- **Brand A:** sponsored YouTube video, submission due Monday (the demo change moves it 2 days earlier), fixed deadline, payment pending.
- **Brand B:** product review scheduled Wednesday, script approval pending (delayed), flexible edit window.
- **Brand C:** Instagram Reel to publish Friday, flexible edit, one overdue invoice from a past collaboration.
- About 25 tasks across the three campaigns with realistic dependencies (Brief Review, Script Draft, Script Approval, Filming, Editing, Final Approval, Publish, Invoice, Payment).
- A few invoices, payments and expenses, with one campaign missing some cost data (to demonstrate the "Estimate" label).
- Dates relative to the current date so the demo always works.

---

## 11. Build Order

1. Foundation: setup, design tokens, component library, app shell, database migrations, RLS, seed.
2. Engine with unit tests (most important).
3. Workflow graph and Simulator.
4. Dashboard, Risk Radar, Audit trail with undo.
5. Campaigns and auto task templates.
6. Brief Analyzer.
7. Finances, invoice automation, brand reliability.
8. New-deal what-if, workload meter, daily briefing.
9. Copilot and Message Assistant.
10. Landing page, settings, polish, deployment.

Cut first if short on time: multi-creator, calendar and email integrations, rare PDF edge cases. Never cut: engine, simulator, risk radar, audit trail.

---

## 12. Quality Rules

- Strict TypeScript, no `any`. Zod validation on all inputs and AI output.
- Test RLS with two users to confirm no data leaks.
- Engine tests must pass before building features on top of it.
- Run lint, typecheck and tests at the end of each phase and report results.
- Every button works or is removed.
- Keep files small and organized. Comment only non-obvious logic.
- Known limits to state honestly: accuracy depends on user estimates; AI extraction can be wrong (hence the review screen); integrations are drafts until configured; profit is an estimate when data is incomplete.

---

## 13. Demo Script (about 3 minutes)

1. Dashboard: three campaigns, one amber risk.
2. Upload a Brand A brief; one ambiguous deadline is flagged and confirmed.
3. Simulator: "Brand A moves up 2 days." The graph highlights the affected chain and the editor conflict.
4. Engine proposes a feasible plan that shifts Brand C's flexible edit, with reasons.
5. Try an infeasible change; the app says it cannot be met and offers alternatives.
6. Approve. Audit log, risks and dashboard update together. Show Undo.
7. Show the drafted editor message ("Draft, not sent"), the new-deal what-if and the daily briefing.
