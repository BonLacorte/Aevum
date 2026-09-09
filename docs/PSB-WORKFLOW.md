# PSB Workflow

Aevum uses **Plan → Spec → Build (PSB)** to keep planning, durable specification, implementation, and verification distinct.

## Phase-document model

Aevum separates historical planning from executable implementation contracts:

- `docs/phases/` — historical planning archive preserved from the pre-Baseline-v1 planning process.
- `docs/implementation/` — canonical implementation contracts used for real PSB execution.

Historical planning phases are not automatically BUILD units. Real application work must be represented by a scoped implementation contract under `docs/implementation/`.

## Lifecycle

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

`BLOCKED` may be used when progress cannot continue because of an external dependency or unresolved specification conflict.

`PLAN_APPROVED` records successful PSB review of the phase purpose, scope, boundaries, dependencies, inherited constraints, and deferred work. It does not authorize BUILD.

## 1. PLAN

PLAN defines:

- why the implementation phase exists;
- goals;
- scope;
- non-goals;
- dependencies;
- expected behavior at a product/developer level;
- inherited decisions and architecture constraints;
- proposed foundation/structure where appropriate;
- deferred work;
- questions that must be resolved during SPEC.

Primary update: the applicable `docs/implementation/PHASE-*.md` file.

A PLAN that passes PSB review is marked `PLAN_APPROVED` while remaining `NOT_READY_FOR_BUILD`.

Update `ROADMAP.md` only when the planned sequence or durable phase scope changes. Historical files under `docs/phases/` normally remain unchanged.

## 2. SPEC

SPEC converts the approved PLAN into enough detail to implement and verify the phase, including as applicable:

- functional requirements;
- technical requirements;
- concrete project/package structure;
- data models and migrations;
- APIs, interfaces, events, or contracts;
- configuration/environment requirements;
- validation rules;
- security and privacy requirements;
- error handling;
- edge cases;
- acceptance criteria;
- Definition of Done;
- verification requirements.

SPEC must not silently broaden the approved PLAN. If specification work reveals that the PLAN boundary must materially change, return the affected scope to PLAN review.

If SPEC finalizes a durable cross-project decision, update `DECISIONS.md`, the relevant architecture document, and an ADR when warranted.

## 3. READY_FOR_BUILD

A phase can enter `READY_FOR_BUILD` only when:

- its PLAN is approved;
- scope and non-goals are explicit;
- dependencies are satisfied or intentionally stubbed by specification;
- functional and technical requirements are implementable;
- acceptance criteria are testable;
- Definition of Done exists;
- security/privacy implications are addressed;
- known contradictions are resolved;
- no BUILD-blocking unresolved question remains;
- deferred work is explicit;
- the scope is small enough for one reviewable Codex cycle.

Update the active `docs/implementation/PHASE-*.md` file and `PROGRESS.md`.

Only an implementation contract explicitly marked `READY_FOR_BUILD` authorizes application implementation.

## 4. BUILDING

Codex or another implementation agent executes the approved implementation contract.

Before changing application code, the coding agent must read the active file under `docs/implementation/` and confirm its `READY_FOR_BUILD` state.

BUILD must use repository documentation as its context source. It may not invent major behavior, broaden scope, silently change architecture, or treat historical planning documents as executable specifications.

The coding agent should implement requirements, update tests, run applicable checks, and report deviations or blockers.

## 5. REVIEW

Review checks:

- every acceptance criterion;
- Definition of Done;
- automated and manual verification where applicable;
- regressions;
- architecture compliance;
- security/privacy compliance;
- scope creep;
- required documentation updates.

## 6. FIXES_REQUIRED

If review fails, set the phase to `FIXES_REQUIRED`. Corrections occur against the same approved specification unless review reveals a genuine specification defect.

A specification defect must be corrected in PLAN/SPEC before implementation proceeds on the affected behavior.

## 7. VERIFIED

Use `VERIFIED` only when implementation has passed review and all blocking acceptance/Definition-of-Done items are satisfied.

## 8. CLOSED

Closure records the durable result:

- phase status becomes `CLOSED`;
- the completion record is updated;
- `PROGRESS.md` is updated;
- architecture and decisions are updated only for durable facts established by the implementation;
- the reviewed repository state is committed to Git.

A coding agent does not unilaterally determine closure.

## Source-of-truth precedence

When information conflicts:

1. active entries in `DECISIONS.md` and active ADRs;
2. the active implementation contract in `docs/implementation/` for behavior inside its approved scope;
3. `PROJECT.md`, `PRODUCT.md`, `REQUIREMENTS.md`, `ARCHITECTURE.md`, and architecture reference documents;
4. `ROADMAP.md` for intended sequence and `PROGRESS.md` for actual state;
5. `README.md` for orientation;
6. historical planning under `docs/phases/` and other archived planning material.

An approved implementation phase may intentionally change an existing architectural decision only when the corresponding decision/architecture record is updated explicitly. An implementation contract must not silently supersede a durable cross-project decision.

## Documentation duplication rule

A finalized fact should have one canonical location. Other documents should link or summarize it without maintaining independent competing definitions.

## Historical-plan rule

The historical Aevum planning archive is no longer the day-to-day source of truth after Repository Baseline v1.

`docs/phases/` preserves historical planning identities and rationale. It must not be treated as a directory of executable BUILD contracts.

Missing historical detail must be marked as a migration gap rather than invented during implementation.
