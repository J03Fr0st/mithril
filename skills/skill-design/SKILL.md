---
name: skill-design
description: Use when creating, editing, porting, validating, or reviewing Mithril skills, routers, skill descriptions, or docs/skill-anatomy.md conformance.
---

# Skill Design

## Overview

Skill design turns recurring agent behavior into a predictable, validator-backed workflow. A Mithril skill should be a concise process with clear triggers, completion criteria, and anti-rationalization only where agents are likely to skip discipline under pressure.

Use `docs/skill-anatomy.md` as the format contract.

## When to Use

Use this skill for:

- Creating a new Mithril skill.
- Editing or porting an existing skill into Mithril.
- Updating `using-mithril` routing.
- Reviewing a skill for discovery, duplication, validator conformance, or dead references.
- Deciding whether guidance belongs in a skill body, supporting file, router, or validator.

Do not use it for one-off project instructions that should live in repo docs, or for mechanical constraints that a validator can enforce directly.

## Process

1. Define the behavior and trigger.
   - State the problem the skill prevents or the process it standardizes.
   - Decide whether the skill must be model-invoked. If yes, the description needs rich trigger conditions.
   - Keep descriptions trigger-focused and start with "Use when". Do not summarize the workflow in frontmatter.

2. Classify the failure type.

| Failure Type | Best Skill Shape |
| --- | --- |
| Discipline is skipped under pressure | Hard rule, rationalization table, red flags, verification gate |
| Output has the wrong shape | Positive recipe or output contract |
| Required element is omitted | Explicit required field or checklist slot |
| Behavior depends on a condition | Conditional keyed to an observable predicate |

3. Create a red signal before writing guidance.
   - For discipline skills, use pressure scenarios or review known failures to capture actual rationalizations.
   - For shape guidance, compare against a no-guidance control when possible.
   - For this repo, also use validator failures and task RED checks as concrete red signals.

4. Write the minimum skill.
   - Use `skills/<name>/SKILL.md`.
   - Frontmatter `name` must match the directory.
   - Frontmatter `description` must contain "Use when".
   - Include the required headings or accepted aliases from `docs/skill-anatomy.md`.
   - Put the main process inline. Move only heavy references, scripts, templates, or assets into supporting files.
   - Reference other skills by canonical Mithril name only when they already exist.

5. Consolidate instead of duplicating.
   - Do not import competing loops for TDD, debugging, review, planning, delivery, or skill authoring.
   - Merge the useful guidance into one Mithril-owned workflow.
   - Keep one source of truth for each behavior and route only canonical names from `using-mithril`.

6. Validate and prune.
   - Run the skill validator after edits.
   - Remove no-op prose that does not change agent behavior.
   - Make completion criteria checkable and evidence-based.
   - Ensure examples are reusable patterns, not narratives about one past session.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The description can summarize the workflow." | Agents may follow the summary and skip the body. Keep descriptions to triggers. |
| "More detail makes it safer." | Extra prose hides the actual process and increases context load. |
| "A second skill can cover the same loop from another angle." | Competing loops create conflicting authority. Merge the behavior. |
| "This rule is obvious." | If agents skip it under pressure, make the rationalization explicit. If they do not, omit it. |
| "A warning list will shape the output." | Shape failures need a positive recipe, not only prohibitions. |
| "Validation passing means the skill is useful." | Validation proves structure. Use scenarios or review to prove behavior. |

## Red Flags

- Frontmatter name differs from the directory.
- Description lacks "Use when" or describes process steps instead of triggers.
- Required sections are missing or renamed outside accepted aliases.
- The skill points to a future skill, persona, command, or reference that does not exist.
- A router imports an upstream duplicate instead of a Mithril canonical skill.
- The skill reads like a blog post, history, or generic advice.
- Verification criteria cannot be checked with commands, artifacts, or concrete inspection.

## Verification

Before reporting skill work complete:

- `npm run validate:skills` passes after the final edit.
- Router references point only to existing Mithril skills.
- Required headings match `docs/skill-anatomy.md` or its accepted aliases.
- Frontmatter descriptions are trigger-focused and contain "Use when".
- Duplicate upstream loops were merged into canonical Mithril skills instead of routed separately.
- Any skipped scenario testing or unresolved authoring concern is reported.
