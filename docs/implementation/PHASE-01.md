# Implementation Phase 1 — Executable Application Foundation

PLAN status: `PLAN_APPROVED`  
SPEC status: `SPEC_APPROVED`  
Build eligibility: `READY_FOR_BUILD`

> The PLAN and corrected SPEC in this document are approved and together form the canonical implementation contract for this phase. The phase is `READY_FOR_BUILD`, but application implementation has not started and the phase must not be treated as `BUILDING` until Codex actually begins the approved BUILD.

## PLAN — Approved

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
├── .gitignore
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

The approved SPEC below resolves the BUILD-blocking implementation decisions identified here, and the phase has passed the `READY_FOR_BUILD` gate.

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

Current phase state after SPEC approval:

- PLAN: `PLAN_APPROVED`
- SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- BUILD: `NOT_STARTED`

The approved PLAN remains the scope boundary. The approved SPEC below is the implementation contract for this phase. `READY_FOR_BUILD` authorizes implementation only when Codex is explicitly instructed to begin; the phase is not yet `BUILDING`.

---

# SPEC — Approved

## 22. SPEC purpose and readiness gate

This SPEC converts the approved PLAN into an implementation contract concrete enough for one controlled Codex BUILD cycle without requiring the coding agent to choose architecture, versions, endpoints, configuration conventions, database initialization behavior, or verification strategy.

This SPEC does **not** broaden the PLAN. All PLAN non-goals and deferred items remain binding.

Status at this checkpoint:

- PLAN: `PLAN_APPROVED`
- SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- BUILD: `NOT_STARTED`

The Aevum PSB Guide has reviewed and approved this SPEC. `READY_FOR_BUILD` authorizes implementation only when Codex is explicitly instructed to begin. Until that instruction is given and implementation actually starts, the phase remains not `BUILDING`.

## 23. Toolchain and version contract

The BUILD must use the following baseline versions unless the PSB Guide amends this SPEC before BUILD:

| Area | Required baseline | Rule |
|---|---|---|
| Node.js | **24.21.0 LTS** | Supported frontend runtime for this phase. Record it in `.nvmrc`. Do not use Node 26 Current. |
| npm | **11.19.0** | Frontend package manager. Commit `package-lock.json`. Do not introduce pnpm, Yarn, or Bun. |
| Next.js | **16.3.3** | Use the App Router. Pin the direct dependency to 16.3.3. |
| React | **19.2.8** | Pin `react` and `react-dom` to 19.2.8. |
| TypeScript | **6.0.2 via npm compatibility alias** | `frontend/package.json` must declare `"typescript": "npm:@typescript/typescript6@6.0.2"`. The dependency key remains `typescript` so tooling that imports `typescript` resolves the aliased TypeScript 6 API. The compiler binary used by Phase 1 is `tsc6`. Do not adopt TypeScript 7.x during this BUILD. |
| Java | **JDK 25 LTS** | Compile and run against Java 25. Use standard OpenJDK-compatible APIs only; no vendor-specific runtime dependency. |
| Spring Boot | **4.1.1** | Parent/BOM version for the backend. |
| Backend build tool | **Apache Maven 3.9.16 via Maven Wrapper** | Commit Maven Wrapper files. Do not introduce Gradle. |
| PostgreSQL | **18.x**, development reference **18.6** | Phase 1 targets PostgreSQL major 18. The local pgvector image determines the packaged 18.x patch; 18.6 is the reference validated current minor. |
| pgvector | **0.8.6** | Pin the development image to a 0.8.6 + PostgreSQL 18 tag. |
| Docker Compose | **Docker Compose v2 (`docker compose`)** | Used only for the local PostgreSQL/pgvector service. Frontend/backend are not containerized. |

### Version-drift rule

During this BUILD, Codex must not silently upgrade to a newer major/minor framework generation simply because one is available. Security-only or patch-level changes that become necessary before BUILD must be surfaced to PSB review if they would change a pinned direct version above.

Spring-managed transitive/backend dependency versions must use Spring Boot 4.1.1 dependency management rather than independent arbitrary pins unless this SPEC explicitly requires otherwise.

## 24. Exact repository/application structure

Implementation Phase 1 must establish the following application-facing structure and no speculative future-domain directories:

```text
aevum/
├── frontend/
│   ├── .env.local.example
│   ├── .gitignore
│   ├── .nvmrc
│   ├── eslint.config.mjs
│   ├── next.config.ts
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   └── src/
│       ├── app/
│       │   ├── globals.css
│       │   ├── layout.tsx
│       │   └── page.tsx
│       ├── components/
│       │   └── FoundationStatus.tsx
│       └── lib/
│           └── api/
│               └── system-status.ts
├── backend/
│   ├── .gitignore
│   ├── .mvn/
│   │   └── wrapper/
│   ├── mvnw
│   ├── mvnw.cmd
│   ├── pom.xml
│   └── src/
│       ├── main/
│       │   ├── java/
│       │   │   └── com/aevum/
│       │   │       ├── AevumApplication.java
│       │   │       ├── config/
│       │   │       │   └── WebCorsConfiguration.java
│       │   │       └── system/
│       │   │           ├── SystemStatusController.java
│       │   │           ├── SystemStatusResponse.java
│       │   │           └── SystemStatusService.java
│       │   └── resources/
│       │       ├── application.yml
│       │       └── db/migration/
│       │           └── V1__enable_vector_extension.sql
│       └── test/
│           └── java/
│               └── com/aevum/system/
│                   ├── SystemStatusControllerTest.java
│                   └── SystemStatusIntegrationTest.java
├── infra/
│   ├── .env.example
│   └── compose.yaml
├── docs/
│   ├── phases/
│   └── implementation/
│       └── PHASE-01.md
└── README.md
```

Rules:

- Do not create `memory/`, `goals/`, `pursuits/`, `ai/`, `rag/`, `agents/`, `jobs/`, `auth/`, or other future-feature placeholders.
- The backend remains one deployable Spring Boot application.
- The `system` package is the only Phase 1 capability package and exists solely for the foundation-status contract.
- No repository or ORM/domain package is required because Phase 1 has no domain persistence.
- Starter/demo assets and sample content generated by scaffolding tools must be removed if they are not used by the Phase 1 foundation screen.
- The root `.gitignore` is part of the Phase 1 repository contract. At minimum it must ignore `/infra/.env` and `/frontend/.env.local`.
- `infra/.env.example` and `frontend/.env.local.example` must remain trackable. No root or nested ignore rule may cause either committed example file to be ignored.

## 25. Frontend technical specification

### 25.1 Scaffold and framework conventions

The frontend must use:

- Next.js **App Router**;
- TypeScript;
- the `src/` directory convention;
- ESLint;
- the `@/*` import alias mapped to `src/*`;
- plain global CSS for the minimal foundation screen;
- default Next.js/Turbopack behavior for Next.js 16.3.3;
- no Tailwind CSS;
- no CSS framework;
- no component library;
- no state-management library;
- no React Compiler opt-in;
- no experimental Next.js flags unless required to make the pinned stable toolchain function, in which case BUILD must report the blocker instead of adding the flag silently.

`next.config.ts` must remain minimal. TypeScript build errors must not be ignored.

TypeScript package mechanics are fixed for Phase 1:

- `frontend/package.json` must use the npm alias `"typescript": "npm:@typescript/typescript6@6.0.2"`;
- do not install TypeScript 7.x directly or alongside the alias;
- the dependency key must remain `typescript`, so tools or libraries that resolve/import the package name `typescript` receive the aliased TypeScript 6.0.2 API;
- the compiler executable for Phase 1 is `tsc6`;
- after `npm ci`, `npm exec -- tsc6 --version` must report `Version 6.0.2`;
- after `npm ci`, `node -p "require('typescript').version"` must report `6.0.2`, proving package-name imports resolve the aliased TypeScript 6 API.

### 25.2 Required frontend scripts

`frontend/package.json` must expose these scripts with these responsibilities:

- `dev` — run Next.js development server on port **3000**;
- `build` — run a production Next.js build;
- `start` — run the built Next.js server on port **3000**;
- `lint` — run ESLint directly across the frontend;
- `typecheck` — invoke the TypeScript 6 compatibility compiler exactly as `tsc6 --noEmit`;
- `check` — run lint, typecheck, and build in sequence.

Do not use the removed `next lint` command.

### 25.3 Foundation page

The only required user-facing route is:

- `GET /` in the Next.js application.

The page must present a minimal technical foundation experience containing:

- product name: **Aevum**;
- context label indicating that this is the application foundation/status screen;
- one status area driven by the backend system-status contract.

It must not resemble or imply a finished Aevum dashboard, Today view, journal, chat, timeline, Goals interface, or any other deferred product experience.

### 25.4 Frontend status state machine

`FoundationStatus.tsx` must be a client component with exactly three application states:

1. `loading`
2. `ready`
3. `unavailable`

Required visible behavior:

| State | Required visible message | Trigger |
|---|---|---|
| `loading` | **Checking application foundation…** | Initial state while the single status request is in flight. |
| `ready` | **Application foundation ready** | Backend returns HTTP 200 with a valid `READY` system-status payload. |
| `unavailable` | **Application foundation unavailable** | Network failure, timeout, CORS failure, non-2xx response, or invalid/unexpected payload. |

The ready state should include concise supporting text equivalent to: **Backend and database foundation are ready.**

The unavailable state should include concise supporting text equivalent to: **The backend or database foundation could not be reached. Check local services and configuration.**

Rules:

- Do not display raw exception text, stack traces, JDBC details, database hostnames, or environment values.
- Do not poll automatically.
- Do not add background retry loops.
- Do not add toast infrastructure.
- A browser refresh is sufficient to retry in Phase 1.

### 25.5 Frontend API boundary

All frontend access to the backend status contract must go through:

- `frontend/src/lib/api/system-status.ts`

The component must not construct backend URLs or call `fetch` against hard-coded backend addresses directly.

The API helper must:

- read `NEXT_PUBLIC_AEVUM_API_BASE_URL`;
- call `GET /api/system/status`;
- use an **HTTP timeout of 5 seconds** via request cancellation;
- treat any non-2xx result as failure for the frontend state machine;
- validate the minimal expected response fields before returning success;
- avoid caching the readiness result as durable application state;
- expose a project-owned TypeScript representation of the DTO in the same file unless a separate type file becomes necessary for actual Phase 1 code clarity.

No generated API client or schema-generation tooling is allowed in this phase.

### 25.6 Frontend test-runner decision

**No dedicated frontend unit-test runner is introduced in Phase 1.**

Rationale: the frontend contains one tiny client state machine and no domain behavior. Adding Vitest/Jest/Testing Library in this phase would create more test-framework foundation than product foundation. Frontend correctness is verified through lint, TypeScript checking, production build, and the mandatory manual smoke tests defined below.

A future phase with meaningful frontend behavior may introduce a test runner through its own SPEC.

## 26. Backend technical specification

### 26.1 Project identity

The backend Maven project must use:

- group: `com.aevum`
- artifact: `aevum-backend`
- base package: `com.aevum`
- Java release: `25`
- packaging: executable Spring Boot JAR

### 26.2 Required backend dependencies

Use only the backend dependencies required for this phase:

Runtime/application:

- Spring Boot Web starter;
- Spring JDBC starter;
- PostgreSQL JDBC driver;
- Flyway core;
- Flyway PostgreSQL database support module where required by the managed Flyway version.

Test:

- Spring Boot test starter;
- Spring Boot Testcontainers integration;
- Testcontainers PostgreSQL module.

Rules:

- Versions for Spring-managed libraries use the Spring Boot 4.1.1 dependency management baseline.
- Do **not** add Spring Data JPA/Hibernate.
- Do **not** add Spring Security.
- Do **not** add Spring Boot Actuator.
- Do **not** add Spring Modulith as a dependency in Phase 1; the modular-monolith direction is enforced by package/module boundaries and scope discipline, not by adding framework machinery without a concrete need.

### 26.3 Backend package responsibilities

`com.aevum.AevumApplication`

- application entry point only.

`com.aevum.config.WebCorsConfiguration`

- defines the Phase 1 development CORS policy for the application-owned API path;
- contains no authentication or authorization behavior.

`com.aevum.system.SystemStatusController`

- thin HTTP transport boundary;
- owns `GET /api/system/status`;
- maps the application result to HTTP 200 or 503;
- contains no direct JDBC query.

`com.aevum.system.SystemStatusService`

- performs the Phase 1 readiness probe using Spring JDBC;
- decides READY versus NOT_READY from database connectivity and pgvector-extension availability;
- does not own any Aevum product/domain behavior.

`com.aevum.system.SystemStatusResponse`

- project-owned immutable response DTO;
- represents only the fields defined in Section 28.

## 27. Database and migration specification

### 27.1 Local database runtime

The local database service must use Docker Compose with:

- service name: `db`;
- image: `pgvector/pgvector:0.8.6-pg18-bookworm`;
- PostgreSQL major: 18;
- pgvector: 0.8.6;
- host port default: `5432`;
- database default: `aevum`;
- username default: `aevum`;
- password supplied from an uncommitted local environment file;
- one named Docker volume for PostgreSQL data;
- a PostgreSQL `pg_isready` health check;
- no frontend or backend service in Compose.

The Compose file must not set a fixed global `container_name` unless a concrete technical blocker requires it.

### 27.2 PostgreSQL version semantics

The supported development database line for this phase is PostgreSQL **18.x**. PostgreSQL **18.6** is the reference current minor at SPEC creation time.

Because the pinned pgvector Docker image packages its own PostgreSQL 18.x base, acceptance must verify:

- server major version is 18;
- pgvector extension version is 0.8.6.

The BUILD must not replace the image with PostgreSQL 19 beta/preview or another major version.

### 27.3 Schema strategy

Phase 1 uses PostgreSQL's default `public` schema.

Do not introduce a custom Aevum domain schema yet. No product/domain tables are allowed.

The only database metadata/table expected after a clean Phase 1 migration is Flyway's own schema-history metadata. pgvector is enabled as a PostgreSQL extension, not represented as an Aevum domain table.

### 27.4 Migration tooling

Use **Flyway**, auto-configured by Spring Boot.

Migration location:

- `backend/src/main/resources/db/migration/`

Initial migration:

- filename: `V1__enable_vector_extension.sql`
- responsibility: enable the PostgreSQL `vector` extension idempotently;
- must create no Aevum domain tables, vector columns, indexes, or seed data.

Flyway behavior:

- migrations run automatically during backend startup;
- migration validation remains enabled;
- `baseline-on-migrate` remains disabled;
- Flyway `clean` is not an application startup behavior;
- once committed as part of the completed phase, applied migration files must not be rewritten casually; later schema changes use new migrations.

### 27.5 Startup dependency semantics

Backend startup requires a valid database configuration and a reachable database.

If PostgreSQL is unavailable or Flyway cannot complete the required migration, the backend must fail startup rather than pretending to be ready without its required foundation.

An actionable startup error may be logged server-side, but credentials and password values must not be printed.

## 28. System/status HTTP contract

### 28.1 Endpoint

- Method: `GET`
- Path: `/api/system/status`
- Authentication: none in Phase 1
- Content type: `application/json`

This is an Aevum-owned application contract. The frontend must not call a framework-specific Actuator endpoint.

### 28.2 Success DTO

When the backend is running, PostgreSQL is reachable, and the `vector` extension is present:

- HTTP status: `200 OK`
- body:

```json
{
  "status": "READY",
  "database": "UP",
  "pgvector": "AVAILABLE"
}
```

### 28.3 Database-unavailable DTO

If the backend remains running but the database readiness probe cannot obtain a valid database response:

- HTTP status: `503 Service Unavailable`
- body:

```json
{
  "status": "NOT_READY",
  "database": "DOWN",
  "pgvector": "UNKNOWN"
}
```

### 28.4 pgvector-unavailable DTO

If PostgreSQL is reachable but the required `vector` extension is not present:

- HTTP status: `503 Service Unavailable`
- body:

```json
{
  "status": "NOT_READY",
  "database": "UP",
  "pgvector": "UNAVAILABLE"
}
```

### 28.5 DTO constraints

The response contains exactly these logical fields for Phase 1:

- `status`: `READY | NOT_READY`
- `database`: `UP | DOWN`
- `pgvector`: `AVAILABLE | UNAVAILABLE | UNKNOWN`

Do not add:

- credentials;
- database URL/host;
- environment-variable values;
- stack traces;
- exception class names;
- SQL statements;
- server hostname;
- process identifiers;
- build/commit metadata;
- user information;
- timestamps solely for decoration.

### 28.6 Readiness probe semantics

The status service must perform a lightweight database check that verifies:

1. a query can be executed against PostgreSQL; and
2. the installed-extension catalog reports the `vector` extension as present.

The result is READY only when both conditions pass.

The backend must translate expected database-readiness failures into the 503 DTOs above rather than returning raw exceptions.

The datasource connection timeout for local Phase 1 operation must be bounded to approximately **3 seconds** so the status request does not remain blocked by the default long pool timeout when the local database disappears.

## 29. Ports, API-base configuration, and CORS

### 29.1 Local ports

Required defaults:

- frontend: `http://localhost:3000`
- backend: `http://localhost:8080`
- PostgreSQL: `localhost:5432`

These are development defaults, not production topology decisions.

### 29.2 Frontend API base variable

Required browser-safe variable:

- `NEXT_PUBLIC_AEVUM_API_BASE_URL`

Phase 1 example value:

```text
http://localhost:8080
```

Rules:

- value is an origin/base URL, without `/api/system/status` appended;
- it contains no credentials or secrets;
- `frontend/.env.local` is local/uncommitted;
- `frontend/.env.local.example` is committed with the safe localhost example;
- missing or invalid configuration must produce a clear local-development failure rather than silently choosing a remote service.

### 29.3 Local CORS policy

The backend must allow browser access only from the configured Phase 1 frontend origin.

Backend variable:

- `AEVUM_ALLOWED_ORIGIN`
- default: `http://localhost:3000`

CORS contract for Phase 1:

- path: `/api/**`;
- allowed origin: exactly the configured origin;
- allowed method needed by the application: `GET`;
- credentials: disabled;
- no wildcard origin;
- no production-origin assumptions;
- no authentication headers are required by this phase.

If the frontend is intentionally run on another origin during development, the developer must explicitly update `AEVUM_ALLOWED_ORIGIN`.

## 30. Environment and configuration contract

### 30.1 Backend variables

The backend configuration must recognize:

| Variable | Required? | Default | Purpose |
|---|---|---|---|
| `AEVUM_DB_PASSWORD` | **Yes for local runtime** | none | PostgreSQL password. Must never be committed. |
| `AEVUM_DB_HOST` | No | `localhost` | Database host. |
| `AEVUM_DB_PORT` | No | `5432` | Database port. |
| `AEVUM_DB_NAME` | No | `aevum` | Database name. |
| `AEVUM_DB_USERNAME` | No | `aevum` | Database username. |
| `AEVUM_BACKEND_PORT` | No | `8080` | Spring Boot HTTP port. |
| `AEVUM_ALLOWED_ORIGIN` | No | `http://localhost:3000` | Single allowed browser origin for local CORS. |

The datasource JDBC URL is assembled from the database host, port, and name configuration. The password has no committed fallback.

### 30.2 Infrastructure variables

`infra/.env.example` must document:

```text
AEVUM_DB_NAME=aevum
AEVUM_DB_USERNAME=aevum
AEVUM_DB_PASSWORD=replace-with-a-local-password
AEVUM_DB_PORT=5432
```

The real local file is:

- `infra/.env`

and must be ignored by Git.

The Compose service maps these values to PostgreSQL's container initialization variables.

### 30.3 Frontend variables

`frontend/.env.local.example` must document:

```text
NEXT_PUBLIC_AEVUM_API_BASE_URL=http://localhost:8080
```

The real local file is:

- `frontend/.env.local`

and must be ignored by Git.

### 30.4 Configuration rules

- Do not add a dotenv library to Spring Boot.
- Spring Boot reads backend settings through its normal environment/configuration mechanism.
- Example files contain placeholders/local-safe values only.
- No database password may appear in `application.yml`, `compose.yaml`, source code, API responses, frontend configuration, tests committed with a real secret, or documentation examples purporting to be a real credential.
- Tests may generate ephemeral credentials internally through Testcontainers and must not depend on the developer's local password.

## 31. Backend error and security behavior

Phase 1 has no authentication because it stores no protected personal data and exposes only the technical status contract.

Required backend baseline:

- no Spring Security dependency;
- no fake user/session/token behavior;
- no wildcard CORS;
- no stack traces in normal HTTP error responses;
- no exception class names or internal SQL/JDBC details in the status DTO;
- no environment dump endpoint;
- no Actuator endpoint exposed as frontend contract;
- no SQL debug logging enabled by default;
- no secrets logged deliberately;
- standard server error configuration must not include stack traces or exception details in normal responses.

The BUILD must not make privacy claims such as offline-only, local-only, end-to-end encrypted, or zero retention.

## 32. Automated testing specification

### 32.1 Frontend automated/static verification

No frontend unit-test framework is required in this phase.

The BUILD must pass:

```text
cd frontend
npm ci
npm exec -- tsc6 --version
node -p "require('typescript').version"
npm run lint
npm run typecheck
npm run build
```

Expected TypeScript verification:

- `npm exec -- tsc6 --version` reports `Version 6.0.2`;
- `node -p "require('typescript').version"` reports `6.0.2`;
- `npm run typecheck` executes the package script whose command is `tsc6 --noEmit`.

For `npm run build`, the required public API-base configuration must be present using the committed example value or an equivalent safe local setting.

### 32.2 Backend test strategy

Backend automated tests use JUnit/Spring Boot Test and Testcontainers.

`SystemStatusControllerTest` must verify at least:

- READY application result maps to HTTP 200 and the exact success DTO;
- database-down result maps to HTTP 503 and the exact database-unavailable DTO;
- pgvector-unavailable result maps to HTTP 503 and the exact pgvector-unavailable DTO.

The controller test must not require a real PostgreSQL instance; it may isolate/mock the service boundary.

`SystemStatusIntegrationTest` must use a real ephemeral PostgreSQL + pgvector container based on the same pinned development image family. It must start the Spring Boot application with a real test web environment and exercise the application-owned endpoint through the HTTP layer rather than mocking `SystemStatusService`.

It must verify at least:

- Spring application context starts with the test database;
- Flyway runs from an empty database;
- the `vector` extension exists and reports version 0.8.6;
- no Aevum product/domain tables are introduced by Phase 1 migrations;
- `GET /api/system/status` returns HTTP 200 and the exact READY DTO against the real database;
- a real pgvector-unavailable service condition produces the exact required HTTP 503 response.

The pgvector-unavailable integration case must use the real test database after normal startup/migration:

1. Establish/verify the healthy READY state first.
2. Through JDBC against that Testcontainers database, execute `DROP EXTENSION vector` without `CASCADE`. Because Phase 1 creates no vector columns or dependent domain objects, the extension must be removable without deleting application data.
3. Call the running test application's `GET /api/system/status` endpoint over HTTP.
4. Verify HTTP `503 Service Unavailable` with exactly:

```json
{
  "status": "NOT_READY",
  "database": "UP",
  "pgvector": "UNAVAILABLE"
}
```

5. Restore test state in a guaranteed cleanup path (`finally` or equivalent) using `CREATE EXTENSION IF NOT EXISTS vector`.
6. Verify the restored extension reports version `0.8.6`.
7. Call `GET /api/system/status` again and verify the exact HTTP 200 READY DTO, proving the test did not leave shared database state damaged.

This extension-mutation test must not race another test using the same database. It must either run non-parallel against its container/context or use a dedicated isolated container/context. The mutation/restoration must not rely on a rollback-only test transaction; cleanup is explicit.

The Testcontainers PostgreSQL image must be treated as a PostgreSQL-compatible substitute where the library requires that declaration.

### 32.3 Backend verification command

Required command:

POSIX shells:

```text
cd backend
./mvnw clean verify
```

Windows:

```text
cd backend
mvnw.cmd clean verify
```

This command must run the complete Phase 1 backend automated test suite. Docker must be available because the integration test uses Testcontainers.

### 32.4 Repository ignore verification

The root `.gitignore` must contain repository-root rules that ignore at minimum:

```text
/infra/.env
/frontend/.env.local
```

The committed examples must remain trackable:

- `infra/.env.example`
- `frontend/.env.local.example`

After the real local files have been created, BUILD verification from repository root must include:

```text
git check-ignore -v infra/.env
git check-ignore -v frontend/.env.local
```

Both commands must identify an active ignore rule for the corresponding real local file.

The following commands must return a non-zero exit status because the example files must **not** be ignored:

```text
git check-ignore -q infra/.env.example
git check-ignore -q frontend/.env.local.example
```

At BUILD review, once the example files are committed/tracked, this must also succeed:

```text
git ls-files --error-unmatch infra/.env.example frontend/.env.local.example
```

If a nested `.gitignore` exists, it must not override this contract by hiding either example file.

## 33. Clean-database migration verification

In addition to Testcontainers automation, BUILD review must perform one explicit local clean-database verification using the Compose service.

Procedure:

1. Create `infra/.env` from `infra/.env.example` and replace the password placeholder with a local-only password.
2. Ensure no application depends on existing local database contents.
3. From repository root, remove the Phase 1 local Compose database and its named volume:

```text
docker compose --env-file infra/.env -f infra/compose.yaml down -v
```

4. Start a fresh database:

```text
docker compose --env-file infra/.env -f infra/compose.yaml up -d db
```

5. Confirm Compose reports the database service healthy:

```text
docker compose --env-file infra/.env -f infra/compose.yaml ps
```

6. Start the backend with `AEVUM_DB_PASSWORD` matching `infra/.env`. The backend must start successfully and Flyway must apply `V1__enable_vector_extension.sql` automatically.
7. Query the fresh database and verify the `vector` extension exists and reports **0.8.6**.
8. Verify Flyway schema history exists.
9. Verify there are no Aevum product/domain tables.
10. Call `GET http://localhost:8080/api/system/status` and verify the exact HTTP 200 READY DTO.

Failure of any item above blocks Phase 1 verification.

## 34. Manual end-to-end smoke-test procedure

The final BUILD review must perform the following vertical smoke test from a clean or known-reset local setup.

### 34.1 Prerequisites

Developer machine has:

- Node.js 24.21.0;
- npm 11.19.0;
- JDK 25;
- Docker with Compose v2;
- Git checkout of the candidate Phase 1 BUILD.

Maven does not need a separate global installation because the Maven Wrapper is required.

### 34.2 Prepare configuration

1. Copy `infra/.env.example` to `infra/.env`.
2. Replace only the password placeholder with a local password.
3. Copy `frontend/.env.local.example` to `frontend/.env.local`.
4. From repository root, verify `git check-ignore -v infra/.env` and `git check-ignore -v frontend/.env.local` both report active ignore rules.
5. Verify `git check-ignore -q infra/.env.example` and `git check-ignore -q frontend/.env.local.example` each return non-zero because the example files are not ignored.
6. Ensure `NEXT_PUBLIC_AEVUM_API_BASE_URL=http://localhost:8080`.
7. Export/set `AEVUM_DB_PASSWORD` for the backend to the same local password.
8. Leave default ports/origins unchanged for the baseline smoke test.

### 34.3 Start database

From repository root:

```text
docker compose --env-file infra/.env -f infra/compose.yaml up -d db
```

Verify `db` becomes healthy.

### 34.4 Start backend

POSIX:

```text
cd backend
./mvnw spring-boot:run
```

Windows:

```text
cd backend
mvnw.cmd spring-boot:run
```

Expected:

- Spring Boot starts on `http://localhost:8080`;
- Flyway migration succeeds;
- no credential value is printed deliberately;
- `GET http://localhost:8080/api/system/status` returns HTTP 200 with:

```json
{
  "status": "READY",
  "database": "UP",
  "pgvector": "AVAILABLE"
}
```

### 34.5 Start frontend

In another terminal:

```text
cd frontend
npm ci
npm run dev
```

Open:

```text
http://localhost:3000
```

Expected browser behavior:

1. The page renders Aevum's minimal foundation/status screen.
2. It briefly shows **Checking application foundation…** while the request is pending.
3. It resolves to **Application foundation ready**.
4. The page remains free of domain dashboards/features and raw infrastructure diagnostics.

### 34.6 Backend-unavailable behavior

With the frontend still running:

1. stop the backend;
2. refresh `http://localhost:3000`;
3. verify the frontend does not crash;
4. verify it reaches **Application foundation unavailable** within the configured request timeout;
5. verify no raw fetch exception or stack trace is shown.

Restart the backend before continuing.

### 34.7 Database-unavailable behavior

With backend and frontend initially healthy:

1. stop only the database service:

```text
docker compose --env-file infra/.env -f infra/compose.yaml stop db
```

2. call `GET http://localhost:8080/api/system/status` while the backend process remains running;
3. verify it returns HTTP 503 with the database-unavailable DTO rather than an internal stack trace;
4. refresh the frontend and verify it displays **Application foundation unavailable**;
5. restart the database:

```text
docker compose --env-file infra/.env -f infra/compose.yaml start db
```

6. after the database is healthy, verify the status endpoint and frontend can return to READY without changing application code or configuration. Restarting the backend is acceptable only if the connection pool cannot recover cleanly; if a backend restart is required, record that as an observed Phase 1 behavior in `docs/PROGRESS.md` rather than hiding it.

### 34.8 Smoke-test evidence

BUILD review must record in `docs/PROGRESS.md`:

- frontend static/build command results;
- backend `clean verify` result;
- clean-database migration verification result;
- observed PostgreSQL major version;
- observed pgvector version;
- successful READY endpoint result;
- frontend READY result;
- backend-unavailable frontend result;
- database-unavailable status/frontend result;
- any deviation or known local-development limitation.

## 35. Acceptance criteria

Implementation Phase 1 is accepted only when **all** of the following are true:

1. `docs/implementation/PHASE-01.md` is the active implementation contract and the BUILD stays within its approved PLAN/SPEC scope.
2. Frontend uses Node.js 24.21.0 LTS, npm 11.19.0, Next.js 16.3.3, React 19.2.8, and TypeScript 6.0.2 through the exact npm alias `"typescript": "npm:@typescript/typescript6@6.0.2"`; TypeScript 7.x is not installed for Phase 1.
3. Backend uses JDK 25, Spring Boot 4.1.1, and Maven Wrapper pinned to Maven 3.9.16.
4. The application structure matches the responsibility and file/package structure defined by this SPEC without speculative future-domain modules.
5. `npm ci` succeeds from the committed frontend lockfile.
6. `npm run lint` passes.
7. `npm exec -- tsc6 --version` reports `Version 6.0.2`, `require('typescript').version` resolves to `6.0.2`, and `npm run typecheck` passes using `tsc6 --noEmit`.
8. `npm run build` passes with valid local API-base configuration.
9. `mvnw clean verify` / `./mvnw clean verify` passes with Docker available.
10. Backend integration tests use a real PostgreSQL 18 + pgvector 0.8.6 Testcontainers environment and exercise the running application-owned status endpoint through the HTTP layer.
11. A clean database causes Flyway to apply the Phase 1 migration automatically during backend startup.
12. pgvector is enabled through migration control and reports extension version 0.8.6.
13. No Aevum product/domain tables, vector columns, embedding metadata, vector indexes, or seed data are introduced.
14. No JPA/Hibernate dependency is introduced.
15. `GET /api/system/status` returns the exact READY DTO with HTTP 200 when backend, database, and pgvector foundation are healthy.
16. The status endpoint returns the exact database-unavailable DTO with HTTP 503 when a live backend cannot reach PostgreSQL.
17. A real integration test removes the `vector` extension from the migrated Testcontainers database, calls the running `GET /api/system/status` endpoint over HTTP, verifies the exact NOT_READY/UP/UNAVAILABLE DTO with HTTP 503, and then safely restores the extension and verifies READY behavior; the mutation must be isolated from any concurrent test sharing that database.
18. The frontend root page initially presents the loading state and resolves to the READY state against a healthy backend.
19. Backend/network/CORS/non-2xx/invalid-status failures resolve to the frontend unavailable state without crashing the page or exposing raw errors.
20. Frontend backend location is driven only through `NEXT_PUBLIC_AEVUM_API_BASE_URL`, not hard-coded into components.
21. Local CORS allows the configured frontend origin and does not use `*` or credentialed CORS.
22. The root `.gitignore` ignores at minimum `infra/.env` and `frontend/.env.local`; `git check-ignore` proves both real local files are ignored; `infra/.env.example` and `frontend/.env.local.example` remain unignored and trackable; real passwords/config overrides are excluded from Git and committed examples contain only placeholders or safe localhost values.
23. Frontend and backend can run natively while only PostgreSQL/pgvector is managed by Docker Compose.
24. The clean-database migration verification procedure passes after removing the local database volume.
25. The complete manual browser → frontend → backend → PostgreSQL + pgvector smoke test passes.
26. Backend-unavailable and database-unavailable smoke behavior is verified and documented.
27. No authentication, user-account, Goal, Pursuit, Memory, Journal, Chat, AI, embedding, RAG, agent, production-deployment, queue, cache, microservice, or other PLAN non-goal is implemented.
28. No empty placeholder module for a deferred feature is added.
29. `README.md` contains accurate Phase 1 local setup/start/verification instructions after BUILD.
30. `docs/PROGRESS.md` records actual implementation and verification results before Phase 1 can be VERIFIED/CLOSED.
31. Any implementation-time discovery that would change a durable cross-project decision is surfaced and documented rather than silently embedded in code.
32. No unresolved BUILD-blocking ambiguity remains against this SPEC at the time the phase is marked `READY_FOR_BUILD`.

## 36. Definition of Done

Implementation Phase 1 is Done only when:

- all 32 acceptance criteria pass;
- the frontend project is committed with a reproducible npm lockfile;
- the backend project is committed with Maven Wrapper support;
- PostgreSQL/pgvector local infrastructure is reproducible through `infra/compose.yaml`;
- Flyway controls the database foundation from an empty database;
- pgvector capability is enabled without any semantic/vector feature behavior;
- the exact status API contract is implemented and verified;
- the frontend loading/ready/unavailable behavior is implemented and manually verified;
- the aliased TypeScript 6 compiler and package API both report version 6.0.2, and frontend lint, `tsc6 --noEmit` typecheck, and production build pass;
- backend automated tests and real Testcontainers integration verification pass, including both the healthy READY path and the real pgvector-extension-absent HTTP 503 path with safe state restoration/isolation;
- the manual clean-database migration check passes;
- the manual end-to-end smoke test passes;
- backend and database dependency-unavailable behavior is verified;
- the root `.gitignore` contract is verified: `infra/.env` and `frontend/.env.local` are ignored while both committed example files remain trackable, and no real secrets are committed;
- all approved non-goals remain absent;
- no speculative future architecture is added;
- `README.md` reflects the real local-development workflow that was actually verified;
- `docs/PROGRESS.md` reflects actual BUILD/review evidence and known limitations;
- `docs/DECISIONS.md` and architecture docs are updated only if BUILD establishes a genuinely durable new fact;
- the Aevum PSB Guide reviews the implemented result before the phase is marked VERIFIED or CLOSED.

## 37. SPEC-resolved decisions summary

The PLAN's BUILD-blocking questions are resolved as follows:

| PLAN question | SPEC resolution |
|---|---|
| Node.js version | 24.21.0 LTS |
| Next.js version | 16.3.3 |
| TypeScript version | 6.0.2 via `"typescript": "npm:@typescript/typescript6@6.0.2"`; compiler command `tsc6` |
| Frontend package manager | npm 11.19.0 + committed `package-lock.json` |
| JDK | Java/JDK 25 LTS |
| Spring Boot | 4.1.1 |
| Maven vs Gradle | Maven 3.9.16 via Maven Wrapper |
| Frontend routing | Next.js App Router with `src/app` |
| Frontend styling | Plain global CSS only |
| Frontend test runner | None in Phase 1; static/build + manual verification |
| Backend namespace | `com.aevum` |
| Backend organization | One Spring Boot modular monolith; `config` + Phase-1-only `system` capability package |
| ORM | None; Spring JDBC only |
| Actuator | Not used |
| PostgreSQL | Major 18; reference current minor 18.6 |
| pgvector | 0.8.6 |
| Local DB image | `pgvector/pgvector:0.8.6-pg18-bookworm` |
| Local orchestration | Docker Compose v2; DB only |
| Database name | `aevum` by default |
| Schema | PostgreSQL `public` for Phase 1 |
| Migration tool | Flyway |
| Initial migration | `V1__enable_vector_extension.sql`; vector extension only |
| Status endpoint | `GET /api/system/status` |
| Success | HTTP 200 + exact READY/UP/AVAILABLE DTO |
| Database failure | HTTP 503 + exact NOT_READY/DOWN/UNKNOWN DTO |
| pgvector failure | HTTP 503 + exact NOT_READY/UP/UNAVAILABLE DTO |
| Frontend port | 3000 |
| Backend port | 8080 |
| PostgreSQL port | 5432 |
| Frontend API variable | `NEXT_PUBLIC_AEVUM_API_BASE_URL` |
| CORS | Exact configured local frontend origin; GET only; no credentials; no wildcard |
| Backend environment | `AEVUM_DB_*`, `AEVUM_BACKEND_PORT`, `AEVUM_ALLOWED_ORIGIN` as defined above |
| Frontend behavior | loading → ready or unavailable; 5-second request timeout; no polling/retry system |
| DB readiness | Queryable PostgreSQL plus installed `vector` extension required |
| Backend test strategy | Spring tests + real pgvector Testcontainers integration; healthy READY and real extension-absent 503 behavior verified over HTTP with safe restoration/isolation |
| Clean migration verification | Compose `down -v` → fresh DB → backend Flyway startup → extension/history/no-domain-table checks |
| Repository ignore contract | Root `.gitignore` ignores `infra/.env` and `frontend/.env.local`; examples remain trackable; verified with `git check-ignore`/`git ls-files` |
| E2E smoke | Browser → Next.js → status API → PostgreSQL/pgvector, plus dependency-unavailable checks |

## 38. Remaining unresolved items

There are **no known BUILD-blocking implementation questions inside the approved Phase 1 scope** after this SPEC.

The following remain deliberately unresolved because they are outside Phase 1 and must not be decided during BUILD:

- authentication and authorization;
- user/account model;
- product-domain data model;
- Goals/Pursuits/Activities/Projects behavior;
- Memories/Memory Engine;
- Journal/Chat/Timeline/StoryOfMe;
- AI provider/model selection;
- embedding provider/model/dimensionality;
- vector columns/index/query strategy;
- RAG/retrieval/agents/tools;
- synchronization;
- cache/queue/background jobs;
- production deployment/hosting;
- production secrets management;
- backup/recovery;
- production observability/telemetry;
- complex CI/CD;
- local-versus-cloud product boundary.

These are deferred work, not permission for Codex to invent implementation during Phase 1.

## 39. SPEC approval and BUILD readiness state

The Aevum PSB Guide has approved this SPEC. The approved PLAN and approved SPEC together form the canonical implementation contract for **Implementation Phase 1 — Executable Application Foundation**.

Current state:

- PLAN: `PLAN_APPROVED`
- SPEC: `SPEC_APPROVED`
- Build eligibility: `READY_FOR_BUILD`
- BUILD: `NOT_STARTED`

`READY_FOR_BUILD` means the phase is eligible to enter BUILD. It does not mean implementation has started. Codex may begin implementation only when explicitly instructed to start the approved BUILD. Until that instruction is given and Codex actually begins implementation, the phase must not be marked `BUILDING`.

## 40. SPEC Approval Record — Aevum PSB Guide

The following review checklist was satisfied when the Aevum PSB Guide approved the SPEC:

- [x] The SPEC remains inside the approved PLAN boundary: executable local foundation only.
- [x] The phase name remains **Implementation Phase 1 — Executable Application Foundation**.
- [x] PLAN is `PLAN_APPROVED`, SPEC is `SPEC_APPROVED`, Build eligibility is `READY_FOR_BUILD`, and BUILD remains `NOT_STARTED` until Codex is explicitly instructed to begin.
- [x] Node.js 24.21.0 LTS and npm 11.19.0 are acceptable frontend runtime/package-manager baselines.
- [x] Next.js 16.3.3 and React 19.2.8 are acceptable pinned frontend versions.
- [x] TypeScript 6.0.2 is correctly specified through the npm alias `"typescript": "npm:@typescript/typescript6@6.0.2"`, with tools importing `typescript` resolving that aliased API.
- [x] The Phase 1 typecheck command is correctly fixed to `tsc6 --noEmit`, with verification that both the compiler and imported `typescript` API report 6.0.2.
- [x] TypeScript 7.x remains explicitly excluded from Phase 1.
- [x] JDK 25 LTS is acceptable as the supported Java baseline.
- [x] Spring Boot 4.1.1 is acceptable.
- [x] Maven 3.9.16 via Maven Wrapper is approved instead of Gradle.
- [x] The exact frontend file structure is small, reusable, and free of speculative domain architecture.
- [x] The root `.gitignore` explicitly protects `infra/.env` and `frontend/.env.local`, while `infra/.env.example` and `frontend/.env.local.example` remain trackable.
- [x] The `git check-ignore` / `git ls-files` verification contract is sufficient to prove the local secret/config files are ignored and examples remain committed.
- [x] App Router + `src/` + ESLint + plain CSS + no Tailwind/component library is acceptable.
- [x] No dedicated frontend unit-test runner is acceptable for this narrow foundation screen.
- [x] The backend package namespace `com.aevum` is acceptable.
- [x] The Phase-1-only backend organization (`config` + `system`) adequately respects the modular-monolith direction without over-engineering.
- [x] Spring JDBC without JPA/Hibernate is sufficient for this phase.
- [x] Not adding Actuator or Spring Security is acceptable and consistent with scope.
- [x] PostgreSQL 18.x / reference 18.6 and pgvector 0.8.6 are acceptable development baselines.
- [x] `pgvector/pgvector:0.8.6-pg18-bookworm` is acceptable as the local/Testcontainers image family.
- [x] Docker Compose should manage only PostgreSQL/pgvector; frontend/backend remain native development processes.
- [x] Flyway is approved as the migration tool.
- [x] `V1__enable_vector_extension.sql` enabling only pgvector is the correct initial migration boundary.
- [x] Keeping the default `public` schema in Phase 1 is acceptable.
- [x] No Aevum domain tables or vector columns are allowed in Phase 1.
- [x] `GET /api/system/status` is the approved application-owned status route.
- [x] The READY / database-down / pgvector-unavailable HTTP status and DTO contracts are sufficiently explicit.
- [x] Database readiness correctly requires both queryable PostgreSQL and an installed `vector` extension.
- [x] Frontend 3000, backend 8080, and PostgreSQL 5432 are acceptable local defaults.
- [x] `NEXT_PUBLIC_AEVUM_API_BASE_URL` is the approved frontend API-base variable.
- [x] The exact-origin, GET-only, non-credentialed local CORS policy is acceptable.
- [x] Backend environment-variable names/defaults and example-file conventions are acceptable.
- [x] The frontend loading/ready/unavailable messages and 5-second request timeout are acceptable.
- [x] The automated frontend verification commands are sufficient for Phase 1.
- [x] The backend JUnit/Spring Boot + Testcontainers test strategy is sufficient.
- [x] The pgvector-unavailable path is integration-tested against the real migrated Testcontainers service by removing the `vector` extension, asserting exact HTTP 503 NOT_READY/UP/UNAVAILABLE behavior, and safely restoring or isolating database state afterward.
- [x] The clean-database `down -v` migration verification is explicit and safe for the Phase 1 local database.
- [x] The manual end-to-end smoke procedure proves browser → frontend → backend → PostgreSQL + pgvector.
- [x] Dependency-unavailable behavior is adequately tested without adding recovery/observability infrastructure.
- [x] All 32 acceptance criteria are testable and remain within scope.
- [x] The Definition of Done is sufficient to support later VERIFIED/CLOSED review.
- [x] All original PLAN non-goals remain preserved: no authentication, users, Goals, Pursuits, Memories, Journal, Chat, AI, embeddings, RAG, agents, production deployment, queues, caches, microservices, or speculative placeholders.
- [x] No BUILD-blocking question remains inside Implementation Phase 1.
- [x] The READY_FOR_BUILD repository checkpoint records SPEC approval and `READY_FOR_BUILD` without marking the phase `BUILDING`; implementation begins only after an explicit Codex BUILD-start instruction.

