# AGENTS.md

This file defines the operating rules for Codex and other coding agents working in the Aevum repository.

## Core rule

Implement only an approved implementation phase in `docs/implementation/` that is explicitly marked `READY_FOR_BUILD`.

A `PLAN_APPROVED` phase is **not** permission to implement application code.

Do not infer major product behavior, redesign the architecture, or implement deferred work during BUILD.

## Phase-document roles

- `docs/implementation/` contains the canonical active PSB implementation contracts.
- `docs/phases/` is the historical planning archive.

Historical phase documents are supporting context, not executable BUILD specifications. Do not treat a historical `PHASE-*.md` file as permission to implement features.

Historical planning should be consulted only when an active repository document explicitly references it for inherited context or when a documented migration gap requires historical verification.

## Required reading before implementation

Before changing application code:

1. identify the active file in `docs/implementation/`;
2. confirm that the file is explicitly marked `READY_FOR_BUILD`;
3. read that implementation contract in full;
4. read `docs/PROGRESS.md`;
5. read the relevant sections of `docs/ARCHITECTURE.md` and `docs/architecture/`;
6. read applicable entries in `docs/DECISIONS.md` and active ADRs;
7. read any cross-cutting requirements referenced by the implementation contract.

If no implementation contract is `READY_FOR_BUILD`, do not change application code.

## Authority and conflicts

Use the following rules:

1. **Active decision records and ADRs** are authoritative for explicit cross-project decisions.
2. **The active implementation contract in `docs/implementation/`** is authoritative for behavior inside its approved scope, provided it does not silently contradict an active decision or architecture constraint.
3. **Project, product, requirements, and architecture documents** define cross-phase context and constraints.
4. **ROADMAP.md** defines intended sequencing; **PROGRESS.md** defines actual implementation status.
5. **README.md** is orientation only.
6. **Historical planning under `docs/phases/`** is archival/supporting evidence, not day-to-day implementation authority.

If two authoritative documents conflict, do not guess. Report the conflict and stop only the affected work until the specification is corrected.

## BUILD behavior

During BUILD:

- stay inside the active implementation phase scope;
- preserve explicit non-goals and deferred work;
- follow established naming, layering, data, security, and testing conventions;
- implement all applicable acceptance criteria;
- add or update tests required by the phase;
- run applicable verification;
- report blockers, deviations, failed checks, and ambiguous requirements clearly;
- prefer a minimal compliant implementation over speculative expansion;
- do not implement a future phase merely because its historical planning already exists.

## Architectural behavior

Follow active architecture and decision records. In particular, the initial Aevum backend direction is a **modular monolith**: preserve clear logical boundaries without introducing microservices unless a later approved decision explicitly requires them.

Do not create speculative modules, infrastructure, or abstractions solely for anticipated future features.

## Prohibited behavior

Do not:

- add unrequested product features;
- silently change architectural decisions;
- introduce a new framework or infrastructure layer without an approved decision/specification need;
- assume missing historical details are requirements;
- treat `PLAN_APPROVED` as `READY_FOR_BUILD`;
- expose credentials, secrets, private user data, or sensitive configuration;
- mark a phase `CLOSED` solely because implementation finished;
- rewrite unrelated code for cleanup unless the active implementation phase explicitly requires it.

## Phase status ownership

A coding agent may report that implementation and local verification are complete, but the PSB review process determines whether the phase becomes `VERIFIED` and `CLOSED`.

A coding agent must not independently advance PLAN, SPEC, `READY_FOR_BUILD`, `VERIFIED`, or `CLOSED` governance gates unless the governing workflow explicitly assigns that action.

## Documentation updates

During or after implementation, update only documentation affected by durable implementation facts. Do not duplicate canonical information across multiple files when a reference is sufficient.

The active implementation contract records phase-specific requirements and status. `docs/PROGRESS.md` records what actually exists. Cross-project architecture/decision documents change only when a durable cross-project fact has genuinely changed or been established.
