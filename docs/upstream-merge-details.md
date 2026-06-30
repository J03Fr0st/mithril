# Upstream Merge Details

This page describes the granular merge path from the upstream repositories into active Mithril behavior. It complements [upstream-repos-vs-mithril.md](upstream-repos-vs-mithril.md), which explains the repo-level comparison.

## Merge Strategy

Mithril used a source-first merge:

1. Stabilize the Mithril package shell, attribution, assets, and validators.
2. Copy selected upstream material into Mithril destinations with only required naming and routing changes.
3. Keep copied source structure intact long enough to compare behavior.
4. Add validator-required headings and route alignment without redesigning copied skills around a template.
5. Synthesize duplicate source material into active top-level Mithril skills.
6. Remove temporary copied `sources/` folders from runtime skill directories after the active skill owns the merged behavior.

The important distinction is that copying and synthesis were separate phases. Copying preserved source behavior for auditability. Synthesis created the final Mithril-owned workflows.

## Wave-Level Merge

| Wave | Source material | What was merged | How it became Mithril behavior |
| --- | --- | --- | --- |
| Shell and attribution | Mithril package shell plus upstream MIT sources | Package metadata, missing assets, `NOTICE.md`, and validation baseline | Established a legal and structural home for copied or adapted material before more behavior was imported |
| Superpowers core | `obra/superpowers` selected core skills | Brainstorming, planning, worktree use, subagent development, direct plan execution, review gates, verification, and branch finishing | Copied ten core skill directories, excluded `using-superpowers`, renamed product-facing Superpowers terms to Mithril terms, and preserved support scripts/prompts |
| Canonical disciplines | Superpowers, agent-skills, Matt skills, and approved Code Shape Governance | TDD, debugging, code review, skill design, and implementation standards | Copied source material into canonical Mithril destinations, preserved extra source material under temporary `sources/`, and deferred behavioral synthesis |
| Specialist layer | `addyosmani/agent-skills` | API/interface design, browser testing, CI/CD, code simplification, context engineering, migration, documentation, doubt-driven development, frontend UI, observability, performance, security, launch, and source-driven development | Copied selected specialist skills and reference checklists, excluded `using-agent-skills`, and rewired shared-discipline references to Mithril names |
| Alignment and domain layer | `mattpocock/skills` | Grill workflows, domain modeling, codebase design, prototype, PRD/issue/triage flows, handoff, architecture improvement, merge-conflict resolution, and setup flow | Copied selected general-purpose skills, renamed `setup-matt-pocock-skills` to `setup-mithril-project`, and excluded deprecated, in-progress, personal, and project-specific material |
| Simplicity layer | `DietrichGebert/ponytail` | Simplicity ladder, diff-focused simplicity review, and repo-wide simplicity audit | Copied selected surfaces into `simplicity`, `simplicity-review`, and `simplicity-audit`; excluded debt, gain, help, branding, scoreboards, and persistent mode hooks |
| Commands and personas | Mainly agent-skills structure | User-facing command entry points and advisory reviewer personas | Kept commands as workflow entry points and personas as read-only leaf reviewers with no edit or mutation authority |
| Docs and router integration | agent-skills docs structure plus Mithril router rules | Public docs, host setup docs, instruction files, and `using-mithril` routing | Rewrote docs around Mithril names, validated all selected skills, and kept `using-mithril` as the only active router |
| Skill synthesis | Temporary copied source payloads and active Mithril skills | Final TDD, debugging, review, skill-design, and implementation-standards behavior | Compared active skills against copied source payloads, merged compatible behavior into active `SKILL.md` files, then removed temporary `sources/` folders |

## Canonical Skill Synthesis

These skills had overlapping upstream behavior and were deliberately merged into one Mithril-owned active skill each.

| Mithril skill | Source inputs | Behavior kept | Conflict resolved |
| --- | --- | --- | --- |
| `test-driven-development` | Superpowers TDD, agent-skills TDD/testing guidance, Matt TDD habits | Strict red-green-refactor loop, no production code before a failing test, public-seam tests, vertical tracer bullets, regression proof, DAMP-over-DRY, state-over-interaction checks, and boundary mocking guidance | One active TDD loop replaces duplicate source-specific TDD workflows |
| `systematic-debugging` | Superpowers debugging, agent-skills debugging/error recovery, Matt diagnosis habits | Reproduce first, minimize the failure, build a red-capable command, rank hypotheses, instrument before guessing, keep evidence hygienic, handle untrusted output carefully, and prove regressions with tests | One active debugging process replaces separate root-cause, safe-recovery, and feedback-loop variants |
| `code-review-and-quality` | Superpowers task/final review gates, agent-skills review framework, `requesting-code-review`, `receiving-code-review`, personas | Findings-first review style, severity framing, correctness/readability/architecture/security/performance coverage, independent persona fan-out where useful, and receive-review discipline | Shared review standards moved into the canonical review skill while dedicated request/receive workflow skills stayed active |
| `skill-design` | Superpowers writing-skills, Matt writing-great-skills, agent-skills compatibility and validator expectations | Invocation metadata, progressive disclosure, information hierarchy, split/merge/prune guidance, behavioral proof, failure modes, and validator-aware structure | Skill-design owns new Mithril-owned skill creation, but copied-source rewrites stay source-first unless redesign is explicitly approved |
| `implementation-standards` | Approved Code Shape Governance plus source guidance from TDD, review, debugging, and specialist skills | Local consistency, tooling-owned mechanical style, public interfaces as design surfaces, domain vocabulary, minimal behavior slices, dependency restraint, separable refactors, and evidence before claims | Cross-cutting implementation rules live in one place instead of being repeated across every workflow |

## Imported Specialist Coverage

Some upstream skills were not merged into collision-heavy canonical skills because they covered distinct lifecycle needs. Mithril imported them as named specialist workflows, then adjusted naming and references.

| Source family | Mithril destinations | Merge approach |
| --- | --- | --- |
| agent-skills SDLC specialists | `api-and-interface-design`, `browser-testing-with-devtools`, `ci-cd-and-automation`, `code-simplification`, `context-engineering`, `deprecation-and-migration`, `documentation-and-adrs`, `doubt-driven-development`, `frontend-ui-engineering`, `observability-and-instrumentation`, `performance-optimization`, `security-and-hardening`, `shipping-and-launch`, `source-driven-development` | Preserve specialist intent, align headings and cross-references, and route from `using-mithril` only when the task matches |
| agent-skills references | Security, performance, accessibility, observability, testing, definition-of-done, and orchestration checklists | Keep heavy checklist detail in `references/` instead of bloating the router |
| Matt alignment/domain skills | `grill-me`, `grill-with-docs`, `grilling`, `domain-modeling`, `codebase-design`, `prototype`, `to-prd`, `to-issues`, `triage`, `handoff`, `improve-codebase-architecture`, `resolving-merge-conflicts`, `setup-mithril-project` | Keep general-purpose project-shaping behavior and remove personal/default-source assumptions from the active surface |
| Simplicity source | `simplicity`, `simplicity-review`, `simplicity-audit` | Keep the anti-bloat discipline as explicit skills and commands, not as an always-on mode system |

## Excluded Surfaces

| Excluded source surface | Reason |
| --- | --- |
| `using-superpowers` | Would create a competing router |
| `using-agent-skills` | Would create a competing router |
| Matt `ask-matt` and personal/default routing | Too personal and router-like for Mithril's active surface |
| Matt deprecated, in-progress, and personal directories | Not stable or general enough for the default Mithril workflow pack |
| Simplicity debt/gain/help surfaces | Scoreboards, ledgers, and help cards are not core Mithril behavior |
| Simplicity persistent mode hooks | Mithril already has one router; persistent mode state would create a second operating layer |
| Temporary copied `sources/` folders | Useful during synthesis, but not final runtime payload |

## Final Runtime Shape

The final active Mithril surface is:

- One router: `skills/using-mithril/SKILL.md`.
- One active skill namespace under `skills/`.
- Commands in `commands/` that choose when a workflow starts.
- Personas in `agents/` that report findings but do not edit, mutate, or invoke other personas.
- References in `references/` for heavy checklists.
- Public docs in `docs/` for human-facing setup, comparison, testing, and design context.

Upstream names may remain in attribution, source provenance, copied license text, or historical design/spec records. They should not become active routers or product-facing workflow names unless a later Mithril product decision explicitly changes that boundary.
