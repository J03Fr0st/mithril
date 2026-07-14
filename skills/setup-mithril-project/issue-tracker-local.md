# Issue tracker: Local Markdown

Issues and specs (sometimes called PRDs) for this repo live as markdown files in `.scratch/`.

## Conventions

- One feature per directory: `.scratch/<feature-slug>/`
- The spec is `.scratch/<feature-slug>/spec.md`
- Implementation issues are one file per ticket at `.scratch/<feature-slug>/issues/<NN>-<slug>.md`, numbered from `01` in dependency order — never a single combined tickets file
- When the `triage` skill is installed, record triage state with a `**Status:**` field near the top of each issue file, using the role strings in `triage-labels.md`
- Comments and conversation history append to the bottom of the file under a `## Comments` heading

## When a skill says "publish to the issue tracker"

Publish each artifact according to its kind, creating the feature directory when needed:

- For a spec, write `.scratch/<feature-slug>/spec.md`.
- For tickets, write one file per ticket under `.scratch/<feature-slug>/issues/`.

## When a skill says "fetch the relevant ticket"

Read the file at the referenced path. The user will normally pass the path or the issue number directly.
