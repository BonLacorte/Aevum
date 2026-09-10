# Progress

## Repository baseline

- Baseline version: **v1**
- Baseline state: **COMPLETE — backend-stack historical correction recorded**
- Historical planning coverage: **Phase 1 through Phase 3B.8**
- Historical planning location: **`docs/phases/`**
- Implementation contract location: **`docs/implementation/`**
- Further historical roadmap expansion: **HALTED**
- Current authoritative branch/state: **`main` — clean after Implementation Phase 1 closure**
- Current BUILD: **NONE**

## Completed implementation

### Implementation Phase 1 — Executable Application Foundation

Lifecycle: `CLOSED`

Accepted result:

```text
Next.js + TypeScript
  ↓
NestJS + TypeScript
  ↓
PostgreSQL + pgvector
```

Phase 1 passed all **42 acceptance criteria** and its **Definition of Done**. The accepted implementation is merged into `main` and is the current executable foundation.

The earlier invalid Spring Boot attempt remains historical correction context only; it was halted before commit and was never accepted.

Canonical closed contract:

- `docs/implementation/PHASE-01.md`

## Current PSB activity

### Implementation Phase 2 — Identity & Ownership Foundation

Current lifecycle:

- PLAN: `PLAN_APPROVED`
- SPEC: `NOT_STARTED`
- Build eligibility: `NOT_READY_FOR_BUILD`
- BUILD: `NOT_STARTED`

Approved purpose:

> Establish the minimum deterministic identity, authentication, and ownership foundation required before Aevum begins storing real user-owned personal life data.

Approved ownership invariant:

> **Authenticated server-side application context determines the Aevum owner.**

Future domain APIs must not trust arbitrary client-selected `user_id` values for ownership or authorization. The stable internal Aevum user ID is the future ownership anchor and remains distinct from mutable external identity attributes such as display name or email.

Canonical active PLAN:

- `docs/implementation/PHASE-02.md`

### Conditions carried into SPEC

The future Phase 2 SPEC must:

1. precisely define the mapping/reconciliation boundary between the selected authentication identity and the stable internal Aevum user ID; and
2. follow authentication-data minimization, avoiding persistence of provider tokens, broad profile data, or other identity artifacts unless the selected mechanism concretely requires them.

The authentication provider/mechanism remains unresolved at this checkpoint.

## Milestones

| Milestone | Status |
|---|---|
| Historical planning through Phase 3B.8 | COMPLETE |
| Repository Baseline v1 | COMPLETE |
| Backend-stack historical correction | COMPLETE |
| Implementation Phase 1 | CLOSED |
| Phase 1 acceptance criteria | 42 / 42 PASSED |
| Phase 1 Definition of Done | PASSED |
| Phase 1 merged to `main` | COMPLETE |
| Implementation Phase 2 PLAN | APPROVED |
| Implementation Phase 2 SPEC | NOT STARTED |
| Implementation Phase 2 READY_FOR_BUILD | NOT READY |
| Implementation Phase 2 BUILD | NOT STARTED |

## Next milestone

Prepare the detailed SPEC for **Implementation Phase 2 — Identity & Ownership Foundation** only when explicitly instructed to begin SPEC.

The SPEC must resolve the BUILD-blocking authentication, identity-mapping, persistence, frontend/backend integration, security, and verification decisions while staying inside the approved PLAN.

Phase 2 remains `NOT_READY_FOR_BUILD` until that SPEC passes PSB review.

## Status rule

`ROADMAP.md` describes intended sequence. This file describes what actually exists.

Historical planning under `docs/phases/` is supporting context and is not considered implemented merely because it is documented. Application behavior exists only after the corresponding implementation contract is built, reviewed, verified, and closed.
