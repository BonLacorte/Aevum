# Progress

## Repository baseline

- Baseline version: **v1**
- Baseline state: **COMPLETE — backend-stack historical correction recorded**
- Historical planning coverage: **Phase 1 through Phase 3B.8**
- Historical planning location: **`docs/phases/`**
- Implementation contract location: **`docs/implementation/`**
- Further historical roadmap expansion: **HALTED**
- Accepted/committed Phase 1 application implementation: **NONE**
- Current BUILD: **`NOT_STARTED` — replacement NestJS/TypeScript SPEC is approved and READY_FOR_BUILD; Codex has not yet received an explicit BUILD instruction**

## Current PSB activity

A historical architecture migration defect was identified before the current Implementation Phase 1 BUILD could be accepted or committed.

The repository had incorrectly imported **Java + Spring Boot** from the separate **OrbisOne** project as Aevum's backend. Historical Aevum/LifeOS architecture has been restored to:

```text
Next.js + TypeScript
  ↓
NestJS + TypeScript
  ↓
PostgreSQL + pgvector
```

The initial modular-monolith direction remains active.

The previous Spring Boot Implementation Phase 1 SPEC remains invalid and does not authorize implementation. Its associated BUILD was halted before commit and was never accepted.

The replacement NestJS/TypeScript SPEC has passed PSB review.

Current phase state:

- PLAN: `PLAN_APPROVED`
- previous SPEC: `SPEC_INVALIDATED`
- replacement SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- BUILD: `NOT_STARTED`
- Previous Spring Boot BUILD attempt: **HALTED BEFORE COMMIT / NEVER ACCEPTED**
- Accepted/committed implementation from that invalidated BUILD: **NONE**

Canonical current implementation contract:

- `docs/implementation/PHASE-01.md`

`READY_FOR_BUILD` authorizes implementation only when Codex receives an explicit BUILD instruction. The phase is not yet `BUILDING`.

## Milestones

| Milestone | Status |
|---|---|
| Historical planning through Phase 3B.8 | COMPLETE |
| Repository documentation architecture | COMPLETE |
| Repository Baseline v1 | COMPLETE |
| Backend-stack historical correction | COMPLETE |
| Implementation-phase documentation convention | ADOPTED |
| Implementation Phase 1 original PLAN | INVALIDATED IN PART BY BACKEND MIGRATION DEFECT |
| Implementation Phase 1 revised PLAN | APPROVED |
| Implementation Phase 1 previous SPEC | INVALIDATED |
| Implementation Phase 1 replacement SPEC | APPROVED |
| Implementation Phase 1 READY_FOR_BUILD | READY |
| Current replacement BUILD | NOT STARTED |
| Previous Spring Boot BUILD attempt | HALTED BEFORE COMMIT / NEVER ACCEPTED |
| Accepted/committed implementation from invalidated BUILD | NONE |

## Current implementation phase

**Implementation Phase 1 — Executable Application Foundation**

Preserved purpose:

> Prove that Aevum's executable application foundation works locally without implementing major Aevum product features.

Corrected architecture boundary:

```text
Browser
  ↓
Next.js + TypeScript frontend
  ↓
HTTP application contract
  ↓
NestJS + TypeScript backend
  ↓
PostgreSQL + pgvector
```

Canonical implementation contract:

- `docs/implementation/PHASE-01.md`

## Next milestone

Implementation Phase 1 is `READY_FOR_BUILD`.

The next lifecycle transition occurs only when Codex is explicitly instructed to begin the approved BUILD. Until then, current BUILD remains `NOT_STARTED` and the phase must not be marked `BUILDING`.

## Status rule

`ROADMAP.md` describes intended sequence. This file describes what actually exists.

Historical planning under `docs/phases/` is not considered implemented merely because it is documented. Application behavior exists only after the corresponding implementation contract is built, reviewed, verified, and reflected here.

The halted pre-commit BUILD does not count as accepted application implementation.
