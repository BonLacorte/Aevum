# Repository Baseline v1 Migration Record

## Purpose

This document records the transition from historical Aevum planning into repository-based project governance.

It is archival context, not the primary source for day-to-day implementation decisions.

## Baseline freeze

- Historical roadmap coverage: **Phase 1 through Phase 3B.8**
- Long-range roadmap expansion after Phase 3B.8: **intentionally halted for Baseline v1**
- Application implementation at baseline: **not started**
- Operational workflow after baseline: **PSB — Plan → Spec → Build**

## Naming migration

The historical working name **LifeOS** is superseded by **Aevum**. New repository documentation uses Aevum.

## Product-model migration

Earlier project-oriented planning was refined so that Aevum remains a general-purpose personal system rather than a developer-centric project manager. Projects and activities may exist, but they do not define the universal organizing model.

## Architecture migration

The durable V1 architecture direction captured in the repository includes:

- Next.js + TypeScript frontend;
- Java + Spring Boot backend;
- PostgreSQL primary persistence;
- pgvector vector capability.

## Phase-document migration

Baseline v1 uses:

- `PHASE-01.md`
- `PHASE-01-2.md`
- `PHASE-02.md`
- `PHASE-03A.md` containing 3A.1–3A.11
- `PHASE-03B.md` containing 3B.1–3B.8

This consolidation changes file organization only; sub-phase identities remain distinct.

## Phase 3 historical recovery

A Phase 3 historical migration recovery pass was completed for Repository Baseline v1.

`PHASE-03A.md` now preserves the historical planning for **3A.1 through 3A.11**, including each sub-phase's theme, objective, major concepts, Aevum-specific principles/decisions, dependencies, expected outcome, deferred/unresolved implementation choices, and historical completion meaning.

`PHASE-03B.md` now preserves the historical planning for **3B.1 through 3B.8**. The earlier Core System Design phases contain the recovered architectural decisions in detail; the later 3B.5–3B.8 entries preserve the completed historical decision summaries and phase boundaries without inventing concrete BUILD specifications that were not fixed at planning time.

No Phase 3 sub-phase is treated as a wholesale `MIGRATION_GAP` merely because it lacks implementation-level API/schema/test details.

The remaining distinction is intentional:

- **historical planning** is migrated and repository-readable;
- **implementation specification** remains `NOT_READY_FOR_BUILD` until the relevant work later passes through PSB SPEC;
- specific provider choices, endpoint shapes, numeric thresholds, test fixtures, deployment details, and other implementation facts remain unresolved where the historical plan deliberately left them open.

If a future recovery uncovers a genuinely omitted historical decision, that specific item may be added without reopening or redesigning the entire phase.

## Post-baseline authority

After Baseline v1, the repository documentation is the operational source of truth. Historical planning material is consulted only when repository documentation identifies a genuine migration need or when tracing the rationale behind a decision.
