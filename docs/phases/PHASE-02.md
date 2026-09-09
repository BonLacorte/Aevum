# Phase 2 — V1 Architecture

Status: `HISTORICAL_PLAN`
Migration: `MIGRATED_AT_ARCHITECTURE_LEVEL`
Build eligibility: `NOT_A_SINGLE_AUTOMATIC_BUILD`
Depends on: `Phase 1`, `Phase 1.2`

## Purpose

Establish the V1 technical architecture that future Aevum implementation must inherit unless explicitly superseded by a later approved decision.

## Finalized architecture decisions

- Frontend: **Next.js + TypeScript**
- Backend: **Java + Spring Boot**
- Primary database: **PostgreSQL**
- Vector capability: **pgvector**

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

The baseline does not treat the following as finalized unless later historical recovery proves otherwise:

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
