# Implementation Log: Mithril Merge

## 2026-06-25 - Progress Reset for Source-First Redo

- Branch baseline: `rebase/big`.
- Prior generated skill set was removed in commit `2b4202f`.
- The merge plan was reset to source-first execution in commit `778323e`.
- Current redo rule: copy selected source skills first, apply only required Mithril renaming, commit the copied-and-renamed baseline, then perform the combined Mithril rewrite later.
- `docs/skill-anatomy.md` is not a renaming or refactoring basis for this redo.
- All task statuses are reset to `pending`.
- No implementation waves have started on the reset plan.

## Reset Verification

- `docs/specs/2026-06-24-mithril-merge/spec.json` should parse as JSON.
- `docs/specs/2026-06-24-mithril-merge/README.md` should show all tasks unchecked.
- Every task file should have `## Status` set to `pending`.
- Product-facing agent and dot-plugin instruction files should not reference `skillsanats.v.md` or `docs/skill-anatomy.md`.

## Next Step

Start with `task-01-stabilize-shell-assets-attribution`, then continue through the dependency graph. For skill import tasks, do not synthesize or normalize during the source-baseline commit.
