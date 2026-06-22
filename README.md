# Mithril

Mithril is a complete software development methodology for your coding agents, built on top of a set of composable skills and some initial instructions that make sure your agent uses them.


## Quickstart

Give your agent Mithril: [Claude Code](#claude-code), [Antigravity](#antigravity), [Codex App](#codex-app), [Codex CLI](#codex-cli), [Cursor](#cursor), [Factory Droid](#factory-droid), [Gemini CLI](#gemini-cli), [GitHub Copilot CLI](#github-copilot-cli), [Kimi Code](#kimi-code), [OpenCode](#opencode), [Pi](#pi).

## How it works

It starts from the moment you fire up your coding agent. As soon as it sees that you're building something, it *doesn't* just jump into trying to write code. Instead, it steps back and asks you what you're really trying to do. 

Once it's teased a spec out of the conversation, it shows it to you in chunks short enough to actually read and digest. 

After you've signed off on the design, your agent puts together an implementation plan that's clear enough for an enthusiastic junior engineer with poor taste, no judgement, no project context, and an aversion to testing to follow. It emphasizes true red/green TDD, YAGNI (You Aren't Gonna Need It), and DRY. 

Next up, once you say "go", it launches a *subagent-driven-development* process, having agents work through each engineering task, inspecting and reviewing their work, and continuing forward. It's not uncommon for your agent to work autonomously for a couple hours at a time without deviating from the plan you put together.

There's a bunch more to it, but that's the core of the system. And because the skills trigger automatically, you don't need to do anything special. Your coding agent just has mithril.

## Installation

Installation differs by harness. If you use more than one, install Mithril separately for each one.

### Claude Code

Install Mithril from this repository:

```bash
/plugin install https://github.com/J03Fr0st/mithril
```

### Antigravity

Install Mithril as a plugin from this repository:

```bash
agy plugin install https://github.com/J03Fr0st/mithril
```

Antigravity runs the plugin's session-start hook, so Mithril is active from
the first message. Reinstall with the same command to update.

### Codex App

The Codex plugin manifest lives in `.codex-plugin/plugin.json`. To publish a Codex plugin mirror, use `scripts/sync-to-codex-plugin.sh`, which targets `J03Fr0st/openai-codex-plugins`.

### Codex CLI

Use the same Codex plugin manifest in `.codex-plugin/plugin.json`, or install from the published mirror after syncing it to `J03Fr0st/openai-codex-plugins`.

### Cursor

- In Cursor Agent chat, install from marketplace:

  ```text
  /add-plugin mithril
  ```

- Or search for "mithril" in the plugin marketplace.

### Factory Droid

- Register the marketplace:

  ```bash
  droid plugin marketplace add https://github.com/J03Fr0st/mithril
  ```

- Install the plugin:

  ```bash
  droid plugin install mithril@mithril
  ```

### Gemini CLI

- Install the extension:

  ```bash
  gemini extensions install https://github.com/J03Fr0st/mithril
  ```

- Update later:

  ```bash
  gemini extensions update mithril
  ```

### GitHub Copilot CLI

Use this repository as the plugin source when your Copilot CLI version supports repository plugin installs.

### Kimi Code

Mithril is available in Kimi Code's plugin marketplace.

- Open Kimi Code's plugin manager:

  ```text
  /plugins
  ```

- Go to `Marketplace` > `mithril` and install it.

- Or install directly from this repository:

  ```text
  /plugins install https://github.com/J03Fr0st/mithril
  ```

### OpenCode

OpenCode uses its own plugin install; install Mithril separately even if you
already use it in another harness.

- Tell OpenCode:

  ```
  Fetch and follow instructions from https://raw.githubusercontent.com/J03Fr0st/mithril/refs/heads/main/.opencode/INSTALL.md
  ```

### Pi

Install Mithril as a Pi package from this repository:

```bash
pi install git:github.com/J03Fr0st/mithril
```

For local development, run Pi with this checkout loaded as a temporary package:

```bash
pi -e /path/to/mithril
```

The Pi package loads the Mithril skills and a small extension that injects the `using-mithril` bootstrap at session startup and again after compaction. Pi has native skills, so no compatibility `Skill` tool is required. Subagent and task-list tools remain optional Pi companion packages.


## Updating

Mithril updates are somewhat coding-agent dependent. For repository installs, reinstall from `https://github.com/J03Fr0st/mithril` or pull the latest checkout.

## License

MIT License - see LICENSE file for details

## Visual companion telemetry

Set `MITHRIL_DISABLE_TELEMETRY` to any true value to disable optional telemetry from bundled skills or companion tooling. Mithril also honors Claude Code's `DISABLE_TELEMETRY` and `CLAUDE_CODE_DISABLE_NONESSENTIAL_TRAFFIC` opt-outs.

## Community

Mithril is maintained by Joe Vreugdenburg.

- **Issues**: https://github.com/J03Fr0st/mithril/issues
