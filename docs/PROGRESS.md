# Progress

## Repository baseline

- Baseline version: **v1**
- Baseline state: **COMPLETE**
- Historical planning coverage: **Phase 1 through Phase 3B.8**
- Historical planning location: **`docs/phases/`**
- Implementation contract location: **`docs/implementation/`**
- Further historical roadmap expansion: **HALTED**
- Application implementation: **NOT STARTED**
- Current BUILD: **NONE**

## Current PSB activity

**Implementation Phase 1 — Executable Application Foundation** has completed PLAN and SPEC review and is now ready for implementation.

The canonical approved implementation contract is:

- `docs/implementation/PHASE-01.md`

Current phase state:

- PLAN: `PLAN_APPROVED`
- SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- Application implementation: `NOT STARTED`
- Current BUILD: `NONE`

`READY_FOR_BUILD` authorizes the next PSB transition, but the phase is not `BUILDING` until Codex actually begins implementation.

## Milestones

| Milestone | Status |
|---|---|
| Historical planning through Phase 3B.8 | COMPLETE |
| Repository documentation architecture | COMPLETE |
| Repository Baseline v1 | COMPLETE |
| Implementation-phase documentation convention | ADOPTED |
| Implementation Phase 1 PLAN | APPROVED |
| Implementation Phase 1 SPEC | APPROVED |
| Implementation Phase 1 READY_FOR_BUILD | READY |
| Application code | NOT STARTED |

## Current implementation phase

**Implementation Phase 1 — Executable Application Foundation**

Primary purpose:

> Prove that Aevum can exist as a correctly structured, locally runnable application using Next.js + TypeScript, Java + Spring Boot, PostgreSQL, and pgvector capability without implementing major product features.

Canonical implementation contract:

- `docs/implementation/PHASE-01.md`

## Next milestone

Begin the Codex BUILD for Implementation Phase 1 only when explicitly instructed to start implementation.

At that point, `docs/implementation/PHASE-01.md` is the authoritative BUILD contract. The BUILD must remain inside the approved PLAN/SPEC scope and preserve all non-goals, acceptance criteria, Definition of Done, versions, and contracts.

## Status rule

`ROADMAP.md` describes intended sequence. This file describes what actually exists.

Historical planning under `docs/phases/` is not considered implemented merely because it is documented. Application behavior exists only after the corresponding implementation contract is built, reviewed, verified, and reflected here.
