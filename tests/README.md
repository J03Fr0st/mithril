# Local Checks

This directory documents the local verification entrypoints for Mithril.

## Commands

| Command | Purpose | Source provenance |
| --- | --- | --- |
| `npm run validate:skills` | Validates Mithril-owned `skills/*/SKILL.md` frontmatter, standard sections, and cross-skill references. | Adapted from `D:\Source\_ai\agent-skills\scripts\validate-skills.js` and `D:\Source\_ai\agent-skills\docs\skill-anatomy.md`. |
| `npm run validate:commands` | Validates Mithril `commands/*.toml` files once the optional `commands/` directory exists. | Adapted from `D:\Source\_ai\agent-skills\scripts\validate-commands.js`; narrowed to Mithril's `commands/` TOML structure. |
| `npm run lint:shell` | Runs the repository shell lint script. | Existing Mithril `scripts/lint-shell.sh`. |
| `npm test` | Runs the current validation suite used by later Mithril Merge tasks. | Mithril package script combining the checks above. |
