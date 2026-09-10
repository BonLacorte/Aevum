# Aevum

Aevum is a long-term personal organizational intelligence system designed to help people capture, organize, revisit, and understand meaningful life context. It combines structured personal information with AI-assisted retrieval and reasoning so that goals, decisions, activities, reflections, and other life context can become more useful over time.

## Repository status

- Repository baseline: **v1 — complete, with backend-stack historical correction recorded**
- Historical planning coverage: **Phase 1 through Phase 3B.8**
- Historical planning archive: **`docs/phases/`**
- Canonical implementation contracts: **`docs/implementation/`**
- Implementation Phase 1: **`CLOSED`**
- Phase 1 verification: **42 / 42 acceptance criteria passed; Definition of Done passed**
- Current implementation phase: **Implementation Phase 2 — Identity & Ownership Foundation**
- Phase 2 PLAN: **`PLAN_APPROVED`**
- Phase 2 SPEC: **`NOT_STARTED`**
- Phase 2 build eligibility: **`NOT_READY_FOR_BUILD`**
- Phase 2 BUILD: **`NOT_STARTED`**
- Current BUILD: **none**
- Development workflow: **PSB — Plan → Spec → Build**

Implementation Phase 1 is closed and merged into `main`. The accepted executable foundation is **Next.js + TypeScript → NestJS + TypeScript → PostgreSQL + pgvector**.

Implementation Phase 2 is now the active approved PLAN. Its purpose is to establish the minimum identity/authentication/ownership prerequisite before Aevum begins persisting real user-owned personal life data. PLAN approval does not authorize BUILD.

## Technology direction

The approved V1 architecture direction is:

- Frontend: **Next.js + TypeScript**
- Backend: **NestJS + TypeScript**
- Primary database: **PostgreSQL**
- Vector capability: **pgvector**

The initial backend/application-services direction remains a **modular monolith** with clear logical boundaries rather than premature microservices.

Detailed architecture constraints are defined under [`docs/`](docs/).

## Documentation map

Start here:

- [`AGENTS.md`](AGENTS.md) — rules for Codex and other implementation agents
- [`docs/PROJECT.md`](docs/PROJECT.md) — stable project identity and principles
- [`docs/PRODUCT.md`](docs/PRODUCT.md) — product model and product philosophy
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system architecture baseline
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — historical planning hierarchy and implementation execution direction
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — active, provisional, unresolved, and superseded project decisions
- [`docs/PROGRESS.md`](docs/PROGRESS.md) — actual implementation/PSB status
- [`docs/PSB-WORKFLOW.md`](docs/PSB-WORKFLOW.md) — Plan → Spec → Build lifecycle
- [`docs/phases/`](docs/phases/) — historical planning archive
- [`docs/implementation/`](docs/implementation/) — canonical real PSB implementation contracts

## Historical planning and implementation

`docs/phases/` preserves the planning history that established Aevum's product model, architecture direction, and AI/core-system design through Phase 3B.8.

Those files are **not automatically executable BUILD units**.

Real application work is defined separately under `docs/implementation/`. A coding agent may implement application code only when the active implementation file is explicitly marked `READY_FOR_BUILD`.

## Source of truth

The Git repository is the operational source of truth for Aevum. Historical planning material is retained as supporting archive evidence and may be consulted to repair proven migration defects. When information conflicts, follow the precedence rules in [`docs/PSB-WORKFLOW.md`](docs/PSB-WORKFLOW.md) and [`AGENTS.md`](AGENTS.md).

## Current development state

Implementation Phase 1 is `CLOSED` and its accepted implementation is merged into `main`.

Implementation Phase 2 current lifecycle:

- PLAN: `PLAN_APPROVED`;
- SPEC: `NOT_STARTED`;
- build eligibility: `NOT_READY_FOR_BUILD`;
- BUILD: `NOT_STARTED`.

The approved ownership invariant is:

> **Authenticated server-side application context determines the Aevum owner.**

The exact authentication provider/mechanism remains a SPEC-stage decision. No application code is authorized by the Phase 2 PLAN approval checkpoint.
