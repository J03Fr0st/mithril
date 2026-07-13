# Upstream Update Review — 2026-07-13

This is the decision worksheet for the current upstream refresh. It compares new and modified source surfaces against Mithril, records where each candidate would land, and keeps recommendations separate from approved decisions.

For the durable source-versus-Mithril policy, see [Upstream Repositories vs Mithril](upstream-repos-vs-mithril.md). For historical merge provenance, see [Upstream Merge Details](upstream-merge-details.md).

## Source Snapshot

| Source | Compared range | Refresh result |
| --- | --- | --- |
| `mattpocock/skills` | `d574778..391a270` | `main` fast-forwarded to `391a270` |
| `addyosmani/agent-skills` | `6bcfeb9..98967c4` | `main` fast-forwarded to `98967c4` (`0.6.4`) |
| `obra/superpowers` | `main` at `d884ae0`; new `dev` delta `c809093..096e15a` | `main` unchanged; `dev` gained one Gemini-support revert |

## Decision Register

`Final decision` stays `Pending` until explicitly agreed. The proposed decision is the starting point for discussion.

| ID | Candidate | Proposed decision | Mithril landing spot | Final decision |
| --- | --- | --- | --- | --- |
| MS-1 | Friendlier setup flow | Adapt | `skills/setup-mithril-project/SKILL.md` | Approved — ported |
| MS-2 | One-file-per-ticket local tracker | Adapt | `skills/setup-mithril-project/`, `skills/to-tickets/SKILL.md` | Approved — ported |
| MS-3 | Prototype retention on a throwaway branch | Skip | None | Pending |
| MS-4 | `setup-ts-deep-modules` | Defer | Possible future skill and reference config | Pending |
| AS-1 | Package-manager-aware supply-chain hardening | Adapt | `skills/security-and-hardening/SKILL.md`, `references/security-checklist.md` | Approved — ported |
| AS-2 | Greenfield and brownfield adoption guidance | Adapt | New `docs/adoption-guide.md` | Approved — ported |
| AS-3 | Developer onboarding guide | Adapt narrowly | `CONTRIBUTING.md` and existing contributor docs | Pending |
| AS-4 | README, Team, and source comparison refresh | Skip | None | Pending |
| SP-1 | Restore Gemini CLI support on `superpowers/dev` | Skip | None | Pending |

## `mattpocock/skills`

### MS-1 — Friendlier setup flow

**Upstream change:** The existing setup skill now explores the repository first, detects whether `triage` is installed, detects real monorepo signals, recommends defaults up front, and skips questions that exploration already answered.

**Why it matters:** Mithril's setup flow can become shorter without losing the decisions that actually affect generated project guidance.

**Approved adaptation:**

- Update `skills/setup-mithril-project/SKILL.md` to detect triage availability and monorepo signals before questioning the user.
- Default to a single-context domain layout unless the repository genuinely looks like a multi-context monorepo.
- Omit triage-label setup when the triage skill is unavailable.
- Keep Mithril naming, router, tracker conventions, and approval boundaries.

### MS-2 — One-file-per-ticket local tracker

**Upstream change:** The existing `to-tickets` skill no longer writes one combined `tickets.md`. It writes dependency-ordered files under `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, with status and blocking edges in each ticket.

**Why it matters:** Individual tickets are independently grabbable and map more closely to real issue trackers.

**Approved adaptation:**

- Align the local tracker template owned by `setup-mithril-project` with `spec.md` plus one file per ticket.
- Update `skills/to-tickets/SKILL.md` to emit the same structure for local tracking.
- Preserve Mithril's current `to-spec` and `to-tickets` terminology.

The upstream removal of a stray `</content>` marker is already irrelevant to Mithril if that marker is absent locally; it is not a separate port candidate.

### MS-3 — Prototype retention on a throwaway branch

**Upstream change:** The existing prototype skill changed from delete-or-absorb cleanup to mandatory retention of the full prototype on a throwaway branch, with a pointer from the implementation issue.

**Proposed decision: Skip.** The validated decision should be durable, but mandatory branch retention creates repository clutter and operational overhead. Mithril can already preserve important prototype evidence in an ADR, issue, commit, notes, or selected implementation artifacts without retaining every discarded shell and variant.

### MS-4 — `setup-ts-deep-modules`

**Upstream change:** A new in-progress skill introduces TypeScript package conventions and a bundled `dependency-cruiser` configuration for deep module boundaries.

**Proposed decision: Defer.** It remains under the source repo's `skills/in-progress/` surface. Reassess once the source promotes it or Mithril explicitly chooses to own a TypeScript-specific architecture workflow. Do not route it as active Mithril behavior yet.

## `addyosmani/agent-skills`

### AS-1 — Package-manager-aware supply-chain hardening

**Upstream change:** The existing security skill and checklist now:

- Find the installation boundary and reconcile `packageManager`, lockfile, workspace, and CI evidence.
- Use the detected manager's frozen or immutable install and native audit command.
- Block dependency lifecycle scripts before first execution, inspect exact package versions, record narrow approvals, and reinstall cleanly.
- Avoid automatic forced audit remediation.
- Review provenance, ownership, release age, scripts, lockfile changes, and the transitive graph.

**Why it matters:** Mithril currently has npm-specific `npm ci` guidance and lacks an install-script approval gate.

**Approved adaptation:** Update `skills/security-and-hardening/SKILL.md` with the workflow and keep detailed command matrices in `references/security-checklist.md`. State explicitly that package-manager behavior is version-sensitive and must be checked against the project's pinned client before use.

**Port note:** The source snapshot's npm 11.18 default-behavior wording conflicted with the current official npm documentation. Mithril follows the current documentation: dependency scripts are blocked by default, `strict-allow-scripts=true` makes unreviewed scripts fail the install, and `npm install-scripts` manages version-pinned approvals but is workspace-unaware.

Primary references used by the upstream update:

- [npm install-scripts](https://docs.npmjs.com/cli/v11/commands/npm-install-scripts/)
- [pnpm approve-builds](https://pnpm.io/cli/approve-builds)
- [pnpm build settings](https://pnpm.io/settings#allowbuilds)
- [Yarn security](https://yarnpkg.com/features/security)

### AS-2 — Greenfield and brownfield adoption guidance

**Upstream change:** A new adoption guide distinguishes full-lifecycle greenfield adoption from incremental, verification-first brownfield adoption.

**Approved adaptation:** Create a Mithril-owned `docs/adoption-guide.md` that uses:

- `using-mithril` as the sole router.
- Mithril's `/spec`, `/plan`, `/build`, `/review`, and `/ship` command surface.
- `to-spec`, `writing-plans`, `systematic-debugging`, characterization tests, and existing-code conventions.
- Mithril artifact locations rather than upstream `SPEC.md`, `tasks/plan.md`, or source-only commands.

### AS-3 — Developer onboarding guide

**Upstream change:** A new contributor guide explains the skill, persona, command, reference, and eval layers; local verification; contribution paths; and a reading order.

**Proposed adaptation:** Do not copy the full guide. Add a concise contributor-onboarding and reading-order section to `CONTRIBUTING.md`, linking the canonical material already in `AGENTS.md`, `docs/skill-anatomy.md`, `docs/testing.md`, and `docs/agents.md`. Create a separate document only if the existing contributor guide becomes unwieldy.

### AS-4 — README, Team, and comparison refresh

**Upstream change:** Existing README and comparison material was expanded, including source-repository team and positioning content.

**Proposed decision: Skip.** These changes describe `agent-skills` itself. Mithril already owns its product comparison and provenance documents, so copying their counts, names, or marketing framing would introduce drift.

## `obra/superpowers`

### SP-1 — Gemini CLI support restored on `dev`

**Upstream change:** `main` has not changed. A single `dev` commit restores Gemini-specific material by:

- Adding Gemini launch instructions to the existing visual-companion guidance.
- Adding Gemini to the subagent-capable platforms in the existing executing-plans skill.
- Adding runtime skill-directory links to the existing writing-skills guidance.
- Restoring a provider-specific Gemini tool reference.

**Proposed decision: Skip.** Mithril already has `GEMINI.md` and `docs/gemini-cli-setup.md`, while its active router deliberately avoids importing provider-specific upstream routers and reference maps. The source change is also not on `superpowers/main`.

## Approved Import Scope

The implemented scope contains:

1. MS-1: friendlier, evidence-led setup behavior.
2. MS-2: one-file-per-ticket local tracking.
3. AS-1: package-manager-aware supply-chain hardening.
4. AS-2: a Mithril-specific adoption guide.

MS-3, MS-4, AS-3, AS-4, and SP-1 remain pending decisions. Their proposed skip, defer, or adaptation outcomes are not yet approved. Generated files under `docs/mithril/` are outside this review and remain untouched unless separately approved.

## Decision Log

Record agreed changes here so recommendations and final scope cannot drift during implementation.

| Date | ID | Decision | Reason or adjustment |
| --- | --- | --- | --- |
| 2026-07-13 | MS-1 | Approved | Adapt the friendlier, evidence-led setup flow as proposed. |
| 2026-07-13 | MS-2 | Approved | Adopt one-file-per-ticket local tracking with Mithril naming and paths. |
| 2026-07-13 | AS-1 | Approved | Adapt the package-manager-aware supply-chain workflow and detailed checklist. |
| 2026-07-13 | AS-2 | Approved | Create the Mithril-specific greenfield and brownfield adoption guide. |
| 2026-07-13 | MS-1, MS-2, AS-1, AS-2 | Ported | Implemented on `feature/upstream-update-review-2026-07-13` with focused contract coverage. |
