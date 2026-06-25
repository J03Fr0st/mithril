# Task 02: Add Validation Harness

## Status

pending

## Wave

1

## Description

Add validation early so later import tasks can verify their work. The approved design says Mithril should not remain a hand-assembled plugin and should port agent-skills validators plus selected runtime and shell checks. This task creates the validation entrypoints and package scripts used by all later tasks.

## Dependencies

**Depends on:** None (Wave 1)
**Blocks:** task-03-port-superpowers-core.md, task-04-merge-canonical-disciplines.md, task-05-add-agent-specialists-references.md, task-07-add-matt-alignment-domain.md, task-08-add-simplicity-layer.md, task-10-final-consistency-release.md

**Context from dependencies:** None. This is a foundation task.

## Files to Create

- `scripts/validate-skills.js` - validates Mithril-owned `skills/*/SKILL.md` frontmatter and Mithril skill-design expectations.
- `scripts/validate-commands.js` - validates command files once `commands/` exists.
- `tests/README.md` - documents available local checks and which source repo each came from.

## Files to Modify

- `package.json` - add validation and test scripts.

## Technical Details

### Implementation Steps

1. Use `D:\Source\_ai\agent-skills\scripts\validate-skills.js` as the primary source for skill validation behavior.
2. Use `D:\Source\_ai\agent-skills\scripts\validate-commands.js` as the primary source for command validation behavior.
3. Adjust both scripts to Mithril paths and naming.
4. Add package scripts:
   - `validate:skills`
   - `validate:commands`
   - `lint:shell`
   - `test`
5. `test` should run the available validators and shell linting without assuming future test files already exist.
6. Validator behavior should support missing optional directories gracefully. For example, `validate:commands` should pass or clearly report "no commands directory yet" before commands are added.

### Code Snippets

Suggested `package.json` scripts:

```json
{
  "scripts": {
    "validate:skills": "node scripts/validate-skills.js",
    "validate:commands": "node scripts/validate-commands.js",
    "lint:shell": "bash scripts/lint-shell.sh",
    "test": "npm run validate:skills && npm run validate:commands && npm run lint:shell"
  }
}
```

### Environment Variables

Not applicable.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `npm run validate:skills`
- Expected: Fails before this task because the script is not defined or the validator does not exist.

### GREEN

- Command: `npm run validate:skills`
- Expected: Runs the validator and reports clear pass/fail output.

### Final Verification

- Command: `npm test`
- Expected: Runs all currently available validation checks without missing-script failures.

## Acceptance Criteria

- [ ] `scripts/validate-skills.js` exists and is Mithril-aware.
- [ ] `scripts/validate-commands.js` exists and is Mithril-aware.
- [ ] `package.json` exposes validation and test scripts.
- [ ] Validation handles missing optional directories cleanly.
- [ ] `tests/README.md` documents current checks and their source provenance.

## Notes

This task should not import skills. It only establishes the checks that later tasks must satisfy.
