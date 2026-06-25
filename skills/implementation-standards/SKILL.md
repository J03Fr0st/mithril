---
name: implementation-standards
description: Use when implementation work needs local code-shape rules, tool-backed style, dependency choices, test seams, naming, or evidence requirements before code is written or reviewed.
---

# Implementation Standards Source Baseline

## Overview

This is the copied-and-renamed Mithril baseline for code-shape governance. It is sourced from the approved Mithril merge design's Code Shape Governance section and is intentionally not merged into the other copied skills yet.

Mithril treats code appearance and structure as enforceable engineering constraints, not taste.

## When to Use

- Before implementing a task that touches local code style, architecture, public interfaces, dependencies, tests, or naming.
- Before reviewing a diff where correctness alone is not enough.
- When deciding whether to reuse local code, the standard library, platform features, installed dependencies, or custom code.
- When project vocabulary, ADRs, or surrounding modules should shape names and seams.

## Source Principles

| Principle | Mithril rule |
| --- | --- |
| Mechanical style belongs to tools. | Formatters, linters, type checks, manifest checks, and validators decide objective style and structural validity. |
| Local consistency beats external preference. | Inspect nearby code and follow the local pattern unless changing that pattern is the task. |
| Behavior drives shape. | Add one behavior at a time, write the smallest green implementation, then refactor only while tests stay green. |
| Interfaces are design surfaces. | Prefer deep modules, narrow public APIs, and tests that cross the same seam as callers. |
| Simplicity is not code golf. | Remove speculative code, but do not remove validation, security, accessibility, or data-loss prevention. |
| Review covers more than passing tests. | Review architecture, readability, security, performance, type boundaries, dependency choices, and missed simplifications. |
| Refactors stay separate and reversible. | Keep behavior changes, refactors, generated artifacts, and formatting-only changes separate unless explicitly approved. |
| Domain language shapes names. | Names should come from the repo glossary, ADRs, and surrounding code. |
| Evidence before claims. | Run and report the commands that prove formatting, linting, tests, or validation passed. |

## Core Loop

1. Inspect the touched area and identify local style, architecture, naming, and test patterns.
2. Choose the smallest behavior slice and write or update the test at the public seam.
3. Implement the minimum code that passes using existing code, standard library, native features, or installed dependencies first.
4. Run formatter, linter, type checks, and the focused test.
5. Refactor only while tests stay green, keeping feature and refactor changes separable.
6. Review correctness, readability, architecture, security, performance, and simplicity.
7. Report verification evidence, including skipped checks and why.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "This style is cleaner than the surrounding code." | Local consistency wins unless the style change is the approved task. |
| "The tests pass, so the shape is fine." | Tests are necessary but not sufficient; review still covers architecture, readability, security, and simplicity. |
| "A new abstraction will help later." | Future flexibility is speculative until a real second use exists. |
| "This dependency is convenient." | Existing code, standard library, native platform features, and installed dependencies come first. |

## Red Flags

- Introducing a new pattern without checking nearby files first.
- Exposing internals just to make tests easier.
- Mixing behavior changes with broad formatting or refactoring.
- Adding configuration, extension points, or dependency wrappers before there is a real caller.
- Reporting completion without current command output.

## Verification

Before accepting implementation work:

1. Identify the local style and architectural pattern that governed the change.
2. Run the focused behavior check for the touched seam.
3. Run available formatting, linting, type, validator, and project test commands.
4. Record skipped checks with a concrete reason.
