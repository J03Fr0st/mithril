# Upstream Repositories vs Mithril

This page compares the source repositories used to shape Mithril with Mithril's active repository model. It is provenance and design context for maintainers; it is not an active router, skill, command, or persona.

## Summary

Mithril is a curated synthesis of several upstream workflow systems. The goal is not to mirror every upstream prompt surface. The goal is to keep the strongest compatible behavior from each source while presenting one Mithril-owned router, one skill namespace, one command surface, and read-only advisory personas.

For the granular merge history, see [Upstream Merge Details](upstream-merge-details.md).

| Source | What it contributes | What Mithril changes |
| --- | --- | --- |
| `obra/superpowers` | Autonomous execution discipline, strict verification gates, subagent/worktree flow, and release-minded workflow boundaries | Rebrands the runtime concepts to Mithril, keeps one router, and folds overlapping behavior into canonical Mithril skills |
| `addyosmani/agent-skills` | Broad SDLC coverage, commands, personas, validation scripts, reference checklists, and public docs structure | Adapts the structure and specialist coverage without importing `using-agent-skills` as a competing router |
| `mattpocock/skills` | Requirement pressure, domain-modeling habits, PRD/issue flows, codebase design, and sharp TDD/debugging guidance | Keeps selected general-purpose guidance and excludes personal, deprecated, draft, or project-specific surfaces from the default route set |
| `DietrichGebert/ponytail` | Simplicity ladder, anti-bloat review, and over-engineering audit discipline | Uses the Mithril Simplicity Layer as a skill-level discipline without importing upstream mode persistence, scoreboards, or help/debt ledgers |
| `J03Fr0st/mithril` | Packaging, host adapters, product naming, and the active distribution surface | Owns the final router, names, validation contract, documentation, and release boundaries |

## Comparison By Concern

| Concern | Upstream repos | Mithril |
| --- | --- | --- |
| Router | Each source may have its own entry point, such as `using-superpowers`, `using-agent-skills`, or source-specific guidance | `skills/using-mithril/SKILL.md` is the only active router |
| Skills | Source skills can overlap in TDD, debugging, planning, review, delivery, and skill authoring | Overlapping guidance is merged into canonical Mithril skills with Mithril names |
| Commands | Upstream command surfaces vary by host and repo | Commands in `commands/` are user-facing entry points that route into Mithril skills |
| Personas | Upstream reviewer or specialist prompts may be mixed with workflow behavior | Personas in `agents/` are advisory leaf reviewers only; they do not edit, mutate, or invoke other personas |
| References | Upstream checklists and long-form guidance can be embedded directly in workflows | Heavy checklists live under `references/` and are loaded only when a task needs them |
| Simplicity | Upstream simplicity tooling includes persistent modes and score/debt surfaces | Mithril keeps simplicity as implementation and review discipline, not as a second operating mode |
| Validation | Source repos use different structural assumptions | Mithril validates skills, commands, shell helpers, package contents, and stale upstream naming with repo-owned scripts |

## Import Rules

When comparing a future upstream change to Mithril, use these rules:

1. Keep the source material visible long enough to compare behavior.
2. Preserve attribution for copied or adapted MIT-licensed material.
3. Do not import upstream routers into the active path.
4. Prefer one canonical Mithril skill over duplicate source-specific skills.
5. Apply required Mithril naming, route alignment, and validator compliance.
6. Exclude personal, deprecated, draft, host-specific, or persistence-mode surfaces unless a Mithril product decision explicitly accepts them.
7. Update `NOTICE.md` when copied or adapted material changes attribution obligations.

## Current Design Position

Mithril should read as its own workflow pack, not as a folder of upstream snapshots. Upstream repositories are evidence and source material. Mithril owns the final user-facing behavior, naming, routing, verification gates, and release surface.
