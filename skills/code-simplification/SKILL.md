---
name: code-simplification
description: Use when working code is harder to read, test, review, or maintain than necessary, or when refactoring for clarity without changing behavior.
---

# Code Simplification

## Overview

Simplification reduces the concepts a reader must hold while preserving exact behavior. The goal is not fewer lines; it is code that is easier to understand, test, modify, and review.

Use `implementation-standards` for local style and `code-review-and-quality` to judge whether the change is a net improvement.

## When to Use

- A working implementation is heavier, more nested, more duplicated, or less direct than necessary.
- Review finds unclear names, speculative abstractions, long functions, or scattered related logic.
- A refactor is needed before safe feature work can continue.
- Recently changed code accumulated duplication or confusing control flow.

Do not simplify code you do not understand, performance-critical code without measurement, or unrelated areas outside the approved task.

## Process

1. Understand the fence before moving it.
   - Identify responsibility, callers, side effects, error paths, tests, and historical constraints.
   - If behavior is unclear, first use `systematic-debugging` or add characterization tests with `test-driven-development`.

2. Preserve behavior exactly.
   - Keep inputs, outputs, side effects, ordering, errors, and edge cases unchanged.
   - Do not weaken validation, authorization, accessibility, or data-loss protections in the name of simplicity.

3. Target concrete complexity.
   - Flatten deep nesting with guard clauses or named predicates.
   - Split functions that carry multiple responsibilities.
   - Replace clever expressions with readable flow.
   - Remove duplication by extracting a real shared concept.
   - Delete dead code only when it is in scope and proven unused.

4. Work incrementally.
   - Make one simplification at a time.
   - Run focused tests between risky steps.
   - Keep refactor diffs separate from behavior changes unless explicitly approved.

5. Re-evaluate the result.
   - Compare before and after for comprehension.
   - Revert any change that is merely different, shorter, or more fashionable.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Fewer lines is simpler." | Dense code can be harder to parse than explicit code. |
| "I will clean up nearby code too." | Drive-by refactors add review noise and regression risk. |
| "This abstraction might help later." | Speculative flexibility is present cost for hypothetical value. |
| "The type system explains it." | Types describe shape, not intent or business meaning. |
| "Removing checks makes it cleaner." | Safety checks at trust boundaries are part of correctness. |

## Red Flags

- Tests must be changed because a simplification altered behavior.
- A helper with a domain name is inlined and the call site loses meaning.
- Many unrelated files change without a mechanical reason.
- Error handling, authorization, logging, or accessibility is removed as clutter.
- The code is shorter but requires more context to understand.
- Refactor starts while the suite is red.

## Verification

- Existing behavior is covered by tests or characterization evidence.
- Existing tests pass without weakening assertions.
- The diff is scoped to the approved simplification area.
- The result follows nearby style and reduces real complexity.
- No safety checks, boundary validation, or observability were weakened.
- Review through `code-review-and-quality` finds the change easier to maintain.
- Final evidence is reported with `verification-before-completion`.
