# Phase 2 — V1 Architecture

Status: `HISTORICAL_PLAN`
Migration: `MIGRATED_AT_ARCHITECTURE_LEVEL_WITH_BACKEND_CORRECTION`
Build eligibility: `NOT_A_SINGLE_AUTOMATIC_BUILD`
Depends on: `Phase 1`, `Phase 1.2`

## Purpose

Establish the V1 technical architecture that future Aevum implementation must inherit unless explicitly superseded by a later approved decision.

## Finalized architecture decisions

- Frontend: **Next.js + TypeScript**
- Backend: **NestJS + TypeScript**
- Primary database: **PostgreSQL**
- Vector capability: **pgvector**
- Initial application architecture: **modular monolith**

## Historical migration correction

Repository Baseline v1 originally migrated the Aevum backend as **Java + Spring Boot**.

That entry was incorrect. Java + Spring Boot belonged to the separate **OrbisOne** project and was accidentally carried into the Aevum repository during migration.

The historical Aevum/LifeOS Phase 2 backend direction is restored here as **NestJS + TypeScript**.

This correction does not change the historical PostgreSQL, pgvector, or modular-monolith decisions and does not alter the Phase 2 purpose or roadmap role.

## Architecture intent

Phase 2 provides technical constraints for future BUILD phases rather than requiring all architecture concerns to be implemented in one large release.

The canonical architecture representation now lives in:

- `docs/ARCHITECTURE.md`;
- `docs/architecture/TECH-STACK.md`;
- `docs/architecture/DATA.md`;
- `docs/architecture/AI.md`;
- `docs/architecture/SECURITY-PRIVACY.md`;
- active decisions and ADRs.

## Provisional / unresolved areas

The baseline does not treat the following as finalized unless later historical recovery proves otherwise or an implementation SPEC explicitly resolves them:

- framework/runtime/toolchain versions;
- exact NestJS project/module structure;
- package/workspace conventions;
- ORM/database-access approach;
- migration library;
- deployment topology;
- local-versus-cloud split;
- authentication implementation;
- synchronization architecture;
- model/provider choices;
- exact schema/API details;
- infrastructure beyond the approved core stack.

## Deliverables

- approved V1 technology direction;
- architectural separation of frontend, backend, persistence, and AI concerns;
- foundation for later phase specifications.

## Acceptance / Definition of Done

For repository migration, Phase 2 is represented when durable architecture decisions are captured canonically and future BUILD phases reference them rather than re-deciding the stack.

The repository migration record also preserves the historical correction that Java + Spring Boot was an erroneous OrbisOne carryover rather than an Aevum decision.
