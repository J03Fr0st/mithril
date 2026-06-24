# Mithril Skill Anatomy

This is the required format for Mithril-owned skills under `skills/<name>/SKILL.md`. It adapts the agent-skills structure to Mithril's validator and canonical routing model.

## File Location

Every skill lives in its own directory:

```text
skills/
  skill-name/
    SKILL.md
    supporting-file.md
    scripts/
```

Only `SKILL.md` is required. Add supporting files only for heavy references, reusable scripts, templates, or assets that would distract from the main workflow.

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

## Progressive Disclosure

Keep the main `SKILL.md` focused on the workflow every invocation needs. Move material to supporting files only when it is:

- A heavy reference that not every run needs.
- A reusable script or tool.
- A template or asset.
- Long enough that it obscures the main process.

Do not create empty supporting directories.

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

Validation proves structure, not usefulness. Use pressure scenarios, review, or task-specific checks to prove behavior.
