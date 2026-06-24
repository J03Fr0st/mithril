---
name: resolving-merge-conflicts
description: Use when a git merge, rebase, cherry-pick, or patch application has conflicts that must be resolved without losing either side's intent.
---

# Resolving Merge Conflicts

## Overview

Merge-conflict resolution preserves intent. The job is to understand both sides, resolve the smallest necessary hunks, run the checks that prove the integration still works, and continue the interrupted git operation.

## When to Use

Use this skill when:

- Git reports unmerged paths or conflict markers.
- A merge, rebase, cherry-pick, revert, or patch application stops for manual resolution.
- Parallel work touched the same files and the integration intent is unclear.

Do not use this skill to discard work or restart the operation unless the user explicitly chooses that path.

## Process

1. Inspect the state.
   - `git status --short`
   - The operation type from `.git` state or git status output.
   - The list of conflicted files.
2. Find the primary sources.
   - Read the conflicting hunks.
   - Inspect the commits, messages, issues, or PR context for each side when available.
   - Identify the intent of each change before editing.
3. Resolve each hunk.
   - Preserve both intents where compatible.
   - When incompatible, choose the result that matches the stated integration goal and note the tradeoff.
   - Do not invent unrelated behavior.
4. Remove conflict markers and inspect the full file around each resolution.
5. Run appropriate checks: format, typecheck, tests, or the repo's documented verification.
6. Stage the resolved files and continue the git operation when the user has not forbidden it.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The newer side should win." | Newer does not mean more correct. Preserve intent. |
| "The conflict marker is the only area to inspect." | Adjacent code often reveals invariants the hunk depends on. |
| "The tests passing means the merge is right." | Tests prove some behavior; they do not prove intent was preserved. |
| "I can clean up nearby code while resolving." | Conflict resolution is already risky. Keep it scoped. |

## Red Flags

- A resolution deletes one side without explaining why.
- Conflict markers remain after editing.
- The operation type is unknown.
- Verification is skipped because the conflict looked textual.
- Unrelated formatting or refactors appear in the diff.

## Verification

Before reporting the conflict resolved:

- `git status` shows no unmerged paths.
- Conflict markers are absent from resolved files.
- The diff preserves or explicitly trades off each side's intent.
- Relevant checks were run and read.
- The merge, rebase, cherry-pick, or patch operation was continued, or the reason for stopping is reported.
