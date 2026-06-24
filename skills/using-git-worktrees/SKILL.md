---
name: using-git-worktrees
description: Use when starting feature work that needs isolation from the current checkout or before executing an implementation plan where branch/worktree safety matters
---

# Using Git Worktrees

## Overview

Use an isolated workspace when feature work, plan execution, or risky edits could collide with the user's current checkout. Detect existing isolation first, prefer platform-native worktree support, and use git worktrees only as a fallback.

Core rule: never create or remove worktrees casually. The workspace belongs to the user unless the current task or platform clearly says otherwise.

## When to Use

Use this skill when:

- Starting implementation from an approved plan.
- The checkout is dirty and changes should be isolated.
- Multiple agents or branches may touch the same repository.
- The user asks for branch isolation, a separate workspace, or worktree setup.

Skip worktree creation when the user explicitly instructs you to work in the current directory, when the platform already provides an isolated workspace, or when creating a worktree would violate the task scope.

## Process

1. Detect current git state:
   - `git rev-parse --git-dir`
   - `git rev-parse --git-common-dir`
   - `git branch --show-current`
2. Check whether the repo is a submodule before treating `git-dir != git-common-dir` as an existing worktree.
3. If already isolated, report the path and branch, then continue setup.
4. If not isolated and no explicit instruction exists, ask before creating a worktree.
5. Prefer platform-native worktree tools when available.
6. If using git fallback, place project-local worktrees under an ignored `.worktrees/` or `worktrees/` directory.
7. Install or refresh dependencies only as needed for the task.
8. Run the project baseline verification command before implementation.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "I can just start on the current branch." | Dirty or shared checkouts make ownership and rollback unclear. |
| "I know this is not a worktree." | Detect it; nested worktrees and submodules are easy to misread. |
| "A manual git worktree is fine." | Native harness support should be preferred when it exists. |
| "Cleanup is harmless." | Removing a harness-owned worktree can break external state. |

## Red Flags

- Creating a worktree without checking whether one already exists.
- Creating a project-local worktree directory that is not git-ignored.
- Running implementation on `main` or `master` without explicit user consent.
- Skipping baseline verification.
- Deleting a worktree or branch you did not create.

## Verification

Before implementation begins:

- The current workspace state is known: normal checkout, linked worktree, submodule, or externally managed workspace.
- The chosen location and branch are explicit.
- Any project-local worktree directory is ignored.
- Dependencies needed for verification are available.
- Baseline checks have been run or an explicit blocker has been reported.
