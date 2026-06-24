# GitHub Copilot Setup

Use this guide when adapting Mithril for GitHub Copilot in VS Code or Copilot CLI.

## Project Instructions

Keep `AGENTS.md` at the repository root. Copilot-compatible agents can use it as the shared routing and safety contract.

For VS Code Copilot, also add a concise project instruction file when your workspace uses one:

```text
.github/copilot-instructions.md
```

The instruction file should point Copilot at Mithril's router and preserve the layer contract.

## Skills

If your Copilot environment supports agent skills, copy Mithril skills into the supported skills directory. Start with:

```text
skills/using-mithril/SKILL.md
skills/brainstorming/SKILL.md
skills/writing-plans/SKILL.md
skills/executing-plans/SKILL.md
skills/test-driven-development/SKILL.md
skills/systematic-debugging/SKILL.md
skills/code-review-and-quality/SKILL.md
skills/verification-before-completion/SKILL.md
```

Add phase-specific skills when the work needs them.

## Custom Agents

Copilot custom agents usually require `*.agent.md` filenames. Copy Mithril personas into the expected directory with that suffix:

```text
agents/code-reviewer.md -> .github/agents/code-reviewer.agent.md
agents/security-auditor.md -> .github/agents/security-auditor.agent.md
agents/test-engineer.md -> .github/agents/test-engineer.agent.md
agents/web-performance-auditor.md -> .github/agents/web-performance-auditor.agent.md
```

Use them as leaf reviewers. They report findings and do not invoke each other.

## Usage

Ask for the workflow in natural language if slash commands are not available:

- "Use Mithril to spec this feature."
- "Use Mithril to plan the approved design."
- "Use Mithril to review this diff."

## Safety

Copilot should not update remote issues, pull requests, branches, releases, or deployments without explicit user approval for that action.
