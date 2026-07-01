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

## Standards Taxonomy

Classify each standard before applying it:

| Kind | Authority | How to use it |
| --- | --- | --- |
| Tool-enforced rule | Formatter, linter, type checker, validator, compiler, test harness | Run the tool and obey its output. Do not argue style by prose when a configured tool decides it. |
| Repo convention | Nearby code, tests, docs, ADRs, glossary, public APIs | Follow the local pattern unless changing that pattern is the task. |
| Risk overlay | Security, accessibility, reliability, release, data, or supply-chain standard | Apply only when the touched behavior crosses that risk boundary, then name the evidence needed. |
| Engineering judgment | Simplicity, module depth, test seam, dependency choice, refactor boundary | State the tradeoff and keep the decision reversible where practical. |
| Personal taste | Preference not backed by tools, local pattern, risk, or requirement | Do not make it a blocking standard. Mention it only as optional review feedback. |

## Pre-Coding Standards Scan

Before writing production code, inspect the touched area and name the governing standards:

1. Tooling: package scripts, formatter, linter, type checker, validators, test runner, pre-commit hooks.
2. Local shape: neighboring modules, test style, file responsibilities, naming, error handling, dependency patterns.
3. Public seam: CLI, API, component, exported function, data contract, or workflow callers actually use.
4. Domain language: glossary, ADRs, docs, existing names, and user-provided terms.
5. Risk boundaries: external input, auth, secrets, money, data loss, accessibility, performance, release packaging, CI, supply chain, migrations, distributed state.
6. Evidence plan: focused RED/GREEN test, validation command, review check, static analysis, browser evidence, or explicit "not applicable".

## Core Loop

1. Run the pre-coding standards scan and state the applicable rules, conventions, risk overlays, and evidence plan.
2. Choose the smallest vertical behavior slice and write or update the test at the public seam.
3. If fixing a bug, build the feedback loop first: reproduce, minimize, or instrument the failure.
4. Implement the minimum code that passes using existing code, standard library, native features, or installed dependencies first.
5. Refactor only while tests stay green, keeping behavior changes, refactors, generated artifacts, and formatting-only changes separable.
6. Run formatter, linter, type checks, validators, and the focused test.
7. Review correctness, readability, architecture, security, performance, simplicity, dependency choice, and verification quality.
8. Report verification evidence, including skipped checks and why.

## Engineering Rules

- Prefer deep modules with narrow public APIs over shallow wrappers that spread complexity across callers.
- Test through the public seam or narrowest stable API. Do not expose internals or mock local modules just to make tests convenient.
- Refactor in behavior-preserving steps. If a feature needs refactoring first, make that boundary explicit and keep the diff separable.
- In legacy code, find or create a safe seam before reshaping behavior. Characterize current behavior when the intended behavior is unclear.
- Treat data, distributed systems, concurrency, migrations, and persistence as design surfaces. State reliability, maintainability, scalability, and rollback tradeoffs before changing them.
- Add dependencies only after checking existing code, the standard library, native platform features, and installed dependencies. A dependency must reduce real risk or complexity, not just save a few lines.
- Keep configuration, extension points, and abstractions tied to a current caller. A predicted future caller is not enough.
- Preserve validation, authorization, accessibility, observability, and data-loss prevention when simplifying code.

## Design Principles Lens

Use design principles as review lenses, not slogans:

| Lens | Ask |
| --- | --- |
| Information hiding | What design decision should this module hide from callers? |
| Deep module | Is the public interface smaller and simpler than the behavior it provides? |
| Cohesion | Does this unit have one clear responsibility at the chosen level of abstraction? |
| Coupling | What other code must change if this changes, and can that dependency be weakened? |
| Composition | Can this behavior work with existing pieces without special cases or hidden global state? |
| Predictability | Does the code do what a local reader would expect from its name, type, and surrounding patterns? |
| Domain fit | Do names and boundaries match the problem language used by the repo and user? |
| YAGNI | Is every abstraction, option, and extension point needed by the current task? |

## Risk Overlays

Load or apply deeper guidance only when the touched behavior crosses the boundary:

| Boundary | Standards to consider | Evidence to produce |
| --- | --- | --- |
| Web or API security | OWASP ASVS, OWASP Top 10, CWE Top 25 | Threat-specific tests, input validation checks, auth/authorization review, dependency or static-analysis evidence. |
| Secure development lifecycle | NIST SSDF, SEI CERT secure coding guidance | Secure design note, code review evidence, vulnerability handling, unsafe API checks, release or provenance controls. |
| Accessibility | WCAG 2.2 | Keyboard, screen reader semantics, contrast, focus, reduced-motion, and browser evidence for affected UI. |
| Services and runtime config | Twelve-Factor App | Environment/config separation, statelessness, logging, dependency declaration, startup/shutdown behavior. |
| Public API or package release | SemVer, Conventional Commits, project release policy | Compatibility assessment, changelog or changeset, version impact, migration note when needed. |
| Supply chain and CI/CD | OpenSSF Scorecard, SLSA, project automation policy | Pinned permissions, provenance, dependency update path, CI gate, artifact verification. |
| High-reliability or safety-sensitive code | NASA Power of Ten style constraints adapted to the language | Bounded complexity, static analysis, warnings clean, explicit error handling, focused stress or edge-case tests. |

Do not paste these standards into every task. Name the applicable boundary, use the relevant checklist or standard as review input, and report the concrete evidence.

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
| "This standard is best practice, so it always applies." | Standards apply through the touched risk boundary. Irrelevant checklists create noise and false confidence. |
| "This is only docs or prompts, so standards do not apply." | Behavior-shaping docs are runtime instructions for agents. Validate structure and prove behavior when the rule changes conduct. |

## Red Flags

- Introducing a new pattern without checking nearby files first.
- Exposing internals just to make tests easier.
- Mixing behavior changes with broad formatting or refactoring.
- Adding configuration, extension points, or dependency wrappers before there is a real caller.
- Reporting completion without current command output.
- Fixing a symptom before reproducing or instrumenting the failure.
- Mocking internal modules instead of testing the public seam.
- Duplicating guidance across skills without one canonical home.
- Treating an external book, checklist, or standard as higher authority than explicit user scope or local repo rules.
- Applying a security, accessibility, release, or supply-chain checklist without naming the concrete boundary it protects.
- Blocking a change on personal taste after tools, local conventions, and requirements are satisfied.
- Applying SOLID, GRASP, CUPID, or another design principle as a slogan without naming the concrete design pressure it resolves.

## Verification

Before accepting implementation work:

1. Identify the standards taxonomy for the change: tool rules, repo conventions, risk overlays, judgment calls, and non-blocking taste.
2. Identify the local style and architectural pattern that governed the change.
3. Run the focused behavior check for the touched seam.
4. Confirm bug fixes have a feedback loop and regression check.
5. Confirm any risk overlay has matching evidence or is explicitly not applicable.
6. Confirm review feedback was resolved with evidence, clarification, or explicit deferral.
7. Run available formatting, linting, type, validator, and project test commands.
8. Record skipped checks with a concrete reason.
