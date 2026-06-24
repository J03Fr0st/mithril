---
name: to-prd
description: Use when current conversation context, project facts, and clarified decisions should be synthesized into a PRD for the project issue tracker.
---

# To PRD

## Overview

`to-prd` converts already-known context into a product requirements document. It is synthesis, not a new interview: use the conversation, repo evidence, domain vocabulary, and existing decisions to produce a durable issue-tracker artifact.

## When to Use

Use this skill when:

- The user asks for a PRD from the current discussion.
- A feature idea has enough context to preserve as a product artifact.
- A prototype or grilling session produced decisions that need product framing.
- Work should be published before issue slicing.

If issue tracker or label conventions are unknown, use the `setup-mithril-project` skill first.

## Process

1. Review conversation context, relevant code, domain glossary, and ADRs.
2. Identify the highest useful testing seam with `codebase-design` vocabulary.
3. Confirm the seam with the user when it is a real design choice.
4. Draft the PRD:
   - Problem Statement
   - Solution
   - User Stories
   - Implementation Decisions
   - Testing Decisions
   - Out of Scope
   - Further Notes
5. Avoid brittle file paths and code snippets.
   - Exception: include a trimmed prototype-derived state shape or schema only when it captures a decision better than prose.
6. Before publication, run the publication safety gate:
   - Present the PRD draft and tracker metadata to the user.
   - Identify the issue-tracker target, repo or project, labels, and triage state to apply.
   - Redact secrets, credentials, customer data, and sensitive details from the body and metadata.
   - Get explicit user approval for the exact target, body, labels, and state.
7. After approval, create or update external tracker items and apply only the approved triage state.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "I should ask more questions." | This skill preserves what is already known; use `grilling` first if context is not settled. |
| "Implementation file paths make it precise." | File paths decay quickly in product artifacts. Capture decisions, not transient locations. |
| "A short user story list is enough." | PRDs should expose the breadth of user value and edge cases. |
| "Testing can wait for tasks." | Testing decisions shape the feature and belong in the PRD. |

## Red Flags

- The PRD invents decisions not present in conversation, code, or docs.
- User stories are implementation tasks in disguise.
- Testing decisions name internals instead of behavior seams.
- Out-of-scope items are missing for a feature with obvious temptations.
- The issue tracker target is unknown.

## Verification

Before publishing or handing off:

- The PRD uses project domain terms consistently.
- Implementation decisions avoid brittle paths unless a prototype snippet is justified.
- Testing decisions name behavior and seams.
- Out-of-scope items prevent likely scope creep.
- The body and tracker metadata have been redacted for secrets, credentials, customer data, and sensitive details.
- The user explicitly approved the target, body, labels, and state before any external tracker mutation or triage state change.
- The artifact is published or its target location is reported.
