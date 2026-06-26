---
name: implementation-standards
description: Use when implementation work needs local code-shape rules, tool-backed style, dependency choices, test seams, naming, or evidence requirements before code is written or reviewed.
---

# Implementation Standards

## Overview

Mithril treats implementation shape as an enforceable engineering constraint, not taste. This skill summarizes the cross-cutting rules that should govern coding, debugging, testing, review, naming, dependencies, and verification.

Use the dedicated skills for deep workflow guidance. Use this skill as the local standard that keeps those workflows aligned.

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
| Behavior drives shape. | Add one vertical behavior at a time, write the smallest green implementation, then refactor only while tests stay green. |
| Interfaces are design surfaces. | Prefer deep modules, narrow public APIs, and tests that cross the same seam as callers. Do not expose internals just to make tests convenient. |
| Simplicity is not code golf. | Remove speculative code, but do not remove validation, security, accessibility, or data-loss prevention. |
| Review covers more than passing tests. | Review architecture, readability, security, performance, type boundaries, dependency choices, and missed simplifications. |
| Refactors stay separate and reversible. | Keep behavior changes, refactors, generated artifacts, and formatting-only changes separate unless explicitly approved. |
| Domain language shapes names. | Names should come from the repo glossary, ADRs, and surrounding code. |
| Evidence before claims. | Run and report the commands that prove formatting, linting, tests, or validation passed. |
| Bugs require feedback loops. | Reproduce, minimize, or instrument before proposing fixes. Fix root causes, not symptoms. |
| Reviews are technical claims. | Request focused review, evaluate feedback with evidence, and clarify or push back when feedback is ambiguous or unsound. |

## Core Loop

1. Inspect the touched area and identify local style, architecture, naming, and test patterns.
2. Choose the smallest vertical behavior slice and write or update the test at the public seam.
3. If fixing a bug, build the feedback loop first: reproduce, minimize, or instrument the failure.
4. Implement the minimum code that passes using existing code, standard library, native features, or installed dependencies first.
5. Run formatter, linter, type checks, validators, and the focused test.
6. Refactor only while tests stay green, keeping feature and refactor changes separable.
7. Review correctness, readability, architecture, security, performance, simplicity, and verification quality.
8. Report verification evidence, including skipped checks and why.

## Skill and Documentation Changes

Treat behavior-shaping documentation like code:

- Update the active canonical skill, command, or doc that owns the rule.
- Preserve provenance folders and source material when they are part of the design.
- Keep routing names stable unless a task explicitly renames them.
- Prefer a short pointer to a canonical rule over duplicating the same guidance in multiple places.
- Validate skills and commands after changing runtime-facing documentation.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "This style is cleaner than the surrounding code." | Local consistency wins unless the style change is the approved task. |
| "The tests pass, so the shape is fine." | Tests are necessary but not sufficient; review still covers architecture, readability, security, and simplicity. |
| "A new abstraction will help later." | Future flexibility is speculative until a real second use exists. |
| "This dependency is convenient." | Existing code, standard library, native platform features, and installed dependencies come first. |
| "The error says X, so I'll patch X." | Error output is evidence to verify, not a root-cause conclusion. |
| "The reviewer asked for it, so I should just implement it." | Review feedback is a technical claim; verify it and clarify when needed. |

## Red Flags

- Introducing a new pattern without checking nearby files first.
- Exposing internals just to make tests easier.
- Mixing behavior changes with broad formatting or refactoring.
- Adding configuration, extension points, or dependency wrappers before there is a real caller.
- Reporting completion without current command output.
- Fixing a symptom before reproducing or instrumenting the failure.
- Mocking internal modules instead of testing the public seam.
- Duplicating guidance across skills without one canonical home.

## Verification

Before accepting implementation work:

1. Identify the local style and architectural pattern that governed the change.
2. Run the focused behavior check for the touched seam.
3. Confirm bug fixes have a feedback loop and regression check.
4. Confirm review feedback was resolved with evidence, clarification, or explicit deferral.
5. Run available formatting, linting, type, validator, and project test commands.
6. Record skipped checks with a concrete reason.
