# Mithril Personas

Mithril personas are specialist reviewer prompts. They give the agent a role and output format, but they are not routers and they are not implementation agents.

| Persona | Role | Best for |
| --- | --- | --- |
| [code-reviewer](../agents/code-reviewer.md) | Senior code reviewer | Correctness, readability, architecture, tests, security, and performance |
| [security-auditor](../agents/security-auditor.md) | Security reviewer | Trust boundaries, auth, secrets, dependencies, and release risk |
| [test-engineer](../agents/test-engineer.md) | Test strategy reviewer | Coverage gaps, regression risk, and verification evidence |
| [web-performance-auditor](../agents/web-performance-auditor.md) | Web performance reviewer | Core Web Vitals, loading, rendering, and network efficiency |

## Layers

```text
Skill = the how.
Persona = the who.
Command = the when.
The user or command orchestrates composition. Personas do not invoke other personas.
```

| Layer | What it is | Example | Responsibility |
| --- | --- | --- | --- |
| Skill | Workflow with steps and exit criteria | `code-review-and-quality` | Defines process |
| Persona | Role with perspective and report format | `code-reviewer` | Reviews from one viewpoint |
| Command | User-facing entry point | `/review` | Starts and composes workflows |

## Direct Persona Invocation

Use one persona directly when the user wants one perspective:

- "Review this diff for correctness" -> `code-reviewer`
- "Check this auth change" -> `security-auditor`
- "What tests are missing?" -> `test-engineer`
- "Audit this page for Core Web Vitals" -> `web-performance-auditor`

The persona returns a report. The main agent decides whether to ask for fixes, run more checks, or present the result.

## Command Invocation

Use commands when the user wants a repeatable workflow:

- `/review` routes through `code-review-and-quality`.
- `/test` routes through `test-driven-development`.
- `/webperf` invokes the web performance persona for browser-facing work.
- `/ship` can fan out to multiple advisory personas and then merge their reports.

## Valid Fan-Out

Fan-out is valid only when the sub-tasks are independent and read-only. The main agent or command owns the merge step.

```text
/ship
  - code-reviewer returns code review evidence
  - security-auditor returns security evidence
  - test-engineer returns verification evidence
  - main agent merges reports into a GO or NO-GO recommendation
```

This works because the personas inspect the same candidate from different angles and do not depend on each other.

## Invalid Meta-Router Pattern

Do not create a persona whose job is to decide which other persona to call.

```text
meta-reviewer decides routing
  calls code-reviewer
  paraphrases result
  maybe calls another persona
```

That pattern adds routing hops, loses information, and violates the composition boundary. Routing belongs to the user, command, or `using-mithril`.

## Persona Rules

1. One persona has one role and one output format.
2. Personas do not invoke other personas.
3. Personas may use skills only when the host and prompt explicitly allow it, and only to improve their own report.
4. Personas do not edit files, stage, commit, push, deploy, publish, contact external services, or mutate remote systems.
5. Personas report uncertainty and missing evidence instead of inventing results.
6. The main agent or command owns prioritization, deduplication, and user-facing decisions.

## Adding A Persona

1. Create `agents/<role>.md`.
2. Include frontmatter with `name` and `description`.
3. Define role, scope, inspection checklist, prohibited actions, output format, and composition boundary.
4. Add the persona to this page.
5. Update command docs only if a command actually invokes it.
