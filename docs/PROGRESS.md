# Progress

## Repository baseline

- Baseline version: **v1**
- Baseline state: **COMPLETE — backend-stack historical correction recorded**
- Historical planning coverage: **Phase 1 through Phase 3B.8**
- Historical planning location: **`docs/phases/`**
- Implementation contract location: **`docs/implementation/`**
- Further historical roadmap expansion: **HALTED**
- Phase 1 implementation: **VERIFIED / CLOSED BY PSB GUIDE — deliberately uncommitted in the current working tree**
- Current BUILD: **`COMPLETED` — replacement NestJS/TypeScript BUILD was verified and closed by the Aevum PSB Guide on 2026-09-10**

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

The replacement NestJS/TypeScript SPEC passed PSB review. Its explicit BUILD completed, and the Aevum PSB Guide independently verified and closed the phase on 2026-09-10.

Current phase state:

- PLAN: `PLAN_APPROVED`
- previous SPEC: `SPEC_INVALIDATED`
- replacement SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- BUILD: `COMPLETED`
- Verification: `VERIFIED`
- Phase lifecycle: `CLOSED`
- Previous Spring Boot BUILD attempt: **HALTED BEFORE COMMIT / NEVER ACCEPTED**
- Accepted/committed implementation from that invalidated BUILD: **NONE**

Canonical current implementation contract:

- `docs/implementation/PHASE-01.md`

The final PSB review result is `VERIFIED`; the phase lifecycle is `CLOSED`.

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
| Current replacement BUILD | COMPLETED / VERIFIED / CLOSED |
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

### BUILD evidence — 2026-09-10

The replacement Phase 1 implementation now exists in the working tree on `build/phase-01-nestjs-foundation`:

- one root pnpm workspace contains only `@aevum/frontend` and `@aevum/backend`, with one root lockfile;
- the frontend is Next.js App Router and renders the specified foundation-status states through its single API boundary;
- the backend is a CommonJS NestJS modular monolith limited to App, Config, Database, and System responsibilities;
- direct `pg`, backend-owned `node-pg-migrate` migrations, PostgreSQL 18, and pgvector 0.8.6 are implemented without domain schema;
- clean Compose initialization, two migration runs, pgvector verification, and the no-domain-table check passed using the isolated `aevum` Compose project;
- frontend lint/typecheck/build, backend lint/typecheck/build, backend unit tests (9), and real Testcontainers integration tests (3) passed using pnpm 12.3.4;
- an automated browser smoke test passed for READY, database-down/recovery, and backend-down/recovery behavior.

Final independent local-host verification confirmed Node `v24.21.0`, npm `11.19.0`, pnpm `12.3.4`, TypeScript `5.9.3` in both workspaces, `pnpm install --frozen-lockfile`, `pnpm verify`, local environment ignore/trackability behavior, and `git diff --check` with exit code `0`. Together with the BUILD evidence above, all **42/42 acceptance criteria** and the Definition of Done passed.

The first destructive Compose reset collided with an unrelated local `fintech-ledger` Compose project because both resolved through generic project identity `infra`. The Compose file was corrected with top-level `name: aevum`; the isolated Aevum clean-database verification then passed. No recovery of the unrelated project’s removed Docker resources or data is claimed.

## Next milestone

Implementation Phase 1 is `CLOSED`. The next implementation work requires a separately approved and authorized phase; this closeout does not authorize Implementation Phase 2.

## Status rule

`ROADMAP.md` describes intended sequence. This file describes what actually exists.

Historical planning under `docs/phases/` is not considered implemented merely because it is documented. Application behavior exists only after the corresponding implementation contract is built, reviewed, verified, and reflected here.

The halted pre-commit BUILD does not count as accepted application implementation.
