# Task 03: Copy and Rename Superpowers Core

## Status

complete

## Wave

2

## Description

Copy the Superpowers core workflow skills into Mithril as the runtime and autonomous execution foundation, then apply only required Mithril renaming. The approved design says Superpowers has the strongest bootstrap, autonomous execution model, worktree/subagent flow, and verification discipline. This task creates a copied-and-renamed source baseline while excluding the upstream router.

## Dependencies

**Depends on:** task-01-stabilize-shell-assets-attribution.md, task-02-add-validation-harness.md
**Blocks:** task-04-merge-canonical-disciplines.md

**Context from dependencies:** Task 01 creates assets and attribution so copied material has a home for notices. Task 02 creates validation scripts so the ported skills can be checked immediately.

## Files to Create

- `skills/brainstorming/SKILL.md`
- `skills/brainstorming/spec-document-reviewer-prompt.md`
- `skills/brainstorming/visual-companion.md`
- `skills/brainstorming/scripts/frame-template.html`
- `skills/brainstorming/scripts/helper.js`
- `skills/brainstorming/scripts/server.cjs`
- `skills/brainstorming/scripts/start-server.sh`
- `skills/brainstorming/scripts/stop-server.sh`
- `skills/writing-plans/SKILL.md`
- `skills/writing-plans/plan-document-reviewer-prompt.md`
- `skills/using-git-worktrees/SKILL.md`
- `skills/subagent-driven-development/SKILL.md`
- `skills/subagent-driven-development/implementer-prompt.md`
- `skills/subagent-driven-development/task-reviewer-prompt.md`
- `skills/subagent-driven-development/scripts/review-package`
- `skills/subagent-driven-development/scripts/sdd-workspace`
- `skills/subagent-driven-development/scripts/task-brief`
- `skills/executing-plans/SKILL.md`
- `skills/dispatching-parallel-agents/SKILL.md`
- `skills/requesting-code-review/SKILL.md`
- `skills/requesting-code-review/code-reviewer.md`
- `skills/receiving-code-review/SKILL.md`
- `skills/verification-before-completion/SKILL.md`
- `skills/finishing-a-development-branch/SKILL.md`

## Files to Modify

- `skills/using-mithril/SKILL.md` - route core Mithril workflows after the imported skills exist.

## Technical Details

### Implementation Steps

1. Source core skills from `D:\Source\_ai\superpowers\skills\`.
2. Do not import `skills/using-superpowers`.
3. Rebrand internal references:
   - `superpowers:*` -> `mithril:*`
   - `Superpowers` -> `Mithril` where product-facing
   - `.superpowers` -> `.mithril`
   - `docs/superpowers` -> `docs/mithril`
   - `SUPERPOWERS_*` -> `MITHRIL_*`
4. Keep the behavioral hard gates from Superpowers:
   - brainstorm before design-changing work
   - implementation plans before execution
   - subagent-driven task execution where appropriate
   - review gates
   - verification before completion claims
5. Keep the source skill structure intact for this commit. Do not rewrite headings, merge loops, or force a new Mithril structure in this task.
6. Commit the copied-and-renamed Superpowers baseline before any later synthesis or behavioral rewrite.

### Code Snippets

Source paths:

```text
D:\Source\_ai\superpowers\skills\brainstorming\SKILL.md
D:\Source\_ai\superpowers\skills\writing-plans\SKILL.md
D:\Source\_ai\superpowers\skills\subagent-driven-development\SKILL.md
```

### Environment Variables

Use `MITHRIL_*` names for any copied Superpowers environment variables.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `Test-Path skills/brainstorming/SKILL.md; Test-Path skills/verification-before-completion/SKILL.md`
- Expected: The core skill files do not all exist before this task.

### GREEN

- Command: `npm run validate:skills`
- Expected: Copied-and-renamed core skills exist. Validator failures caused only by preserved source structure are documented for the later rewrite pass.

### Final Verification

- Command: `rg -n "using-superpowers|superpowers:|docs/superpowers|\\.superpowers|SUPERPOWERS" skills`
- Expected: No product-facing stale references remain. Any matches must be intentional attribution or examples documented in-place.

## Acceptance Criteria

- [ ] All listed Superpowers core skills exist under `skills/`.
- [ ] `using-superpowers` is not imported.
- [ ] Product-facing references are rebranded to Mithril.
- [ ] `using-mithril` routes core workflows without invoking upstream routers.
- [ ] Source structure is preserved except required Mithril renaming.
- [ ] The copied-and-renamed baseline can be committed before any behavioral rewrite.

## Notes

Do not change specialist or Matt skills in this task. This task owns the execution core only.
