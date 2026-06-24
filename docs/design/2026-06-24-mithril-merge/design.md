# Mithril Merge Deep Dive

Date: 2026-06-24

## Source Repositories

| Role | Repository | Git URL | Local Path | Observed Commit |
|---|---|---|---|---|
| Target | [J03Fr0st/mithril](https://github.com/J03Fr0st/mithril) | `https://github.com/J03Fr0st/mithril.git` | `D:\Source\_ai\mithril` | `2870422` - 2026-06-22 - Base |
| Runtime/core base | [obra/superpowers](https://github.com/obra/superpowers) | `https://github.com/obra/superpowers.git` | `D:\Source\_ai\superpowers` | `896224c` - 2026-06-18 - Release v6.0.3 |
| Lifecycle/reference pack | [addyosmani/agent-skills](https://github.com/addyosmani/agent-skills) | `https://github.com/addyosmani/agent-skills.git` | `D:\Source\_ai\agent-skills` | `e0d2e43` - 2026-06-23 |
| Alignment/domain toolkit | [mattpocock/skills](https://github.com/mattpocock/skills) | `https://github.com/mattpocock/skills.git` | `D:\Source\_ai\skills` | `6eeb81b` - 2026-06-18 |
| Simplicity source provenance | [DietrichGebert source repo](https://github.com/DietrichGebert/ponytail) | `https://github.com/DietrichGebert/ponytail.git` | `D:\Source\_ai\ponytail` | `025da37` - 2026-06-24 - release: 4.8.3 |

All four source repositories are MIT licensed. A merged Mithril distribution should preserve attribution for Jesse Vincent, Addy Osmani, Matt Pocock, and Dietrich Gebert when copying or deriving skill text.

## Executive Summary

Mithril should become a curated synthesis, not a bulk import. The four source systems are not independent libraries; they contain competing routers and overlapping behavioral disciplines. A raw copy would create duplicate TDD, debugging, planning, review, and delivery workflows that fight for authority.

The recommended architecture is:

1. Keep `using-mithril` as the only router.
2. Use Superpowers as the runtime and autonomous execution core.
3. Fold overlapping TDD/debug/planning/review guidance into canonical Mithril skills.
4. Import agent-skills specialist coverage for security, performance, observability, API/UI, CI/CD, migration, and launch.
5. Import Matt Pocock's strongest alignment/domain/codebase-design skills, excluding deprecated, personal, and draft material.
6. Add explicit code-shape governance so formatter, linter, tests, architecture vocabulary, and review gates drive how code looks.
7. Use agent-skills documentation, `AGENTS.md`, and `CLAUDE.md` as the baseline for Mithril's public docs and harness instruction files.
8. Add the Mithril Simplicity Layer as a cross-cutting discipline that challenges bloat before implementation and reviews over-engineering after changes.

## Current Mithril State

Mithril is currently a rebranded Superpowers-style plugin shell:

- Multi-harness packaging exists for Claude, Codex, Cursor, Kimi, OpenCode, and Pi.
- `skills/using-mithril/SKILL.md` exists locally but is untracked.
- No tracked Mithril skills exist yet.
- No tests or CI are present.
- `assets/` is missing, while `.codex-plugin/plugin.json` references `assets/mithril-small.svg` and `assets/app-icon.png`.
- `README.md`, manifests, hooks, and runtime adapters are already mostly rebranded to Mithril.

The existing untracked `skills/` directory should be preserved and intentionally staged later.

## Source Inventory

| Repository | Tracked Skills | Commands | Agents | Tracked Tests | Hooks | Strength |
|---|---:|---:|---:|---:|---:|---|
| Superpowers | 14 | 0 | 0 | 50 | 6 | Runtime, strict workflow enforcement, autonomous execution, plugin tests |
| agent-skills | 24 | 8 | 4 | 0 | 9 | Broad SDLC coverage, commands, review personas, validators, strong docs/AGENTS/CLAUDE structure |
| Matt skills | 34 total | 0 | 0 | 0 | 0 | Human-agent alignment, domain modeling, codebase design, sharp TDD/debug habits |
| Simplicity source | 6 | 6 | 0 | 13 plus 34 benchmark files | 10 | Simplicity ladder, over-engineering review/audit, mode hooks, benchmark evidence |
| Mithril | 0 tracked, 1 untracked | 0 | 0 | 0 | 6 | Rebranded plugin shell and bootstrap |

Matt's repository count needs qualification: `deprecated/`, `in-progress/`, and `personal/` contain material that should not be promoted into Mithril's default routed skill set.

## Main Conflict Map

There is only one exact skill-name collision:

- `test-driven-development`: Superpowers and agent-skills

The larger issue is conceptual overlap:

| Area | Superpowers | agent-skills | Matt skills | Recommendation |
|---|---|---|---|---|
| Router | `using-superpowers` | `using-agent-skills` | `ask-matt` | Do not import. Fold selected routing ideas into `using-mithril`. |
| TDD | `test-driven-development` | `test-driven-development` | `engineering/tdd` | Merge into one canonical `test-driven-development`. |
| Debugging | `systematic-debugging` | `debugging-and-error-recovery` | `diagnosing-bugs` | Merge into one canonical `systematic-debugging`. |
| Spec/design | `brainstorming` | `spec-driven-development`, `idea-refine` | `grill-with-docs`, `to-prd` | Keep Superpowers flow, add Matt domain grilling and optional PRD publishing. |
| Planning | `writing-plans` | `planning-and-task-breakdown` | `to-issues` | Keep executable plans as canonical; add issue publishing as adapter. |
| Review/ship | `requesting-code-review`, `receiving-code-review` | `code-review-and-quality`, `/ship`, personas | `review` draft | Keep Superpowers review gates; add agent-skills personas and fan-out command. |
| Delivery/git | `finishing-a-development-branch`, worktrees | `git-workflow-and-versioning`, `shipping-and-launch` | guardrails misc | Keep worktree/finish flow; add launch/security/perf checks. |
| Simplicity/over-engineering | YAGNI language in planning/TDD | `code-simplification` | codebase design/deep modules | Add the Mithril Simplicity Layer's ladder as a cross-cutting discipline; keep review and audit as explicit specialist commands. |

## Recommended Mithril Architecture

### 1. Core Flow

Use Superpowers as the foundation because it already has the strictest bootstrap, autonomous execution model, and test coverage.

Port and rebrand:

- `brainstorming`
- `writing-plans`
- `using-git-worktrees`
- `subagent-driven-development`
- `executing-plans`
- `dispatching-parallel-agents`
- `requesting-code-review`
- `receiving-code-review`
- `verification-before-completion`
- `finishing-a-development-branch`

Rebrand internal paths deliberately:

- `docs/superpowers/...` -> `docs/mithril/...`
- `.superpowers/...` -> `.mithril/...`
- `superpowers:*` -> `mithril:*`
- `SUPERPOWERS_*` -> `MITHRIL_*`

Backward compatibility can be added later if needed, but the first Mithril-native version should be internally consistent.

### 2. Canonical Merged Disciplines

Do not ship duplicate skills in these areas. Create one Mithril skill for each and merge the strongest parts.

#### `test-driven-development`

Combine:

- Superpowers' hard RED-GREEN-REFACTOR enforcement and "no production code without a failing test first" rule.
- Matt's public-interface testing, vertical tracer-bullet cycle, and `CONTEXT.md` vocabulary guidance.
- agent-skills' test pyramid, DAMP-over-DRY guidance, browser testing notes, and test size/resource model.

#### `systematic-debugging`

Combine:

- Matt's feedback-loop-first approach: build a tight red-capable command before theorizing.
- Superpowers' root-cause investigation, hypothesis discipline, and "three failed fixes means question architecture" rule.
- agent-skills' stop-the-line triage, safe fallback patterns, and untrusted-error-output warning.

#### `code-review-and-quality`

Combine:

- Superpowers task review and final review gates.
- agent-skills five-axis review framework and severity taxonomy.
- agent-skills personas for independent review passes.

#### `skill-design`

Combine:

- Superpowers `writing-skills`.
- Matt `writing-great-skills`.
- agent-skills `docs/skill-anatomy.md` and validator expectations.

Normalization rule: every imported or adapted Mithril skill should be rewritten into the `docs/skill-anatomy.md` structure before it becomes routed product behavior. Raw upstream `SKILL.md` files can be used as source material, but the Mithril version should have:

- Required YAML frontmatter with `name` and `description`.
- A clear overview and when-to-use section.
- A concrete workflow or core process.
- Common rationalizations and red flags when the skill enforces discipline.
- Verification criteria with evidence requirements.
- Supporting files only for heavy references, scripts, templates, or assets.

This gives Mithril one skill shape across all imported sources instead of preserving each upstream repo's authoring style.

### 3. Code Shape Governance

Mithril should treat code appearance and structure as enforceable engineering constraints, not taste. The merged system should add a canonical `implementation-standards` or `code-shape-governance` skill that every implementation and review flow can reference.

Source-backed rules to pull into Mithril:

| Principle | Source evidence | Mithril rule |
|---|---|---|
| Mechanical style belongs to tools | agent-skills `definition-of-done` requires linting and formatting; agent-skills also ships skill and command validators. | Formatters, linters, type checks, manifest checks, and skill/command validators decide objective style and structural validity. |
| Local consistency beats external preference | agent-skills `code-simplification` requires studying neighboring code and warns that simplification which breaks project consistency is churn. | Before writing code, inspect nearby files, identify the local pattern, and follow it unless the pattern is the thing being deliberately changed. |
| Behavior drives shape | Superpowers TDD enforces RED -> GREEN -> REFACTOR with minimal code; Matt TDD insists tests verify behavior through public interfaces. | Add one behavior at a time, write the smallest green implementation, then refactor only while tests stay green. |
| Interfaces are design surfaces | Matt `codebase-design` defines deep modules as small interfaces with substantial implementation and says the interface is the test surface. | Prefer deep modules, narrow public APIs, and tests that cross the same seam as callers. Avoid exposing internal seams just for tests. |
| Simplicity is not code golf | The simplicity source ladder prefers YAGNI, existing code, stdlib, native platform, installed dependencies, one-line solutions, then minimum custom code, while preserving validation, security, accessibility, and data-loss handling. | Use the Mithril Simplicity Layer to remove speculative code, but never remove safety, trust-boundary validation, or behavior checks. |
| Review covers more than passing tests | agent-skills `code-review-and-quality` reviews correctness, readability, architecture, security, and performance; it also flags structural complexity and unjustified new patterns. | A passing test suite is necessary but insufficient. Review must include architecture, readability, security, performance, type boundaries, dependency choices, and missed simplifications. |
| Refactors stay separate and reversible | agent-skills `code-simplification` and `code-review-and-quality` both warn against mixing refactors with feature work. | Keep behavior changes, refactors, generated artifacts, and formatting-only changes separate unless the user explicitly approves a combined change. |
| Domain language shapes names | Matt `domain-modeling` treats `CONTEXT.md` as glossary truth and asks agents to challenge conflicting terms. | Names should come from the repo's glossary, ADRs, and surrounding code; unclear vocabulary is a design question, not a naming whim. |
| Evidence before claims | Superpowers `verification-before-completion` requires fresh command output before completion claims. | Agents must run and report the command that proves formatting, linting, tests, or validation actually passed. |

The resulting Mithril code-shape loop should be:

1. Inspect the touched area and identify local style, architecture, naming, and test patterns.
2. Choose the smallest behavior slice and write or update the test at the public seam.
3. Implement the minimum code that passes using existing code, stdlib, native features, or installed dependencies first.
4. Run formatter, linter, type checks, and the focused test.
5. Refactor only while tests stay green, keeping feature and refactor changes separable.
6. Run review against correctness, readability, architecture, security, performance, and simplicity.
7. Report verification evidence, including any skipped checks and why.

This gives Mithril a concrete answer to "how should the code look": it should look like the local repo, obey automated tooling, expose small behavior-rich interfaces, use domain vocabulary, avoid speculative structure, and be backed by behavior-level tests.

### 4. Specialist Skill Imports

Import mostly as-is with light Mithril rebranding:

From agent-skills:

- `api-and-interface-design`
- `browser-testing-with-devtools`
- `ci-cd-and-automation`
- `code-simplification`
- `context-engineering`
- `deprecation-and-migration`
- `documentation-and-adrs`
- `doubt-driven-development`
- `frontend-ui-engineering`
- `observability-and-instrumentation`
- `performance-optimization`
- `security-and-hardening`
- `shipping-and-launch`
- `source-driven-development`

From Matt skills:

- `grill-me`
- `grill-with-docs`
- `grilling`
- `domain-modeling`
- `codebase-design`
- `prototype`
- `to-prd`
- `to-issues`
- `triage`
- `handoff`
- `improve-codebase-architecture`
- `resolving-merge-conflicts`

Rename Matt's setup flow:

- `setup-matt-pocock-skills` -> `setup-mithril-project`

This setup skill should configure issue tracker, triage labels, and domain docs for Mithril-owned workflows.

### 5. Documentation and Agent Instruction Baseline

Use agent-skills as the documentation and harness-instruction model. Its docs are strongest where they keep human-facing guidance, agent-facing rules, personas, commands, references, and setup guides separate.

Mithril should adapt this structure:

- `README.md`: concise product overview, installation path, lifecycle, commands, and what Mithril is for.
- `AGENTS.md`: generic coding-agent instructions, intent-to-skill mapping, lifecycle mapping, anti-rationalization rules, and composition boundaries.
- `CLAUDE.md`: Claude-specific project structure, skills by phase, conventions, commands, and boundaries.
- `docs/getting-started.md`: universal quick start and recommended setup.
- `docs/agents.md`: persona matrix, composition rules, and valid/invalid orchestration patterns.
- `docs/comparison.md`: fair comparison against upstream influences without turning it into marketing.
- Host setup docs: one focused page per supported tool or harness.
- `references/`: reusable checklists for testing, security, performance, accessibility, observability, orchestration, and definition of done.

Rules to carry forward:

- Skills, personas, and commands are separate layers: skill is the how, persona is the who, command is the when.
- The user or command orchestrates composition; personas do not invoke other personas.
- Parallel fan-out is allowed only for independent review perspectives with a merge step.
- Docs meant for humans stay in `docs/`; agent-loaded guidance stays in `AGENTS.md`, `CLAUDE.md`, skills, personas, commands, or references.
- Skill authoring and validation follow `docs/skill-anatomy.md`.

### 6. Mithril Simplicity Layer

The simplicity source should fit into Mithril as the negative-code and anti-bloat discipline. The public Mithril name should be the Mithril Simplicity Layer; the upstream name should remain source provenance only. This layer should not become a second router and should not override TDD, security, accessibility, or root-cause debugging.

Import or adapt:

- `simplicity`: the simplicity ladder: YAGNI, reuse existing code, standard library, native platform feature, installed dependency, one-line solution, then minimum custom code.
- `simplicity-review`: diff-focused over-engineering review.
- `simplicity-audit`: repo-wide over-engineering audit.

Do not import:

- `simplicity-debt`: Mithril does not need a dedicated shortcut ledger.
- `simplicity-help`: Mithril help should be generated from its own command catalog later.
- `simplicity-gain`: benchmark scoreboards are marketing/reference material, not core behavior.

Best fit inside Mithril:

- Pre-implementation: `using-mithril` should remind agents to run the simplicity ladder after understanding the requirement and before writing code.
- During planning: `brainstorming` and `writing-plans` should challenge speculative scope, avoid unrequested abstractions, and prefer existing/native/stdlib solutions.
- During implementation: canonical `test-driven-development` should preserve the "minimal code that passes" rule while still requiring the red-green loop.
- During review: `code-review-and-quality` should run simplicity-layer complexity review either inline for small diffs or through `simplicity-review` for explicit over-engineering review.
- During audits: `simplicity-audit` should remain report-only, ranked by removable complexity, not a correctness/security/performance review.

Do not import the upstream persistent mode hooks first. Mithril already has a bootstrap and routing layer; mode persistence can be added after the skill-level behavior is stable.

## Material Not To Import By Default

Do not import:

- `superpowers/skills/using-superpowers`
- `agent-skills/skills/using-agent-skills`
- `skills/engineering/ask-matt`
- Matt `deprecated/*`
- Matt `in-progress/*`
- Matt `personal/*`
- Upstream simplicity mode persistence hooks, until Mithril's own routing and command model is stable.

Only import Matt `misc/*` if there is a specific Mithril product decision for each one. Examples like `migrate-to-shoehorn` and `scaffold-exercises` are too project-specific for the default core.

## Commands and Agents

agent-skills adds useful command and persona surfaces that Mithril should adopt after the core skills are stable.

Recommended commands:

- `/spec` -> Mithril brainstorming/spec flow
- `/plan` -> Mithril writing-plans/task breakdown
- `/build` -> Mithril subagent-driven or incremental implementation
- `/test` -> canonical Mithril TDD/testing workflow
- `/review` -> canonical Mithril review workflow
- `/ship` -> fan-out launch review using personas
- `/webperf` -> web performance auditor
- `/standards` -> inspect the touched area and report local code-shape rules before implementation or review
- `/code-simplify` -> code simplification workflow
- `/simplicity` -> optional simplicity intensity or one-shot reminder
- `/simplicity-review` -> diff-focused over-engineering review
- `/simplicity-audit` -> repo-wide over-engineering audit

Recommended agents/personas:

- `code-reviewer`
- `security-auditor`
- `test-engineer`
- `web-performance-auditor`

Important rule: personas should not call other personas. Slash commands or the main agent orchestrate fan-out and merge reports.

## Validation and CI Plan

Mithril should not remain a hand-assembled plugin. Add validation early.

Minimum validation:

- Port agent-skills `scripts/validate-skills.js`.
- Port agent-skills `scripts/validate-commands.js` once commands are added.
- Port Superpowers plugin/runtime tests before deeper behavior edits.
- Port the upstream simplicity source's Node test suite if its hooks/commands are imported.
- Add a `skill-anatomy.md` conformance check for every Mithril-owned `skills/*/SKILL.md`.
- Add a workflow that runs skill validation, command validation, manifest validation, formatter/linter/type checks where available, and selected shell/runtime tests.
- Document each target repo's formatter, linter, typecheck, and focused-test commands so `implementation-standards`, TDD, and review use the same evidence.

Verification gates before a merge is complete:

- Skill validator passes.
- Every imported/adapted skill follows the `skill-anatomy.md` structure or has a documented exception.
- Command validator passes.
- Formatter, linter, typecheck, and focused-test commands are documented or explicitly marked unavailable.
- Superpowers brainstorm-server tests pass after Mithril rebrand.
- Simplicity command/skill tests pass after any simplicity-layer import.
- Shell syntax checks pass for hooks and scripts.
- Plugin manifests reference existing files.
- `rg "superpowers|agent-skills|setup-matt|docs/superpowers|\\.superpowers|SUPERPOWERS"` shows only intentional attribution/history.
- `git status` contains only intended Mithril changes.

## Migration Waves

### Wave 1: Stabilize Mithril Shell

- Add missing assets.
- Commit current `using-mithril`.
- Add attribution/NOTICE.
- Add initial docs directory and validation scripts.
- Preserve existing bootstrap behavior.

### Wave 2: Port Superpowers Core

- Copy Superpowers core skills except `using-superpowers`.
- Rebrand internal skill references, paths, env vars, and state directories.
- Port relevant tests and update expectations from Superpowers to Mithril.
- Verify runtime/bootstrap tests.

### Wave 3: Merge Canonical Collision Skills

- Merge TDD into one Mithril `test-driven-development`.
- Merge debugging into one Mithril `systematic-debugging`.
- Merge review into a canonical review skill.
- Merge skill-writing guidance into a canonical skill-design workflow.
- Add `implementation-standards` as the shared code-shape skill used by planning, implementation, TDD, and review.
- Establish `skill-anatomy.md` as the required format for all Mithril-owned skills.

### Wave 4: Add agent-skills Specialist Layer

- Add specialist skills for API, UI, security, performance, observability, CI/CD, migration, launch, and docs.
- Rewrite imported specialist skills into the `skill-anatomy.md` structure before routing them from `using-mithril`.
- Add `references/`.
- Add commands and command validation.
- Add review personas and persona documentation.

### Wave 5: Add Matt Alignment and Domain Layer

- Add grilling, domain modeling, codebase design, prototype, PRD, issues, triage, and handoff flows.
- Rewrite imported alignment/domain skills into the `skill-anatomy.md` structure before routing them from `using-mithril`.
- Rename project setup flow to `setup-mithril-project`.
- Update `using-mithril` to route domain/alignment workflows without over-triggering user-only flows.

### Wave 6: Add Mithril Simplicity Layer

- Add the simplicity ladder to Mithril's operating principles.
- Add `simplicity-review` and `simplicity-audit` as explicit specialist skills.
- Rewrite simplicity-layer skills into the `skill-anatomy.md` structure before routing them from `using-mithril`.
- Add simplicity commands if Mithril supports commands by this point.
- Merge the minimalism rules into planning, TDD, implementation, and review guidance.
- Exclude the upstream debt, help, and benchmark/gain surfaces from the Mithril import.
- Defer persistent mode hooks until Mithril has its own mode semantics.

### Wave 7: Rewrite Public Docs

- Rewrite `README.md` around Mithril's own methodology.
- Rewrite `AGENTS.md` and `CLAUDE.md` using agent-skills as the structural baseline, with Mithril-specific lifecycle, routing, composition, and boundaries.
- Add a skill catalog.
- Add `docs/getting-started.md`, `docs/agents.md`, `docs/comparison.md`, host setup docs, and verification docs.
- Add `references/` checklists for definition of done, testing, security, performance, accessibility, observability, and orchestration.
- Add contribution guidance that says skill text is behavior-shaping code.

### Wave 8: Final Consistency Pass

- Run all validators and tests.
- Search for stale upstream names.
- Confirm the upstream simplicity source name appears only in provenance, attribution, or copied license text.
- Confirm manifests and marketplace metadata.
- Confirm source attribution.
- Prepare release notes.

## Recommended Product Positioning

Mithril should be described as:

> A composable agent engineering methodology that combines strict autonomous execution, domain-aware planning, test-first implementation, systematic debugging, specialist review, and production launch checks.

This differentiates Mithril from each source:

- Stronger breadth than Superpowers alone.
- Stronger autonomous execution than agent-skills alone.
- More packaged and multi-harness than Matt's personal toolkit.
- More explicit about negative code and anti-bloat by adopting a Mithril-native simplicity discipline.

## Decision Summary

Proceed with:

- Superpowers as the runtime and execution core.
- Canonical merged TDD/debug/review/planning disciplines.
- agent-skills as the broad SDLC and specialist layer.
- Matt skills as the alignment, domain-language, issue, and architecture layer.
- Mithril Simplicity Layer as the simplicity, negative-code, over-engineering review, and repo-wide bloat-audit layer.
- One router: `using-mithril`.

Avoid:

- Copying all three routers.
- Shipping duplicate TDD/debug/planning skills.
- Importing deprecated, personal, or draft material.
- Letting upstream persistent mode hooks compete with Mithril's bootstrap before the command model is stable.
- Publishing before assets, validation, and attribution are fixed.
