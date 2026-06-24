---
name: receiving-code-review
description: Use when receiving code review feedback before implementing suggestions, especially when feedback is unclear, broad, or technically questionable
---

# Receiving Code Review

## Overview

Review feedback must be evaluated technically before implementation. The goal is to understand each item, verify it against the codebase, fix valid issues, and push back on invalid or out-of-scope suggestions with evidence.

Core rule: no performative agreement and no blind implementation.

## When to Use

Use this skill when:

- A human, reviewer subagent, CI reviewer, or PR reviewer gives feedback.
- Feedback contains multiple items to triage.
- A suggestion may conflict with project constraints or prior decisions.
- The requested fix is unclear, broad, or framed as "proper" without specifics.

## Process

1. Read all feedback before responding.
2. Restate unclear requirements or ask for clarification before editing.
3. Verify each item against the current codebase.
4. Decide whether each item is valid, invalid, already handled, or blocked.
5. Fix valid items one at a time, starting with blocking issues.
6. Run targeted verification for each fix and broader checks when risk warrants it.
7. Push back on invalid feedback with concrete technical evidence.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The reviewer must be right." | Reviewers lack context; verify before changing code. |
| "I can implement the clear items first." | Unclear items may affect the correct fix order. |
| "Saying thanks proves I heard it." | Action and evidence matter more than performative response. |
| "Professional means adding the requested feature." | If nothing uses it, ask whether to remove or defer it. |

## Red Flags

- You are about to write "you are right" before checking.
- Feedback items are numbered but some are unclear.
- A suggestion adds unrequested configurability, abstraction, or behavior.
- The feedback conflicts with an approved spec or user instruction.
- You cannot identify the test or command that verifies the fix.

## Verification

Before reporting review feedback handled:

- Every feedback item has a disposition: fixed, rejected with evidence, deferred with approval, or blocked.
- Each fix has targeted verification evidence.
- Broader checks have run when the change touches shared behavior.
- The final response names any unresolved or intentionally deferred items.
