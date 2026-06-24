# Mithril Skill Anatomy

This is the required format for Mithril-owned skills under `skills/<name>/SKILL.md`. It adapts the agent-skills structure to Mithril's validator and canonical routing model.

Mithril's authoring standard combines three practices:

- Official Agent Skills compatibility: valid frontmatter, concise trigger-focused descriptions, progressive disclosure, and runnable supporting files only when useful.
- Superpowers-style pressure testing: prove that the skill changes agent behavior against a baseline, especially for discipline skills.
- Eval-oriented maintenance: treat validation as structure checking, and use scenarios or Skillgrade-style tests when behavior needs regression coverage.

## File Location

Every skill lives in its own directory:

```text
skills/
  skill-name/
    SKILL.md                 # required entry point
    reference-name.md         # optional, loaded only when needed
    prompt-template.md        # optional, reusable prompt or output template
    example-name.ext          # optional, one strong reusable example
    scripts/                  # optional, runnable helpers
      helper-name.ext
```

Only `SKILL.md` is required. Add supporting files only when they reduce noise in the entry point or provide a reusable artifact. Do not create empty directories or placeholder files.

## Skill Package Shapes

Choose the smallest package shape that makes the skill reliable:

### Self-Contained Skill

```text
skills/skill-name/
  SKILL.md
```

Use this when the workflow, examples, and verification fit comfortably in the entry point. Most Mithril skills should start here.

### Skill With A Reusable Artifact

```text
skills/skill-name/
  SKILL.md
  prompt-template.md
  example.ts
  scripts/check-something.js
```

Use this when the skill repeatedly needs an exact prompt, output shape, runnable helper, or one strong example. Keep the artifact named for what it does, and point to it from the step that needs it.

### Skill With Heavy References

```text
skills/skill-name/
  SKILL.md
  api-reference.md
  migration-matrix.md
  scripts/
    inspect-target.js
```

Use this when reference material is too long for every invocation, or when different task branches need different reference files. The entry point should tell the agent which file to load and under what condition.

### Skill With Shared Root References

```text
skills/skill-name/
  SKILL.md
references/
  security-checklist.md
```

Use root `references/` for checklists or policies reused by multiple skills. Do not put shared checklists inside one skill directory unless that skill is their only owner.

## Branching Rules

Branch by use case, not by habit:

- Inline material every invocation needs.
- Move branch-specific reference material behind an explicit context pointer.
- Use `scripts/` only for runnable helpers, not prose.
- Use a template file when exact wording or output shape matters.
- Use one strong example file when inline code would obscure the workflow.
- Avoid multiple mediocre examples, multi-language mirrors, and narrative session transcripts.
- Keep related definitions, rules, caveats, and examples together in the same file or section.

## Frontmatter

Every `SKILL.md` starts with YAML frontmatter:

```yaml
---
name: skill-name
description: Use when specific trigger conditions apply.
---
```

Rules:

- `name` is lowercase, hyphen-separated, and matches the directory name.
- `description` contains the words `Use when`.
- Prefer descriptions that start with `Use when`.
- Descriptions list trigger conditions, symptoms, and contexts. They do not summarize the skill's process.
- Keep descriptions under the validator limit of 1024 characters.

Descriptions are the discovery surface. At startup, agents usually see the skill name and description before they decide whether to load the full body. A good description answers only "when should this skill load?" The body answers "what should the agent do?"

Good:

```yaml
description: Use when creating, editing, porting, validating, or reviewing Mithril skills, routers, skill descriptions, or docs/skill-anatomy.md conformance.
```

Avoid:

```yaml
description: Reads the skill, asks questions, writes pressure tests, creates files, updates routing, validates output, and reports results.
```

The avoided version smuggles the workflow into the discovery surface. Agents may follow the summary instead of reading the actual skill.

## Required Sections

The validator requires each non-exempt skill to include these level-2 sections or accepted aliases:

| Required Section | Accepted Aliases |
| --- | --- |
| `## Overview` | `## Summary`, `## Purpose` |
| `## When to Use` | `## When to Use This Skill`, `## Use When`, `## Applicability` |
| `## Common Rationalizations` | `## Rationalizations`, `## Common Excuses` |
| `## Red Flags` | `## Warning Signs`, `## Anti-Patterns` |
| `## Verification` | `## Exit Criteria`, `## Completion Criteria` |

Use the canonical section names unless there is a strong readability reason not to.

## Recommended Shape

```markdown
# Skill Title

## Overview
One or two sentences explaining the core discipline and why it matters.

## When to Use
- Triggering situations.
- Exclusions when the skill should not apply.

## Process
Numbered, concrete steps with completion criteria.
Point to supporting files only at the step that needs them.

## Quick Reference
Optional table or short checklist for common operations.

## Patterns
Optional before/after pattern, output contract, or decision table.

## Common Rationalizations
| Rationalization | Reality |
| --- | --- |
| Excuse agents use to skip the process | Factual counterweight |

## Red Flags
- Observable signs the process is being violated.

## Verification
- Evidence required before reporting the process complete.
```

Additional sections are allowed when they carry useful workflow content, such as `## Test Shape`, `## Review Axes`, or `## Decision Table`.

## Section Purposes

`## Overview` states the core rule or mental model. It should be enough for an agent to decide that the skill is relevant, not enough to skip the rest of the skill.

`## When to Use` lists concrete triggers and exclusions. Use symptoms, task types, and pressure points an agent can recognize.

`## Process` or another workflow section gives ordered actions. Each step should have an observable completion point.

`## Common Rationalizations` counters the excuses that cause agents to skip required discipline. Use this section for discipline failures, not as a generic list of preferences.

`## Red Flags` lists visible signs that the skill is being misapplied or skipped.

`## Verification` names the evidence needed before completion claims. Prefer command output, artifact inspection, and explicit checklist items over confidence language.

## Guidance Form

Match the guidance to the failure:

- Discipline skipped under pressure: use a hard rule, rationalization table, red flags, and verification gate.
- Output has the wrong shape: provide a positive recipe or output contract.
- Required element is omitted: add a required field, slot, or checklist item.
- Behavior depends on a condition: write the condition around an observable predicate.

Avoid nuance clauses that reopen negotiation. If an exception is real, make it a separate conditional.

## Authoring Workflow

Use `skill-design` when creating, editing, porting, or reviewing a Mithril skill. The expected loop is:

1. Define the behavior and trigger.
2. Check whether an existing Mithril skill should be edited instead of adding a new one.
3. Establish a red signal before writing guidance:
   - A pressure scenario where an agent fails without the skill.
   - A validator failure.
   - A known review finding or repeated user correction.
   - A before/after comparison against a no-skill baseline.
4. Write the smallest skill that changes the observed behavior.
5. Validate structure with `npm run validate:skills`.
6. Prove behavior with the relevant scenario, focused review, smoke test, or Skillgrade-style eval when the skill is important enough to regress.

For trivial wording fixes, the red signal can be the current malformed sentence or stale pointer. For new or behavior-changing skills, do not skip the scenario step.

## Progressive Disclosure

Keep the main `SKILL.md` focused on the workflow every invocation needs. Move material to supporting files only when it is:

- A heavy reference that not every run needs.
- A reusable script or tool.
- A template or asset.
- Long enough that it obscures the main process.

The pointer decides whether the agent loads the supporting file. Write pointers as conditions, not vague suggestions:

Good:

```markdown
For a pull request review, fill `review-prompt-template.md` and dispatch the reviewer.
```

Avoid:

```markdown
See the supporting files for more details.
```

Do not create empty supporting directories.

## Examples And Templates

Use examples and templates sparingly:

- One excellent example is better than several shallow variants.
- Examples should be reusable patterns, not a record of one past session.
- Templates should have explicit placeholders and say who fills each one.
- Scripts should be runnable, checked in with their dependencies, and referenced by exact command.
- If a template or script becomes shared by multiple skills, move the shared contract to `references/` or a canonical skill instead of copying it.

## Cross-Skill References

Reference other skills by canonical Mithril name only when they exist in `skills/` by the end of the task. The validator warns about dead references.

Good:

```markdown
Use `verification-before-completion` before reporting the result.
```

Avoid:

```markdown
Use the future `security-review` skill.
```

## Validation

Run this after skill edits:

```powershell
npm run validate:skills
```

The validator checks:

- Frontmatter exists and matches the directory name.
- Description contains `Use when`.
- Required headings or aliases are present.
- Cross-skill references point to known Mithril skills.

Validation proves structure, not usefulness. Use pressure scenarios, review, task-specific checks, a focused artifact smoke test, or Skillgrade-style evals to prove behavior. When a skill has supporting files, also verify that every referenced file exists and every script/template pointer is still accurate.
