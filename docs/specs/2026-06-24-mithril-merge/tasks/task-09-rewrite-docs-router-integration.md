# Task 09: Rewrite Docs and Router Integration

## Status

pending

## Wave

6

## Description

Rewrite Mithril public docs and instruction files using agent-skills as the structural baseline, then integrate all selected skills into `using-mithril`. This task happens after imports so documentation and routing reflect the actual skill set rather than a planned one.

## Dependencies

**Depends on:** task-01-stabilize-shell-assets-attribution.md, task-03-port-superpowers-core.md, task-04-merge-canonical-disciplines.md, task-05-add-agent-specialists-references.md, task-06-add-commands-personas.md, task-07-add-matt-alignment-domain.md, task-08-add-simplicity-layer.md
**Blocks:** task-10-final-consistency-release.md

**Context from dependencies:** Prior tasks create assets, validation, core skills, canonical skills, specialists, commands, personas, Matt-derived skills, and simplicity skills. This task wires them together and documents the finished shape.

## Files to Create

- `docs/getting-started.md`
- `docs/agents.md`
- `docs/comparison.md`
- `docs/testing.md`
- `docs/claude-code-setup.md`
- `docs/codex-setup.md`
- `docs/copilot-setup.md`
- `docs/cursor-setup.md`
- `docs/gemini-cli-setup.md`
- `docs/opencode-setup.md`
- `docs/windsurf-setup.md`
- `CONTRIBUTING.md`

## Files to Modify

- `README.md`
- `AGENTS.md`
- `CLAUDE.md`
- `GEMINI.md`
- `skills/using-mithril/SKILL.md`

## Technical Details

### Implementation Steps

1. Use `D:\Source\_ai\agent-skills\README.md`, `AGENTS.md`, `CLAUDE.md`, `docs/getting-started.md`, `docs/agents.md`, and `docs/comparison.md` as structural baselines.
2. Rewrite in Mithril voice and with Mithril command/skill names.
3. Keep docs/layers separate:
   - `README.md`: product overview, lifecycle, commands, install.
   - `AGENTS.md`: generic coding-agent routing, intent mapping, lifecycle mapping, anti-rationalization, composition boundaries.
   - `CLAUDE.md`: Claude-specific project structure, skills by phase, conventions, commands, and boundaries.
   - `docs/getting-started.md`: universal quick start.
   - `docs/agents.md`: personas, composition, valid fan-out, invalid meta-router pattern.
   - `docs/comparison.md`: fair source comparison.
   - host setup docs: one focused page per supported harness.
4. Update `using-mithril` as the only active router.
5. Route selected skills by lifecycle:
   - Define/spec: brainstorming, grill-me, grill-with-docs, domain-modeling.
   - Plan: writing-plans, to-prd, to-issues, triage.
   - Build: subagent-driven-development, executing-plans, TDD, implementation-standards.
   - Verify/debug: systematic-debugging, browser testing, observability.
   - Review: code-review-and-quality, simplicity-review, security, performance.
   - Ship: shipping-and-launch, finishing-a-development-branch, CI/CD, docs/ADRs.
6. Do not route upstream routers or excluded simplicity surfaces.

### Code Snippets

Layer separation text to preserve:

```text
Skill = the how.
Persona = the who.
Command = the when.
The user or command orchestrates composition. Personas do not invoke other personas.
```

### Environment Variables

Document Mithril-specific variables only. Use `MITHRIL_*` naming.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `Test-Path docs/getting-started.md; Test-Path docs/agents.md; Test-Path docs/comparison.md`
- Expected: Required docs are missing before this task.

### GREEN

- Command: `npm run validate:skills && npm run validate:commands`
- Expected: Routing and commands remain valid after docs and instruction edits.

### Final Verification

- Command: `rg -n "using-superpowers|using-agent-skills|ask-matt|simplicity-debt|simplicity-gain|simplicity-help|ponytail" README.md AGENTS.md CLAUDE.md GEMINI.md docs skills/using-mithril/SKILL.md`
- Expected: No excluded routers, excluded simplicity surfaces, or product-facing upstream simplicity name remain. Provenance-only matches in the design/spec docs are acceptable if clearly labeled.

## Acceptance Criteria

- [ ] Public docs follow the agent-skills structural baseline.
- [ ] `AGENTS.md` and `CLAUDE.md` are Mithril-specific and clear about routing boundaries.
- [ ] `using-mithril` routes the final selected skill set.
- [ ] Persona and command composition rules are documented.
- [ ] Excluded routers and excluded simplicity surfaces are not routed.
- [ ] Host setup docs exist for supported harnesses.

## Notes

This task may need to preserve historical references in `docs/design/` and `docs/specs/`; do not delete planning artifacts just to make a stale-name search empty.
