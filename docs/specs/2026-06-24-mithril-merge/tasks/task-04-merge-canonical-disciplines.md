# Task 04: Merge Canonical Disciplines

## Status

complete

## Wave

3

## Description

Create the canonical Mithril discipline skills that resolve overlap across source repos. The approved design identifies duplicate or overlapping TDD, debugging, review, planning, skill-writing, and code-shape guidance. This task creates single Mithril-owned versions so downstream imports do not create competing behavior.

## Dependencies

**Depends on:** task-02-add-validation-harness.md, task-03-port-superpowers-core.md
**Blocks:** task-05-add-agent-specialists-references.md, task-07-add-matt-alignment-domain.md, task-08-add-simplicity-layer.md, task-09-rewrite-docs-router-integration.md

**Context from dependencies:** Task 02 supplies validators. Task 03 ports Superpowers core skills that provide the strict execution and verification baseline.

## Files to Create

- `skills/test-driven-development/SKILL.md`
- `skills/systematic-debugging/SKILL.md`
- `skills/code-review-and-quality/SKILL.md`
- `skills/skill-design/SKILL.md`
- `skills/implementation-standards/SKILL.md`
- `docs/skill-anatomy.md`

## Files to Modify

- `skills/using-mithril/SKILL.md` - route canonical disciplines and avoid duplicate upstream equivalents.

## Technical Details

### Implementation Steps

1. Create `docs/skill-anatomy.md` from the agent-skills structure, adapted for Mithril.
2. Build `test-driven-development` from:
   - Superpowers strict RED-GREEN-REFACTOR and no production code before failing test.
   - Matt public-interface tests, vertical tracer bullets, and `CONTEXT.md` vocabulary guidance.
   - agent-skills test pyramid, DAMP-over-DRY, browser testing, and resource model.
3. Build `systematic-debugging` from:
   - Matt tight red-capable feedback loop.
   - Superpowers root-cause tracing and hypothesis discipline.
   - agent-skills safe error recovery and untrusted-error-output warnings.
4. Build `code-review-and-quality` from:
   - Superpowers task/final review gates.
   - agent-skills five-axis review and severity taxonomy.
   - persona fan-out support from agent-skills.
5. Build `skill-design` from:
   - Superpowers writing-skills.
   - Matt writing-great-skills.
   - `docs/skill-anatomy.md` and validation expectations.
6. Build `implementation-standards` from the approved Code Shape Governance section.
7. Ensure all five skills have:
   - YAML frontmatter
   - overview
   - when-to-use
   - concrete process
   - rationalizations/red flags where discipline-enforcing
   - verification section

### Code Snippets

Canonical skill names must be exactly:

```text
test-driven-development
systematic-debugging
code-review-and-quality
skill-design
implementation-standards
```

### Environment Variables

Not applicable.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `Test-Path skills/test-driven-development/SKILL.md; Test-Path docs/skill-anatomy.md`
- Expected: At least one canonical discipline file is missing before this task.

### GREEN

- Command: `npm run validate:skills`
- Expected: Canonical discipline skills pass validation.

### Final Verification

- Command: `rg -n "test-driven-development|systematic-debugging|code-review-and-quality|skill-design|implementation-standards" skills/using-mithril/SKILL.md skills`
- Expected: `using-mithril` and the skill set reference the canonical Mithril names.

## Acceptance Criteria

- [ ] No duplicate TDD, debugging, review, or skill-design skill is routed.
- [ ] `docs/skill-anatomy.md` exists and is the required Mithril skill format.
- [ ] `implementation-standards` answers how code should look and be verified.
- [ ] `using-mithril` routes canonical disciplines.
- [ ] `npm run validate:skills` passes.

## Notes

Downstream specialist imports should reference these canonical discipline skills instead of embedding competing process loops.
