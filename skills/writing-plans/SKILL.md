---
name: writing-plans
description: Use when an approved design, spec, or set of requirements needs to become an implementation plan before code changes begin
---

# Writing Plans

## Overview

Writing plans turns approved requirements into bite-sized, independently verifiable tasks. The plan must be detailed enough for an implementer with little project context to execute without inventing missing decisions.

Plans should be practical, narrow, test-first where applicable, and explicit about files, interfaces, commands, expected outputs, and review gates.

## When to Use

Use this skill when:

- A design or spec has been approved and implementation is next.
- A multi-step task needs task boundaries before code changes.
- Work should be split for subagent-driven execution or review checkpoints.
- The user asks for an implementation plan, task breakdown, or executable spec.

Do not use it to design the feature itself. If the design is not approved, invoke `brainstorming` first.

## Plan Requirements

Every plan should include:

- Goal: one sentence describing the deliverable.
- Architecture: the implementation approach and important boundaries.
- Global constraints: exact requirements, naming rules, dependency limits, platform constraints, and file-scope rules.
- File map: files to create, modify, or test, with each file's responsibility.
- Task list: each task is independently testable and reviewable.
- Interfaces: what each task consumes and produces for later tasks.
- Verification commands: exact commands and expected results.
- Review gates: where code review and final verification happen.

Save plans in the repo-approved spec location. If no project convention exists, use `docs/mithril/plans/YYYY-MM-DD-<feature-name>.md`.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The implementer can infer the details." | Missing details become inconsistent implementations. |
| "Tests can be decided later." | Verification belongs in the plan, not as an afterthought. |
| "This task is just setup." | Setup belongs with the deliverable that needs it unless it is independently reviewable. |
| "Similar to the previous task is enough." | Each task must stand alone for isolated execution. |

## Red Flags

- The plan contains `TBD`, `TODO`, "handle edge cases", or "write appropriate tests".
- A task references functions, files, types, or commands that no task defines.
- A task cannot be reviewed independently from its neighbors.
- The plan adds optional flexibility or configuration not required by the spec.
- The plan omits commit, review, or verification expectations where the workflow requires them.

## Verification

Before handing off a plan:

- Every approved requirement maps to at least one task.
- Every task has exact files, steps, and verification commands.
- Placeholders and vague instructions have been removed.
- Type names, paths, command names, and interfaces are consistent across tasks.
- The handoff names the execution route: `subagent-driven-development` when tasks are independent and subagents are available, otherwise `executing-plans`.
