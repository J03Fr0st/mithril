# Task 05: Copy and Rename agent-skills Specialists and References

## Status

complete

## Wave

4

## Description

Add the selected agent-skills specialist layer and reference checklists by copying source files first and applying only required Mithril naming. The approved design uses agent-skills for broad SDLC coverage, validation depth, references, and documentation structure. This task creates an auditable copied-and-renamed baseline for the later rewrite pass.

## Dependencies

**Depends on:** task-02-add-validation-harness.md, task-04-merge-canonical-disciplines.md
**Blocks:** task-06-add-commands-personas.md, task-09-rewrite-docs-router-integration.md

**Context from dependencies:** Task 02 provides validators. Task 04 creates copied-and-renamed canonical discipline source material that these specialists should reference instead of duplicating.

## Files to Create

- `skills/api-and-interface-design/SKILL.md`
- `skills/browser-testing-with-devtools/SKILL.md`
- `skills/ci-cd-and-automation/SKILL.md`
- `skills/code-simplification/SKILL.md`
- `skills/context-engineering/SKILL.md`
- `skills/deprecation-and-migration/SKILL.md`
- `skills/documentation-and-adrs/SKILL.md`
- `skills/doubt-driven-development/SKILL.md`
- `skills/frontend-ui-engineering/SKILL.md`
- `skills/observability-and-instrumentation/SKILL.md`
- `skills/performance-optimization/SKILL.md`
- `skills/security-and-hardening/SKILL.md`
- `skills/shipping-and-launch/SKILL.md`
- `skills/source-driven-development/SKILL.md`
- `references/accessibility-checklist.md`
- `references/definition-of-done.md`
- `references/observability-checklist.md`
- `references/performance-checklist.md`
- `references/security-checklist.md`
- `references/testing-patterns.md`

## Files to Modify

None. Router integration happens in task 09.

## Technical Details

### Implementation Steps

1. Source material from `D:\Source\_ai\agent-skills\skills\` and `D:\Source\_ai\agent-skills\references\`.
2. Preserve source structure in the copied skills and references.
3. Replace only product-facing `agent-skills` mentions that conflict with Mithril naming.
4. Keep source attribution in `NOTICE.md` if substantial text is copied.
5. Do not merge or rewrite shared disciplines in this task. Where a copied specialist names shared disciplines, use the intended Mithril destination names:
   - `test-driven-development`
   - `systematic-debugging`
   - `code-review-and-quality`
   - `implementation-standards`
6. Do not import `using-agent-skills`.
7. Commit the copied-and-renamed specialist baseline before the later combined rewrite.

### Code Snippets

Reference import source:

```text
D:\Source\_ai\agent-skills\skills\security-and-hardening\SKILL.md
D:\Source\_ai\agent-skills\references\security-checklist.md
```

### Environment Variables

Not applicable.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `Test-Path skills/security-and-hardening/SKILL.md; Test-Path references/security-checklist.md`
- Expected: Selected specialist files are missing before this task.

### GREEN

- Command: `npm run validate:skills`
- Expected: Copied-and-renamed specialist skills exist. Validator failures caused only by preserved source structure are documented for the later rewrite pass.

### Final Verification

- Command: `rg -n "using-agent-skills|agent-skills" skills references`
- Expected: No product-facing stale references remain. Any matches must be attribution/history only.

## Acceptance Criteria

- [ ] All selected specialist skills exist.
- [ ] All selected reference checklists exist.
- [ ] `using-agent-skills` is not imported.
- [ ] Source structure is preserved except required Mithril renaming.
- [ ] Specialists reference canonical Mithril disciplines instead of duplicating them.

## Notes

This task should not add commands or personas; task 06 owns those files.
