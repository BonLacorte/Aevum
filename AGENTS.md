# AGENTS.md

This file defines the operating rules for Codex and other coding agents working in the Aevum repository.

## Core rule

Implement only an approved phase that is explicitly marked `READY_FOR_BUILD`.

Do not infer major product behavior, redesign the architecture, or implement deferred work during BUILD.

## Required reading before implementation

Before changing application code, read:

1. the active file in `docs/phases/`;
2. `docs/PROGRESS.md`;
3. the relevant sections of `docs/ARCHITECTURE.md` and `docs/architecture/`;
4. applicable entries in `docs/DECISIONS.md` and active ADRs;
5. any cross-cutting requirements referenced by the phase.

Do not load historical planning material unless the current repository documentation explicitly identifies a migration gap that requires historical verification.

## Authority and conflicts

Use the following rules:

1. **Active decision records and ADRs** are authoritative for explicit cross-project decisions.
2. **The active phase specification** is authoritative for behavior inside its approved scope, provided it does not silently contradict an active decision or architecture constraint.
3. **Project, product, requirements, and architecture documents** define cross-phase context and constraints.
4. **ROADMAP.md** defines intended sequencing; **PROGRESS.md** defines actual implementation status.
5. **README.md** is orientation only.
6. **Historical planning material** is archival evidence, not day-to-day implementation authority.

If two authoritative documents conflict, do not guess. Report the conflict and stop only the affected work until the specification is corrected.

## BUILD behavior

During BUILD:

- stay inside the phase scope;
- preserve non-goals and deferred work;
- follow established naming, layering, data, security, and testing conventions;
- implement all applicable acceptance criteria;
- add or update tests required by the phase;
- run applicable verification;
- report blockers, deviations, failed checks, and ambiguous requirements clearly;
- prefer a minimal compliant implementation over speculative expansion.

## Prohibited behavior

Do not:

- add unrequested product features;
- silently change architectural decisions;
- introduce a new framework or infrastructure layer without an approved decision;
- assume missing historical details are requirements;
- expose credentials, secrets, private user data, or sensitive configuration;
- mark a phase `CLOSED` solely because implementation finished;
- rewrite unrelated code for cleanup unless the active phase explicitly requires it.

## Phase status ownership

A coding agent may report that implementation and local verification are complete, but the PSB review process determines whether the phase becomes `VERIFIED` and `CLOSED`.

## Documentation updates

During or after implementation, update only documentation affected by durable implementation facts. Do not duplicate canonical information across multiple files when a reference is sufficient.
