---
name: grilling
description: Use when an existing plan, design, requirement, architecture choice, or issue needs a rigorous one-question-at-a-time interview before execution.
---

# Grilling

## Overview

Grilling is a focused interview that walks a plan's decision tree until the shared understanding is sharp enough to act. Each question should resolve one dependency, assumption, or tradeoff.

## When to Use

Use this skill when:

- The user asks to stress-test or challenge an existing plan.
- A design has multiple branches and the next decision depends on the previous answer.
- Requirements sound plausible but do not yet have clear success criteria.
- An issue, PRD, or implementation plan needs sharper scope before agents can work on it.

If there is no plan yet, use the `brainstorming` skill first.

## Process

1. State the plan assumption you are testing.
2. Ask exactly one question.
3. Include your recommended answer and the tradeoff behind it.
4. Wait for the user's answer before asking the next question.
5. If the answer is discoverable from the codebase or docs, inspect those sources instead of asking.
6. After each answer, update the decision tree: what is now settled, what became blocked, and what changed next.
7. Stop when remaining questions no longer affect the decision or execution path.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "A list of questions is more efficient." | It creates branching ambiguity and makes answers fight each other. |
| "I can keep going without waiting." | The user's previous answer determines the next useful question. |
| "This is adversarial." | The goal is shared clarity, not winning an argument. |
| "The codebase question is faster to ask." | If the repo can answer it, checking the repo prevents guesswork. |

## Red Flags

- More than one question appears in the same turn.
- A question has no stated reason or decision dependency.
- The same topic keeps resurfacing under different words.
- You are accepting vague terms like "simple", "later", "proper", or "edge cases" without pinning them down.
- You are treating implementation details as settled when the plan has not chosen them.

## Verification

Before ending the grilling session:

- Each question had one purpose and one answer.
- Codebase-checkable claims were checked.
- The agreed decisions and tradeoffs are summarized.
- Open questions are named, not implied.
- The next workflow step is explicit: continue grilling, document with `grill-with-docs`, write a plan, prototype, or stop.
