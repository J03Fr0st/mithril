# Cursor Setup

Use this guide when adapting Mithril for Cursor.

## Option 1: Plugin

If your Cursor build supports repository plugins, install Mithril from the plugin source and let the plugin expose `skills/`, `commands/`, and `agents/`.

The Cursor plugin manifest in this repository is:

```text
.cursor-plugin/plugin.json
```

## Option 2: Native Skills And A Thin Rule

If plugin support is unavailable, install Mithril workflows as native Cursor skills. Cursor discovers procedural workflows from:

```text
.cursor/skills/<skill-name>/SKILL.md
```

Copy or sync the full Mithril `skills/` tree so each skill keeps its supporting scripts and references:

```text
.cursor/skills/using-mithril/SKILL.md
.cursor/skills/brainstorming/SKILL.md
.cursor/skills/writing-plans/SKILL.md
.cursor/skills/test-driven-development/SKILL.md
...
```

Treat the Mithril checkout or release as upstream and `.cursor/skills/` as the installed copy. Re-sync after Mithril updates rather than editing only the upstream checkout.

Use `.cursor/rules/*.mdc` for short, stable project policies—not full workflow skills. An optional thin router pointer can live at `.cursor/rules/mithril.mdc`:

```markdown
---
description: Route engineering work through installed Mithril skills
alwaysApply: true
---

Before non-trivial engineering work, use the task description to select and follow the matching workflow under `.cursor/skills/`. Start with `using-mithril`; keep user instructions and project-specific rules authoritative.
```

Do not paste complete `SKILL.md` bodies into `.cursor/rules/`, and do not create a monolithic `.cursorrules` file. Skills are loaded on demand; rules remain concise and project-specific.

## Verify The Installation

1. Confirm `.cursor/skills/using-mithril/SKILL.md` exists with valid frontmatter.
2. Confirm `.cursor/rules/mithril.mdc` appears in Cursor's project rules if you added it.
3. Ask Cursor to add a feature test-first without naming a skill. It should discover `test-driven-development` through Mithril routing.

## Personas

Paste or reference persona files from `agents/` when you need a focused review:

- `code-reviewer`
- `security-auditor`
- `test-engineer`
- `web-performance-auditor`

Do not ask one persona to route to another persona.

## Usage

Cursor works best when the requested workflow is explicit:

```text
Use Mithril's test-driven workflow for this bug fix.
Use Mithril's code review workflow on the current diff.
Use Mithril's simplicity review on this module.
```

## Safety

Keep Cursor edits scoped to the requested files, and ask before external mutation.
