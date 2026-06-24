---
name: doubt-driven-development
description: Use when a non-trivial decision, claim, design, or implementation needs adversarial scrutiny before it stands, especially under uncertainty, high stakes, or unfamiliar code.
---

# Doubt-Driven Development

## Overview

Confidence is not evidence. Doubt-driven development turns important claims into reviewable artifacts, then tries to disprove them before they become design, code, or launch decisions.

When a claim is behavioral, a failing test from `test-driven-development` can be the strongest doubt signal. When a claim comes from framework behavior, use `source-driven-development`.

## When to Use

Use this skill for non-trivial decisions where at least one is true:

- The decision crosses a module, service, trust, data, or public API boundary.
- Correctness depends on ordering, idempotence, concurrency, security, performance, or invariants.
- The claim cannot be proven by the compiler or type system.
- The change is hard to reverse, production-facing, or security-sensitive.
- You are about to state "this is safe", "this scales", "this matches the spec", or similar.

Do not use it for mechanical renames, formatting, file moves, direct user instructions with no design choice, or trivial one-line changes.

## Process

1. State the claim.
   - Write the decision or assertion in two or three lines.
   - Add why it matters and what would break if it is wrong.

2. Extract the artifact and contract.
   - Artifact: the diff, design paragraph, function, schema, test, or plan.
   - Contract: the requirements, constraints, invariants, and forbidden outcomes.
   - Remove persuasion and prior reasoning; keep only what must be judged.

3. Attack the artifact.
   - Look for unstated assumptions, edge cases, hidden coupling, missing boundaries, convention drift, and failure modes.
   - Prefer concrete disproof: failing test, contradictory source doc, counterexample input, trace, or measured data.
   - For behavioral claims, follow `test-driven-development`.
   - For bugs discovered during doubt, follow `systematic-debugging`.

4. Classify findings.
   - Contract gap: clarify requirements before judging.
   - Actionable issue: change the artifact and re-check.
   - Accepted tradeoff: document why the risk is acceptable.
   - Noise: record why it does not apply and whether the contract should be clearer.

5. Stop deliberately.
   - Stop when findings are trivial, the artifact is corrected, or the user accepts a documented tradeoff.
   - If substantive doubts remain after repeated passes, escalate instead of grinding.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "I am confident." | Confidence often marks the assumptions most worth testing. |
| "Review at the end is enough." | Late review catches finished wrong work after correction is expensive. |
| "The concern is probably theoretical." | If it is cheap to disprove now, do it now. |
| "A reviewer found an issue, so the reviewer is right." | Findings are evidence to reconcile, not verdicts to rubber-stamp. |
| "If we doubt everything, nothing ships." | The skill applies only to non-trivial decisions. |

## Red Flags

- A high-stakes claim is made without naming evidence.
- The artifact is too large to review in one pass.
- The review prompt asks for validation instead of disproof.
- Findings are dismissed without reading them against the artifact.
- The same unresolved concern recurs across passes.
- Tests, docs, or measurements that could disprove the claim are skipped.

## Verification

- Each non-trivial claim was stated explicitly.
- Artifact and contract were separated from persuasion.
- At least one disproof attempt was made through tests, source docs, measurement, or adversarial review.
- Findings were classified as contract gap, actionable issue, accepted tradeoff, or noise.
- Actionable issues were fixed or escalated.
- Accepted tradeoffs are visible to the user or in project docs.
- Completion claims use `verification-before-completion`.
