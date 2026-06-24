---
name: verification-before-completion
description: Use when about to claim work is complete, fixed, passing, ready, or safe to hand off, before commits, branch completion, PRs, or final status updates
---

# Verification Before Completion

## Overview

Completion claims require fresh evidence. Do not say work is complete, fixed, passing, ready, or safe based on confidence, intention, or a previous run.

Core rule: evidence before claims, always.

## When to Use

Use this skill before:

- Final responses that imply success.
- Marking a task complete.
- Committing, merging, pushing, opening a PR, or handing off.
- Saying tests, validation, lint, build, or review passed.
- Moving from implementation to branch finishing.

## Gate

Before making a completion claim:

1. Identify the command or inspection that proves the claim.
2. Run the full command fresh in the current workspace.
3. Read the output and exit code.
4. Compare the result against the acceptance criteria.
5. Report the evidence, including failures or skipped checks.

Partial verification can support a partial claim only. Do not generalize it into broader success.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "It should pass." | Run the command. |
| "A related check passed." | Related checks prove related claims only. |
| "The change is documentation only." | Validators and stale-reference searches still matter when specified. |
| "The agent said it passed." | Verify reports and diffs yourself. |

## Red Flags

- You are using "should", "probably", or "seems".
- You are about to send a final response without running the requested checks.
- You have not read the full failure output.
- You are relying on an old command result from before edits.
- The diff contains files outside the allowed scope.

## Verification

For this skill itself, verification means:

- The relevant commands were run after the final edit.
- Exit codes and meaningful output were read.
- Acceptance criteria were checked line by line.
- Any no-match search with exit code 1 is interpreted correctly when no matches are expected.
- The final report distinguishes pass, fail, skipped, and pre-existing concern.
