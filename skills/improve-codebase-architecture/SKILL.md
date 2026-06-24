---
name: improve-codebase-architecture
description: Use when scanning a codebase for architecture deepening opportunities, module seams, interface simplification, or test-surface improvements.
---

# Improve Codebase Architecture

## Overview

This skill surfaces architectural friction and proposes deepening opportunities: changes that move complexity behind better interfaces, improve locality, and make behavior easier to test through real seams.

## When to Use

Use this skill when:

- The user asks for architecture improvement opportunities.
- A codebase feels hard to understand, test, or change.
- Modules are shallow, tightly coupled, or pass-through-heavy.
- A refactor candidate needs visual explanation before design work.

Use `codebase-design` for the vocabulary and `grill-with-docs` when a chosen candidate needs plan pressure.

## Process

1. Read relevant `CONTEXT.md`, `CONTEXT-MAP.md`, and ADRs when present.
2. Explore the codebase for friction:
   - Understanding one concept requires many file hops.
   - Interfaces expose too much caller coordination.
   - Tests bypass the public seam.
   - Extracted helpers reduce duplication but not locality.
   - Coupled modules leak implementation details across seams.
3. Use `codebase-design` terms exactly: module, interface, implementation, seam, adapter, depth, leverage, locality.
4. Apply the deletion test to suspected shallow modules.
5. Produce a self-contained HTML report in the OS temp directory, not the repo.
6. For each candidate, include files, problem, solution, benefit, before/after visual, and recommendation strength.
7. Ask the user which candidate to explore next.
8. For the selected candidate, use `grill-with-docs` to test the plan and update domain or decision records when needed.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "I should propose interfaces immediately." | First surface candidates and let the user choose where to spend design effort. |
| "A long text report is enough." | Architecture friction is often relationship-shaped; visuals expose it faster. |
| "Every awkward file deserves a refactor." | Only candidates with meaningful leverage, locality, or test-surface gains belong. |
| "Existing ADRs block the topic." | ADRs can be reopened, but only when current friction justifies it. |

## Red Flags

- Suggestions are generic cleanup rather than deepening opportunities.
- The report uses vague labels instead of project domain terms.
- A candidate contradicts an ADR without saying so.
- The proposed seam has no real variation or test value.
- The report is written into the repo as incidental output.

## Verification

Before presenting results:

- Relevant domain docs and ADRs were checked when present.
- Each candidate uses `codebase-design` vocabulary.
- Each candidate states the test-surface improvement.
- The HTML report is self-contained and saved outside the repo.
- The top recommendation explains why it should be explored first.
