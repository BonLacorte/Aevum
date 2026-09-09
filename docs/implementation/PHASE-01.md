# Implementation Phase 1 — Executable Application Foundation

PLAN status: `PLAN_APPROVED`  
SPEC status: `NOT_STARTED`  
Build eligibility: `NOT_READY_FOR_BUILD`

## 1. Phase purpose

Establish the smallest real executable foundation for Aevum using the approved V1 architecture without prematurely implementing Aevum's product domains or AI systems.

This phase exists to remove foundational application uncertainty before later implementation phases add product behavior. It should prove that the approved frontend, backend, relational data layer, and vector-capable PostgreSQL foundation can be structured correctly and run together on a developer machine.

## 2. Primary goal

Prove the following application path:

```text
Browser
  ↓
Next.js + TypeScript frontend
  ↓
HTTP application contract
  ↓
Java + Spring Boot backend
  ↓
PostgreSQL with pgvector capability
```

The phase answers:

> Can Aevum exist as a correctly structured, locally runnable application using its approved V1 architecture?

It does not attempt to prove any major Aevum product feature.

## 3. User/developer-visible outcome

When this phase is eventually implemented and verified, a developer should be able to follow documented local setup instructions, start the required local services, open the Aevum frontend, and observe a minimal foundation/status experience that confirms the frontend can communicate with the backend and that the backend has initialized its required database foundation.

The visible result is approximately:

```text
frontend running
  ↓
backend reachable
  ↓
database foundation initialized
```

This is a technical foundation experience, not the first real Aevum dashboard or product workflow.

## 4. Inherited repository decisions and constraints

This implementation phase inherits the following active repository decisions and architecture constraints:

- Aevum uses the **PSB Workflow: Plan → Spec → Build**.
- Repository documentation is the operational source of truth.
- BUILD scopes must remain independently implementable, testable, reviewable, and committable.
- Aevum remains a general-purpose personal organizational intelligence system and must not revert to a developer-centric Projects model.
- Frontend: **Next.js + TypeScript**.
- Backend: **Java + Spring Boot**.
- Primary database: **PostgreSQL**.
- Vector capability: **pgvector**, kept within the PostgreSQL data architecture rather than introducing a separate vector database by default.
- The backend is the trusted application boundary for validation, persistence orchestration, and future protected-data enforcement.
- The frontend owns presentation and interaction but is not the authoritative persistence or security boundary.
- Initial application architecture follows a **modular-monolith direction** with explicit logical boundaries rather than premature microservices.
- Product rules should remain explicit and deterministic rather than being hidden inside AI prompts.
- Privacy and security are architectural concerns, not final-stage hardening.
- Infrastructure must not be added merely because it is common in other systems.

The following repository areas remain unresolved or provisional and are not silently finalized by this PLAN:

- exact production deployment topology;
- local-versus-cloud product boundary;
- authentication implementation;
- synchronization behavior;
- AI model/provider selection;
- embedding model/provider selection;
- complete product schema;
- observability/background-job architecture.

## 5. Scope

Implementation Phase 1 is limited to establishing the executable application foundation.

### 5.1 Repository/application foundation

The phase may establish:

- the real frontend project;
- the real backend project;
- the minimum local infrastructure required for PostgreSQL;
- migration-controlled database initialization;
- environment/configuration conventions;
- local-development documentation;
- project-owned verification needed to prove the foundation.

### 5.2 Frontend foundation

The phase should establish:

- a runnable Next.js + TypeScript application;
- one minimal application/foundation route or screen;
- one explicit frontend boundary for communicating with the backend;
- configuration-driven backend location;
- minimal understandable behavior for backend reachability/unavailability.

No domain-specific frontend state or major product experience belongs in this phase.

### 5.3 Backend foundation

The phase should establish:

- one runnable Spring Boot application;
- an initial project/package organization consistent with the modular-monolith direction;
- one small application-owned system/status HTTP contract;
- PostgreSQL connectivity;
- database migration execution;
- stable project-owned JSON output for the frontend foundation.

The backend should not create placeholder domain services that have no Phase 1 responsibility.

### 5.4 Database foundation

The phase should establish:

- PostgreSQL as the local development database;
- migration-controlled initialization;
- pgvector availability;
- successful backend database connectivity;
- a repeatable clean initialization path.

No Aevum product/domain tables are required in this phase.

### 5.5 Integration baseline

The phase should prove:

- browser → frontend;
- frontend → backend;
- backend → PostgreSQL;
- predictable application behavior when a required local dependency is unavailable.

## 6. Explicit non-goals

Do **not** implement any of the following in Implementation Phase 1:

### Product/domain features

- authentication or user accounts;
- roles or permissions;
- Goals;
- Pursuits;
- Activities;
- Projects;
- Memories or Memory Engine;
- conversations or messages;
- journal;
- chat;
- Today;
- Timeline;
- Search;
- StoryOfMe;
- reflections or Insights;
- domain settings/preferences.

### AI/semantic features

- AI provider integration;
- model calls;
- prompt infrastructure;
- structured AI output;
- embedding generation;
- embedding persistence;
- vector similarity search;
- RAG;
- context building;
- retrieval/ranking;
- agents;
- tool execution.

### Runtime/infrastructure expansion

- production deployment;
- hosting-provider selection;
- production TLS setup;
- production secret-management infrastructure;
- complex CI/CD;
- caches;
- queues;
- distributed jobs;
- microservices;
- object storage;
- synchronization;
- backup/recovery architecture;
- observability platforms;
- telemetry/analytics;
- performance optimization.

Do not create empty placeholder modules for these deferred systems.

## 7. Dependencies

### Repository dependencies

This implementation phase is derived from and constrained by:

- Repository Baseline v1;
- historical Phase 1 — Product Foundation;
- historical Phase 1.2 — Product Model Refinement;
- historical Phase 2 — V1 Architecture;
- applicable active decisions and architecture documents;
- applicable cross-project requirements.

Historical Phase 3A/3B may constrain the foundation only where durable principles have already been promoted into active repository architecture or decisions. Their feature systems are not Phase 1 implementation requirements.

### Development-environment dependencies to settle in SPEC

SPEC must choose supported versions/conventions for at least:

- Node.js;
- frontend package manager;
- Java/JDK;
- Spring Boot;
- backend build tool;
- PostgreSQL/pgvector local runtime;
- local container/orchestration tooling if used.

No AI provider, authentication provider, or cloud service is a Phase 1 dependency.

## 8. Proposed repository/application structure

The approved PLAN establishes this responsibility-level direction:

```text
aevum/
├── frontend/
│   └── Next.js application
├── backend/
│   └── Spring Boot application
├── infra/
│   └── local infrastructure where justified
├── docs/
│   ├── phases/
│   │   └── historical planning archive
│   └── implementation/
│       └── active PSB implementation contracts
├── local configuration examples
├── local database orchestration
└── README.md
```

This is not a frozen file tree. SPEC will define exact paths, package names, build files, and configuration filenames.

Do not create speculative top-level modules for Memory, Goals, Pursuits, AI, RAG, agents, jobs, or other deferred capabilities.

## 9. Frontend foundation direction

The frontend should establish only the minimum reusable foundation needed by future Aevum screens:

- Next.js + TypeScript starts successfully;
- a minimal application route renders;
- backend communication occurs through an explicit application boundary rather than scattered direct fetch logic;
- the backend address is configuration-driven;
- backend unavailability is handled without crashing the page;
- no domain-specific persistent state is introduced.

SPEC must decide:

- supported framework/runtime versions;
- routing convention;
- styling baseline;
- lint/typecheck commands;
- whether a frontend test runner provides sufficient value for this phase.

Do not introduce authentication, global state management, a complex component system, domain navigation, or generated API tooling merely for anticipated future use.

## 10. Backend foundation direction

The backend should remain one Spring Boot application following the initial modular-monolith direction.

Its Phase 1 responsibilities are limited to:

- starting correctly;
- loading required configuration;
- connecting to PostgreSQL;
- executing database migrations;
- exposing one small application-owned system/status contract;
- returning stable project-owned output appropriate for the frontend foundation.

The transport/controller boundary should remain thin.

Phase 1 should not require a complete ORM/domain persistence architecture simply because one may be useful later. SPEC should add only persistence dependencies actually required to establish the approved foundation.

## 11. Database foundation direction

Implementation Phase 1 should establish PostgreSQL and migration control without prematurely designing Aevum's domain schema.

The phase must not require tables for:

- users;
- memories;
- goals;
- pursuits;
- activities;
- journals;
- conversations/messages;
- embeddings;
- relationships among those entities.

Those require later feature-specific specifications and, where applicable, authentication/ownership decisions.

## 12. pgvector decision for Phase 1

### PLAN decision: enable the capability now; defer vector behavior

pgvector is already an approved V1 technology direction. The executable architecture foundation should therefore prove that the selected PostgreSQL development environment supports the extension.

Implementation Phase 1 should establish migration-controlled pgvector availability.

It must **not** establish:

- vector columns;
- embedding dimensions;
- embedding model metadata;
- vector indexes;
- embedding generation;
- vector similarity queries;
- semantic retrieval.

The embedding model and vector dimensionality remain unresolved until a later implementation phase requires vector persistence.

## 13. Frontend/backend communication baseline

The phase should establish exactly one small non-domain HTTP path conceptually equivalent to:

```text
frontend
  ↓
application/system readiness request
  ↓
backend
  ↓
required foundation readiness
  ↓
small stable JSON response
```

The contract should expose only information needed to establish application readiness. It must not expose database credentials, environment variables, stack traces, or sensitive infrastructure diagnostics.

SPEC must define:

- exact route and HTTP method;
- response DTO/shape;
- error shape;
- frontend TypeScript representation;
- database-readiness semantics;
- whether framework health mechanisms are used behind the application-owned contract.

The frontend should not depend directly on framework-specific management endpoints as its application contract.

## 14. Local development environment direction

The approved PLAN favors a simple development model:

- frontend runs through its normal local development tooling;
- backend runs through normal Spring Boot development tooling;
- PostgreSQL + pgvector runs through Docker Compose or an equivalently lightweight, reproducible local database mechanism selected during SPEC.

Phase 1 does not require containerizing the frontend and backend.

The repository should eventually document a predictable sequence equivalent to:

```text
prepare configuration
  ↓
start database
  ↓
start backend
  ↓
start frontend
  ↓
verify application
```

Exact commands belong in SPEC/BUILD documentation.

## 15. Configuration/environment approach

The phase must establish these principles:

### Backend

- database connection settings come from configuration/environment rather than committed credentials;
- required configuration failures are actionable;
- server-only secrets remain server-side.

### Frontend

- only values safe for browser exposure may use public frontend environment variables;
- the backend location or other non-secret browser configuration is configuration-driven.

### Repository

- real secret/config overrides are excluded from source control;
- example configuration is committed where useful;
- example values contain no real credentials;
- server credentials are never exposed through frontend-public configuration.

Exact variable names and local profiles must be defined during SPEC.

## 16. Minimum security requirements

Because Phase 1 intentionally contains no authentication and no protected personal data, it must not create temporary/fake identity behavior.

The minimum security baseline is:

- no credentials committed to Git;
- no secrets returned to the browser;
- no database credentials exposed through APIs;
- no environment-variable dumping;
- no internal stack traces returned as normal frontend data;
- local-development cross-origin access is restricted to the origins required by the development setup rather than made universally permissive without need;
- the backend remains the trusted server boundary;
- logs do not contain secrets;
- no personal information is intentionally persisted by Phase 1;
- dependencies remain minimal;
- the project must not claim local-only, offline-first, end-to-end-encrypted, zero-retention, or equivalent guarantees not established by specification.

Authentication/authorization must be specified before a later phase handles protected user data.

## 17. Testing and verification strategy

This PLAN establishes verification intent. Exact commands and acceptance criteria belong in SPEC.

### Frontend

Verify as applicable that:

- dependencies install successfully;
- the application builds/runs;
- TypeScript/static checks pass;
- configured backend communication works;
- the minimal application route renders;
- backend unavailability produces understandable behavior rather than a frontend crash.

A new test framework should not be introduced solely for nominal coverage unless SPEC demonstrates a meaningful Phase 1 benefit.

### Backend

Verify as applicable that:

- the Spring application boots;
- automated backend tests pass;
- configuration loads as specified;
- the system/status contract behaves as specified;
- database startup/connectivity failures are surfaced clearly.

### Database

Using a real PostgreSQL + pgvector-capable environment, verify that:

- the database starts;
- migrations execute from a clean database;
- pgvector capability initializes successfully;
- the backend establishes its required connection.

SPEC must select the reproducible integration-test/verification method.

### Manual vertical smoke test

The completed phase must prove the real local chain:

```text
database starts
  ↓
backend starts and initializes
  ↓
frontend starts
  ↓
browser loads frontend
  ↓
frontend reaches backend
  ↓
foundation status succeeds
```

A fresh-clone/setup verification should be performed where practical to validate the documented setup path.

## 18. Documentation affected by implementation

The implementation cycle is expected to update only documentation affected by durable implementation facts.

At minimum:

- `docs/implementation/PHASE-01.md` — active implementation contract and lifecycle state;
- `docs/PROGRESS.md` — actual PSB and implementation status;
- `README.md` — actual setup/start instructions after implementation exists;
- `docs/DECISIONS.md` — only when BUILD or SPEC establishes a durable cross-project decision;
- architecture documents — only when durable architecture facts are established or changed.

`docs/phases/` remains the historical planning archive and should not be rewritten as the implementation contract.

## 19. SPEC-stage unresolved decisions

The approved PLAN deliberately leaves the following implementation details for SPEC.

### Toolchain

- Node.js version;
- Next.js/TypeScript versions;
- frontend package manager;
- JDK version;
- Spring Boot version;
- Maven versus Gradle.

### Frontend

- routing convention;
- exact minimal page structure;
- styling baseline;
- lint/typecheck commands;
- test-runner decision.

### Backend

- Java package namespace;
- internal package organization;
- exact system/status route and DTO;
- management/health tooling usage;
- database readiness behavior;
- migration library;
- persistence dependencies actually required by this phase.

### Database/local infrastructure

- PostgreSQL version;
- pgvector-compatible image/distribution;
- local database/container versioning;
- database name;
- schema strategy if any;
- migration-tool choice and migration location;
- clean initialization behavior.

### Integration/configuration

- frontend/backend local ports;
- allowed development origins;
- API base-URL variable;
- exact error contract;
- environment-variable names;
- example/local configuration file convention.

### Verification

- exact frontend checks;
- exact backend test suite;
- database integration verification strategy;
- clean migration verification procedure;
- manual smoke-test commands and evidence requirements.

No unresolved item above authorizes BUILD until SPEC resolves every BUILD-blocking ambiguity and the phase passes the `READY_FOR_BUILD` gate.

## 20. Deferred work

The following remains intentionally deferred to later PSB cycles:

- all user-facing Aevum domains;
- identity, authentication, authorization, protected-data ownership, deletion/export workflows;
- AI providers and model operations;
- Memory Engine;
- embeddings and semantic retrieval;
- RAG/context construction;
- agents/tool architecture;
- queues/background AI jobs;
- caching/object storage;
- synchronization;
- observability platforms;
- production deployment/hosting;
- backup/recovery architecture;
- production secrets/key management;
- complex CI/CD.

## 21. PLAN approval record

The Aevum PSB Guide approved this PLAN for **Implementation Phase 1 — Executable Application Foundation**.

Approved PLAN boundary:

> Implementation Phase 1 proves that Aevum's approved architecture exists and works locally. It does not yet prove any of Aevum's major product features.

Current phase state:

- PLAN: `PLAN_APPROVED`
- SPEC: `NOT_STARTED`
- Build eligibility: `NOT_READY_FOR_BUILD`

Do not implement application code from this PLAN alone.

The phase may proceed to SPEC only through an explicit subsequent PSB instruction.
