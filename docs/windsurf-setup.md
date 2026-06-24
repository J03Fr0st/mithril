# Windsurf Setup

Use this guide when adapting Mithril for Windsurf.

## Project Rules

Windsurf can use project rules. Keep the always-loaded rules focused:

```text
.windsurfrules
```

Recommended contents:

```text
Mithril project rules:
- Use skills/using-mithril/SKILL.md as the router.
- Load only the Mithril skill that matches the task.
- Keep personas as advisory leaf reviewers.
- Ask before external mutation.
```

For stronger enforcement, paste the contents of `skills/using-mithril/SKILL.md` into the rules file or reference it according to your Windsurf setup.

## Skills To Add On Demand

Add phase-specific skill text only when the task needs it:

- `brainstorming`
- `writing-plans`
- `executing-plans`
- `test-driven-development`
- `systematic-debugging`
- `code-review-and-quality`
- `simplicity-review`
- `verification-before-completion`

Avoid loading every skill at once; it wastes context and weakens routing.

## Personas

For targeted review, paste the relevant file from `agents/`:

- `code-reviewer`
- `security-auditor`
- `test-engineer`
- `web-performance-auditor`

The persona returns a report. The main agent decides next steps.

## Usage

Ask for the lifecycle step directly:

```text
Use Mithril to define this feature before coding.
Use Mithril to debug this failing test.
Use Mithril to run a simplicity review.
```

## Safety

Keep edits scoped and ask before any external mutation.
