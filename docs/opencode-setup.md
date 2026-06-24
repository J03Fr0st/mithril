# OpenCode Setup

Use this guide when running Mithril with OpenCode.

## Install

Add Mithril to the `plugin` array in your OpenCode configuration:

```json
{
  "plugin": ["mithril@git+https://github.com/J03Fr0st/mithril.git"]
}
```

Restart OpenCode after changing the configuration.

For detailed local troubleshooting, see `.opencode/INSTALL.md` in this repository.

## How It Works

OpenCode uses the plugin to register skills. The active router is:

```text
skills/using-mithril/SKILL.md
```

Use OpenCode's skill tool to list or load skills when needed.

## Usage

Natural language is enough:

- "Use Mithril to spec this feature."
- "Use Mithril to implement the next approved task."
- "Use Mithril to review this diff."

The router maps the request to the relevant skill.

## Personas

Use `agents/` for advisory reviews when OpenCode exposes them as agents or when you paste them into a review prompt.

Personas do not edit files or invoke other personas.

## Safety

Ask before push, merge, deploy, publish, remote issue or pull request updates, live external audits, or any other external mutation.
