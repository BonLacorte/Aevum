# Technology Stack

## Approved V1 direction

| Layer | Technology | Status |
|---|---|---|
| Frontend | Next.js + TypeScript | FINALIZED |
| Backend | NestJS + TypeScript | FINALIZED |
| Primary database | PostgreSQL | FINALIZED |
| Vector capability | pgvector | FINALIZED |

## Historical correction note

Repository Baseline v1 initially recorded **Java + Spring Boot** as Aevum's backend. That entry was a migration defect: it belonged to the separate **OrbisOne** project.

The historical Aevum/LifeOS backend direction is **NestJS + TypeScript**. This correction restores the original Aevum architecture; it is not a new stack redesign.

PostgreSQL, pgvector, and the modular-monolith direction were not changed by this correction.

## Guidance

These choices are architectural baselines, not complete implementation specifications. Individual implementation phases define versions, exact project structure, supporting libraries, package/workspace tooling, database-access approach, migration tooling, API conventions, testing libraries, and deployment configuration when those details become necessary.

## Change control

Replacing any of the four active baseline technologies above requires an explicit decision update and, when significant, an ADR. BUILD work must not replace them opportunistically.

The Java + Spring Boot entry corrected above is retained only in migration/decision history and is not an active Aevum technology choice.

## Intentionally undecided in Baseline v1

- Node.js and framework/runtime versions for implementation phases;
- frontend/backend package-management and workspace conventions;
- exact NestJS project/module structure;
- ORM or other database-access library;
- database migration library;
- hosting provider;
- CI/CD platform;
- authentication library/provider;
- AI provider and SDK;
- cache, queue, object-storage, or search infrastructure.

Do not add infrastructure solely because it is common in other systems.
