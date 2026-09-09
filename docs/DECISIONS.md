# Decision Register

This register records durable Aevum decisions. Significant architectural decisions may link to an ADR.

## Status definitions

- `FINALIZED` — active approved decision; do not casually reopen during BUILD.
- `PROVISIONAL` — current direction but still legitimately open to later specification.
- `DEFERRED` — intentionally postponed; not part of the current implementation scope.
- `UNRESOLVED` — requires a future decision before affected work can become BUILD-ready.
- `SUPERSEDED` — retained for history but replaced by a later decision.

## Active decisions

| ID | Decision | Status | Notes |
|---|---|---|---|
| D-001 | Use **Aevum** as the project name; **LifeOS** is the former name. | FINALIZED | New repository material uses Aevum. |
| D-002 | Design Aevum as a general-purpose personal organizational intelligence system. | FINALIZED | Not developer-only. |
| D-003 | Do not make `Projects` the dominant universal life model. | FINALIZED | Projects/Activities remain optional/subordinate to broader concepts such as Goals. |
| D-004 | Treat AI as a foundational product/architecture capability, not a decorative chatbot layer. | FINALIZED | AI work remains explicitly scoped. |
| D-005 | Use **Next.js + TypeScript** for the V1 frontend direction. | FINALIZED | Baseline architecture. |
| D-006 | Use **Java + Spring Boot** for the V1 backend direction. | FINALIZED | Baseline architecture. |
| D-007 | Use **PostgreSQL** as the V1 primary database. | FINALIZED | Primary system of record. |
| D-008 | Use **pgvector** for V1 vector capability. | FINALIZED | Avoid a separate vector database by default. |
| D-009 | Use the **PSB Workflow: Plan → Spec → Build** with explicit review and closure gates. | FINALIZED | See `PSB-WORKFLOW.md`. |
| D-010 | Treat repository documentation as the operational source of truth after Baseline v1. | FINALIZED | Historical planning becomes archival. |
| D-011 | Keep BUILD scopes small enough to implement, test, review, and commit independently. | FINALIZED | Historical planning phases may need implementation slicing. |
| D-012 | Freeze long-range roadmap expansion at **Phase 3B.8** during repository-baseline transition. | FINALIZED | Resume only through a later planning decision. |
| D-013 | Consolidate Phase 3A sub-phases into `PHASE-03A.md` and Phase 3B sub-phases into `PHASE-03B.md`. | FINALIZED | Conceptual sub-phase boundaries remain intact. |

## Provisional / unresolved architecture areas

| ID | Area | Status | Notes |
|---|---|---|---|
| D-101 | Exact deployment topology | PROVISIONAL | Must be specified when deployment becomes relevant. |
| D-102 | Local-versus-cloud boundary | UNRESOLVED | Do not assume local-only or cloud-only behavior. |
| D-103 | Authentication implementation | UNRESOLVED | Required before protected user data is implemented. |
| D-104 | AI model/provider selection | PROVISIONAL | Select when an AI BUILD phase requires it. |
| D-105 | Embedding model/provider selection | PROVISIONAL | Must define dimensionality and migration implications before vector persistence is implemented. |
| D-106 | Synchronization behavior | UNRESOLVED | Specify only when synchronization enters scope. |

## Superseded decisions

### S-001 — Project name

- Superseded: **LifeOS**
- Current: **Aevum**

### S-002 — Developer-centric Projects model

Earlier planning leaned toward `Projects` as a central organizing concept. Later product refinement superseded that direction in favor of a general-purpose life model where projects and activities are optional/subordinate concepts rather than the universal container.

## Migration note

An unavailable exact historical detail is recorded as a migration gap in the relevant phase document; it is not automatically classified as an unresolved product decision.
