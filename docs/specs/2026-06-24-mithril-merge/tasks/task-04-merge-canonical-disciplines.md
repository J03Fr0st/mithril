# Task 04: Copy and Rename Canonical Sources

## Status

complete

## Wave

3

## Description

Copy and rename the source material for the canonical Mithril discipline skills that will later resolve overlap across source repos. The approved design identifies duplicate or overlapping TDD, debugging, review, planning, skill-writing, and code-shape guidance. This task preserves the selected source text first so the later rewrite can synthesize from an auditable baseline.

## Dependencies

**Depends on:** task-02-add-validation-harness.md, task-03-port-superpowers-core.md
**Blocks:** task-05-add-agent-specialists-references.md, task-07-add-matt-alignment-domain.md, task-08-add-simplicity-layer.md, task-09-rewrite-docs-router-integration.md

**Context from dependencies:** Task 02 supplies validators. Task 03 ports Superpowers core skills that provide the strict execution and verification baseline.

## Files to Create

- `skills/test-driven-development/SKILL.md`
- `skills/test-driven-development/testing-anti-patterns.md`
- `skills/test-driven-development/sources/agent-skills/SKILL.md`
- `skills/test-driven-development/sources/matt-tdd/SKILL.md`
- `skills/test-driven-development/sources/matt-tdd/mocking.md`
- `skills/test-driven-development/sources/matt-tdd/refactoring.md`
- `skills/test-driven-development/sources/matt-tdd/tests.md`
- `skills/systematic-debugging/SKILL.md`
- `skills/systematic-debugging/condition-based-waiting-example.ts`
- `skills/systematic-debugging/condition-based-waiting.md`
- `skills/systematic-debugging/CREATION-LOG.md`
- `skills/systematic-debugging/defense-in-depth.md`
- `skills/systematic-debugging/find-polluter.sh`
- `skills/systematic-debugging/root-cause-tracing.md`
- `skills/systematic-debugging/test-academic.md`
- `skills/systematic-debugging/test-pressure-1.md`
- `skills/systematic-debugging/test-pressure-2.md`
- `skills/systematic-debugging/test-pressure-3.md`
- `skills/systematic-debugging/sources/agent-skills-debugging-and-error-recovery/SKILL.md`
- `skills/systematic-debugging/sources/matt-diagnosing-bugs/SKILL.md`
- `skills/systematic-debugging/sources/matt-diagnosing-bugs/scripts/hitl-loop.template.sh`
- `skills/code-review-and-quality/SKILL.md`
- `skills/code-review-and-quality/sources/superpowers-receiving-code-review/SKILL.md`
- `skills/code-review-and-quality/sources/superpowers-requesting-code-review/SKILL.md`
- `skills/code-review-and-quality/sources/superpowers-requesting-code-review/code-reviewer.md`
- `skills/skill-design/SKILL.md`
- `skills/skill-design/anthropic-best-practices.md`
- `skills/skill-design/examples/CLAUDE_MD_TESTING.md`
- `skills/skill-design/graphviz-conventions.dot`
- `skills/skill-design/persuasion-principles.md`
- `skills/skill-design/render-graphs.js`
- `skills/skill-design/testing-skills-with-subagents.md`
- `skills/skill-design/sources/matt-writing-great-skills/GLOSSARY.md`
- `skills/skill-design/sources/matt-writing-great-skills/SKILL.md`
- `skills/implementation-standards/SKILL.md`

## Files to Modify

- `skills/using-mithril/SKILL.md` - route canonical disciplines and avoid duplicate upstream equivalents.

## Technical Details

### Implementation Steps

1. Do not use `docs/skill-anatomy.md` as a renaming or refactoring basis. Preserve source structure during the copy-and-rename baseline.
2. Copy source material for `test-driven-development` from:
   - Superpowers strict RED-GREEN-REFACTOR and no production code before failing test.
   - Matt public-interface tests, vertical tracer bullets, and `CONTEXT.md` vocabulary guidance.
   - agent-skills test pyramid, DAMP-over-DRY, browser testing, and resource model.
3. Copy source material for `systematic-debugging` from:
   - Matt tight red-capable feedback loop.
   - Superpowers root-cause tracing and hypothesis discipline.
   - agent-skills safe error recovery and untrusted-error-output warnings.
4. Copy source material for `code-review-and-quality` from:
   - Superpowers task/final review gates.
   - agent-skills five-axis review and severity taxonomy.
   - persona fan-out support from agent-skills.
5. Copy source material for `skill-design` from:
   - Superpowers writing-skills.
   - Matt writing-great-skills.
   - validation expectations and practical authoring guidance.
6. Copy or draft the initial `implementation-standards` source baseline from the approved Code Shape Governance section without merging it into other skills yet.
7. Apply only required Mithril naming and destination renames.
8. Commit the copied-and-renamed collision-source baseline before the later synthesis pass creates single canonical Mithril-owned workflows.

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

- Command: `Test-Path skills/test-driven-development/SKILL.md; Test-Path skills/skill-design/SKILL.md`
- Expected: At least one canonical discipline file is missing before this task.

### GREEN

- Command: `npm run validate:skills`
- Expected: Copied-and-renamed discipline source files exist. Validator failures caused only by preserved source structure are documented for the later rewrite pass.

### Final Verification

- Command: `rg -n "test-driven-development|systematic-debugging|code-review-and-quality|skill-design|implementation-standards" skills/using-mithril/SKILL.md skills`
- Expected: `using-mithril` and the skill set reference the canonical Mithril names.

## Acceptance Criteria

- [ ] Selected source material for TDD, debugging, review, skill-design, and implementation standards exists under Mithril destinations.
- [ ] Source structure is preserved except required Mithril renaming.
- [ ] No duplicate upstream router is activated from `using-mithril`.
- [ ] The copied-and-renamed baseline can be committed before canonical rewriting.

## Notes

Downstream specialist imports should reference these canonical discipline skills instead of embedding competing process loops.
