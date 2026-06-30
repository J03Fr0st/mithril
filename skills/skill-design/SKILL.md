---
name: skill-design
description: Use when creating, editing, porting, validating, or reviewing Mithril skills, routers, skill descriptions, or skill structure conformance.
---

# Skill Design

## Overview

Skill design turns recurring agent behavior into a predictable, validator-backed workflow. A Mithril skill should be a concise process with clear triggers, completion criteria, and anti-rationalization only where agents are likely to skip discipline under pressure.

Treat official Agent Skills guidance as the compatibility baseline, Superpowers-style pressure scenarios as the behavioral proof technique, and Skillgrade-style evals as the regression option when a skill is important enough to test repeatedly.

## When to Use

Use this skill for:

- Creating a new Mithril skill.
- Editing or porting an existing skill into Mithril.
- Updating `using-mithril` routing.
- Reviewing a skill for discovery, duplication, validator conformance, or dead references.
- Deciding whether guidance belongs in a skill body, supporting file, router, or validator.

Do not use it for one-off project instructions that should live in repo docs, or for mechanical constraints that a validator can enforce directly.

For copied-source rewrites, preserve the source structure first and apply only requested Mithril naming, routing, and validator alignment unless the user explicitly approves a redesign.

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
   - If the change is only a typo, stale pointer, or small wording correction, name that defect as the red signal and keep the edit mechanical.

4. Write the minimum skill.
   - Use `skills/<name>/SKILL.md`.
   - Frontmatter `name` must match the directory.
   - Frontmatter `description` must contain "Use when".
   - Make the description a trigger surface, not a workflow summary.
   - Include the required headings or accepted aliases expected by the validator.
   - Put the main process inline. Move only branch-specific references, scripts, templates, examples, or assets into supporting files.
   - Reference supporting files only at the step that needs them, with the condition for loading or using them.
   - Reference other skills by canonical Mithril name only when they already exist.

5. Consolidate instead of duplicating.
   - Do not import competing loops for TDD, debugging, review, planning, delivery, or skill authoring.
   - Merge the useful guidance into one Mithril-owned workflow.
   - When upstream sources disagree, prefer the behavior that fits Mithril's validator, router, and command model.
   - Keep one source of truth for each behavior and route only canonical names from `using-mithril`.

6. Validate and prune.
   - Run the skill validator after edits.
   - Remove no-op prose that does not change agent behavior.
   - Make completion criteria checkable and evidence-based.
   - Ensure examples are reusable patterns, not narratives about one past session.

7. Prove behavior when the change affects agent conduct.
   - Re-run the pressure scenario, focused review, smoke test, or Skillgrade-style eval that motivated the edit.
   - Compare against the red signal: the updated skill should prevent the failure or make it easier to catch.
   - Report any skipped behavioral proof separately from structural validation.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The description can summarize the workflow." | Agents may follow the summary and skip the body. Keep descriptions to triggers. |
| "More detail makes it safer." | Extra prose hides the actual process and increases context load. |
| "A second skill can cover the same loop from another angle." | Competing loops create conflicting authority. Merge the behavior. |
| "This rule is obvious." | If agents skip it under pressure, make the rationalization explicit. If they do not, omit it. |
| "A warning list will shape the output." | Shape failures need a positive recipe, not only prohibitions. |
| "Validation passing means the skill is useful." | Validation proves structure. Use scenarios or review to prove behavior. |
| "Official guidance is enough." | Compatibility rules do not prove the skill changes behavior. Use Mithril anatomy plus a red signal. |

## Red Flags

- Frontmatter name differs from the directory.
- Description lacks "Use when" or describes process steps instead of triggers.
- Required sections are missing or renamed outside accepted aliases.
- The skill points to a future skill, persona, command, or reference that does not exist.
- A router imports an upstream duplicate instead of a Mithril canonical skill.
- The skill reads like a blog post, history, or generic advice.
- A new behavior-changing skill was written without any pressure scenario, baseline comparison, known failure, or review finding.
- Verification criteria cannot be checked with commands, artifacts, or concrete inspection.

## Verification

Before reporting skill work complete:

- `npm run validate:skills` passes after the final edit.
- Router references point only to existing Mithril skills.
- Required headings match the validator contract.
- Frontmatter descriptions are trigger-focused and contain "Use when".
- The selected package shape is justified, and any supporting files are referenced by exact condition or command.
- Duplicate upstream loops were merged into canonical Mithril skills instead of routed separately.
- Behavior-changing edits include a red signal and evidence that the new guidance addresses it, or the missing proof is explicitly reported.
- Any skipped scenario testing or unresolved authoring concern is reported.
