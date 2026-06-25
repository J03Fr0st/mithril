# Mithril 0.0.1

## Summary

This is the first merged Mithril release: a curated agent engineering methodology with one router, lifecycle skills, command entrypoints, advisory personas, references, hooks, and public setup documentation.

## Included Changes

- Added lifecycle coverage for brainstorming, planning, TDD, systematic debugging, parallel execution, review, simplification, and launch readiness.
- Added validated skill and command metadata for supported agent hosts.
- Added advisory personas, shared references, hook assets, setup guides, and package manifests for the supported distribution surfaces.
- Synthesized copied TDD, debugging, review, skill-authoring, and implementation-standard sources into active Mithril skills while keeping copied `sources/` folders for provenance.
- Preserved source attribution in `NOTICE.md` without promoting excluded upstream surfaces in product-facing metadata.

## Validation Evidence

- `npm run validate:skills`
- `npm run validate:commands`
- `npm run lint:shell`
- `npm test`
- `npm pack --dry-run --json` with a workspace-local npm cache after the default npm cache path was not writable in this shell.
- Stale-name scan for excluded legacy names and source labels.
- Package-content check confirming local state and implementation-planning folders are excluded from the tarball.

## Known Limitations

- Host-specific tool mappings depend on each host's current extension/plugin capabilities.
- This package is private for public npm publishing; distribution is through the supported plugin and git-backed install paths.
- Historical planning and comparison documents may retain legacy names for provenance, attribution, and auditability.
