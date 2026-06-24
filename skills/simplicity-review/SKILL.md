---
name: simplicity-review
description: Use when reviewing a diff for over-engineering, unnecessary abstractions, duplicated platform or standard-library behavior, avoidable dependencies, or code that could be deleted without losing requested behavior.
---

# Simplicity Review

## Overview

Simplicity review is a report-only diff review for unnecessary complexity. It finds what can be deleted, replaced with existing capability, or shrunk without changing requested behavior.

It complements `code-review-and-quality`; it does not replace correctness, security, accessibility, performance, or test review.

## When to Use

Use this skill:

- After a focused diff exists and before a final review gate.
- When asked whether a change is over-engineered or can be simplified.
- When a change adds abstractions, dependencies, options, wrappers, or broad helpers.
- When the implementation is correct but larger than the behavior appears to require.

Do not apply fixes while using this skill. Report findings only. Do not recommend removing trust-boundary validation, authorization, security controls, accessibility basics, data-loss prevention, root-cause debugging, or necessary tests.

## Review Format

Write one line per finding:

`<file>:L<line>: <tag>: <what to cut>. <replacement>.`

Use these tags:

| Tag | Use For |
| --- | --- |
| `delete` | Dead code, unused flexibility, speculative features, or wrappers with no current value. |
| `stdlib` | Custom code that duplicates the standard library. Name the standard function or type. |
| `native` | Code or dependencies that duplicate platform, framework, browser, database, or runtime features. |
| `yagni` | Abstractions, options, or layers with one current caller or implementation. |
| `shrink` | Same behavior in fewer lines with clearer local code. |

End with `net: -<N> lines possible.` If there is nothing worth cutting, say `Lean already. Ship.`

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "Correctness review already passed." | Correct code can still own needless complexity. |
| "This may be useful someday." | Review current behavior and current callers. Future usefulness is not evidence. |
| "It is only a small wrapper." | Small wrappers still add names, files, tests, and maintenance. |
| "The dependency is popular." | Popularity does not justify duplicating native or installed capability. |
| "Removing this check makes it simpler." | Safety checks are out of scope for simplification findings unless they are truly unreachable. |

## Red Flags

- A finding asks for an edit but does not name the replacement.
- A finding is about a correctness bug, security issue, or performance defect instead of complexity.
- The review flags required tests, validation, authorization, accessibility, or data-loss protection as bloat.
- The report rewrites the design in prose instead of listing actionable cuts.
- The review applies changes instead of reporting them.

## Verification

Before closing a simplicity review:

- The actual diff was inspected, not only a summary.
- Every finding uses `delete`, `stdlib`, `native`, `yagni`, or `shrink`.
- Every finding names what to remove and what replaces it.
- Safety boundaries and required tests were preserved.
- Correctness, security, accessibility, performance, and broader quality concerns are routed to `code-review-and-quality`.
- No files were edited as part of the report-only review.
