---
name: executing-plans
description: Use when a written implementation plan must be executed directly with checkpoints, especially when subagent-driven execution is unavailable or unsuitable
---

# Executing Plans

## Overview

Executing plans is the direct execution fallback for approved implementation plans. Load the plan, review it critically, execute each task in order, run the specified checks, and stop when the plan or verification no longer makes sense.

Prefer `subagent-driven-development` when subagents are available and the plan is suitable for delegation.

## When to Use

Use this skill when:

- A written implementation plan exists and the user asks to execute it.
- Subagents are unavailable, unsuitable, or explicitly not desired.
- The task sequence requires one session to preserve context.
- You need checkpointed execution without creating a new design.

Do not use this skill when no approved plan exists; invoke `brainstorming` or `writing-plans` first depending on what is missing.

## Process

1. Read the plan and project instructions.
2. Review the plan for contradictions, missing files, unclear steps, or requirements that conflict with higher-priority user instructions.
3. Ask only for blockers that prevent execution.
4. Create a todo item for each task.
5. For each task:
   - Mark it in progress.
   - Follow the task steps as written.
   - Run the task verification commands.
   - Inspect the diff for scope creep.
   - Mark it complete only after verification evidence exists.
6. Request code review at the plan's review gates.
7. Run final verification before any completion claim.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The plan is close enough." | Unclear plan text must be resolved before edits. |
| "I can skip a verification step because another one passed." | Each planned check proves a different claim. |
| "I will fix adjacent cleanup while I am here." | Plan execution is scoped to the plan and user instructions. |
| "A checkpoint is optional." | Review and verification gates are part of execution. |

## Red Flags

- Starting implementation while plan conflicts are unresolved.
- Editing files not named by the current task without a clear requirement.
- Continuing after repeated verification failures without diagnosing.
- Updating task status artifacts when the current task explicitly forbids it.
- Claiming completion based on intent instead of command output.

## Verification

Before finishing direct plan execution:

- Every planned task was executed or explicitly reported as blocked.
- Task-specific checks were run and read.
- The final verification command set was run fresh.
- The diff only contains files allowed by the task or approved by the user.
- Any skipped check, concern, or blocker is reported clearly.
