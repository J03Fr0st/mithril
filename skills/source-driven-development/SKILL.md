---
name: source-driven-development
description: Use when framework, library, platform, browser, API, or standard-specific correctness depends on current authoritative documentation rather than memory.
---

# Source-Driven Development

## Overview

APIs, frameworks, and platform guidance change. Source-driven development grounds implementation decisions in authoritative current documentation so code does not depend on stale memory or copied folklore.

Use `test-driven-development` to prove local behavior and `doubt-driven-development` for non-trivial reasoning about the sourced pattern.

## When to Use

- Writing or reviewing framework-specific code where version matters.
- Building reusable patterns, starters, templates, or boilerplate that others will copy.
- Using browser, runtime, platform, protocol, dependency, or SDK behavior that may have changed.
- The user asks for current, official, documented, verified, or best-practice implementation.
- Existing project code conflicts with current docs.

Do not use it for pure language logic, renames, formatting, or direct edits whose correctness is independent of external APIs.

## Process

1. Detect versions from the project.
   - Read dependency manifests, lockfiles, runtime files, framework config, or installed tool output.
   - If versions are ambiguous and the answer depends on them, ask.

2. Fetch authoritative sources.
   - Prefer official docs, official API references, official migration guides, official changelogs, standards, and compatibility data.
   - Avoid tutorials, Q&A sites, blog posts, and memory as primary authority.

3. Read the specific page.
   - Fetch the page for the exact API or pattern, not an entire docs site.
   - Capture deprecations, caveats, version gates, examples, and required setup.

4. Compare with the repo.
   - If official guidance conflicts with local style or existing code, surface the conflict and choose deliberately.
   - Local compatibility may justify using a documented older pattern; make the tradeoff visible.

5. Implement and cite.
   - Use the documented API signatures and constraints.
   - Cite source URLs in the final report or docs when the decision is non-obvious.
   - Clearly mark anything that could not be verified.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "I know this API." | Memory can be stale even when it feels certain. |
| "Docs are too slow to check." | Debugging a wrong version-specific pattern is slower. |
| "The docs will not cover this." | If official docs do not cover it, that is important risk information. |
| "A popular blog says this." | Secondary sources can be useful context, not authority. |
| "The existing code proves the pattern." | Existing code may be legacy, obsolete, or locally constrained. |

## Red Flags

- Framework-specific code is written without checking the detected version.
- "I think" or "should" is used for API behavior that can be documented.
- Deprecated APIs appear in new code without an explicit compatibility reason.
- A citation points to a tutorial instead of official docs.
- The entire docs site is fetched instead of the relevant page.
- Conflicts between docs and repo conventions are hidden.

## Verification

- Relevant package, framework, runtime, or platform versions were identified.
- Official sources were consulted for the pattern being used.
- Implementation follows documented signatures, caveats, and migration guidance.
- Non-obvious decisions include source URLs.
- Deprecated APIs are avoided or explicitly justified.
- Unverified claims are labeled as unverified.
- Final claims are gated by `verification-before-completion`.
