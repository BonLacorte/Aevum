# Aevum Implementation Phases

This directory contains the canonical PSB implementation contracts for Aevum.

## Purpose

`docs/implementation/` is the execution-facing phase area used for real application delivery through the **Plan → Spec → Build (PSB)** workflow.

Implementation phases are derived from the approved repository product, architecture, decisions, requirements, and historical planning, but they are independently scoped so that each BUILD is small enough to implement, test, review, and commit as one controlled unit.

## Historical planning versus implementation contracts

The two phase areas have different roles:

- `docs/phases/` — historical planning archive preserved from the pre-Baseline-v1 planning process.
- `docs/implementation/` — active PSB implementation contracts that govern real BUILD work.

Historical phase numbers do not automatically map one-to-one to implementation phase numbers. A historical phase may constrain several future implementation phases, and one implementation phase may inherit decisions from several historical phases.

Historical planning is supporting context and must not be treated as executable requirements unless an active implementation contract explicitly inherits a decision or constraint from it.

## Implementation phase lifecycle

Each implementation contract follows the repository PSB lifecycle:

```text
PLAN
  ↓
PLAN_APPROVED
  ↓
SPEC
  ↓
READY_FOR_BUILD
  ↓
BUILDING
  ↓
REVIEW
  ├─→ FIXES_REQUIRED ─→ BUILDING ─→ REVIEW
  ↓
VERIFIED
  ↓
CLOSED
```

`BLOCKED` may be used when an unresolved dependency or specification conflict prevents progress.

`PLAN_APPROVED` means the phase purpose, scope, non-goals, dependencies, inherited constraints, and deferred work have passed PSB review. It does **not** authorize application implementation.

A phase becomes executable only when its implementation contract is explicitly marked `READY_FOR_BUILD` after SPEC review.

## Coding-agent rule

Before changing application code, Codex or another coding agent must read the active file in this directory and confirm that it is marked `READY_FOR_BUILD`.

If no implementation phase is `READY_FOR_BUILD`, application code must not be implemented.

See:

- [`../../AGENTS.md`](../../AGENTS.md)
- [`../PSB-WORKFLOW.md`](../PSB-WORKFLOW.md)
- [`../PROGRESS.md`](../PROGRESS.md)
- [`../DECISIONS.md`](../DECISIONS.md)

## Current implementation phase

- [`PHASE-01.md`](PHASE-01.md) — **Implementation Phase 1 — Executable Application Foundation**
  - PLAN: `PLAN_APPROVED`
  - SPEC: `SPEC_APPROVED`
  - Build eligibility: `READY_FOR_BUILD`
  - BUILD: `NOT_STARTED`
