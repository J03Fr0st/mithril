---
name: finishing-a-development-branch
description: Use when implementation is complete, verification has passed, and the user needs a structured decision about merge, PR, preservation, or cleanup
---

# Finishing a Development Branch

## Overview

Finishing a branch starts only after implementation and verification are complete. It verifies the workspace, detects how the branch is managed, presents clear integration options, and executes the user's choice without destroying work accidentally.

Core rule: verify first, decide second, mutate remote or branch state only after explicit user direction.

## When to Use

Use this skill when:

- The implementation is complete and fresh verification has passed.
- The user asks what to do with the branch.
- The work is ready for merge, PR, preservation, or discard.
- A plan's final step says to finish the development branch.

Do not use it when the user explicitly says not to commit, push, merge, or edit branch status. In that case, report verification and stop.

## Process

1. Run the project verification command suite fresh.
2. Detect workspace state:
   - normal checkout
   - linked worktree on a branch
   - linked worktree with detached HEAD
   - externally managed workspace
3. Identify the likely base branch and current branch.
4. Present the appropriate structured options:
   - merge locally
   - push and create a PR
   - keep branch as-is
   - discard work
5. Execute only the option the user chooses.
6. For discard, require explicit typed confirmation.
7. Clean up only worktrees or branches you created or that the user explicitly asks you to remove.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Tests passed earlier." | Branch finishing needs fresh verification. |
| "The user probably wants a PR." | Ask with structured options unless they explicitly requested one. |
| "Cleanup is obvious." | Worktree and branch ownership must be known first. |
| "Discard is just local." | Destructive cleanup requires explicit confirmation. |

## Red Flags

- Offering merge or PR options before verification passes.
- Force-pushing without explicit instruction.
- Deleting a branch or worktree before merge success is confirmed.
- Removing externally managed workspaces.
- Treating a detached HEAD like a normal branch.

## Verification

Before branch finishing is complete:

- Fresh verification has passed or failure has been reported.
- Workspace and branch state were detected.
- The user chose an explicit option.
- Destructive actions had explicit confirmation.
- Post-action state was checked and reported.
