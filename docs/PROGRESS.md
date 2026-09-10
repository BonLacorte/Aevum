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
- SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- BUILD: `NOT_STARTED`

Approved purpose:

> Establish the minimum deterministic identity, authentication, and ownership foundation required before Aevum begins storing real user-owned personal life data.

Approved ownership invariant:

> **Authenticated server-side application context determines the Aevum owner.**

Future domain APIs must not trust arbitrary client-selected `user_id` values for ownership or authorization. The stable internal Aevum user ID is the future ownership anchor and remains distinct from mutable external identity attributes such as display name or email.

Canonical active implementation contract:

- `docs/implementation/PHASE-02.md`

### Approved SPEC architecture

The Phase 2 SPEC is approved with:

- one configurable standards-compliant OIDC issuer;
- NestJS as confidential relying party and authoritative backend authentication/authorization boundary;
- Authorization Code + PKCE S256 + state + nonce;
- exact `(issuer, subject)` external identity reconciliation;
- stable server-generated internal Aevum UUID ownership anchor;
- Aevum-owned opaque PostgreSQL-backed sessions;
- authenticated server-side context as the source of ownership;
- explicit authentication-data minimization.

These are approved architecture/implementation requirements. Phase 2 application implementation has **not started**.

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
| Implementation Phase 2 SPEC | APPROVED |
| Phase 2 acceptance criteria | 56 APPROVED REQUIREMENTS / 0 CLAIMED PASSED |
| Phase 2 Definition of Done | APPROVED / NOT YET SATISFIED |
| Implementation Phase 2 READY_FOR_BUILD | READY |
| Implementation Phase 2 BUILD | NOT STARTED |

## Next milestone

Implementation Phase 2 is now `READY_FOR_BUILD`.

The next lifecycle transition occurs only after Codex receives a later explicit BUILD instruction based on the approved `docs/implementation/PHASE-02.md` contract.

Until then:

- BUILD remains `NOT_STARTED`;
- none of the 56 acceptance criteria are claimed as passed;
- the Definition of Done is not satisfied;
- the phase must not be marked `BUILDING`, `VERIFIED`, or `CLOSED`.

## Status rule

`ROADMAP.md` describes intended sequence. This file describes what actually exists.

Historical planning under `docs/phases/` is supporting context and is not considered implemented merely because it is documented. Application behavior exists only after the corresponding implementation contract is built, reviewed, verified, and closed.
