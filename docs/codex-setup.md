# Codex Setup

Use this guide when running Mithril in Codex surfaces that support skills, plugins, or repository instructions.

## Install

Use the Codex plugin manifest at:

```text
.codex-plugin/plugin.json
```

For a published plugin mirror, install the mirror produced from this repository. For local development, point Codex at this checkout or copy the `skills/` directory into the Codex skills location supported by your build.

## Project Instructions

Codex reads `AGENTS.md`. Keep this file in the project root so Codex sees:

- The single-router rule.
- Lifecycle intent mapping.
- Persona composition boundaries.
- External mutation approval gates.

## Subagents

Some Mithril skills can dispatch subagents when Codex exposes multi-agent tools. If your Codex build does not expose subagents, use `executing-plans` for direct sequential execution instead of pretending parallel work is available.

## Recommended Smoke Test

Ask Codex:

```text
Which Mithril skill should I use to debug a failing test?
```

Expected route: `systematic-debugging`, followed by `test-driven-development` when a fix changes behavior.

## Safety

Codex agents should ask before push, merge, deploy, publish, remote issue or pull request updates, live external audits, or any other external mutation.
