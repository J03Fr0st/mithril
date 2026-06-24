---
name: handoff
description: Use when the current conversation must be compacted into a concise document so another agent or future session can continue safely.
---

# Handoff

## Overview

A handoff preserves enough context for a fresh agent to continue without replaying the conversation. It should reference durable artifacts instead of duplicating them, redact sensitive details, and make the next action obvious.

## When to Use

Use this skill when:

- The user asks for a handoff, recap, continuation note, or context pack.
- Work is paused and another agent may resume it.
- A long conversation contains decisions not yet captured elsewhere.
- The next session needs suggested Mithril skills and verification state.

Do not create a handoff when a PRD, issue, plan, ADR, or commit already captures the needed context.

## Process

1. Identify the next session's purpose from the user request.
2. Write the handoff outside the current workspace, using the operating system temp directory.
3. Include:
   - Goal and current status.
   - Relevant repo, branch, and dirty-worktree notes.
   - Decisions made.
   - Files or artifacts to read, by path or URL.
   - Commands already run and their results.
   - Suggested skills to invoke next.
   - Open questions, blockers, and risks.
4. Omit secrets, tokens, credentials, and unnecessary logs.
5. Reference existing artifacts rather than copying their bodies.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "More transcript detail is safer." | A handoff should be navigable, not a conversation dump. |
| "Workspace docs are convenient." | Temporary handoffs should not create repo noise unless the user asks. |
| "Secrets are probably harmless in local notes." | Handoffs are meant to travel across agents. Redact them. |
| "The next agent can infer the next step." | The point of a handoff is to remove that inference. |

## Red Flags

- The handoff duplicates full PRDs, plans, ADRs, or issue bodies.
- It omits the current verification state.
- It includes credentials, customer data, or unnecessary machine details.
- It does not say what the next agent should do first.
- It is saved into the repo without explicit user instruction.

## Verification

Before returning the handoff:

- The file is in the OS temp directory, not the workspace.
- It names the next objective and first action.
- It links or points to durable artifacts instead of copying them.
- Sensitive information is redacted.
- Suggested skills are existing Mithril skills.
