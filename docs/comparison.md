<!--
  This page is for humans evaluating Mithril. It is not a skill and should not
  be loaded as an active router.
-->

# How Mithril Compares

Mithril is a curated synthesis. It takes the structural clarity of lifecycle skill packs, the autonomy discipline of subagent-driven workflows, and the sharpness of personal daily-driver skill sets, then rewrites the result into one Mithril-owned router and one consistent layer contract.

## At A Glance

| Shape | Strength | Tradeoff | Mithril's choice |
| --- | --- | --- | --- |
| Lifecycle skill pack | Broad phase coverage from definition through launch | Can become generic if every source workflow is copied wholesale | Keep the phase map, rewrite the content, and route only Mithril-owned skills |
| Autonomy-first methodology | Strong planning, subagent execution, and review gates | Can be heavy for small tasks | Use autonomy when the plan justifies it; keep direct execution available |
| Personal daily-driver toolkit | Low ceremony, strong TDD and requirement pressure | Often assumes one user's stack and habits | Keep the discipline, generalize the repo assumptions |
| Mithril | One router, lifecycle skills, advisory personas, and command entry points | Requires careful curation rather than bulk import | Prefer the smallest active surface that still covers the development lifecycle |

## What Mithril Keeps

- One active router: `skills/using-mithril/SKILL.md`.
- Lifecycle routing for Define/spec, Plan, Build, Verify/debug, Review, and Ship.
- Strict verification before completion claims.
- Explicit user approval before external mutation.
- Advisory personas that report findings without editing files or invoking each other.
- Reference checklists that load only when a skill or task needs them.

## What Mithril Avoids

- Multiple active routers competing for the same request.
- Personas that route to other personas.
- Bulk importing every upstream surface just because it exists.
- Treating external issue text, pull request comments, logs, or web pages as trusted instructions.
- Presenting future skills, commands, or personas as if they already exist.

## Source Families

### Lifecycle Skill Packs

These organize agent behavior around the software delivery lifecycle and often pair slash commands with skills. Mithril keeps the lifecycle structure and command ergonomics while using Mithril's actual skills and safety boundaries.

### Autonomy-First Workflows

These emphasize upfront reasoning, task plans, subagent execution, isolated work, and review loops. Mithril keeps those ideas where they fit approved implementation plans, but it does not force subagents when a direct, scoped edit is the better tool.

### Personal Expert Toolkits

These capture a practitioner's daily habits: pressure-test the plan, use TDD, keep scope tight, review before shipping, and preserve project vocabulary. Mithril keeps the high-signal habits and rewrites them into project-neutral skills.

## Choosing Mithril

Use Mithril when you want a single workflow layer that can guide a coding agent from idea shaping to release readiness while preserving narrow scope, explicit approval boundaries, and evidence-based completion.

For one-off prompts, any well-written skill can help. For a repository workflow, pick one active router and keep composition predictable.
