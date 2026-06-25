# Task 06: Add Commands and Personas

## Status

complete

## Wave

5

## Description

Add Mithril commands and specialist personas after the required skills exist. The approved design adopts agent-skills command/persona structure while preserving the rule that commands or the main agent orchestrate composition and personas do not invoke other personas.

## Dependencies

**Depends on:** task-05-add-agent-specialists-references.md, task-08-add-simplicity-layer.md
**Blocks:** task-09-rewrite-docs-router-integration.md

**Context from dependencies:** Task 05 creates specialist skills and references. Task 08 creates `simplicity`, `simplicity-review`, and `simplicity-audit`, which need command entrypoints.

## Files to Create

- `commands/spec.toml`
- `commands/plan.toml`
- `commands/build.toml`
- `commands/test.toml`
- `commands/review.toml`
- `commands/ship.toml`
- `commands/webperf.toml`
- `commands/standards.toml`
- `commands/code-simplify.toml`
- `commands/simplicity.toml`
- `commands/simplicity-review.toml`
- `commands/simplicity-audit.toml`
- `agents/code-reviewer.md`
- `agents/security-auditor.md`
- `agents/test-engineer.md`
- `agents/web-performance-auditor.md`
- `references/orchestration-patterns.md`

## Files to Modify

None. Router and docs integration happens in task 09.

## Technical Details

### Implementation Steps

1. Use `D:\Source\_ai\agent-skills\commands\` and `D:\Source\_ai\agent-skills\agents\` as structural source material.
2. Create commands that map to Mithril skill names:
   - `/spec` -> Mithril brainstorming/spec flow
   - `/plan` -> writing-plans/task breakdown
   - `/build` -> subagent-driven or incremental implementation
   - `/test` -> canonical TDD workflow
   - `/review` -> canonical review workflow
   - `/ship` -> fan-out launch review using personas
   - `/webperf` -> web performance auditor
   - `/standards` -> local code-shape inspection
   - `/code-simplify` -> code simplification
   - `/simplicity` -> simplicity ladder reminder
   - `/simplicity-review` -> diff-focused over-engineering review
   - `/simplicity-audit` -> repo-wide over-engineering audit
3. Do not create `/simplicity-debt`, `/simplicity-gain`, or `/simplicity-help`.
4. Create personas as single-role prompts with output formats and composition blocks.
5. Document the valid fan-out pattern in `references/orchestration-patterns.md`.

### Code Snippets

Command files use TOML:

```toml
description = "Review changes for over-engineering"
prompt = "Run the simplicity-review workflow against the current diff. Report only; do not apply fixes."
```

### Environment Variables

Not applicable.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `Test-Path commands/review.toml; Test-Path agents/code-reviewer.md`
- Expected: Commands and personas are missing before this task.

### GREEN

- Command: `npm run validate:commands`
- Expected: All command files pass validation.

### Final Verification

- Command: `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail" commands agents references`
- Expected: No excluded simplicity surfaces or product-facing upstream name remain.

## Acceptance Criteria

- [ ] Recommended commands exist and point at Mithril skill names.
- [ ] Four personas exist with clear role, scope, output format, and composition rules.
- [ ] `/ship` is the only fan-out command pattern and includes a merge step.
- [ ] Personas do not invoke other personas.
- [ ] Excluded simplicity command surfaces do not exist.

## Notes

Keep command prompts concise. Commands are entrypoints, not full skill bodies.
