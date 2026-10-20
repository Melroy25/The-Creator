# Creator Flow ⚡

**Autonomous Creator Business Operating System**  
Built for the **CODE MEET 2026 Hackathon** (Problem Statement 4: *Creator Economy Tech*).

---

## 🌟 The Big Idea
Creators operate like small businesses, with brand deals, scripts, approvals, edits, and payments scattered across disconnected tools. **Creator Flow** provides one shared data model where schedules fix themselves when real-world disruptions strike.

When plans change (a brand deadline moves forward, an approval is delayed, or a video editor becomes unavailable), a **pure TypeScript deterministic engine** maps collateral impact across the dependency chain, recalculates feasible timelines, detects resource collisions, and proposes actionable alternatives with plain-English rationales.

- **Deterministic Engine**: 100% pure TypeScript in `/lib/engine`. Zero UI, zero database, zero AI dependencies.
- **Constrained AI**: AI only ingests documents (reading briefs), explains engine diffs, and drafts messages. AI **never** calculates dates, risk scores, or finances.
- **Honest Money**: Unreceived funds are strictly categorized as Waiting or Expected—never counted as received cash.

---

## 🎨 Theme & Multi-Accent System (Wharf Design)

The visual design is grounded in the warm, tactile **Wharf aesthetic**:
- **Canvas Foundation**: Warm cream foundation (`#FAF6EA`) with soft directional ambient light washes (`#FDF2C7` butter-yellow drifting top-right, `#FBE6DC` peach anchoring bottom-left).
- **Surfaces**: `#FCFBF7` ivory vellum cardstock encased in delicate 1px warm sand borders (`#EDE6D3`).
- **Pill Primitives**: Distinct near-black pill buttons (`#1F1F23`), search capsule, and badge nodes.
- **Typography**: **Hanken Grotesk** across display and body tiers; **JetBrains Mono** for tabular numbers, dates, and telemetry.

### 4 Multi-Accent Studio Hues
Switchable per-workspace inside **Settings > Workspace > Appearance**:
1. **Warm Amber (`#EDBE4B`)**: Grounded, editorial (Default).
2. **Studio Mint (`#94E0D0`)**: Fresh, balanced, energetic.
3. **Creative Pink (`#F7B3CB`)**: Creative, playful, vibrant.
4. **Analytical Blue (`#A0C9F2`)**: Calm, focused.

### Technical Implementation
- Managed via CSS custom properties in [`app/globals.css`](file:///e:/Projects/THE%20CREATOR/app/globals.css) bound to `html[data-theme="light|dark"]` and `html[data-accent="amber|mint|pink|blue"]`.
- **Zero-Flash**: Synchronous `<head>` script in [`app/layout.tsx`](file:///e:/Projects/THE%20CREATOR/app/layout.tsx) immediately sets attributes from `localStorage` before DOM paint.
- **Live System Theme**: Follows OS `prefers-color-scheme` dynamically.
- **Contrast Guarantee**: All 8 theme x accent combinations meet WCAG AA contrast standards.

---

## 🛠️ Getting Started

### 1. Prerequisites
- Node.js 18+
- npm or pnpm

### 2. Environment Setup
Copy the template and configure your keys:
```bash
cp .env.example .env.local
```

| Variable | Description |
| :--- | :--- |
| `NEXT_PUBLIC_SUPABASE_URL` | Live Supabase project URL (`https://xyz.supabase.co`) |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public client anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side secret key (kept private, never exposed to clients) |
| `LLM_PROVIDER` | `openai` (default) |
| `LLM_MODEL` | `gpt-4o-mini` (default) |
| `LLM_API_KEY` | OpenAI API Key |

### 3. Run Development Server
```bash
npm run dev
```
Open **[http://localhost:3000](http://localhost:3000)** in your browser.

- **Landing Page**: [http://localhost:3000](http://localhost:3000)
- **One-Click Demo Entry**: Click **"Continue with demo account"** on the [Login page](http://localhost:3000/login) to bypass auth and load Marcus Vance’s seeded workspace immediately.
- **Component Test Bench**: Inspect every component with live theme and accent switchers at **[/dev/components](http://localhost:3000/dev/components)**.

---

## 🧪 Testing & Verification

### Run Unit Tests
Verify the deterministic scheduler, calendar mathematics, graph traversal, cycle detection, and risk evaluation:
```bash
npm test
```
*(All 35 engine test suites pass with 0 errors).*

### Run TypeScript & Build Verification
```bash
npm run typecheck
npm run build
```

---

## 🔄 Resetting Demo Scenario Data
To restore Marcus Vance's workspace to the baseline day-zero state:
1. Navigate to **[Settings > Workspace](http://localhost:3000/settings)**.
2. Scroll to the **Reset Demo Data** card.
3. Click **"Reset demo data"** and confirm.
*(This resets all 3 brand contracts—Nova Audio, Pixel & Co, Lumen Skincare—and editor availability schedules).*

---

## 📁 Project Architecture
```text
/app
  ├── (workspace)
  │     ├── dashboard/page.tsx       (Screen 1: Command Center)
  │     ├── campaigns/               (Screen 2: Campaign List & Auto-Templates)
  │     ├── workflow/page.tsx        (Screen 4: React Flow Dependency Graph)
  │     ├── simulator/page.tsx       (Screen 5: What-If 3-Step Simulator)
  │     ├── risks/page.tsx           (Screen 6: Rule-Based Risk Radar)
  │     ├── brief-analyzer/page.tsx  (Screen 3: PDF/TXT Parser & Review Screen)
  │     ├── invoices/page.tsx        (Records: Invoices & Receivables)
  │     ├── brands/page.tsx          (Records: Brand Partners)
  │     ├── team/page.tsx            (Records: Crew & Availability)
  │     └── settings/page.tsx        (Account: Settings & Appearance Card)
  ├── login/page.tsx                 (One-click demo login & fast pass)
  ├── page.tsx                       (Product Landing Page)
  └── dev/components/page.tsx        (Dev Test Bench with live theme/accent switcher)
/components
  ├── shared                         (Wharf AppShell, Sidebar, Topbar, StatTile, StepTracker...)
/lib
  ├── engine/                        (Pure TypeScript deterministic engine - untouched)
  ├── data/                          (Server data functions and seeded mock store)
  ├── ai/                            (Provider-agnostic LLM wrapper)
  └── supabase/                      (SSR client, admin client, middleware)
/supabase
  ├── migrations/                    (15 tables with RLS & owner_id checks)
  └── seed/                          (Idempotent Marcus Vance scenario demo data)
```
