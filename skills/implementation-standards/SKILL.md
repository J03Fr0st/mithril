---
name: implementation-standards
description: Use when implementing, refactoring, reviewing code shape, choosing tests, naming domain concepts, adding dependencies, or reporting evidence for code changes.
---

# Implementation Standards

## Overview

Implementation standards govern how code should look, where behavior should live, and what evidence proves the change is safe. Style is not taste: local conventions, tools, tests, and domain vocabulary decide.

Core rule: make the smallest behavior-correct change that fits the local codebase and can be verified with fresh evidence.

## When to Use

Use this skill:

- Before writing or reviewing production code.
- When choosing test seams, module boundaries, names, dependencies, or abstractions.
- When a change risks mixing feature work with refactoring or formatting.
- When reporting whether code is ready, complete, or safe to hand off.

Do not use it to expand scope beyond the requested behavior. Raise unrelated improvement opportunities separately.

## Process

1. Inspect the touched area.
   - Read nearby files, tests, config, and build scripts before choosing a style.
   - Identify naming, error handling, module layout, dependency, and test patterns already in use.
   - Read `CONTEXT.md` and relevant ADRs when they exist. If vocabulary is unclear, treat it as a design question.

2. Let behavior drive shape.
   - Use `test-driven-development` for behavior changes.
   - Test through the public seam callers use.
   - Prefer deep modules: narrow interfaces that hide substantial implementation.
   - Do not expose internals only to make tests easier.

3. Choose the smallest sufficient implementation.
   - Use the `simplicity` skill when the smallest sufficient implementation is not obvious.
   - Apply the `simplicity` ladder in order before adding custom code, dependencies, public APIs, options, or abstractions.
   - Add a new dependency only when the existing stack cannot reasonably solve the problem and the license, maintenance, size, and security tradeoffs are acceptable.
   - Do not add speculative configurability, extension points, compatibility layers, or abstractions.
   - Simplicity does not mean removing validation, authorization, security controls, accessibility, data-loss handling, trust-boundary checks, or root-cause debugging.

4. Follow local style and tool decisions.
   - Formatters, linters, type checks, manifest validators, and project scripts decide mechanical style.
   - Match adjacent code where tools are silent.
   - Keep feature edits, refactors, generated artifacts, and formatting-only changes separable unless the user approved a combined change.

5. Refactor only with evidence.
   - Refactor after behavior is green, not while chasing a failing test.
   - A refactor should reduce concepts, remove duplication, deepen a module, or isolate a clearer seam.
   - Moving complexity without reducing it is churn.

6. Review the result.
   - Use `code-review-and-quality` to check correctness, readability, architecture, security, and performance.
   - Verify type boundaries, dependency choices, missed simplifications, and local consistency.

7. Report evidence.
   - Run the focused tests and broader checks appropriate to the change.
   - Report exact commands, pass/fail results, skipped checks, and reasons.
   - Use `verification-before-completion` before any completion or readiness claim.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "I prefer a different style." | Local style and tooling beat individual preference. |
| "This abstraction will help later." | Future use does not justify present complexity. Wait for real pressure. |
| "Tests need an internal hook." | If callers cannot use that seam, reconsider the module shape. |
| "Refactoring while here saves time." | Mixed changes are harder to review and revert. Separate them unless approved. |
| "Simpler means fewer checks." | Safety checks at trust boundaries are part of correctness, not bloat. |
| "The ladder is only for new features." | Bug fixes, refactors, and tests can also duplicate existing, standard, native, or installed capability. |
| "The command should pass." | Evidence requires a fresh command result, not confidence. |

## Red Flags

- New code does not resemble nearby code without an explicit reason.
- A public API grows to support only a test or hypothetical future caller.
- A dependency is added before checking existing utilities and native features.
- Behavior, refactor, formatting, and generated output are bundled without approval.
- Domain names conflict with glossary, ADRs, or surrounding code.
- Validation or authorization is removed in the name of simplicity.
- A bug fix patches one symptom path without checking for a shared root cause.
- Completion is claimed without exact verification evidence.

## Verification

Before reporting implementation complete:

- The touched area's local style, tests, and conventions were inspected.
- Behavior changes have tests through the public seam.
- The simplicity ladder was considered before adding custom code, dependencies, public APIs, options, or abstractions.
- Mechanical checks required by the repo were run or explicitly unavailable.
- Refactors are either necessary for the task or separated from behavior changes.
- New dependencies, public APIs, and abstractions have concrete present need.
- Security, data-loss, authorization, accessibility, trust-boundary checks, and root-cause debugging were preserved where relevant.
- Exact verification commands and results are reported.
