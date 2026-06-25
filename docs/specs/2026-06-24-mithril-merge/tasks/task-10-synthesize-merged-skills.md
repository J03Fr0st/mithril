# Task 10: Synthesize Merged Skills

## Status

pending

## Wave

7

## Description

Merge the duplicated copied source instances into the active top-level Mithril skills. This is the deliberate synthesis pass that reads each active `SKILL.md` beside its copied `sources/` material and rewrites the active skill to keep the best compatible guidance from each source. Source folders remain as provenance and comparison material.

## Dependencies

**Depends on:** task-02-add-validation-harness.md, task-09-rewrite-docs-router-integration.md
**Blocks:** task-11-final-consistency-release.md

**Context from dependencies:** Task 02 provides validators. Task 09 leaves all copied skills validator-clean and routed through `using-mithril`, so synthesis can focus on behavior and cohesion rather than import mechanics.

## Files to Create

None.

## Files to Modify

- `skills/test-driven-development/SKILL.md`
- `skills/systematic-debugging/SKILL.md`
- `skills/code-review-and-quality/SKILL.md`
- `skills/skill-design/SKILL.md`
- `skills/implementation-standards/SKILL.md`
- `skills/using-mithril/SKILL.md` - only if routing language must change after synthesis.

## Technical Details

### Implementation Steps

1. Inventory each source-backed canonical skill:
   - `skills/test-driven-development/SKILL.md`
   - `skills/systematic-debugging/SKILL.md`
   - `skills/code-review-and-quality/SKILL.md`
   - `skills/skill-design/SKILL.md`
   - `skills/implementation-standards/SKILL.md`
2. For each target, read the active `SKILL.md`, every copied file under its `sources/` folder, and any directly relevant sibling reference file in the skill directory.
3. Build a short per-skill merge note before editing:
   - source inputs read
   - behavior to keep from each source
   - conflicts or duplicate loops to resolve
   - material intentionally left only in provenance
4. Rewrite only the active top-level `SKILL.md` for the target skill unless a sibling reference file is already the correct home for heavy detail.
5. Preserve source folders and copied source files. Do not delete provenance during synthesis.
6. Keep public Mithril names and router boundaries:
   - one active TDD skill
   - one active debugging skill
   - one active code review and quality skill
   - one active skill authoring/design skill
   - one active implementation standards skill
7. For `code-review-and-quality`, also compare the active `requesting-code-review` and `receiving-code-review` skills before editing. Absorb shared review principles into `code-review-and-quality` without deleting those dedicated workflow skills unless a later task explicitly retires them.
8. Do not use `docs/skill-anatomy.md` or `skill-design` as the rewrite basis. The basis is direct source comparison and Mithril routing needs.

### Code Snippets

Useful source inventory:

```powershell
Get-ChildItem skills -Directory | Where-Object { Test-Path (Join-Path $_.FullName 'sources') } | Select-Object -ExpandProperty Name
```

Useful per-skill comparison:

```powershell
rg -n "^(#|##|###) " skills/<skill-name>
```

### Environment Variables

Use `MITHRIL_*` variables only in product-facing examples.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `npm run validate:skills`
- Expected: Should already pass from task 09; use this as a guard before synthesis starts.

### GREEN

- Command: `npm run validate:skills`
- Expected: All synthesized active skills pass the validator with no dead cross-references.

### Final Verification

- Command: `npm test`
- Expected: Skill validation, command validation, and shell lint pass.

## Acceptance Criteria

- [ ] `test-driven-development` merges the best TDD guidance from active and copied sources into one active Mithril skill.
- [ ] `systematic-debugging` merges the best debugging guidance from active and copied sources into one active Mithril skill.
- [ ] `code-review-and-quality` merges the best review guidance from active, copied, requesting-review, and receiving-review surfaces without deleting dedicated workflow skills.
- [ ] `skill-design` merges the best skill-writing guidance from active and copied sources without becoming the basis for this merge task itself.
- [ ] `implementation-standards` reflects the final cross-cutting implementation guidance needed by the synthesized workflow.
- [ ] Copied `sources/` material remains present for provenance.
- [ ] `using-mithril` routes only the final active Mithril skill names.
- [ ] `npm run validate:skills` passes.
- [ ] `npm test` passes.

## Notes

This is a behavioral synthesis wave, not a source-copy or heading-normalization pass. It should produce carefully merged active skills that read as Mithril-owned guidance while retaining copied source material under `sources/` for auditability.
