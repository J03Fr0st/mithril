---
name: simplicity-audit
description: Use when auditing a repository or large area for over-engineering, deletion opportunities, avoidable dependencies, speculative abstractions, native replacements, or standard-library replacements.
---

# Simplicity Audit

## Overview

Simplicity audit is a report-only scan of a repository or large area for owned complexity that can be deleted, replaced, or shrunk. Rank the biggest simplifications first.

It is broader than `simplicity-review`: audit the tree, not just one diff.

## When to Use

Use this skill:

- When asked to audit a codebase, package, module, or large feature area for bloat.
- When the user asks what can be deleted, simplified, replaced with native capability, or replaced with standard library behavior.
- Before a cleanup plan where the first step should be evidence, not edits.
- When repeated wrappers, one-off abstractions, flags, or dependencies appear across the tree.

Do not apply fixes while using this skill. Report findings only. Do not recommend removing trust-boundary validation, authorization, security controls, accessibility basics, data-loss prevention, root-cause debugging, or necessary tests.

## Audit Targets

Look for:

- Dependencies that duplicate standard library, native platform, framework, database, or already-installed package capability.
- Interfaces, factories, adapters, providers, or strategy layers with one current implementation.
- Options or extension points nobody uses.
- Wrappers that only delegate.
- Helpers that hide one line of clearer code.
- Repeated custom parsing, formatting, date handling, collection transforms, retries, or caching.
- Dead files, unused exports, and feature scaffolding with no current caller.

## Report Format

Rank findings by likely net reduction:

`<tag>: <what to cut>. <replacement>. [<path>]`

Use these tags: `delete`, `stdlib`, `native`, `yagni`, `shrink`.

End with `net: -<N> lines, -<M> deps possible.` If there is nothing worth cutting, say `Lean already. Ship.`

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "An audit should fix the obvious items." | The audit is report-only. Edits need a separate approved task. |
| "Every old file is suspect." | Age is not bloat. Look for unused or needless complexity with evidence. |
| "One implementation may become many." | Current callers decide current shape. |
| "A broad audit can skip tests." | Tests show whether a simplification is safe to attempt later. |
| "Security checks look repetitive." | Repetition at trust boundaries may be intentional defense, not waste. |

## Red Flags

- Findings are not ranked.
- Findings lack paths or replacement guidance.
- The audit recommends deleting validation, authorization, accessibility, data-loss protection, or root-cause handling.
- The report treats generated artifacts, vendored code, or external assets as cleanup targets without confirming ownership.
- The audit applies fixes or stages files.

## Verification

Before closing a simplicity audit:

- The scanned scope is stated.
- Dependency surfaces, repeated abstractions, wrappers, options, and dead exports were checked where relevant.
- Every finding uses `delete`, `stdlib`, `native`, `yagni`, or `shrink`.
- Every finding includes a path and concrete replacement or deletion guidance.
- Safety boundaries and required tests were preserved.
- No files were edited as part of the report-only audit.
