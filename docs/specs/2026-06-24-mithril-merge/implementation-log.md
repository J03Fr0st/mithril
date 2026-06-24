# Implementation Log: Mithril Merge

## 2026-06-24 - Design Approved

- Approved design path: `docs/design/2026-06-24-mithril-merge/design.md`.
- Approval evidence: the user iteratively approved the deep-dive direction, confirmed the narrowed simplicity import set, approved using agent-skills docs/AGENTS/CLAUDE as baseline, and explicitly invoked `s-kit:plan-feature` for `D:/Source/_ai/mithril/docs/mithril-merge-deep-dive.md`.
- Optional `grill-me`: skipped.

## 2026-06-24 - Spec Created

- Source design: `docs/design/2026-06-24-mithril-merge/design.md`.
- Initial plan: 10 tasks across 7 dependency waves.

## 2026-06-24 - Baseline Verification

- `npm test`: failed before implementation because `package.json` has no `test` script.
- `npm run validate:skills`: failed before implementation because `package.json` has no `validate:skills` script.
- `npm run validate:commands`: failed before implementation because `package.json` has no `validate:commands` script.
- Design/spec preflight paths exist: `docs/design/2026-06-24-mithril-merge/design.md`, `docs/specs/2026-06-24-mithril-merge/README.md`, and `docs/specs/2026-06-24-mithril-merge/tasks/`.
- Proceeding with Wave 1 because task 02 explicitly creates the missing validation scripts and package commands.

## 2026-06-24 - Wave 1 Started

- Tasks: `task-01-stabilize-shell-assets-attribution`, `task-02-add-validation-harness`.
- Starting statuses: both `pending`; updated to `in-progress` before dispatch.
- Planned verification:
  - task 01: `Test-Path assets/mithril-small.svg; Test-Path assets/app-icon.png; Test-Path NOTICE.md`
  - task 01 final: `rg -n "assets/mithril-small.svg|assets/app-icon.png|NOTICE" .codex-plugin gemini-extension.json package.json README.md`
  - task 02: `npm run validate:skills`, `npm run validate:commands`, `npm test`

### Wave 1 Risk Preflight

- `task-01` owns package metadata assets and attribution files: `.codex-plugin/plugin.json`, `gemini-extension.json`, `assets/*`, and `NOTICE.md`.
- `task-02` owns validation scripts and `package.json`; it must not edit plugin manifests or asset files.
- Security-sensitive: yes for `task-02`, because validators inspect filesystem paths and package scripts execute local commands.
- Shared contract: `npm test` should become the common project verification command after task 02.
- Integration risk: task 01 final verification references `package.json`, but task 01 must not edit it because task 02 owns package script changes in this wave.

## 2026-06-24 - Wave 1 Coder Results

- `task-01-stabilize-shell-assets-attribution`: recommended `complete`.
  - Created `assets/mithril-small.svg`, `assets/app-icon.png`, and `NOTICE.md`.
  - Modified `gemini-extension.json` and `README.md`.
  - Verification passed:
    - `Test-Path assets/mithril-small.svg; Test-Path assets/app-icon.png; Test-Path NOTICE.md` returned all `True`.
    - `rg -n "assets/mithril-small.svg|assets/app-icon.png|NOTICE" .codex-plugin gemini-extension.json package.json README.md` found asset refs in `.codex-plugin/plugin.json` and the notice reference in `README.md`.
  - Concern: `README.md` was outside the task manifest but supports attribution intent and final verification.
- `task-02-add-validation-harness`: recommended `complete`.
  - Created `scripts/validate-skills.js`, `scripts/validate-commands.js`, and `tests/README.md`.
  - Modified `package.json`.
  - Verification passed:
    - `npm run validate:skills`: 1 skill checked, 0 errors, 0 warnings.
    - `npm run validate:commands`: clean skip because `commands/` does not exist yet.
    - `npm test`: passed validation and shell lint; shell lint reported no shell files found.
  - Concern: `validate:commands` intentionally skips until commands are added.

## 2026-06-24 - Wave 1 Simplification

- Status: `simplified`.
- Modified `scripts/validate-skills.js`.
- Simplifications:
  - Flattened `REQUIRED_SECTIONS` to plain heading strings.
  - Reused one `hasSectionExemption` check.
- Verification passed:
  - `Test-Path assets/mithril-small.svg; Test-Path assets/app-icon.png; Test-Path NOTICE.md`
  - `rg -n "assets/mithril-small.svg|assets/app-icon.png|NOTICE" .codex-plugin gemini-extension.json package.json README.md`
  - `npm run validate:skills`
  - `npm run validate:commands`
  - `npm test`
- Concern: `README.md` notice attribution line was kept because it supports attribution and the task final verification explicitly checks README for `NOTICE`.

## 2026-06-24 - Wave 1 Reviews

- Spec compliance review: PASS.
  - Reviewed exact Wave 1 file set with requirements, design, and action-required context.
  - Verification passed: asset path checks, asset/NOTICE search, `npm run validate:skills`, `npm run validate:commands`, and `npm test`.
  - Note: `README.md` is outside task-01 manifest ownership, but the notice link was accepted as justified by attribution/final verification.
- Security review: PASS.
  - Reviewed `scripts/validate-skills.js`, `scripts/validate-commands.js`, `package.json`, and `tests/README.md`.
  - No unsafe shell construction found; validators are read-only and bounded to repo-relative `skills/` and `commands/`.
  - Verification passed: `npm run validate:skills`, `npm run validate:commands`, and `npm test`.
- Code quality review: FAIL.
  - `task-01`: `NOTICE.md` lists upstream projects and URLs but does not preserve upstream MIT copyright/permission notice coverage.
  - `task-02`: `scripts/validate-skills.js` treats section layout as exact required strings, while approved `skill-anatomy.md` allows equivalent headings.
  - Statuses updated to `review-failed` for both Wave 1 tasks before targeted fixes.

## 2026-06-24 - Wave 1 Fix Cycle 1

- `task-01` attribution fix:
  - Modified `NOTICE.md` only.
  - Added upstream MIT copyright notices for Superpowers, agent-skills, Matt Pocock skills, and the simplicity source provenance.
  - Added MIT permission/warranty text once in `NOTICE.md`.
  - Verification passed:
    - `Test-Path assets/mithril-small.svg; Test-Path assets/app-icon.png; Test-Path NOTICE.md`
    - `rg -n "Superpowers|agent-skills|Matt Pocock|Simplicity source|MIT License|Copyright" NOTICE.md`
    - `rg -n "assets/mithril-small.svg|assets/app-icon.png|NOTICE" .codex-plugin gemini-extension.json package.json README.md`
- `task-02` validator alias fix:
  - Modified `scripts/validate-skills.js` only.
  - Added bounded section-heading aliases, parsed `##` headings, ignored headings inside fenced code blocks, and preserved the `using-mithril` section exemption.
  - Temporary validation checks passed for alias headings and failed as expected for a missing verification section.
  - Verification passed: `npm run validate:skills` and `npm test`.

## 2026-06-24 - Wave 1 Simplification Rerun

- Status: `simplified`.
- Modified `scripts/validate-skills.js` only.
- Simplification:
  - Collapsed duplicated section-exemption state into a single `exempt` value after frontmatter parsing.
  - Preserved early validation returns and output behavior.
- Verification passed:
  - `Test-Path assets/mithril-small.svg; Test-Path assets/app-icon.png; Test-Path NOTICE.md`
  - `rg -n "assets/mithril-small.svg|assets/app-icon.png|NOTICE" .codex-plugin gemini-extension.json package.json README.md`
  - `rg -n "Superpowers|agent-skills|Matt Pocock|Simplicity source|MIT License|Copyright" NOTICE.md`
  - `npm run validate:skills`
  - `npm run validate:commands`
  - `npm test`

## 2026-06-24 - Wave 1 Review Rerun and Completion

- Spec compliance review: PASS.
  - Reviewed Wave 1 implementation, spec files, task files, and implementation log.
  - Accepted the one-line `README.md` NOTICE attribution because it supports the task final verification and attribution intent.
  - Verification passed: asset path checks, asset/NOTICE search, attribution search, `npm run validate:skills`, `npm run validate:commands`, and `npm test`.
- Code quality review: PASS.
  - Reviewed Wave 1 implementation file set.
  - Verification passed: required assets exist, asset/NOTICE references are present, attribution strings are present, `npm run validate:skills`, `npm run validate:commands`, and `npm test`.
  - No blocking maintainability, integration, or ownership issues found.
- Security review: PASS.
  - Reviewed validators, package scripts, metadata, and attribution files.
  - Validators are read-only and bounded to repo-local `skills/` and `commands/`.
  - No unsafe shell string execution found; `lint:shell` uses `spawnSync` with an argv array.
- Final Wave 1 statuses: `task-01-stabilize-shell-assets-attribution` complete; `task-02-add-validation-harness` complete.

## 2026-06-24 - Wave 2 Started

- Tasks: `task-03-port-superpowers-core`.
- Starting status: `pending`; updated to `in-progress` before dispatch.
- Dependencies: `task-01-stabilize-shell-assets-attribution` and `task-02-add-validation-harness` are complete.
- Planned verification:
  - RED: `Test-Path skills/brainstorming/SKILL.md; Test-Path skills/verification-before-completion/SKILL.md`
  - GREEN: `npm run validate:skills`
  - Final: `rg -n "using-superpowers|superpowers:|docs/superpowers|\\.superpowers|SUPERPOWERS" skills`

### Wave 2 Risk Preflight

- `task-03` creates the Mithril execution-core skills from Superpowers source material and modifies the existing untracked `skills/using-mithril/SKILL.md`; the worker must extend that file rather than replace it.
- Security-sensitive: no direct shell execution is owned by this task, but copied skill text may reference shell commands, hooks, state directories, and subagent execution workflows that must be rebranded and scoped as documentation only.
- Shared contract: `using-mithril` remains the only active router; `using-superpowers` must not be imported or invoked.
- Integration risk: the current validator enforces frontmatter, `Use when` triggers, and required skill-anatomy-style section headings for every non-exempt skill, even though `docs/skill-anatomy.md` is created in a later wave.
- Stale-name risk: product-facing `using-superpowers`, `superpowers:`, `docs/superpowers`, `.superpowers`, and `SUPERPOWERS` references must be removed or explicitly documented as intentional provenance/history.

## 2026-06-24 - Wave 2 Coder Results

- `task-03-port-superpowers-core`: recommended `complete`.
  - Created:
    - `skills/brainstorming/SKILL.md`
    - `skills/writing-plans/SKILL.md`
    - `skills/using-git-worktrees/SKILL.md`
    - `skills/subagent-driven-development/SKILL.md`
    - `skills/executing-plans/SKILL.md`
    - `skills/dispatching-parallel-agents/SKILL.md`
    - `skills/requesting-code-review/SKILL.md`
    - `skills/receiving-code-review/SKILL.md`
    - `skills/verification-before-completion/SKILL.md`
    - `skills/finishing-a-development-branch/SKILL.md`
  - Modified `skills/using-mithril/SKILL.md` to add core workflow routing while preserving existing router content.
  - Verification passed:
    - RED before edits: `Test-Path skills/brainstorming/SKILL.md; Test-Path skills/verification-before-completion/SKILL.md` returned `False`, `False`.
    - GREEN after edits: `npm run validate:skills` passed with 11 skills checked, 0 errors, 0 warnings.
    - Final stale-name check: `rg -n "superpowers|SUPERPOWERS|docs/superpowers|\\.superpowers" skills` returned no matches.
    - Stricter stale-name check including `using-superpowers`, `superpowers:`, and `Superpowers` returned no matches.
    - Local project verification: `npm test` passed after Wave 2 changes.

## 2026-06-24 - Wave 2 Simplification

- Status: `no-op`.
- Modified files: none.
- Rationale: Wave 2 skill files are already concise and validator-friendly; repeated sections carry required skill-anatomy structure, workflow gates, and routing clarity.
- Verification passed:
  - `npm run validate:skills`
  - `rg -n "using-superpowers|superpowers:|docs/superpowers|\\.superpowers|SUPERPOWERS|Superpowers" skills` returned no matches.
  - `npm test`

## 2026-06-24 - Wave 2 Reviews

- Spec compliance review: PASS.
  - Reviewed Wave 2 skill file set, task file, manifest, README, and implementation log.
  - Verification passed: `npm run validate:skills`, stale Superpowers-name search, and `npm test`.
  - Confirmed `skills/using-superpowers` is absent and `using-mithril` routes directly to Mithril-owned core skills.
- Code quality review: FAIL.
  - `task-03`: `skills/using-mithril/SKILL.md` still references unavailable skills in inherited examples: `systematic-debugging`, `frontend-design`, and `mcp-builder`.
  - Risk: the active router can route users to skills that do not exist in the current Mithril core set.
  - Status updated to `review-failed` for targeted fix.

## 2026-06-24 - Wave 2 Fix Cycle 1

- `task-03` router fix:
  - Modified `skills/using-mithril/SKILL.md` only.
  - Rewrote `Skill Priority` and `Skill Types` examples so they reference only existing Wave 2 Mithril skills.
  - Removed unavailable references to `systematic-debugging`, `frontend-design`, `mcp-builder`, and non-Wave-2 `TDD`.
  - Verification passed:
    - `npm run validate:skills`
    - `rg -n "systematic-debugging|frontend-design|mcp-builder" skills/using-mithril/SKILL.md` returned no matches.
    - `rg -n "using-superpowers|superpowers:|docs/superpowers|\\.superpowers|SUPERPOWERS|Superpowers" skills` returned no matches.
    - `npm test`
- Fix simplification:
  - Status: `simplified`.
  - Modified `skills/using-mithril/SKILL.md` only.
  - Replaced a generic `TDD` conflict example with skill-agnostic workflow-conflict wording.
  - Verification passed:
    - `npm run validate:skills`
    - `rg -n "systematic-debugging|frontend-design|mcp-builder|TDD" skills/using-mithril/SKILL.md` returned no matches.
    - `rg -n "using-superpowers|superpowers:|docs/superpowers|\\.superpowers|SUPERPOWERS|Superpowers" skills` returned no matches.
    - `npm test`

## 2026-06-24 - Wave 2 Review Rerun and Completion

- Spec compliance review: PASS.
  - Reviewed Wave 2 skill files, spec files, task file, and implementation log.
  - Verification passed: `npm run validate:skills`, unavailable-skill router search, stale Superpowers-name search, and `npm test`.
  - Confirmed `skills/using-superpowers` is absent and `using-mithril` routes only to existing Wave 2 skills or skill-agnostic wording.
- Code quality review: PASS.
  - Reviewed Wave 2 skill file set after the router fix and simplification.
  - Verification passed: `npm run validate:skills`, unavailable-skill router search, stale Superpowers-name search, and `npm test`.
  - Previous unavailable-skill routing issue is resolved.
- Final Wave 2 status: `task-03-port-superpowers-core` complete.

## 2026-06-24 - Wave 3 Started

- Tasks: `task-04-merge-canonical-disciplines`.
- Starting status: `pending`; updated to `in-progress` before dispatch.
- Dependencies: `task-02-add-validation-harness` and `task-03-port-superpowers-core` are complete.
- Planned verification:
  - RED: `Test-Path skills/test-driven-development/SKILL.md; Test-Path docs/skill-anatomy.md`
  - GREEN: `npm run validate:skills`
  - Final: `rg -n "test-driven-development|systematic-debugging|code-review-and-quality|skill-design|implementation-standards" skills/using-mithril/SKILL.md skills`

### Wave 3 Risk Preflight

- `task-04` creates canonical discipline skills that downstream waves must reference instead of importing duplicate upstream workflows.
- Security-sensitive: no executable code is owned by this task, but the skill text governs future code, tests, reviews, and trust-boundary handling; unsafe guidance can become process risk.
- Shared contract: `using-mithril` remains the only active router and should route canonical discipline skills without reintroducing unavailable future specialists.
- Integration risk: the validator requires frontmatter, `Use when` triggers, and required section headings; `docs/skill-anatomy.md` should align with the validator's accepted section aliases.
- Duplication risk: do not ship separate duplicate TDD, debugging, review, or skill-design loops; each canonical skill should synthesize the strongest source material into one Mithril-owned workflow.
- Code-shape risk: `implementation-standards` must answer how code should look using tool-enforced style, local consistency, public-interface tests, deep modules, domain vocabulary, simplicity, and verification evidence.

## 2026-06-24 - Wave 3 Coder Results

- `task-04-merge-canonical-disciplines`: recommended `complete`.
  - Created:
    - `skills/test-driven-development/SKILL.md`
    - `skills/systematic-debugging/SKILL.md`
    - `skills/code-review-and-quality/SKILL.md`
    - `skills/skill-design/SKILL.md`
    - `skills/implementation-standards/SKILL.md`
    - `docs/skill-anatomy.md`
  - Modified `skills/using-mithril/SKILL.md` to route canonical discipline skills.
  - Verification passed:
    - RED before edits: `Test-Path skills/test-driven-development/SKILL.md; Test-Path docs/skill-anatomy.md` returned `False`, `False`.
    - GREEN after edits: `npm run validate:skills` passed with 16 skills checked, 0 errors, 0 warnings.
    - Final canonical-name search: `rg -n "test-driven-development|systematic-debugging|code-review-and-quality|skill-design|implementation-standards" skills/using-mithril/SKILL.md skills` found canonical names in the router and skill files.
    - Duplicate upstream workflow-name search returned no matches.
    - Local project verification: `npm test` passed after Wave 3 changes.

## 2026-06-24 - Wave 3 Simplification

- Status: `no-op`.
- Modified files: none.
- Rationale: Wave 3 skill content is already clear, scoped, and non-duplicative enough for this pass.
- Verification passed:
  - `npm run validate:skills`
  - `npm test`
  - `rg -n "test-driven-development|systematic-debugging|code-review-and-quality|skill-design|implementation-standards" skills/using-mithril/SKILL.md skills`
  - `rg -n "debugging-and-error-recovery|diagnosing-bugs|writing-great-skills|writing-skills|ask-matt|using-agent-skills|using-superpowers|frontend-design|mcp-builder" skills/using-mithril/SKILL.md skills docs/skill-anatomy.md` returned no matches.

## 2026-06-24 - Wave 3 Reviews and Completion

- Spec compliance review: PASS.
  - Reviewed canonical discipline skills, `docs/skill-anatomy.md`, router updates, and spec files.
  - Verification passed: `npm run validate:skills`, `npm test`, canonical-name search, and duplicate-upstream-name search.
  - Confirmed the five canonical skills include required synthesized concepts and that `docs/skill-anatomy.md` matches validator aliases.
- Code quality review: PASS.
  - Reviewed Wave 3 skill file set and router updates.
  - Verification passed: `npm run validate:skills`, `npm test`, canonical-name search, duplicate-upstream-name search, and validator-alias sanity check.
  - Confirmed `implementation-standards` answers code shape through local style, tool-enforced checks, public seams, deep modules, domain vocabulary, simplicity, and evidence requirements.
- Final Wave 3 status: `task-04-merge-canonical-disciplines` complete.

## 2026-06-24 - Wave 4 Started

- Tasks: `task-05-add-agent-specialists-references`, `task-07-add-matt-alignment-domain`, `task-08-add-simplicity-layer`.
- Starting statuses: all `pending`; updated to `in-progress` before dispatch.
- Dependencies: `task-02-add-validation-harness` and `task-04-merge-canonical-disciplines` are complete.
- Same-wave file overlap: none.
- Planned verification:
  - task 05: `npm run validate:skills`; `rg -n "using-agent-skills|agent-skills" skills references`
  - task 07: `npm run validate:skills`; `rg -n "ask-matt|setup-matt-pocock-skills|deprecated|in-progress|personal" skills`
  - task 08: `npm run validate:skills`; `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail|PONYTAIL" skills`

### Wave 4 Risk Preflight

- `task-05` creates selected agent-skills specialists and `references/` checklists; it must not route them yet or add commands/personas.
- `task-07` creates selected Matt-derived alignment/domain/project-flow skills; it must exclude `ask-matt`, deprecated, in-progress, and personal surfaces, and rename setup flow to `setup-mithril-project`.
- `task-08` creates the Mithril Simplicity Layer and modifies only canonical TDD, review, and implementation-standards skills to integrate simplicity principles.
- Security-sensitive: yes. This wave adds guidance for security, browser testing, CI/CD, issue workflows, audits, and code deletion. Skill text must preserve trust-boundary validation, authorization, accessibility, data-loss prevention, and evidence gates.
- Shared contract: all imported skills must follow `docs/skill-anatomy.md`, validate with `npm run validate:skills`, and reference canonical Mithril disciplines instead of duplicating core loops.
- Naming risk: product-facing text must avoid `using-agent-skills`, `ask-matt`, `setup-matt-pocock-skills`, upstream simplicity branding, and excluded debt/gain/help surfaces.
- Integration risk: Wave 4 tasks intentionally do not modify `skills/using-mithril/SKILL.md`; routing waits for task 09 after all imported skills exist.

## 2026-06-24 - Wave 4 Coder Results

- `task-05-add-agent-specialists-references`: recommended `complete`.
  - Created 14 selected specialist skills and 6 `references/` checklists.
  - Modified no existing files.
  - Verification passed after all Wave 4 task-owned files existed:
    - RED before edits: `Test-Path skills/security-and-hardening/SKILL.md; Test-Path references/security-checklist.md` returned `False`, `False`.
    - `npm run validate:skills` passed with 46 skills checked, 0 errors, 0 warnings.
    - `rg -n "using-agent-skills|agent-skills" skills references` returned no matches.
    - `npm test` passed.
- `task-07-add-matt-alignment-domain`: recommended `done-with-concerns` before combined verification, then ready after narrow grep fix.
  - Created 13 selected alignment, domain, project-flow, handoff, and setup skills.
  - Modified no existing files.
  - Initial task-owned validation passed, but repo-level verification was affected by parallel in-progress Wave 4 files and by broad grep false positives in existing prose.
  - Concern: `skills/triage/SKILL.md` exists but may be ignored by `.gitignore` pattern `triage/`; staging will need an explicit decision later.
- `task-08-add-simplicity-layer`: recommended ready for review after combined Wave verification.
  - Created `skills/simplicity/SKILL.md`, `skills/simplicity-review/SKILL.md`, and `skills/simplicity-audit/SKILL.md`.
  - Modified `skills/test-driven-development/SKILL.md`, `skills/code-review-and-quality/SKILL.md`, and `skills/implementation-standards/SKILL.md`.
  - Initial `npm run validate:skills` failed only because other Wave 4 directories were still missing `SKILL.md` during parallel execution.
  - Combined Wave 4 verification later passed.

## 2026-06-24 - Wave 4 Fix Cycle 1

- Broad excluded-name grep fix:
  - Modified:
    - `skills/browser-testing-with-devtools/SKILL.md`
    - `skills/source-driven-development/SKILL.md`
    - `skills/implementation-standards/SKILL.md`
  - Reworded ordinary prose that matched task-07's broad excluded-name grep:
    - `deprecated APIs` -> `obsolete APIs`
    - `personal logged-in browser profile` -> `private logged-in browser profile`
    - `legacy, deprecated` -> `legacy, obsolete`
    - `personal preference` -> `individual preference`
  - Verification passed:
    - `npm run validate:skills`
    - `rg -n "ask-matt|setup-matt-pocock-skills|deprecated|in-progress|personal" skills` returned no matches.
    - `rg -n "using-agent-skills|agent-skills" skills references` returned no matches.
    - `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail|PONYTAIL" skills` returned no matches.
    - `npm test`

## 2026-06-24 - Wave 4 Simplification

- Status: `simplified`.
- Modified:
  - `skills/test-driven-development/SKILL.md`
  - `skills/implementation-standards/SKILL.md`
- Simplification:
  - Removed duplicated Simplicity Ladder rung prose from TDD and implementation standards.
  - Replaced duplicated ladder text with references to the canonical `simplicity` skill.
  - Preserved explicit safety boundaries.
- Verification passed:
  - `npm run validate:skills`
  - `rg -n "using-agent-skills|agent-skills" skills references` returned no matches.
  - `rg -n "ask-matt|setup-matt-pocock-skills|deprecated|in-progress|personal" skills` returned no matches.
  - `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail|PONYTAIL" skills` returned no matches.
  - `npm test`

## 2026-06-24 - Wave 4 Reviews

- Spec compliance review: PASS.
  - Reviewed Wave 4 specialist, alignment/domain, simplicity, reference, and spec files.
  - Verification passed: `npm run validate:skills`, all three stale/excluded-name searches, and `npm test`.
  - Confirmed task 05, task 07, and task 08 scopes were implemented and `skills/using-mithril/SKILL.md` was not routed to Wave 4 skills.
- Code quality review: FAIL.
  - `task-07`: `skills/triage/SKILL.md` is required by task 07 but ignored by `.gitignore` pattern `triage/`, so it is omitted from packaging.
  - Suggested fix: change the ignore rule so `skills/triage/SKILL.md` is not ignored and verify with `git check-ignore` and `npm pack --dry-run --json`.
- Security/process-risk review: CHANGES REQUESTED.
  - `task-07`: `skills/to-prd/SKILL.md` instructs agents to publish a PRD to an issue tracker without requiring explicit user approval of target/body and redaction of sensitive data before external mutation.
  - Suggested fix: add an approval/redaction gate before publication.
- Status updated to `review-failed` for `task-07` before targeted fixes.

## 2026-06-24 - Wave 4 Fix Cycle 2

- `task-07` publication safety and packaging fixes:
  - Modified:
    - `skills/to-prd/SKILL.md`
    - `.gitignore`
  - Added a PRD publication safety gate requiring:
    - presenting the PRD draft,
    - identifying issue-tracker target/repo/project and labels/state,
    - redacting secrets, credentials, customer data, and sensitive conversation details,
    - explicit user approval before external tracker mutation or triage state changes.
  - Changed `.gitignore` from `triage/` to `/triage/` so only root triage output remains ignored and `skills/triage/SKILL.md` is package-visible.
  - Verification passed:
    - `npm run validate:skills`
    - `rg -n "approval|approve|redact|secrets|credentials|customer data|sensitive" skills/to-prd/SKILL.md`
    - `git check-ignore -v skills/triage/SKILL.md` returned no output and exit code 1.
    - `npm pack --dry-run --json` includes `skills/triage/SKILL.md`.
    - All three stale/excluded-name searches returned no matches.
    - `npm test`
  - Note: `npm pack --dry-run --json` warns that no `.npmignore` exists and `.gitignore` is used for package exclusion; this predates the fix.
- Fix simplification:
  - Status: `simplified`.
  - Modified `skills/to-prd/SKILL.md` only.
  - Tightened the publication safety wording while preserving draft presentation, tracker target/repo/project plus labels/state identification, redaction, and explicit approval before external tracker mutation or triage state changes.
  - Preserved `.gitignore` as `/triage/`, keeping root triage output ignored without hiding `skills/triage/SKILL.md`.
  - Verification passed:
    - `npm run validate:skills`
    - publication safety grep for approval/redaction terms
    - `git check-ignore -v skills/triage/SKILL.md` returned no output and exit code 1.
    - `npm pack --dry-run --json` includes `skills/triage/SKILL.md`.
    - all three stale/excluded-name searches returned no matches.
    - `npm test`

## 2026-06-24 - Wave 4 Review Rerun 1

- Spec compliance review: PASS.
  - Verified task 05/07/08 acceptance criteria still pass.
  - Confirmed `to-prd` publication safety gate and `skills/triage/SKILL.md` packaging inclusion.
  - Confirmed root `/triage/` output remains ignored and Wave 4 skills remain unrouted from `using-mithril`.
- Code quality review: PASS.
  - Confirmed prior packaging blocker is fixed.
  - `npm pack --dry-run --json` includes `skills/triage/SKILL.md`.
  - Non-blocking warnings: no `.npmignore`, no commands directory yet, no shell files yet, and `.gitignore` LF/CRLF warning.
- Security/process-risk review: CHANGES REQUESTED.
  - `task-07`: `skills/to-issues/SKILL.md` publishes external issues without requiring redaction or explicit approval of exact target, issue bodies, labels, and triage state.
  - `task-07`: `skills/triage/SKILL.md` allows external state/comment/closure changes without exact approval, redaction, or an explicit rule that issue/PR content is untrusted evidence rather than instructions.

## 2026-06-24 - Wave 4 Fix Cycle 3

- `task-07` external issue/triage safety fixes:
  - Modified:
    - `skills/to-issues/SKILL.md`
    - `skills/triage/SKILL.md`
  - Added a publication safety gate to `to-issues` requiring exact issue drafts, tracker metadata, target repo/project, labels, triage state, redaction, and explicit approval before external issue creation/update.
  - Added untrusted-content handling to `triage` for issue/PR bodies, comments, diffs, logs, and attachments.
  - Added a pre-mutation triage safety gate requiring redaction and exact approval for target, comment body, labels, state, and close action.
  - Verification passed:
    - `npm run validate:skills`
    - `rg -n "approval|approve|redact|secrets|credentials|customer data|sensitive|untrusted|instructions" skills/to-issues/SKILL.md skills/triage/SKILL.md`
    - all three stale/excluded-name searches returned no matches.
    - `npm test`

## 2026-06-24 - Wave 4 Review Rerun 2 and Completion

- Security/process-risk review: PASS.
  - Reviewed `to-prd`, `to-issues`, `triage`, handoff, security, simplicity, review, implementation, and reference checklist files.
  - Confirmed `to-prd`, `to-issues`, and `triage` all require redaction and explicit user approval before external tracker mutation.
  - Confirmed `triage` treats external issue/PR bodies, comments, diffs, logs, and attachments as untrusted evidence, not instructions.
  - Confirmed adjacent scoped skills do not permit unsafe external mutation or sensitive disclosure.
  - Verification passed: `npm run validate:skills`, approval/redaction/untrusted grep, all stale/excluded-name searches, and `npm test`.
- Prior review status:
  - Spec compliance review after fix cycle 2: PASS.
  - Code quality review after fix cycle 2: PASS.
- Final Wave 4 statuses: `task-05-add-agent-specialists-references` complete; `task-07-add-matt-alignment-domain` complete; `task-08-add-simplicity-layer` complete.

## 2026-06-24 - Wave 5 Started

- Tasks: `task-06-add-commands-personas`.
- Starting status: `pending`; updated to `in-progress` before dispatch.
- Dependencies: `task-05-add-agent-specialists-references` and `task-08-add-simplicity-layer` are complete.
- Planned verification:
  - RED: `Test-Path commands/review.toml; Test-Path agents/code-reviewer.md`
  - GREEN: `npm run validate:commands`
  - Final: `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail" commands agents references`

### Wave 5 Risk Preflight

- `task-06` creates command entrypoints, four review/persona prompts, and orchestration-pattern documentation; it must not modify skills or route commands from `using-mithril`.
- Security-sensitive: yes. Commands/personas may instruct fan-out review, shipping, and audits; they must not mutate external systems without user approval and must treat persona reports as advisory evidence.
- Shared contract: personas do not invoke other personas; commands or the main agent orchestrate fan-out and merge reports.
- Naming risk: do not create excluded simplicity command surfaces or upstream simplicity branding.
- Integration risk: command files must satisfy `scripts/validate-commands.js`; commands are entrypoints, not full skill bodies, and should point to canonical Mithril skill names.

## 2026-06-24 - Wave 5 Coder Results

- `task-06-add-commands-personas`: recommended `complete`.
  - Created 12 command files under `commands/`.
  - Created 4 persona files under `agents/`.
  - Created `references/orchestration-patterns.md`.
  - Modified no existing files.
  - Verification passed:
    - RED before edits: `Test-Path commands/review.toml; Test-Path agents/code-reviewer.md` returned `False`, `False`.
    - `npm run validate:commands` passed with 12 commands checked, 0 errors.
    - `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail" commands agents references` returned no matches.
    - `npm test` passed.
  - Local inspection confirmed `/ship` is the fan-out command with a main-agent merge step and personas are advisory leaf reviewers that do not invoke other personas or mutate files/external systems.

## 2026-06-24 - Wave 5 Simplification

- Status: `no-op`.
- Modified files: none.
- Rationale: command/persona/reference files are concise and match the preserved contracts.
- Verification passed:
  - `npm run validate:commands`
  - `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail" commands agents references` returned no matches.
  - `npm test`

## 2026-06-24 - Wave 5 Reviews

- Spec compliance review: PASS.
  - Reviewed command, persona, orchestration reference, and spec files.
  - Confirmed all 12 commands, 4 personas, and `references/orchestration-patterns.md` exist.
  - Confirmed `/ship` is the only fan-out pattern with a main-agent merge step and personas are leaf reviewers.
  - Verification passed: `npm run validate:commands`, excluded-name search, and `npm test`.
- Code quality review: PASS.
  - Confirmed commands are concise wrappers over valid Mithril skills/personas and no Wave 6 routing leaked in.
  - Verification passed: `npm run validate:commands`, excluded-name search, and `npm test`.
- Security/process-risk review: CHANGES REQUESTED.
  - `task-06`: `agents/web-performance-auditor.md` says the persona must not edit/stage/commit/push/deploy/run external audits without approval, which can be read as allowing the persona to edit or deploy with consent.
  - Required fix: make file/external mutation prohibitions absolute for the persona, and keep only live external scans as explicit-approval-gated.
- Status updated to `review-failed` for `task-06` before targeted fix.

## 2026-06-24 - Wave 5 Fix Cycle 1

- `task-06` web performance persona safety wording:
  - Modified `agents/web-performance-auditor.md` only.
  - Split hard persona prohibitions from live external scan approval:
    - personas must not edit files, stage, commit, push, deploy, or mutate external systems.
    - live external audits/contacting external services require explicit user approval immediately before the action.
  - Verification passed:
    - `npm run validate:commands`
    - wording grep confirmed hard mutation prohibition and live-scan approval gate.
    - `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail" commands agents references` returned no matches.
    - `npm test`

## 2026-06-24 - Wave 5 Review Rerun and Completion

- Security/process-risk review after fix cycle 1: PASS.
  - Reviewed `agents/web-performance-auditor.md`, `commands/webperf.toml`, `commands/ship.toml`, `references/orchestration-patterns.md`, and the other persona files for consistency.
  - Confirmed the prior persona mutation ambiguity is fixed: the web performance persona cannot edit files, stage, commit, push, deploy, or mutate external systems.
  - Confirmed live external performance scans remain explicit-approval-gated immediately before action.
  - Confirmed personas remain advisory leaf reviewers and `/ship` plus `references/orchestration-patterns.md` preserve main-agent merge ownership and external mutation approval boundaries.
  - Verification passed:
    - `npm run validate:commands`
    - `rg -n "Do not edit files|external audits|explicit user approval|without orchestrator-approved user consent" agents/web-performance-auditor.md`
    - `rg -n "simplicity-debt|simplicity-gain|simplicity-help|ponytail" commands agents references` returned no matches.
    - `npm test`
- Prior review status:
  - Spec compliance review: PASS.
  - Code quality review: PASS.
  - Simplification: no-op with verification.
- Final Wave 5 status: `task-06-add-commands-personas` complete.

## 2026-06-24 - Wave 6 Started

- Tasks: `task-09-rewrite-docs-router-integration`.
- Starting status: `pending`; updated to `in-progress` before dispatch.
- Dependencies: tasks 01, 03, 04, 05, 06, 07, and 08 are complete.
- Planned verification:
  - RED: `Test-Path docs/getting-started.md; Test-Path docs/agents.md; Test-Path docs/comparison.md`
  - GREEN: `npm run validate:skills && npm run validate:commands`
  - Final: `rg -n "using-superpowers|using-agent-skills|ask-matt|simplicity-debt|simplicity-gain|simplicity-help|ponytail" README.md AGENTS.md CLAUDE.md GEMINI.md docs skills/using-mithril/SKILL.md`

### Wave 6 Risk Preflight

- `task-09` creates public docs and setup guides, rewrites instruction files, and updates `skills/using-mithril/SKILL.md`; it must not change commands, personas, validators, or imported skill bodies.
- Process-safety-sensitive: yes. Agent-facing routing and setup docs can affect skill invocation, external mutation approval boundaries, and how untrusted source material is handled.
- Shared contract: `using-mithril` remains the only active router; upstream routers and excluded simplicity surfaces must not be routed or promoted in public docs.
- Layering contract: Skill = the how, persona = the who, command = the when; users or commands orchestrate composition, and personas do not invoke other personas.
- Naming risk: broad stale-name searches may match planning/design provenance under `docs/design` and `docs/specs`; product-facing docs and router files must avoid the excluded names.
- Integration risk: `GEMINI.md` should keep valid Gemini include syntax, `AGENTS.md` should stay generic for coding agents, and `CLAUDE.md` should be Claude-specific rather than a packaging-only note.

## 2026-06-24 - Wave 6 Coder Results

- `task-09-rewrite-docs-router-integration`: recommended `complete`.
  - Created `docs/getting-started.md`, `docs/agents.md`, `docs/comparison.md`, `docs/testing.md`, `docs/claude-code-setup.md`, `docs/codex-setup.md`, `docs/copilot-setup.md`, `docs/cursor-setup.md`, `docs/gemini-cli-setup.md`, `docs/opencode-setup.md`, `docs/windsurf-setup.md`, and `CONTRIBUTING.md`.
  - Modified `README.md`, `AGENTS.md`, `CLAUDE.md`, `GEMINI.md`, and `skills/using-mithril/SKILL.md`.
  - Rewrote public docs around Mithril's actual lifecycle skills, 12 commands, 4 advisory personas, setup guides, and safety boundaries.
  - Updated `using-mithril` as the sole router with lifecycle routing for define/spec, plan, build, verify/debug, review, and ship.
  - Verification passed:
    - RED before edits: required docs returned `False`, `False`, `False`.
    - `npm run validate:skills`
    - `npm run validate:commands`
    - Product-facing stale-name scan over README, instruction files, new docs, `CONTRIBUTING.md`, and `skills/using-mithril/SKILL.md` returned no matches.
    - `npm test`
    - `git diff --check` on task-owned files.

## 2026-06-24 - Wave 6 Simplification

- Status: `simplified`.
- Modified files:
  - `README.md`
  - `docs/claude-code-setup.md`
- Simplifications:
  - Clarified the README approval boundary as creating or editing remote issues or pull requests, so it is clearly about external mutation.
  - Removed read-only ambiguity from the Claude persona section and clarified implementation should route through normal Mithril workflows, not persona context.
- Verification passed:
  - `npm run validate:skills`
  - `npm run validate:commands`
  - Product-facing stale-name scan returned no matches.
  - `npm test`
  - `git diff --check -- README.md docs\claude-code-setup.md`

## 2026-06-24 - Wave 6 Reviews

- Spec compliance review: FAIL.
  - Blocking issue: `skills/using-mithril/SKILL.md` did not route the full selected skill set. Missing direct routes were `skill-design`, `deprecation-and-migration`, `grilling`, `codebase-design`, `prototype`, `improve-codebase-architecture`, and `setup-mithril-project`.
  - Verification passed during review: `npm run validate:skills`, `npm run validate:commands`, product-facing stale-name scan, and scoped status inspection.
- Code quality review: PASS.
  - Confirmed scoped Markdown links resolve, Gemini include syntax is valid, `AGENTS.md` remains generic, `CLAUDE.md` remains Claude-specific, and excluded upstream routers/surfaces are not promoted.
  - Verification passed: `npm run validate:skills`, `npm run validate:commands`, product-facing stale-name scan, and `npm test`.
- Security/process-risk review: PASS.
  - Confirmed explicit external mutation approval, untrusted evidence handling, persona leaf behavior, and no-edit/mutation boundaries remain present.
  - Verification passed: `npm run validate:skills`, `npm run validate:commands`, safety-boundary grep, product-facing stale-name scan, and `npm test`.
- Status updated to `review-failed` for `task-09` before targeted fix.

## 2026-06-24 - Wave 6 Fix Cycle 1

- `task-09` router completeness fix:
  - Modified `skills/using-mithril/SKILL.md` only.
  - Added direct situational routing for `skill-design`, `deprecation-and-migration`, `grilling`, `codebase-design`, `prototype`, `improve-codebase-architecture`, and `setup-mithril-project`.
  - Verification passed:
    - `npm run validate:skills`
    - `npm run validate:commands`
    - targeted missing-route grep found all added routes.
    - product-facing stale-name scan returned no matches.
    - `npm test`

## 2026-06-24 - Wave 6 Review Rerun and Completion

- Simplification after fix cycle 1: no-op.
  - Inspected `skills/using-mithril/SKILL.md` only.
  - Verification passed: `npm run validate:skills`, selected-route grep, forbidden-token grep, and `npm test`.
- Spec compliance review after fix cycle 1: PASS.
  - Confirmed `skill-design`, `deprecation-and-migration`, `grilling`, `codebase-design`, `prototype`, `improve-codebase-architecture`, and `setup-mithril-project` are directly routed in `skills/using-mithril/SKILL.md`.
  - Verification passed: `npm run validate:skills`, selected-route grep, excluded-name grep, and `npm test`.
- Code quality/process-risk review after fix cycle 1: PASS.
  - Confirmed the added routes do not conflict with lifecycle routing, and the router still preserves single-router, external approval, untrusted evidence, and persona leaf-reviewer boundaries.
  - Verification passed: `npm run validate:skills`, selected-route grep, safety-boundary grep, forbidden-name grep, and `npm test`.
- Prior review status:
  - Code quality review before fix cycle 1: PASS.
  - Security/process-risk review before fix cycle 1: PASS.
- Final Wave 6 status: `task-09-rewrite-docs-router-integration` complete.

## 2026-06-24 - Wave 7 Started

- Tasks: `task-10-final-consistency-release`.
- Starting status: `pending`; updated to `in-progress` before dispatch.
- Dependencies: `task-02-add-validation-harness` and `task-09-rewrite-docs-router-integration` are complete.
- Planned verification:
  - GREEN: `npm test`
  - Final: `npm pack --dry-run`
  - Stale-name audit: `rg -n "superpowers|agent-skills|setup-matt|docs/superpowers|\\.superpowers|SUPERPOWERS|ponytail|PONYTAIL" .`

### Wave 7 Risk Preflight

- `task-10` finalizes `package.json`, `RELEASE-NOTES.md`, `.codex-plugin/plugin.json`, and `gemini-extension.json`; it must not modify docs/router/skills/commands/personas except to report findings.
- Packaging-sensitive: yes. Package contents must be explicit enough to avoid shipping local tool state, dirty workspace metadata, or implementation-only specs by accident.
- Stale-name contract: broad search may include allowed provenance, attribution, copied license text, design/spec history, implementation logs, and source comments in validators; product behavior and manifest metadata must not promote upstream routers or excluded surfaces.
- Release-readiness contract: `npm test` and `npm pack --dry-run` must pass, `RELEASE-NOTES.md` must describe the merge and known limitations, and manifests should describe the merged Mithril skill set accurately.

## 2026-06-24 - Wave 7 Coder Results

- `task-10-final-consistency-release`: recommended `complete`.
  - Modified `package.json` with release metadata, keywords, and an explicit `files` allowlist.
  - Modified `.codex-plugin/plugin.json` and `gemini-extension.json` descriptions to reflect the merged Mithril lifecycle.
  - Filled `RELEASE-NOTES.md` for the first merged Mithril release.
  - Package dry-run now succeeds without `.gitignore` fallback and parsed package contents exclude `.serena/`, `docs/specs/`, and `docs/design/`.
  - Broad stale-name scan produced only expected matches in attribution/provenance, validator source comments, source comparison, design/spec history, and implementation logs.
  - Verification passed:
    - `npm run validate:skills`
    - `npm run validate:commands`
    - `npm run lint:shell`
    - `npm test`
    - `npm pack --dry-run --json`
    - stale-name audit and package-content check.

## 2026-06-24 - Wave 7 Simplification

- Status: `no-op`.
- Modified files: none.
- Rationale: `package.json`, `.codex-plugin/plugin.json`, `gemini-extension.json`, and `RELEASE-NOTES.md` were already concise and aligned on planning, TDD, debugging, review, simplicity, and launch readiness without overclaiming publish status.
- Verification passed:
  - `npm test`
  - `npm pack --dry-run --json`
  - excluded-name scan over the four release metadata files returned no matches.
  - package-content check confirmed `.serena/`, `docs/specs/`, and `docs/design/` are absent from the tarball.

## 2026-06-24 - Wave 7 Reviews

- Spec compliance review: FAIL.
  - Blocking issue: `git status --short` still showed untracked `.serena/` local tool state. It also showed `docs/design/` and `docs/specs/`, which are intentional implementation artifacts excluded from package dry-run but still delivery-state concerns to report.
  - Verification passed during review: `npm test`, `npm pack --dry-run --json`, scoped stale-name search, package-content check, and release-note presence.
- Code quality review: FAIL.
  - Blocking issue: `package.json` used the public npm package name `mithril` without being marked private. The npm name is already owned by the MithrilJS package, so accidental public npm publish would fail or be misleading.
  - Verification passed during review: `npm test`, `npm pack --dry-run --json`, scoped excluded-name search, and package-content check.
- Packaging/process-risk review: PASS.
  - Confirmed the tarball covers intended public/distribution surfaces and excludes local or implementation-only surfaces including `.serena/`, `.codex/`, `.agents/`, `.git/`, `docs/specs/`, and `docs/design/`.
  - Confirmed stale-name matches are limited to attribution/provenance, source comments, source comparison, and excluded planning/spec history.
- Status updated to `review-failed` for `task-10` before targeted fix.

## 2026-06-24 - Wave 7 Fix Cycle 1

- Release metadata and local-state cleanup:
  - Modified `package.json` to add `"private": true`, preventing accidental public npm publishing under a name already used by another package.
  - Modified `RELEASE-NOTES.md` to state distribution is through supported plugin and git-backed install paths rather than public npm publish.
  - Removed untracked `.serena/` local tool state from the working tree after verifying the resolved path.
  - Verification passed:
    - `npm test`
    - `npm pack --dry-run --json`
    - scoped excluded-name search over release metadata files returned no matches.
    - package-content check confirmed `.serena/`, `docs/specs/`, and `docs/design/` are absent from the tarball and `package.json.private` is `true`.
    - `git status --short -- .serena ...` no longer reports `.serena/`; `docs/design/` and `docs/specs/` remain as intended implementation artifacts.

## 2026-06-24 - Wave 7 Fix Cycle 1 Simplification

- Status: `no-op`.
- Modified files: none.
- Rationale: `package.json` already preserves `"private": true`, metadata is valid, and `RELEASE-NOTES.md` already states that public npm publishing is not intended while plugin/git-backed distribution is.
- Verification passed:
  - `npm test`
  - `npm pack --dry-run --json`
  - forbidden-string scan over `package.json` and `RELEASE-NOTES.md` returned no matches.
  - JSON package-content check confirmed `privatePackage: true`, no forbidden tarball paths, and 118 checked entries.

## 2026-06-24 - Wave 7 Review Rerun and Completion

- Spec compliance review after fix cycle 1: PASS.
  - Confirmed `.serena/` no longer appears in git status and does not exist.
  - Confirmed `docs/design/` and `docs/specs/` remain visible intentional implementation artifacts while package dry-run excludes them.
  - Verification passed: `git status --short -- ...`, `npm test`, `npm pack --dry-run --json`, and package-content JSON check with `package.json.private === true`.
- Code quality release-readiness review after fix cycle 1: PASS.
  - Confirmed `package.json` is explicitly private, so accidental public npm publishing under the occupied package name is blocked.
  - Confirmed `RELEASE-NOTES.md` states public npm publishing is not intended and distribution is through supported plugin/git-backed install paths.
  - Verification passed: `npm test`, `npm pack --dry-run --json`, private package check, forbidden-name scan, package-content JSON check, and scoped JSON metadata parse.
- Prior review status:
  - Packaging/process-risk review before fix cycle 1: PASS.
- Final Wave 7 status: `task-10-final-consistency-release` complete.

## 2026-06-24 - Final Integration Review

- Final code quality/release-readiness review: FAIL.
  - Blocking issue: `package.json` shipped `docs/*.md`, which included `docs/mithril-merge-deep-dive.md`. That historical source-comparison document contains excluded router/surface names for provenance, so it should not be part of the packaged public docs surface.
  - Blocking issue: packaged `hooks/session-start-codex` had CRLF working-tree line endings. Full shell lint over tracked shell files failed with ShellCheck `SC1017`, while `npm test` missed it because default shell lint found no changed shell files.
  - Verification during review: `npm test` and `npm pack --dry-run --json` passed; package-content check confirmed `package.json.private === true` and no `.serena/`, `docs/specs/`, or `docs/design/` paths; task status bookkeeping was consistent.

## 2026-06-24 - Final Integration Fix Cycle 1

- Packaged public docs and shell line endings:
  - Modified `package.json` to replace `docs/*.md` with an explicit allowlist of public docs, excluding `docs/mithril-merge-deep-dive.md` from the tarball.
  - Modified `.gitattributes` to enforce LF for `hooks/session-start-codex` and `.gitattributes`.
  - Normalized `hooks/session-start-codex` and `.gitattributes` to LF line endings.
  - Verification passed:
    - `npm pack --dry-run --json`
    - product-facing stale-name scan over packaged public surfaces returned no matches.
    - full shell lint with bundled ShellCheck PATH: `scripts/lint-shell.sh --all`
    - `git ls-files --eol` shows `hooks/session-start-codex` as `w/lf`.

## 2026-06-24 - Final Integration Review Rerun

- Final code quality/release-readiness review after fix cycle 1: PASS.
  - Confirmed `package.json.files` explicitly lists public docs and excludes `docs/mithril-merge-deep-dive.md`.
  - Confirmed `hooks/session-start-codex` has LF working-tree line endings and passes full tracked shell lint.
  - Verification passed:
    - `npm test`
    - full shell lint over tracked shell files with bundled ShellCheck PATH: `scripts/lint-shell.sh --all`
    - `npm pack --dry-run --json` with 117 tarball entries.
    - package-content check confirmed `package.json.private === true` and no `.serena/`, `docs/specs/`, `docs/design/`, or `docs/mithril-merge-deep-dive.md` paths.
    - packaged stale-name scan had only allowed attribution/provenance/source-comment matches.
    - `git ls-files --eol` showed requested release files as `i/lf w/lf attr/text eol=lf`.
    - spec status check confirmed 10 of 10 tasks complete with no incomplete dependencies.
- Feature implementation status: complete.
