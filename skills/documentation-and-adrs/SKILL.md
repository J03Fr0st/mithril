---
name: documentation-and-adrs
description: Use when recording architectural decisions, documenting public behavior, updating project context, explaining tradeoffs, or preserving information future maintainers and agents will need.
---

# Documentation and ADRs

## Overview

Documentation captures why the system is the way it is. Code shows behavior; good docs preserve decisions, constraints, alternatives, setup, and operational knowledge that would otherwise be rediscovered.

Use `context-engineering` when documentation is meant to guide future agent work.

## When to Use

- Making or changing an architectural decision.
- Choosing a framework, dependency, persistence model, API style, auth approach, deployment model, or migration path.
- Adding or changing a public API, user-facing behavior, setup step, command, or operational process.
- Repeating the same explanation in reviews or handoffs.
- Documenting a known gotcha, invariant, or irreversible tradeoff.

Do not document obvious code or add comments that restate what a line already says.

## Process

1. Choose the right artifact.
   - ADR: durable technical decision with alternatives and consequences.
   - README or guide: setup, commands, workflows, and project map.
   - API docs: public parameters, returns, errors, examples, and compatibility.
   - Inline comment: local non-obvious why, invariant, or gotcha.

2. Document decisions, not chronology.
   - Write current truth in timeless language.
   - Explain constraints, alternatives rejected, and consequences.
   - Avoid "we just added" or implementation-log language unless the artifact is explicitly historical.

3. Keep docs close to the reader.
   - Put public contract details near the API or generated docs.
   - Put operational runbooks near deployment or service docs.
   - Put local gotchas beside the code they protect.

4. Update docs as part of the change.
   - Docs are not a postscript when behavior, setup, or public contracts changed.
   - Supersede ADRs rather than deleting historical decisions.

5. Remove stale documentation.
   - Delete commented-out code.
   - Update examples that no longer compile or match behavior.
   - Remove TODOs that should be resolved in the current scope.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The code is self-documenting." | Code rarely explains constraints, rejected alternatives, or operational consequences. |
| "We will document after it stabilizes." | The design stabilizes faster when the contract is written. |
| "Nobody reads docs." | Future maintainers, reviewers, and agents rely on them as project memory. |
| "ADRs are overhead." | A short ADR prevents repeated debates and accidental reversals. |
| "Comments get stale." | Comments explaining why age better than comments explaining what. |

## Red Flags

- Major decisions have no written rationale.
- Public APIs have no typed contract or error documentation.
- README cannot get a new contributor running.
- Comments explain obvious code while non-obvious invariants are undocumented.
- Documentation describes old behavior or change history as current truth.
- ADRs are edited to erase history instead of superseded.

## Verification

- The chosen artifact matches the permanence and audience of the information.
- Significant decisions include context, decision, alternatives, and consequences.
- Public behavior, setup, and operational changes are reflected in docs.
- Examples and commands are current for the repo.
- No commented-out code or stale TODOs were introduced.
- Documentation needed for completion is included in the `definition-of-done` check.
- Final evidence is reported through `verification-before-completion`.
