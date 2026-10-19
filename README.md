# CREATOR FLOW
### AI-Powered Workflow Intelligence System for the Creator Economy
**Tagline:** Create More. Manage Less. Stay Ahead.  
**Event:** CODE MEET 2026 Hackathon (Problem Statement 4: Creator Economy Tech)  
**Live Repository:** [https://github.com/Melroy25/The-Creator.git](https://github.com/Melroy25/The-Creator.git)

---

## 1. What is Creator Flow?

Today's creators operate like small businesses, juggling multi-platform campaigns, client revisions, video edits, and pending invoices across fragmented tools. 

**Creator Flow** is an intelligent operating system built around a single connected data model and a **pure TypeScript deterministic scheduling engine**. When a deadline shifts, client review stalls, or an editor is unavailable, the engine calculates the downstream consequences, detects resource overlaps, and presents feasible alternative schedules for the creator's approval.

### Non-Negotiable Core Principles
1. **Deterministic Scheduling, AI as Explainer**: Dates, slack, critical paths, and money are strictly calculated by code. The LLM only extracts from briefs, explains engine changes, and drafts messages.
2. **Never Invent Certainty**: Infeasible schedules are reported plainly. Data is tagged with explicit provenance chips: `[Confirmed]`, `[Assumption]`, `[Calculated]`, `[AI suggestion]`.
3. **Honest Money**: Unpaid invoices are never counted as received. Projected revenue is separated from cash received. Incomplete costs are labeled "Estimate".
4. **Propose, Review, Approve, Audit**: Automated changes are proposals. Nothing is applied or sent without creator approval.

---

## 2. Tech Stack

- **Frontend & App Framework**: Next.js 14 (App Router), React 18, TypeScript (Strict).
- **Styling & Design System**: Tailwind CSS, Dark Mode Neomorphism ("Silk Dark" tactile glass), Lucide Icons.
- **Workflow Visualization**: React Flow (`@xyflow/react`), Recharts.
- **Database & Security**: Supabase PostgreSQL with strict Row Level Security (RLS) on all 15 tables.
- **Validation**: Zod.
- **Testing**: Vitest.
- **Deployment**: Vercel.

---

## 3. Local Setup & Quick Start

### Prerequisites
- Node.js `v20+` or `v24+`
- npm `v10+`

### Installation
```bash
# 1. Clone the repository
git clone https://github.com/Melroy25/The-Creator.git
cd The-Creator

# 2. Install dependencies
npm install

# 3. Configure environment variables
cp .env.example .env.local
# Edit .env.local with your Supabase and OpenAI keys
```

### Running the App
```bash
# Run local development server
npm run dev

# Open in browser:
http://localhost:3000
```

---

## 4. Supabase Setup & Migrations

### 1. Create Supabase Project
1. Go to [supabase.com](https://supabase.com) and create a new project.
2. In your Project Settings > API, copy:
   - Project URL (`NEXT_PUBLIC_SUPABASE_URL`)
   - Anon / Public Key (`NEXT_PUBLIC_SUPABASE_ANON_KEY`)
   - Service Role Key (`SUPABASE_SERVICE_ROLE_KEY`)

### 2. Apply SQL Migrations
In your Supabase Dashboard SQL Editor, run:
1. `supabase/migrations/001_initial_schema.sql` (Creates all 15 tables with foreign keys, constraints, triggers, and RLS policies).
2. `supabase/migrations/002_rls_test.sql` (Verifies user data isolation).

### 3. Seed Demo Data
To seed the Marcus Vance scenario (3 brand deals, relative dates, overdue invoices):
```bash
npm run db:seed
```

---

## 5. Available Scripts

| Script | Command | Purpose |
| :--- | :--- | :--- |
| `dev` | `npm run dev` | Starts local Next.js dev server on port 3000 |
| `build` | `npm run build` | Builds optimized production bundle |
| `lint` | `npm run lint` | Runs ESLint checks |
| `typecheck` | `npm run typecheck` | Strict TypeScript compilation check |
| `test` | `npm run test` | Runs Vitest unit tests |
| `db:seed` | `npm run db:seed` | Idempotent database seed |

---

## 6. Visual Component Test Bench

You can visually verify every shared UI component against the Stitch export design by navigating to:
```text
http://localhost:3000/dev/components
```
This hidden page renders all variants of `GlassCard`, `StatTile`, `StatusChip`, `SeverityBadge`, `ProvenanceChip` (with interactive tooltips), `SideDrawer`, `ConfirmModal`, `EmptyState`, and `LoadingSkeleton`.

---

## 7. Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "Phase 1: Foundation Complete"
   git push origin main
   ```
2. Import project in [Vercel](https://vercel.com).
3. Set Environment Variables:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `LLM_PROVIDER=openai`
   - `LLM_API_KEY`
   - `LLM_MODEL=gpt-4o-mini`
4. Deploy!
