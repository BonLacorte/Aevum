# Phase 1.2 — Product Model Refinement

Status: `HISTORICAL_PLAN`
Migration: `MIGRATED_AT_DECISION_LEVEL`
Build eligibility: `NOT_A_STANDALONE_BUILD`
Depends on: `Phase 1`

## Purpose

Refine the initial Aevum product model so the system serves general life organization rather than centering developer-style projects.

## Finalized product correction

The earlier project-centric direction was superseded.

Aevum should:

- remain understandable to general users;
- model Goals and broader life context directly;
- support Activities as general effort/action concepts;
- allow Projects where useful without making them the universal parent container;
- avoid developer-specific assumptions in the core domain model.

## Scope

Phase 1.2 is primarily a product-model correction inherited by all later product and implementation work.

It does not require a separate future application release unless a later SPEC identifies concrete migration or UI work associated with the refinement.

## Deliverables

- general-purpose product direction;
- clarified role of Goals, Activities, and optional Projects;
- supersession of the developer-centric product interpretation.

## Acceptance / Definition of Done

For repository migration, this phase is considered successfully represented when its product corrections are reflected consistently in:

- `docs/PROJECT.md`;
- `docs/PRODUCT.md`;
- `docs/DECISIONS.md`;
- future domain-model specifications.
