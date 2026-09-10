# Implementation Phase 2 — Identity & Ownership Foundation

PLAN status: `PLAN_APPROVED`  
SPEC status: `NOT_STARTED`  
Build eligibility: `NOT_READY_FOR_BUILD`  
BUILD status: `NOT_STARTED`

Depends on: **Implementation Phase 1 — Executable Application Foundation (`CLOSED`)**

> The Aevum PSB Guide has approved this PLAN. It defines the Phase 2 scope boundary, dependencies, non-goals, inherited constraints, and intended outcome. PLAN approval does not authorize BUILD. A detailed SPEC must still be prepared and approved before this phase may become `READY_FOR_BUILD`.

---

# PLAN — Approved

## 1. Phase purpose

Establish the minimum deterministic identity, authentication, and ownership foundation required before Aevum begins storing real user-owned personal life data.

Implementation Phase 1 proved that the executable application foundation works:

```text
Next.js + TypeScript
  ↓
NestJS + TypeScript
  ↓
PostgreSQL + pgvector
```

Implementation Phase 2 should now make that foundation capable of answering one essential application question safely:

> **Who is the current Aevum user, and how does the backend know which durable records belong to that user?**

This phase does **not** introduce Aevum's first personal-content domain. It establishes the security and ownership prerequisite those domains require.

## 2. Why this phase should come next

Aevum's likely first product domains—Goals, Pursuits, Journal, Memories, Conversations, and personal settings—contain personal information.

The repository already establishes several constraints that make ownership a prerequisite rather than optional later hardening:

- features handling personal information must account for authentication and authorization;
- protected-resource authorization is enforced by the server rather than trusted to the frontend;
- authentication implementation is an unresolved architecture area that must be resolved before protected user data is implemented;
- historical Aevum design requires major user-owned records to be directly scoped by `user_id`;
- cross-user relationships and provenance should be structurally difficult or impossible;
- AI, retrieval, and tools may never be the authority for authentication, authorization, or user ownership.

Therefore, jumping directly to Goal, Journal, Memory, or Chat persistence would force those domains either to:

1. store personal data without a proper owner boundary; or
2. invent a temporary identity mechanism that would later require migration.

Implementation Phase 2 removes that blocker first.

## 3. Candidate comparison

### Candidate A — Identity & Ownership Foundation

**Strengths**

- resolves the explicit authentication prerequisite before personal data;
- creates the stable owner boundary required by later domain records;
- establishes deterministic server-side user context once rather than reinventing it in every domain;
- remains small if limited to one identity flow and one current-user capability;
- unlocks several later product slices independently.

**Risk**

Authentication can become large if this phase expands into complete account management. The PLAN therefore strictly excludes profile systems, roles, MFA, account recovery, organization/team concepts, and broad identity-provider support.

**Decision:** **SELECTED.**

### Candidate B — Minimal Goal creation

A Goal is a good early Aevum product capability, but it is durable personal information. Historical design expects Goals to be directly owner-scoped.

**Decision:** defer until an authenticated ownership boundary exists.

### Candidate C — Minimal Journal capture

Journal content is even more clearly sensitive personal data and requires authentication, authorization, logging, storage, and deletion considerations from the beginning.

**Decision:** defer until an authenticated ownership boundary exists.

### Candidate D — Memory / Memory Engine foundation

Memory requires user ownership plus provenance, lifecycle rules, correction semantics, later embedding behavior, and eventually AI/retrieval boundaries.

**Decision:** too dependency-heavy for the immediate next slice.

### Candidate E — Product shell/navigation only

A small application shell could safely precede personal data, but it would not resolve the main architectural blocker for meaningful product work.

**Decision:** not enough leverage to justify an independent Phase 2 ahead of identity/ownership.

## 4. Primary outcome

At the end of this phase, Aevum should have a minimal real identity boundary such that:

```text
User
  ↓
one supported authentication path
  ↓
Aevum frontend session state
  ↓
authenticated request
  ↓
NestJS derives trusted authenticated principal
  ↓
Aevum user/account identity in PostgreSQL
```

The application should be able to distinguish:

```text
Unauthenticated visitor
vs
Authenticated Aevum user
```

and the backend should have a stable Aevum user identifier that future user-owned domain services can derive from authenticated request context.

This phase should prove the identity/ownership foundation, not yet prove Goal, Journal, Memory, Chat, or other product behavior.

## 5. Exact PLAN scope

Implementation Phase 2 may establish only the following capabilities.

### 5.1 One supported authentication flow

Provide one coherent way for a person to authenticate to the local/current Aevum application.

The exact authentication mechanism/provider is a SPEC-stage decision.

The resulting flow must be sufficient to prove:

- unauthenticated state;
- authentication;
- authenticated state;
- session continuity appropriate to the selected mechanism;
- sign-out;
- loss/expiry/invalidity of authentication state.

This PLAN does not require multiple sign-in methods.

### 5.2 Stable Aevum user identity

Introduce the minimum durable account/identity representation required for Aevum to assign a stable internal user identifier.

The application must not make an external provider's mutable display name or email address the universal ownership key for future domain data.

The internal Aevum user identity becomes the future ownership anchor.

### 5.3 Trusted backend principal

NestJS must gain a reusable authenticated-request boundary that can answer:

```text
current authenticated Aevum user ID
```

The trusted user ID must be derived from validated authentication/session context.

Future domain APIs must be able to consume this authenticated principal without accepting arbitrary ownership identifiers supplied by the client.

### 5.4 Minimal current-user capability

Provide one minimal authenticated application capability conceptually equivalent to:

```text
Who am I?
```

Its purpose is to prove the full identity path:

```text
frontend
→ authentication/session
→ backend verification
→ internal Aevum user mapping
→ safe current-user response
```

The exact endpoint, DTO, route, UI wording, and fields are SPEC-stage decisions.

### 5.5 Protected frontend boundary

The frontend may establish only the minimal authenticated/unauthenticated application boundary needed to exercise Phase 2.

It may include:

- an unauthenticated sign-in entry;
- authenticated application state;
- a minimal protected foundation/current-user view;
- sign-out;
- understandable authentication failure/expired-session behavior.

It must not become the full Aevum dashboard or navigation architecture.

### 5.6 Ownership foundation for future domains

Establish a reusable rule:

> User-owned application records are scoped from the authenticated Aevum user identity, not from client-selected `user_id` values.

This phase need not create Goal, Journal, Memory, or other domain tables merely to demonstrate ownership.

Ownership should be proven at the identity/account boundary and through tests of authenticated principal derivation.

## 6. Explicit non-goals

Implementation Phase 2 must **not** implement the following.

### 6.1 Product domains

- Goals;
- Pursuits;
- Activities;
- Projects;
- Journal;
- Memories or Memory Engine;
- Conversations or Chat;
- Messages;
- Today;
- Timeline;
- Search;
- StoryOfMe;
- Insights/reflections;
- tasks/todos;
- personal-content capture.

### 6.2 Expanded account management

- rich user profiles;
- avatars;
- biographies;
- arbitrary personal profile facts;
- account preferences unrelated to authentication;
- user timezone settings unless technically required by the chosen authentication mechanism;
- organizations;
- teams;
- workspaces/tenants;
- invitations;
- admin user management;
- roles/permission matrices;
- RBAC/ABAC frameworks;
- impersonation;
- account switching;
- multiple linked identity providers.

### 6.3 Advanced authentication/security features

Unless the selected SPEC mechanism inherently requires them, Phase 2 does not require:

- MFA;
- passkeys;
- password reset/recovery;
- email verification workflows;
- phone verification;
- social-provider matrix;
- enterprise SSO;
- SCIM;
- production anti-abuse infrastructure;
- production-grade bot detection;
- production deployment/security perimeter.

If a chosen auth mechanism requires a narrow supporting behavior, SPEC must justify it rather than treating the list above as permission to broaden scope.

### 6.4 AI and semantic capabilities

- AI provider integration;
- LLM calls;
- prompts;
- embeddings;
- vector persistence/search;
- RAG;
- retrieval;
- agents;
- AI tools;
- memory extraction;
- AI-generated account/profile information.

### 6.5 Infrastructure expansion

- microservices;
- queues;
- caches;
- background-worker platform;
- object storage;
- production deployment;
- synchronization;
- complex CI/CD;
- observability platform;
- billing/subscriptions.

## 7. Dependency on Implementation Phase 1

Implementation Phase 2 inherits the accepted executable foundation from closed Phase 1.

It must reuse rather than replace:

- the pnpm workspace;
- the Next.js + TypeScript frontend;
- the NestJS + TypeScript backend;
- PostgreSQL;
- migration-controlled schema changes;
- the modular-monolith backend direction;
- existing configuration/environment conventions where applicable;
- existing frontend/backend communication patterns where applicable;
- the existing testing and verification foundation;
- the existing database container/development setup.

Phase 2 must not re-platform, restructure, or re-decide Phase 1 unless an actual compatibility defect is discovered through PSB review.

The existing system-status capability remains a foundation capability and should not be converted into an authentication endpoint.

## 8. Inherited product decisions

Implementation Phase 2 inherits these product principles:

- Aevum is a general-purpose personal organizational intelligence system.
- It is life-first, not developer/project-first.
- Authentication exists to protect the user's personal system; it is not itself the product's primary experience.
- Account identity must remain separate from evolving personal context.
- A giant user-profile record is not the place to store arbitrary facts about the person.
- Future Goals, Pursuits, Memories, Journal entries, and other personal objects belong to the authenticated user.
- AI must never invent, choose, or override user identity.
- Future user-facing terminology should stay natural and understandable.

## 9. Inherited architecture decisions

Phase 2 inherits:

```text
Next.js + TypeScript
  ↓
NestJS + TypeScript
  ↓
PostgreSQL + pgvector
```

and:

- initial modular-monolith architecture;
- thin transport/controller boundaries;
- reusable backend application/service responsibilities;
- PostgreSQL as the system of record;
- migration-controlled schema changes;
- server-enforced authorization for protected resources;
- secrets outside source control;
- no premature microservices or infrastructure;
- deterministic application code owns authentication, authorization, data ownership, persistence rules, and validation.

pgvector remains present from Phase 1 but has no role in authentication or ownership.

## 10. Frontend responsibilities

The Phase 2 frontend is responsible only for the minimum identity experience.

It should:

- represent unauthenticated versus authenticated state;
- initiate the selected authentication flow;
- maintain/use session state according to the SPEC-selected mechanism;
- access the minimal protected/current-user capability;
- provide sign-out;
- handle unauthenticated, expired, invalid, or unavailable authentication state safely;
- avoid trusting frontend state as proof of authorization;
- avoid storing server secrets or privileged credentials in browser-exposed configuration.

The frontend must not:

- decide what user ID owns backend data;
- authorize protected operations by itself;
- expose a user-ID selector;
- create a full account/profile settings area;
- create a full application dashboard merely to house authentication.

## 11. Backend responsibilities

The NestJS backend should gain one coherent identity/authentication module boundary within the modular monolith.

At PLAN level, responsibilities include:

- validate/verify authentication according to the SPEC-selected mechanism;
- resolve authenticated request context to one stable Aevum user identity;
- create or reconcile the minimum Aevum account identity when appropriate to the selected flow;
- expose the minimal current-user capability;
- reject protected requests that lack valid authentication;
- make authenticated Aevum user identity reusable by later domain services;
- ensure ownership identity comes from server-validated context;
- never trust arbitrary client `user_id` values as authorization.

The backend must not implement Goal, Journal, Memory, Chat, or other domain logic in this phase.

## 12. Database responsibilities

Phase 2 may introduce only identity/authentication persistence required by the chosen SPEC mechanism.

The durable model should provide:

- a stable internal Aevum user identifier;
- only the identity fields necessary for authentication/account mapping;
- timestamps/lifecycle metadata only where required for correct account/authentication behavior;
- authentication/session/provider-related tables only if required by the selected mechanism;
- migration-controlled creation and rollback behavior;
- constraints that prevent ambiguous or duplicate identity mapping where applicable.

The PLAN does **not** approve:

- Goal tables;
- Pursuit tables;
- Journal tables;
- Memory tables;
- Message/Conversation tables;
- embedding tables;
- generic profile-fact tables;
- role/permission tables unless SPEC proves a concrete Phase 2 requirement.

The exact schema belongs in SPEC.

## 13. Ownership rule established by this phase

The most important reusable invariant from Phase 2 is:

> **Authenticated application context determines the Aevum owner.**

Future user-owned records should follow a direction equivalent to:

```text
request
→ validate authentication
→ derive Aevum user ID
→ application/domain service
→ owner-scoped persistence/query
```

not:

```text
request body/query parameter contains user_id
→ trust that value
→ read/write personal data
```

A future domain may carry `user_id` in its database row for structural ownership, but the authorized owner value must come from trusted application context.

## 14. Privacy and security implications

This phase introduces the first real identity/security boundary, so privacy/security review is central even though it does not yet store substantive personal-life content.

PLAN-level requirements:

- authentication verification occurs server-side for protected backend capabilities;
- user ownership is deterministic application logic;
- frontend route protection is UX, not the authoritative security boundary;
- authentication/session secrets and provider credentials remain server-side;
- credentials/tokens/session identifiers must not be unnecessarily logged;
- account identity responses expose only fields required by the Phase 2 UX;
- errors must not leak credentials, provider secrets, token contents, or internal stack traces;
- the chosen mechanism must address relevant CSRF, session/token integrity, cookie/storage, and transport assumptions during SPEC;
- local-development behavior must not be presented as a production security guarantee;
- no external AI provider receives authentication or account context in this phase;
- no arbitrary personal profile information should be collected simply because a user table now exists.

### Deletion/retention boundary

Full account deletion/export remains out of Phase 2 unless the chosen authentication mechanism technically requires a narrow identity cleanup behavior.

However, SPEC must define what happens to Phase 2 identity/session records on sign-out, expiry, revocation, or test cleanup so the phase does not leave lifecycle behavior ambiguous.

## 15. Testing and verification direction

The detailed test suite belongs in SPEC, but Phase 2 must ultimately prove the following behaviors.

### Authentication lifecycle

Verify:

- unauthenticated state is recognized;
- the supported authentication flow succeeds;
- authenticated state persists as designed;
- sign-out invalidates or ends the applicable session state;
- invalid/expired authentication is rejected safely.

### Backend authorization boundary

Verify:

- protected current-user capability rejects unauthenticated requests;
- authenticated requests resolve to the correct Aevum user;
- client input cannot arbitrarily select another Aevum user identity;
- two test identities resolve to distinct internal users;
- the backend—not frontend state—determines the authenticated principal.

### Database identity integrity

Verify:

- migrations create only the approved Phase 2 identity/authentication schema;
- identity mappings are structurally unambiguous;
- repeated authentication for the same identity does not accidentally create duplicate Aevum users;
- separate test identities do not collapse into one internal user;
- clean-database migration works.

### Frontend behavior

Verify:

- unauthenticated entry state is understandable;
- successful authentication reaches the minimal protected experience;
- refresh/session continuity behaves as specified;
- sign-out returns to unauthenticated state;
- expired/invalid authentication produces safe behavior;
- backend/auth unavailability does not expose raw internal errors.

### Regression

Phase 1 foundation verification must continue to pass unless SPEC intentionally updates an affected verification contract.

## 16. Documentation expected to be affected

If this PLAN later passes SPEC and BUILD, the implementation cycle will likely update:

- `docs/implementation/PHASE-02.md`;
- `docs/PROGRESS.md`;
- `docs/implementation/README.md`;
- `README.md` for actual local authentication/setup instructions if needed;
- `docs/DECISIONS.md` because D-103 authentication implementation will be resolved by the approved SPEC/BUILD;
- `docs/architecture/SECURITY-PRIVACY.md` if the selected authentication mechanism establishes durable architecture facts;
- `docs/ARCHITECTURE.md` only if a durable cross-project authentication boundary needs to be promoted;
- database/data documentation only for durable identity/ownership schema principles established by the final implementation.

Historical `docs/phases/` should not be rewritten as executable requirements.

Implementation Phase 1 remains closed and must not be modified.

## 17. Decisions deferred to SPEC

The following are BUILD-blocking implementation choices and must be explicitly resolved before Phase 2 may become `READY_FOR_BUILD`.

### Authentication mechanism

SPEC must choose:

- authentication approach/provider;
- whether identity is first-party credential based, external-provider based, or another justified mechanism;
- exact sign-in/sign-out flow;
- whether registration/provisioning is explicit or occurs as part of first successful authentication;
- exact session/token model;
- session duration/expiry behavior;
- revocation/sign-out semantics.

The PLAN does not prefer a provider by brand.

### Frontend authentication integration

SPEC must define:

- exact routes/screens;
- client/server responsibility split in Next.js;
- session-loading behavior;
- route/protected-content behavior;
- failure states;
- sign-in/sign-out interaction;
- browser storage/cookie behavior where applicable.

### Backend identity integration

SPEC must define:

- exact NestJS module structure;
- authentication guard/middleware/interceptor strategy;
- trusted principal/request-context representation;
- current-user endpoint/method/DTO;
- authentication error contract;
- mapping from verified external/credential identity to internal Aevum user;
- whether authorization helpers/policies beyond authenticated-owner context are necessary.

### Database

SPEC must define:

- exact user/account tables;
- identity/provider/session tables if required;
- UUID generation;
- unique constraints;
- indexes;
- migrations;
- timestamps/lifecycle fields;
- deletion/cleanup behavior within Phase 2 scope;
- transaction requirements for first-login provisioning or identity reconciliation.

### Security

SPEC must define as applicable:

- password hashing if first-party credentials are selected;
- cookie attributes;
- CSRF protections;
- token verification;
- OAuth/OIDC state/PKCE/nonce handling if applicable;
- secret/environment-variable names;
- local redirect/origin allowlists;
- safe error/logging rules;
- brute-force/rate-limiting scope if credentials are handled directly;
- exact transport assumptions for local development.

### Verification

SPEC must define:

- unit tests;
- backend integration tests;
- authentication-provider/mechanism test strategy;
- database integration tests;
- browser/manual or automated end-to-end flow;
- exact verification commands;
- acceptance criteria;
- Definition of Done.

## 18. Later capabilities unlocked

A successful Phase 2 should unblock independently scoped future product phases such as:

### Minimal Goal capability

A Goal can be persisted safely with owner-scoped queries because authenticated user identity already exists.

### Minimal Journal capture

Journal entries can become durable personal records without inventing a temporary ownership model.

### Personal settings

Timezone, privacy controls, or memory settings can attach to a known user when separately scoped.

### Conversations / Chat

Conversation and Message data can be owner-scoped before AI behavior is introduced.

### Memory Engine

Sources and Memories can inherit deterministic user ownership before provenance, lifecycle, extraction, embeddings, and retrieval are implemented.

### Retrieval and AI tools

Historical architecture already requires ownership filtering before personal semantic retrieval and authenticated backend context before domain tools execute.

Phase 2 therefore unlocks product work without itself implementing those later capabilities.

## 19. Deferred work

The following remains for later PSB cycles:

- first actual personal-content domain;
- Goal/Pursuit relationships;
- Journal;
- Chat/Conversation;
- Memory Engine;
- personal settings beyond authentication requirements;
- roles/permissions beyond simple authenticated owner context;
- account profile features;
- account deletion/export;
- MFA/passkeys unless separately approved;
- multiple authentication providers;
- AI providers;
- embeddings;
- RAG/retrieval;
- agents/tools;
- queues/caches/workers;
- production deployment;
- synchronization;
- billing/teams/organizations.

## 20. Phase boundary summary

Implementation Phase 2 is **not** "build Aevum accounts and then also add Goals."

It is:

> **Establish one trustworthy authenticated Aevum user and reusable owner context so the next product domain can safely store personal data.**

The intended dependency progression is therefore:

```text
Implementation Phase 1
Executable Application Foundation
CLOSED
  ↓
Implementation Phase 2
Identity & Ownership Foundation
PLAN_APPROVED
  ↓
later independently scoped product domain
Goal OR Journal OR another reviewed first domain
```

This keeps Phase 2 small, foundational, and reusable.

## 21. PLAN approval state

Current lifecycle:

- Implementation Phase 1: `CLOSED`
- Implementation Phase 2 PLAN: `PLAN_APPROVED`
- Implementation Phase 2 SPEC: `NOT_STARTED`
- Implementation Phase 2 build eligibility: `NOT_READY_FOR_BUILD`
- Implementation Phase 2 BUILD: `NOT_STARTED`

PLAN approval does not authorize application implementation. The next PSB stage is SPEC, which remains `NOT_STARTED` at this checkpoint.

### Mandatory review conditions carried into SPEC

The Aevum PSB Guide approved this PLAN with two conditions that the future SPEC must satisfy without broadening the approved scope:

1. **Identity mapping/reconciliation boundary:** SPEC must precisely define how the selected authentication identity maps or reconciles to the stable internal Aevum user ID, including the rules that prevent ambiguous or duplicate ownership identities.
2. **Authentication-data minimization:** SPEC must not persist provider tokens, broad profile data, or other identity artifacts unless the selected authentication mechanism concretely requires them.

These are SPEC requirements derived from PLAN review; they do not select an authentication provider or mechanism.

## PLAN Approval Record — Aevum PSB Guide

The following review checklist was satisfied when the PLAN was approved:

- [x] **Implementation Phase 2 — Identity & Ownership Foundation** is the correct phase name and boundary.
- [x] Identity/ownership is the correct next dependency before any durable personal-content domain.
- [x] The PLAN does not assume historical Phase 2 equals Implementation Phase 2.
- [x] Implementation Phase 1 remains `CLOSED` and unchanged.
- [x] Phase 2 is limited to one supported authentication path and stable Aevum user identity.
- [x] A reusable server-derived authenticated principal/owner context belongs in Phase 2.
- [x] One minimal current-user capability is sufficient to prove the identity path.
- [x] A minimal protected frontend boundary is appropriate, without building the full dashboard.
- [x] The internal Aevum user ID is the future ownership anchor rather than client-selected `user_id`, display name, or mutable email.
- [x] Future user-owned domain records will derive ownership from authenticated backend context.
- [x] The database scope is limited to identity/authentication persistence required by the selected mechanism.
- [x] Goals, Pursuits, Journal, Memories, Chat, and other product domains remain excluded.
- [x] Rich profiles, organizations, teams, role matrices, MFA, broad provider support, and account-management expansion remain excluded.
- [x] AI providers, embeddings, RAG, agents, and AI tools remain excluded.
- [x] pgvector remains unrelated to Phase 2 identity behavior.
- [x] The modular-monolith architecture remains unchanged.
- [x] Server-enforced authorization remains the authoritative boundary; frontend protection is UX only.
- [x] The exact authentication provider/mechanism is correctly deferred to SPEC.
- [x] Exact session/token behavior is correctly deferred to SPEC.
- [x] Exact frontend auth integration is correctly deferred to SPEC.
- [x] Exact NestJS guard/request-context/module design is correctly deferred to SPEC.
- [x] Exact user/identity/session schema is correctly deferred to SPEC.
- [x] Exact cookie/CSRF/OAuth/password/security mechanics are correctly deferred to SPEC based on the selected mechanism.
- [x] Exact test commands, acceptance criteria, and Definition of Done are correctly deferred to SPEC.
- [x] The scope is small enough for one PLAN → SPEC → BUILD → review → commit cycle.
- [x] Phase 2 remains `NOT_READY_FOR_BUILD` until a detailed SPEC passes PSB review.

**PLAN review result:** `APPROVED`
