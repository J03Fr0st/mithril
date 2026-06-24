# Orchestration Patterns

Mithril keeps skills, commands, and personas separate:

- Skills define the workflow.
- Commands decide when to start a workflow.
- Personas provide specialist advisory reports.
- The command or main agent owns composition, decisions, and follow-up actions.

## Valid Fan-Out

Use fan-out only when review perspectives are independent and can inspect the same change without shared write state. `/ship` is the default fan-out command:

1. The command/main agent defines the review scope, source artifacts, and constraints.
2. The command/main agent launches `code-reviewer`, `security-auditor`, and `test-engineer` as independent persona reviews when subagent support exists.
3. Each persona returns a report only. Personas do not invoke other personas, edit files, stage changes, commit, push, deploy, or contact external systems.
4. The command/main agent merges reports, removes duplicates, promotes blockers, checks rollback and monitoring needs, and returns one launch recommendation.
5. Any external mutation, including deploys, pushes, merges, remote configuration changes, or live external scans, requires explicit user approval immediately before the action.

If subagent support is unavailable, the main agent may run the persona prompts one at a time and still perform the same merge step. Treat those reports as advisory evidence, not as automatic approval.

## Single-Persona Pattern

Use a single persona when one specialist perspective is requested:

- `/webperf` invokes `web-performance-auditor` for browser-facing performance audits.
- Direct persona use is acceptable when the user asks for that role by name.

Single-persona commands do not merge reports because there is only one report to return.

## Skill-Only Pattern

Use a skill without personas when the workflow already defines the work:

- `/spec` invokes `brainstorming`.
- `/plan` invokes `writing-plans`.
- `/build` invokes `subagent-driven-development` or `executing-plans`.
- `/test` invokes `test-driven-development`.
- `/review` invokes `code-review-and-quality`.
- `/standards` invokes `implementation-standards`.
- `/code-simplify` invokes `code-simplification`.
- `/simplicity` invokes `simplicity`.
- `/simplicity-review` invokes `simplicity-review`.
- `/simplicity-audit` invokes `simplicity-audit`.

These commands may ask for more context, run local verification, or edit local files only when their skill and the user's request authorize it. They should not create a persona fan-out unless the user explicitly redirects to `/ship`.

## Invalid Patterns

- Persona invokes persona.
- Persona edits files or mutates external systems.
- Command treats a persona report as automatic approval.
- Fan-out has no main-agent merge step.
- Multiple personas work on the same writable files at the same time.
- Review or audit commands push, merge, deploy, or contact external services without explicit user approval.

## Merge Report Shape

For fan-out, the command/main agent returns:

```markdown
## Decision: GO | NO-GO

### Blockers
- [persona] Finding and required fix.

### Recommended Fixes
- [persona] Finding and recommended fix.

### Accepted Risks
- Risk, owner, and mitigation.

### Rollback And Monitoring
- Trigger:
- Procedure:
- Signals:

### Specialist Reports
- code-reviewer:
- security-auditor:
- test-engineer:
```
