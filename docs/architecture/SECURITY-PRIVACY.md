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

## Not finalized in Baseline v1

- authentication provider/mechanism;
- authorization model and roles;
- local-versus-cloud data boundary;
- encryption-at-rest implementation;
- backup and recovery policy;
- data-export and account-deletion workflows;
- telemetry policy;
- external AI provider data-retention configuration.
