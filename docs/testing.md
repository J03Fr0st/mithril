# Testing Mithril

Mithril's tests are mostly structural. The pack is Markdown-heavy, so validation checks that skills, commands, shell helpers, and public docs keep their contracts.

## Standard Checks

Run these from the repository root:

```powershell
npm run validate:skills
npm run validate:commands
npm run validate:routing
npm test
```

`npm test` runs skill validation, command validation, deterministic routing validation, and shell linting.

## Skill Validation

```powershell
npm run validate:skills
```

This checks:

- Every skill directory has `SKILL.md`.
- Frontmatter `name` matches the directory.
- Descriptions include a `Use when` trigger.
- Non-exempt skills include the required sections from [skill-anatomy.md](skill-anatomy.md).
- Cross-skill references point to known Mithril skills.

## Command Validation

```powershell
npm run validate:commands
```

This checks every `commands/*.toml` file has a non-empty `description` and `prompt`.

## Routing Validation

```powershell
npm run validate:routing
```

This zero-dependency check scores realistic prompts against skill names and descriptions. It requires one case file per skill, verifies positive prompts route into the requested top-k, verifies every negative prompt declares a valid owner that ranks first, and flags near-duplicate descriptions. It is a deterministic vocabulary regression check, not a substitute for behavioral evaluation with an agent.

Cases live at `evals/cases/<skill-name>.json`. Keep prompts natural and update descriptions when realistic wording reveals a vocabulary gap instead of copying description text into the case.

## Shell Linting

```powershell
npm run lint:shell
```

This checks shell scripts where the local environment has the required shell linting support.

## Documentation Checks

For docs and router work, also run the task-provided product-facing stale-name scan. Keep that scan scoped to public docs and router files; do not edit `docs/design/` or `docs/specs/` just to hide historical provenance.

## Interpreting Results

- Report the command, exit status, and meaningful failure lines.
- If a command cannot run because a local tool is missing, say that plainly.
- Do not claim completion from partial validation unless the skipped checks are called out.
