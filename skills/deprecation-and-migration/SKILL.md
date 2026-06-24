---
name: deprecation-and-migration
description: Use when replacing, removing, sunsetting, or migrating APIs, features, systems, dependencies, data models, flags, or legacy code that consumers may still depend on.
---

# Deprecation and Migration

## Overview

Deprecation removes liability without breaking consumers. Migration moves users from an old surface to a supported replacement with evidence, tooling, and a rollback-aware plan.

Pair interface changes with `api-and-interface-design`, behavior changes with `test-driven-development`, and launch sequencing with `shipping-and-launch`.

## When to Use

- Replacing an old implementation, API, package, service, dependency, or feature flag.
- Consolidating duplicate systems.
- Removing dead or unowned code with possible consumers.
- Planning a migration across data, infrastructure, or user-facing behavior.
- Deciding whether to maintain legacy code or invest in removal.

## Process

1. Decide with evidence.
   - Identify current users, owners, usage volume, maintenance cost, security risk, and unique value.
   - Do not remove a surface until active usage is known or a search/telemetry gap is documented.

2. Provide a replacement first.
   - The replacement must cover critical use cases, be documented, and be proven in the target environment.
   - If no replacement exists, this is a build plan, not a deprecation.

3. Choose advisory or compulsory deprecation.
   - Advisory: stable old surface, optional migration, no hard deadline.
   - Compulsory: security, correctness, cost, or platform risk justifies a deadline.
   - Compulsory removal requires migration support, not just a notice.

4. Migrate incrementally.
   - Identify every touchpoint.
   - Move one consumer or slice at a time.
   - Verify behavior at each step.
   - Remove old references only after the new path is green.

5. Remove only when usage is zero.
   - Confirm with metrics, logs, dependency search, tests, or consumer sign-off.
   - Remove old code, tests, docs, configuration, flags, and notices together when they no longer serve a purpose.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "It still works." | Working legacy code still carries dependency, security, and onboarding cost. |
| "Someone might need it later." | Keeping unused code indefinitely taxes every future maintainer. |
| "Users will migrate on their own." | Most users need tooling, docs, incentives, or direct migration. |
| "We can maintain both forever." | Parallel systems double testing, docs, security review, and cognitive load. |
| "We can remove it because search found nothing." | Search misses runtime, external, and generated consumers; use all available evidence. |

## Red Flags

- Deprecated code still accepts new features.
- No owner, replacement, migration guide, or usage measurement exists.
- Removal happens before zero active consumers are verified.
- Deadlines are set without migration tooling or support.
- Feature flags remain after full rollout with no cleanup date.
- Compatibility adapters hide a permanent dual-system state.

## Verification

- Current usage and consumer list are measured or explicitly bounded.
- Replacement covers critical use cases and has tests.
- Migration guide or consumer instructions exist for non-trivial changes.
- Each migrated slice passed focused and integration checks.
- Old code, tests, docs, flags, and config are removed only after zero usage evidence.
- Public interface changes were reviewed with `api-and-interface-design`.
- Final status is reported through `verification-before-completion`.
