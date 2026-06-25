# Task 07: Copy and Rename Matt Alignment and Domain Layer

## Status

complete

## Wave

4

## Description

Add the selected Matt Pocock alignment, domain, issue, and architecture skills by copying source files first and applying only required Mithril naming. The approved design values these skills for requirement interrogation, domain language, codebase design, PRD/issue flows, triage, handoff, and architecture deepening. This task preserves source behavior for the later combined rewrite.

## Dependencies

**Depends on:** task-02-add-validation-harness.md, task-04-merge-canonical-disciplines.md
**Blocks:** task-09-rewrite-docs-router-integration.md

**Context from dependencies:** Task 02 provides validators. Task 04 creates copied-and-renamed canonical discipline source material that Matt-derived skills should reference.

## Files to Create

- `skills/grill-me/SKILL.md`
- `skills/grill-with-docs/SKILL.md`
- `skills/grilling/SKILL.md`
- `skills/domain-modeling/SKILL.md`
- `skills/domain-modeling/ADR-FORMAT.md`
- `skills/domain-modeling/CONTEXT-FORMAT.md`
- `skills/codebase-design/SKILL.md`
- `skills/codebase-design/DEEPENING.md`
- `skills/codebase-design/DESIGN-IT-TWICE.md`
- `skills/prototype/SKILL.md`
- `skills/prototype/LOGIC.md`
- `skills/prototype/UI.md`
- `skills/to-prd/SKILL.md`
- `skills/to-issues/SKILL.md`
- `skills/triage/SKILL.md`
- `skills/triage/AGENT-BRIEF.md`
- `skills/triage/OUT-OF-SCOPE.md`
- `skills/handoff/SKILL.md`
- `skills/improve-codebase-architecture/SKILL.md`
- `skills/improve-codebase-architecture/HTML-REPORT.md`
- `skills/resolving-merge-conflicts/SKILL.md`
- `skills/setup-mithril-project/SKILL.md`
- `skills/setup-mithril-project/domain.md`
- `skills/setup-mithril-project/issue-tracker-github.md`
- `skills/setup-mithril-project/issue-tracker-gitlab.md`
- `skills/setup-mithril-project/issue-tracker-local.md`
- `skills/setup-mithril-project/triage-labels.md`

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
4. Preserve source structure in copied skills. Do not rewrite into a new Mithril structure during this task.
5. Preserve the strongest Matt patterns:
   - `grill-me` for requirement interrogation.
   - `grill-with-docs` for stress-testing plans against `CONTEXT.md` and ADRs.
   - `domain-modeling` for glossary and decision clarity.
   - `codebase-design` for deep modules and interface/test-surface vocabulary.
   - `to-prd`, `to-issues`, and `triage` for issue-tracker workflows.
6. Keep personal tone and naming out of product-facing Mithril text only where it conflicts with required renaming.
7. Commit the copied-and-renamed Matt baseline before the later combined rewrite.

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
- Expected: Copied-and-renamed alignment/domain skills exist. Validator failures caused only by preserved source structure are documented for the later rewrite pass.

### Final Verification

- Command: `Test-Path skills/ask-matt; Test-Path skills/setup-matt-pocock-skills; Test-Path skills/deprecated; Test-Path skills/in-progress; Test-Path skills/personal`
- Expected: All checks return `False`.

- Command: `rg -n "ask-matt|setup-matt-pocock-skills" skills`
- Expected: No excluded Matt router or setup names remain.

## Acceptance Criteria

- [ ] Selected Matt-derived skills exist under Mithril names.
- [ ] `setup-mithril-project` exists and no `setup-matt-pocock-skills` route remains.
- [ ] Excluded deprecated, in-progress, personal, and `ask-matt` surfaces are absent.
- [ ] Source structure is preserved except required Mithril renaming.
- [ ] Product-facing text uses Mithril naming and neutral attribution.

## Notes

Do not wire these skills into `using-mithril` in this task. Task 09 owns routing after all imports exist.
