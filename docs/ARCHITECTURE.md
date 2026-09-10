# Architecture

## Status

This document defines the approved Aevum V1 architecture baseline. Detailed implementation structure remains phase-level specification work.

A backend-stack historical migration correction was applied after Repository Baseline v1 incorrectly imported Java + Spring Boot from the separate OrbisOne project. Aevum's historical backend direction is **NestJS + TypeScript**.

## System direction

Aevum uses a web application architecture with an independently defined frontend, backend, relational data layer, and AI/semantic capabilities.

### Approved stack direction

- Frontend: **Next.js + TypeScript**
- Backend: **NestJS + TypeScript**
- Database: **PostgreSQL**
- Vector capability: **pgvector**

See [`architecture/TECH-STACK.md`](architecture/TECH-STACK.md) for technology direction and [`architecture/DATA.md`](architecture/DATA.md) for persistence principles.

## Architectural responsibilities

### Frontend

The frontend is responsible for user interaction, presentation, client-side state required by approved features, and communication with backend contracts.

It should not become the authoritative persistence or security boundary for protected application data.

### Backend

The backend is responsible for application services, validation, authorization enforcement, persistence orchestration, AI-service orchestration where applicable, and stable API/interface boundaries.

The initial application-services shape remains a **modular monolith** with explicit logical boundaries. This architectural direction does not require speculative modules or premature microservices.

### Data layer

PostgreSQL is the approved primary durable data store. pgvector provides vector capabilities within the PostgreSQL data architecture rather than introducing a separate vector database by default.

### AI layer

AI is a foundational capability, but model calls must have explicit responsibilities and privacy boundaries. Retrieval, generation, structured application logic, and stored facts should remain distinguishable where product correctness depends on that distinction.

See [`architecture/AI.md`](architecture/AI.md).

## Architecture principles

1. Keep product rules explicit rather than hiding them inside prompts.
2. Prefer durable typed contracts between major components.
3. Treat PostgreSQL as the primary system of record unless a later approved decision changes that.
4. Keep vector/semantic capability close to the primary data model through pgvector for V1.
5. Make privacy and external AI data flow explicit in every relevant phase.
6. Avoid premature infrastructure complexity.
7. Introduce deployment, observability, caching, queues, or additional stores only when a phase demonstrates a concrete requirement.

## Not finalized in Baseline v1

The following require later specification or historical-verification work and must not be assumed:

- exact deployment topology;
- exact local-versus-cloud boundary;
- production hosting provider;
- authentication implementation;
- synchronization behavior;
- AI model/provider selection;
- embedding model/provider selection;
- detailed schema and API surface;
- exact NestJS project/module structure;
- ORM/database-access approach;
- migration library;
- observability and background-job architecture.
