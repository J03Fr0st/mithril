---
name: shipping-and-launch
description: Use when preparing a production release, staged rollout, feature flag launch, migration, beta, rollback plan, post-launch monitoring, or release readiness check.
---

# Shipping and Launch

## Overview

Shipping means making a change safely available to users. A launch is ready only when it is verified, observable, reversible, and monitored against clear success and rollback criteria.

Use `code-review-and-quality` before release readiness and `observability-and-instrumentation` for the telemetry that launch decisions depend on.

## When to Use

- Deploying a feature, migration, infrastructure change, or significant behavior change.
- Enabling a feature flag for users.
- Planning staged rollout, beta, canary, or rollback.
- Checking release readiness before merge or production exposure.
- Monitoring the first hour or first cohort after launch.

## Process

1. Confirm the change is done before launch.
   - Acceptance criteria are met.
   - Tests, build, lint, type checks, review, docs, security, accessibility, performance, and observability are handled as applicable.
   - Use `references/definition-of-done.md` as the standing gate.

2. Define launch scope.
   - Name users, percentage, regions, data migrations, dependencies, and feature flags involved.
   - Prefer small batches and reversible slices.

3. Define success and rollback thresholds.
   - Success: health checks, error rate, p95/p99 latency, Core Web Vitals, business metric, support signal, or data integrity check.
   - Roll back on data loss, security issue, sustained error spike, severe latency regression, or user-reported critical issue.

4. Prepare the rollback path.
   - Feature flag disable, previous version deploy, config revert, migration rollback, or manual mitigation.
   - Include owner, expected time, and verification after rollback.

5. Launch incrementally.
   - Staging or preview first.
   - Production with flag off when possible.
   - Internal users, canary, gradual rollout, then full rollout.
   - Monitor at each stage before advancing.

6. Clean up after stability.
   - Remove expired flags, dead code paths, temporary dashboards, and launch-only docs when the rollout is complete.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "It works in staging." | Production has different data, traffic, config, and users. |
| "We do not need a rollback plan." | If rollback is impossible, the risk must be explicit before launch. |
| "Monitoring can come later." | You need telemetry when the first real users hit the path. |
| "Feature flags are overhead." | Flags decouple deployment from exposure and give fast rollback. |
| "The change is small enough to ship all at once." | Small changes can still break critical paths. |

## Red Flags

- Launch begins before the Definition of Done is cleared.
- No named owner monitors the rollout.
- Success criteria are vague or only manual.
- Rollback steps are untested, undocumented, or impossible.
- Feature flags have no owner or cleanup date.
- Migrations are irreversible without user acknowledgment.
- Launch happens while checks are failing or unreviewed.

## Verification

- Definition of Done is satisfied or gaps are explicitly accepted.
- Rollout scope, owner, success metrics, and rollback triggers are documented.
- Monitoring dashboards and alerts exist for the changed path.
- Rollback path is ready and has a post-rollback verification step.
- Staged rollout advances only after thresholds stay green.
- Post-launch checks confirm health, errors, latency, logs, and critical flow behavior.
- Final report uses `verification-before-completion`.
