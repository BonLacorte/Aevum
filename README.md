# Aevum

Aevum is a long-term personal organizational intelligence system designed to help people capture, organize, revisit, and understand meaningful life context. It combines structured personal information with AI-assisted retrieval and reasoning so that goals, decisions, activities, reflections, and other life context can become more useful over time.

## Repository status

- Repository baseline: **v1**
- Historical planning coverage: **Phase 1 through Phase 3B.8**
- Application implementation: **not started**
- Current development stage: **repository initialization / specification migration**
- Development workflow: **PSB — Plan → Spec → Build**

The current priority is to establish durable project documentation before application implementation begins.

## Technology direction

The approved V1 architecture direction is:

- Frontend: **Next.js + TypeScript**
- Backend: **Java + Spring Boot**
- Primary database: **PostgreSQL**
- Vector capability: **pgvector**

Detailed architecture constraints are defined under [`docs/`](docs/).

## Documentation map

Start here:

- [`AGENTS.md`](AGENTS.md) — rules for Codex and other implementation agents
- [`docs/PROJECT.md`](docs/PROJECT.md) — stable project identity and principles
- [`docs/PRODUCT.md`](docs/PRODUCT.md) — product model and product philosophy
- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — system architecture baseline
- [`docs/ROADMAP.md`](docs/ROADMAP.md) — historical and planned phase hierarchy
- [`docs/DECISIONS.md`](docs/DECISIONS.md) — active and superseded project decisions
- [`docs/PROGRESS.md`](docs/PROGRESS.md) — actual implementation status
- [`docs/PSB-WORKFLOW.md`](docs/PSB-WORKFLOW.md) — Plan → Spec → Build lifecycle
- [`docs/phases/`](docs/phases/) — phase-level planning and specifications

## Source of truth

The Git repository is the operational source of truth for Aevum. Historical planning material is retained only as supporting archive evidence. When information conflicts, follow the precedence rules in [`docs/PSB-WORKFLOW.md`](docs/PSB-WORKFLOW.md) and [`AGENTS.md`](AGENTS.md).

## Development state

No application source code belongs in this baseline. The first implementation cycle will begin only after a phase specification reaches `READY_FOR_BUILD`.
