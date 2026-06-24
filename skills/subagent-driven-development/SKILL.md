---
name: subagent-driven-development
description: Use when executing an implementation plan with mostly independent tasks in the current session and subagent support is available
---

# Subagent-Driven Development

## Overview

Subagent-driven development executes an approved plan by dispatching a fresh implementer per task, reviewing each task before moving on, and running a broader final review at the end. The controller keeps the overall context; each subagent gets only the requirements needed for its task.

Core rule: fresh implementer, task-scoped review, fix loop, then next task. Do not run independent implementation tasks in parallel when they may edit shared files or rely on ordered interfaces.

## When to Use

Use this skill when:

- There is an approved implementation plan.
- Tasks are mostly independent or can be sequenced with clear interfaces.
- The current platform supports subagent dispatch.
- The work benefits from fresh context and review gates.

Use `executing-plans` instead when subagents are unavailable, the plan must be executed in another session, or tasks are tightly coupled enough that delegating them would create more coordination risk than value.

## Process

1. Read the plan once. Note global constraints, file ownership, task ordering, and verification commands.
2. Create or update a progress ledger, defaulting to `.mithril/sdd/progress.md` when the repo has no other convention.
3. For each task:
   - Prepare a self-contained task brief with exact requirements and relevant interfaces.
   - Dispatch one implementer subagent.
   - If the implementer asks for context, answer before work proceeds.
   - Require a report containing status, changed files, verification run, and concerns.
   - Generate a task review package from the task's base and head changes.
   - Dispatch a task reviewer with the brief, report, diff, and global constraints.
   - Fix Critical and Important findings before marking the task complete.
   - Record completion in the ledger.
4. After all tasks, request a whole-branch code review.
5. Run `verification-before-completion`, then continue to `finishing-a-development-branch` when the user wants integration.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The implementer said done, so it is done." | The controller verifies reports, diffs, and task review results. |
| "The reviewer can infer the plan." | Reviewers need explicit requirements and constraints. |
| "Parallel implementation is faster." | Parallel edits to shared files create conflicts and hidden coupling. |
| "Minor concerns can disappear into the transcript." | Durable ledgers survive compaction and handoff. |

## Red Flags

- Dispatching a subagent with the full conversation history instead of a scoped brief.
- Moving to the next task before review is clean or adjudicated.
- Ignoring implementer `BLOCKED`, `NEEDS_CONTEXT`, or concern reports.
- Asking reviewers to ignore likely issues or pre-rating findings for them.
- Losing task progress because it only exists in chat context.

## Verification

Before declaring plan execution complete:

- Every task in the plan is marked complete in the task list and ledger.
- Each task has implementer evidence and review evidence.
- Critical and Important findings have been fixed and re-reviewed.
- Minor deferred findings are explicitly recorded.
- Whole-branch review and final verification have run fresh.
