---
name: grill-me
description: Use when the user explicitly asks to be grilled, stress-tested, challenged, or interviewed about a plan, design, requirement, or decision.
---

# Grill Me

## Overview

`grill-me` is the direct trigger for an intensive plan interview. It exists to catch natural user wording and route it into the canonical `grilling` skill without creating a second interview process.

## When to Use

Use this skill when:

- The user says "grill me", "stress-test this", "challenge this", or similar.
- A plan sounds plausible but has hidden assumptions, dependencies, or tradeoffs.
- The user wants pressure before implementation, planning, or approval.

If the request needs documentation updates while decisions crystallize, use the `grill-with-docs` skill instead.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "I can ask all questions at once." | The useful pressure comes from one answer changing the next question. |
| "The plan already looks clear." | A clear-looking plan can still hide dependency, ownership, and verification gaps. |
| "I should answer on the user's behalf." | Recommend an answer, but let the user confirm or correct it. |
| "This is just brainstorming." | Grilling is narrower: it interrogates an existing plan or decision tree. |

## Red Flags

- Multiple questions are being bundled into one message.
- You are asking about facts that the codebase or docs can answer directly.
- The user is accepting a recommendation without its tradeoff being stated.
- You cannot say what decision the current question is meant to resolve.

## Verification

Before leaving the session:

- The `grilling` skill has been followed.
- Questions were asked one at a time.
- Codebase-checkable facts were checked instead of pushed back to the user.
- Each resolved decision has a stated implication for the plan.
- Remaining open questions are explicit.
