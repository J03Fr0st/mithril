---
name: to-issues
description: Use when a PRD, plan, design, or spec should be broken into independently executable vertical-slice issues for the project issue tracker.
---

# To Issues

## Overview

`to-issues` turns product or design intent into agent-ready vertical slices. Each issue should deliver a narrow, complete path through the system rather than a horizontal layer of work.

## When to Use

Use this skill when:

- A PRD, design, plan, or spec needs issue-tracker tasks.
- Work should be split for independent agents or reviewable checkpoints.
- A parent issue needs child issues with dependencies.
- A broad request needs tracer-bullet slices before implementation.

If issue tracker or triage state conventions are unknown, use the `setup-mithril-project` skill first.

## Process

1. Gather the source artifact and existing comments.
2. Read relevant code, domain glossary, and ADRs when the codebase shape affects slicing.
3. Identify any prefactor slice that makes later changes simple without shipping speculative behavior.
4. Draft vertical slices.
   - Each slice should be independently demonstrable or verifiable.
   - Each slice should cut through all necessary layers for one behavior.
   - Dependencies should be explicit and minimal.
5. Present the proposed breakdown to the user:
   - Title
   - Blocked by
   - User stories or requirements covered
   - Verification signal
6. Iterate until approved.
7. Before publishing, run the publication safety gate:
   - Present the exact issue drafts and tracker metadata to the user.
   - Identify the issue-tracker target, repo or project, labels, and triage state to apply.
   - Redact secrets, credentials, customer data, and sensitive details from each issue body and metadata.
   - Get explicit user approval for the exact target, issue bodies, labels, and state.
8. After approval, create or update external tracker items in dependency order so later issues can reference real blockers, and apply only the approved triage state.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Layer-by-layer tasks are easier to assign." | They produce integration risk and partial work that cannot be evaluated alone. |
| "Dependencies can be figured out later." | Missing blockers create idle agents and merge friction. |
| "The parent issue has enough detail." | Child issues must stand alone for execution. |
| "A prefactor is just cleanup." | A prefactor is valid only when it directly enables the slices that follow. |

## Red Flags

- Issues are named by layer rather than user-visible or behavior-visible slices.
- A completed issue would not be demoable, testable, or reviewable alone.
- Acceptance criteria include vague phrases like "handle edge cases".
- Dependencies point both ways or depend on uncreated work.
- Issue bodies copy brittle implementation details from the plan.

## Verification

Before publishing:

- Every issue maps to source requirements or user stories.
- Each issue has acceptance criteria and a concrete verification signal.
- Blockers are ordered and publishable.
- The user approved the granularity.
- The issue-tracker target, repo or project, labels, and triage state are known.
- Issue bodies and tracker metadata have been redacted for secrets, credentials, customer data, and sensitive details.
- The user explicitly approved the exact target, issue bodies, labels, and state before any external tracker mutation or triage state change.
