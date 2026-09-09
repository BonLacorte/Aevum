# Cross-Project Requirements

This document contains requirements that apply across phases. Phase-specific behavior belongs in the corresponding file under `docs/phases/`.

## R-001 — General-purpose product model

Aevum must not require developer-oriented concepts for ordinary use. Domain concepts introduced by implementation phases must remain compatible with the general-purpose product direction.

## R-002 — Canonical repository documentation

Finalized product, architecture, roadmap, and phase decisions must be represented in repository documentation. BUILD work must not depend on undocumented conversational context.

## R-003 — Explicit AI boundaries

Features that use AI must identify:

- what information is sent to a model;
- what is retrieved from Aevum data;
- what output is generated;
- what deterministic behavior remains outside the model;
- any persistence of prompts, context, embeddings, or generated output that affects privacy or product behavior.

## R-004 — Personal-data protection

Features handling personal information must account for authentication, authorization, logging, retention, deletion, export, secrets, and external processing as applicable to their scope.

Exact mechanisms are defined by architecture decisions and phase specifications.

## R-005 — No silent requirement invention

A missing historical detail, migration gap, or ambiguous specification is not permission to invent product behavior during BUILD.

## R-006 — Reviewable implementation scope

A BUILD phase must be small enough to implement, test, review, and commit independently. Large historical planning phases may be converted into smaller implementation slices when specification work begins.

## R-007 — Testable readiness

A phase may become `READY_FOR_BUILD` only when its acceptance criteria and Definition of Done are sufficiently concrete to verify.
