# Technology Stack

## Approved V1 direction

| Layer | Technology | Status |
|---|---|---|
| Frontend | Next.js + TypeScript | FINALIZED |
| Backend | Java + Spring Boot | FINALIZED |
| Primary database | PostgreSQL | FINALIZED |
| Vector capability | pgvector | FINALIZED |

## Guidance

These choices are architectural baselines, not complete implementation specifications. Individual phases define versions, project structure, supporting libraries, build tooling, API conventions, testing libraries, and deployment configuration when those details become necessary.

## Change control

Replacing any of the four baseline technologies above requires an explicit decision update and, when significant, an ADR. BUILD work must not replace them opportunistically.

## Intentionally undecided in Baseline v1

- package-management conventions beyond what the selected frameworks require;
- backend build-tool choice if not already captured by the recovered historical plan;
- hosting provider;
- CI/CD platform;
- authentication library/provider;
- AI provider and SDK;
- cache, queue, object-storage, or search infrastructure.

Do not add infrastructure solely because it is common in other systems.
