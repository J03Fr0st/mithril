# Task 11: Final Consistency and Release Readiness

## Status

complete

## Wave

8

## Description

Run the final consistency, validation, packaging, and release-readiness pass after all implementation and docs tasks are complete. This task confirms Mithril is internally consistent, attribution is preserved, excluded surfaces are absent, and the package can be prepared for release.

## Dependencies

**Depends on:** task-02-add-validation-harness.md, task-10-synthesize-merged-skills.md
**Blocks:** None

**Context from dependencies:** Task 02 provides validation scripts. Task 10 completes the merged top-level skill synthesis, so the consistency pass can evaluate the whole product.

## Files to Create

None.

## Files to Modify

- `package.json` - final scripts, files, metadata, and version readiness.
- `RELEASE-NOTES.md` - release notes for the first merged Mithril version.
- `.codex-plugin/plugin.json` - final manifest checks if needed.
- `gemini-extension.json` - final extension metadata checks if needed.

## Technical Details

### Implementation Steps

1. Run all validators and tests:
   - `npm run validate:skills`
   - `npm run validate:commands`
   - `npm run lint:shell`
   - `npm test`
2. Run package dry-run:
   - `npm pack --dry-run`
3. Search for stale upstream product names:
   - `superpowers`
   - `agent-skills`
   - `setup-matt`
   - `docs/superpowers`
   - `.superpowers`
   - `SUPERPOWERS`
   - upstream simplicity source name
4. Classify matches:
   - allowed: provenance, attribution, copied license text, design/spec history
   - not allowed: product-facing Mithril docs, skills, commands, manifests
5. Confirm excluded surfaces are absent:
   - upstream routers
   - Matt deprecated/in-progress/personal imports
   - `simplicity-debt`
   - `simplicity-gain`
   - `simplicity-help`
   - upstream persistent simplicity mode hooks
6. Update `RELEASE-NOTES.md` with the merge summary and any known limitations.
7. Confirm `git status` contains only intended Mithril changes.

### Code Snippets

Useful stale-name search:

```powershell
rg -n "superpowers|agent-skills|setup-matt|docs/superpowers|\\.superpowers|SUPERPOWERS|ponytail|PONYTAIL" .
```

### Environment Variables

Use `MITHRIL_*` variables only in product-facing docs and scripts.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `npm test`
- Expected: Before prior tasks complete, this may fail because validators, commands, or imported skills are incomplete.

### GREEN

- Command: `npm test`
- Expected: All local validators and tests pass.

### Final Verification

- Command: `npm pack --dry-run`
- Expected: Package dry-run succeeds and includes intended files only.

## Acceptance Criteria

- [x] `npm test` passes.
- [x] `npm pack --dry-run` succeeds.
- [x] Stale-name search has only intentional provenance/history matches.
- [x] Excluded routers and surfaces are absent from product behavior.
- [x] `RELEASE-NOTES.md` describes the merge.
- [x] `git status` contains only intended Mithril changes.

## Notes

If a validator fails because a documented task intentionally deferred a check, record the exact reason in `implementation-log.md` instead of claiming the release is ready.
