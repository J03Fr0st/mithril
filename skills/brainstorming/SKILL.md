---
name: brainstorming
description: Use when a request involves creative work, new behavior, changed behavior, feature shaping, architecture choices, or any implementation whose design has not already been approved
---

# Brainstorming

## Overview

Brainstorming turns an idea into an approved design before implementation begins. The goal is to expose assumptions, compare approaches, define success criteria, and prevent coding against a guess.

Hard gate: do not write code, scaffold files, or invoke implementation skills until you have presented a design and the user has approved it. If the user has already provided an approved design or spec and asks you to execute a specific task from it, honor that execution context instead of restarting brainstorming.

## When to Use

Use this skill before:

- Creating a new feature, tool, component, workflow, or integration.
- Modifying product behavior or user-visible flows.
- Making architecture, data model, API, UX, or process decisions.
- Turning a vague request into concrete requirements.

Do not use it to reopen an already approved spec unless the current task reveals a design conflict or missing decision that blocks execution.

## Process

1. Explore the current project context: files, docs, recent changes, and project conventions.
2. Ask one clarifying question at a time until the purpose, constraints, and success criteria are clear.
3. Present two or three viable approaches with tradeoffs and a recommendation.
4. Present the proposed design in sections scaled to the complexity of the work.
5. Ask for approval before writing design artifacts or moving into planning.
6. Save the approved design in the project-approved location, defaulting to `docs/mithril/design/YYYY-MM-DD-<topic>/design.md` when no repo convention overrides it.
7. Self-review the design for placeholders, contradictions, ambiguity, and scope creep.
8. After user approval, invoke `writing-plans` to produce the implementation plan.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "This is too small to design." | Small changes still carry assumptions; the design can be short. |
| "The user clearly wants code." | Code before an approved design is only valid when a spec or task already supplies the design. |
| "I can choose the obvious approach." | If alternatives exist, surface them and explain the recommendation. |
| "I will ask questions while coding." | Resolve design questions before implementation starts. |

## Red Flags

- You are about to edit code for behavior-changing work without an approved design.
- The request has multiple possible interpretations.
- You cannot state the success criteria in testable terms.
- The task spans independent subsystems and may need decomposition.
- You are proposing broad cleanup that is not necessary for the current goal.

## Verification

Before leaving brainstorming:

- The current project context has been checked.
- The user has approved a concrete design.
- The design documents purpose, constraints, approach, testing, and open risks.
- There are no placeholders, contradictions, or unresolved scope questions.
- The next step is `writing-plans`, not implementation.
