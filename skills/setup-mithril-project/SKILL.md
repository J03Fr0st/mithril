---
name: setup-mithril-project
description: Use when configuring a repository so Mithril project-flow skills know its issue tracker, triage labels, and domain documentation layout.
---

# Setup Mithril Project

## Overview

`setup-mithril-project` records the repository-specific conventions that project-flow skills need: where work is tracked, which labels map to triage states, and where domain language and ADRs live.

## When to Use

Use this skill when:

- `to-prd`, `to-issues`, or `triage` needs an issue tracker but none is configured.
- Domain-aware skills need to know whether the repo has one context or many.
- A repo is adopting Mithril workflows for the first time.
- Existing project-flow instructions need to be refreshed deliberately.

Do not run it when the user only asks to create one issue or PRD and the tracker conventions are already known.

## Process

1. Explore the repo without assuming the answer.
   - `git remote -v` and `.git/config`
   - Root instructions such as `AGENTS.md`, `CLAUDE.md`, or equivalent
   - Existing project-flow sections in those instructions
   - `CONTEXT.md`, `CONTEXT-MAP.md`, and `docs/adr/`
   - Existing `docs/agents/` conventions
   - Local issue folders if the repo uses markdown tracking
2. Present findings and ask one setup decision at a time.
   - Issue tracker: GitHub, GitLab, local markdown, or another described workflow.
   - Pull requests or merge requests as a triage surface, only when the chosen tracker supports them.
   - Triage label mapping for `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, and `wontfix`.
   - Domain-doc layout: single context or context map.
3. Draft the instruction block and supporting docs before writing.
4. Edit the existing root instruction file rather than creating a competing one.
   - If more than one instruction file exists, prefer the repo's current convention.
   - If none exists, ask which one to create.
5. Write or update:
   - `docs/agents/issue-tracker.md`
   - `docs/agents/triage-labels.md`
   - `docs/agents/domain.md`
6. Report which skills now consume the setup.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "The remote tells me the tracker." | The remote is a clue; the repo may use another workflow. |
| "Defaults are fine; no need to ask." | Label names and tracker habits are repo conventions, not universal truth. |
| "I can append a new instruction block." | Duplicate instruction blocks create conflicting authority. |
| "Domain docs can be created upfront." | Create or update them when real terms and decisions exist. |

## Red Flags

- A root instruction file is created while the repo already has one.
- Triage labels are invented without checking existing conventions.
- The setup writes tracker docs before the user approves the choices.
- Domain docs are treated as implementation specs.
- The skill changes unrelated workflow or package files.

## Verification

Before reporting setup complete:

- The chosen tracker and triage label mapping are recorded.
- Domain-doc layout is recorded.
- Only the intended instruction and `docs/agents/` files changed.
- `to-prd`, `to-issues`, `triage`, `domain-modeling`, and `improve-codebase-architecture` have enough repo-specific context to operate.
- Any skipped setup decision is called out.
