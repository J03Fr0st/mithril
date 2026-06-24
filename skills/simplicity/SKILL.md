---
name: simplicity
description: Use when choosing the smallest correct implementation, resisting over-engineering, deciding whether code should exist, or selecting between existing code, standard library, native features, dependencies, and custom code.
---

# Simplicity

## Overview

Simplicity means solving the current verified need with the least owned surface after understanding the problem. It removes bloat without removing correctness, safety, or explicitly requested behavior.

Core rule: climb the ladder before writing custom code.

## When to Use

Use this skill:

- Before adding production code, helpers, abstractions, options, extension points, or dependencies.
- During GREEN in `test-driven-development`, after the failing test defines the behavior.
- During implementation review through `implementation-standards` or `code-review-and-quality`.
- When a diff feels larger than the behavior it delivers.
- When a bug fix may belong in a shared root cause instead of one reported symptom path.

Do not use it to skip problem understanding, weaken tests, or remove trust-boundary validation, authorization, security controls, accessibility basics, data-loss prevention, or root-cause debugging.

## Simplicity Ladder

Stop at the first rung that fully solves the current need:

1. Does this need to exist?
2. Is it already in this codebase?
3. Does the standard library solve it?
4. Does a native platform feature solve it?
5. Does an already-installed dependency solve it?
6. Can it be one line?
7. Only then write minimum custom code.

Read the touched flow first. The smallest change in the wrong place is still wrong. For bug fixes, trace callers and fix the shared root cause when that is the smaller complete repair.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "This abstraction will help later." | Later pressure can create later structure. One current caller is not enough. |
| "A helper makes it cleaner." | Reuse an existing helper or write the call inline when the helper hides no real complexity. |
| "A dependency is faster." | Installed dependencies may be faster; new dependencies add ownership, risk, and review cost. |
| "Custom code is clearer than native behavior." | Native and standard behavior are usually better tested and better understood by future maintainers. |
| "Simplicity means deleting checks." | Validation, authorization, accessibility, data-loss prevention, and trust-boundary checks are correctness. |
| "The ticket mentions this path, so patch here." | Symptom patches leave sibling callers broken. Find the shared cause before editing. |

## Red Flags

- A new interface, factory, adapter, option, or extension point has one current use.
- A new dependency appears before checking local utilities, standard library, native platform features, and installed packages.
- Custom parsing, formatting, date handling, retries, caching, or collection logic duplicates a built-in capability.
- Code is added to every caller when one shared function owns the behavior.
- A safety check is removed because it looks verbose.
- The explanation defending the design is longer than the change.

## Verification

Before reporting the implementation shape as simple:

- The touched flow was read enough to avoid symptom-only changes.
- Each rung of the simplicity ladder was considered in order.
- Any new custom code has a current tested need.
- New dependencies, public APIs, options, and abstractions were avoided unless the ladder required them.
- Trust-boundary validation, authorization, security controls, accessibility basics, data-loss prevention, and root-cause debugging were preserved.
- Evidence is reported through `verification-before-completion`.
