# Task 08: Copy and Rename Mithril Simplicity Layer

## Status

complete

## Wave

4

## Description

Add the Mithril Simplicity Layer as a native anti-bloat discipline by copying selected source skills first and applying only required Mithril naming. The approved design says Mithril should adopt the simplicity ladder and explicit over-engineering review/audit tools, while excluding upstream branding, debt ledger, gain scoreboard, help card, and persistent mode hooks.

## Dependencies

**Depends on:** task-02-add-validation-harness.md, task-04-merge-canonical-disciplines.md
**Blocks:** task-06-add-commands-personas.md, task-09-rewrite-docs-router-integration.md

**Context from dependencies:** Task 02 provides validators. Task 04 creates the canonical TDD, review, and implementation-standards skills that the simplicity layer must integrate with.

## Files to Create

- `skills/simplicity/SKILL.md`
- `skills/simplicity-review/SKILL.md`
- `skills/simplicity-audit/SKILL.md`

## Files to Modify

None during the source-copy baseline. Integration into TDD, review, and implementation standards is deferred to the later combined rewrite pass.

## Technical Details

### Implementation Steps

1. Source behavior from `D:\Source\_ai\ponytail\skills\`, but use Mithril naming.
2. Create only:
   - `simplicity`
   - `simplicity-review`
   - `simplicity-audit`
3. Do not create:
   - `simplicity-debt`
   - `simplicity-gain`
   - `simplicity-help`
4. Do not import upstream persistent mode hooks, mode trackers, config files, or state behavior.
5. Preserve source structure in the copied skills. Do not rewrite the ladder into final Mithril tone until the later combined rewrite pass. The intended final ladder remains:
   - Does this need to exist?
   - Is it already in this codebase?
   - Does the standard library solve it?
   - Does a native platform feature solve it?
   - Does an already-installed dependency solve it?
   - Can it be one line?
   - Only then write minimum custom code.
6. Preserve safety boundaries:
   - never remove trust-boundary validation
   - never remove data-loss prevention
   - never remove security
   - never remove accessibility basics
   - never bypass root-cause debugging
7. Keep `simplicity-review` and `simplicity-audit` report-only.
8. Commit the copied-and-renamed simplicity baseline before the later combined rewrite.

### Code Snippets

Review tags:

```text
delete: dead code, unused flexibility, speculative feature
stdlib: hand-rolled thing the standard library ships
native: code/dependency doing what the platform already does
yagni: abstraction with one implementation or config nobody sets
shrink: same behavior with less code
```

### Environment Variables

Do not introduce upstream mode environment variables in this task.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `Test-Path skills/simplicity/SKILL.md; Test-Path skills/simplicity-review/SKILL.md; Test-Path skills/simplicity-audit/SKILL.md`
- Expected: Simplicity files are missing before this task.

### GREEN

- Command: `npm run validate:skills`
- Expected: Copied-and-renamed simplicity skills exist. Validator failures caused only by preserved source structure are documented for the later rewrite pass.

### Final Verification

- Command: `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail|PONYTAIL" skills`
- Expected: Excluded surfaces and product-facing upstream names are absent.

## Acceptance Criteria

- [ ] `simplicity`, `simplicity-review`, and `simplicity-audit` exist.
- [ ] Excluded debt, gain, and help skills do not exist.
- [ ] Persistent mode hooks/config/state behavior is not imported.
- [ ] Source structure is preserved except required Mithril naming.
- [ ] Simplicity principles are ready to integrate into TDD, review, and implementation standards during the later rewrite.
- [ ] Safety boundaries are explicit.

## Notes

The upstream name may appear only in provenance, attribution, copied license text, or the approved design. It should not appear in Mithril product-facing skill or command names.
