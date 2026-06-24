# Claude Code Setup

Use this guide when running Mithril in Claude Code.

## Install

Install Mithril from the repository:

```text
/plugin install https://github.com/J03Fr0st/mithril
```

For local development, run Claude Code with this checkout as a plugin directory if your Claude Code build supports local plugin loading.

## What Claude Loads

Claude Code reads `CLAUDE.md`. Mithril's `CLAUDE.md` imports `AGENTS.md`, then adds Claude-specific notes.

The active router is:

```text
skills/using-mithril/SKILL.md
```

## Commands

When the plugin command surface is available, use:

```text
/spec
/plan
/build
/test
/review
/ship
/webperf
/standards
/code-simplify
/simplicity
/simplicity-review
/simplicity-audit
```

If a command is unavailable in your Claude Code build, ask for the same workflow in natural language. The router still maps intent to skills.

## Personas

Claude Code can use the files in `agents/` as advisory subagents when the plugin exposes them:

- `code-reviewer`
- `security-auditor`
- `test-engineer`
- `web-performance-auditor`

Keep personas read-only. If implementation is needed, leave the persona context and route through the relevant Mithril implementation workflow. Personas do not invoke other personas.

## Verify

Ask Claude to list available Mithril skills or run a small routing check:

```text
Tell me which Mithril skill applies if I ask you to review a diff.
```

Expected route: `code-review-and-quality`, with optional advisory persona use only when requested by a command or user.
