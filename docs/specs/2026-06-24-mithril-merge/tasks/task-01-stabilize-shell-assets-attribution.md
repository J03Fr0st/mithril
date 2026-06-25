# Task 01: Stabilize Shell Assets and Attribution

## Status

pending

## Wave

1

## Description

Stabilize the existing Mithril plugin shell before importing more behavior. The approved design says Mithril is currently a rebranded plugin shell with missing assets and a need to preserve MIT attribution for copied or derived source material. This task creates the missing package assets, adds attribution/notice coverage, and confirms the current `skills/using-mithril` bootstrap remains intentionally owned.

## Dependencies

**Depends on:** None (Wave 1)
**Blocks:** task-03-port-superpowers-core.md, task-09-rewrite-docs-router-integration.md

**Context from dependencies:** None. This is a foundation task.

## Files to Create

- `assets/mithril-small.svg` - small Mithril icon referenced by plugin manifests.
- `assets/app-icon.png` - app icon referenced by plugin manifests.
- `NOTICE.md` - attribution and provenance for MIT-derived source material.

## Files to Modify

- `.codex-plugin/plugin.json` - confirm asset references point at real files.
- `gemini-extension.json` - confirm extension metadata and assets remain Mithril-branded.

## Technical Details

### Implementation Steps

1. Inspect current manifests and metadata:
   - `.codex-plugin/plugin.json`
   - `gemini-extension.json`
2. Create the missing `assets/` directory and the two referenced asset files.
3. Add `NOTICE.md` with provenance for:
   - Superpowers: `https://github.com/obra/superpowers.git`
   - agent-skills: `https://github.com/addyosmani/agent-skills.git`
   - Matt Pocock skills: `https://github.com/mattpocock/skills.git`
   - Simplicity source provenance: `https://github.com/DietrichGebert/ponytail.git`
4. Keep source names in provenance and attribution only. Product-facing text should remain Mithril-branded.
5. Preserve the existing untracked `skills/` directory. Do not delete or reset it.

### Code Snippets

Recommended `NOTICE.md` shape:

```markdown
# Notices

Mithril includes or adapts MIT-licensed material from the following projects:

- Superpowers - https://github.com/obra/superpowers
- agent-skills - https://github.com/addyosmani/agent-skills
- Matt Pocock skills - https://github.com/mattpocock/skills
- Simplicity source provenance - https://github.com/DietrichGebert/ponytail

See `LICENSE` for Mithril's license. Preserve upstream copyright notices when copying substantial portions.
```

### Environment Variables

Not applicable.

### API Endpoints

Not applicable.

## Verification Plan

### RED

- Command: `Test-Path assets/mithril-small.svg; Test-Path assets/app-icon.png; Test-Path NOTICE.md`
- Expected: At least one required file is missing before this task.

### GREEN

- Command: `Test-Path assets/mithril-small.svg; Test-Path assets/app-icon.png; Test-Path NOTICE.md`
- Expected: All three checks return `True`.

### Final Verification

- Command: `rg -n "assets/mithril-small.svg|assets/app-icon.png|NOTICE" .codex-plugin gemini-extension.json package.json README.md`
- Expected: Asset and notice references are present and point to real files.

## Acceptance Criteria

- [ ] `assets/mithril-small.svg` exists.
- [ ] `assets/app-icon.png` exists.
- [ ] `NOTICE.md` lists all four source repositories and preserves MIT attribution intent.
- [ ] Manifests reference existing assets.
- [ ] Product-facing names remain Mithril-branded.
- [ ] Existing `skills/using-mithril` content is preserved.

## Notes

If a real branded image is not ready, create a simple temporary asset and document it in `NOTICE.md` or release notes as a pre-release asset to replace before publication.
