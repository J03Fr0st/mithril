---
name: code-review-and-quality
description: Use when completing a task, reviewing own code, reviewing agent or human changes, preparing a merge or PR, or deciding whether a change improves code health.
---

# Code Review and Quality

## Overview

Code review is a quality gate for requirements, behavior, maintainability, and operational risk. Passing tests are necessary evidence, but they do not replace review.

Approve or recommend completion only when the change improves overall code health for the task at hand.

## When to Use

Use this skill:

- After completing a task or significant implementation step.
- Before merge, PR creation, handoff, or final branch completion.
- When reviewing code written by yourself, another agent, or a human.
- After bug fixes, especially to review both the fix and regression test.
- When a reviewer or specialist persona fan-out is available and the findings need one canonical verdict.

Do not use it as a substitute for the mechanics of requesting or receiving review. Use `requesting-code-review` for review packaging and `receiving-code-review` before acting on feedback.

## Process

1. Establish review context.
   - Identify the task, spec, acceptance criteria, and intended behavior.
   - Inspect the relevant diff, not just a summary.
   - Gather verification already run and known concerns.

2. Review tests first.
   - Do tests exist for the changed behavior?
   - Do they exercise public interfaces and observable outcomes?
   - Would they fail if the intended behavior regressed?
   - Are edge cases and error paths represented where risk warrants them?

3. Review implementation across five axes.

| Axis | Review Questions |
| --- | --- |
| Correctness | Does the change meet the task? Are boundary cases, state transitions, races, and error paths handled? |
| Readability | Are names, control flow, comments, and file organization clear in the local style? |
| Architecture | Does it fit existing patterns, preserve module boundaries, deepen interfaces, and avoid speculative abstractions? |
| Simplicity | Could the change delete code, reuse local code, use standard library behavior, use native platform capability, use an installed dependency, or shrink custom code without losing required behavior? |
| Security | Are inputs, outputs, credentials, permissions, and external data treated safely? |
| Performance | Are data access, loops, rendering, concurrency, and resource use bounded for expected scale? |

   For a dedicated over-engineering pass, use the `simplicity-review` skill as report-only input. Do not treat a simplicity finding as permission to remove trust-boundary validation, authorization, security controls, accessibility basics, data-loss prevention, root-cause fixes, or required tests.

4. Label findings by severity.
   - Critical: blocks merge; security flaw, data loss, broken functionality, or unrecoverable regression.
   - Required: must be addressed or explicitly accepted before merge.
   - Optional or Consider: useful but not required for this change.
   - Nit: cosmetic or local preference.
   - FYI: context only.

5. Propose remedies, not just objections.
   - Name the smaller or safer shape when one exists.
   - Prefer deleting or consolidating moving parts over relocating the same complexity.
   - Keep feature work, refactors, formatting-only changes, and generated artifacts separate unless the user approved bundling.

6. Verify the verification story.
   - Confirm which commands ran after the final edit.
   - Check whether the evidence covers formatting, linting, type checks, tests, builds, screenshots, migrations, or manual checks as applicable.
   - Do not infer broad safety from one narrow command.

7. Handle fan-out findings through one gate.
   - Specialist or persona reviews can inspect security, performance, testing, UX, or architecture in parallel when available.
   - Consolidate their findings into this severity model.
   - Evaluate every suggestion technically before implementing it.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Tests pass, so review is done." | Tests miss architecture, readability, security, performance, and requirement gaps. |
| "I wrote it, so I know it is correct." | Authors are most exposed to their own assumptions. Review the diff anyway. |
| "The change is small." | Small diffs can still add wrong abstractions, hidden branches, or unsafe behavior. |
| "We can clean it up later." | Deferred cleanup rarely happens. Separate and handle it deliberately. |
| "The reviewer asked for it, so implement it." | Review feedback is input to evaluate, not an order to follow blindly. |
| "A persona found no issues." | A specialist view is not the canonical verdict; review all axes. |
| "Simplicity review is optional because the code works." | Working code can still add avoidable ownership cost. Check whether the same behavior needs less surface area. |

## Red Flags

- "LGTM" with no evidence of what was checked.
- Findings have no severity, file reference, or required action.
- Review only repeats the test output.
- Security-sensitive changes have no security pass.
- A refactor moves complexity without reducing concepts a reader must hold.
- A new dependency appears without need, license, maintenance, and vulnerability consideration.
- Feature-specific logic leaks into shared modules.
- Over-engineering findings are applied without checking safety, correctness, and the requested behavior.
- The final report omits commands run or known skipped checks.

## Verification

Before closing a review gate:

- Requirements and diff were inspected directly.
- Tests were reviewed for behavior-level coverage.
- Correctness, readability, architecture, security, and performance were considered.
- Simplicity was considered, including deletion, standard library, native, installed dependency, YAGNI, and shrink opportunities.
- Critical findings are fixed.
- Required findings are fixed or explicitly deferred with justification.
- Optional and Nit findings are clearly marked as non-blocking.
- The verification story states exact commands and results.
- Follow-up work is named when a concern is real but outside the approved scope.
