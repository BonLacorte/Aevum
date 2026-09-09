# Product

## Product definition

Aevum is a personal organizational intelligence system that combines structured life information with AI-assisted retrieval and reasoning.

Its purpose is broader than any single feature category. Aevum may include journaling, goals, decisions, activities, tasks, projects, reflection, history, and AI-assisted understanding, but none of those capabilities alone defines the product.

## Product philosophy

### General-purpose design

Aevum must remain useful beyond software-development workflows. Product concepts should represent ordinary life contexts without requiring users to think like project managers or developers.

### Goals, activities, and projects

Earlier project-oriented thinking was refined during historical planning. Aevum should not make `Projects` the dominant organizing concept for a person's life.

The approved direction is:

- **Goals** represent intended outcomes or directions.
- **Activities** represent actions or ongoing areas of effort.
- **Projects** may exist where useful, but are optional and subordinate to broader life concepts rather than the universal container for everything.

The exact domain model remains phase-specification work and must not be invented during BUILD.

## Core product concepts

The historical plan establishes the following as important product areas:

- personal context and history;
- journaling / daily life capture;
- goals;
- decisions;
- activities and optional projects;
- progress and reflection;
- AI-assisted retrieval and understanding.

This baseline intentionally does not define database tables, UI routes, or exact feature behavior. Those belong in approved architecture and phase specifications.

## UX principles

- Prefer concepts understandable without technical knowledge.
- Avoid forcing every life item into a project structure.
- Make capture simple enough to use regularly.
- Keep AI behavior explainable in context: users should understand when AI is generating, retrieving, or interpreting information.
- Preserve clear boundaries between stored facts, generated summaries, and model interpretations where the distinction matters.

## Product boundaries

Aevum is not defined as:

- a generic chatbot wrapper;
- a developer project tracker;
- a task manager with an AI sidebar;
- a journal with no structured relationships;
- an autonomous system allowed to invent personal facts.

Specific capabilities may overlap with these categories, but the product model remains broader.
