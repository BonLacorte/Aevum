# Aevum

Aevum is a long-term personal organizational intelligence system designed to help people capture, organize, revisit, and understand meaningful life context. It combines structured personal information with AI-assisted retrieval and reasoning so that goals, decisions, activities, reflections, and other life context can become more useful over time.

## Repository status

- Repository baseline: **v1 — complete, with backend-stack historical correction recorded**
- Historical planning coverage: **Phase 1 through Phase 3B.8**
- Historical planning archive: **`docs/phases/`**
- Canonical implementation contracts: **`docs/implementation/`**
- Current implementation phase: **Implementation Phase 1 — Executable Application Foundation**
- PLAN status: **`PLAN_APPROVED`**
- Previous SPEC status: **`SPEC_INVALIDATED`**
- Replacement SPEC status: **`SPEC_APPROVED`**
- Build eligibility: **`READY_FOR_BUILD`**
- BUILD status: **`NOT_STARTED`**
- Previous Spring Boot BUILD attempt: **halted before commit and never accepted**
- Accepted/committed implementation from that invalidated BUILD: **none**
- Development workflow: **PSB — Plan → Spec → Build**

A repository migration correction restored Aevum's historical backend stack from the incorrectly imported Java + Spring Boot entry to **NestJS + TypeScript**. The previous Spring Boot Implementation Phase 1 SPEC is invalid and no longer authorizes BUILD.

The revised Implementation Phase 1 PLAN and replacement NestJS/TypeScript SPEC are approved. The previous Spring Boot SPEC remains invalidated. The phase is `READY_FOR_BUILD`, but implementation has not started; Codex must receive an explicit BUILD instruction before the phase may enter `BUILDING`.

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

Implementation Phase 1 has been returned to PLAN because its previous Java/Spring Boot architecture and resulting SPEC were based on a repository migration defect.

Current lifecycle:

- PLAN: `PLAN_APPROVED`;
- previous SPEC: `SPEC_INVALIDATED`;
- replacement SPEC: `SPEC_APPROVED`;
- build eligibility: `READY_FOR_BUILD`;
- BUILD: `NOT_STARTED`;
- previous Spring Boot BUILD attempt: halted before commit and never accepted;
- accepted/committed implementation from that invalidated BUILD: none.

Only the approved replacement NestJS/TypeScript SPEC may govern the next BUILD. `READY_FOR_BUILD` does not mean implementation has started.
