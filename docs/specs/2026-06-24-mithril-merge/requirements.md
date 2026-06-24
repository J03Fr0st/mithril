# Requirements: Mithril Merge

## Summary

Mithril is currently a mostly rebranded Superpowers-style plugin shell. The approved design turns it into a curated synthesis of four local source repositories: Superpowers for runtime and autonomous execution, agent-skills for broad lifecycle coverage and documentation structure, Matt Pocock's skills for alignment/domain/codebase-design workflows, and a simplicity source for anti-bloat discipline.

The merge must be selective. Mithril keeps one router, `using-mithril`, and rewrites imported skills into the `docs/skill-anatomy.md` structure before they become routed product behavior. The implementation should preserve MIT attribution, avoid copying conflicting routers, and exclude deprecated, personal, draft, marketing, and persistent-mode surfaces called out in the design.

## Goals

- Preserve and stabilize the current Mithril plugin shell and `using-mithril` bootstrap.
- Port Superpowers core workflow skills and relevant runtime/plugin tests with Mithril naming.
- Merge duplicate TDD, debugging, review, skill-design, and implementation-standards guidance into canonical Mithril skills.
- Add selected agent-skills specialist skills, references, commands, validators, and review personas.
- Add selected Matt alignment, domain-modeling, issue, triage, handoff, and architecture skills.
- Add the Mithril Simplicity Layer with embedded simplicity principles, `simplicity-review`, and `simplicity-audit`.
- Rewrite public docs, `AGENTS.md`, and `CLAUDE.md` using agent-skills as the structural baseline.
- Add validation and consistency checks so Mithril is not a hand-assembled plugin.

## Non-Goals

- Do not import `using-superpowers`, `using-agent-skills`, or `ask-matt` as active routers.
- Do not ship duplicate TDD, debugging, planning, or review skills.
- Do not import Matt `deprecated/*`, `in-progress/*`, or `personal/*` by default.
- Do not import simplicity `debt`, `gain`, or `help` surfaces.
- Do not import upstream persistent simplicity mode hooks before Mithril has its own mode semantics.
- Do not publish or release before assets, validation, attribution, and stale-name checks are complete.

## Acceptance Criteria

- [ ] `using-mithril` is the only active router.
- [ ] All Mithril-owned skills follow `docs/skill-anatomy.md` or document an exception.
- [ ] Selected Superpowers, agent-skills, Matt, and simplicity-source material is rebranded and attribution is preserved.
- [ ] `simplicity-review` and `simplicity-audit` exist, while `simplicity-debt`, `simplicity-gain`, and `simplicity-help` do not.
- [ ] Public docs, `AGENTS.md`, and `CLAUDE.md` follow the agent-skills structural baseline with Mithril-specific lifecycle and boundaries.
- [ ] Skill validation, command validation, shell syntax checks, and manifest checks pass or are explicitly documented as unavailable until their task creates them.
- [ ] Stale upstream names appear only in source provenance, attribution, copied license text, or documented history.
- [ ] `git status` contains only intended Mithril changes before delivery.

## Assumptions

- Source repositories remain available locally at the paths captured in the approved design.
- MIT-licensed source material can be adapted with preserved copyright notices and license text.
- Existing untracked `skills/` content in this checkout is user-owned work and must be preserved.
- Implementation agents will run tasks in wave order and avoid same-wave file overlap.
- The first Mithril-native release does not need backward compatibility for `.superpowers` paths or `SUPERPOWERS_*` environment variables.

## Technical Constraints

- Use `skills/<skill-name>/SKILL.md` for Mithril-owned skills.
- Rebrand internal references from Superpowers to Mithril: `docs/superpowers` to `docs/mithril`, `.superpowers` to `.mithril`, `superpowers:*` to `mithril:*`, and `SUPERPOWERS_*` to `MITHRIL_*`.
- Use agent-skills `docs/skill-anatomy.md` as the canonical skill format.
- Keep skills, commands, personas, references, and human docs as separate layers.
- Personas do not invoke other personas; commands or the main agent orchestrate fan-out and merge reports.
- Validation should be available through package scripts once the validation harness is added.
