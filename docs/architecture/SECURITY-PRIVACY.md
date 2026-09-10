# Security and Privacy

## Purpose

Aevum is expected to handle personal life information. Security and privacy therefore form part of the architecture rather than a final hardening step.

## Baseline principles

1. **Least exposure.** Send only the data required for a feature to external systems.
2. **Explicit trust boundaries.** Each phase should identify where protected data crosses process, service, device, or provider boundaries.
3. **Server-enforced authorization.** Protected-resource authorization must not rely solely on frontend checks.
4. **Secrets remain outside source control.** Credentials and tokens must use appropriate environment/secret-management mechanisms once implementation begins.
5. **Sensitive logging is restricted.** Do not log credentials or unnecessarily log personal content, model context, or sensitive payloads.
6. **Deletion and retention matter.** Features that persist personal or generated data should specify retention/deletion behavior where required.
7. **AI data flow is explicit.** External model usage must identify what context is transmitted and what the provider/application retains.
8. **No invented privacy guarantees.** Do not describe Aevum as local-only, end-to-end encrypted, zero-retention, or offline-first unless an approved specification actually establishes that property.

## Phase security checklist

A phase handling protected or personal data should address as applicable:

- authentication;
- authorization;
- input validation;
- output exposure;
- secret handling;
- logging;
- transport security assumptions;
- storage sensitivity;
- deletion/retention;
- model/provider transmission;
- file upload/download controls;
- abuse or rate-limiting concerns.

## Approved authentication architecture

Implementation Phase 2 has an approved authentication/ownership architecture. This is an **approved architecture decision**, not a claim of completed implementation; Phase 2 BUILD remains `NOT_STARTED` at this checkpoint.

The approved boundary is:

```text
person
  ↓
one configurable standards-compliant OIDC issuer
  ↓
Authorization Code + PKCE S256 + state + nonce
  ↓
NestJS confidential relying party / authoritative backend auth boundary
  ↓
validated external identity (issuer, subject)
  ↓
stable server-generated internal Aevum UUID
  ↓
Aevum-owned opaque PostgreSQL-backed session
  ↓
trusted server-derived ownership context
```

Durable security/privacy constraints established by the approved SPEC include:

- protected Aevum APIs derive authentication and ownership from server-validated application context;
- arbitrary client-supplied `user_id` values are not an authorization/ownership source;
- exact validated `(issuer, subject)` is the external authentication reconciliation key;
- mutable attributes such as email and display name are not the ownership key;
- the stable internal Aevum UUID is the future ownership anchor;
- Aevum owns its application session rather than using provider access tokens as API authorization state;
- provider access tokens, refresh tokens, raw ID Tokens, UserInfo/profile payloads, email, display name, avatars, and broad profile data are not persisted for Phase 2;
- session/token and OIDC transaction handling follows the approved Phase 2 cookie, CSRF, expiry, retention, logging, and data-minimization contracts;
- development/test loopback HTTP OIDC is allowed only through the SPEC's narrowly validated local exception; production HTTP issuers remain rejected and HTTPS does not receive the insecure-request opt-in.

The canonical detailed contract is `docs/implementation/PHASE-02.md`.

## Not finalized in Baseline v1 / later scope

The following broader areas remain unresolved or deferred unless a later approved implementation contract resolves them:

- authorization model and roles beyond the authenticated-owner context approved for Phase 2;
- local-versus-cloud data boundary;
- encryption-at-rest implementation;
- backup and recovery policy;
- data-export and account-deletion workflows;
- telemetry policy;
- external AI provider data-retention configuration.
