---
name: observability-and-instrumentation
description: Use when adding or reviewing logs, metrics, traces, dashboards, alerts, production diagnostics, correlation IDs, or telemetry for services, jobs, endpoints, queues, and integrations.
---

# Observability and Instrumentation

## Overview

Observable systems answer "what is happening and why?" from the outside. Instrumentation is part of the feature, not a post-incident patch: metrics show that something is wrong, traces show where, and logs explain why.

Use `systematic-debugging` for active incidents and `security-and-hardening` to protect telemetry from leaking secrets or PII.

## When to Use

- Adding endpoints, background jobs, queues, external calls, retries, or critical user flows.
- A production issue could not be diagnosed from available telemetry.
- Creating or reviewing logs, metrics, traces, dashboards, alerts, or runbooks.
- Preparing a launch where monitoring must prove health.

## Process

1. Write the operational questions.
   - Name two to four questions an on-call engineer will ask about the feature.
   - Every signal should answer one of those questions.

2. Choose the signal type.
   - Logs for event detail and failure reasons.
   - Metrics for rates, errors, latency, saturation, and trends.
   - Traces for cross-boundary timing and dependency paths.

3. Log structured events.
   - Use stable event names and machine-readable fields.
   - Attach correlation or request IDs at the boundary and propagate them.
   - Allowlist fields; never log secrets, tokens, passwords, full request bodies, or unredacted PII.

4. Add bounded metrics.
   - Instrument RED for endpoints and dependencies: rate, errors, duration.
   - Instrument USE for resources: utilization, saturation, errors.
   - Use histograms and p95/p99, not averages.
   - Keep labels bounded; never label by user ID, email, raw URL, request ID, or error text.

5. Trace meaningful boundaries.
   - Propagate trace context across HTTP, queue, async, and worker boundaries.
   - Add manual spans only around units that answer operational questions.

6. Alert on symptoms.
   - Page for user-facing error rate, p99 latency, queue age, or data integrity risk.
   - Put causes such as CPU or disk on dashboards unless they directly require action.
   - Every alert needs an owner, threshold, duration, and runbook.

## Common Rationalizations

| Rationalization | Reality |
| --- | --- |
| "We can add logs after it works." | The first production issue is the worst time to discover blindness. |
| "More logs means more observability." | Unstructured noise slows incidents; queryable signals answer questions. |
| "Averages are enough." | Averages hide the users seeing the worst latency. |
| "User IDs as metric labels help debugging." | High-cardinality labels can break the metrics backend. |
| "CPU alerts are safer." | Cause alerts page people when users are fine and miss failures no one predicted. |

## Red Flags

- New retries, queues, endpoints, or external calls with no telemetry.
- Free-form log strings instead of structured events.
- Logs lack correlation IDs.
- Secrets, tokens, PII, request bodies, or auth headers appear in telemetry.
- Metrics use unbounded labels.
- Alerts fire frequently and are acknowledged without action.
- Launch plans rely on "watch the logs" with no named dashboard or threshold.

## Verification

- On-call questions are written and each signal maps to one.
- Logs are structured, correlated, and free of secrets or unredacted PII.
- RED/USE metrics exist where relevant with bounded labels and percentile latency.
- A representative request can be followed through traces.
- New alerts are symptom-based, actionable, and linked to a runbook.
- Telemetry is spot-checked in the target environment, not assumed.
- Use `references/observability-checklist.md` and finish with `verification-before-completion`.
