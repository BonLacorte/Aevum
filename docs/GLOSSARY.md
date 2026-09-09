# Glossary

## Aevum

The current project name. It supersedes the historical working name **LifeOS**.

## Activity

A general unit of effort or participation associated with a broader part of a person's life. Exact behavior is defined by future phase specifications.

## AI-assisted retrieval

The use of AI-related techniques to help locate or surface relevant Aevum context. Retrieval behavior must be distinguished from generated interpretation when that distinction matters.

## BUILD

The implementation stage of the PSB Workflow. BUILD begins only after a phase reaches `READY_FOR_BUILD`.

## CLOSED

The terminal PSB state for a phase that has been implemented, reviewed, verified, documented as required, and formally completed.

## Decision record

A repository entry describing an important product or technical choice. `docs/DECISIONS.md` is the decision register; significant architectural decisions may receive an ADR.

## Goal

A desired outcome or direction. Goals are broader product concepts than software projects.

## Historical plan

Planning material created before Repository Baseline v1. It is supporting archive evidence, not the operational source of truth after migration.

## Migration gap

A known historical planning detail that has not yet been faithfully transferred into repository documentation. A migration gap is not automatically an unresolved product decision.

## PLAN

The PSB stage that defines why a phase exists, its scope, boundaries, dependencies, and intended result.

## Project

An optional structured effort that may be associated with a goal or activity. Projects are not the universal organizing model for Aevum.

## PSB Workflow

Aevum's development method: **Plan → Spec → Build**, followed by review, fixes when needed, verification, and closure.

## READY_FOR_BUILD

The gate indicating that a phase has an approved, implementable, testable specification with no known BUILD-blocking ambiguity.

## SPEC

The PSB stage that converts an approved plan into concrete functional, technical, data, interface, security, edge-case, acceptance, and Definition-of-Done requirements.

## pgvector

The approved PostgreSQL extension direction for vector capabilities used by Aevum's semantic/AI architecture.
