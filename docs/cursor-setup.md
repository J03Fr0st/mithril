# Cursor Setup

Use this guide when adapting Mithril for Cursor.

## Option 1: Plugin

If your Cursor build supports repository plugins, install Mithril from the plugin source and let the plugin expose `skills/`, `commands/`, and `agents/`.

The Cursor plugin manifest in this repository is:

```text
.cursor-plugin/plugin.json
```

## Option 2: Rules Directory

If plugin support is unavailable, use Cursor rules.

Create:

```text
.cursor/rules/
```

Add the router and a focused set of core skills as rules:

```text
skills/using-mithril/SKILL.md
skills/brainstorming/SKILL.md
skills/writing-plans/SKILL.md
skills/executing-plans/SKILL.md
skills/test-driven-development/SKILL.md
skills/systematic-debugging/SKILL.md
skills/code-review-and-quality/SKILL.md
skills/verification-before-completion/SKILL.md
```

Keep the always-loaded set small. Add specialized skills for the task at hand.

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
