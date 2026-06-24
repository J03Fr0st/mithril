---
name: ci-cd-and-automation
description: Use when adding, changing, debugging, or reviewing automated quality gates, CI jobs, release pipelines, dependency automation, deployment workflows, or rollback automation.
---

# CI/CD and Automation

## Overview

Automation enforces repeatable quality gates before changes merge or deploy. A good pipeline catches failures early, blocks unsafe changes, protects secrets, and leaves enough evidence for humans and agents to diagnose failures.

Use `systematic-debugging` for failing pipelines and `implementation-standards` when changing project scripts or workflow shape.

## When to Use

- Creating or modifying CI checks, deployment pipelines, release automation, or scheduled jobs.
- Adding lint, type, test, build, security, bundle, or migration gates.
- Debugging a failing CI run.
- Making deployments safer with staging, previews, feature flags, or rollback steps.
- Reviewing whether automation proves the intended readiness bar.

## Process

1. Define the gate.
   - Identify what the pipeline must prevent: broken build, failed tests, unsafe dependency, missed migration, oversized bundle, unreviewed deploy.
   - Keep checks close to the change that can break them.

2. Order checks for fast feedback.
   - Static checks before slower tests.
   - Focused tests before full integration or browser suites.
   - Build and packaging checks before deploy.

3. Make failures actionable.
   - Emit clear logs and artifacts.
   - Upload browser reports, coverage, build artifacts, and screenshots only when they help diagnose.
   - Do not hide failure with retries unless flake handling is explicit and tracked.

4. Protect secrets and environments.
   - Store credentials in the platform secret store or vault.
   - Use separate credentials for CI, staging, and production.
   - Avoid printing secrets, tokens, environment dumps, or full request bodies.

5. Keep releases reversible.
   - Prefer small batches.
   - Use staging, preview deployments, flags, and rollback instructions for risky changes.
   - Pair launch automation with `shipping-and-launch`.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "CI is too slow, skip it." | Slow checks need optimization or parallelism, not removal from the safety path. |
| "This change is trivial." | Trivial edits still break builds, packaging, and generated output. |
| "The test is flaky, rerun it." | Flakiness is a defect in the feedback loop; fix or isolate it deliberately. |
| "We will add CI later." | Projects without automated gates normalize broken states. |
| "Secrets in test config are harmless." | CI logs and artifacts spread quickly; test credentials still need containment. |

## Red Flags

- Merge is possible while required checks are failing.
- Pipeline disables tests, lint rules, audits, or type checks to pass.
- Production deploys lack staging, smoke checks, or rollback path.
- CI uses production credentials or hardcoded secrets.
- Failure logs are too noisy to identify the failing command or test.
- Automation changes are not verified locally or with a dry run where possible.
- Scheduled dependency or release automation has no owner.

## Verification

- The pipeline runs on the intended triggers and blocks unsafe merges or deploys.
- Required gates cover lint, types, tests, build/package, and security where relevant.
- Failure output identifies the failed command, artifact, and next diagnostic step.
- Secrets are stored outside source and are not printed.
- Deployment automation has a rollback or disable path.
- CI failures are debugged with `systematic-debugging`, not by disabling gates.
- Completion claims use fresh evidence through `verification-before-completion`.
