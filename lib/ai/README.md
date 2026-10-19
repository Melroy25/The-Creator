# AI & LLM Integrations (`/lib/ai`)

## Overview
This directory contains server-side-only AI functionality for Creator Flow.

### Rules of Engagement
- **Server-Side Only**: Never imported or executed in client components.
- **Strict Role Isolation**:
  - LLMs **extract** structured briefs into validated Zod schemas.
  - LLMs **explain** deterministic engine output in plain, calm English.
  - LLMs **draft** sponsor correspondence (always flagged as `"Draft, not sent"`).
  - LLMs **NEVER** calculate dates, slack, or finances.
- **Provider Agnostic**: Configurable via `LLM_PROVIDER` (`openai`, `gemini`, `anthropic`) with structured output enforcement.

### Planned Modules (Phase 6 & 9)
- `client.ts` - Provider abstraction and configuration.
- `brief-parser.ts` - Prompt engineering for brief document intake and Zod schema mapping.
- `copilot.ts` - Tool-calling agent grounded in real Supabase & engine data.
- `message-drafter.ts` - Templates for sponsor negotiations, approval requests, and follow-ups.
