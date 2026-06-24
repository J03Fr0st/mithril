# Gemini CLI Setup

Use this guide when running Mithril with Gemini CLI.

## Install

Install Mithril as a Gemini extension when your Gemini CLI build supports extension installs:

```bash
gemini extensions install https://github.com/J03Fr0st/mithril
```

Update later with:

```bash
gemini extensions update mithril
```

The extension manifest is:

```text
gemini-extension.json
```

## GEMINI.md

Mithril's `GEMINI.md` is include-oriented:

```markdown
@./AGENTS.md
@./skills/using-mithril/SKILL.md
@./skills/using-mithril/references/gemini-tools.md
```

This keeps shared routing, the active router, and Gemini-specific tool mapping in context.

## Skills

When Gemini offers skill activation, activate only the skill selected by `using-mithril`. Avoid loading the entire `skills/` tree into every prompt.

## Commands

If your Gemini setup exposes Mithril commands, use the command names from `commands/`. If not, ask for the same lifecycle step in natural language:

```text
Use Mithril to plan this approved design.
Use Mithril to run a review on this diff.
Use Mithril to prepare this branch for shipping.
```

## Verify

Ask Gemini:

```text
Which Mithril skill applies to a browser layout bug?
```

Expected route: `browser-testing-with-devtools`, with `systematic-debugging` when the issue needs diagnosis.
