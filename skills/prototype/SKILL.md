---
name: prototype
description: Use when a throwaway experiment is needed to answer a design, state-model, workflow, or UI question before committing to implementation.
---

# Prototype

## Overview

A prototype is disposable code that answers one decision question. It is not a shortcut to production; it is a way to learn quickly, capture the answer, and then delete or absorb the result deliberately.

## When to Use

Use this skill when:

- A state model, workflow, or interaction is hard to evaluate in prose.
- Several UI directions should be compared before choosing one.
- A risky design assumption needs a cheap runnable check.
- A small experiment will prevent a larger implementation guess.

Do not use it when the desired behavior is already clear enough for `writing-plans` or `test-driven-development`.

## Process

1. State the question the prototype must answer.
2. Pick the artifact shape.
   - Logic or state question: build the smallest interactive terminal or scriptable flow that exercises the cases.
   - UI question: build several clear variants that can be switched in one place.
3. Mark the code as throwaway in its filename, route, or header.
4. Keep state in memory unless persistence is the question being tested.
5. Provide one command to run it.
6. Surface the relevant state after each action or variant change.
7. Capture the answer in a durable place: issue, PRD, ADR, plan, or short note.
8. Delete the prototype or fold the validated decision into real implementation.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Since it works, we can keep it." | Prototype code optimizes for learning, not maintainability. |
| "A little polish will help." | Polish hides the decision signal and increases deletion cost. |
| "We should add tests." | Tests belong to production behavior after the decision is chosen. |
| "Persistence makes it realistic." | Persistence adds drag unless it is the question under test. |

## Red Flags

- The prototype has no explicit question.
- The code is indistinguishable from production code.
- It introduces dependencies or configuration the real work may not need.
- The result is kept without capturing the decision it answered.
- The prototype starts expanding into unrelated feature work.

## Verification

Before moving on:

- The prototype answered its stated question or exposed a specific unresolved question.
- The run command is recorded.
- The decision is captured outside the throwaway code.
- Any production follow-up is routed to `writing-plans` or `test-driven-development`.
- The prototype is deleted, clearly scheduled for deletion, or deliberately absorbed.
