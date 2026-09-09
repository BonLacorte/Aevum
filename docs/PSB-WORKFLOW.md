# PSB Workflow

Aevum uses **Plan → Spec → Build (PSB)** to keep planning, durable specification, implementation, and verification distinct.

## Lifecycle

```text
PLAN
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

## 1. PLAN

PLAN defines:

- why the phase exists;
- goals;
- scope;
- non-goals;
- dependencies;
- expected behavior at a product level;
- inherited decisions and architecture constraints;
- deferred work.

Primary update: the applicable `docs/phases/PHASE-*.md` file.

Update `ROADMAP.md` only when the planned sequence or durable phase scope changes.

## 2. SPEC

SPEC defines enough detail to implement and verify the phase, including as applicable:

- functional requirements;
- technical requirements;
- data models and migrations;
- APIs, interfaces, events, or contracts;
- validation rules;
- security and privacy requirements;
- error handling;
- edge cases;
- acceptance criteria;
- Definition of Done;
- verification requirements.

If SPEC finalizes a durable cross-project decision, update `DECISIONS.md`, the relevant architecture document, and an ADR when warranted.

## 3. READY_FOR_BUILD

A phase can enter `READY_FOR_BUILD` only when:

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

Update the phase file and `PROGRESS.md`.

## 4. BUILDING

Codex or another implementation agent executes the approved phase.

BUILD must use repository documentation as its context source. It may not invent major behavior, broaden scope, or silently change architecture.

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
2. the active phase specification for behavior inside its approved scope;
3. `PROJECT.md`, `PRODUCT.md`, `REQUIREMENTS.md`, `ARCHITECTURE.md`, and architecture reference documents;
4. `ROADMAP.md` for intended sequence and `PROGRESS.md` for actual state;
5. `README.md` for orientation;
6. historical planning material.

An approved phase may intentionally change an existing architectural decision only when the corresponding decision/architecture record is updated explicitly. A phase specification must not silently supersede a durable cross-project decision.

## Documentation duplication rule

A finalized fact should have one canonical location. Other documents should link or summarize it without maintaining independent competing definitions.

## Historical-plan rule

The historical Aevum planning archive is no longer the day-to-day source of truth after Repository Baseline v1. Missing historical detail must be marked as a migration gap rather than invented during implementation.
