# Aevum

Aevum is a long-term personal organizational intelligence system designed to help people capture, organize, revisit, and understand meaningful life context. It combines structured personal information with AI-assisted retrieval and reasoning so that goals, decisions, activities, reflections, and other life context can become more useful over time.

## Repository status

- Repository baseline: **v1 — complete**
- Historical planning coverage: **Phase 1 through Phase 3B.8**
- Historical planning archive: **`docs/phases/`**
- Canonical implementation contracts: **`docs/implementation/`**
- Current implementation phase: **Implementation Phase 1 — Executable Application Foundation**
- Current PLAN status: **`PLAN_APPROVED`**
- Current build eligibility: **`NOT_READY_FOR_BUILD`**
- Application implementation: **not started**
- Development workflow: **PSB — Plan → Spec → Build**

Repository Baseline v1 has transitioned Aevum from historical planning into repository-governed PSB implementation cycles. The first real implementation PLAN is approved, but application code must not begin until its SPEC is approved and the active implementation contract reaches `READY_FOR_BUILD`.

## Technology direction

The approved V1 architecture direction is:

- Frontend: **Next.js + TypeScript**
- Backend: **Java + Spring Boot**
- Primary database: **PostgreSQL**
- Vector capability: **pgvector**

The initial backend/application-services direction is a **modular monolith** with clear logical boundaries rather than premature microservices.

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

The Git repository is the operational source of truth for Aevum. Historical planning material is retained as supporting archive evidence. When information conflicts, follow the precedence rules in [`docs/PSB-WORKFLOW.md`](docs/PSB-WORKFLOW.md) and [`AGENTS.md`](AGENTS.md).

## Current development state

Implementation Phase 1 has passed PLAN review and is recorded as `PLAN_APPROVED` / `NOT_READY_FOR_BUILD`.

The next PSB stage is SPEC, but SPEC work begins only after explicit instruction. No application source code should be implemented from the approved PLAN alone.
