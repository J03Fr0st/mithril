# Task 07: Add Matt Alignment and Domain Layer

## Status

complete

## Wave

4

## Description

Add the selected Matt Pocock alignment, domain, issue, and architecture skills. The approved design values these skills for requirement interrogation, domain language, codebase design, PRD/issue flows, triage, handoff, and architecture deepening. This task imports selected material only and rewrites it into Mithril skill anatomy.

## Dependencies

**Depends on:** task-02-add-validation-harness.md, task-04-merge-canonical-disciplines.md
**Blocks:** task-09-rewrite-docs-router-integration.md

**Context from dependencies:** Task 02 provides validators. Task 04 creates `docs/skill-anatomy.md` and canonical discipline skills that Matt-derived skills should reference.

## Files to Create

- `skills/grill-me/SKILL.md`
- `skills/grill-with-docs/SKILL.md`
- `skills/grilling/SKILL.md`
- `skills/domain-modeling/SKILL.md`
- `skills/codebase-design/SKILL.md`
- `skills/prototype/SKILL.md`
- `skills/to-prd/SKILL.md`
- `skills/to-issues/SKILL.md`
- `skills/triage/SKILL.md`
- `skills/handoff/SKILL.md`
- `skills/improve-codebase-architecture/SKILL.md`
- `skills/resolving-merge-conflicts/SKILL.md`
- `skills/setup-mithril-project/SKILL.md`

## Files to Modify

None. Router integration happens in task 09.

## Technical Details

### Implementation Steps

1. Source selected material from `D:\Source\_ai\skills\skills\engineering\` and `D:\Source\_ai\skills\skills\productivity\`.
2. Do not import:
   - `skills/engineering/ask-matt`
   - `skills/deprecated/*`
   - `skills/in-progress/*`
   - `skills/personal/*`
3. Rename `setup-matt-pocock-skills` to `setup-mithril-project`.
4. Rewrite all imported skills into `docs/skill-anatomy.md` structure.
5. Preserve the strongest Matt patterns:
   - `grill-me` for requirement interrogation.
   - `grill-with-docs` for stress-testing plans against `CONTEXT.md` and ADRs.
   - `domain-modeling` for glossary and decision clarity.
   - `codebase-design` for deep modules and interface/test-surface vocabulary.
   - `to-prd`, `to-issues`, and `triage` for issue-tracker workflows.
6. Keep personal tone and naming out of product-facing Mithril text.

### Code Snippets

Source paths:

```text
D:\Source\_ai\skills\skills\engineering\domain-modeling\SKILL.md
D:\Source\_ai\skills\skills\engineering\codebase-design\SKILL.md
D:\Source\_ai\skills\skills\engineering\setup-matt-pocock-skills\SKILL.md
```

### Environment Variables

Not applicable.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `Test-Path skills/domain-modeling/SKILL.md; Test-Path skills/setup-mithril-project/SKILL.md`
- Expected: Selected alignment/domain skills are missing before this task.

### GREEN

- Command: `npm run validate:skills`
- Expected: Imported alignment/domain skills pass validation.

### Final Verification

- Command: `rg -n "ask-matt|setup-matt-pocock-skills|deprecated|in-progress|personal" skills`
- Expected: No excluded Matt surfaces are imported or routed.

## Acceptance Criteria

- [ ] Selected Matt-derived skills exist under Mithril names.
- [ ] `setup-mithril-project` exists and no `setup-matt-pocock-skills` route remains.
- [ ] Excluded deprecated, in-progress, personal, and `ask-matt` surfaces are absent.
- [ ] Skills follow `docs/skill-anatomy.md`.
- [ ] Product-facing text uses Mithril naming and neutral attribution.

## Notes

Do not wire these skills into `using-mithril` in this task. Task 09 owns routing after all imports exist.
